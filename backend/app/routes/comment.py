
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Comment, Post
from app.schemas import CommentCreate
from app.models.user import User
from app.dependencies import get_current_user
from app.websockets.comment_ws import active_connections
import json

router = APIRouter()

# ✅ 댓글 생성 WebSocket 브로드캐스트
async def broadcast_new_comment(post_id: int, comment_data: dict):
    connections = active_connections.get(post_id, [])
    for ws in connections:
        try:
            await ws.send_text(json.dumps(comment_data))
        except:
            pass

@router.post("/posts/{post_id}/comments")
async def create_comment(
    post_id: int,
    comment: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    new_comment = Comment(
        content=comment.content,
        user_id=current_user.id,
        post_id=post_id
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)

    await broadcast_new_comment(post_id, {
        "id": new_comment.id,
        "user_name": current_user.nickname,
        "content": new_comment.content,
        "user_id": current_user.id,
        "created_at": str(new_comment.created_at)
    })

    return {"message": "Comment added"}

@router.delete("/comments/{comment_id}")
def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="You are not authorized to delete this comment.")

    db.delete(comment)
    db.commit()
    return {"message": "Comment deleted"}

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import os, uuid, shutil

from app.database import get_db
from app.models import Post, Comment
from app.models.user import User
from app.models.basic_info import BasicInfo
from app.models.lifestyle import Lifestyle
from app.schemas.post import PostCreateWithoutUserId, PostResponse  # ✅ user_id 없는 버전 사용
from app.schemas.comment import CommentCreate, CommentResponse
from app.schemas.user import UserResponse, UserUpdate, PasswordResetRequest
from app.auth.utils import hash_password
from app.dependencies import get_current_user

router = APIRouter()

# ------------------------
# 대표 사용자 검색/수정/삭제
# ------------------------

@router.get("/me", response_model=UserResponse)
def read_me(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=UserResponse)
def update_about(user_update: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if user_update.about is not None:
        current_user.about = user_update.about
        db.commit()
        db.refresh(current_user)
    return current_user

@router.put("/reset-password")
def reset_password(data: PasswordResetRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.password = hash_password(data.new_password)
    db.commit()
    return {"message": "Password reset successful"}

@router.get("/users/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# ------------------------
# 기본정보 / Lifestyle
# ------------------------

MEDIA_DIR = "media/profiles"
os.makedirs(MEDIA_DIR, exist_ok=True)

@router.post("/basic-info")
def create_basic_info(
    name: str = Form(...),
    birth_date: str = Form(...),
    gender: str = Form(...),
    height: float = Form(...),
    weight: float = Form(...),
    profile_image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing_info = db.query(BasicInfo).filter(BasicInfo.user_id == current_user.id).first()
    if existing_info:
        raise HTTPException(status_code=400, detail="Basic info already exists")

    image_url = None
    if profile_image:
        filename = f"{current_user.id}_{uuid.uuid4().hex}.jpg"
        save_path = os.path.join(MEDIA_DIR, filename)
        with open(save_path, "wb") as buffer:
            shutil.copyfileobj(profile_image.file, buffer)
        image_url = f"/media/profiles/{filename}"

    new_info = BasicInfo(
        user_id=current_user.id,
        name=name,
        birth_date=birth_date,
        gender=gender,
        height=height,
        weight=weight,
        image_url=image_url
    )
    db.add(new_info)
    db.commit()
    db.refresh(new_info)
    return {"message": "Basic info saved", "id": new_info.id, "image_url": image_url}

@router.get("/basic-info/me")
def get_my_basic_info(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    info = db.query(BasicInfo).filter(BasicInfo.user_id == current_user.id).first()
    if not info:
        raise HTTPException(status_code=404, detail="No info found")
    return info

@router.get("/basic-info/{user_id}")
def get_basic_info_by_user(user_id: int, db: Session = Depends(get_db)):
    info = db.query(BasicInfo).filter(BasicInfo.user_id == user_id).first()
    if not info:
        raise HTTPException(status_code=404, detail="Basic info not found")
    return info

@router.get("/lifestyle/{user_id}")
def get_lifestyle_by_user(user_id: int, db: Session = Depends(get_db)):
    lifestyle = db.query(Lifestyle).filter(Lifestyle.user_id == user_id).first()
    if not lifestyle:
        raise HTTPException(status_code=404, detail="Lifestyle info not found")
    return lifestyle

# ------------------------
# 게시글 (Post)
# ------------------------

@router.post("/posts", response_model=PostResponse)
def create_post(
    post: PostCreateWithoutUserId,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_post = Post(
    user_id=current_user.id,
    phrase=post.phrase,
    image_url=post.image_url,
    location=post.location,
    person_tag=post.person_tag,
    disclosure=post.disclosure,
    likes=0,
)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@router.get("/posts", response_model=List[PostResponse])
def get_posts(db: Session = Depends(get_db)):
    return db.query(Post).all()

@router.get("/posts/me", response_model=List[PostResponse])
def get_my_posts(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Post).filter(Post.user_id == current_user.id).all()

@router.get("/posts/user/{user_id}", response_model=List[PostResponse])
def get_posts_by_user(user_id: int, db: Session = Depends(get_db)):
    return db.query(Post).filter(Post.user_id == user_id).all()

@router.get("/posts/{post_id}", response_model=PostResponse)
def get_post_with_comments(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    for comment in post.comments:
        _ = comment.user.nickname
    return post

@router.delete("/posts/{post_id}")
def delete_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="You are not authorized to delete this post.")

    db.delete(post)
    db.commit()
    return {"message": "Post deleted"}

@router.patch("/posts/{post_id}/like")
def like_post(post_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    post.likes = (post.likes or 0) + 1
    db.commit()
    return {"message": "Liked post", "likes": post.likes}

@router.post("/posts/{post_id}/comments", response_model=CommentResponse)
def create_comment(
    post_id: int,
    comment: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_comment = Comment(
        content=comment.content,
        user_id=current_user.id,
        post_id=post_id
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return CommentResponse(
        id=db_comment.id,
        content=db_comment.content,
        user_id=db_comment.user_id,
        user_nickname=current_user.nickname,
        user_name=current_user.nickname,
        created_at=db_comment.created_at
    )

from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime

# ✅ 댓글 응답용 스키마
class CommentResponse(BaseModel):
    id: int
    user_id: int
    user_name: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True  # Pydantic v2에서는 orm_mode 대신 from_attributes 사용


# ✅ 게시글 생성 요청용 스키마
class PostCreate(BaseModel):
    user_id: int  # ✅ 반드시 포함
    user_name: str
    phrase: str
    image_url: Optional[str] = None
    location: Optional[str] = None
    person_tag: Optional[str] = None
    disclosure: Optional[str] = None


# ✅ 게시글 응답용 스키마
class PostResponse(PostCreate):
    id: int
    likes: int = 0
    comments: List[CommentResponse] = []

    class Config:
        from_attributes = True

# 🔽 이 부분을 schemas/post.py 파일 하단에 추가
class PostCreateWithoutUserId(BaseModel):
    user_name: str
    phrase: str
    image_url: Optional[str] = None
    location: Optional[str] = None
    person_tag: Optional[str] = None
    disclosure: Optional[str] = None
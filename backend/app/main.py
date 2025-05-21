from fastapi import FastAPI, HTTPException, Depends, Request, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import os

from app.auth.utils import hash_password
from app.database import Base, engine, SessionLocal, get_db
from app.models import User, Comment, Post, BasicInfo, Lifestyle
from app.routes import login, basic_info, lifestyle, user, post, message
from app.routes.login import create_access_token
from app.dependencies import get_current_user
from app.schemas import CommentCreate

# ✅ FastAPI 인스턴스
app = FastAPI()

# ✅ CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 배포 시 도메인 지정 권장
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ DB 테이블 자동 생성
Base.metadata.create_all(bind=engine)

# ✅ static/media 디렉토리 생성 및 정적 파일 서빙
os.makedirs("media/profiles", exist_ok=True)
app.mount("/media", StaticFiles(directory="media"), name="media")

# ✅ 회원가입 요청 모델
class SignupRequest(BaseModel):
    nickname: str
    email: str
    password: str

# ✅ 회원가입 API - 기본 정보 & 라이프스타일 정보 함께 생성
@app.post("/signup")
async def signup(data: SignupRequest):
    db = SessionLocal()
    try:
        if db.query(User).filter(User.email == data.email).first():
            raise HTTPException(status_code=400, detail="이미 존재하는 이메일입니다.")

        hashed_password = hash_password(data.password)
        new_user = User(
            nickname=data.nickname,
            email=data.email,
            password=hashed_password
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # ✅ 기본 정보와 라이프스타일 기본값 생성
        db.add(BasicInfo(user_id=new_user.id))
        db.commit()

        # ✅ JWT 토큰 발급
        access_token = create_access_token(data={"user_id": new_user.id})
        return {"access_token": access_token, "token_type": "bearer"}
    finally:
        db.close()

# ✅ 라우터 등록
app.include_router(login.router)
app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(basic_info.router)
app.include_router(lifestyle.router)
app.include_router(post)
app.include_router(message.router)

# ✅ 댓글 라우터 직접 정의 및 등록
comment_router = APIRouter()

@comment_router.post("/posts/{post_id}/comments")
def create_comment(
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
    return {"message": "Comment added"}

# app/main.py 또는 app/__init__.py 등
from app.routes.comment import router as comment_router

app.include_router(comment_router)

from fastapi.staticfiles import StaticFiles
app.mount("/static", StaticFiles(directory="static"), name="static")
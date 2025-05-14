from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.auth.utils import hash_password  # ✅ 비밀번호 해싱 함수

from app.database import Base, engine, SessionLocal
from app.models import User, lifestyle  # ✅ 모델 등록 목적
from app.routes import login, basic_info, lifestyle
from app.routes import user  # ✅ Password reset 등을 위한 user 라우터
from app.routes.login import create_access_token  # ✅ 토큰 발급 함수
# app/main.py
from app.routes.user import router as user_router


app = FastAPI()

# ✅ CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 중엔 전체 허용, 배포 시엔 제한 권장
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ DB 테이블 자동 생성
Base.metadata.create_all(bind=engine)

# ✅ 회원가입 요청 모델
class SignupRequest(BaseModel):
    nickname: str
    email: str
    password: str

# ✅ 회원가입 API
@app.post("/signup")
async def signup(data: SignupRequest):
    db = SessionLocal()
    try:
        if db.query(User).filter(User.email == data.email).first():
            raise HTTPException(status_code=400, detail="이미 존재하는 이메일입니다.")

        hashed_password = hash_password(data.password)  # ✅ 해싱 처리

        new_user = User(
            nickname=data.nickname,
            email=data.email,
            password=hashed_password
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        access_token = create_access_token(data={"user_id": new_user.id})
        return {"access_token": access_token, "token_type": "bearer"}

    finally:
        db.close()

# ✅ 라우터 등록
app.include_router(login.router)                                  # 로그인 API
app.include_router(user.router, prefix="/users", tags=["users"])  # 사용자 정보 및 비밀번호 재설정 포함
app.include_router(basic_info.router)                             # 기초 정보 API
app.include_router(lifestyle.router)                              # 라이프스타일 API
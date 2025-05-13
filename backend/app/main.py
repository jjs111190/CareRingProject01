from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.routes import login  # 기존 라우터
from app.database import Base, engine, SessionLocal
from app.models import User  # DB 모델

# 앱 초기화
app = FastAPI()

# DB 테이블 생성
Base.metadata.create_all(bind=engine)

# 기존 라우터 등록
app.include_router(login.router)

# 회원가입 요청 모델
class SignupRequest(BaseModel):
    nickname: str
    email: str
    password: str

# 회원가입 API
@app.post("/signup")
async def signup(data: SignupRequest):
    db = SessionLocal()

    # 이메일 중복 검사
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="이미 존재하는 이메일입니다.")

    # 새 유저 생성
    new_user = User(
        nickname=data.nickname,
        email=data.email,
        password=data.password  # 실제 서비스에선 bcrypt로 암호화해야 안전함
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    db.close()

    return {"message": "회원가입 성공", "user_id": new_user.id}
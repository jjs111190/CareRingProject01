# ✅ app/dependencies.py
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User
from app.auth.utils import verify_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    print("📦 Token received in dependency:", token)

    if not token or "." not in token:
        print("❌ Invalid format token")
        raise HTTPException(status_code=401, detail="유효하지 않은 토큰입니다.")

    try:
        user_id = verify_token(token)
        print("✅ Token verified. user_id =", user_id)
    except Exception as e:
        print("❌ Token verification failed:", str(e))
        raise HTTPException(status_code=401, detail="토큰 검증에 실패했습니다.")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        print("❌ 유저 없음")
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")

    print("🙆 인증된 유저 반환:", user.email)
    return user
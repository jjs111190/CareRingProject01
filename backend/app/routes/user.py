from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_db, get_current_user
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate, PasswordResetRequest
from app.auth.utils import hash_password

router = APIRouter()

# ✅ 내 정보 조회
@router.get("/me", response_model=UserResponse)
def read_me(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return current_user

# ✅ 내 소개글 수정
@router.put("/me", response_model=UserResponse)
def update_about(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if user_update.about is not None:
        current_user.about = user_update.about
        db.commit()
        db.refresh(current_user)
    return current_user

# ✅ 비밀번호 재설정 (이메일 기반)
@router.put("/reset-password")
def reset_password(
    data: PasswordResetRequest,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.password = hash_password(data.new_password)
    db.commit()
    return {"message": "Password reset successful"}
# app/schemas/user.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from app.auth.utils import hash_password
# ✅ 업데이트용 모델
class UserUpdate(BaseModel):
    about: Optional[str] = None

# ✅ 응답용 모델
class UserResponse(BaseModel):
    id: int
    email: str
    nickname: str
    about: Optional[str] = None
    created_at: Optional[datetime] = None  # DB 필드와 일치해야 함

    class Config:
        from_attributes = True  # orm_mode → from_attributes in Pydantic v2

class PasswordResetRequest(BaseModel):
    email: EmailStr
    new_password: str

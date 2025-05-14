from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.lifestyle import Lifestyle
from app.schemas.lifestyle import LifestyleRequest
from app.models.user import User
from app.dependencies import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔸 라이프스타일 정보 저장 (중복 저장 방지)
@router.post("/lifestyle")
def save_lifestyle(
    data: LifestyleRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing = db.query(Lifestyle).filter(Lifestyle.user_id == current_user.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Lifestyle info already exists")

    new_lifestyle = Lifestyle(
        user_id=current_user.id,
        medical_history=data.medical_history,
        health_goals=data.health_goals,
        diet_tracking=data.diet_tracking,
        sleep_habits=data.sleep_habits,
        smoking_alcohol=data.smoking_alcohol,
    )
    db.add(new_lifestyle)
    db.commit()
    db.refresh(new_lifestyle)
    return {"message": "Lifestyle info saved", "id": new_lifestyle.id}

# 🔸 로그인한 사용자의 라이프스타일 정보 조회
@router.get("/lifestyle/me")
def get_my_lifestyle(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    info = db.query(Lifestyle).filter(Lifestyle.user_id == current_user.id).first()
    if not info:
        raise HTTPException(status_code=404, detail="No lifestyle info found")
    return info
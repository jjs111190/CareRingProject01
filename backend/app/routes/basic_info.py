from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.basic_info import BasicInfo
from app.models.user import User
from app.schemas.basic_info import BasicInfoRequest
from app.dependencies import get_current_user  # 🔑 로그인 인증 디펜던시

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ 사용자 본인의 기본 정보 저장
@router.post("/basic-info")
def save_basic_info(
    data: BasicInfoRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # ⬅️ 토큰에서 유저 정보 추출
):
    existing_info = db.query(BasicInfo).filter(BasicInfo.user_id == current_user.id).first()
    if existing_info:
        raise HTTPException(status_code=400, detail="Basic info already exists")

    new_info = BasicInfo(
        user_id=current_user.id,
        name=data.name,
        birth_date=data.birth_date,
        gender=data.gender,
        height=data.height,
        weight=data.weight
    )
    db.add(new_info)
    db.commit()
    db.refresh(new_info)
    return {"message": "Basic info saved", "id": new_info.id}

# ✅ 사용자 본인의 기본 정보 조회
@router.get("/basic-info/me")
def get_my_basic_info(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    info = db.query(BasicInfo).filter(BasicInfo.user_id == current_user.id).first()
    if not info:
        raise HTTPException(status_code=404, detail="No info found")
    return info
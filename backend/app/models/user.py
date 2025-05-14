from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
from app.auth.utils import hash_password
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nickname = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(100), nullable=False)
    about = Column(String, nullable=True)  # 자기소개 필드
    created_at = Column(DateTime, default=datetime.utcnow)

    # 관계 설정
    basic_info = relationship("BasicInfo", backref="user", uselist=False)
    lifestyle = relationship("Lifestyle", backref="user", uselist=False)
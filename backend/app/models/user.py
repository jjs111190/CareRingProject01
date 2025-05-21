from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nickname = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(100), nullable=False)
    about = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # ✅ 관계 설정
    basic_info = relationship("BasicInfo", back_populates="user", uselist=False)
    lifestyle = relationship("Lifestyle", backref="user", uselist=False)
    comments = relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    posts = relationship("Post", back_populates="user", cascade="all, delete-orphan")
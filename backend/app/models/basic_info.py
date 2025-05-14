from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database import Base

class BasicInfo(Base):
    __tablename__ = "basic_info"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))  # <-- 반드시 있어야 함
    name = Column(String(100), nullable=False)
    birth_date = Column(String(10), nullable=False)
    gender = Column(String(10), nullable=False)
    height = Column(Float, nullable=False)
    weight = Column(Float, nullable=False)
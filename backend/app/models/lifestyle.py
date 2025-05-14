from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Lifestyle(Base):
    __tablename__ = "lifestyle"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))  # ✅ 반드시 있어야 함
    medical_history = Column(String(255))
    health_goals = Column(String(255))
    diet_tracking = Column(String(255))
    sleep_habits = Column(String(255))
    smoking_alcohol = Column(String(255))
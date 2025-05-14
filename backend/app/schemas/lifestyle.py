# schemas/lifestyle.py
from pydantic import BaseModel

class LifestyleRequest(BaseModel):
    medical_history: str
    health_goals: str
    diet_tracking: str
    sleep_habits: str
    smoking_alcohol: str
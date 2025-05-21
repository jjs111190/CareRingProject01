# app/schemas/message.py
from pydantic import BaseModel

class MessageCreate(BaseModel):
    to: str
    content: str

class MessageResponse(BaseModel):
    id: int
    content: str

    class Config:
        orm_mode = True
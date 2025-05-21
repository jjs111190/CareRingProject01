# app/routes/message.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies import get_current_user
from app.models import Message, User
from app.schemas.message import MessageCreate, MessageResponse

router = APIRouter()

@router.post("/messages", response_model=MessageResponse)
def send_message(
    message_data: MessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    recipient = db.query(User).filter(User.nickname == message_data.to).first()
    if not recipient:
        raise HTTPException(status_code=404, detail="Recipient not found")

    message = Message(
        sender_id=current_user.id,
        recipient_id=recipient.id,
        content=message_data.content,
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message
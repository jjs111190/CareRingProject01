from .user import User
from .basic_info import BasicInfo
from .lifestyle import Lifestyle
from .post import Post
from .comment import Comment
from .message import Message  # ✅ 새로 추가한 모델

__all__ = [
    "User",
    "BasicInfo",
    "Lifestyle",
    "Post",
    "Comment",
    "Message"
]
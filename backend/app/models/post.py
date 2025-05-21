from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from app.database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)

    # 작성자 정보
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # 글 내용 및 부가정보
    phrase = Column(String(500), nullable=True)         # 글 내용
    image_url = Column(String(1000), nullable=True)      # 이미지 URL
    location = Column(String(255), nullable=True)        # 위치 정보
    person_tag = Column(String(255), nullable=True)      # 사람 태그
    disclosure = Column(String(50), nullable=True)       # 공개 범위
    likes = Column(Integer, default=0)                   # 좋아요 수

    # 생성 시간
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # 관계
    user = relationship("User", back_populates="posts")                         # 작성자와 연결
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan")  # 댓글 연결

    # 작성자 닉네임 동적 속성 (읽기 전용)
    @hybrid_property
    def user_name(self):
        return self.user.nickname if self.user else None
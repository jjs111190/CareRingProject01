from jose import JWTError, jwt
from passlib.context import CryptContext
from app.config import SECRET_KEY, ALGORITHM

# 비밀번호 해시 설정
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """비밀번호를 bcrypt로 해싱"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """해시된 비밀번호 검증"""
    return pwd_context.verify(plain_password, hashed_password)

def verify_token(token: str) -> int:
    """JWT 토큰을 디코딩하고 user_id를 반환"""
    try:
        print("🧪 Decoding token:", token)
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("✅ Payload decoded:", payload)
        user_id: int = payload.get("user_id")
        if user_id is None:
            raise ValueError("Invalid payload")
        return user_id
    except JWTError as e:
        print("❌ JWTError:", str(e))
        raise ValueError("Invalid token")
from sqlalchemy.orm import Session
from app.models.user import User
from app.schema.user import UserCreate
from app.core.security import hash_password

def create_user(db: Session, user_in: UserCreate) -> User:
    hashed_pwd = hash_password(user_in.password)

    user = User(
            name=user_in.name,
            email=user_in.email,
            password_hash=hashed_pwd,
            role=user_in.role
            )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

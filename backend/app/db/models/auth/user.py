from datetime import datetime, UTC
from enum import Enum
from sqlalchemy import DateTime, String, TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base


class UserRole(Enum):
    ADMIN = "admin"
    TEACHER = "teacher"
    STUDENT = "student"


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    email: Mapped[str] = mapped_column(String(150), unique=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    role: Mapped[UserRole]
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, default=datetime.now(tz=UTC)
    )

    __table_args__ = {"schema": "auth"}

    # progress: Mapped[list["Progress"]] = relationship("Progress", back_populates="user")
    # attempts: Mapped[list["Attempt"]] = relationship("Attempt", back_populates="user")

from datetime import datetime, UTC
from typing import Optional

from sqlalchemy import (
    String,
    Text,
    Integer,
    Boolean,
    ForeignKey,
    TIMESTAMP,
)
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column,
    relationship,
)
from app.db.base import Base

class Quiz(Base):
    __tablename__ = "quiz"
    __table_args__ = {"schema": "quiz"}

    id: Mapped[int] = mapped_column(primary_key=True)
    module_id: Mapped[int] = mapped_column(
        ForeignKey("learn.module.id", ondelete="CASCADE")
    )
    title: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, default=datetime.now(tz=UTC)
    )

    module: Mapped["Module"] = relationship(back_populates="quiz")
    questions: Mapped[list["Question"]] = relationship(back_populates="quiz")
    attempts: Mapped[list["Attempt"]] = relationship(back_populates="quiz")


class Question(Base):
    __tablename__ = "question"
    __table_args__ = {"schema": "quiz"}

    id: Mapped[int] = mapped_column(primary_key=True)
    quiz_id: Mapped[int] = mapped_column(
        ForeignKey("quiz.quiz.id", ondelete="CASCADE")
    )
    statement: Mapped[str] = mapped_column(Text)
    points: Mapped[int] = mapped_column(Integer, default=1)

    quiz: Mapped["Quiz"] = relationship(back_populates="questions")
    choices: Mapped[list["Choice"]] = relationship(back_populates="question")


class Choice(Base):
    __tablename__ = "choice"
    __table_args__ = {"schema": "quiz"}

    id: Mapped[int] = mapped_column(primary_key=True)
    question_id: Mapped[int] = mapped_column(
        ForeignKey("quiz.question.id", ondelete="CASCADE")
    )
    text: Mapped[str] = mapped_column(Text)
    is_correct: Mapped[bool] = mapped_column(Boolean, default=False)

    question: Mapped["Question"] = relationship(back_populates="choices")


class Attempt(Base):
    __tablename__ = "attempt"
    __table_args__ = {"schema": "quiz"}

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("auth.user.id", ondelete="CASCADE")
    )
    quiz_id: Mapped[int] = mapped_column(
        ForeignKey("quiz.quiz.id", ondelete="CASCADE")
    )
    score: Mapped[int] = mapped_column(Integer, default=0)
    started_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, default=datetime.now(tz=UTC)
    )
    finished_at: Mapped[Optional[datetime]] = mapped_column(TIMESTAMP, nullable=True)

    user: Mapped["User"] = relationship(back_populates="attempts")
    quiz: Mapped["Quiz"] = relationship(back_populates="attempts")


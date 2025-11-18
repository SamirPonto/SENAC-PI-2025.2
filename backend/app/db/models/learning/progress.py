from __future__ import annotations
from datetime import datetime

from sqlalchemy import (
    Integer,
    ForeignKey,
    TIMESTAMP,
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from app.db.base import Base


class Progress(Base):
    __tablename__ = "progress"
    __table_args__ = {"schema": "learn"}

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("auth.user.id", ondelete="CASCADE"))
    module_id: Mapped[int] = mapped_column(
        ForeignKey("learn.module.id", ondelete="CASCADE")
    )
    percentage: Mapped[int] = mapped_column(Integer, default=0)
    updated_at: Mapped[datetime] = mapped_column(TIMESTAMP, default=datetime.utcnow)

    # user: Mapped["User"] = relationship("User", back_populates="progress")
    # module: Mapped["Module"] = relationship("Module", back_populates="progress")

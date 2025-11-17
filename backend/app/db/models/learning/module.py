from __future__ import annotations
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
    Mapped,
    mapped_column,
    relationship,
)

from app.db.base import Base


class Module(Base):
    __tablename__ = "module"
    __table_args__ = {"schema": "learn"}

    id: Mapped[int] = mapped_column(primary_key=True)
    trail_id: Mapped[int] = mapped_column(
        ForeignKey("learn.trail.id", ondelete="CASCADE")
    )
    title: Mapped[str] = mapped_column(String(200))
    type: Mapped[str] = mapped_column(String(20), default="video")
    content_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    module_order: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, default=datetime.now(tz=UTC)
    )

    # relationships
    # trail: Mapped["Trail"] = relationship(back_populates="modules")
    # progress: Mapped[List["Progress"]] = relationship(back_populates="module")
    # quiz: Mapped[Optional["Quiz"]] = relationship(
    #    back_populates="module", uselist=False
    # )

from __future__ import annotations
from datetime import datetime, UTC
from typing import List, Optional

from sqlalchemy import (
    String,
    Text,
    TIMESTAMP,
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)
from app.db.base import Base


class Trail(Base):
    __tablename__ = "trail"
    __table_args__ = {"schema": "learn"}

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, default=datetime.now(tz=UTC)
    )

    # modules: Mapped[List["Module"]] = relationship(back_populates="trail")

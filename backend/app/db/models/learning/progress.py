from datetime import datetime
from typing import List, Optional

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


class Progress(Base):
    __tablename__ = "progress"
    __table_args__ = {"schema": "learning"}

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("auth.users.id", ondelete="CASCADE")
    )
    module_id: Mapped[int] = mapped_column(
        ForeignKey("learning.modules.id", ondelete="CASCADE")
    )
    percentage: Mapped[int] = mapped_column(Integer, default=0)
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, default=datetime.utcnow
    )

    user: Mapped["User"] = relationship(back_populates="progress")
    module: Mapped["Module"] = relationship(back_populates="progress")


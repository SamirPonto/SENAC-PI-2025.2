from datetime import datetime
from pydantic import BaseModel


class Module(BaseModel):
    id: int
    trail_id: int
    title: str
    type: str
    module_order: int
    created_at: datetime
    content_url: str | None = None


class Progress:
    id: int
    user_id: int
    module_id: int
    percentage: int
    updated_at: datetime


class Trail(BaseModel):
    id: int
    title: str
    description: str
    created_at: datetime

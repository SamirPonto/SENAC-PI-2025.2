from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

from app.db.models.auth.user import UserRole


class Module(BaseModel):
    id: int
    trail_id: int
    title: str
    type: str
    module_order: int
    created_at: datetime
    content_url: str | None = None


class Progress(BaseModel):
    id: int
    user_id: int
    module_id: int
    percentage: int = Field(ge=0, le=100)
    updated_at: datetime


class Trail(BaseModel):
    id: int
    title: str
    description: str | None
    modules_count: int = Field(ge=0, default=0)


class RegisterUser(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: UserRole


class UserPublic(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: UserRole

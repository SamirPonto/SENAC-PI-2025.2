# app/routers/modules.py
from typing import Literal
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.db.models import Module
from app.db.models.auth.user import User
from app.db.session import get_db
from app.routes.schemas import Module as ModuleSchema

router = APIRouter(prefix="/modules")


@router.get("/{trail_id}")
def get_modules(
    trail_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)
) -> dict[Literal["modules"], list[ModuleSchema]]:
    stmt = (
        select(Module).where(Module.trail_id == trail_id).order_by(Module.module_order)
    )

    modules = db.scalars(stmt).all()

    return {"modules": [ModuleSchema.model_validate(module) for module in modules]}

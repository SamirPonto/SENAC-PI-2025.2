# app/routers/modules.py
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.models import Module
from app.db.session import get_db
from app.routes.schemas import Module as ModuleSchema

router = APIRouter(prefix="/modules")


@router.get("/{trail_id}")
def get_modules(trail_id: int, db: Session = Depends(get_db)):
    stmt = (
        select(Module).where(Module.trail_id == trail_id).order_by(Module.module_order)
    )

    modules = db.scalars(stmt).all()

    return {"modules": [ModuleSchema.model_validate(module) for module in modules]}

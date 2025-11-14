# app/routers/modules.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_session
from app.deps import get_current_user
from app.schemas import ModuleOut
from app.models import Module, Progress

router = APIRouter(prefix="/modules")

@router.get("/{trail_id}")
async def get_modules(
    trail_id: int,
    user_id: int = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    stmt = select(Module).where(Module.trail_id == trail_id).order_by(Module.module_order)
    modules = (await db.scalars(stmt)).all()

    result = []

    for m in modules:
        stmt2 = select(Progress.percentage).where(
            Progress.user_id == user_id,
            Progress.module_id == m.id,
        )
        percentage = (await db.scalar(stmt2)) or 0

        result.append(ModuleOut(
            id=m.id,
            title=m.title,
            type=m.type,
            content_url=m.content_url,
            module_order=m.module_order,
            percentage=percentage
        ))

    return {"modules": result}


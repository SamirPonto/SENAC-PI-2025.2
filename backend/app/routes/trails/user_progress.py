# app/routers/progress.py (same router)
from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.db.models import User, Progress, Module
from app.core.auth import get_current_user
from app.db.session import get_db

router = APIRouter(prefix="/user")


@router.get("/avg/{trail_id}")
async def get_avg_progress(
    trail_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    stmt = (
        select(func.avg(Progress.percentage))
        .join(Module, Progress.module_id == Module.id)
        .where(Progress.user_id == user.id, Module.trail_id == trail_id)
    )

    avg = db.scalar(stmt)
    return {"progress": round(avg) if avg else 0}

# app/routers/progress.py (same router)
from sqlalchemy import func

@router.get("/avg/{trail_id}")
async def get_avg_progress(
    trail_id: int,
    user_id: int = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    stmt = (
        select(func.avg(Progress.percentage))
        .join(Module, Progress.module_id == Module.id)
        .where(Progress.user_id == user_id, Module.trail_id == trail_id)
    )

    avg = await db.scalar(stmt)
    return {"progress": round(avg) if avg else 0}


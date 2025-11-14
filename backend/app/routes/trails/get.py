# app/routers/trails.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.routes.schemas import Trail, Module, Progress

router = APIRouter(prefix="/trails")


@router.get("")
async def get_trails(
    user_id: int | None = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    stmt = select(Trail)
    trails = (await db.scalars(stmt)).all()

    result = []

    for t in trails:
        # modules count
        stmt1 = select(func.count()).where(Module.trail_id == t.id)
        modules_count = await db.scalar(stmt1)

        # progress
        stmt2 = (
            select(func.avg(Progress.percentage))
            .join(Module, Progress.module_id == Module.id)
            .where(Module.trail_id == t.id, Progress.user_id == user_id)
        )
        avg = await db.scalar(stmt2)

        result.append(
            TrailOut(
                id=t.id,
                title=t.title,
                description=t.description,
                modules_count=modules_count,
                progress=round(avg) if avg else 0,
            )
        )

    return {"trails": result}

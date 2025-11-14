# app/routers/progress.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert
from app.deps import get_current_user
from app.schemas import ProgressUpdate
from app.database import get_session
from app.models import Progress

router = APIRouter(prefix="/progress")

@router.post("")
async def update_progress(
    data: ProgressUpdate,
    user_id: int = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    if data.percentage < 0 or data.percentage > 100:
        raise HTTPException(400, "Invalid percentage")

    stmt = insert(Progress).values(
        user_id=user_id,
        module_id=data.module_id,
        percentage=data.percentage,
    ).on_conflict_do_update(
        index_elements=[Progress.user_id, Progress.module_id],
        set_={"percentage": data.percentage}
    )

    await db.execute(stmt)
    await db.commit()

    return {"success": True}


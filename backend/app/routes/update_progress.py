# app/routers/progress.py
from fastapi import APIRouter, Depends
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.orm import Session
from app.core.auth import get_current_user
from app.db.session import get_db
from app.db.models import Progress, User
from app.routes.schemas import Progress as ProgressRouter

router = APIRouter(prefix="/progress")


@router.post("/")
async def update_progress(
    data: ProgressRouter,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    stmt = (
        insert(Progress)
        .values(
            user_id=data.user_id,
            module_id=data.module_id,
            percentage=data.percentage,
        )
        .on_conflict_do_update(
            index_elements=[Progress.user_id, Progress.module_id],
            set_={"percentage": data.percentage},
        )
    )

    db.execute(stmt)
    db.commit()

    return {"success": True}

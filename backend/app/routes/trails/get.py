# app/routers/trails.py
from fastapi import APIRouter, Depends
from sqlalchemy import select, func
from sqlalchemy.orm import Session
from app.core.auth import get_current_user
from app.db.models import Trail
from app.db.models.auth.user import User
from app.db.session import get_db
from app.db.models import Module
from app.routes.schemas import Trail as TrailRouter

router = APIRouter(prefix="/trails")


@router.get("/")
def get_trails(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    stmt = (
        select(
            Trail.id,
            Trail.title,
            Trail.description,
            func.count(Module.id).label("modules_count"),
        )
        .outerjoin(Module, Module.trail_id == Trail.id)
        .group_by(Trail.id)
        .order_by(Trail.id)
    )

    rows = db.execute(stmt).all()

    return {
        "trails": [
            TrailRouter(
                id=row.id,
                title=row.title,
                description=row.description,
                modules_count=row.modules_count,
            )
            for row in rows
        ]
    }

from fastapi import FastAPI

from app.routes.update_progress import router as uprogress_router
from app.routes.trails.get import router as trail_router
from app.routes.trails.modules import router as module_router
from app.routes.trails.user_progress import router as user_router

app = FastAPI()
app.include_router(uprogress_router, prefix="v1")
app.include_router(trail_router, prefix="v1")
app.include_router(module_router, prefix="v1")
app.include_router(user_router, prefix="v1")

# app/__init__.py
from fastapi import FastAPI
# Importamos o CORSMiddleware do pacote starlette
from starlette.middleware.cors import CORSMiddleware

from app.routes.update_progress import router as update_progress_router
from app.routes.trails.get import router as trails_router
from app.routes.trails.modules import router as modules_router
from app.routes.trails.user_progress import router as user_progress_router
from app.routes.auth import router as auth_router


def create_app() -> FastAPI:
    app = FastAPI(title="Educaflex API", version="1.0.0")

    # --- INÍCIO: CONFIGURAÇÃO DO CORS ---
    # Lista de origens permitidas.
    # Usamos "*" para permitir qualquer origem (necessário para desenvolvimento local
    # quando o Frontend está em uma porta diferente do Backend).
    origins = ["*"] 

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,        # Define as origens que podem acessar a API (neste caso, todas)
        allow_credentials=True,       # Permite cookies e cabeçalhos de autenticação (necessário para JWT)
        allow_methods=["*"],          # Permite todos os métodos HTTP (GET, POST, PUT, DELETE, OPTIONS, etc.)
        allow_headers=["*"],          # Permite todos os cabeçalhos na requisição
    )
    # --- FIM: CONFIGURAÇÃO DO CORS ---

    # API v1 prefix
    API_PREFIX = "/v1"

    app.include_router(update_progress_router, prefix=API_PREFIX, tags=["progress"])
    app.include_router(trails_router, prefix=API_PREFIX, tags=["trails"])
    app.include_router(modules_router, prefix=API_PREFIX, tags=["modules"])
    app.include_router(user_progress_router, prefix=API_PREFIX, tags=["user_progress"])
    app.include_router(auth_router, prefix="/v1", tags=["auth"])

    return app


app = create_app()
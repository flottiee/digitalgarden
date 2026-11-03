"""Точка входа FastAPI. Запуск: uvicorn app.main:app"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.routers import auth, events, health

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    docs_url="/docs",  # Swagger UI
    openapi_url="/openapi.json",  # машинночитаемая схема
)

# CORS нужен, чтобы сайт (localhost:3000 в dev, flottiee.bond в проде)
# мог делать fetch к API из браузера. allow_credentials=True обязателен:
# авторизационная cookie передаётся именно через CORS-запросы.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(auth.router)
app.include_router(events.router)


@app.get("/", tags=["health"], include_in_schema=False)
async def root() -> dict[str, str]:
    return {"status": "ok", "docs": "/docs"}

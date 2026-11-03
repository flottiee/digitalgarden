# backend — flottiee.bond

FastAPI + PostgreSQL. Aсинхронный сервис для сайта-визитки: регистрация,
приватное расписание. Frontend (Nuxt) живёт в корне репозитория, backend — здесь.

## Структура

```
app/
├── main.py        точка входа: CORS, роутеры, Swagger (/docs)
├── core/
│   ├── config.py  настройки из env (pydantic-settings)
│   └── db.py      async-engine и сессия SQLAlchemy
├── models/        ORM-модели (таблицы)
├── schemas/       Pydantic: контракт запросов/ответов
├── services/      бизнес-логика
└── routers/       HTTP-эндпоинты
tests/             pytest + httpx (отдельная тестовая БД)
alembic/           миграции
```

Зависимости по слоям: router -> service -> model/session.
Router знает про HTTP, service — про правила, model — про таблицы.

## Локальный запуск

Нужен запущенный PostgreSQL и backend/.env (шаблон — .env.example).

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -e ".[dev]"
.venv/bin/uvicorn app.main:app --reload
```

- Swagger: http://localhost:8000/docs
- Health: http://localhost:8000/health

## Прод

Сервер: flottiee-server (Tailscale 100.68.53.53), PostgreSQL 17 в сети docker
`backend`, деплой — /srv/storage/services/backend (compose в deploy/server).

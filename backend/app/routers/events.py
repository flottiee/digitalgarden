"""HTTP-слой расписания: маршруты, query-параметры, статусы."""

import uuid
from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_db
from app.core.deps import CurrentUser
from app.models.user import User
from app.schemas.events import EventCreate, EventOut, EventUpdate
from app.services import events as events_service

router = APIRouter(prefix="/api/events", tags=["schedule"])

_DB = Annotated[AsyncSession, Depends(get_db)]


# Одинаковый префикс и зависимость у всех обработчиков: всё, что ниже,
# приватно — без валидного JWT не вернётся ни байта расписания.


@router.get("", response_model=list[EventOut])
async def list_events(
    user: CurrentUser,
    db: _DB,
    from_at: Annotated[datetime | None, Query()] = None,
    to_at: Annotated[datetime | None, Query(alias="to")] = None,
) -> list:
    """Список событий текущего пользователя, по возрастанию времени.

    Фильтры: ?from_at=2026-11-03T00:00:00Z&to=... (правая граница
    исключающая). Без фильтров — все события.
    """
    return await events_service.list_events(db, user, from_at=from_at, to_at=to_at)


@router.post("", status_code=status.HTTP_201_CREATED, response_model=EventOut)
async def create_event(
    data: EventCreate,
    user: CurrentUser,
    db: _DB,
) -> object:
    return await events_service.create_event(db, user, data)


@router.get("/{event_id}", response_model=EventOut)
async def get_event(event_id: uuid.UUID, user: CurrentUser, db: _DB) -> object:
    return await events_service.get_event(db, event_id, user)


@router.patch("/{event_id}", response_model=EventOut)
async def update_event(
    event_id: uuid.UUID,
    data: EventUpdate,
    user: CurrentUser,
    db: _DB,
) -> object:
    return await events_service.update_event(db, event_id, user, data)


@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_event(
    event_id: uuid.UUID,
    user: CurrentUser,
    db: _DB,
    response: Response,
) -> None:
    await events_service.delete_event(db, event_id, user)

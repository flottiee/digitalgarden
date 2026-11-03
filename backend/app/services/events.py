"""Бизнес-правила расписания. Ключевое — владелец: чужие события не видны."""

import uuid
from datetime import datetime

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.schedule_event import ScheduleEvent
from app.models.user import User
from app.schemas.events import EventCreate, EventUpdate


def _require_owned(event: ScheduleEvent | None, user: User) -> ScheduleEvent:
    """Событие должно существовать и принадлежать запросившему.

    И «не найдено», и «чужое» отвечаем одинаково 404: не раскрываем
    посторонним, какие id существуют.
    """
    if event is None or event.user_id != user.id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Событие не найдено")
    return event


async def list_events(
    db: AsyncSession,
    user: User,
    *,
    from_at: datetime | None = None,
    to_at: datetime | None = None,
) -> list[ScheduleEvent]:
    """События пользователя по времени (составной индекс обслуживает оба фильтра)."""
    query = select(ScheduleEvent).where(ScheduleEvent.user_id == user.id)
    if from_at is not None:
        query = query.where(ScheduleEvent.starts_at >= from_at)
    if to_at is not None:
        query = query.where(ScheduleEvent.starts_at < to_at)
    query = query.order_by(ScheduleEvent.starts_at)
    result = await db.execute(query)
    return list(result.scalars().all())


async def get_event(db: AsyncSession, event_id: uuid.UUID, user: User) -> ScheduleEvent:
    event = await db.get(ScheduleEvent, event_id)
    return _require_owned(event, user)


async def create_event(db: AsyncSession, user: User, data: EventCreate) -> ScheduleEvent:
    event = ScheduleEvent(
        user_id=user.id,
        title=data.title,
        description=data.description,
        starts_at=data.starts_at,
        ends_at=data.ends_at,
    )
    db.add(event)
    await db.commit()
    await db.refresh(event)
    return event


async def update_event(
    db: AsyncSession,
    event_id: uuid.UUID,
    user: User,
    data: EventUpdate,
) -> ScheduleEvent:
    event = await get_event(db, event_id, user)
    # PATCH: применяем только реально пришедшие поля
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(event, field, value)
    await db.commit()
    await db.refresh(event)
    return event


async def delete_event(db: AsyncSession, event_id: uuid.UUID, user: User) -> None:
    event = await get_event(db, event_id, user)
    await db.delete(event)
    await db.commit()

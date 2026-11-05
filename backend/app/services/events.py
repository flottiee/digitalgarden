"""Бизнес-правила расписания. Ключевое — владелец: чужие события не видны."""

import uuid
from datetime import UTC, datetime, time, timedelta

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
    events = list(result.scalars().all())
    now = datetime.now(UTC)
    changed = False
    pending = await db.execute(
        select(ScheduleEvent).where(
            ScheduleEvent.user_id == user.id,
            ScheduleEvent.is_todo.is_(True),
            ScheduleEvent.completed.is_(False),
            ScheduleEvent.overdue_since.is_not(None),
        )
    )
    events_by_id = {event.id: event for event in events}
    for event in pending.scalars().all():
        events_by_id.setdefault(event.id, event)
    # Автоматическое продвижение даты ежедневным правилом: каждая ночь неисполнения
    # увеличивает приоритет, а сохранённая дата задаёт стабильный порядок старшинства.
    for event in events_by_id.values():
        if not event.is_todo or event.completed:
            continue
        due = event.starts_at
        if due.tzinfo is None:
            due = due.replace(tzinfo=UTC)
        if event.overdue_since is None:
            deadline = datetime.combine(due.date() + timedelta(days=1), time.min, tzinfo=due.tzinfo)
            if now >= deadline:
                event.overdue_since = deadline
                changed = True
        else:
            overdue = event.overdue_since
            if overdue.tzinfo is None:
                overdue = overdue.replace(tzinfo=UTC)
            next_day = overdue + timedelta(days=1)
            if now >= next_day:
                event.overdue_since = next_day
                changed = True
    if changed:
        await db.commit()
    return sorted(events, key=lambda e: (
        0 if e.is_todo and not e.completed and e.overdue_since is not None else 1,
        -(e.overdue_since.timestamp()) if e.is_todo and not e.completed and e.overdue_since is not None else 0,
        e.starts_at,
    ))


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
        is_todo=data.is_todo,
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
    if data.completed is True:
        event.overdue_since = None
    elif data.completed is False:
        event.overdue_since = None
    if data.is_todo is False:
        event.completed = False
        event.overdue_since = None
    await db.commit()
    await db.refresh(event)
    return event


async def delete_event(db: AsyncSession, event_id: uuid.UUID, user: User) -> None:
    event = await get_event(db, event_id, user)
    await db.delete(event)
    await db.commit()

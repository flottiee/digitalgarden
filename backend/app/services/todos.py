"""Бизнес-правила списка задач."""

import uuid

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.todo import Todo
from app.models.user import User
from app.schemas.todos import TodoCreate, TodoUpdate


def _require_owned(todo: Todo | None, user: User) -> Todo:
    if todo is None or todo.user_id != user.id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Задача не найдена")
    return todo


async def list_todos(db: AsyncSession, user: User) -> list[Todo]:
    result = await db.execute(
        select(Todo).where(Todo.user_id == user.id).order_by(Todo.completed, Todo.created_at)
    )
    return list(result.scalars().all())


async def get_todo(db: AsyncSession, todo_id: uuid.UUID, user: User) -> Todo:
    return _require_owned(await db.get(Todo, todo_id), user)


async def create_todo(db: AsyncSession, user: User, data: TodoCreate) -> Todo:
    todo = Todo(user_id=user.id, **data.model_dump())
    db.add(todo)
    await db.commit()
    await db.refresh(todo)
    return todo


async def update_todo(
    db: AsyncSession, todo_id: uuid.UUID, user: User, data: TodoUpdate
) -> Todo:
    todo = await get_todo(db, todo_id, user)
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(todo, field, value)
    await db.commit()
    await db.refresh(todo)
    return todo


async def delete_todo(db: AsyncSession, todo_id: uuid.UUID, user: User) -> None:
    todo = await get_todo(db, todo_id, user)
    await db.delete(todo)
    await db.commit()

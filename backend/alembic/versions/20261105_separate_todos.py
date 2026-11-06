"""Separate todos from schedule events.

Revision ID: 20261105_separate_todos
Revises: 20261105_todo
"""

from alembic import op
import sqlalchemy as sa


revision = "20261105_separate_todos"
down_revision = "20261105_todo"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "todos",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("user_id", sa.Uuid(), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("completed", sa.Boolean(), server_default=sa.false(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_todos_user_completed_created", "todos", ["user_id", "completed", "created_at"])

    # Сохраняем уже созданные задачи, затем удаляем их из календарной таблицы.
    op.execute(
        """
        INSERT INTO todos (id, user_id, title, description, completed, created_at, updated_at)
        SELECT id, user_id, title, description, completed, created_at, updated_at
        FROM schedule_events
        WHERE is_todo = true
        """
    )
    op.execute("DELETE FROM schedule_events WHERE is_todo = true")

    # Старые события без конца получают часовую длительность, чтобы новое правило
    # обязательного интервала не оставило в базе невалидные записи.
    op.execute("UPDATE schedule_events SET ends_at = starts_at + INTERVAL '1 hour' WHERE ends_at IS NULL")
    op.alter_column("schedule_events", "ends_at", existing_type=sa.DateTime(timezone=True), nullable=False)
    op.drop_column("schedule_events", "overdue_since")
    op.drop_column("schedule_events", "completed")
    op.drop_column("schedule_events", "is_todo")


def downgrade() -> None:
    op.add_column("schedule_events", sa.Column("is_todo", sa.Boolean(), server_default=sa.false(), nullable=False))
    op.add_column("schedule_events", sa.Column("completed", sa.Boolean(), server_default=sa.false(), nullable=False))
    op.add_column("schedule_events", sa.Column("overdue_since", sa.DateTime(timezone=True), nullable=True))
    op.execute(
        """
        INSERT INTO schedule_events (id, user_id, title, description, starts_at, ends_at, is_todo, completed, created_at, updated_at)
        SELECT id, user_id, title, description, created_at, NULL, true, completed, created_at, updated_at
        FROM todos
        """
    )
    op.drop_index("ix_todos_user_completed_created", table_name="todos")
    op.drop_table("todos")
    op.alter_column("schedule_events", "ends_at", existing_type=sa.DateTime(timezone=True), nullable=True)

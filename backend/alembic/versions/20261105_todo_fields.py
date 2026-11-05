"""Add todo state to schedule events."""
from alembic import op
import sqlalchemy as sa

revision = "20261105_todo"
down_revision = "78282b1afa9c"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("schedule_events", sa.Column("is_todo", sa.Boolean(), server_default=sa.false(), nullable=False))
    op.add_column("schedule_events", sa.Column("completed", sa.Boolean(), server_default=sa.false(), nullable=False))
    op.add_column("schedule_events", sa.Column("overdue_since", sa.DateTime(timezone=True), nullable=True))


def downgrade() -> None:
    op.drop_column("schedule_events", "overdue_since")
    op.drop_column("schedule_events", "completed")
    op.drop_column("schedule_events", "is_todo")

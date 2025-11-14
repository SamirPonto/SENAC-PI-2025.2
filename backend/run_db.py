from app.db.base import Base
from app.db.session import engine
from app.db.models import *

from sqlalchemy import text

schemas = ["auth", "learn", "quiz"]

with engine.connect() as conn:
    for schema in schemas:
        conn.execute(text(f"CREATE SCHEMA IF NOT EXISTS {schema};"))
    conn.commit()

Base.metadata.create_all(engine)

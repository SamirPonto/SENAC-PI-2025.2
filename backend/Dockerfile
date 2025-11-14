FROM python:3.14-slim

# Install dependencies
RUN pip install uv 

WORKDIR /app

# Copy project files first (for caching)
COPY pyproject.toml .
COPY uv.lock .

# Install all dependencies inside /app/.venv
RUN uv sync --frozen --no-dev

# Now copy the application code
COPY . .

# Expose API port
EXPOSE 8000

# Run FastAPI
CMD ["uv", "run", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]

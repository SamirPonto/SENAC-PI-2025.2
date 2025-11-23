from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.db.models import User
from app.core.security import verify_password, create_access_token

from app.core.security import hash_password
from app.routes.schemas import RegisterUser, UserPublic

router = APIRouter(prefix="/auth")


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    # username is email for OAuth2PasswordRequestForm
    email = form_data.username

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Incorrect email or password")

    if not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Incorrect email or password")

    # Corrigido: Usar .value para garantir que o role é uma string no JWT payload
    token_data = {
        "sub": user.email,
        "role": user.role.value,  # CORREÇÃO APLICADA AQUI
        "uid": user.id,
    }

    access_token = create_access_token(token_data)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role.value,
        },
    }


@router.post("/register", response_model=UserPublic)
def register_user(
    data: RegisterUser,
    db: Session = Depends(get_db),
):
    # Check if email exists
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )

    # Create user
    user = User(
        name=data.name,
        email=data.email,
        password_hash=hash_password(data.password),
        role=data.role,  # automatically matches Enum
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return UserPublic(
        id=user.id,
        name=user.name,
        email=user.email,
        role=user.role.value,
    )
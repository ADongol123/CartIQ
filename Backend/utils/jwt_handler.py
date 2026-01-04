from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status, Request
from datetime import datetime, timedelta
from utils.config import settings

# Create token (already have this)
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


# Dependency: get current user from token
def get_current_user(request: Request):
    token = None

    # 1. Try from cookie
    if "auth_token" in request.cookies:
        token = request.cookies.get("auth_token")

    # 2. Try from Authorization header
    elif request.headers.get("Authorization"):
        auth_header = request.headers.get("Authorization")
        if auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token payload")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    # return dict with email (so you can use in routes)
    return {"email": email}

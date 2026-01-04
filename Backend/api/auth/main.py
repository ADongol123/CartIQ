import os 
from fastapi import APIRouter,HTTPException,Response,Depends
from api.auth.models import RegisterModel
from db.database import users_collection
from utils.hashing import hash_password,verify_password
from fastapi.security import OAuth2PasswordRequestForm  
from utils.jwt_handler import create_access_token
router = APIRouter()


@router.post("/register")
async def register(user: RegisterModel):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = hash_password(user.password)
    user_dict = user.dict()
    user_dict["hashed_password"] = hashed_pw
    user_dict["is_google_user"] = False
    del user_dict["password"]
    users_collection.insert_one(user_dict)
    return {"msg": "User registered successfully"}



@router.post("/auth/login")
async def login(response: Response, payload:  OAuth2PasswordRequestForm = Depends()): 
    db_user = await users_collection.find_one({"email": payload.username})
    if not db_user or not verify_password(payload.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": payload.username})
    response.set_cookie(
        key="auth_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="strict",
        max_age=3600,
        path="/"
    )

    return {"message": "Login successful","email":db_user["email"], "token":token}
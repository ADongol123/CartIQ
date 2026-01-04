from pydantic import BaseModel,EmailStr


class LoginRequest(BaseModel):
    username:str
    password:str
    
class RegisterModel(BaseModel):
    email:EmailStr
    full_name:str
    password:str
    
    
class LoginModel(BaseModel):
    email:EmailStr
    password:str
    
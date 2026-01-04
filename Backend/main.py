import uvicorn  
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.auth.main import router as auth_router
from api.chat.main import router as chat_router



app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or a list of allowed origins, e.g., ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods, e.g., GET, POST, PUT, DELETE
    allow_headers=["*"],  # Allows all headers
)


app.include_router(auth_router)
app.include_router(chat_router)



@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI application!"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
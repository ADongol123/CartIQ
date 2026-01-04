import os 
from dotenv import load_dotenv

load_dotenv()


class Settings:
    APP_Name = "ChatMate"
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
    MONGODB_URL = os.getenv("MONGO_URL")
    GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
    DB_NAME = os.getenv("DB_NAME")
    COMPANY_DATA_COLLECTION= os.getenv("COMPANY_DATA_COLLECTION")
    QDRANT_URL = os.getenv("QDRANT_URL")
    QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
    VECTOR_COLLECTION_PREFIX: str = os.getenv("VECTOR_COLLECTION_PREFIX", "user")
    DEFAULT_VECTOR_SIZE: int = int(os.getenv("DEFAULT_VECTOR_SIZE", "1536")) 
    CHUNK_SIZE_CHARS: int = int(os.getenv("CHUNK_SIZE_CHARS", "1200"))
    CHUNK_OVERLAP: int = int(os.getenv("CHUNK_OVERLAP", "200"))
settings = Settings()


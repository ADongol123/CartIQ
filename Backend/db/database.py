from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from utils.config import settings


load_dotenv()


client  = AsyncIOMotorClient(settings.MONGODB_URL)
db = client[settings.DB_NAME]
users_collection = db["users"]
company_data_collection = db[settings.COMPANY_DATA_COLLECTION]


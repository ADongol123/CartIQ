from pydantic import BaseModel

class IntentRequest(BaseModel):
    query: str
    
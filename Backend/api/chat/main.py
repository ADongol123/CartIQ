# from app.core.intent_classification import classify_intent_with_mistral
from fastapi import APIRouter
from fastapi import HTTPException
from pydantic import BaseModel
from api.chat.models import IntentRequest
from core.intent_classification import classify_intent_with_mistral

router = APIRouter(prefix="/chat/intent", tags=["E-commerce_intent_classification"])

@router.post("/classify")
def classify_intent(request: IntentRequest):
    try:
        classification = classify_intent_with_mistral(request.query)
        print("Final classification result:", classification)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error classifying intent: {str(e)}")
        
    return classification
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import uuid  # <-- import chat directly
import ollama

# app = FastAPI(title="Dynamic Sales Bot with Mistral")

# In-memory conversation store
conversations: Dict[str, List[Dict]] = {}

# Request schema
class UserMessage(BaseModel):
    user_id: Optional[str] = None
    message: str

# Response schema
class BotResponse(BaseModel):
    user_id: str
    response: str
    conversation: List[Dict]

def get_or_create_user_id(user_id: Optional[str]) -> str:
    if not user_id:
        user_id = str(uuid.uuid4())
    if user_id not in conversations:
        conversations[user_id] = []
    return user_id

def build_prompt(user_id: str, user_message: str) -> str:
    history = conversations[user_id]
    prompt = (
        "You are a friendly, professional sales assistant. "
        "You help users find products by asking relevant questions naturally. "
        "Do not ask generic questions—adapt to the user's product interest.\n\n"
    )
    for entry in history:
        prompt += f"{entry['role']}: {entry['message']}\n"
    prompt += f"user: {user_message}\nassistant:"
    return prompt

def call_mistral(prompt: str) -> str:
    """Call Mistral via Ollama."""
    try:
        response = ollama.chat(
            model="mistral",
            messages=[{"role": "user", "content": prompt}],
            options={"temperature": 0.3}  # more focused, less random
        )
        raw_output = response["message"]["content"]
        print("Raw output from Mistral:", raw_output)
        return raw_output.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Mistral error: {e}")


@router.post("/chat", response_model=BotResponse)
def chat_endpoint(request: UserMessage):
    user_id = get_or_create_user_id(request.user_id)

    # Save user message
    conversations[user_id].append({"role": "user", "message": request.message})

    # Build prompt
    prompt = build_prompt(user_id, request.message)

    # Get response from Mistral
    bot_reply = call_mistral(prompt)

    # Save bot response
    conversations[user_id].append({"role": "assistant", "message": bot_reply})

    return BotResponse(
        user_id=user_id,
        response=bot_reply,
        conversation=conversations[user_id]
    )

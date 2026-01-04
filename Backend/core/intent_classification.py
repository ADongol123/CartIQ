from typing import Dict, Any
from textblob import TextBlob
from utils.ecom_helpers import clean_llm_json, load_prompt
import ollama
from tenacity import retry, stop_after_attempt, wait_exponential
import langdetect

class ClassificationError(Exception):
    pass

def load_classification_prompt(template_path: str, query: str) -> str:
    """
    Load intent classification prompt template and inject the query.
    """
    with open(template_path, "r",  encoding="utf-8") as f:
        template = f.read()
    # Replace placeholder {query} in your prompt
    return template.replace("{query}", query)



def classify_intent_with_mistral(query: str) -> Dict[str, Any]:
    """
    Classify query using Mistral LLM. Return JSON with intent, entities and confidence.
    """
    
    if not query or query.isspace():
        return {"intent": "unknown", "key_entities": [], "confidence": 1.0}
    
    
    # Preprocess query
    query = query.lower().strip()
    
    query = str(TextBlob(query).correct())
    
    
    # Load prompt
    prompt = load_classification_prompt("prompt/intent_classification.txt", query)
    print("Prompt sent to Mistral:", prompt)
    try:
        response = ollama.chat(
            model="mistral",
            messages=[{"role": "user", "content": prompt}],
            options = {"temperature": 0.3}
        )  
        raw_output = response["message"]["content"]
        print("Raw output from Mistral:", raw_output)
    except Exception as e:
        raise ClassificationError(f"Mistral API error: {str(e)}")
    
    
    result  = clean_llm_json(raw_output)
    print("Cleaned output:", result)
    return result
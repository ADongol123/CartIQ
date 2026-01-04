def load_prompt(file_path, query, docs_text):
    with open(file_path, 'r') as file:
        prompt_template = file.read()
    return prompt_template.format(query=query, docs_text=docs_text)




def clean_llm_json(text: str):
    import re, json

    # Remove fences if they exist
    cleaned = re.sub(r"```json|```", "", text).strip()

    # Extract only the first {...} JSON block
    match = re.search(r"\{.*\}", cleaned, re.DOTALL)
    if not match:
        raise ValueError("No JSON object found in response")

    json_str = match.group(0)
    return json.loads(json_str)

import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url=os.getenv("AI_BASE_URL"),
    api_key=os.getenv("AI_API_KEY")
)

def analyze_resume_text(text: str):
    response = client.chat.completions.create(
        model=os.getenv("AI_MODEL"),
        messages=[
            {"role": "system", "content": "You are a senior recruiter. Analyze this resume and return JSON."},
            {"role": "user", "content": text}
        ],
        response_format={ "type": "json_object" } # Ensure AI returns valid JSON
    )
    return response.choices[0].message.content
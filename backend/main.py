from fastapi import FastAPI, UploadFile, File
from services.pdf_service import extract_text_from_pdf
from services.ai_service import analyze_resume_text
import shutil

app = FastAPI()

@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    # 1. Save file temporarily
    temp_path = f"uploads/{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # 2. Extract Text
    text = extract_text_from_pdf(temp_path)
    
    # 3. AI Analysis
    analysis = analyze_resume_text(text)
    
    return analysis
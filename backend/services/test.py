from pathlib import Path
import sys


# Ensure the backend directory is on sys.path so we can import services.*
CURRENT_DIR = Path(__file__).resolve().parent
BACKEND_DIR = CURRENT_DIR.parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from services.ai_service import analyze_resume_text


if __name__ == "__main__":
    print(analyze_resume_text("hi there"))
import fitz  # PyMuPDF
from pathlib import Path


# Base directory for the backend (one level up from this file).
BASE_DIR = Path(__file__).resolve().parent.parent


def _resolve_pdf_path(file_path: str) -> Path:
    """
    Resolve the given file path to an absolute Path.

    - If `file_path` is already absolute, return it.
    - If it's relative, treat it as relative to the backend base directory.
    """
    path = Path(file_path)
    if not path.is_absolute():
        path = BASE_DIR / file_path
    return path


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract text from a PDF file.

    `file_path` can be:
    - an absolute path like `/home/anonymous/Git/ResInt/backend/uploads/resume.pdf`
    - a path relative to the backend directory, e.g. `uploads/resume.pdf`
    """
    pdf_path = _resolve_pdf_path(file_path)

    # Open the PDF and concatenate the text from all pages.
    with fitz.open(pdf_path) as doc:
        text = ""
        for page in doc:
            text += page.get_text()
    return text
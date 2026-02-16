from typing import List, Optional
from pydantic import BaseModel, Field


class ATSResult(BaseModel):
    score: float = Field(..., ge=0, le=100, description="Overall ATS score (0–100).")
    summary: str = Field(..., description="Short summary of the evaluation.")
    strengths: List[str] = Field(default_factory=list, description="Key strengths identified.")
    weaknesses: List[str] = Field(default_factory=list, description="Key weaknesses or gaps.")
    suggestions: List[str] = Field(
        default_factory=list,
        description="Actionable suggestions for improving the resume or profile.",
    )
    job_title: Optional[str] = Field(
        None, description="Target job title or role the ATS evaluation is for."
    )
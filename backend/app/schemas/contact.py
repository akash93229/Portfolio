from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class ContactBase(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10)

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    status: Optional[str] = Field(None, pattern="^(new|read|replied)$")

class ContactResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    message: str
    status: str
    created_at: datetime
    user_id: Optional[int] = None
    
    class Config:
        from_attributes = True

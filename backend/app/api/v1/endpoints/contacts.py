from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.database import get_db
from app.db import models
from app.schemas.contact import ContactCreate, ContactResponse, ContactUpdate
from app.api.dependencies import get_current_active_user
from app.core.email import send_admin_notification, send_user_confirmation

router = APIRouter()

@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def create_contact(
    contact_data: ContactCreate,
    db: Session = Depends(get_db)
):
    """Create a new contact message (public endpoint)"""
    # Save to database
    db_contact = models.Contact(
        first_name=contact_data.first_name,
        last_name=contact_data.last_name,
        email=contact_data.email,
        message=contact_data.message,
        status="new"
    )
    
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    
    # Send TWO separate emails
    try:
        # EMAIL 1: Admin notification (to Akash)
        send_admin_notification(
            first_name=contact_data.first_name,
            last_name=contact_data.last_name,
            user_email=contact_data.email,
            message=contact_data.message
        )
        
        # EMAIL 2: User confirmation (to the person who submitted)
        send_user_confirmation(
            first_name=contact_data.first_name,
            last_name=contact_data.last_name,
            user_email=contact_data.email
        )
    except Exception as e:
        print(f"Email sending failed: {e}")
        # Continue even if email fails - message is still saved in database
    
    return db_contact

@router.get("/", response_model=List[ContactResponse])
async def get_contacts(
    skip: int = 0,
    limit: int = 100,
    status_filter: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """Get all contact messages (authenticated users only)"""
    query = db.query(models.Contact)
    
    if status_filter:
        query = query.filter(models.Contact.status == status_filter)
    
    contacts = query.order_by(models.Contact.created_at.desc()).offset(skip).limit(limit).all()
    return contacts

@router.get("/{contact_id}", response_model=ContactResponse)
async def get_contact(
    contact_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """Get a specific contact message"""
    contact = db.query(models.Contact).filter(models.Contact.id == contact_id).first()
    
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact not found"
        )
    
    return contact

@router.patch("/{contact_id}", response_model=ContactResponse)
async def update_contact_status(
    contact_id: int,
    contact_update: ContactUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """Update contact message status"""
    contact = db.query(models.Contact).filter(models.Contact.id == contact_id).first()
    
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact not found"
        )
    
    if contact_update.status:
        contact.status = contact_update.status
    
    db.commit()
    db.refresh(contact)
    
    return contact

@router.delete("/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_contact(
    contact_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """Delete a contact message"""
    contact = db.query(models.Contact).filter(models.Contact.id == contact_id).first()
    
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact not found"
        )
    
    db.delete(contact)
    db.commit()
    
    return None

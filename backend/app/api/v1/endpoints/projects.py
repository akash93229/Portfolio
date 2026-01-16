from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import json
from app.db.database import get_db
from app.db import models
from app.schemas.project import ProjectCreate, ProjectResponse, ProjectUpdate
from app.api.dependencies import get_current_active_user

router = APIRouter()

@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(
    project_data: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """Create a new project"""
    db_project = models.Project(
        title=project_data.title,
        description=project_data.description,
        tech_stack=json.dumps(project_data.tech_stack) if project_data.tech_stack else None,
        period=project_data.period,
        client=project_data.client,
        link=project_data.link,
        is_featured=project_data.is_featured
    )
    
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    
    # Convert tech_stack back to list
    if db_project.tech_stack:
        db_project.tech_stack = json.loads(db_project.tech_stack)
    
    return db_project

@router.get("/", response_model=List[ProjectResponse])
async def get_projects(
    skip: int = 0,
    limit: int = 100,
    featured_only: bool = False,
    db: Session = Depends(get_db)
):
    """Get all projects (public endpoint)"""
    query = db.query(models.Project)
    
    if featured_only:
        query = query.filter(models.Project.is_featured == True)
    
    projects = query.order_by(models.Project.created_at.desc()).offset(skip).limit(limit).all()
    
    # Convert tech_stack to list for each project
    for project in projects:
        if project.tech_stack:
            project.tech_stack = json.loads(project.tech_stack)
    
    return projects

@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(
    project_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific project"""
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    if project.tech_stack:
        project.tech_stack = json.loads(project.tech_stack)
    
    return project

@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: int,
    project_update: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """Update a project"""
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    update_data = project_update.model_dump(exclude_unset=True)
    
    if "tech_stack" in update_data and update_data["tech_stack"]:
        update_data["tech_stack"] = json.dumps(update_data["tech_stack"])
    
    for field, value in update_data.items():
        setattr(project, field, value)
    
    db.commit()
    db.refresh(project)
    
    if project.tech_stack:
        project.tech_stack = json.loads(project.tech_stack)
    
    return project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
):
    """Delete a project"""
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    db.delete(project)
    db.commit()
    
    return None

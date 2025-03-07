
import { getToken } from '@/utils/auth';

// Interface for project data
export interface ProjectData {
  title: string;
  category: string;
  goal: number;
  duration: number;
  description: string;
  story: string;
  rewards?: any[];
  coverImage?: string;
}

// Get all projects
export const getAllProjects = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/projects');
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Get project by ID
export const getProjectById = async (projectId: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/projects/${projectId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch project');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    throw error;
  }
};

// Create new project
export const createProject = async (projectData: ProjectData) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(projectData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create project');
    }
    
    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Update project
export const updateProject = async (projectId: string, projectData: Partial<ProjectData>) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(projectData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update project');
    }
    
    return data;
  } catch (error) {
    console.error(`Error updating project ${projectId}:`, error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (projectId: string) => {
  const token = getToken();
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete project');
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error);
    throw error;
  }
};

// Get user projects
export const getUserProjects = async () => {
  const token = getToken();
  
  if (!token) {
    throw new Error('Authentication required');
  }
  
  try {
    const response = await fetch('http://localhost:5000/api/projects/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user projects');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user projects:', error);
    throw error;
  }
};

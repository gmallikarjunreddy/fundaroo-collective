
import { mockProjects } from '@/utils/mockData';

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
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockProjects];
};

// Get project by ID
export const getProjectById = async (projectId: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const project = mockProjects.find(p => p._id === projectId);
  if (!project) {
    throw new Error('Project not found');
  }
  
  return project;
};

// Create new project
export const createProject = async (projectData: ProjectData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Creating project with data:', projectData);
  
  // Create a new project with mock data
  const newProject = {
    _id: `new-${Date.now()}`,
    ...projectData,
    creator: { name: 'Demo User', fullName: 'Demo User' },
    raised: 0,
    featured: false,
    createdAt: new Date().toISOString()
  };
  
  // In a real app, this would be saved to a database
  mockProjects.push(newProject);
  
  return newProject;
};

// Update project
export const updateProject = async (projectId: string, projectData: Partial<ProjectData>) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const projectIndex = mockProjects.findIndex(p => p._id === projectId);
  if (projectIndex === -1) {
    throw new Error('Project not found');
  }
  
  // Update the project
  mockProjects[projectIndex] = {
    ...mockProjects[projectIndex],
    ...projectData
  };
  
  return mockProjects[projectIndex];
};

// Delete project
export const deleteProject = async (projectId: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const projectIndex = mockProjects.findIndex(p => p._id === projectId);
  if (projectIndex === -1) {
    throw new Error('Project not found');
  }
  
  // Remove the project
  mockProjects.splice(projectIndex, 1);
  
  return true;
};

// Get user projects
export const getUserProjects = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For demo purposes, return the first 2 projects as user projects
  return mockProjects.slice(0, 2);
};

// Donate to a project (new function)
export const donateToProject = async (projectId: string, amount: number) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const projectIndex = mockProjects.findIndex(p => p._id === projectId);
  if (projectIndex === -1) {
    throw new Error('Project not found');
  }
  
  // Update the project's raised amount
  mockProjects[projectIndex].raised += amount;
  
  return {
    success: true,
    project: mockProjects[projectIndex]
  };
};

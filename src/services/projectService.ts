
import { mockProjects } from '@/utils/mockData';
import { toast } from 'sonner';

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

export interface Project {
  _id: string;
  title: string;
  category: string;
  goal: number;
  duration: number;
  description: string;
  story: string;
  rewards?: any[];
  coverImage: string;
  creator: { 
    name: string; 
    fullName: string;
  };
  raised: number;
  featured: boolean;
  createdAt: string;
  backers?: number;
  daysLeft?: number;
}

// Calculate days left for a project
const calculateDaysLeft = (createdAt: string, duration: number): number => {
  const endDate = new Date(createdAt);
  endDate.setDate(endDate.getDate() + duration);
  
  const now = new Date();
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
};

// Get all projects
export const getAllProjects = async (): Promise<Project[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Add backers and daysLeft
  return mockProjects.map(project => ({
    ...project,
    backers: project.backers || Math.floor(Math.random() * 200) + 5,
    daysLeft: project.daysLeft || calculateDaysLeft(project.createdAt, project.duration)
  }));
};

// Get project by ID
export const getProjectById = async (projectId: string): Promise<Project> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log("Fetching project with ID:", projectId);
  
  const project = mockProjects.find(p => p._id === projectId);
  if (!project) {
    console.error("Project not found:", projectId);
    throw new Error('Project not found');
  }
  
  // Add backers and daysLeft if they don't exist
  return {
    ...project,
    backers: project.backers || Math.floor(Math.random() * 200) + 5,
    daysLeft: project.daysLeft || calculateDaysLeft(project.createdAt, project.duration)
  };
};

// Create new project
export const createProject = async (projectData: ProjectData): Promise<Project> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Creating project with data:', projectData);
  
  // Create a new project with mock data
  const newProject: Project = {
    _id: `new-${Date.now()}`,
    ...projectData,
    coverImage: projectData.coverImage || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop', // Default image if not provided
    creator: { name: 'Demo User', fullName: 'Demo User' },
    raised: 0,
    featured: false,
    createdAt: new Date().toISOString(),
    backers: 0,
    daysLeft: projectData.duration
  };
  
  // In a real app, this would be saved to a database
  mockProjects.push(newProject);
  
  toast.success("Project created successfully!");
  return newProject;
};

// Update project
export const updateProject = async (projectId: string, projectData: Partial<ProjectData>): Promise<Project> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const projectIndex = mockProjects.findIndex(p => p._id === projectId);
  if (projectIndex === -1) {
    toast.error("Project not found");
    throw new Error('Project not found');
  }
  
  // Update the project
  mockProjects[projectIndex] = {
    ...mockProjects[projectIndex],
    ...projectData,
    coverImage: projectData.coverImage || mockProjects[projectIndex].coverImage
  };
  
  toast.success("Project updated successfully!");
  return mockProjects[projectIndex];
};

// Delete project
export const deleteProject = async (projectId: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const projectIndex = mockProjects.findIndex(p => p._id === projectId);
  if (projectIndex === -1) {
    toast.error("Project not found");
    throw new Error('Project not found');
  }
  
  // Remove the project
  mockProjects.splice(projectIndex, 1);
  
  toast.success("Project deleted successfully!");
  return true;
};

// Get user projects
export const getUserProjects = async (): Promise<Project[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For demo purposes, return the first 2 projects as user projects
  return mockProjects.slice(0, 2).map(project => ({
    ...project,
    backers: project.backers || Math.floor(Math.random() * 200) + 5,
    daysLeft: project.daysLeft || calculateDaysLeft(project.createdAt, project.duration)
  }));
};

// Donate to a project
export const donateToProject = async (projectId: string, amount: number) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log(`Processing donation of ₹${amount} to project ${projectId}`);
  
  const projectIndex = mockProjects.findIndex(p => p._id === projectId);
  if (projectIndex === -1) {
    console.error("Project not found for donation:", projectId);
    toast.error("Project not found");
    throw new Error('Project not found');
  }
  
  // Update the project's raised amount
  mockProjects[projectIndex].raised += amount;
  
  // Increment backers count
  mockProjects[projectIndex].backers = (mockProjects[projectIndex].backers || 0) + 1;
  
  console.log(`Updated project funding: ₹${mockProjects[projectIndex].raised}`);
  
  return {
    success: true,
    project: mockProjects[projectIndex]
  };
};

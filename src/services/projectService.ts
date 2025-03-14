
import { mockProjects as initialMockProjects } from '@/utils/mockData';
import { toast } from 'sonner';
import { getUserInfo } from '@/utils/auth';

// Interface for project data
export interface ProjectData {
  title: string;
  category: string;
  goal: number;
  duration: number;
  description: string;
  story: string;
  rewards?: any[];
  coverImage: string; // Changed from optional to required
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
    _id?: string;
  };
  raised: number;
  featured: boolean;
  createdAt: string;
  backers: number;
  daysLeft: number;
}

// Load projects from localStorage or use the initial mock data
const loadProjects = (): Project[] => {
  const storedProjects = localStorage.getItem('fundaroo_projects');
  if (storedProjects) {
    try {
      return JSON.parse(storedProjects);
    } catch (error) {
      console.error('Error parsing stored projects:', error);
      return [...initialMockProjects];
    }
  }
  return [...initialMockProjects];
};

// Save projects to localStorage
const saveProjects = (projects: Project[]) => {
  localStorage.setItem('fundaroo_projects', JSON.stringify(projects));
};

// Initialize the projects array
let mockProjects = loadProjects();

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
  
  // Get current user info
  const userInfo = getUserInfo();
  if (!userInfo) {
    throw new Error('You must be logged in to create a project');
  }
  
  // Create a new project with user data
  const newProject: Project = {
    _id: `project-${Date.now()}`,
    ...projectData,
    coverImage: projectData.coverImage || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop', // Default image if not provided
    creator: { 
      name: userInfo.name, 
      fullName: userInfo.name,
      _id: userInfo._id 
    },
    raised: 0,
    featured: false,
    createdAt: new Date().toISOString(),
    backers: 0,
    daysLeft: projectData.duration
  };
  
  // In a real app, this would be saved to a database
  mockProjects.push(newProject);
  
  // Save updated projects to localStorage
  saveProjects(mockProjects);
  
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
  
  // Save updated projects to localStorage
  saveProjects(mockProjects);
  
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
  
  // Save updated projects to localStorage
  saveProjects(mockProjects);
  
  toast.success("Project deleted successfully!");
  return true;
};

// Get user projects
export const getUserProjects = async (): Promise<Project[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get current user info
  const userInfo = getUserInfo();
  console.log('Getting user projects for:', userInfo);
  
  if (!userInfo) {
    console.warn('No user info found when getting user projects');
    return [];
  }
  
  // Filter projects by creator ID
  const userProjects = mockProjects.filter(project => 
    project.creator?._id === userInfo._id
  );
  
  console.log('User projects found:', userProjects.length);
  
  // Return projects with backers and daysLeft
  return userProjects.map(project => ({
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
  
  // Save updated projects to localStorage
  saveProjects(mockProjects);
  
  console.log(`Updated project funding: ₹${mockProjects[projectIndex].raised}`);
  
  return {
    success: true,
    project: mockProjects[projectIndex]
  };
};

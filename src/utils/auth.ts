
import { toast } from 'sonner';
import { mockUser } from './mockData';

// Helper function to get user info from localStorage
export const getUserInfo = () => {
  const userInfoString = localStorage.getItem('userInfo');
  if (!userInfoString) return null;
  
  try {
    return JSON.parse(userInfoString);
  } catch (e) {
    console.error('Error parsing user info from localStorage', e);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getUserInfo();
};

// Get auth token
export const getToken = () => {
  const userInfo = getUserInfo();
  return userInfo?.token || null;
};

// Login user
export const loginUser = async (email: string, password: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // For demo, just check if email contains "demo" and password isn't empty
  if (email.includes('demo') && password.length > 0) {
    // Save user data to localStorage
    localStorage.setItem('userInfo', JSON.stringify(mockUser));
    return mockUser;
  } else {
    throw new Error('Invalid email or password. Try using an email with "demo".');
  }
};

// Register user
export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // For demo, just create a new user with the provided data
  const newUser = {
    ...mockUser,
    name: userData.name,
    email: userData.email
  };
  
  // Save user data to localStorage
  localStorage.setItem('userInfo', JSON.stringify(newUser));
  
  return newUser;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('userInfo');
  toast.success('You have been logged out');
};

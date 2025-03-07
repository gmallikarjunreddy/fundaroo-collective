
import { toast } from 'sonner';

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
  try {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to login');
    }

    // Save user data to localStorage
    localStorage.setItem('userInfo', JSON.stringify(data));
    
    return data;
  } catch (error) {
    throw error;
  }
};

// Register user
export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to register');
    }

    // Save user data to localStorage
    localStorage.setItem('userInfo', JSON.stringify(data));
    
    return data;
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('userInfo');
  toast.success('You have been logged out');
};

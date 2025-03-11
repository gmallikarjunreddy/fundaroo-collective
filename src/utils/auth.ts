
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

// Helper to get registered users from localStorage
const getRegisteredUsers = () => {
  const registeredUsersString = localStorage.getItem('registeredUsers');
  if (!registeredUsersString) return [];
  
  try {
    return JSON.parse(registeredUsersString);
  } catch (e) {
    console.error('Error parsing registered users from localStorage', e);
    return [];
  }
};

// Login user
export const loginUser = async (email: string, password: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  console.log('Attempting login with:', email);
  
  // Check if the user is registered
  const registeredUsers = getRegisteredUsers();
  console.log('Registered users:', registeredUsers);
  
  const registeredUser = registeredUsers.find(
    (user: any) => user.email === email && user.password === password
  );

  if (registeredUser) {
    console.log('Found registered user:', registeredUser);
    
    // Create a sanitized user object (remove password)
    const userToStore = {
      _id: registeredUser._id,
      name: registeredUser.name || registeredUser.fullName,
      email: registeredUser.email,
      token: `user-token-${Date.now()}`,
      isAdmin: registeredUser.isAdmin || false
    };
    
    // Save user data to localStorage
    localStorage.setItem('userInfo', JSON.stringify(userToStore));
    return userToStore;
  }
  
  // Fallback for demo users
  if (email.includes('demo') && password.length > 0) {
    // Save user data to localStorage
    localStorage.setItem('userInfo', JSON.stringify(mockUser));
    return mockUser;
  }
  
  throw new Error('Invalid email or password. Try using an email with "demo" or sign up first.');
};

// Register user
export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('Registering user:', userData.email);

  // Check if user already exists
  const registeredUsers = getRegisteredUsers();
  const userExists = registeredUsers.some(
    (user: any) => user.email === userData.email
  );

  if (userExists) {
    throw new Error('User with this email already exists');
  }

  // Create a new user with a unique ID
  const newUser = {
    _id: `user-${Date.now()}`,
    fullName: userData.name,
    name: userData.name,
    email: userData.email,
    password: userData.password, // In a real app, this would be hashed
    isAdmin: false,
    createdAt: new Date().toISOString()
  };
  
  console.log('Created new user:', newUser);
  
  // Save to registered users in localStorage
  const updatedUsers = [...registeredUsers, newUser];
  localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
  console.log('Updated registered users:', updatedUsers);
  
  // Return a sanitized user object (without password)
  const userToReturn = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token: `user-token-${Date.now()}`,
    isAdmin: newUser.isAdmin
  };
  
  // Also log the user in (store in localStorage)
  localStorage.setItem('userInfo', JSON.stringify(userToReturn));
  
  return userToReturn;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('userInfo');
  toast.success('You have been logged out');
};

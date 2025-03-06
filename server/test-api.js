
const fetch = require('node-fetch');

// Configuration
const API_URL = 'http://localhost:5000/api';
let authToken = '';

// Test user credentials
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

// Helper function for API requests
async function apiRequest(endpoint, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  
  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  };
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();
    
    return {
      status: response.status,
      data,
      success: response.ok
    };
  } catch (error) {
    console.error(`Error making request to ${endpoint}:`, error);
    return {
      status: 500,
      data: { message: error.message },
      success: false
    };
  }
}

// Test functions
async function testRegister() {
  console.log('\n===== Testing User Registration =====');
  const result = await apiRequest('/users/register', 'POST', testUser);
  
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  
  if (result.success) {
    console.log('✅ Registration successful');
  } else {
    console.log('❌ Registration failed');
    // If user already exists, this is expected in repeated tests
    if (result.data.message.includes('already exists')) {
      console.log('Note: User already exists, which is fine for repeated tests');
    }
  }
}

async function testLogin() {
  console.log('\n===== Testing User Login =====');
  const result = await apiRequest('/users/login', 'POST', {
    email: testUser.email,
    password: testUser.password
  });
  
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  
  if (result.success) {
    console.log('✅ Login successful');
    authToken = result.data.token;
  } else {
    console.log('❌ Login failed');
  }
}

async function testGetProfile() {
  console.log('\n===== Testing Get User Profile =====');
  const result = await apiRequest('/users/profile');
  
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  
  if (result.success) {
    console.log('✅ Get profile successful');
  } else {
    console.log('❌ Get profile failed');
  }
}

async function testCreateProject() {
  console.log('\n===== Testing Create Project =====');
  const projectData = {
    title: 'Test Project',
    description: 'This is a test project created via API',
    category: 'tech',
    goal: 10000,
    duration: 30
  };
  
  const result = await apiRequest('/projects', 'POST', projectData);
  
  console.log(`Status: ${result.status}`);
  console.log('Response:', result.data);
  
  if (result.success) {
    console.log('✅ Project creation successful');
    return result.data._id;
  } else {
    console.log('❌ Project creation failed');
    return null;
  }
}

async function testGetProjects() {
  console.log('\n===== Testing Get All Projects =====');
  const result = await apiRequest('/projects');
  
  console.log(`Status: ${result.status}`);
  console.log(`Found ${result.data.length} projects`);
  
  if (result.success) {
    console.log('✅ Get projects successful');
  } else {
    console.log('❌ Get projects failed');
  }
}

// Main test function
async function runTests() {
  console.log('Starting API tests...');
  
  // Register and login
  await testRegister();
  await testLogin();
  
  if (authToken) {
    // If login successful, test other endpoints
    await testGetProfile();
    const projectId = await testCreateProject();
    await testGetProjects();
  } else {
    console.log('❌ Cannot proceed with authenticated tests without a token');
  }
  
  console.log('\nTests completed!');
}

// Run the tests
runTests();

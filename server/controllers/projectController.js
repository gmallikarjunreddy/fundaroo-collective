
const Project = require('../models/projectModel');
const User = require('../models/userModel');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    
    // Filter by category if provided
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Search by title if search term provided
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    const projects = await Project.find(query)
      .populate('creator', 'fullName')
      .sort({ createdAt: -1 });
    
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
const getFeaturedProjects = async (req, res) => {
  try {
    const featuredProjects = await Project.find({ featured: true })
      .populate('creator', 'fullName')
      .limit(5);
    
    res.json(featuredProjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('creator', 'fullName email profileImage bio');
    
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ message: 'Project not found' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  const {
    title,
    description,
    fullDescription,
    category,
    imageSrc,
    goal,
    endDate,
    rewards
  } = req.body;
  
  try {
    // Create new project
    const project = await Project.create({
      title,
      creator: req.user._id,
      description,
      fullDescription,
      category,
      imageSrc,
      goal,
      endDate,
      rewards: rewards || []
    });
    
    // Add project to user's created projects
    await User.findByIdAndUpdate(
      req.user._id, 
      { $push: { createdProjects: project._id } }
    );
    
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check if user is the project creator
    if (project.creator.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this project' });
    }
    
    // Update project fields
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check if user is the project creator
    if (project.creator.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this project' });
    }
    
    // Remove project from user's created projects
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { createdProjects: project._id } }
    );
    
    // Delete the project
    await Project.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Project removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Back a project
// @route   POST /api/projects/:id/back
// @access  Private
const backProject = async (req, res) => {
  const { amount } = req.body;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Please enter a valid amount' });
  }
  
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check if user is trying to back their own project
    if (project.creator.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot back your own project' });
    }
    
    // Add backer to project
    project.backers.push({
      user: req.user._id,
      amount
    });
    
    // Update raised amount
    project.raised += Number(amount);
    
    // Save project
    await project.save();
    
    // Add project to user's backed projects
    await User.findByIdAndUpdate(
      req.user._id,
      { 
        $push: { 
          backedProjects: {
            project: project._id,
            amount
          }
        }
      }
    );
    
    res.json({ message: 'Project backed successfully', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  backProject,
  getFeaturedProjects
};

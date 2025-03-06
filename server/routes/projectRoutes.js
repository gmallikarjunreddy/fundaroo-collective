
const express = require('express');
const router = express.Router();
const { 
  getProjects, 
  getProjectById, 
  createProject,
  updateProject,
  deleteProject,
  backProject,
  getFeaturedProjects
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:id', getProjectById);

// Protected routes
router.post('/', protect, createProject);
router.route('/:id')
  .put(protect, updateProject)
  .delete(protect, deleteProject);
router.post('/:id/back', protect, backProject);

module.exports = router;

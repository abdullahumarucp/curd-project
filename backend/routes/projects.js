const express = require('express');
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectsController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// GET /api/projects - Get all projects for the authenticated user
router.get('/', verifyToken, getProjects);

// GET /api/projects/:id - Get a specific project by ID
router.get('/:id', verifyToken, getProjectById);

// POST /api/projects - Create a new project
router.post('/', verifyToken, createProject);

// PUT /api/projects/:id - Update a project
router.put('/:id', verifyToken, updateProject);

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', verifyToken, deleteProject);

module.exports = router;

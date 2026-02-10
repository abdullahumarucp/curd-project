const express = require('express');
const { verifyToken } = require('../middleware/auth');
const Project = require('../models/Project');
const router = express.Router();

// GET /api/projects - Get all projects for the authenticated user
router.get('/', verifyToken, async (req, res) => {
  try {
    const userProjects = await Project.find({ userId: req.user.id });
    res.json(userProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/projects/:id - Get a specific project by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user.id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/projects - Create a new project
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    // Create new project
    const newProject = new Project({
      name,
      description: description || '',
      userId: req.user.id // Associate with authenticated user
    });

    // Save project to database
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /api/projects/:id - Update a project
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user.id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const { name, description } = req.body;

    // Update fields if provided
    if (name !== undefined) project.name = name;
    if (description !== undefined) project.description = description;

    await project.save();
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', verifyToken, (req, res) => {
  const projectId = parseInt(req.params.id);
  const index = projects.findIndex(p => p.id === projectId && p.userId === req.user.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }

  // Remove project
  projects.splice(index, 1);

  res.json({ message: 'Project deleted successfully' });
});

module.exports = router;

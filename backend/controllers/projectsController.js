const Project = require('../models/Project');

const getProjects = async (req, res) => {
  try {
    const userProjects = await Project.find({ userId: req.user.id });
    res.json(userProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProjectById = async (req, res) => {
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
};

const createProject = async (req, res) => {
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
};

const updateProject = async (req, res) => {
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
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };

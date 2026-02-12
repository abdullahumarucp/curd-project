const projectService = require('../services/projectService');

const getProjects = async (req, res) => {
  try {
    const userProjects = await projectService.getProjects(req.user.id);
    res.json(userProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id, req.user.id);
    res.json(project);
  } catch (error) {
    if (error.message === 'Project not found') {
      return res.status(404).json({ message: error.message });
    }
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createProject = async (req, res) => {
  try {
    const newProject = await projectService.createProject(req.body, req.user.id);
    res.status(201).json(newProject);
  } catch (error) {
    if (error.message === 'Project name is required') {
      return res.status(400).json({ message: error.message });
    }
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body, req.user.id);
    res.json(project);
  } catch (error) {
    if (error.message === 'Project not found') {
      return res.status(404).json({ message: error.message });
    }
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteProject = async (req, res) => {
  try {
    await projectService.deleteProject(req.params.id, req.user.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    if (error.message === 'Project not found') {
      return res.status(404).json({ message: error.message });
    }
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };

const Project = require('../models/Project');

const getProjects = async (userId) => {
  return await Project.find({ userId });
};

const getProjectById = async (id, userId) => {
  const project = await Project.findOne({ _id: id, userId });
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
};

const createProject = async (data, userId) => {
  const { name, description } = data;
  if (!name) {
    throw new Error('Project name is required');
  }
  const newProject = new Project({
    name,
    description: description || '',
    userId
  });
  return await newProject.save();
};

const updateProject = async (id, data, userId) => {
  const project = await Project.findOne({ _id: id, userId });
  if (!project) {
    throw new Error('Project not found');
  }
  const { name, description } = data;
  if (name !== undefined) project.name = name;
  if (description !== undefined) project.description = description;
  return await project.save();
};

const deleteProject = async (id, userId) => {
  const project = await Project.findOneAndDelete({ _id: id, userId });
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };

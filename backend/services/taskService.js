const Task = require('../models/Task');

const getTasks = async (userId) => {
  return await Task.find({ userId });
};

const getTaskById = async (id, userId) => {
  const task = await Task.findOne({ _id: id, userId });
  if (!task) {
    throw new Error('Task not found');
  }
  return task;
};

const createTask = async (data, userId) => {
  const { title, description, projectId, status } = data;
  if (!title) {
    throw new Error('Task title is required');
  }
  const newTask = new Task({
    title,
    description: description || '',
    projectId: projectId || null,
    status: status || 'pending',
    userId
  });
  return await newTask.save();
};

const updateTask = async (id, data, userId) => {
  const task = await Task.findOne({ _id: id, userId });
  if (!task) {
    throw new Error('Task not found');
  }
  const { title, description, projectId, status } = data;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (projectId !== undefined) task.projectId = projectId;
  if (status !== undefined) task.status = status;
  return await task.save();
};

const deleteTask = async (id, userId) => {
  const task = await Task.findOneAndDelete({ _id: id, userId });
  if (!task) {
    throw new Error('Task not found');
  }
  return task;
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };

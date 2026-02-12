const taskService = require('../services/taskService');

const getTasks = async (req, res) => {
  try {
    const userTasks = await taskService.getTasks(req.user.id);
    res.json(userTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user.id);
    res.json(task);
  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message });
    }
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = await taskService.createTask(req.body, req.user.id);
    res.status(201).json(newTask);
  } catch (error) {
    if (error.message === 'Task title is required') {
      return res.status(400).json({ message: error.message });
    }
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body, req.user.id);
    res.json(task);
  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message });
    }
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id, req.user.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message });
    }
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };

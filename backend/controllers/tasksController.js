const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const userTasks = await Task.find({ userId: req.user.id });
    res.json(userTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, projectId, status } = req.body;

    // Validate input
    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    // Create new task
    const newTask = new Task({
      title,
      description: description || '',
      projectId: projectId || null, // Optional association with project
      status: status || 'pending', // Default status
      userId: req.user.id // Associate with authenticated user
    });

    // Save task to database
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description, projectId, status } = req.body;

    // Update fields if provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (projectId !== undefined) task.projectId = projectId;
    if (status !== undefined) task.status = status;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };

const express = require('express');
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectsController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.get('/', verifyToken, getProjects);

router.get('/:id', verifyToken, getProjectById);

router.post('/', verifyToken, createProject);

router.put('/:id', verifyToken, updateProject);

router.delete('/:id', verifyToken, deleteProject);

module.exports = router;

const express = require('express');
const { getItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemsController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.get('/', getItems);

router.get('/:id', verifyToken, getItemById);

router.post('/', createItem);

router.put('/:id', updateItem);

router.delete('/:id', verifyToken, deleteItem);

module.exports = router;

const itemService = require('../services/itemService');

const getItems = async (req, res) => {
  const result = await itemService.getItems();
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.json(result.data);
};

const getItemById = async (req, res) => {
  const result = await itemService.getItemById(req.params.id);
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.json(result.data);
};

const createItem = async (req, res) => {
  const result = await itemService.createItem(req.body);
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.status(201).json(result.data);
};

const updateItem = async (req, res) => {
  const result = await itemService.updateItem(req.params.id, req.body);
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.json(result.data);
};

const deleteItem = async (req, res) => {
  const result = await itemService.deleteItem(req.params.id);
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }
  res.json({ message: 'Item deleted' });
};

module.exports = { getItems, getItemById, createItem, updateItem, deleteItem };

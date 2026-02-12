const mongoose = require('mongoose');
const Item = require('../models/Item');

const getItems = async () => {
  try {
    const items = await Item.find();
    return { data: items };
  } catch (error) {
    return { error: 'Internal server error', status: 500 };
  }
};

const getItemById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { error: 'Invalid item ID', status: 400 };
    }
    const item = await Item.findById(id);
    if (!item) {
      return { error: 'Item not found', status: 404 };
    }
    return { data: item };
  } catch (error) {
    return { error: 'Internal server error', status: 500 };
  }
};

const createItem = async (data) => {
  try {
    const { name, description } = data;
    if (!name || !description) {
      return { error: 'Name and description are required', status: 400 };
    }
    const newItem = new Item({ name, description });
    const savedItem = await newItem.save();
    return { data: savedItem };
  } catch (error) {
    return { error: 'Internal server error', status: 500 };
  }
};

const updateItem = async (id, data) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { error: 'Invalid item ID', status: 400 };
    }
    const item = await Item.findById(id);
    if (!item) {
      return { error: 'Item not found', status: 404 };
    }
    const { name, description } = data;
    if (name !== undefined) item.name = name;
    if (description !== undefined) item.description = description;
    const updatedItem = await item.save();
    return { data: updatedItem };
  } catch (error) {
    return { error: 'Internal server error', status: 500 };
  }
};

const deleteItem = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { error: 'Invalid item ID', status: 400 };
    }
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return { error: 'Item not found', status: 404 };
    }
    return { data: true };
  } catch (error) {
    return { error: 'Internal server error', status: 500 };
  }
};

module.exports = { getItems, getItemById, createItem, updateItem, deleteItem };

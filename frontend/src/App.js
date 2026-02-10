import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api/items';

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async (item) => {
    try {
      const response = await axios.post(API_BASE_URL, item);
      setItems([...items, response.data]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const updateItem = async (item) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${editingItem.id}`, item);
      setItems(items.map(i => i.id === editingItem.id ? response.data : i));
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setItems(items.filter(i => i.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const editItem = (item) => {
    setEditingItem(item);
  };

  return (
    <div className="App">
      <h1>CRUD App</h1>
      <ItemForm onSubmit={editingItem ? updateItem : addItem} item={editingItem} />
      <ItemList items={items} onEdit={editItem} onDelete={deleteItem} />
    </div>
  );
}

export default App;

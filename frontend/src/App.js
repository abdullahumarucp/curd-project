import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api/items';

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setFilteredItems(items.filter(item => item.name.toLowerCase().includes(searchName.toLowerCase())));
  }, [items, searchName]);

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
      const response = await axios.put(`${API_BASE_URL}/${editingItem._id}`, item);
      setItems(items.map(i => i._id === editingItem._id ? response.data : i));
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setItems(items.filter(i => i._id !== id));
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
      <div>
        <button onClick={() => setShowForm(!showForm)}>Add Data</button>
        <input
          type="text"
          placeholder="Find by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={() => setFilteredItems(items)}>List</button>
      </div>
      {showForm && <ItemForm onSubmit={editingItem ? updateItem : addItem} item={editingItem} />}
      <ItemList items={filteredItems.length > 0 ? filteredItems : items} onEdit={editItem} onDelete={deleteItem} />
    </div>
  );
}

export default App;

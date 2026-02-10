import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import ItemList from './ItemList';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setFilteredItems(items.filter(item => item.name.toLowerCase().includes(searchName.toLowerCase())));
  }, [items, searchName]);

  const fetchItems = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/items', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:5000/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const editItem = (item) => {
    navigate(`/edit-item/${item._id}`);
  };

  return (
    <div className="container">
      <div className="nav">
        <h1 className="nav-title">Dashboard</h1>
        <div className="nav-actions">
          <button onClick={() => navigate('/add-item')} className="btn btn-primary">
            Add Data
          </button>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 20px',
              border: '2px solid #e1e5e9',
              borderRadius: '8px',
              fontSize: '16px'
            }}
          />
          <button onClick={() => setSearchName('')} className="btn btn-primary">
            List All
          </button>
        </div>

        <ItemList items={filteredItems} onEdit={editItem} onDelete={deleteItem} />
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import './index.css';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';

const AppWrapper = () => {
  const { loginLoading } = useAuth();

  return (
    <>
      {loginLoading && <Loading />}
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/add-item" element={<ProtectedRoute><AddItem /></ProtectedRoute>} />
          <Route path="/edit-item/:id" element={<ProtectedRoute><EditItem /></ProtectedRoute>} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  </React.StrictMode>
);

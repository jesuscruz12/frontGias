// src/components/AdminHeader.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AdminHeader.css'; // Asegúrate de agregar estilos para el header

const AdminHeader = ({ onLogout, toggleDarkMode, isDarkMode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login'); // Redirige al login después de cerrar sesión
  };

  return (
    <header className="admin-header">
      <div className="admin-header-content">
        <h1>Panel de Administrador</h1>
        <nav>
          <Link to="/admin-dashboard">Inicio</Link>
          <button onClick={handleLogout}>Cerrar sesión</button>
          <button onClick={toggleDarkMode}>
            {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;

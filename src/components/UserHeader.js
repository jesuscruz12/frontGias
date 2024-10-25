// src/components/UserHeader.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserHeader = ({ onLogout, toggleDarkMode, isDarkMode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login'); // Redirige al login después de cerrar sesión
  };

  return (
    <header className="header">
      <div className="container">
        <h1>GIAS Usuario</h1>
        <nav>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/profile">Perfil</a></li>
            <li><a href="/savings">Ahorros</a></li>
            <li><button onClick={handleLogout}>Cerrar sesión</button></li>
            <li>
              <button onClick={toggleDarkMode}>
                {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default UserHeader;

import React from 'react';
import '../styles/Header.css'; 

const Header = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <header className="header">
      <div className="container">
        <h1>GIAS</h1>
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/register">Registro</a></li>
            <li><a href="/login">Login</a></li>
            <li>
              <button onClick={toggleDarkMode} className="dark-mode-toggle">
                {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

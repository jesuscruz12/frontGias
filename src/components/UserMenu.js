import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserDropdown = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <NavDropdown title={user ? user.nombre : 'Usuario'} id="user-dropdown" align="end">
      <NavDropdown.Item onClick={() => navigate('/profile')}>Configuración de Perfil</NavDropdown.Item>
      <NavDropdown.Item onClick={() => navigate('/savings')}>Mis Ahorros</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
    </NavDropdown>
  );
};

export default UserDropdown;

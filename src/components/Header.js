import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ toggleDarkMode, isDarkMode, isAuthenticated, isAdmin, onLogout }) => {
    const [logoUrl, setLogoUrl] = useState('');
    const [slogan, setSlogan] = useState('');

    const fetchHeaderData = async () => {
        try {
            const sloganResponse = await axios.get('https://backendgias.onrender.com/api/slogan');
            setSlogan(sloganResponse.data.slogan);

            const logoResponse = await axios.get('https://backendgias.onrender.com/api/logo');
            if (logoResponse.data.length > 0) {
                setLogoUrl(logoResponse.data[0].url);
            }
        } catch (error) {
            console.error('Error al obtener los datos del header:', error);
        }
    };

    useEffect(() => {
        fetchHeaderData();
    }, []);

    return (
        <header className="header">
            <div className="container">
                {logoUrl && <img src={logoUrl} alt="Logo de GIAS" className="logo" />}
                <h1>GIAS</h1>
                <p>{slogan}</p>
                <nav>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        {!isAuthenticated && (
                            <>
                                <li><Link to="/register">Registro</Link></li>
                                <li><Link to="/login">Login</Link></li>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <li><Link to="/profile">Perfil</Link></li>
                                {isAdmin && <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>}
                                {!isAdmin && <li><Link to="/dashboard">Dashboard</Link></li>}
                                <li><button onClick={onLogout}>Cerrar Sesión</button></li>
                            </>
                        )}
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

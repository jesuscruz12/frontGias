// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import '../styles/AdminDashboard.css';
import PolicyCrud from '../components/PolicyCrud';
import TermsCrud from '../components/TermsCrud';
import SocialLinksManager from '../components/SocialLinksManager';
import LegalBoundaryCrud from '../components/LegalBoundaryCrud';
import SloganManager from '../components/SloganAdmin'; // Importar el nuevo componente para la gestión de eslogan
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const AdminDashboard = ({ onLogout, toggleDarkMode, isDarkMode }) => {
  const [showPolicyCrud, setShowPolicyCrud] = useState(false);
  const [showTermsCrud, setShowTermsCrud] = useState(false);
  const [showSocialLinksManager, setShowSocialLinksManager] = useState(false);
  const [showLegalBoundaryCrud, setShowLegalBoundaryCrud] = useState(false);
  const [showSloganManager, setShowSloganManager] = useState(false); // Estado para mostrar la gestión de eslogan
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleShowPolicyCrud = () => {
    setShowPolicyCrud(true);
    setShowTermsCrud(false);
    setShowSocialLinksManager(false);
    setShowLegalBoundaryCrud(false);
    setShowSloganManager(false); // Ocultar otras gestiones al mostrar políticas
  };

  const handleShowTermsCrud = () => {
    setShowTermsCrud(true);
    setShowPolicyCrud(false);
    setShowSocialLinksManager(false);
    setShowLegalBoundaryCrud(false);
    setShowSloganManager(false); // Ocultar otras gestiones al mostrar términos
  };

  const handleShowSocialLinksManager = () => {
    setShowSocialLinksManager(true);
    setShowPolicyCrud(false);
    setShowTermsCrud(false);
    setShowLegalBoundaryCrud(false);
    setShowSloganManager(false); // Ocultar otras gestiones al mostrar redes sociales
  };

  const handleShowLegalBoundaryCrud = () => {
    setShowLegalBoundaryCrud(true);
    setShowPolicyCrud(false);
    setShowTermsCrud(false);
    setShowSocialLinksManager(false);
    setShowSloganManager(false); // Ocultar otras gestiones al mostrar deslindes legales
  };

  const handleShowSloganManager = () => {
    setShowSloganManager(true);
    setShowPolicyCrud(false);
    setShowTermsCrud(false);
    setShowSocialLinksManager(false);
    setShowLegalBoundaryCrud(false); // Ocultar otras gestiones al mostrar eslogan
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-content">
        <h1>Panel de Administrador</h1>
        <p>Bienvenido al panel de administración.</p>

        {/* Tarjetas para Gestión de Políticas, Términos, Redes Sociales, Deslindes Legales y Eslogan */}
        {!showPolicyCrud && !showTermsCrud && !showSocialLinksManager && !showLegalBoundaryCrud && !showSloganManager ? (
          <div className="dashboard-tools-container">
            <div className="dashboard-tool" onClick={handleShowPolicyCrud}>
              <div className="tool-icon policy-icon"></div>
              <h3>Gestión de Políticas de privacidad</h3>
              <p>Ver y gestionar las políticas de privacidad del sistema</p>
              <button className="view-button">Ir</button>
            </div>
            <div className="dashboard-tool" onClick={() => navigate('/contact-edit')}>
              <div className="tool-icon contact-icon"></div>
              <h3>Modificar Datos de Contacto</h3>
              <p>Ver y modificar los datos de contacto del sistema</p>
              <button className="view-button">Ir</button>
            </div>
            <div className="dashboard-tool">
              <div className="tool-icon log-icon"></div>
              <h3>Registros de Inicios de Sesión</h3>
              <p>Ver los registros de todos los inicios de sesión</p>
              <button
                className="view-button"
                onClick={() => navigate('/audit-logs')} // Navegar a los registros de inicios de sesión
              >
                Ver Registros
              </button>
            </div>
            <div className="dashboard-tool">
              <div className="tool-icon password-change-icon"></div>
              <h3>Registros de Cambios de Contraseña</h3>
              <p>Ver los registros de cambios de contraseña</p>
              <button
                className="view-button"
                onClick={() => navigate('/password-change-logs')} // Navegar a los registros de cambios de contraseña
              >
                Ver Registros
              </button>
            </div>
            <div className="dashboard-tool" onClick={handleShowTermsCrud}>
              <div className="tool-icon terms-icon"></div>
              <h3>Gestión de Términos y condiciones</h3>
              <p>Ver y gestionar los términos y condiciones del sistema</p>
              <button className="view-button">Ir</button>
            </div>
            <div className="dashboard-tool" onClick={handleShowLegalBoundaryCrud}>
              <div className="tool-icon legal-boundary-icon"></div>
              <h3>Gestión de Deslindes Legales</h3>
              <p>Ver y gestionar los deslindes legales del sistema</p>
              <button className="view-button">Ir</button>
            </div>
            <div className="dashboard-tool" onClick={handleShowSocialLinksManager}>
              <div className="tool-icon social-icon"></div>
              <h3>Gestión de Redes Sociales</h3>
              <p>Ver y gestionar los enlaces de redes sociales</p>
              <button className="view-button">Ir</button>
            </div>
            <div className="dashboard-tool" onClick={handleShowSloganManager}>
              <div className="tool-icon slogan-icon"></div> {/* Asegúrate de definir este icono */}
              <h3>Gestión de Eslogan</h3>
              <p>Ver y gestionar el eslogan de la empresa</p>
              <button className="view-button">Ir</button>
            </div>
          </div>
        ) : null}

        {/* Renderizar componentes basados en el estado */}
        {showPolicyCrud && (
          <div className="policy-management">
            <h2>Gestión de Políticas</h2>
            <PolicyCrud />
          </div>
        )}

        {showTermsCrud && (
          <div className="terms-management">
            <h2>Gestión de Términos</h2>
            <TermsCrud />
          </div>
        )}

        {showSocialLinksManager && (
          <div className="social-links-management">
            <h2>Gestión de Redes Sociales</h2>
            <SocialLinksManager />
          </div>
        )}

        {showLegalBoundaryCrud && (
          <div className="legal-boundary-management">
            <h2>Gestión de Deslindes Legales</h2>
            <LegalBoundaryCrud />
          </div>
        )}

        {showSloganManager && (
          <div className="slogan-management">
            <h2>Gestión de Eslogan</h2>
            <SloganManager />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

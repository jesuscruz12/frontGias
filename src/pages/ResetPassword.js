import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/ResetPassword.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordRequirementsMet, setPasswordRequirementsMet] = useState([]);
  const [searchParams] = useSearchParams();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    const token = searchParams.get('token');
    console.log("Token:", token);  // Verificar que se recibe el token
    console.log("New Password:", newPassword);  // Verificar que se recibe la nueva contraseña

    try {
      const response = await fetch('http://localhost:5000/api/password/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const result = await response.json();
      setMessage(result.message);

      if (response.ok) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setMessage('Error al restablecer la contraseña.');
    }
  };

  // Función para manejar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Función para validar los requisitos de la contraseña
  const validatePassword = (password) => {
    const requirements = [
      { regex: /.{8,}/, message: 'Debe tener al menos 8 caracteres' },
      { regex: /[A-Z]/, message: 'Debe incluir al menos una letra mayúscula' },
      { regex: /[0-9]/, message: 'Debe incluir al menos un número' },
      { regex: /[^A-Za-z0-9]/, message: 'Debe incluir al menos un carácter especial' },
    ];

    const unmetRequirements = requirements.filter((requirement) => !requirement.regex.test(password));
    setPasswordRequirementsMet(unmetRequirements);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    validatePassword(value);
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <h2>Restablecer Contraseña</h2>
        {message && (
          <p className={newPassword !== confirmPassword ? 'error-message' : 'success-message'}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nueva Contraseña:</label>
            <div className="password-input-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                value={newPassword}
                onChange={handlePasswordChange}
                required
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                {passwordVisible ? '°°' : '°'}
              </span>
            </div>
          </div>
          <div className="password-requirements">
            <ul>
              {passwordRequirementsMet.map((requirement, index) => (
                <li key={index} style={{ color: 'gray' }}>
                  {requirement.message}
                </li>
              ))}
            </ul>
          </div>
          <div className="form-group">
            <label>Confirmar Contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Restablecer Contraseña</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

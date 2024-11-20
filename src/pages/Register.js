import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    telefono: '',
    ciudad: '',
    colonia: '',
    calle: '',
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordSuggestions, setPasswordSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPhoneValid, setIsPhoneValid] = useState(null);
  const [countryCode, setCountryCode] = useState('+52'); // Código de país por defecto (México)
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const navigate = useNavigate();

  const commonPatterns = ['123', '123456', 'qwerty', 'password', 'abc123', '111111', 'aaa', 'qqq'];

  const handlePasswordChange = (e) => {
    const value = e.target.value;

    if (value.length > 16) {
      toast.error('La contraseña no debe tener más de 16 caracteres.');
      return;
    }

    setFormData({ ...formData, password: value });
    setPasswordStrength(checkPasswordStrength(value));
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    const suggestions = [];

    if (password.length >= 8) strength++;
    else suggestions.push('Debe tener al menos 8 caracteres');

    if (/[A-Z]/.test(password)) strength++;
    else suggestions.push('Debe incluir al menos una letra mayúscula');

    if (/[a-z]/.test(password)) strength++;
    else suggestions.push('Debe incluir al menos una letra minúscula');

    if (/[0-9]/.test(password)) strength++;
    else suggestions.push('Debe incluir al menos un número');

    if (/[\W]/.test(password)) strength++;
    else suggestions.push('Debe incluir al menos un carácter especial');

    // Verificar patrones secuenciales
    if (commonPatterns.some((pattern) => password.toLowerCase().includes(pattern))) {
      strength = 1;
      suggestions.push('No debe contener patrones secuenciales como "12345" o "qwerty"');
    }

    setPasswordSuggestions(suggestions);
    if (strength <= 2) return 'Débil';
    if (strength === 3) return 'Medio';
    if (strength >= 4) return 'Fuerte';
  };

  const validateEmail = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/validate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.correo }),
      });

      const result = await response.json();

      if (result.valid) {
        setIsEmailValid(true);
        toast.success('El correo es válido.');
      } else {
        setIsEmailValid(false);
        toast.error(result.message || 'El correo no es válido.');
      }
    } catch (error) {
      setIsEmailValid(false);
      toast.error('Error al validar el correo.');
      console.error('Error al validar el correo:', error);
    }
  };

  const validatePhone = async () => {
    const fullPhoneNumber = `${countryCode}${formData.telefono}`; // Concatenar código de país y número
    try {
      const response = await fetch('http://localhost:5000/api/validate-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhoneNumber }),
      });

      const result = await response.json();

      if (result.valid) {
        setIsPhoneValid(true);
        toast.success('El número de teléfono es válido.');
      } else {
        setIsPhoneValid(false);
        toast.error(result.message || 'El número de teléfono no es válido.');
      }
    } catch (error) {
      setIsPhoneValid(false);
      toast.error('Error al validar el número de teléfono.');
      console.error('Error al validar el número:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      toast.error('No puedes registrarte con un correo inválido.');
      return;
    }

    if (!isPhoneValid) {
      toast.error('No puedes registrarte con un número de teléfono inválido.');
      return;
    }

    const fullPhoneNumber = `${countryCode}${formData.telefono}`; // Combina el prefijo y el número

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, telefono: fullPhoneNumber }), // Incluye el número completo
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Usuario registrado exitosamente. Verifica tu correo.');
        setFormData({
          nombre: '',
          apellidos: '',
          correo: '',
          password: '',
          telefono: '',
          ciudad: '',
          colonia: '',
          calle: '',
        });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(result.message || 'Error al registrar usuario.');
      }
    } catch (error) {
      toast.error('Error de red al registrar.');
      console.error('Error al registrar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Registro</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={(e) => {
              if (/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]*$/.test(e.target.value)) {
                setFormData({ ...formData, nombre: e.target.value });
              }
            }}
            required
          />
        </div>

        <div className="form-group">
          <label>Apellidos</label>
          <input
            type="text"
            placeholder="Apellidos"
            value={formData.apellidos}
            onChange={(e) => {
              if (/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]*$/.test(e.target.value)) {
                setFormData({ ...formData, apellidos: e.target.value });
              }
            }}
            required
          />
        </div>

        <div className="form-group">
          <label>Correo</label>
          <input
            type="email"
            placeholder="Correo"
            value={formData.correo}
            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
            onBlur={validateEmail}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={formData.password}
              onChange={handlePasswordChange}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
            Fortaleza: {passwordStrength}
          </div>
          {passwordSuggestions.length > 0 && (
            <ul className="password-suggestions">
              {passwordSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-group">
          <label>Número Telefónico</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              style={{ marginRight: '10px', padding: '5px' }}
            >
              <option value="+52">🇲🇽 +52 (México)</option>
              <option value="+1">🇺🇸 +1 (Estados Unidos)</option>
              <option value="+1">🇨🇦 +1 (Canadá)</option>
            </select>
            <input
              type="tel"
              placeholder="Número Telefónico"
              value={formData.telefono}
              onChange={(e) => {
                if (e.target.value === '' || /^\d{0,15}$/.test(e.target.value)) {
                  setFormData({ ...formData, telefono: e.target.value });
                }
              }}
              onBlur={validatePhone}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Dirección - Ciudad</label>
          <input
            type="text"
            placeholder="Ciudad"
            value={formData.ciudad}
            onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Dirección - Colonia</label>
          <input
            type="text"
            placeholder="Colonia"
            value={formData.colonia}
            onChange={(e) => setFormData({ ...formData, colonia: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Dirección - Calle</label>
          <input
            type="text"
            placeholder="Calle"
            value={formData.calle}
            onChange={(e) => setFormData({ ...formData, calle: e.target.value })}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      {loading && <div className="loader">Cargando...</div>}
    </div>
  );
};

export default Register;

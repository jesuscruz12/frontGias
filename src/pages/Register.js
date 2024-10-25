import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Register.css';

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
  const [loading, setLoading] = useState(false); // Estado para controlar el indicador de carga
  const navigate = useNavigate();

  // Patrones comunes de contraseña débil
  const commonPatterns = ['12345', '123456', 'qwerty', 'password', 'abc123', '111111', 'letmein'];

  // Manejar el cambio en el campo de contraseña
  const handlePasswordChange = (e) => {
    const value = e.target.value;

    if (value.length > 16) {
      toast.error('La contraseña no debe tener más de 16 caracteres.');
      return;
    }

    const containsCommonPattern = commonPatterns.some((pattern) => value.toLowerCase().includes(pattern));
    if (containsCommonPattern) {
      toast.warning('La contraseña contiene un patrón común débil.');
    }

    setFormData({ ...formData, password: value });
    setPasswordStrength(checkPasswordStrength(value));
  };

  // Evaluar la fortaleza de la contraseña
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

    setPasswordSuggestions(suggestions);
    if (strength <= 2) return 'Débil';
    if (strength === 3) return 'Medio';
    if (strength >= 4) return 'Fuerte';
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Activar el indicador de carga
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
        setTimeout(() => navigate('/login'), 2000); // Redirigir al login después de 2 segundos
      } else {
        toast.error(result.message || 'Error al registrar usuario.');
      }
    } catch (error) {
      toast.error('Error de red al registrar.');
      console.error('Error al registrar:', error);
    } finally {
      // Desactivar el indicador de carga
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
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handlePasswordChange}
            required
          />
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
          <input
            type="tel"
            placeholder="Número Telefónico"
            value={formData.telefono}
            onChange={(e) => {
              if (e.target.value === '' || /^\d{0,10}$/.test(e.target.value)) {
                setFormData({ ...formData, telefono: e.target.value });
              }
            }}
            required
          />
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
      {loading && <div className="loader">Cargando...</div>} {/* Indicador de carga */}
    </div>
  );
};

export default Register;

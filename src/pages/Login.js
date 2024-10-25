import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css';
import imagen2 from '../assets/imagen2.png';
import imagen3 from '../assets/imagen3.jpg';

// Clave del sitio de reCAPTCHA
const RECAPTCHA_SITE_KEY = '6LevFWwqAAAAAJXo2ezz-8y_u_CLAPnvlsOYLYht';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });

  const [recaptchaVerified, setRecaptchaVerified] = useState(false); // Estado para verificar reCAPTCHA
  const navigate = useNavigate();

  // Función para manejar la respuesta de reCAPTCHA
  const handleRecaptchaChange = (value) => {
    if (value) {
      setRecaptchaVerified(true); // Se establece en verdadero si se completa el reCAPTCHA
    } else {
      setRecaptchaVerified(false);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si reCAPTCHA fue completado
    if (!recaptchaVerified) {
      toast.error('Por favor completa el reCAPTCHA', { position: 'top-right' });
      return;
    }

    try {
      // Enviar los datos al servidor para iniciar sesión
      const response = await fetch('https://backendgias.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Inicio de sesión exitoso.', { position: 'top-right' });

        // Guardar los datos del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('userRole', result.user.role);

        // Redirigir al dashboard según el rol
        setTimeout(() => {
          if (result.user.role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 2000); // Esperar 2 segundos antes de redirigir
      } else {
        toast.error(result.message || 'Error al iniciar sesión.', { position: 'top-right' });
      }
    } catch (error) {
      toast.error('Error de red al iniciar sesión.', { position: 'top-right' });
    }
  };

  return (
    <div className="login-page-container">
      <ToastContainer /> {/* Contenedor de notificaciones */}
      <div className="login-container-wrapper">
        <div className="login-carousel">
          <Carousel>
            <Carousel.Item>
              <img src={imagen2} alt="Segunda imagen" className="carousel-image" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={imagen3} alt="Tercera imagen" className="carousel-image" />
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="login-container">
          <h1>Iniciar Sesión</h1>

          <form className="login-form" onSubmit={handleSubmit}>
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
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {/* reCAPTCHA v2: No soy un robot */}
            <div className="form-group">
              <div
                className="g-recaptcha"
                data-sitekey={RECAPTCHA_SITE_KEY}
                data-callback="handleRecaptchaChange"
                data-expired-callback={() => setRecaptchaVerified(false)}
              ></div>
            </div>

            <button type="submit">Iniciar Sesión</button>
          </form>

          <div className="extra-links">
            <a href="/forgot-password">¿Olvidaste la contraseña?</a>
            <a href="/register">Registrarse</a>
          </div>
        </div>
      </div>

      {/* Carga del script de reCAPTCHA */}
      <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    </div>
  );
};

export default Login;

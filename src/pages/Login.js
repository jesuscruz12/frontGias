import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css';
import imagen2 from '../assets/imagen2.png';
import imagen3 from '../assets/imagen3.jpg';

const RECAPTCHA_SITE_KEY = '6Lc5pV0qAAAAAFyeHTlFcFJOlMWTXzQGwlbeA88_';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });

  const [recaptchaToken, setRecaptchaToken] = useState('');
  const navigate = useNavigate();

  // Cargar reCAPTCHA cuando el componente se monta
  useEffect(() => {
    const loadRecaptcha = () => {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };
    loadRecaptcha();
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      toast.error('Por favor completa el reCAPTCHA', { position: 'top-right' });
      return;
    }

    try {
      // Enviar los datos al servidor para iniciar sesión
      const response = await fetch('https://backendgias.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken }),
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

  // Función para manejar la carga de reCAPTCHA
  const handleRecaptcha = () => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'login' }).then((token) => {
          setRecaptchaToken(token); // Guardar el token en el estado
        });
      });
    }
  };

  // Cargar reCAPTCHA cuando el componente se monta y cuando cambia el token
  useEffect(() => {
    handleRecaptcha();
  }, [recaptchaToken]);

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

            {/* Aquí se incluye el reCAPTCHA */}
            <div
              className="g-recaptcha"
              data-sitekey={RECAPTCHA_SITE_KEY}
              data-callback="handleRecaptcha"
            ></div>

            <button type="submit">Iniciar Sesión</button>
          </form>

          <div className="extra-links">
            <a href="/forgot-password">¿Olvidaste la contraseña?</a>
            <a href="/register">Registrarse</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

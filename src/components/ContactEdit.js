import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ContactEdit.css'; // Estilos para el componente

const ContactEdit = () => {
  const [contactData, setContactData] = useState({
    direccion: '',
    correo: '',
    telefono: '',
  });
  const [isLoading, setIsLoading] = useState(false); // Estado para el indicador de carga

  // Validar los datos de contacto antes de enviar
  const validateContactData = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/; // Adaptar según el formato esperado
    if (!emailRegex.test(contactData.correo)) {
      toast.error('Por favor, ingrese un correo electrónico válido.', { position: 'top-right' });
      return false;
    }
    if (!phoneRegex.test(contactData.telefono)) {
      toast.error('Por favor, ingrese un número de teléfono válido.', { position: 'top-right' });
      return false;
    }
    return true;
  };

  // Cargar los datos de contacto al iniciar el componente
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setIsLoading(true); // Mostrar indicador de carga
        const response = await fetch('https://backendgias.onrender.com/api/contact/contact-info'); // Asegúrate de que esta ruta sea correcta
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        setContactData(data);
      } catch (error) {
        console.error('Error al cargar los datos de contacto:', error);
        toast.error('Error al cargar los datos de contacto', { position: 'top-right' });
      } finally {
        setIsLoading(false); // Ocultar indicador de carga
      }
    };

    fetchContactData();
  }, []);

  // Manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateContactData()) return;

    try {
      setIsLoading(true); // Mostrar indicador de carga
      const response = await fetch('https://backendgias.onrender.com/api/contact/contact-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        toast.success('Datos de contacto actualizados con éxito.', { position: 'top-right' });
      } else {
        toast.error('Error al actualizar los datos de contacto.', { position: 'top-right' });
      }
    } catch (error) {
      toast.error('Error de red al actualizar los datos.', { position: 'top-right' });
    } finally {
      setIsLoading(false); // Ocultar indicador de carga
    }
  };

  return (
    <div className="contact-edit-container">
      <ToastContainer />
      <h1>Modificar Datos de Contacto</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            value={contactData.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="correo"
            value={contactData.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Número de Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={contactData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
};

export default ContactEdit;


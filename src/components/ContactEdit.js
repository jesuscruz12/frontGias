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

  // Cargar los datos de contacto al iniciar el componente
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/contact/contact-info'); // Asegúrate de que esta ruta sea correcta
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        setContactData(data);
      } catch (error) {
        console.error('Error al cargar los datos de contacto:', error);
        toast.error('Error al cargar los datos de contacto', { position: 'top-right' });
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

    try {
      const response = await fetch('http://localhost:5000/api/contact/contact-info', {
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
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ContactEdit;

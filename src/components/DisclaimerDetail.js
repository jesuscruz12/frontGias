import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import API_URL from '../apiConfig'; // Ruta de configuración de tu API
import '../styles/DisclaimerViewer.css'; // Asegúrate de importar tu archivo CSS

const DisclaimerDetail = () => {
  const { id } = useParams(); // Obtén el ID de la URL
  const [disclaimer, setDisclaimer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisclaimer = async () => {
      try {
        const response = await axios.get(`${API_URL}/legal-boundaries/${id}`); // Obtén el deslinde por ID
        console.log(response.data); // Verifica la respuesta de la API
        setDisclaimer(response.data); // Guarda el deslinde en el estado
      } catch (error) {
        console.error('Error al obtener el deslinde:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisclaimer(); // Llama a la función para obtener el deslinde
  }, [id]);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!disclaimer) {
    return <div className="error">No se encontró el deslinde.</div>;
  }

  return (
    <div className="disclaimer-viewer-container">
      <div className="disclaimer-viewer-content">
        <h2 className="disclaimer-title">{disclaimer.title}</h2> {/* Título del deslinde */}
        <h4 className="disclaimer-version">Versión: {disclaimer.version}</h4> {/* Mostrar la versión */}
        <h3>Contenido del Deslinde:</h3> {/* Título adicional para el contenido */}
        <p>{disclaimer.content}</p>
        <button onClick={() => window.history.back()}>Regresar</button>
      </div>
    </div>
  );
};

export default DisclaimerDetail;

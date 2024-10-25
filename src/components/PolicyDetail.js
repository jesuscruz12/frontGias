import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import API_URL from '../apiConfig'; // Ruta de configuración de tu API
import '../styles/PolicyViewer.css'; // Asegúrate de importar tu archivo CSS

const PolicyViewer = () => {
  const { id } = useParams(); // Obtén el ID de la URL
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get(`${API_URL}/policies/${id}`); // Obtén la política por ID
        setPolicy(response.data); // Guarda la política en el estado
      } catch (error) {
        console.error('Error al obtener la política:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy(); // Llama a la función para obtener la política
  }, [id]);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!policy) {
    return <div className="error">No se encontró la política.</div>;
  }

  return (
    <div className="policy-viewer-container">
      <div className="policy-viewer-content">
        <h2 className="policy-title">{policy.title}</h2> {/* Agregar clase para el título */}
        <h3>Contenido de la Política:</h3> {/* Título adicional para el contenido */}
        <p>{policy.content}</p>
        <button onClick={() => window.history.back()}>Regresar</button>
      </div>
    </div>
  );
};

export default PolicyViewer;

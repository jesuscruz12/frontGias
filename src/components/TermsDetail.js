import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import API_URL from '../apiConfig'; // Ruta de configuración de tu API
import '../styles/PolicyViewer.css'; // Asegúrate de importar tu archivo CSS

const TermsDetail = () => {
  const { id } = useParams(); // Obtén el ID de la URL
  const [terms, setTerms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get(`${API_URL}/terms/${id}`); // Obtén los términos por ID
        console.log(response.data); // Verifica la respuesta de la API
        setTerms(response.data); // Guarda los términos en el estado
      } catch (error) {
        console.error('Error al obtener los términos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms(); // Llama a la función para obtener los términos
  }, [id]);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!terms) {
    return <div className="error">No se encontraron los términos.</div>;
  }

  return (
    <div className="policy-viewer-container">
      <div className="policy-viewer-content">
        <h2 className="policy-title">{terms.title}</h2> {/* Título de los términos */}
        <h4 className="policy-version">Versión: {terms.version}</h4> {/* Mostrar la versión */}
        <h3>Contenido de los Términos:</h3> {/* Título adicional para el contenido */}
        <p>{terms.content}</p>
        <button onClick={() => window.history.back()}>Regresar</button>
      </div>
    </div>
  );
};

export default TermsDetail;

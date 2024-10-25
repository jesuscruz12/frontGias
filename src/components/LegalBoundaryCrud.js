import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../apiConfig';
import '../styles/legalBoundary.css';

const LegalBoundaryCrud = () => {
  const [legalBoundaries, setLegalBoundaries] = useState([]); // Lista de deslindes legales
  const [newLegalBoundary, setNewLegalBoundary] = useState({ title: '', content: '' }); // Nuevo deslinde legal
  const [editingLegalBoundary, setEditingLegalBoundary] = useState(null); // Deslinde en edición

  useEffect(() => {
    fetchLegalBoundaries(); // Cargar todos los deslindes al montar el componente
  }, []);

  // Obtener todos los deslindes legales
  const fetchLegalBoundaries = async () => {
    try {
      const response = await axios.get(`${API_URL}/legal-boundaries`);
      setLegalBoundaries(response.data); // Guardar los deslindes en el estado
    } catch (error) {
      console.error('Error al obtener los deslindes legales:', error);
    }
  };

  // Crear nuevo deslinde legal
  const handleCreateLegalBoundary = async () => {
    if (!newLegalBoundary.title || !newLegalBoundary.content) {
      console.error('Título y contenido no pueden estar vacíos');
      return;
    }

    try {
      await axios.post(`${API_URL}/legal-boundaries`, newLegalBoundary); // Crear deslinde en el backend
      setNewLegalBoundary({ title: '', content: '' }); // Reiniciar los campos del formulario
      fetchLegalBoundaries(); // Recargar los deslindes
    } catch (error) {
      console.error('Error al crear el deslinde legal:', error);
    }
  };

  // Editar un deslinde legal existente
  const handleEditLegalBoundary = (legalBoundary) => {
    setEditingLegalBoundary(legalBoundary); // Poner el deslinde en modo edición
  };

  // Guardar los cambios en una nueva versión del deslinde editado
  const handleSaveLegalBoundary = async () => {
    if (!editingLegalBoundary || !editingLegalBoundary.title || !editingLegalBoundary.content) {
      console.error('Título y contenido no pueden estar vacíos');
      return;
    }

    try {
      await axios.put(`${API_URL}/legal-boundaries/${editingLegalBoundary._id}`, editingLegalBoundary); // Actualizar el deslinde
      setEditingLegalBoundary(null); // Salir del modo de edición
      fetchLegalBoundaries(); // Recargar los deslindes
    } catch (error) {
      console.error('Error al guardar la nueva versión del deslinde legal:', error.response ? error.response.data : error.message);
    }
  };

  // Eliminar un deslinde legal
  const handleDeleteLegalBoundary = async (id) => {
    try {
      await axios.delete(`${API_URL}/legal-boundaries/${id}`); // Eliminar deslinde por ID
      fetchLegalBoundaries(); // Recargar los deslindes
    } catch (error) {
      console.error('Error al eliminar el deslinde legal:', error);
    }
  };

  return (
    <div className="legal-boundary-crud-container">
      <h2>Gestionar Deslindes Legales</h2>

      {/* Formulario para crear nuevo deslinde legal */}
      <div>
        <h3>Crear nuevo deslinde legal</h3>
        <input
          type="text"
          placeholder="Título"
          value={newLegalBoundary.title}
          onChange={(e) => setNewLegalBoundary({ ...newLegalBoundary, title: e.target.value })}
        />
        <textarea
          placeholder="Contenido"
          value={newLegalBoundary.content}
          onChange={(e) => setNewLegalBoundary({ ...newLegalBoundary, content: e.target.value })}
        />
        <button onClick={handleCreateLegalBoundary}>Crear</button>
      </div>

      {/* Listado de deslindes legales existentes */}
      <h3>Deslindes legales existentes</h3>
      <ul>
        {legalBoundaries.map((legalBoundary) => (
          <li key={legalBoundary._id}>
            {editingLegalBoundary && editingLegalBoundary._id === legalBoundary._id ? (
              <>
                <input
                  type="text"
                  value={editingLegalBoundary.title}
                  onChange={(e) => setEditingLegalBoundary({ ...editingLegalBoundary, title: e.target.value })}
                />
                <textarea
                  value={editingLegalBoundary.content}
                  onChange={(e) => setEditingLegalBoundary({ ...editingLegalBoundary, content: e.target.value })}
                />
                <button onClick={handleSaveLegalBoundary}>Guardar nueva versión</button>
                <button onClick={() => setEditingLegalBoundary(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <h4>{legalBoundary.title}</h4>
                <p>{legalBoundary.content}</p>
                <p>Versión: {legalBoundary.version || 1}</p>
                <p>Fecha de creación: {new Date(legalBoundary.createdAt).toLocaleString()}</p>
                <button onClick={() => handleEditLegalBoundary(legalBoundary)}>Editar</button>
                <button onClick={() => handleDeleteLegalBoundary(legalBoundary._id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LegalBoundaryCrud;

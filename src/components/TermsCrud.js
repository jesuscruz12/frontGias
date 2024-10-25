import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../apiConfig';
import '../styles/terms.css';

const TermsCrud = () => {
  const [terms, setTerms] = useState([]); // Lista de términos
  const [newTerm, setNewTerm] = useState({ title: '', content: '' }); // Nuevo término
  const [editingTerm, setEditingTerm] = useState(null); // Término en edición

  useEffect(() => {
    fetchTerms(); // Cargar todos los términos al montar el componente
  }, []);

  // Obtener todos los términos
  const fetchTerms = async () => {
    try {
      const response = await axios.get(`${API_URL}/terms`);
      setTerms(response.data); // Guardar los términos en el estado
    } catch (error) {
      console.error('Error al obtener los términos:', error);
    }
  };

  // Crear nuevo término
  const handleCreateTerm = async () => {
    if (!newTerm.title || !newTerm.content) {
      console.error('Título y contenido no pueden estar vacíos');
      return;
    }

    try {
      await axios.post(`${API_URL}/terms`, newTerm); // Crear término en el backend
      setNewTerm({ title: '', content: '' }); // Reiniciar los campos del formulario
      fetchTerms(); // Recargar los términos
    } catch (error) {
      console.error('Error al crear el término:', error);
    }
  };

  // Editar un término existente
  const handleEditTerm = (term) => {
    setEditingTerm(term); // Poner el término en modo edición
  };

  // Guardar los cambios en un nuevo término editado
  const handleSaveTerm = async () => {
    if (!editingTerm || !editingTerm.title || !editingTerm.content) {
      console.error('Título y contenido no pueden estar vacíos');
      return;
    }

    try {
      await axios.put(`${API_URL}/terms/${editingTerm._id}`, editingTerm); // Actualizar el término
      setEditingTerm(null); // Salir del modo de edición
      fetchTerms(); // Recargar los términos
    } catch (error) {
      console.error('Error al guardar la nueva versión del término:', error);
    }
  };

  // Eliminar un término
  const handleDeleteTerm = async (id) => {
    try {
      await axios.delete(`${API_URL}/terms/${id}`); // Eliminar término por ID
      fetchTerms(); // Recargar los términos
    } catch (error) {
      console.error('Error al eliminar el término:', error);
    }
  };

  return (
    <div className="terms-crud-container">
      <h2>Gestionar Términos y Condiciones</h2>

      {/* Formulario para crear nuevo término */}
      <div>
        <h3>Crear nuevo término</h3>
        <input
          type="text"
          placeholder="Título"
          value={newTerm.title}
          onChange={(e) => setNewTerm({ ...newTerm, title: e.target.value })}
        />
        <textarea
          placeholder="Contenido"
          value={newTerm.content}
          onChange={(e) => setNewTerm({ ...newTerm, content: e.target.value })}
        />
        <button onClick={handleCreateTerm}>Crear</button>
      </div>

      {/* Listado de términos existentes */}
      <h3>Términos existentes</h3>
      <ul>
        {terms.map((term) => (
          <li key={term._id}>
            {editingTerm && editingTerm._id === term._id ? (
              <>
                <input
                  type="text"
                  value={editingTerm.title}
                  onChange={(e) => setEditingTerm({ ...editingTerm, title: e.target.value })}
                />
                <textarea
                  value={editingTerm.content}
                  onChange={(e) => setEditingTerm({ ...editingTerm, content: e.target.value })}
                />
                <button onClick={handleSaveTerm}>Guardar</button>
                <button onClick={() => setEditingTerm(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <h4>{term.title} (v.{term.version})</h4>
                <p>{term.content}</p>
                <button onClick={() => handleEditTerm(term)}>Editar</button>
                <button onClick={() => handleDeleteTerm(term._id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TermsCrud;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../apiConfig'; // Importar la URL de la API
import '../styles/policy.css'; // Asegúrate de importar el archivo CSS

const PolicyCrud = () => {
  const [policies, setPolicies] = useState([]); // Lista de políticas
  const [newPolicy, setNewPolicy] = useState({ title: '', content: '' }); // Nueva política
  const [editingPolicy, setEditingPolicy] = useState(null); // Política que está siendo editada

  // Obtener todas las políticas al cargar el componente
  useEffect(() => {
    fetchPolicies();
  }, []);

  // Función para obtener las políticas del backend
  const fetchPolicies = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/policies`);
      setPolicies(response.data); // Guardar las políticas en el estado
    } catch (error) {
      console.error('Error al obtener las políticas:', error);
    }
  };

  // Función para crear una nueva política
  const handleCreatePolicy = async () => {
    if (!newPolicy.title || !newPolicy.content) {
      console.error('Título y contenido no pueden estar vacíos');
      return;
    }
    try {
      await axios.post(`${API_URL}/api/policies`, newPolicy); // Enviar la nueva política al backend
      setNewPolicy({ title: '', content: '' }); // Reiniciar el formulario
      fetchPolicies(); // Volver a cargar las políticas
    } catch (error) {
      console.error('Error al crear la política:', error);
    }
  };

  // Función para editar una política
  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy); // Establecer la política que se va a editar
  };

  // Función para guardar los cambios en una política editada
  const handleSavePolicy = async () => {
    // Verifica que editingPolicy no sea nulo y tenga las propiedades correctas
    if (!editingPolicy || !editingPolicy.title || !editingPolicy.content) {
      console.error('Título y contenido no pueden estar vacíos');
      return;
    }

    console.log('Guardando política:', editingPolicy); // Verifica los datos que se enviarán

    try {
      await axios.put(`${API_URL}/api/policies/${editingPolicy._id}`, editingPolicy); // Actualizar la política
      setEditingPolicy(null); // Salir del modo de edición
      fetchPolicies(); // Recargar las políticas
    } catch (error) {
      console.error('Error al guardar la nueva versión de la política:', error.response ? error.response.data : error.message);
    }
  };

  // Función para eliminar una política
  const handleDeletePolicy = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/policies/${id}`); // Eliminar la política por ID
      fetchPolicies(); // Volver a cargar las políticas
    } catch (error) {
      console.error('Error al eliminar la política:', error);
    }
  };

  return (
    <div className="policy-crud-container"> {/* Aplicar clase para estilos */}
      <h2>Gestionar Políticas</h2>

      {/* Crear nueva política */}
      <div>
        <h3>Crear nueva política</h3>
        <input
          type="text"
          placeholder="Título"
          value={newPolicy.title}
          onChange={(e) => setNewPolicy({ ...newPolicy, title: e.target.value })}
        />
        <textarea
          placeholder="Contenido"
          value={newPolicy.content}
          onChange={(e) => setNewPolicy({ ...newPolicy, content: e.target.value })}
        />
        <button onClick={handleCreatePolicy}>Crear</button>
      </div>

      {/* Listar y editar políticas */}
      <h3>Políticas existentes</h3>
      <ul>
        {policies.map((policy) => (
          <li key={policy._id}>
            {editingPolicy && editingPolicy._id === policy._id ? (
              <>
                <input
                  type="text"
                  value={editingPolicy.title}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, title: e.target.value })}
                />
                <textarea
                  value={editingPolicy.content}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, content: e.target.value })}
                />
                <button onClick={handleSavePolicy}>Guardar nueva versión</button>
                <button onClick={() => setEditingPolicy(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <h4>{policy.title} {policy.isCurrent && <span>(Vigente)</span>}</h4>
                <p>{policy.content}</p>
                <p>Versión: {policy.version || 1}</p>
                <p>Fecha de creación: {new Date(policy.createdAt).toLocaleString()}</p>
                <button onClick={() => handleEditPolicy(policy)}>Editar</button>
                <button onClick={() => handleDeletePolicy(policy._id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PolicyCrud;

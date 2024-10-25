import React, { useState } from 'react';
import axios from 'axios';

const LogoAdmin = () => {
    const [logo, setLogo] = useState(null); // Estado para manejar el logo
    const [error, setError] = useState(null); // Estado para manejar errores
    const [successMessage, setSuccessMessage] = useState(''); // Mensaje de éxito

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        
        // Validar el tamaño del archivo
        if (file && file.size > 2 * 1024 * 1024) { // 2 MB
            setError('El tamaño del archivo debe ser menor a 2 MB');
            return;
        }

        setLogo(file);
        setError(null); // Resetea el mensaje de error al seleccionar un nuevo archivo
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        if (!logo) {
            setError('Por favor, selecciona un archivo de imagen.');
            return;
        }

        const formData = new FormData();
        formData.append('logo', logo);

        try {
            const response = await axios.post('http://localhost:5000/api/logo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccessMessage('Logo actualizado exitosamente.');
            setLogo(null); // Resetea el logo después de subirlo
        } catch (error) {
            console.error('Error al subir el logo:', error);
            setError('Error al subir el logo. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div>
            <h2>Subida y Actualización del Logo</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="logo">Selecciona el logo:</label>
                    <input
                        type="file"
                        id="logo"
                        accept=".jpeg,.jpg,.png"
                        onChange={handleLogoChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar Logo</button>
            </form>
        </div>
    );
};

export default LogoAdmin;

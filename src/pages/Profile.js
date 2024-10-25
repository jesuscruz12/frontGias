import React, { useState } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [newName, setNewName] = useState(user.nombre || '');
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || '/default-avatar.png');

  // Manejar la carga de una nueva foto de perfil
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar los cambios en el perfil
  const handleSave = () => {
    const updatedUser = { ...user, nombre: newName, profilePicture };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Perfil actualizado con éxito.');
  };

  return (
    <div className="profile-container">
      <h1>Mi Perfil</h1>
      <div className="profile-picture-section">
        <img src={profilePicture} alt="Foto de perfil" className="profile-picture-large" />
        <input type="file" onChange={handleFileChange} />
      </div>
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
      </div>
      <button className="save-button" onClick={handleSave}>
        Guardar cambios
      </button>
    </div>
  );
};

export default Profile;

import React, { useState } from 'react';
import ReactMapboxAutocomplete from 'react-mapbox-autocomplete';

const AddressAutocomplete = ({ setFormData, formData }) => {
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionSelect = (result, lat, lng, text) => {
    const addressParts = result.split(', ');
    setFormData({
      ...formData,
      ciudad: addressParts[addressParts.length - 3] || '',
      colonia: addressParts[addressParts.length - 2] || '',
      calle: addressParts[0] || '',
    });
    setSuggestions([]); // Limpia las sugerencias después de seleccionar
  };

  return (
    <div>
      <ReactMapboxAutocomplete
        publicKey="pk.eyJ1IjoibWVkaW5hMTYiLCJhIjoiY20zbnpneHRnMWlqNDJqb25xenh6MWczZiJ9.DjQvhEz_uDsZePoawhCsxg" // Reemplaza con tu token de acceso
        placeholder="Escribe tu dirección"
        onSuggestionSelect={onSuggestionSelect}
        country="mx" // Filtra solo resultados en México
        resetSearch={false}
      />
    </div>
  );
};

export default AddressAutocomplete;

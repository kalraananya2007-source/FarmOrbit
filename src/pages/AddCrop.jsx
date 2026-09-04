import { useState } from 'react';
import './AddCrop.css';

function AddCrop() {
  const [cropName, setCropName] = useState('');
  const [cropType, setCropType] = useState('');
  const [fieldLocation, setFieldLocation] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!cropName || !cropType || !fieldLocation || !plantingDate) {
      setError('Please fill all the fields.');
      return;
    }

    setError('');
    alert('Crop added successfully!');
  }

  return (
    <div className="add-crop">
      <h1>Add Crop</h1>

      <form onSubmit={handleSubmit}>
        <label>Crop Name</label>
        <input
          type="text"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
        />

        <label>Crop Type</label>
        <input
          type="text"
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}
        />

        <label>Field Location</label>
        <input
          type="text"
          value={fieldLocation}
          onChange={(e) => setFieldLocation(e.target.value)}
        />

        <label>Planting Date</label>
        <input
          type="date"
          value={plantingDate}
          onChange={(e) => setPlantingDate(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Add Crop</button>
      </form>
    </div>
  );
}

export default AddCrop;
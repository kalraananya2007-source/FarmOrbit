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

    const newCrop = {
  name: cropName,
  type: cropType,
  location: fieldLocation,
  plantingDate: plantingDate
};

console.log('New Crop:', newCrop);
setError('');
alert('Crop added successfully!');
  }

  return (
    <div className="add-crop">
      <h1>Add Crop</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="cropName">Crop Name</label>
        <input
          id="cropName"
          name="cropName"
          type="text"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
          required
        />

        <label htmlFor="cropType">Crop Type</label>
        <input
          id="cropType"
          name="cropType"
          type="text"
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}
          required
        />

        <label htmlFor="fieldLocation">Field Location</label>
        <input
          id="fieldLocation"
          name="fieldLocation"
          type="text"
          value={fieldLocation}
          onChange={(e) => setFieldLocation(e.target.value)}
          required
        />

        <label htmlFor="plantingDate">Planting Date</label>
        <input
          id="plantingDate"
          name="plantingDate"
          type="date"
          value={plantingDate}
          onChange={(e) => setPlantingDate(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Add Crop</button>
      </form>
    </div>
  );
}

export default AddCrop;
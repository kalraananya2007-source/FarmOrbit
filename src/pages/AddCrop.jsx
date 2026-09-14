import { useState } from 'react';
import './AddCrop.css';

function AddCrop() {
  const [cropName, setCropName] = useState('');
  const [cropType, setCropType] = useState('');
  const [fieldLocation, setFieldLocation] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [status, setStatus] = useState('Growing');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!cropName || !cropType || !fieldLocation || !plantingDate) {
      setError('Please fill all the fields.');
      return;
    }

    const savedCrops = JSON.parse(localStorage.getItem('crops')) || [];

    const newCrop = {
      id: Date.now(),
      name: cropName,
      type: cropType,
      location: fieldLocation,
      plantingDate: plantingDate,
      status: status
    };

    const updatedCrops = [...savedCrops, newCrop];

    localStorage.setItem('crops', JSON.stringify(updatedCrops));

    setError('');

    alert('Crop added successfully!');

    setCropName('');
    setCropType('');
    setFieldLocation('');
    setPlantingDate('');
    setStatus('Growing');
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

        <label htmlFor="status">Crop Status</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Growing">Growing</option>
          <option value="Harvested">Harvested</option>
        </select>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Add Crop</button>
      </form>
    </div>
  );
}

export default AddCrop;
import { useState } from 'react';
import './AddCrop.css';

function AddCrop() {
  const [cropName, setCropName] = useState('');
  const [cropType, setCropType] = useState('');
  const [fieldLocation, setFieldLocation] = useState('');
  const [plantingDate, setPlantingDate] = useState('');

  return (
    <div className="add-crop">
      <h1>Add Crop</h1>

      <form>
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

        <button type="submit">Add Crop</button>
      </form>
    </div>
  );
}

export default AddCrop;
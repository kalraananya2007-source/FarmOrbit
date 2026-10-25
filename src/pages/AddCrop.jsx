
import { useState } from 'react';
import './AddCrop.css';

function AddCrop() {
  const [cropName, setCropName] = useState('');
  const [cropType, setCropType] = useState('');
  const [fieldLocation, setFieldLocation] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [status, setStatus] = useState('Growing');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!cropName.trim() || !cropType.trim() ||
        !fieldLocation.trim() || !plantingDate) {
      setError('Please fill all the fields.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/api/crops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: cropName.trim(),
          type: cropType.trim(),
          location: fieldLocation.trim(),
          plantingDate,
          status
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to add crop.');
      }

      alert('Crop added successfully!');

      setCropName('');
      setCropType('');
      setFieldLocation('');
      setPlantingDate('');
      setStatus('Growing');
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Cannot connect to the backend. Make sure the server is running.'
          : err.message
      );
    } finally {
      setLoading(false);
    }
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

        <button type="submit" disabled={loading}>
          {loading ? 'Adding Crop...' : 'Add Crop'}
        </button>
      </form>
    </div>
  );
}

export default AddCrop;

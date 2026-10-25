
import { useEffect, useState } from 'react';
import './MyCrop.css';

const API_URL = 'http://localhost:5000/api/crops';

function MyCrops() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageError, setPageError] = useState('');
  const [editingCrop, setEditingCrop] = useState(null);

  const [cropName, setCropName] = useState('');
  const [cropType, setCropType] = useState('');
  const [fieldLocation, setFieldLocation] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [status, setStatus] = useState('Growing');
  const [error, setError] = useState('');

  // Fetch crops from MongoDB through the backend
  async function fetchCrops() {
    try {
      setLoading(true);
      setPageError('');

      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch crops.');
      }

      setCrops(result.data);
    } catch (err) {
      setPageError(
        err.message === 'Failed to fetch'
          ? 'Cannot connect to the backend. Make sure it is running.'
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCrops();
  }, []);

  function editCrop(crop) {
    setEditingCrop(crop);
    setCropName(crop.name);
    setCropType(crop.type);
    setFieldLocation(crop.location);

    // Convert MongoDB date into YYYY-MM-DD for the date input
    setPlantingDate(
      crop.plantingDate ? crop.plantingDate.slice(0, 10) : ''
    );

    setStatus(crop.status || 'Growing');
    setError('');
    setPageError('');
  }

  function cancelEdit() {
    setEditingCrop(null);
    setCropName('');
    setCropType('');
    setFieldLocation('');
    setPlantingDate('');
    setStatus('Growing');
    setError('');
  }

  async function updateCrop(e) {
    e.preventDefault();
    setError('');

    if (
      !cropName.trim() ||
      !cropType.trim() ||
      !fieldLocation.trim() ||
      !plantingDate
    ) {
      setError('Please fill all the fields.');
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/${editingCrop._id}`, {
        method: 'PUT',
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
        throw new Error(result.message || 'Failed to update crop.');
      }

      await fetchCrops();
      cancelEdit();
      alert('Crop updated successfully!');
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Cannot connect to the backend.'
          : err.message
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteCrop(cropId) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this crop?'
    );

    if (!confirmed) return;

    try {
      setPageError('');

      const response = await fetch(`${API_URL}/${cropId}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete crop.');
      }

      setCrops((currentCrops) =>
        currentCrops.filter((crop) => crop._id !== cropId)
      );

      if (editingCrop?._id === cropId) {
        cancelEdit();
      }

      alert('Crop deleted successfully!');
    } catch (err) {
      setPageError(
        err.message === 'Failed to fetch'
          ? 'Cannot connect to the backend.'
          : err.message
      );
    }
  }

  if (loading) {
    return (
      <div className="my-crops">
        <h1>My Crops</h1>
        <p>Loading crops...</p>
      </div>
    );
  }

  return (
    <div className="my-crops">
      <h1>My Crops</h1>

      <p>Total Crops: {crops.length}</p>

      {pageError && (
        <p className="error-message" role="alert">
          {pageError}
        </p>
      )}

      {pageError && (
        <button type="button" onClick={fetchCrops}>
          Retry
        </button>
      )}

      {editingCrop && (
        <div className="crop-card">
          <h2>Edit Crop</h2>

          <form onSubmit={updateCrop}>
            <label htmlFor="editCropName">Crop Name</label>
            <input
              id="editCropName"
              type="text"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              required
            />

            <label htmlFor="editCropType">Crop Type</label>
            <input
              id="editCropType"
              type="text"
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              required
            />

            <label htmlFor="editFieldLocation">Field Location</label>
            <input
              id="editFieldLocation"
              type="text"
              value={fieldLocation}
              onChange={(e) => setFieldLocation(e.target.value)}
              required
            />

            <label htmlFor="editPlantingDate">Planting Date</label>
            <input
              id="editPlantingDate"
              type="date"
              value={plantingDate}
              onChange={(e) => setPlantingDate(e.target.value)}
              required
            />

            <label htmlFor="editStatus">Crop Status</label>
            <select
              id="editStatus"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Growing">Growing</option>
              <option value="Harvested">Harvested</option>
            </select>

            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={saving}>
              {saving ? 'Updating...' : 'Update Crop'}
            </button>

            <button type="button" onClick={cancelEdit} disabled={saving}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {crops.length === 0 ? (
        <p className="no-crops">No crops added yet.</p>
      ) : (
        <div className="crop-list">
          {crops.map((crop) => (
            <div className="crop-card" key={crop._id}>
              <h2>{crop.name}</h2>

              <p>
                <strong>Type:</strong> {crop.type}
              </p>

              <p>
                <strong>Location:</strong> {crop.location}
              </p>

              <p>
                <strong>Planting Date:</strong>{' '}
                {crop.plantingDate
                  ? crop.plantingDate.slice(0, 10)
                  : 'Not specified'}
              </p>

              <p>
                <strong>Status:</strong> {crop.status || 'Growing'}
              </p>

              <button
                type="button"
                onClick={() => editCrop(crop)}
              >
                Edit Crop
              </button>

              <button
                type="button"
                onClick={() => deleteCrop(crop._id)}
              >
                Delete Crop
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCrops;

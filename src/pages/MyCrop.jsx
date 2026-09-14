import { useEffect, useState } from 'react';
import './MyCrop.css';

function MyCrops() {
  const [crops, setCrops] = useState([]);

  const [editingCrop, setEditingCrop] = useState(null);

  const [cropName, setCropName] = useState('');
  const [cropType, setCropType] = useState('');
  const [fieldLocation, setFieldLocation] = useState('');
  const [plantingDate, setPlantingDate] = useState('');

  useEffect(() => {
    const savedCrops = JSON.parse(localStorage.getItem('crops')) || [];
    setCrops(savedCrops);
  }, []);

  function editCrop(crop) {
    setEditingCrop(crop);

    setCropName(crop.name);
    setCropType(crop.type);
    setFieldLocation(crop.location);
    setPlantingDate(crop.plantingDate);
  }

  function cancelEdit() {
    setEditingCrop(null);

    setCropName('');
    setCropType('');
    setFieldLocation('');
    setPlantingDate('');
  }

  function deleteCrop(index) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this crop?'
    );

    if (!confirmed) {
      return;
    }

    const updatedCrops = crops.filter(
      (_, cropIndex) => cropIndex !== index
    );

    setCrops(updatedCrops);
    localStorage.setItem('crops', JSON.stringify(updatedCrops));
  }

  return (
    <div className="my-crops">
      <h1>My Crops</h1>

      <p>Total Crops: {crops.length}</p>

      {editingCrop && (
        <div className="crop-card">
          <h2>Edit Crop</h2>

          <label htmlFor="editCropName">Crop Name</label>
          <input
            id="editCropName"
            type="text"
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
          />

          <label htmlFor="editCropType">Crop Type</label>
          <input
            id="editCropType"
            type="text"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
          />

          <label htmlFor="editFieldLocation">Field Location</label>
          <input
            id="editFieldLocation"
            type="text"
            value={fieldLocation}
            onChange={(e) => setFieldLocation(e.target.value)}
          />

          <label htmlFor="editPlantingDate">Planting Date</label>
          <input
            id="editPlantingDate"
            type="date"
            value={plantingDate}
            onChange={(e) => setPlantingDate(e.target.value)}
          />

          <button type="button">
            Update Crop
          </button>

          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      )}

      {crops.length === 0 ? (
        <p className="no-crops">No crops added yet.</p>
      ) : (
        <div className="crop-list">
          {crops.map((crop) => (
            <div className="crop-card" key={crop.id}>
              <h2>{crop.name}</h2>

              <p>
                <strong>Type:</strong> {crop.type}
              </p>

              <p>
                <strong>Location:</strong> {crop.location}
              </p>

              <p>
                <strong>Planting Date:</strong> {crop.plantingDate}
              </p>

              <button onClick={() => editCrop(crop)}>
                Edit Crop
              </button>

              <button onClick={() => deleteCrop(crops.indexOf(crop))}>
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
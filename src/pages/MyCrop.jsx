
import { useEffect, useState } from 'react';
import './MyCrop.css';

function MyCrops() {
  const [crops, setCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');

  const [editingCrop, setEditingCrop] = useState(null);

  const [cropName, setCropName] = useState('');
  const [cropType, setCropType] = useState('');
  const [fieldLocation, setFieldLocation] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [status, setStatus] = useState('Growing');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedCrops =
      JSON.parse(localStorage.getItem('crops')) || [];
    setCrops(savedCrops);
  }, []);

  function editCrop(crop) {
    setEditingCrop(crop);
    setCropName(crop.name);
    setCropType(crop.type);
    setFieldLocation(crop.location);
    setPlantingDate(crop.plantingDate);
    setStatus(crop.status || 'Growing');
    setError('');
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

  function updateCrop(e) {
    e.preventDefault();

    if (!cropName || !cropType || !fieldLocation || !plantingDate) {
      setError('Please fill all the fields.');
      return;
    }

    const updatedCrops = crops.map((crop) => {
      if (crop.id === editingCrop.id) {
        return {
          ...crop,
          name: cropName,
          type: cropType,
          location: fieldLocation,
          plantingDate: plantingDate,
          status: status
        };
      }

      return crop;
    });

    setCrops(updatedCrops);
    localStorage.setItem('crops', JSON.stringify(updatedCrops));

    alert('Crop updated successfully!');
    cancelEdit();
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

  // Get crop types automatically from saved crops
  const cropTypes = [
    ...new Set(crops.map((crop) => crop.type).filter(Boolean))
  ];

  // Apply both search and type filter
  const filteredCrops = crops.filter((crop) => {
    const matchesName = (crop.name || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === 'All Types' ||
      crop.type === selectedType;

    return matchesName && matchesType;
  });

  return (
    <div className="my-crops">
      <h1>My Crops</h1>

      <p>Total Crops: {crops.length}</p>

      {/* Search Bar and Type Filter */}
      <div className="crop-search-row">
        <div className="crop-search">
          <label htmlFor="cropSearch">Search your crops</label>

          <input
            id="cropSearch"
            type="text"
            placeholder="Enter crop name, e.g. Wheat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="crop-type-filter">
          <label htmlFor="cropTypeFilter">Filter by type</label>

          <select
            id="cropTypeFilter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All Types">All Types</option>

            {cropTypes.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Edit Crop Form */}
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

            <label htmlFor="editStatus">Crop Status</label>
            <select
              id="editStatus"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Growing">Growing</option>
              <option value="Harvested">Harvested</option>
            </select>

            {error && <p className="error-message">{error}</p>}

            <button type="submit">Update Crop</button>

            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Crop List */}
      {crops.length === 0 ? (
        <p className="no-crops">No crops added yet.</p>
      ) : filteredCrops.length === 0 ? (
        <p className="no-crops">
          No crops found. Try another name.
        </p>
      ) : (
        <div className="crop-list">
          {filteredCrops.map((crop) => (
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

              <p>
                <strong>Status:</strong> {crop.status || 'Growing'}
              </p>

              <button onClick={() => editCrop(crop)}>
                Edit Crop
              </button>

              <button
                onClick={() => deleteCrop(crops.indexOf(crop))}
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

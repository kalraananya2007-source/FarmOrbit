import { useEffect, useState } from 'react';
import './MyCrop.css';

function MyCrops() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const savedCrops = JSON.parse(localStorage.getItem('crops')) || [];
    setCrops(savedCrops);
  }, []);
  function deleteCrop(index) {
  const updatedCrops = crops.filter((_, cropIndex) => cropIndex !== index);

  setCrops(updatedCrops);
  localStorage.setItem('crops', JSON.stringify(updatedCrops));
}

  return (
    <div className="my-crops">
      <h1>My Crops</h1>
      <p>Total Crops: {crops.length}</p>

      {crops.length === 0 ? (
        <p className="no-crops">No crops added yet.</p>
      ) : (
        <div className="crop-list">
          {crops.map((crop, index) => (
            <div className="crop-card" key={index}>
              <h2>{crop.name}</h2>
              <p><strong>Type:</strong> {crop.type}</p>
              <p><strong>Location:</strong> {crop.location}</p>
              <p><strong>Planting Date:</strong> {crop.plantingDate}</p>
              <button onClick={() => deleteCrop(index)}>
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
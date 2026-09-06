import { useEffect, useState } from 'react';

function MyCrops() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const savedCrops = JSON.parse(localStorage.getItem('crops')) || [];
    setCrops(savedCrops);
  }, []);

  return (
    <div>
      <h1>My Crops</h1>

      {crops.length === 0 ? (
        <p>No crops added yet.</p>
      ) : (
        crops.map((crop, index) => (
          <div key={index}>
            <h2>{crop.name}</h2>
            <p>Type: {crop.type}</p>
            <p>Location: {crop.location}</p>
            <p>Planting Date: {crop.plantingDate}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyCrops;
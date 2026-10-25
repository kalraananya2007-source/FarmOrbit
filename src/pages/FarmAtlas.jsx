
import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './FarmAtlas.css';

// Abhi demo farms hain.
// Baad mein inhe actual saved farm data se connect karenge.
const farms = [
  {
    id: 1,
    name: 'Green Valley Farm',
    location: 'Karnal, Haryana',
    area: '5 acres',
    crop: 'Wheat',
    status: 'Growing',
    position: [29.6857, 76.9905]
  },
  {
    id: 2,
    name: 'Sunrise Farm',
    location: 'Karnal, Haryana',
    area: '3 acres',
    crop: 'Rice',
    status: 'Harvested',
    position: [29.7000, 76.9800]
  },
  {
    id: 3,
    name: 'Nature Farm',
    location: 'Karnal, Haryana',
    area: '7 acres',
    crop: 'Sugarcane',
    status: 'Growing',
    position: [29.6700, 77.0100]
  }
];

function FarmAtlas() {
  const [selectedFarm, setSelectedFarm] = useState(farms[0]);

  return (
    <div className="atlas-page">
      <h1>My Farm Atlas</h1>
      <p className="atlas-subtitle">
        Explore your farms on an interactive map.
      </p>

      <div className="atlas-layout">
        <div className="atlas-map">
          <MapContainer
            center={[29.6857, 76.9905]}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: '450px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {farms.map((farm) => (
              <CircleMarker
                key={farm.id}
                center={farm.position}
                radius={selectedFarm.id === farm.id ? 11 : 8}
                pathOptions={{
                  color: selectedFarm.id === farm.id
                    ? 'orange'
                    : 'green',
                  fillColor: selectedFarm.id === farm.id
                    ? 'orange'
                    : 'lightgreen',
                  fillOpacity: 0.9
                }}
                eventHandlers={{
                  click: () => setSelectedFarm(farm)
                }}
              >
                <Popup>
                  <strong>{farm.name}</strong>
                  <br />
                  {farm.crop} — {farm.status}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div className="atlas-details">
          <h2>Farm Details</h2>

          {farms.map((farm) => (
            <button
              key={farm.id}
              className={
                selectedFarm.id === farm.id
                  ? 'farm-option active'
                  : 'farm-option'
              }
              onClick={() => setSelectedFarm(farm)}
            >
              {farm.name}
            </button>
          ))}

          <div className="farm-info">
            <h3>{selectedFarm.name}</h3>
            <p><strong>Location:</strong> {selectedFarm.location}</p>
            <p><strong>Area:</strong> {selectedFarm.area}</p>
            <p><strong>Crop:</strong> {selectedFarm.crop}</p>
            <p><strong>Status:</strong> {selectedFarm.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmAtlas;

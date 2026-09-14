import { useEffect, useState } from "react";
import FarmerNavbar from "./farmerNavbar";
import "./farmer.css";
import { Link } from "react-router-dom";

function Farmer() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const savedCrops = JSON.parse(localStorage.getItem("crops")) || [];
    setCrops(savedCrops);
  }, []);

  const totalCrops = crops.length;

  const recentCrops = crops.slice(-3).reverse();

  return (
    <div className="farmer-container">
      <FarmerNavbar />

      <section className="farmer-welcome">
        <h1>Welcome, Farmer!</h1>
        <p>Here's a quick overview of your farm activity.</p>
      </section>

      <section className="farmer-stats">
        <div className="stat-card">
          <h2>{totalCrops}</h2>
          <p>Total Crops</p>
        </div>

        <div className="stat-card">
          <h2>{crops.length}</h2>
          <p>Active Crops</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <p>Harvested Crops</p>
        </div>
      </section>

      <section className="farmer-recent-crops">
        <div className="recent-crops-header">
          <h2>Recent Crops</h2>

          <Link to="/add-crop" className="add-crop-btn">
            + Add Crop
          </Link>
        </div>

        {recentCrops.length === 0 ? (
          <p className="no-crops">No crops added yet.</p>
        ) : (
          <div className="crop-list">
            {recentCrops.map((crop) => (
              <div className="crop-card" key={crop.id}>
                <span className="crop-name">{crop.name}</span>

                <span className="crop-status growing">
                  {crop.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Farmer;
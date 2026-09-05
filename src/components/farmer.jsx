
import { Link } from "react-router-dom";
import FarmerNavbar from "./farmerNavbar";
import "./farmer.css";

function Farmer() {
  // Dummy crop data for now
  const recentCrops = [
    { id: 1, name: "Wheat", status: "Growing" },
    { id: 2, name: "Rice", status: "Harvested" },
    { id: 3, name: "Sugarcane", status: "Growing" },
  ];

  return (
    <div className="farmer-container">

      {/* Farmer Navbar */}
      <FarmerNavbar />

      {/* Welcome Section */}
      <section className="farmer-welcome">
        <h1>Welcome, Farmer!</h1>
        <p>Here's a quick overview of your farm activity.</p>

        <Link to="/profile">
          <button className="profile-btn">My Profile</button>
        </Link>
      </section>

      {/* Stats Section */}
      <section className="farmer-stats">

        <div className="stat-card">
          <h2>3</h2>
          <p>Total Crops</p>
        </div>

        <div className="stat-card">
          <h2>2</h2>
          <p>Active Crops</p>
        </div>

        <div className="stat-card">
          <h2>1</h2>
          <p>Harvested Crops</p>
        </div>

      </section>

      {/* Recent Crops Section */}
      <section className="farmer-recent-crops">

        <div className="recent-crops-header">
          <h2>Recent Crops</h2>
          <button className="add-crop-btn">+ Add Crop</button>
        </div>

        <div className="crop-list">

          {recentCrops.map((crop) => (
            <div className="crop-card" key={crop.id}>

              <span className="crop-name">
                {crop.name}
              </span>

              <span
                className={`crop-status ${
                  crop.status === "Growing" ? "growing" : "harvested"
                }`}
              >
                {crop.status}
              </span>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Farmer;

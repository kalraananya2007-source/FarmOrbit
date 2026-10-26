
import { useEffect, useState } from "react";
import FarmerNavbar from "./farmerNavbar";
import "./farmer.css";
import { Link } from "react-router-dom";

function Farmer() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/crops",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...(token
                ? { Authorization: `Bearer ${token}` }
                : {}),
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Unable to load crops (${response.status}).`
          );
        }

        const data = await response.json();

        // Supports either a plain array or a common API response object.
        const cropList = Array.isArray(data)
          ? data
          : Array.isArray(data.crops)
          ? data.crops
          : Array.isArray(data.data)
          ? data.data
          : [];

        setCrops(cropList);
      } catch (err) {
        console.error("Error fetching crops:", err);
        setError(err.message || "Unable to load crops.");
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  const totalCrops = crops.length;

  const growingCrops = crops.filter(
    (crop) => crop.status !== "Harvested"
  ).length;

  const harvestedCrops = crops.filter(
    (crop) => crop.status === "Harvested"
  ).length;

  const recentCrops = [...crops]
    .sort((a, b) => {
      const dateA = new Date(
        a.createdAt || a.plantingDate || 0
      ).getTime();

      const dateB = new Date(
        b.createdAt || b.plantingDate || 0
      ).getTime();

      return dateB - dateA;
    })
    .slice(0, 4);

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString();
  };

  return (
    <div className="farmer-container">
      <FarmerNavbar />

      {/* Welcome Section */}
      <section className="farmer-welcome">
        <div className="welcome-content">
          <h1>Welcome back, Farmer! 👨‍🌾</h1>
          <p>
            Manage your farm activities and keep track of your crops.
          </p>
        </div>

        <Link to="/add-crop" className="dashboard-add-btn">
          Add New Crop
        </Link>
      </section>

      {/* Farmer Summary */}
      <section className="farmer-summary">
        <div className="summary-content">
          <div className="farmer-avatar">👨‍🌾</div>

          <div className="farmer-info">
            <h2>Farmer</h2>
            <span>Farmer Account</span>
          </div>
        </div>

        <Link to="/farmer/profile" className="profile-link">
          View Profile →
        </Link>
      </section>

      {/* Statistics */}
      <section className="farmer-stats">
        <div className="stat-card">
          <div className="stat-icon">🌱</div>
          <div>
            <h2>{loading ? "..." : totalCrops}</h2>
            <p>Total Crops</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🌿</div>
          <div>
            <h2>{loading ? "..." : growingCrops}</h2>
            <p>Growing Crops</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🌾</div>
          <div>
            <h2>{loading ? "..." : harvestedCrops}</h2>
            <p>Harvested Crops</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div>
            <h2>
              {loading
                ? "..."
                : totalCrops > 0
                ? "Active"
                : "Not Active"}
            </h2>
            <p>Farm Activity</p>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="dashboard-grid">
        {/* Recent Crops */}
        <div className="farmer-recent-crops">
          <div className="recent-crops-header">
            <div>
              <h2>Recent Crops</h2>
              <p>Your latest crop activities</p>
            </div>

            <Link to="/my-crops" className="view-all-btn">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="dashboard-no-crops">
              <p>Loading your crops...</p>
            </div>
          ) : error ? (
            <div className="dashboard-no-crops">
              <h3>Could not load crops</h3>
              <p>{error}</p>
              <p>
                Please check that your backend and MongoDB are running.
              </p>
            </div>
          ) : recentCrops.length === 0 ? (
            <div className="dashboard-no-crops">
              <div className="dashboard-empty-icon">🌱</div>

              <h3>No crops added yet</h3>

              <p>
                Start managing your farm by adding your first crop.
              </p>

              <Link
                to="/add-crop"
                className="dashboard-empty-btn"
              >
                Add Your First Crop
              </Link>
            </div>
          ) : (
            <div className="dashboard-crop-list">
              {recentCrops.map((crop) => (
                <div
                  className="dashboard-crop-card"
                  key={crop._id || crop.id}
                >
                  <div className="dashboard-crop-info">
                    <div className="dashboard-crop-icon">
                      🌱
                    </div>

                    <div className="dashboard-crop-details">
                      <h3>{crop.name}</h3>

                      <div className="dashboard-crop-meta">
                        <span>
                          🌾 {crop.type || "Crop"}
                        </span>

                        <span>
                          📍 {crop.location || "Field"}
                        </span>
                      </div>

                      <div className="dashboard-crop-date">
                        📅 Planted:{" "}
                        {formatDate(crop.plantingDate)}
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-crop-right">
                    <span
                      className={`dashboard-crop-status ${
                        crop.status === "Harvested"
                          ? "dashboard-harvested"
                          : "dashboard-growing"
                      }`}
                    >
                      {crop.status || "Growing"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <p>Access your frequently used features</p>

          <Link to="/add-crop" className="quick-action-card">
            <div className="quick-icon">➕</div>
            <div className="quick-action-content">
              <h3>Add Crop</h3>
              <span>Add a new crop to your farm</span>
            </div>
            <b>→</b>
          </Link>

          <Link to="/my-crops" className="quick-action-card">
            <div className="quick-icon">🌾</div>
            <div className="quick-action-content">
              <h3>My Crops</h3>
              <span>View and manage your crops</span>
            </div>
            <b>→</b>
          </Link>

          <Link to="/my-farms" className="quick-action-card">
            <div className="quick-icon">📍</div>
            <div className="quick-action-content">
              <h3>My Farms</h3>
              <span>View and manage your farms</span>
            </div>
            <b>→</b>
          </Link>

          <Link
            to="/farmer/profile"
            className="quick-action-card"
          >
            <div className="quick-icon">👤</div>
            <div className="quick-action-content">
              <h3>My Profile</h3>
              <span>Manage your farmer profile</span>
            </div>
            <b>→</b>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Farmer;

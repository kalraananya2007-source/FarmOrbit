
import { Link } from "react-router-dom";
import "./FarmerNavbar.css";

function FarmerNavbar() {
  return (
    <nav className="farmer-navbar">

      <h2>FarmOrbit</h2>

      <div className="farmer-nav-links">

        <Link to="/farmer">
          My Dashboard
        </Link>

        <Link to="/add-crop">
          Add New Crop
        </Link>

        <Link to="/my-crops">
          My Crops
        </Link>

        <Link to="/profile">
          Profile
        </Link>

      </div>

    </nav>
  );
}

export default FarmerNavbar;

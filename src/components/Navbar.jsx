import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-logo">
          🌱 FarmOrbit
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </div>

        <ul className={menuOpen ? 'navbar-links active' : 'navbar-links'}>

          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/farmer" onClick={() => setMenuOpen(false)}>
              Farmer Module
            </Link>
          </li>

          <li>
            <Link to="/weather" onClick={() => setMenuOpen(false)}>
              Weather
            </Link>
          </li>

          <li>
            <Link to="/marketplace" onClick={() => setMenuOpen(false)}>
              Marketplace
            </Link>
          </li>

          <li className="navbar-buttons">

            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="btn btn-outline">
                Login
              </button>
            </Link>

            <Link to="/register" onClick={() => setMenuOpen(false)}>
              <button className="btn btn-primary">
                Register
              </button>
            </Link>

          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
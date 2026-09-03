import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  // menuOpen controls whether mobile menu is visible or not
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          🌱 FarmOrbit
        </Link>

        {/* Hamburger icon - only visible on mobile */}
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </div>

        {/* Navigation Links */}
        <ul
          className={
            menuOpen ? 'navbar-links active' : 'navbar-links'
          }
        >
          {/* Home */}
          <li>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>

          {/* Farmer Module */}
          <li>
            <Link
              to="/farmer"
              onClick={() => setMenuOpen(false)}
            >
              Farmer Module
            </Link>
          </li>

          {/* Weather */}
          <li>
            <Link
              to="/weather"
              onClick={() => setMenuOpen(false)}
            >
              Weather
            </Link>
          </li>

          {/* Marketplace */}
          <li>
            <Link
              to="/marketplace"
              onClick={() => setMenuOpen(false)}
            >
              Marketplace
            </Link>
          </li>

          {/* Login & Register */}
          <li className="navbar-buttons">
            <Link
              to="/login"
              className="btn btn-outline"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-primary"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;
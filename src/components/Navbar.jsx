import { useState } from 'react';
import './Navbar.css';

function Navbar({ onLoginClick }) {

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
            <button onClick={() => setMenuOpen(false)}>
              Home
            </button>
          </li>

          <li>
            <button onClick={() => setMenuOpen(false)}>
              Farmer Module
            </button>
          </li>

          <li>
            <button onClick={() => setMenuOpen(false)}>
              Marketplace
            </button>
          </li>

          <li className="navbar-buttons">

            <button
              onClick={onLoginClick}
              className="btn btn-outline"
            >
              Login
            </button>

            <button className="btn btn-primary">
              Register
            </button>

          </li>

        </ul>

      </div>
    </nav>
  );
}

export default Navbar;
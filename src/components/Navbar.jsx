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
        <Link to="/" className="navbar-logo">
          🌱 FarmOrbit
        </Link>

        {/* Hamburger icon - only visible on mobile */}
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </div>

        <ul className={menuOpen ? 'navbar-links active' : 'navbar-links'}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/farmer" onClick={() => setMenuOpen(false)}>Farmer Module</Link></li>
          <li><Link to="/marketplace" onClick={() => setMenuOpen(false)}>Marketplace</Link></li>
          <li className="navbar-buttons">
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

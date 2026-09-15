
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { useLanguage } from "../Languagecontext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="pa">ਪੰਜਾਬੀ</option>
        </select>

        <Link to="/" className="navbar-logo">
          🌱 FarmOrbit
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </div>

        <ul className={menuOpen ? 'navbar-links active' : 'navbar-links'}>

          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              {t("home")}
            </Link>
          </li>

          <li>
            <Link to="/farmer" onClick={() => setMenuOpen(false)}>
              {t("farmer")}
            </Link>
          </li>

          <li>
            <NavLink
              to="/weather"
              className="module-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {t("weather")}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/market-price"
              className="module-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {t("marketPrice")}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/crop-recommendation"
              className="module-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {t("cropInformation")}
            </NavLink>
          </li>

          <li>
            <Link
              to="/my-crops"
              onClick={() => setMenuOpen(false)}
            >
              {t("myCrops")}
            </Link>
          </li>

          <li className="navbar-buttons">

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              <button className="btn btn-outline">
                {t("login")}
              </button>
            </Link>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
            >
              <button className="btn btn-primary">
                {t("register")}
              </button>
            </Link>

          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;


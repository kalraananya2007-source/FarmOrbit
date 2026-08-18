import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>🌱 FarmOrbit</h3>
          <p>
            FarmOrbit is a platform built to help farmers manage their crops,
            connect with buyers, and get the right information at the right time.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/farmer">Farmer Module</Link></li>
            <li><Link to="/marketplace">Marketplace</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div className="footer-team">
          <h4>Project Info</h4>
          <p>Semester Project - FarmOrbit</p>
          <p>Front End Engineering-II</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FarmOrbit. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

import { Link } from 'react-router-dom';
import './Home.css';

// List of features shown as simple cards on the home page
const features = [
  {
    icon: '🌾',
    title: 'Crop Management',
    desc: 'Farmers can track their crops, sowing dates and expected harvest time.',
  },
  {
    icon: '🛒',
    title: 'Marketplace',
    desc: 'Connect directly with buyers and sell produce at fair prices.',
  },
  {
    icon: '☀️',
    title: 'Weather Updates',
    desc: 'Get simple weather information to plan farming activities better.',
  },
  {
    icon: '👨‍🌾',
    title: 'Farmer Community',
    desc: 'A space for farmers to ask questions and share their experience.',
  },
];

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to FarmOrbit</h1>
          <p>
            FarmOrbit is a simple platform that helps farmers manage their
            farming activities and connect with the right people, all in
            one place.
          </p>
          <Link to="/register" className="btn btn-primary hero-btn">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">What FarmOrbit Offers</h2>
        <p className="section-subtitle">
          Some of the main features planned for the FarmOrbit platform.
        </p>

        <div className="feature-grid">
          {features.map((item) => (
            <div className="feature-card" key={item.title}>
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About / Problem Section */}
      <section className="about">
        <h2 className="section-title">Why FarmOrbit?</h2>
        <p className="about-text">
          Many farmers face problems like lack of proper crop information,
          difficulty finding fair-price buyers, and limited access to
          weather updates. FarmOrbit aims to solve these problems by
          bringing all these services together on one easy-to-use platform.
        </p>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to explore FarmOrbit?</h2>
        <p>Join us and be a part of a smarter farming community.</p>
        <Link to="/register" className="btn btn-primary">
          Join Now
        </Link>
      </section>
    </div>
  );
}

export default Home;

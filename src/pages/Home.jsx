
import './Home.css';

import cropImg from '../assets/crop.jpg';
import marketplaceImg from '../assets/marketplace.jpg';
import weatherImg from '../assets/weather.jpg';
import communityImg from '../assets/community.jpg';

// List of features shown as simple cards on the home page
const features = [
  {
    image: cropImg,
    title: 'Crop Management',
    desc: 'Farmers can track their crops, sowing dates and expected harvest time.',
  },

  {
    image: marketplaceImg,
    title: 'Marketplace',
    desc: 'Connect directly with buyers and sell produce at fair prices.',
  },

  {
    image: weatherImg,
    title: 'Weather Updates',
    desc: 'Get simple weather information to plan farming activities better.',
  },

  {
    image: communityImg,
    title: 'Farmer Community',
    desc: 'A space for farmers to ask questions and share their experience.',
  },
];

function Home({ onFarmerClick }) {
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

          <button
            className="btn btn-primary hero-btn"
            onClick={onFarmerClick}
          >
            Get Started
          </button>
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
            <div
              className="feature-card"
              key={item.title}
              onClick={
                item.title === 'Crop Management'
                  ? onFarmerClick
                  : undefined
              }
              style={
                item.title === 'Crop Management'
                  ? { cursor: 'pointer' }
                  : {}
              }
            >
              <div className="feature-image">
                <img src={item.image} alt={item.title} />
              </div>

              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
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

        <p>
          Join us and be a part of a smarter farming community.
        </p>

        <button
          className="btn btn-primary"
          onClick={onFarmerClick}
        >
          Join Now
        </button>
      </section>

    </div>
  );
}

export default Home;


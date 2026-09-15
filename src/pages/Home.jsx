
import './Home.css';

import { Link, useNavigate } from 'react-router-dom';

import cropImg from '../assets/crop.jpg';
import marketplaceImg from '../assets/marketplace.jpg';
import weatherImg from '../assets/weather.jpg';
import communityImg from '../assets/community.jpg';

import { useLanguage } from "../Languagecontext";

// List of features shown as simple cards on the home page
const features = [
  {
    image: cropImg,
    title: 'Crop Management',
    titleKey: 'cropManagement',
    descKey: 'cropManagementText',
    link: '/crop-recommendation',
  },
  {
    image: marketplaceImg,
    title: 'Marketplace',
    titleKey: 'marketplace',
    descKey: 'marketplaceText',
    link: '/market-price',
  },
  {
    image: weatherImg,
    title: 'Weather Updates',
    titleKey: 'weatherUpdates',
    descKey: 'weatherText',
    link: '/weather',
  },
  {
    image: communityImg,
    title: 'Farmer Community',
    titleKey: 'farmerCommunity',
    descKey: 'farmerCommunityText',
    link: '/farmer',
  },
];

function Home({ onFarmerClick }) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            {t("welcome")}
          </h1>

          <p>
            {t("homeDescription")}
          </p>

          <button
            className="btn btn-primary hero-btn"
            onClick={() => navigate("/register")}
          >
            {t("getStarted")}
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">
          {t("whatWeOffer")}
        </h2>

        <p className="section-subtitle">
          {t("featuresSubtitle")}
        </p>

        <div className="feature-grid">
          {features.map((item) => (
            <Link
              to={item.link}
              className="feature-card"
              key={item.title}
            >
              <div className="feature-image">
                <img
                  src={item.image}
                  alt={t(item.titleKey)}
                />
              </div>

              <h3>
                {t(item.titleKey)}
              </h3>

              <p>
                {t(item.descKey)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2 className="section-title">
          {t("whyFarmOrbit")}
        </h2>

        <p className="about-text">
          {t("aboutFarmOrbit")}
        </p>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>
          {t("readyToExplore")}
        </h2>

        <p>
          {t("joinCommunity")}
        </p>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/register")}
        >
          {t("joinNow")}
        </button>
      </section>

    </div>
  );
}

export default Home;


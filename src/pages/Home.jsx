import './Home.css';

import { Link, useNavigate } from 'react-router-dom';

import cropImg from '../assets/crop.jpg';
import marketplaceImg from '../assets/marketplace.jpg';
import weatherImg from '../assets/weather.jpg';
import communityImg from '../assets/community.jpg';

import { useLanguage } from "../Languagecontext";

// Features shown on the home page
const features = [
  {
    image: cropImg,
    titleKey: 'cropManagement',
    descKey: 'cropManagementText',
    link: '/crop-recommendation',
    
  },
  {
    image: marketplaceImg,
    titleKey: 'marketplace',
    descKey: 'marketplaceText',
    link: '/market-price',
    
  },
  {
    image: weatherImg,
    titleKey: 'weatherUpdates',
    descKey: 'weatherText',
    link: '/weather',
    
  },
  {
    image: communityImg,
    titleKey: 'farmerCommunity',
    descKey: 'farmerCommunityText',
    link: '/farmer',
    
  },
];

function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* ================= HERO SECTION ================= */}
     {/* Hero Section */}
<section className="hero">
  {/* Animated background elements */}
  <div className="hero-sun"></div>

  <div className="hero-cloud hero-cloud-1"></div>
  <div className="hero-cloud hero-cloud-2"></div>

  <div className="hero-particles">
    <span>🌱</span>
    <span>🌿</span>
    <span>🍃</span>
    <span>🌱</span>
    <span>🍃</span>
    <span>🌿</span>
  </div>

  <div className="hero-content">
    <div className="hero-badge">
      🌾 Smart Farming • Better Future
    </div>

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
      <span>{t("getStarted")}</span>
      <span className="hero-arrow">→</span>
    </button>
  </div>

  {/* Decorative field waves */}
  <div className="hero-field hero-field-back"></div>
  <div className="hero-field hero-field-front"></div>
</section>
      {/* ================= FEATURES SECTION ================= */}
      <section className="features">

        <div className="section-heading">
          

          <h2 className="section-title">
            {t("whatWeOffer")}
          </h2>

          <p className="section-subtitle">
            {t("featuresSubtitle")}
          </p>
        </div>

        <div className="feature-grid">

          {features.map((item, index) => (
            <Link
              to={item.link}
              className="feature-card"
              key={item.titleKey}
              style={{ "--card-index": index }}
            >

              <div className="feature-image">
                <img
                  src={item.image}
                  alt={t(item.titleKey)}
                />

                <div className="feature-icon">
                  {item.icon}
                </div>
              </div>

              <div className="feature-card-content">

                <h3>
                  {t(item.titleKey)}
                </h3>

                <p>
                  {t(item.descKey)}
                </p>

                <span className="feature-link">
                  Explore <span>→</span>
                </span>

              </div>

            </Link>
          ))}

        </div>

      </section>


      {/* ================= ABOUT SECTION ================= */}
      <section className="about">

        <div className="about-decoration about-decoration-one"></div>
        <div className="about-decoration about-decoration-two"></div>

        <div className="about-content">

          <span className="section-label">
            ABOUT FARMORBIT
          </span>

          <h2 className="section-title">
            {t("whyFarmOrbit")}
          </h2>

          <p className="about-text">
            {t("aboutFarmOrbit")}
          </p>

          <div className="about-stats">

            <div className="stat">
              <span className="stat-icon">🌱</span>
              <strong>Smart</strong>
              <span>Farming</span>
            </div>

            <div className="stat">
              <span className="stat-icon">🌦️</span>
              <strong>Real-time</strong>
              <span>Information</span>
            </div>

            <div className="stat">
              <span className="stat-icon">🤝</span>
              <strong>Connected</strong>
              <span>Community</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA SECTION ================= */}
      <section className="cta">

        <div className="cta-glow cta-glow-one"></div>
        <div className="cta-glow cta-glow-two"></div>

        <div className="cta-content">

          <div className="cta-icon">
            🌱
          </div>

          <h2>
            {t("readyToExplore")}
          </h2>

          <p>
            {t("joinCommunity")}
          </p>

          <button
            className="btn btn-primary cta-btn"
            onClick={() => navigate("/register")}
          >
            <span>{t("joinNow")}</span>
            <span className="hero-arrow">→</span>
          </button>

        </div>

      </section>

    </div>
  );
}

export default Home;
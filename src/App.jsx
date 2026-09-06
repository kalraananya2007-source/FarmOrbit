import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import ComingSoon from './pages/ComingSoon';

import Farmer from './components/farmer';
import Weather from './weather/weather';
import Profile from './components/profile.jsx';
import Login from './pages/login';

import CropRecommendations from './weather/croprec';
import MarketPrice from './weather/marketprice';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Farmer Module */}
        <Route path="/farmer" element={<Farmer />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />

        {/* Weather Module */}
        <Route path="/weather" element={<Weather />} />

        {/* Crop Recommendation */}
        <Route
          path="/crop-recommendation"
          element={<CropRecommendations />}
        />

        {/* Market Price */}
        <Route
          path="/market-price"
          element={<MarketPrice />}
        />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        {/* Marketplace - Coming Soon */}
        <Route
          path="/marketplace"
          element={
            <ComingSoon
              title="Marketplace"
              message="Marketplace feature is coming soon."
            />
          }
        />

        <Route path="/register" element={<Register />} />

        {/* Any wrong URL */}
        <Route
          path="*"
          element={
            <ComingSoon
              title="Page Not Found"
              message="The page you are looking for does not exist."
            />
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
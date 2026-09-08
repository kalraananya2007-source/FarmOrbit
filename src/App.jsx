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

import AddCrop from './pages/AddCrop';
import MyCrop from './pages/MyCrop';

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
        <Route path="/market-price" element={<MarketPrice />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Add Crop */}
        <Route path="/add-crop" element={<AddCrop />} />

        {/* My Crops */}
        <Route path="/my-crops" element={<MyCrop />} />

        {/* Coming Soon */}
        <Route path="/coming-soon" element={<ComingSoon />} />
      </Routes>

      <Weather />

      <Footer />
    </>
  );
}

export default App;
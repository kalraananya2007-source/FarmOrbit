import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import ComingSoon from './pages/ComingSoon';

import Farmer from './components/farmer';
import Weather from './weather/weather';
import Profile from './components/profile.jsx';
import Login from './pages/login';

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

        {/* Register - Coming Soon */}
        <Route
          path="/register"
          element={
            <ComingSoon
              title="Register"
              message="Registration feature is coming soon."
            />
          }
        />

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
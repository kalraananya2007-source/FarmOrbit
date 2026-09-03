import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import ComingSoon from './pages/ComingSoon';

import Farmer from './components/farmer';
import Weather from './weather/weather';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Farmer Module */}
        <Route path="/farmer" element={<Farmer />} />

        {/* Weather Module */}
        <Route path="/weather" element={<Weather />} />

        {/* Marketplace - Coming Soon for now */}
        <Route
          path="/marketplace"
          element={
            <ComingSoon
              title="Marketplace"
              message="Marketplace feature is coming soon."
            />
          }
        />

        {/* Login - Coming Soon */}
        <Route
          path="/login"
          element={
            <ComingSoon
              title="Login"
              message="Login feature is coming soon."
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
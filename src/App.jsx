import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Placeholder routes - teammates will replace these with real pages */}
        <Route path="/farmer" element={<ComingSoon pageName="Farmer Module" />} />
        <Route path="/marketplace" element={<ComingSoon pageName="Marketplace" />} />
        <Route path="/login" element={<ComingSoon pageName="Login" />} />
        <Route path="/register" element={<ComingSoon pageName="Register" />} />

        {/* 404 page for unknown routes */}
        <Route path="*" element={<ComingSoon pageName="Page Not Found" />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

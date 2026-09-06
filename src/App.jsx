import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Weather from './weather/weather'
import AddCrop from './pages/AddCrop';
import { Routes, Route } from 'react-router-dom';
import MyCrop from './pages/MyCrop';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-crop" element={<AddCrop />} />
        <Route path="/my-crops" element={<MyCrop />} />
      </Routes>
      <Weather/>
      <Footer />
    </>
  );
}

export default App;
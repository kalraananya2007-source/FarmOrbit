import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Weather from './weather/weather'
import AddCrop from './pages/AddCrop';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-crop" element={<AddCrop />} />
      </Routes>
      <Weather/>
      <Footer />
    </>
  );
}

export default App;
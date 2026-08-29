import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Weather from './weather/weather'

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Weather/>
      <Footer />
    </>
  );
}

export default App;
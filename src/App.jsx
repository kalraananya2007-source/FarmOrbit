import { useState } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Farmer from './components/farmer';
import Login from './pages/login';

function App() {

  const [showFarmer, setShowFarmer] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Navbar onLoginClick={() => setShowLogin(true)} />

      {showLogin ? (
        <Login onLoginSuccess={() => setShowLogin(false)} />
      ) : showFarmer ? (
        <Farmer />
      ) : (
        <Home onFarmerClick={() => setShowFarmer(true)} />
      )}

      <Footer />
    </>
  );
}

export default App;
import './index.css';
import Header from './components/Header';
import Home from './components/Home';
import Slider from './components/Slider';
import SlickSlider from './components/SlickSlider';
import Footer from './components/Footer';

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Ninos from './pages/Ninos';
import Ninas from './pages/Ninas';

function App() {
  const [cartItems, setCartItems] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        cartItems={cartItems}
        addToCart={addToCart}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />

      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<><Slider /><SlickSlider /><Home /></>} />
          <Route path="/pages/Ninos" element={<Ninos />} />
          <Route path="/pages/Ninas" element={<Ninas />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

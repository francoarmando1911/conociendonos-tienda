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

      {/* Menú de categorías */}
      {isMenuOpen && (
        <nav className="bg-white shadow-lg p-4">
          <ul>
            <li>
              <a href="/pages/Ninos" className="block py-2 text-gray-800 hover:text-blue-500">Niños</a>
            </li>
            <li>
              <a href="/pages/Ninas" className="block py-2 text-gray-800 hover:text-blue-500">Niñas</a>
            </li>
          </ul>
        </nav>
      )}

      <main className="flex-grow p-4 mt-[210px]">
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

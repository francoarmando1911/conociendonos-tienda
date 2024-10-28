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
import Bebes from './pages/bebes';
import Login from './pages/login'; 

function App() {
  const [cartItems, setCartItems] = useState(0);
  //const [isMenuOpen] = useState(false);

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItems={cartItems} addToCart={addToCart} />

      <main className="flex-grow p-4 mt-[10px]">
        <Routes>
          <Route path="/" element={<><Slider /><SlickSlider /><Home /></>} />
          <Route path="/ninos" element={<Ninos />} />
          <Route path="/ninas" element={<Ninas />} />
          <Route path="/bebes" element={<Bebes />} />
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;


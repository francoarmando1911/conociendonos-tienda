import './index.css';
import Header from './components/Header';
import Home from './components/Home';
import Slider from './components/Slider';
import SlickSlider from './components/SlickSlider';
import Footer from './components/Footer';
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Ninos from './pages/Ninos';
import Ninas from './pages/Ninas';
import Bebes from './pages/bebes';
import Login from './pages/login';
import Register from './pages/register'; 
import { useCart } from './hooks/useCart';

interface AppProps { }

const App: React.FC<AppProps> = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState(0);
  //const [isMenuOpen] = useState(false);

  let type = '';
  if (location.pathname === '/bebes') {
    type = 'bebes';
  } else if (location.pathname === '/ninos') {
    type = 'ninos';
  } else if (location.pathname === '/ninas') {
    type = 'ninas';
  }

  const { cart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal } = useCart(type);

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
        showCart={true}
      />

     
      <main className="flex-grow p-4 mt-[10px]">
        <Routes>
          <Route path="/" element={<><Slider /><SlickSlider /><Home /></>} />
          <Route path="/ninos" element={<Ninos />} />
          <Route path="/ninas" element={<Ninas />} />
          <Route path="/bebes" element={<Bebes />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;


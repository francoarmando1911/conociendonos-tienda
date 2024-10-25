import { useState } from "react";
import { Link } from "react-router-dom"; 
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";

interface HeaderProps {
    cartItems: number;
    addToCart: () => void;
    isMenuOpen: boolean;
    toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItems, addToCart, isMenuOpen, toggleMenu }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#fcd3e1] via-[#b5f8fe] to-[#d6ffdc] p-2 shadow-md">
            <div className="container mx-auto flex flex-col items-center">

                <Link to="/" className="flex flex-col items-center text-center mb-2">
                    <img src="/logo.png" alt="Logo" className="h-10" />
                    <h1 className="text-3xl font-bold text-gray-800 font-nunito">Conociendonos</h1>
                </Link>

                {/* Barra de Búsqueda */}
                <div className="flex items-center w-full max-w-md mx-2 mb-2 border-2 border-gray-400 rounded-3xl overflow-hidden">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="w-full p-2 border-none focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button className="p-2  text-black hover:bg-blue-600">
                        <FaSearch />
                    </button>
                </div>


                {/* Iconos de acción */}
                <div className="flex items-center pt-3 mb-2"> 
                    {/* Botón de menú */}
                    <button
                        onClick={toggleMenu}
                        className="text-gray-800 hover:text-blue-500 transition duration-300"
                        aria-expanded={isMenuOpen}
                        aria-haspopup="true"
                    >
                        <BsList className="text-2xl mx-2" />
                    </button>

                    {/* Botón de cuenta */}
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="text-gray-800 hover:text-blue-500 transition duration-300"
                            aria-expanded={isDropdownOpen}
                            aria-haspopup="true"
                        >
                            <VscAccount className="text-2xl mx-2" />
                        </button>

                        {/* Ventana emergente (dropdown) */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg z-60">
                                <ul className="py-2">
                                    <li>
                                        <Link to="/perfil" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Perfil</Link>
                                    </li>
                                    <li>
                                        <Link to="/configuracion" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Configuración</Link>
                                    </li>
                                    <li>
                                        <Link to="/salir" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Salir</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Botón de carrito */}
                    <div className="relative mx-2">
                        <button
                            onClick={addToCart}
                            className="text-2xl text-gray-800 hover:text-blue-500 transition duration-300 focus:outline-none"
                            aria-label="Shopping Cart"
                        >
                            <FaShoppingCart />
                        </button>
                        {cartItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-bounce">
                                {cartItems}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

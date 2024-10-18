import { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

interface HeaderProps {
    cartItems: number;
    addToCart: () => void;
    isMenuOpen: boolean;
    toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItems, addToCart, isMenuOpen, toggleMenu }) => {
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate(); // Inicializar el hook useNavigate

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Función para manejar la navegación
    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <header className="bg-gradient-to-r from-[#fcd3e1] via-[#b5f8fe] to-[#d6ffdc] p-2 shadow-md">
            <div className="container mx-auto flex flex-col items-center">
                <div className="flex flex-col items-center mb-2">
                    <img src="/logo.png" alt="Logo" className="h-10 w-auto mb-1" />
                    <h1 className="text-3xl font-bold font-nunito text-[#247b7b]">Conociendonos</h1>
                </div>

                {!isMobile && (
                    <div className="flex-grow max-w-md mx-4 mb-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                className="w-full py-2 px-4 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
                            />
                            <button
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition duration-300"
                                aria-label="Search"
                            >
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex justify-between w-full max-w-md mx-4">
                    <button
                        onClick={toggleMenu}
                        className="flex items-center ml-2 text-gray-800 hover:text-blue-500 transition duration-300"
                        aria-expanded={isMenuOpen}
                        aria-haspopup="true"
                    >
                        <BsList className="text-2xl" />
                    </button>

                    <div className="relative mr-2">
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

                {isMenuOpen && (
                    <ul className="absolute z-10 mt-2 py-2 w-48 bg-white rounded-md shadow-xl">
                        <li><button onClick={() => handleNavigation("/pages/ninos")} className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">Niños</button></li>
                        <li><button onClick={() => handleNavigation("/pages/ninas")} className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">Niñas</button></li>
                        <li><button onClick={() => handleNavigation("/pages/bebes")} className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">Bebés</button></li>
                        <li><button onClick={() => handleNavigation("/pages/accesorios")} className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">Accesorios</button></li>
                    </ul>
                )}
            </div>
        </header>
    );
};

export default Header;

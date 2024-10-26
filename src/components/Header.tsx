import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import discountedProducts from "../data/descuentos";

interface HeaderProps {
    cartItems: number;
    addToCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItems, addToCart }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    const menuDropdownRef = useRef<HTMLDivElement>(null);
    const accountDropdownRef = useRef<HTMLDivElement>(null);
    const searchDropdownRef = useRef<HTMLDivElement>(null); // Nueva referencia para la barra de búsqueda

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setIsDropdownVisible(value.length > 0); // Muestra el dropdown solo si hay texto
    };

    const toggleMenuDropdown = () => {
        setIsMenuDropdownOpen(prev => !prev);
        setIsAccountDropdownOpen(false); // Cierra el dropdown de cuenta
    };

    const toggleAccountDropdown = () => {
        setIsAccountDropdownOpen(prev => !prev);
        setIsMenuDropdownOpen(false); // Cierra el dropdown de menú
    };

    const filteredProducts = discountedProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuDropdownRef.current &&
            !menuDropdownRef.current.contains(event.target as Node) &&
            accountDropdownRef.current &&
            !accountDropdownRef.current.contains(event.target as Node) &&
            searchDropdownRef.current && // Añadir la condición para el dropdown de búsqueda
            !searchDropdownRef.current.contains(event.target as Node)
        ) {
            setIsMenuDropdownOpen(false);
            setIsAccountDropdownOpen(false);
            setIsDropdownVisible(false); // Cerrar dropdown de búsqueda
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#fcd3e1] via-[#b5f8fe] to-[#d6ffdc] p-2 shadow-md">
            <div className="container mx-auto flex flex-col items-center">
                <Link to="/" className="flex flex-col items-center text-center mb-2">
                    <img src="/logo.png" alt="Logo" className="h-10" />
                    <h1 className="text-3xl font-bold text-gray-800 font-nunito">Conociéndonos</h1>
                </Link>

                {/* Barra de Búsqueda */}
                <div className="relative flex items-center w-full max-w-md mx-2 mb-2 border-2 border-gray-400 rounded-3xl overflow-hidden" ref={searchDropdownRef}>
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full p-2 border-none focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button className="p-2 text-black hover:bg-blue-600">
                        <FaSearch />
                    </button>
                </div>

                {/* Mostrar resultados de búsqueda */}
                {isDropdownVisible && ( // Cambiar la condición para mostrar el dropdown de búsqueda
                    <div className="absolute top-16 w-full max-w-md mx-auto bg-white shadow-lg rounded-md p-2 overflow-y-auto" style={{ maxHeight: "200px" }}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <div key={index} className="p-2 border-b last:border-none">
                                    <p className="text-gray-800">{product.title}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No se encontraron productos</p>
                        )}
                    </div>
                )}

                {/* Iconos de acción */}
                <div className="flex items-center pt-3 mb-2">
                    {/* Botón de menú */}
                    <div className="relative" ref={menuDropdownRef}>
                        <button
                            onClick={toggleMenuDropdown}
                            className="text-gray-800 hover:text-blue-500 transition duration-300"
                            aria-expanded={isMenuDropdownOpen}
                            aria-haspopup="true"
                        >
                            <BsList className="text-2xl mx-2" />
                        </button>

                        {isMenuDropdownOpen && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white shadow-lg z-60">
                                <ul className="py-2">
                                    <li>
                                        <Link to="/Ninos" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Niños</Link>
                                    </li>
                                    <li>
                                        <Link to="/Ninas" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Niñas</Link>
                                    </li>
                                    <li>
                                        <Link to="/Bebes" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Bebes</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Botón de cuenta */}
                    <div className="relative mx-2" ref={accountDropdownRef}>
                        <button
                            onClick={toggleAccountDropdown}
                            className="text-gray-800 hover:text-blue-500 transition duration-300"
                            aria-expanded={isAccountDropdownOpen}
                            aria-haspopup="true"
                        >
                            <VscAccount className="text-2xl mx-2" />
                        </button>

                        {/* Ventana emergente (dropdown) */}
                        {isAccountDropdownOpen && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white shadow-lg z-60">
                                <ul className="py-2">
                                    <li>
                                        <Link to="/register" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Registrarse</Link>
                                    </li>
                                    <li>
                                        <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Iniciar Sesion</Link>
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

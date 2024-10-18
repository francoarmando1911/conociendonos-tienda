import { Link } from "react-router-dom"; // Importar Link
import { useState, useEffect, useRef } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import discountedProducts from "../data/descuentos"; // Asegúrate de importar tus productos

interface HeaderProps {
    cartItems: number;
    addToCart: () => void;
    isMenuOpen: boolean;
    toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItems, addToCart, isMenuOpen, toggleMenu }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);
    const resultsRef = useRef<HTMLDivElement>(null); // Referencia para el contenedor de resultados

    // Manejar la búsqueda
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query) {
            const results = searchProducts(query);
            setFilteredProducts(results);
            setShowResults(results.length > 0); // Mostrar resultados solo si hay coincidencias
        } else {
            setShowResults(false); // Ocultar resultados si no hay búsqueda
        }
    };

    // Función para buscar productos
    const searchProducts = (query: string) => {
        const allProducts = [...discountedProducts]; // Agrega otras categorías si es necesario
        return allProducts.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
    };

    // Manejar clics fuera de la barra de búsqueda
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
                setShowResults(false); // Cerrar resultados si se hace clic fuera
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [resultsRef]);

    return (
        <>
            <header className="bg-gradient-to-r from-[#fcd3e1] via-[#b5f8fe] to-[#d6ffdc] p-2 shadow-md">
                <div className="container mx-auto flex flex-col items-center">
                    <div className="flex flex-col items-center mb-2">
                        <Link to="/"> {/* Envolver el logo en un Link */}
                            <img src="/logo.png" alt="Logo" className="h-10 w-auto mb-1" />
                        </Link>
                        <h1 className="text-3xl font-bold font-nunito text-[#247b7b]">Conociendonos</h1>
                    </div>

                    {/* Barra de búsqueda en mobile y desktop */}
                    <div className="flex-grow max-w-md mx-4 mb-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchQuery}
                                onChange={handleSearchChange}
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

                    {/* Barra de navegación */}
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
                </div>
            </header>

            {/* Resultados de búsqueda */}
            {showResults && (
                <div ref={resultsRef} className="absolute left-0 right-0 top-[68px] z-50 bg-white shadow-lg p-4">
                    <h2 className="text-lg font-bold mb-2">Resultados de búsqueda:</h2>
                    {filteredProducts.length > 0 ? (
                        <ul className="max-h-60 overflow-y-auto">
                            {filteredProducts.map(product => (
                                <li key={product.id} className="flex items-center mb-2">
                                    <img src={product.image} alt={product.title} className="h-10 w-10 mr-2" />
                                    <span>{product.title} - ${product.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No se encontraron resultados.</p>
                    )}
                </div>
            )}
        </>
    );
};

export default Header;

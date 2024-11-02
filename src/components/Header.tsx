import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import allProducts from "../data/allProducts";
import type { CartItem, Product } from "../types/types";

type HeaderProps = {
    cart: CartItem[];
    removeFromCart: (id: Product["id"]) => void;
    increaseQuantity: (id: Product["id"]) => void;
    decreaseQuantity: (id: Product["id"]) => void;
    clearCart: () => void;
    isEmpty: boolean;
    cartTotal: number;
    showCart: boolean;
    isCondimentosPage?: boolean;
    className?: string;
};

function Header({
    cart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    clearCart,
    showCart,
    className,
}: HeaderProps) {

    const [isCartVisible, setIsCartVisible] = useState(false);
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(
        () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
        [cart]
    );
    const toggleCartVisibility = () => {
        setIsCartVisible((prev) => !prev);
    };

    const [searchQuery, setSearchQuery] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    const menuDropdownRef = useRef<HTMLDivElement>(null);
    const accountDropdownRef = useRef<HTMLDivElement>(null);
    const searchDropdownRef = useRef<HTMLDivElement>(null);
    const cartDropdownRef = useRef<HTMLDivElement>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setIsDropdownVisible(value.length > 0); // Muestra el dropdown solo si hay texto
    };

    const toggleMenuDropdown = () => {
        setIsMenuDropdownOpen((prev) => !prev);
        setIsAccountDropdownOpen(false);
    };

    const toggleAccountDropdown = () => {
        setIsAccountDropdownOpen((prev) => !prev);
        setIsMenuDropdownOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuDropdownRef.current &&
            !menuDropdownRef.current.contains(event.target as Node) &&
            accountDropdownRef.current &&
            !accountDropdownRef.current.contains(event.target as Node) &&
            searchDropdownRef.current &&
            !searchDropdownRef.current.contains(event.target as Node) &&
            cartDropdownRef.current &&
            !cartDropdownRef.current.contains(event.target as Node)
        ) {
            setIsMenuDropdownOpen(false);
            setIsAccountDropdownOpen(false);
            setIsDropdownVisible(false);
            setIsCartVisible(false);
        }
    };

    const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="top-0 left-0 w-full z-50 bg-gradient-to-r from-[#fcd3e1] via-[#b5f8fe] to-[#d6ffdc] p-2 shadow-md">
            <div className="container mx-auto flex flex-col items-center">
                <Link to="/" className="flex flex-col items-center text-center mb-2">
                    <img src="/iconos/logo.png" alt="Logo" className="h-10" />
                    <h1 className="text-3xl font-bold text-gray-800 font-nunito">
                        Conociéndonos
                    </h1>
                </Link>

                {/* Barra de Búsqueda */}
                <div
                    className="relative flex items-center w-full max-w-md mx-2 mb-2 border-2 border-gray-400 rounded-3xl overflow-hidden"
                    ref={searchDropdownRef}
                >
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
                {isDropdownVisible && (
                    <div
                        className="absolute top-16 w-full max-w-md mx-auto bg-white shadow-lg rounded-md p-2 overflow-y-auto"
                        style={{ maxHeight: "200px" }}
                    >
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
                                        <Link
                                            to="/Ninos"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        >
                                            Niños
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/Ninas"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        >
                                            Niñas
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/bebes"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        >
                                            Bebes
                                        </Link>
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

                        {isAccountDropdownOpen && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white shadow-lg z-60">
                                <ul className="py-2">
                                    <li>
                                        <Link
                                            to="/register"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        >
                                            Registrarse
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/login"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        >
                                            Iniciar Sesión
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Botón de carrito */}
                    <div className="relative">
                        <button
                            className="text-gray-800 hover:text-blue-500 transition duration-300"
                            onClick={toggleCartVisibility}
                            aria-label="Mostrar carrito"
                        >
                            <FaShoppingCart className="text-2xl mx-2" />
                        </button>
                        {isCartVisible && (
                            <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md p-3 z-60">
                                {isEmpty ? (
                                    <p className="text-center">El carrito está vacío</p>
                                ) : (
                                    <>
                                        <table className="w-full">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((product) => (
                                                    <tr key={product.id}>
                                                        <td>
                                                            <img
                                                                src={product.image}
                                                                alt={product.title}
                                                                className="h-10 w-10 object-cover"
                                                            />
                                                        </td>
                                                        <td>{product.title}</td>
                                                        <td>${product.price.toFixed(2)}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>
                                                            <button
                                                                className="text-red-500"
                                                                onClick={() => decreaseQuantity(product.id)}
                                                            >
                                                                -
                                                            </button>
                                                            <button
                                                                className="text-green-500"
                                                                onClick={() => increaseQuantity(product.id)}
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                className="text-red-500"
                                                                onClick={() => removeFromCart(product.id)}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p className="text-right font-bold mt-2">
                                            Total: ${cartTotal.toFixed(2)}
                                        </p>
                                        <button
                                            className="w-full bg-red-500 text-white rounded-md mt-2"
                                            onClick={clearCart}
                                        >
                                            Vaciar Carrito
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}


export default Header;
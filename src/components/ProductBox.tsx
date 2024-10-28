import React, { useState } from "react";

interface ProductBoxProps {
    image: string;
    hoverImage: string;
    title: string;
    price: number;
    onClick: () => void;
}

const ProductBox: React.FC<ProductBoxProps> = ({ image, hoverImage, title, price, onClick }) => {
    const [currentImage, setCurrentImage] = useState(image);

    const handleMouseEnter = () => setCurrentImage(hoverImage);
    const handleMouseLeave = () => setCurrentImage(image);
    const handleTouchStart = () => setCurrentImage(hoverImage);
    const handleTouchEnd = () => setCurrentImage(image);

    return (
        <div
            className="border rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer min-h-72 overflow-hidden" 
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="button" // Mejora de accesibilidad
            tabIndex={0} // Mejora de accesibilidad
            onKeyDown={(e) => e.key === "Enter" && onClick()} // Navegación por teclado
        >
            <img
                src={currentImage}
                alt={title}
                className="w-full h-48 object-cover" // Aumenta la altura de la imagen
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-blue-500 font-bold mt-1">${price.toFixed(2)}</p>
            </div>

            <div className="flex justify-center mb-4">
                <button className="w-40 bg-[#f9c1d3] text-white py-2 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Agregar al carrito
                </button>

            </div>
            

        </div>
    );
};

export default ProductBox;


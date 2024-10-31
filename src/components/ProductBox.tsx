import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import type { Product } from "../types/types"; 
import allProducts from "../data/allProducts";

interface ProductBoxProps {
    image: string;
    hoverImage: string;
    title: string;
    price: number;
    product: Product; 
}

const ProductBox: React.FC<ProductBoxProps> = ({ image, hoverImage, title, price, product }) => {
    const [currentImage, setCurrentImage] = useState(image);
    const { addToCart } = useCart("bebes ninos ninas"); 

    const handleMouseEnter = () => setCurrentImage(hoverImage);
    const handleMouseLeave = () => setCurrentImage(image);
    const handleTouchStart = () => setCurrentImage(hoverImage);
    const handleTouchEnd = () => setCurrentImage(image);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            console.log(`Producto agregado: ${title}`); 
        } else {
            console.error(`Error al agregar al carrito: El producto '${title}' no está definido`);
        }
    };

    return (
        <div
            className="border rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer min-h-72 overflow-hidden"
            role="button" 
            tabIndex={0} 
            onKeyDown={(e) => e.key === "Enter" && handleAddToCart()} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <img
                src={currentImage}
                alt={title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-blue-500 font-bold mt-1">${price.toFixed(2)}</p>
            </div>

            <div className="flex justify-center mb-4">
                <button
                    className="w-40 bg-[#f9c1d3] text-white py-2 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleAddToCart} 
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
};

export default ProductBox;

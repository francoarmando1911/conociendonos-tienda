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
            className="border rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer h-72" // Ajuste de altura
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <img
                src={currentImage}
                alt={title}
                className="w-full h-48 object-cover " // Aumenta la altura de la imagen
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-blue-500 font-bold mt-1">${price}</p>
            </div>
            
        </div>
    );
};

export default ProductBox;

import React from 'react';
import ProductBox from './ProductBox';
import discountedProducts from '../data/descuentos';

const Home: React.FC = () => {
    const handleProductClick = (productId: number) => {
        // Redirigir a la página de compra del producto
        window.location.href = `/comprar/${productId}`;
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold font-nunito text-center mb-6 pt-2">Productos con Descuentos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {discountedProducts.map((product) => (
                    <ProductBox
                        key={product.id}
                        image={product.image}
                        hoverImage={product.hoverImage}
                        title={product.title}
                        price={product.price}
                        onClick={() => handleProductClick(product.id)}
                    />
                ))}
            </div>

        </div>

    );
};

export default Home;
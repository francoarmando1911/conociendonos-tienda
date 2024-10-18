import React from "react";
import ninos from "../data/ninos"
import ProductBox from "../components/ProductBox";

const Ninos: React.FC = () => {

    const handleProductClick = (ProductNinosId: number) => {
        window.location.href = `/comprar/${ProductNinosId}`
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold font-nunito text-center mb-6 pt-2">Productos para Nenes</h2>
            <p className="mb-4 text-center">Explora nuestra selección de productos especialmente diseñados para los más pequeños.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-3">
                {ninos.map((ProductNinos) => (
                    <ProductBox
                        key={ProductNinos.id}
                        image={ProductNinos.image}
                        hoverImage={ProductNinos.hoverImage}
                        title={ProductNinos.title}
                        price={ProductNinos.price}
                        onClick={() => handleProductClick(ProductNinos.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Ninos;

import ProductBox from "../components/ProductBox";
import ninas from "../data/ninas"

const Ninas: React.FC = () => {

    const handleProductClick = (ProductNinasId: number) => {
        window.location.href = `/comprar/${ProductNinasId}`
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold font-nunito text-center mb-6 pt-2">Productos para Nenas</h2>
            <p className="mb-4 text-center">Explora nuestra selección de productos especialmente diseñados para los más pequeños.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-3">
                {ninas.map((ProductNinas) =>
                    <ProductBox
                        key={ProductNinas.id}
                        image={ProductNinas.image}
                        hoverImage={ProductNinas.hoverImage}
                        title={ProductNinas.title}
                        price={ProductNinas.price}
                        onClick={() => handleProductClick(ProductNinas.id)}
                    />
                
                )}

            </div>

        </div>



    );
};

export default Ninas;
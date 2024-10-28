import ProductBox from "../components/ProductBox";
import ninas from "../data/bebes"

const Bebes: React.FC = () => {

    const handleProductClick = (ProductBebesId: number) => {
        window.location.href = `/comprar/${ProductBebesId}`
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold font-nunito text-center mb-6 pt-2">Productos para Bebes</h2>
            <p className="mb-4 text-center">Explora nuestra selección de productos especialmente diseñados para los más chiquitos.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-3">
                {ninas.map((ProductBebes) =>
                    <ProductBox
                        key={ProductBebes.id}
                        image={ProductBebes.image}
                        hoverImage={ProductBebes.hoverImage}
                        title={ProductBebes.title}
                        price={ProductBebes.price}
                        onClick={() => handleProductClick(ProductBebes.id)}
                    />

                )}

            </div>

        </div>

    );
};

export default Bebes;
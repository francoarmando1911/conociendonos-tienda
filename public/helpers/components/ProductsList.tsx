import Product from './Products';
import type { Product as ProductType } from "../types";
import { useCart } from '../hooks/useCart';

type ProductsListProps = {
    type: string;
};

const ProductsList: React.FC<ProductsListProps> = ({ type }) => {
    const { data, addToCart } = useCart(type);

    if (!data || data.length === 0) {
        return <div>No products available for this category.</div>;
    }

    return (
        <div className="row">
            {data.map((product: ProductType) => (
                <Product key={product.id} product={product} addToCart={addToCart} />
            ))}
        </div>
    );
};

export default ProductsList;

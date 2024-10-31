import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/apiService';
import ProductBox from './ProductBox'; // Asegúrate de que has importado los componentes apropiados.  
import { useCart } from '../hooks/useCart';
import type { Product } from '../types/types';

type ProductsListProps = {
    type: string;
};

const ProductsList: React.FC<ProductsListProps> = ({ type }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { data, addToCart } = useCart(type);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (err) {
                setError('Error al cargar productos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;
    if (products.length === 0) {
        return <div>No hay productos disponibles para esta categoría.</div>;
    }

    return (
        <div className="row">
            {products.map((product: Product) => (
                <ProductBox key={product.id} product={product} addToCart={addToCart} />
            ))}
        </div>
    );
};

export default ProductsList;
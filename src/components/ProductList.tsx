//CONFIG BASE DE DATOS

import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/apiService';
import ProductBox from './ProductBox';

const ProductList = () => {
    const [products, setProducts] = useState<any[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts();
                setProducts(data);
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
                <ProductBox
                    key={product.id}
                    image={product.image}
                    hoverImage={product.hoverImage}
                    title={product.title}
                    price={product.price}
                    onClick={() => console.log(`Selected product: ${product.title}`)}
                />
            ))}
        </div>
    );
};

export default ProductList; 

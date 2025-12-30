
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { Product } from '../types';
import Spinner from '../components/common/Spinner';
import { useCart } from '../hooks/useCart';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            try {
                const productData = await getProductById(id);
                if (productData) {
                    setProduct(productData);
                }
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
        }
    };
    
    if (loading) return <Spinner />;
    if (!product) return <p className="text-center py-20 text-xl">Producto no encontrado.</p>;

    return (
        <div className="container mx-auto px-6 py-12 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="overflow-hidden rounded-lg shadow-lg">
                    <img src={product.imageUrl} alt={`Fotografía detallada de un ${product.name}`} className="w-full h-auto max-h-[500px] object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"/>
                </div>
                <div>
                    <span className="text-coffee-secondary font-semibold">{product.category}</span>
                    <h1 className="text-4xl font-serif font-bold text-coffee-dark my-2">{product.name}</h1>
                    <p className="text-3xl font-bold text-coffee-primary mb-4">${product.price.toFixed(2)}</p>
                    <p className="text-gray-700 text-lg mb-6">{product.description}</p>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <label htmlFor="quantity" className="font-semibold">Cantidad:</label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 text-lg hover:bg-gray-200 active:bg-gray-300 transition-colors rounded-l-md">-</button>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-12 text-center bg-white text-coffee-dark border-l border-r border-gray-300 focus:outline-none"
                                aria-label="Cantidad del producto"
                            />
                            <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 text-lg hover:bg-gray-200 active:bg-gray-300 transition-colors rounded-r-md">+</button>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full md:w-auto bg-coffee-primary text-white font-bold py-3 px-8 rounded-md hover:bg-coffee-secondary transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

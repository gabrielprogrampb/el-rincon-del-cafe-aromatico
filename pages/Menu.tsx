
import React, { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../services/api';
import { Product } from '../types';
import ProductCard from '../components/common/ProductCard';
import Spinner from '../components/common/Spinner';

const Menu: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    
    const categories = ['All', 'Espresso', 'Filtrado', 'Especialidad'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getProducts();
                setProducts(productsData);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    
    const filteredProducts = useMemo(() => {
        return products
            .filter(product => 
                selectedCategory === 'All' || product.category === selectedCategory
            )
            .filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [products, selectedCategory, searchTerm]);

    return (
        <div className="container mx-auto px-6 py-12 animate-fadeIn">
            <h1 className="text-4xl font-serif font-bold text-coffee-dark text-center mb-4">Nuestro Menú</h1>
            <p className="text-center text-lg text-gray-700 mb-12">Explora nuestra cuidada selección de cafés de todo el mundo.</p>

            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <input
                        type="text"
                        placeholder="Buscar café..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-primary bg-white text-coffee-dark placeholder-gray-500 transition-all duration-300 focus:shadow-lg focus:scale-105"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-md transition-all duration-300 transform hover:-translate-y-1 active:scale-95 ${
                                selectedCategory === category 
                                    ? 'bg-coffee-primary text-white shadow-lg' 
                                    : 'bg-white text-coffee-dark hover:bg-coffee-light hover:shadow-md'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? <Spinner /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 [perspective:1000px]">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 text-xl">No se encontraron productos.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Menu;

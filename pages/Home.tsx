
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import { Product } from '../types';
import ProductCard from '../components/common/ProductCard';
import Spinner from '../components/common/Spinner';

const Home: React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts();
                setFeaturedProducts(products.slice(0, 4));
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="animate-fadeIn">
            {/* Hero Section */}
            <section className="relative h-[60vh] bg-cover bg-center text-white" style={{ backgroundImage: "url('https://picsum.photos/seed/coffeehero/1920/1080')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 animate-fadeIn" style={{ animationDelay: '0.2s' }}>El Arte del Café Perfecto</h1>
                        <p className="text-xl md:text-2xl mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>Cada grano cuenta una historia. Ven y descubre la tuya.</p>
                        <Link to="/menu" className="bg-coffee-primary hover:bg-coffee-secondary text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                            Ver Menú
                        </Link>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 bg-cream animate-fadeIn">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-serif font-bold text-coffee-dark mb-4">Nuestra Historia</h2>
                    <p className="max-w-3xl mx-auto text-lg text-gray-700">
                        Fundado en 2023, El Rincón del Café Aromático nació de una pasión por el café de especialidad y el deseo de crear un espacio acogedor para la comunidad. Tostamos nuestros propios granos y preparamos cada taza con dedicación.
                    </p>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 bg-coffee-light">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-serif font-bold text-coffee-dark text-center mb-12 animate-fadeIn">Cafés Destacados</h2>
                    {loading ? <Spinner /> : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 [perspective:1000px]">
                            {featuredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
            
            {/* Testimonials */}
            <section className="py-20 bg-cream">
                <div className="container mx-auto px-6">
                     <h2 className="text-4xl font-serif font-bold text-coffee-dark text-center mb-12 animate-fadeIn">Lo que dicen nuestros clientes</h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                            <p className="text-gray-600 mb-4">"El mejor café que he probado en la ciudad. El ambiente es increíble y el personal muy amable."</p>
                            <p className="font-bold text-coffee-dark">- Ana García</p>
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                            <p className="text-gray-600 mb-4">"Una selección de granos de especialidad impresionante. El Geisha de Panamá es una experiencia única."</p>
                            <p className="font-bold text-coffee-dark">- Carlos Rodriguez</p>
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                            <p className="text-gray-600 mb-4">"Mi lugar favorito para trabajar y disfrutar de un buen latte. ¡Totalmente recomendado!"</p>
                            <p className="font-bold text-coffee-dark">- Laura Martinez</p>
                        </div>
                     </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

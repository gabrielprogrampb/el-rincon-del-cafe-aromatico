
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-coffee-dark text-cream pt-12 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-serif font-bold mb-4">El Rincón del Café Aromático</h3>
                        <p className="text-sm">Disfruta del mejor café de especialidad, tostado con pasión y servido con amor.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Navegación</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-coffee-light hover:translate-x-2 block transition-all duration-300">Sobre Nosotros</Link></li>
                            <li><Link to="/menu" className="hover:text-coffee-light hover:translate-x-2 block transition-all duration-300">Menú</Link></li>
                            <li><Link to="/contact" className="hover:text-coffee-light hover:translate-x-2 block transition-all duration-300">Contacto</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contacto</h3>
                        <p className="text-sm">123 Calle del Café, Ciudad Aroma</p>
                        <p className="text-sm">contacto@caferincon.com</p>
                        <p className="text-sm">(123) 456-7890</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">Boletín</h3>
                        <p className="text-sm mb-2">Suscríbete para recibir ofertas especiales.</p>
                        <form className="flex">
                            <input 
                                type="email" 
                                placeholder="Tu correo electrónico" 
                                className="w-full px-3 py-2 bg-gray-700 text-cream rounded-l-md focus:outline-none focus:ring-2 focus:ring-coffee-primary placeholder-gray-400 transition-all duration-300 focus:scale-105" 
                            />
                            <button type="submit" className="bg-coffee-primary hover:bg-coffee-secondary text-white px-4 py-2 rounded-r-md transform hover:scale-105 active:scale-95 transition-all duration-300">Enviar</button>
                        </form>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-6 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} El Rincón del Café Aromático. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

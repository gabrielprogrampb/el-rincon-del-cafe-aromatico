
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const CoffeeMugIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-coffee-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4v3a1 1 0 01-1 1H6a1 1 0 01-1-1v-3H1a1 1 0 01-1-1V5a1 1 0 011-1h4V4a1 1 0 011-1h4zm0 2H6v6h4V5zm2 0h2v2h-2V5z" clipRule="evenodd" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const ShoppingCartIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const Header: React.FC = () => {
    const { user } = useAuth();
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `text-lg transform hover:scale-110 transition-all duration-300 ${isActive ? 'text-coffee-primary font-bold' : 'text-coffee-dark hover:text-coffee-primary'}`;
    
    const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
        `text-3xl transform hover:scale-110 transition-all duration-300 ${isActive ? 'text-coffee-primary font-bold' : 'text-coffee-dark hover:text-coffee-primary'}`;

    const textNavLinks = (isMobile = false) => (
        <>
            <NavLink to="/" className={isMobile ? mobileNavLinkClass : navLinkClass} onClick={() => setIsMenuOpen(false)}>Inicio</NavLink>
            <NavLink to="/menu" className={isMobile ? mobileNavLinkClass : navLinkClass} onClick={() => setIsMenuOpen(false)}>Menú</NavLink>
            <NavLink to="/about" className={isMobile ? mobileNavLinkClass : navLinkClass} onClick={() => setIsMenuOpen(false)}>Sobre Nosotros</NavLink>
            <NavLink to="/contact" className={isMobile ? mobileNavLinkClass : navLinkClass} onClick={() => setIsMenuOpen(false)}>Contacto</NavLink>
            {user?.role === 'admin' && (
                <NavLink to="/admin" className={isMobile ? mobileNavLinkClass : navLinkClass} onClick={() => setIsMenuOpen(false)}>Admin</NavLink>
            )}
        </>
    );

    return (
        <header className="bg-cream shadow-md sticky top-0 z-40">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 transform hover:scale-105 transition-transform duration-300" aria-label="El Rincón del Café Aromático - Página de inicio">
                    <CoffeeMugIcon />
                    <span className="text-2xl font-serif font-bold text-coffee-dark">El Rincón del Café Aromático</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {textNavLinks(false)}
                    <Link to={user ? "/profile" : "/login"} className="text-coffee-dark hover:text-coffee-primary transform hover:scale-125 active:scale-110 transition-all duration-300" aria-label={user ? 'Ver perfil de usuario' : 'Iniciar sesión'}>
                        <UserIcon />
                    </Link>
                    <Link to="/cart" className="relative text-coffee-dark hover:text-coffee-primary transform hover:scale-125 active:scale-110 transition-all duration-300" aria-label={`Ver carrito de compras con ${cartCount} items`}>
                        <ShoppingCartIcon />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </nav>

                {/* Mobile controls */}
                <div className="flex items-center gap-5 md:hidden">
                    <Link to={user ? "/profile" : "/login"} className="text-coffee-dark hover:text-coffee-primary transform hover:scale-125 active:scale-110 transition-all duration-300" aria-label={user ? 'Ver perfil de usuario' : 'Iniciar sesión'}>
                        <UserIcon />
                    </Link>
                    <Link to="/cart" className="relative text-coffee-dark hover:text-coffee-primary transform hover:scale-125 active:scale-110 transition-all duration-300" aria-label={`Ver carrito de compras con ${cartCount} items`}>
                        <ShoppingCartIcon />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <button className="z-50" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}>
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-cream z-40 flex flex-col items-center justify-center md:hidden transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <nav className="flex flex-col items-center gap-8">
                    {textNavLinks(true)}
                </nav>
            </div>
        </header>
    );
};

export default Header;

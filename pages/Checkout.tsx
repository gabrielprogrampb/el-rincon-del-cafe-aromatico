
import React from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would integrate a real payment gateway
        alert('¡Pedido realizado con éxito! (Simulación)');
        clearCart();
        navigate('/');
    };

    if (cartItems.length === 0) {
        return (
             <div className="container mx-auto px-6 py-20 text-center animate-fadeIn">
                <h1 className="text-3xl font-bold mb-4">No hay nada que pagar</h1>
                <p>Tu carrito está vacío.</p>
             </div>
        )
    }

    const inputStyles = "w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-primary transition-all duration-300 text-coffee-dark placeholder-gray-500 focus:scale-[1.02]";

    return (
        <div className="container mx-auto px-6 py-12 animate-fadeIn">
            <h1 className="text-4xl font-serif font-bold text-coffee-dark text-center mb-8">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Información de Envío</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4">
                            <input type="text" placeholder="Nombre completo" className={inputStyles} required />
                            <input type="email" placeholder="Correo electrónico" className={inputStyles} required />
                            <input type="text" placeholder="Dirección" className={inputStyles} required />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Ciudad" className={inputStyles} required />
                                <input type="text" placeholder="Código postal" className={inputStyles} required />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">Información de Pago</h2>
                        <div className="grid grid-cols-1 gap-4">
                             <input type="text" placeholder="Nombre en la tarjeta" className={inputStyles} required />
                             <input type="text" placeholder="Número de la tarjeta" className={inputStyles} required />
                             <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="MM/AA" className={inputStyles} required />
                                <input type="text" placeholder="CVC" className={inputStyles} required />
                            </div>
                        </div>

                         <button type="submit" className="w-full mt-8 bg-coffee-primary text-white font-bold py-3 rounded-md hover:bg-coffee-secondary transition-all duration-300 transform hover:scale-105 active:scale-95">
                            Pagar ${cartTotal.toFixed(2)}
                        </button>
                    </form>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                    <h2 className="text-2xl font-bold mb-4">Tu Pedido</h2>
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b">
                            <div className="flex items-center gap-2">
                                <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded"/>
                                <span>{item.name} <span className="text-sm text-gray-500">x{item.quantity}</span></span>
                            </div>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold text-xl pt-4 mt-4 border-t">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

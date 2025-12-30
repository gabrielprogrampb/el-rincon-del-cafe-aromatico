
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Cart: React.FC = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-6 py-20 text-center animate-fadeIn">
                <h1 className="text-3xl font-bold text-coffee-dark mb-4">Tu carrito está vacío</h1>
                <p className="text-gray-600 mb-8">Parece que no has añadido nada a tu carrito. ¡Explora nuestro menú!</p>
                <Link to="/menu" className="bg-coffee-primary text-white font-bold py-3 px-6 rounded-md hover:bg-coffee-secondary transition-all duration-300 transform hover:scale-105 active:scale-95">
                    Ir al Menú
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12 animate-fadeIn">
            <h1 className="text-4xl font-serif font-bold text-coffee-dark text-center mb-8">Carrito de Compras</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between py-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200 rounded-lg">
                            <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md"/>
                                <div>
                                    <h2 className="text-lg font-semibold text-coffee-dark">{item.name}</h2>
                                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-lg hover:bg-gray-200 transition-colors rounded-l-md">-</button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                                        className="w-12 text-center border-l border-r border-gray-300 focus:outline-none"
                                    />
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-lg hover:bg-gray-200 transition-colors rounded-r-md">+</button>
                                </div>
                                <p className="font-bold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transform hover:scale-125 transition-transform duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                    <h2 className="text-2xl font-bold border-b pb-4 mb-4">Resumen del Pedido</h2>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-600">Envío</span>
                        <span className="font-semibold">Gratis</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl border-t pt-4">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout">
                        <button className="w-full mt-6 bg-coffee-primary text-white font-bold py-3 rounded-md hover:bg-coffee-secondary transition-all duration-300 transform hover:scale-105 active:scale-95">
                            Proceder al Pago
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;

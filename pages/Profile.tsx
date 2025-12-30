
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getOrdersByUserId } from '../services/api';
import { Order } from '../types';
import { Navigate, useNavigate } from 'react-router-dom';
import Spinner from '../components/common/Spinner';

const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchOrders = async () => {
                setLoading(true);
                try {
                    const userOrders = await getOrdersByUserId(user.id);
                    setOrders(userOrders);
                } catch (error) {
                    console.error("Failed to fetch orders", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchOrders();
        }
    }, [user]);
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container mx-auto px-6 py-12 animate-fadeIn">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-serif font-bold text-coffee-dark">Mi Perfil</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105 active:scale-95">
                    Cerrar Sesión
                </button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4">Información Personal</h2>
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Dirección:</strong> {user.address}</p>
                 <button className="mt-4 bg-coffee-secondary text-white px-4 py-2 rounded-md hover:bg-coffee-primary transition-all duration-300 transform hover:scale-105 active:scale-95">
                    Editar Información
                </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Historial de Pedidos</h2>
                {loading ? <Spinner /> : (
                    <div className="space-y-4">
                        {orders.length > 0 ? orders.map(order => (
                             <div key={order.id} className="border p-4 rounded-md hover:bg-gray-50 hover:shadow-md hover:border-coffee-primary transition-all duration-200">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold">Pedido #{order.id}</p>
                                    <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                                <p><strong>Estado:</strong> <span className="font-semibold">{order.status}</span></p>
                                <ul className="mt-2 text-sm list-disc list-inside">
                                    {order.items.map(item => (
                                        <li key={item.productId}>{item.productName} (x{item.quantity})</li>
                                    ))}
                                </ul>
                            </div>
                        )) : <p>No has realizado ningún pedido todavía.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;


import React, { useState, useEffect, useCallback } from 'react';
import { getOrders, updateOrderStatus } from '../../services/api';
import { Order, OrderStatus } from '../../types';
import Spinner from '../../components/common/Spinner';

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    
    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const ordersData = await getOrders();
            setOrders(ordersData);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);
    
    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        const updatedOrder = await updateOrderStatus(orderId, newStatus);
        if (updatedOrder) {
            setOrders(prevOrders => prevOrders.map(o => o.id === orderId ? updatedOrder : o));
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="animate-fadeIn">
            <h1 className="text-3xl font-bold mb-6">Gestión de Pedidos</h1>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">ID Pedido</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Cliente</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Fecha</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Total</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4 font-medium">{order.id}</td>
                                <td className="px-6 py-4">{order.userName}</td>
                                <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <select 
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                        className="p-2 border rounded-md bg-white text-coffee-dark focus:outline-none focus:ring-2 focus:ring-coffee-primary transition-all duration-300 focus:scale-105"
                                    >
                                        {Object.values(OrderStatus).map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManagement;

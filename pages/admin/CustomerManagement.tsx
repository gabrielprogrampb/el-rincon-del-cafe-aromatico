
import React, { useState, useEffect } from 'react';
import { getUsers, getOrders } from '../../services/api';
import { User, Order } from '../../types';
import Spinner from '../../components/common/Spinner';

const CustomerManagement: React.FC = () => {
    const [customers, setCustomers] = useState<User[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getUsers();
                const ordersData = await getOrders();
                setCustomers(usersData.filter(u => u.role === 'customer'));
                setOrders(ordersData);
            } catch (error) {
                console.error("Failed to fetch customer data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getCustomerOrderCount = (userId: string) => {
        return orders.filter(order => order.userId === userId).length;
    }

    if (loading) return <Spinner />;

    return (
        <div className="animate-fadeIn">
            <h1 className="text-3xl font-bold mb-6">Gestión de Clientes</h1>
             <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">ID Cliente</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Nombre</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Email</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Dirección</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Nº Pedidos</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {customers.map(customer => (
                            <tr key={customer.id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4">{customer.id}</td>
                                <td className="px-6 py-4 font-medium">{customer.name}</td>
                                <td className="px-6 py-4">{customer.email}</td>
                                <td className="px-6 py-4">{customer.address}</td>
                                <td className="px-6 py-4 text-center">{getCustomerOrderCount(customer.id)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerManagement;

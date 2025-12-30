
import React, { useEffect, useState, useMemo } from 'react';
import { getOrders, getUsers } from '../../services/api';
import { Order, User } from '../../types';
import Spinner from '../../components/common/Spinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ordersData, usersData] = await Promise.all([getOrders(), getUsers()]);
                setOrders(ordersData);
                setUsers(usersData);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const stats = useMemo(() => {
        const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = orders.length;
        const totalCustomers = users.filter(u => u.role === 'customer').length;
        
        const salesByDay = orders.reduce((acc, order) => {
            const date = new Date(order.date).toLocaleDateString();
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += order.total;
            return acc;
        }, {} as Record<string, number>);

        const chartData = Object.entries(salesByDay)
            .map(([date, sales]) => ({ date, sales }))
            .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(-30); // Last 30 days

        return { totalSales, totalOrders, totalCustomers, chartData };
    }, [orders, users]);

    if (loading) return <Spinner />;

    return (
        <div className="animate-fadeIn">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-gray-500">Ventas Totales</h3>
                    <p className="text-3xl font-bold">${stats.totalSales.toFixed(2)}</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-gray-500">Pedidos Totales</h3>
                    <p className="text-3xl font-bold">{stats.totalOrders}</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-gray-500">Clientes Registrados</h3>
                    <p className="text-3xl font-bold">{stats.totalCustomers}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 h-96">
                <h2 className="text-xl font-bold mb-4">Tendencia de Ventas (Últimos 30 días)</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                        <Legend />
                        <Line type="monotone" dataKey="sales" name="Ventas" stroke="#6F4E37" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;

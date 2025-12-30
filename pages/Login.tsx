
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const user = await login(email, password);
        if (user) {
            navigate(user.role === 'admin' ? '/admin' : from, { replace: true });
        } else {
            setError('Correo electrónico o contraseña incorrectos.');
        }
    };

    const inputStyles = "w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-primary transition-all duration-300 text-coffee-dark focus:scale-[1.02]";

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-cream py-12 px-4">
            <div className="w-full max-w-md animate-fadeIn">
                <div className="bg-coffee-light border-l-4 border-coffee-primary text-coffee-dark p-4 mb-6 rounded-r-lg shadow-md transform transition-transform duration-300 hover:scale-105">
                    <p className="font-bold">Datos de Prueba</p>
                    <div className="text-sm mt-2">
                        <p><strong>Admin:</strong></p>
                        <p>Email: <code>admin@cafe.com</code></p>
                        <p>Contraseña: <code>adminpassword</code></p>
                        <hr className="my-2 border-coffee-secondary" />
                        <p><strong>Cliente:</strong></p>
                        <p>Email: <code>ana@example.com</code></p>
                        <p>Contraseña: <code>password123</code></p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-serif font-bold text-coffee-dark text-center mb-6">Iniciar Sesión</h1>
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">Correo electrónico</label>
                            <input
                                type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className={inputStyles} required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2" htmlFor="password">Contraseña</label>
                            <input
                                type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                className={inputStyles} required
                            />
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-coffee-primary text-white font-bold py-3 px-6 rounded-md hover:bg-coffee-secondary transition-all duration-300 disabled:bg-gray-400 transform hover:scale-105 active:scale-95">
                            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                        </button>
                    </form>
                    <p className="text-center mt-4">
                        ¿No tienes una cuenta? <Link to="/register" className="text-coffee-primary hover:underline">Regístrate</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;


import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const user = await register(name, email, password);
        if (user) {
            navigate('/profile');
        } else {
            setError('Ya existe un usuario con este correo electrónico.');
        }
    };

    const inputStyles = "w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-primary transition-all duration-300 text-coffee-dark focus:scale-[1.02]";

    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-cream">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md animate-fadeIn">
                <h1 className="text-3xl font-serif font-bold text-coffee-dark text-center mb-6">Crear Cuenta</h1>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">Nombre</label>
                        <input
                            type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                            className={inputStyles} required
                        />
                    </div>
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
                        {loading ? 'Creando...' : 'Registrarse'}
                    </button>
                </form>
                <p className="text-center mt-4">
                    ¿Ya tienes una cuenta? <Link to="/login" className="text-coffee-primary hover:underline">Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

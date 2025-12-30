
import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const AdminLayout: React.FC = () => {
    const { logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const handleCloseSidebar = () => setIsSidebarOpen(false);

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
      `block py-2.5 px-4 rounded transition-all duration-300 transform hover:translate-x-2 ${
        isActive ? 'bg-coffee-primary text-white' : 'hover:bg-coffee-light hover:text-coffee-dark'
      }`;

    const SidebarContent = () => (
        <>
            <div className="p-6 border-b flex justify-between items-center">
                <Link to="/admin" onClick={handleCloseSidebar} className="text-2xl font-serif font-bold text-coffee-dark">Admin Panel</Link>
                <button className="md:hidden" onClick={handleCloseSidebar} aria-label="Cerrar menú">
                    <CloseIcon />
                </button>
            </div>
            <nav className="flex-grow p-4 space-y-2">
                <NavLink to="/admin/dashboard" className={navLinkClass} onClick={handleCloseSidebar}>Dashboard</NavLink>
                <NavLink to="/admin/products" className={navLinkClass} onClick={handleCloseSidebar}>Productos</NavLink>
                <NavLink to="/admin/orders" className={navLinkClass} onClick={handleCloseSidebar}>Pedidos</NavLink>
                <NavLink to="/admin/customers" className={navLinkClass} onClick={handleCloseSidebar}>Clientes</NavLink>
            </nav>
            <div className="p-4 border-t">
                <button 
                    onClick={() => {
                        logout();
                        handleCloseSidebar();
                    }}
                    className="w-full text-left py-2.5 px-4 rounded transition-all duration-300 transform hover:translate-x-2 hover:bg-red-100 hover:text-red-700"
                >
                    Cerrar Sesión
                </button>
                <Link to="/" onClick={handleCloseSidebar} className="mt-2 block w-full text-left py-2.5 px-4 rounded transition-all duration-300 transform hover:translate-x-2 hover:bg-gray-200">
                    Volver al Sitio
                </Link>
            </div>
        </>
    );

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Overlay */}
            {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden" onClick={handleCloseSidebar}></div>}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white text-coffee-dark shadow-md flex flex-col z-20 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex`}>
                <SidebarContent />
            </aside>
            
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Mobile Header */}
                <header className="md:hidden bg-white shadow-md p-4 flex items-center">
                    <button onClick={() => setIsSidebarOpen(true)} aria-label="Abrir menú">
                       <MenuIcon />
                    </button>
                    <h1 className="text-xl font-bold ml-4">Admin Panel</h1>
                </header>

                <main className="flex-1 p-6 md:p-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

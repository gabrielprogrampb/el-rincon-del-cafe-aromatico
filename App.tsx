// =============================================================================
// App.tsx - Componente Principal de El Rincón del Café Aromático
// =============================================================================
// Descripción: Aplicación e-commerce para una cafetería especializada.
// Gestiona el enrutamiento, autenticación y carrito de compras.
// 
// Rutas Públicas:
// - /           : Página de inicio
// - /menu       : Catálogo de productos
// - /product/:id: Detalle de producto
// - /cart       : Carrito de compras
// - /checkout   : Proceso de pago
// - /about      : Sobre nosotros
// - /contact    : Contacto
// - /login      : Iniciar sesión
// - /register   : Registro de usuario
// - /profile    : Perfil del usuario
// 
// Rutas de Admin (protegidas):
// - /admin/dashboard : Panel principal
// - /admin/products  : Gestión de productos
// - /admin/orders    : Gestión de pedidos
// - /admin/customers : Gestión de clientes
// =============================================================================

import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';   // Contexto de autenticación
import { CartProvider } from './contexts/CartContext';   // Contexto del carrito
import MainLayout from './components/layout/MainLayout'; // Layout para páginas públicas
import AdminLayout from './components/layout/AdminLayout'; // Layout para admin

// Páginas públicas
import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Páginas de administración
import Dashboard from './pages/admin/Dashboard';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';
import CustomerManagement from './pages/admin/CustomerManagement';
import ProtectedRoute from './components/auth/ProtectedRoute';

/**
 * Componente principal de la aplicación
 * Configura los providers y el sistema de rutas
 */
const App: React.FC = () => {
  return (
    // AuthProvider: Proporciona el contexto de autenticación a toda la app
    <AuthProvider>
      {/* CartProvider: Proporciona el contexto del carrito de compras */}
      <CartProvider>
        {/* HashRouter: Usa URLs con # para compatibilidad con hosting estático */}
        <HashRouter>
          <Routes>
            {/* ============================================ */}
            {/* RUTAS PÚBLICAS - Accesibles por cualquiera */}
            {/* ============================================ */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />              {/* Página de inicio */}
              <Route path="menu" element={<Menu />} />        {/* Catálogo de cafés */}
              <Route path="product/:id" element={<ProductDetail />} /> {/* Detalle de café */}
              <Route path="cart" element={<Cart />} />        {/* Carrito */}
              <Route path="checkout" element={<Checkout />} /> {/* Proceso de pago */}
              <Route path="about" element={<About />} />      {/* Sobre nosotros */}
              <Route path="contact" element={<Contact />} />  {/* Contacto */}
              <Route path="login" element={<Login />} />      {/* Iniciar sesión */}
              <Route path="register" element={<Register />} /> {/* Registro */}
              <Route path="profile" element={<Profile />} />  {/* Perfil de usuario */}
            </Route>

            {/* ============================================ */}
            {/* RUTAS DE ADMIN - Solo usuarios autorizados */}
            {/* ============================================ */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />          {/* Panel principal */}
              <Route path="products" element={<ProductManagement />} />   {/* Gestión productos */}
              <Route path="orders" element={<OrderManagement />} />       {/* Gestión pedidos */}
              <Route path="customers" element={<CustomerManagement />} /> {/* Gestión clientes */}
            </Route>

            {/* Ruta catch-all: Redirige rutas no encontradas al inicio */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

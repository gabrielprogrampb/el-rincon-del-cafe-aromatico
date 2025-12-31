// =============================================================================
// types.ts - Definiciones de Tipos TypeScript
// =============================================================================
// Descripción: Define todas las interfaces y tipos utilizados en la aplicación
// de e-commerce de café. Incluye productos, usuarios, pedidos y carrito.
// =============================================================================

/**
 * Interfaz para productos (cafés)
 * Representa cada producto disponible en la tienda
 */
export interface Product {
  id: string;          // Identificador único del producto
  name: string;        // Nombre del café
  description: string; // Descripción del producto
  price: number;       // Precio en la moneda local
  imageUrl: string;    // URL de la imagen del producto
  category: 'Espresso' | 'Filtrado' | 'Especialidad'; // Categoría de café
  stock: number;       // Cantidad en inventario
}

/**
 * Interfaz para usuarios
 * Representa tanto clientes como administradores
 */
export interface User {
  id: string;                        // Identificador único
  name: string;                      // Nombre completo
  email: string;                     // Correo electrónico
  role: 'customer' | 'admin';        // Rol del usuario
  address: string;                   // Dirección de envío
  password?: string;                 // Contraseña (solo para simulación de registro)
}

/**
 * Enum para estados de pedidos
 * Define los posibles estados por los que pasa un pedido
 */
export enum OrderStatus {
  Pending = 'Pendiente',       // Pedido recibido, pendiente de procesar
  Processing = 'En proceso',   // Pedido siendo preparado
  Shipped = 'Enviado',         // Pedido en camino
  Delivered = 'Entregado',     // Pedido entregado al cliente
  Cancelled = 'Cancelado'      // Pedido cancelado
}

/**
 * Interfaz para items dentro de un pedido
 * Representa cada producto incluido en una orden
 */
export interface OrderItem {
  productId: string;    // ID del producto
  productName: string;  // Nombre del producto (para referencia rápida)
  quantity: number;     // Cantidad ordenada
  price: number;        // Precio unitario al momento de la compra
}

/**
 * Interfaz para pedidos
 * Representa una orden completa de un cliente
 */
export interface Order {
  id: string;           // Identificador único del pedido
  userId: string;       // ID del usuario que realizó el pedido
  userName: string;     // Nombre del usuario (para referencia rápida)
  items: OrderItem[];   // Lista de productos en el pedido
  total: number;        // Total a pagar
  status: OrderStatus;  // Estado actual del pedido
  date: string;         // Fecha de creación (formato ISO)
}

/**
 * Interfaz para items del carrito
 * Extiende Product agregando la cantidad seleccionada
 */
export interface CartItem extends Product {
  quantity: number;     // Cantidad agregada al carrito
}


export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'Espresso' | 'Filtrado' | 'Especialidad';
  stock: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  address: string;
  password?: string; // Only for registration simulation
}

export enum OrderStatus {
  Pending = 'Pendiente',
  Processing = 'En proceso',
  Shipped = 'Enviado',
  Delivered = 'Entregado',
  Cancelled = 'Cancelado'
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  date: string; // ISO string
}

export interface CartItem extends Product {
  quantity: number;
}

import { mockProducts, mockUsers, mockOrders } from '../data/mockData';
import { Product, User, Order, OrderStatus } from '../types';

const SIMULATED_DELAY = 500;

// Helper to simulate network delay
const delay = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), SIMULATED_DELAY));
};

// --- Product API ---
export const getProducts = (): Promise<Product[]> => {
    return delay([...mockProducts]); // Return a copy to avoid direct mutation
};

export const getProductById = (id: string): Promise<Product | undefined> => {
    const product = mockProducts.find(p => p.id === id);
    return delay(product);
};

export const addProduct = (productData: Omit<Product, 'id'>): Promise<Product> => {
    const newProduct: Product = {
        ...productData,
        id: String(Date.now() + Math.random()), // semi-unique id
    };
    mockProducts.push(newProduct);
    return delay(newProduct);
};

export const updateProduct = (updatedProduct: Product): Promise<Product | undefined> => {
    const productIndex = mockProducts.findIndex(p => p.id === updatedProduct.id);
    if (productIndex !== -1) {
        mockProducts[productIndex] = updatedProduct;
        return delay(updatedProduct);
    }
    return delay(undefined);
};

export const deleteProduct = (productId: string): Promise<boolean> => {
    const productIndex = mockProducts.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        mockProducts.splice(productIndex, 1);
        return delay(true);
    }
    return delay(false);
};


// --- User API ---
export const getUsers = (): Promise<User[]> => {
    return delay(mockUsers);
};

export const getUserById = (id: string): Promise<User | undefined> => {
    const user = mockUsers.find(u => u.id === id);
    return delay(user);
};

// --- Order API ---
export const getOrders = (): Promise<Order[]> => {
    // Sort by date descending
    const sortedOrders = [...mockOrders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return delay(sortedOrders);
};

export const getOrdersByUserId = (userId: string): Promise<Order[]> => {
    const userOrders = mockOrders.filter(o => o.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return delay(userOrders);
};

export const updateOrderStatus = (orderId: string, status: OrderStatus): Promise<Order | undefined> => {
    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        mockOrders[orderIndex].status = status;
        return delay(mockOrders[orderIndex]);
    }
    return delay(undefined);
};
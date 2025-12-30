import { Product, User, Order, OrderStatus } from '../types';

export let mockProducts: Product[] = [
  { id: '1', name: 'Espresso Clásico', description: 'Intenso y aromático, la esencia del café.', price: 2.50, imageUrl: 'https://picsum.photos/seed/espresso1/400/400', category: 'Espresso', stock: 100 },
  { id: '2', name: 'Latte Cremoso', description: 'Espresso con leche vaporizada y una capa de espuma.', price: 3.50, imageUrl: 'https://picsum.photos/seed/latte/400/400', category: 'Espresso', stock: 100 },
  { id: '3', name: 'Cappuccino Italiano', description: 'El equilibrio perfecto entre espresso, leche y espuma.', price: 3.50, imageUrl: 'https://picsum.photos/seed/cappuccino/400/400', category: 'Espresso', stock: 100 },
  { id: '4', name: 'Americano Suave', description: 'Espresso diluido con agua caliente, suave y ligero.', price: 3.00, imageUrl: 'https://picsum.photos/seed/americano/400/400', category: 'Espresso', stock: 100 },
  { id: '5', name: 'V60 Pour Over', description: 'Café de filtro con notas claras y complejas.', price: 4.50, imageUrl: 'https://picsum.photos/seed/v60/400/400', category: 'Filtrado', stock: 50 },
  { id: '6', name: 'Chemex Puro', description: 'Método de filtro que resalta la pureza del grano.', price: 5.00, imageUrl: 'https://picsum.photos/seed/chemex/400/400', category: 'Filtrado', stock: 40 },
  { id: '7', name: 'Prensa Francesa', description: 'Cuerpo robusto y sabor intenso.', price: 4.00, imageUrl: 'https://picsum.photos/seed/frenchpress/400/400', category: 'Filtrado', stock: 60 },
  { id: '8', name: 'Cold Brew Refrescante', description: 'Infusión en frío durante 12 horas, suave y sin acidez.', price: 4.50, imageUrl: 'https://picsum.photos/seed/coldbrew/400/400', category: 'Filtrado', stock: 80 },
  { id: '9', name: 'Geisha de Panamá', description: 'Un café exótico con notas florales y afrutadas.', price: 8.00, imageUrl: 'https://picsum.photos/seed/geisha/400/400', category: 'Especialidad', stock: 20 },
  { id: '10', name: 'Etiopía Yirgacheffe', description: 'Perfil de sabor complejo con notas a limón y té negro.', price: 6.50, imageUrl: 'https://picsum.photos/seed/yirgacheffe/400/400', category: 'Especialidad', stock: 30 },
  { id: '11', name: 'Colombia Supremo', description: 'Balance perfecto con notas de nuez y chocolate.', price: 5.50, imageUrl: 'https://picsum.photos/seed/colombia/400/400', category: 'Especialidad', stock: 45 },
  { id: '12', name: 'Mocha Delight', description: 'Una deliciosa mezcla de espresso, chocolate y leche.', price: 4.75, imageUrl: 'https://picsum.photos/seed/mocha/400/400', category: 'Espresso', stock: 70 },
  { id: '13', name: 'Caramel Macchiato', description: 'Leche vaporizada, espresso y un toque de caramelo.', price: 4.75, imageUrl: 'https://picsum.photos/seed/macchiato/400/400', category: 'Espresso', stock: 70 },
  { id: '14', name: 'Aeropress Intenso', description: 'Un método versátil para un café con cuerpo y sin amargor.', price: 4.50, imageUrl: 'https://picsum.photos/seed/aeropress/400/400', category: 'Filtrado', stock: 55 },
  { id: '15', name: 'Kenia AA', description: 'Acidez brillante y notas a frutos rojos y vino.', price: 7.00, imageUrl: 'https://picsum.photos/seed/kenya/400/400', category: 'Especialidad', stock: 25 },
];

export const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@cafe.com', role: 'admin', address: '123 Coffee St, Bean Town', password: 'adminpassword' },
  { id: '2', name: 'Ana García', email: 'ana@example.com', role: 'customer', address: '456 Aroma Ave, Flavor City', password: 'password123' },
  { id: '3', name: 'Carlos Rodriguez', email: 'carlos@example.com', role: 'customer', address: '789 Roast Rd, Brewville', password: 'password123' },
  { id: '4', name: 'Maria Hernandez', email: 'maria@example.com', role: 'customer', address: '101 Grind Blvd, Steamy Springs', password: 'password123' },
  { id: '5', name: 'Javier Lopez', email: 'javier@example.com', role: 'customer', address: '212 Filter Ln, Portafilter Place', password: 'password123' },
  { id: '6', name: 'Laura Martinez', email: 'laura@example.com', role: 'customer', address: '333 Crema Ct, Froth Meadows', password: 'password123' },
  { id: '7', name: 'David Perez', email: 'david@example.com', role: 'customer', address: '444 Drip Dr, Espresso Estates', password: 'password123' },
  { id: '8', name: 'Sofia Gonzalez', email: 'sofia@example.com', role: 'customer', address: '555 Bean Bnd, Cappuccino Corner', password: 'password123' },
  { id: '9', name: 'Daniel Sanchez', email: 'daniel@example.com', role: 'customer', address: '666 Moka Mews, Latte Lakes', password: 'password123' },
  { id: '10', name: 'Isabel Ramirez', email: 'isabel@example.com', role: 'customer', address: '777 Pour Psge, Americano Acres', password: 'password123' },
];

export const mockOrders: Order[] = Array.from({ length: 30 }, (_, i) => {
    const user = mockUsers[(i % 9) + 1]; // Cycle through customers
    const numItems = Math.floor(Math.random() * 3) + 1;
    const items = Array.from({ length: numItems }, () => {
        const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
        return {
            productId: product.id,
            productName: product.name,
            quantity: Math.floor(Math.random() * 2) + 1,
            price: product.price,
        };
    });
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const statuses = Object.values(OrderStatus);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const date = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();

    return {
        id: `order-${i + 1}`,
        userId: user.id,
        userName: user.name,
        items,
        total: parseFloat(total.toFixed(2)),
        status,
        date,
    };
});
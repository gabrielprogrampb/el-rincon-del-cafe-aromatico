
import React, { useState, useEffect, useCallback } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../services/api';
import { Product } from '../../types';
import Spinner from '../../components/common/Spinner';
import ProductModal from '../../components/admin/ProductModal';

const ProductManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            setProducts(await getProducts());
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleOpenAddModal = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSaveProduct = async (productData: Omit<Product, 'id'> | Product) => {
        if ('id' in productData) {
            // Editing existing product
            await updateProduct(productData);
        } else {
            // Adding new product
            await addProduct(productData);
        }
        await fetchProducts();
        handleCloseModal();
    };

    const handleDeleteProduct = async (productId: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            await deleteProduct(productId);
            await fetchProducts();
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gestión de Productos</h1>
                <button onClick={handleOpenAddModal} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105 active:scale-95">
                    Añadir Producto
                </button>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">ID</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Nombre</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Categoría</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Precio</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Stock</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4 truncate" title={product.id}>{product.id.substring(0, 8)}...</td>
                                <td className="px-6 py-4 font-medium">{product.name}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                                <td className="px-6 py-4">{product.stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button onClick={() => handleOpenEditModal(product)} className="text-blue-500 hover:underline mr-4 transform hover:scale-110 transition-transform">Editar</button>
                                    <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:underline transform hover:scale-110 transition-transform">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveProduct}
                product={editingProduct}
            />
        </div>
    );
};

export default ProductManagement;

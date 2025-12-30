
import React, { useState, useEffect } from 'react';
import { Product } from '../../types';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Omit<Product, 'id'> | Product) => void;
    product: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, product }) => {
    // FIX: Explicitly type initialFormData to match Omit<Product, 'id'>, ensuring `category` has the correct union type.
    const initialFormData: Omit<Product, 'id'> = {
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        category: 'Espresso',
        stock: 0,
    };

    const [formData, setFormData] = useState<Omit<Product, 'id'>>(initialFormData);
    const [imageSource, setImageSource] = useState<'url' | 'upload'>('url');
    const [imagePreview, setImagePreview] = useState<string | null>(null);


    useEffect(() => {
        if (isOpen) {
            if (product) {
                setFormData(product);
                setImagePreview(product.imageUrl);
                setImageSource('url'); // Default to URL when editing an existing product
            } else {
                setFormData(initialFormData);
                setImagePreview(null);
                setImageSource('url');
            }
        }
    }, [product, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        // FIX: Use a callback in setFormData to correctly handle type widening for computed properties.
        // The value for 'category' is cast to the correct union type to satisfy TypeScript.
        setFormData(prev => {
            let processedValue: string | number = value;
            if (type === 'number') {
                processedValue = parseFloat(value) || 0;
            }

            return {
                 ...prev,
                [name]: name === 'category' ? (value as Product['category']) : processedValue,
            };
        });

        if (name === 'imageUrl') {
            setImagePreview(value);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData(prev => ({ ...prev, imageUrl: base64String }));
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(product ? { ...formData, id: product.id } : formData);
    };

    if (!isOpen) return null;

    const inputStyle = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-primary bg-white text-coffee-dark placeholder-gray-500 transition-all duration-300 focus:scale-[1.02]";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 overflow-y-auto transition-opacity duration-300">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg max-h-full overflow-y-auto transform transition-all duration-300 scale-95 animate-fadeIn">
                <h2 className="text-2xl font-bold mb-6">{product ? 'Editar Producto' : 'Añadir Producto'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre del producto" className={inputStyle} required />
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" className={`${inputStyle} h-24`} required />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Precio" className={inputStyle} min="0" step="0.01" required />
                            <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" className={inputStyle} min="0" required />
                        </div>
                        <select name="category" value={formData.category} onChange={handleChange} className={inputStyle} required>
                            <option value="Espresso">Espresso</option>
                            <option value="Filtrado">Filtrado</option>
                            <option value="Especialidad">Especialidad</option>
                        </select>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Producto</label>
                            <div className="flex gap-4 mb-2">
                                <label className="flex items-center cursor-pointer">
                                    <input type="radio" name="imageSource" value="url" checked={imageSource === 'url'} onChange={() => setImageSource('url')} className="h-4 w-4 text-coffee-primary focus:ring-coffee-secondary" />
                                    <span className="ml-2 text-sm">URL</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input type="radio" name="imageSource" value="upload" checked={imageSource === 'upload'} onChange={() => setImageSource('upload')} className="h-4 w-4 text-coffee-primary focus:ring-coffee-secondary" />
                                    <span className="ml-2 text-sm">Subir Archivo</span>
                                </label>
                            </div>
                            
                            {imageSource === 'url' ? (
                                <input type="text" name="imageUrl" value={formData.imageUrl.startsWith('data:') ? '' : formData.imageUrl} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" className={inputStyle} />
                            ) : (
                                <input type="file" name="imageFile" onChange={handleFileChange} className={`${inputStyle} p-1.5`} accept="image/*" />
                            )}
                        </div>

                        {imagePreview && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Vista Previa:</p>
                                <img src={imagePreview} alt="Vista previa del producto" className="w-32 h-32 object-cover rounded-md border transform hover:scale-110 transition-transform duration-300" />
                            </div>
                        )}

                    </div>
                    <div className="flex justify-end gap-4 mt-8">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 active:scale-95">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-coffee-primary text-white rounded-md hover:bg-coffee-secondary transition-all duration-300 transform hover:scale-105 active:scale-95">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;

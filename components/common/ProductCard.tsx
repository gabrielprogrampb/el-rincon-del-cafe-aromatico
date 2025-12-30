
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group hover:shadow-2xl [transform-style:preserve-3d] hover:[transform:rotateY(5deg)_translateZ(10px)]">
      <Link to={`/product/${product.id}`} className="block">
        <div className="overflow-hidden">
            <img src={product.imageUrl} alt={`Una taza de ${product.name}`} className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500" />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-serif font-semibold text-coffee-dark mb-2">{product.name}</h3>
        <p className="text-coffee-secondary font-bold text-lg mb-4">${product.price.toFixed(2)}</p>
        <button 
          onClick={() => addToCart(product, 1)}
          className="w-full bg-coffee-primary text-white py-2 px-4 rounded-md hover:bg-coffee-secondary transform hover:scale-105 active:scale-95 transition-all duration-300">
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

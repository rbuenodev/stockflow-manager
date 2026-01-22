import React from 'react';
import { Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price?: number; // Optional if not always shown
  stockQuantity: number;
}

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div 
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="flex items-center gap-4">
        {/* Placeholder Icon/Image */}
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[var(--primary-color)]">
           <span className="font-bold text-lg">{product.name.substring(0, 1)}</span> 
        </div>
        
        <div>
          <h4 className="font-bold text-gray-800">{product.name}</h4>
          {product.price !== undefined && (
             <p className="text-sm text-gray-500">R$ {Number(product.price).toFixed(2)}</p>
          )}
        </div>
      </div>

      <button 
        className="w-10 h-10 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
        aria-label="Add to cart"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}

import React, { useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  stockQuantity: number;
}

interface ConsumptionModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
}

export default function ConsumptionModal({ product, isOpen, onClose, onConfirm }: ConsumptionModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleConfirm = () => {
    onConfirm(quantity);
    setQuantity(1); // Reset for next time
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
        >
            <X size={24} />
        </button>

        <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{product.name}</h3>
            <p className="text-gray-500">Quantos itens você vai retirar?</p>
        </div>

        <div className="flex items-center justify-center gap-6 mb-8">
            <button 
                onClick={handleDecrement}
                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors"
                disabled={quantity <= 1}
            >
                <Minus size={24} />
            </button>
            
            <span className="text-4xl font-bold text-gray-800 w-16 text-center">{quantity}</span>
            
            <button 
                onClick={handleIncrement}
                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-colors"
            >
                <Plus size={24} />
            </button>
        </div>

        <button 
            onClick={handleConfirm}
            className="w-full bg-[var(--primary-color)] text-white font-bold py-4 rounded-xl text-lg hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/30"
        >
            Confirmar Consumo
        </button>
      </div>
    </div>
  );
}

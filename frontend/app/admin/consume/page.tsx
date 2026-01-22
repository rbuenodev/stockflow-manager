"use client";
import React, { useEffect, useState } from 'react';
import api from '@/api/api';
import { useAuth } from '@/context/AuthContext';
import { useWhitelabel } from '@/context/WhitelabelContext';
import StatsCard from '@/components/ui/StatsCard';
import ProductCard from '@/components/ui/ProductCard';
import ConsumptionModal from '@/components/ui/ConsumptionModal';
import Link from 'next/link';
import { ArrowLeft, Search, SlidersHorizontal, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  stockQuantity: number;
  price?: number;
}

interface ConsumptionItem {
  id: string;
  product: Product;
  quantity: number;
  status: string;
}

export default function AdminConsumePage() {
  const { user } = useAuth();
  const { config } = useWhitelabel();
  const [products, setProducts] = useState<Product[]>([]);
  const [consumption, setConsumption] = useState<ConsumptionItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchConsumption();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchConsumption = async () => {
    try {
      const res = await api.get('/consumption/my');
      setConsumption(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const calculateTotalConsumption = () => {
      return consumption.reduce((acc, item) => {
          const price = item.product.price || 0; 
          return acc + (price * item.quantity);
      }, 0);
  };

  const handleProductClick = (product: Product) => {
      setSelectedProduct(product);
      setIsModalOpen(true);
  };

  const handleConfirmConsumption = async (quantity: number) => {
      if (!selectedProduct) return;
      
      try {
        await api.post('/consumption/add', {
            productId: selectedProduct.id,
            quantity: quantity,
        });
        setIsModalOpen(false);
        setSelectedProduct(null);
        fetchConsumption();
      } catch (err) {
        alert('Falha ao registrar consumo');
      }
  };

  const filteredProducts = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--background)] pb-12 font-sans text-[var(--foreground)]">
      {/* Header - Matching User Dashboard */}
      <header className="bg-[var(--primary-color)] pt-12 pb-24 px-6 rounded-b-[2.5rem] shadow-lg relative z-0">
         <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-4">
                 <Link href="/admin" className="text-white hover:opacity-80 transition-opacity">
                     <ArrowLeft size={24} strokeWidth={3} />
                 </Link>
                 <div className="text-white">
                    <p className="text-blue-100 text-sm font-medium">Painel Administrativo</p>
                    <h1 className="text-2xl font-bold uppercase tracking-tight">Consumir</h1>
                 </div>
             </div>
             <div className="flex items-center gap-3">
                 {config?.logoUrl ? (
                     <img src={config.logoUrl} alt="Logo" className="w-10 h-10 rounded-full bg-white/20 p-1" />
                 ) : (
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                        {user?.name?.substring(0,1).toUpperCase() || 'A'}
                    </div>
                 )}
             </div>
         </div>
      </header>

      {/* Main Content - Overlapping Header like User Dashboard */}
      <main className="px-6 -mt-16 relative z-10 space-y-6">
        
        {/* Stats Card */}
        <StatsCard total={calculateTotalConsumption()} label="MEU CONSUMO PENDENTE" />

        {/* Search Bar */}
        <div className="flex gap-3">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="text"
                    placeholder="Buscar produto..."
                    className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-md focus:ring-2 focus:ring-white/20 transition-all font-medium placeholder:text-gray-300"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 text-gray-400 hover:text-[var(--primary-color)] transition-colors">
                <SlidersHorizontal size={24} />
            </button>
        </div>

        {/* Section Title */}
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Produtos Disponíveis</h2>
                <span className="text-xs font-bold text-[var(--primary-color)] bg-blue-50 px-2 py-1 rounded-lg">
                    {filteredProducts.length} itens
                </span>
            </div>
            
            <div className="space-y-4">
                {filteredProducts.map(p => (
                    <ProductCard 
                        key={p.id} 
                        product={p} 
                        onClick={handleProductClick} 
                    />
                ))}
            </div>
            
            {filteredProducts.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package size={32} className="text-gray-200" />
                    </div>
                    <p className="text-gray-400 font-bold">Nenhum produto encontrado</p>
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')} 
                            className="mt-2 text-sm font-bold text-[var(--primary-color)]"
                        >
                            Limpar busca
                        </button>
                    )}
                </div>
            )}
        </div>
      </main>

      {/* Modals */}
      {selectedProduct && (
          <ConsumptionModal 
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmConsumption}
          />
      )}
    </div>
  );
}

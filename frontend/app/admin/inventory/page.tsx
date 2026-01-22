"use client";
import React, { useEffect, useState } from 'react';
import api from '@/api/api';
import Link from 'next/link';
import { ArrowLeft, Check, Package, Info, Search } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  stockQuantity: number;
  price: number;
}

export default function InventoryCount() {
  const [products, setProducts] = useState<Product[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
      // Initialize counts with current stock
      const initialCounts: Record<string, number> = {};
      res.data.forEach((p: Product) => {
        initialCounts[p.id] = p.stockQuantity;
      });
      setCounts(initialCounts);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCountChange = (productId: string, value: number) => {
    setCounts(prev => ({ ...prev, [productId]: value }));
  };

  const handleSaveAll = async () => {
    if (!confirm('Confirmar contagem física? Isso atualizará todos os estoques.')) return;
    
    try {
      const updates = Object.entries(counts).map(([productId, counted]) => 
        api.patch(`/products/${productId}`, { stockQuantity: counted })
      );
      
      await Promise.all(updates);
      alert('Contagem física salva com sucesso!');
      fetchProducts();
    } catch (err) {
      alert('Falha ao salvar contagem');
    }
  };

  const getDifference = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    return (counts[productId] || 0) - product.stockQuantity;
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24 font-sans text-[var(--foreground)]">
      {/* Header - Matching Primary Style */}
      <header className="bg-[var(--primary-color)] pt-12 pb-24 px-6 rounded-b-[2.5rem] shadow-lg relative z-0">
         <div className="flex justify-between items-start mb-6">
             <div className="flex items-center gap-4 text-white">
                 <Link href="/admin" className="hover:opacity-80 transition-opacity">
                     <ArrowLeft size={24} strokeWidth={3} />
                 </Link>
                 <div>
                    <h1 className="text-2xl font-black uppercase tracking-tight leading-none">CONTAGEM</h1>
                    <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1">Inventário Físico</p>
                 </div>
             </div>
             <button 
                  onClick={handleSaveAll}
                  className="bg-white text-[var(--primary-color)] px-5 py-3 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center gap-2 font-black text-xs uppercase tracking-widest"
              >
                  <Check size={18} strokeWidth={3} />
                  Salvar
              </button>
         </div>
      </header>

      {/* Overlapping Content */}
      <main className="px-6 -mt-16 relative z-10 space-y-6">
        
        {/* Instructions Card */}
        <div className="bg-white/90 backdrop-blur-sm border-2 border-[var(--primary-color)]/10 rounded-[2rem] p-5 shadow-xl flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Info size={20} className="text-[var(--primary-color)]" />
            </div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tight leading-relaxed">
                <strong className="text-[var(--primary-color)] block mb-0.5">Instruções:</strong> 
                Conte fisicamente cada item e insira a quantidade real. As diferenças serão destacadas automaticamente.
            </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
                type="text"
                placeholder="Buscar item para contar..."
                className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-xl focus:ring-2 focus:ring-white/20 transition-all font-bold text-gray-900 placeholder:text-gray-300"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="space-y-4">
            {filteredProducts.map(product => {
                const diff = getDifference(product.id);
                return (
                    <div key={product.id} className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-50 group hover:border-[var(--primary-color)]/20 transition-all">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                                    <Package size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-black text-gray-800 uppercase tracking-tight text-lg leading-tight truncate">{product.name}</h3>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Sistema: {product.stockQuantity} un.</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 shrink-0">
                                {diff !== 0 && (
                                    <div className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase shadow-sm animate-in zoom-in duration-300 ${
                                        diff > 0 ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                                    }`}>
                                        {diff > 0 ? '+' : ''}{diff}
                                    </div>
                                )}
                                <div className="flex flex-col items-center">
                                    <p className="text-[8px] font-black text-[var(--primary-color)] uppercase mb-1">REAL</p>
                                    <input 
                                        type="number" 
                                        className="w-16 h-12 bg-gray-50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-xl text-center font-black text-gray-800 shadow-inner outline-none transition-all"
                                        value={counts[product.id] || 0}
                                        onChange={(e) => handleCountChange(product.id, Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            
            {filteredProducts.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                    <Package size={48} className="mx-auto mb-4 text-gray-100" />
                    <p className="text-gray-400 font-black uppercase tracking-tight">Vazio</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}

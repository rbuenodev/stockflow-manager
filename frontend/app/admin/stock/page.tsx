"use client";
import React, { useEffect, useState } from 'react';
import api from '@/api/api';
import { useWhitelabel } from '@/context/WhitelabelContext';
import Link from 'next/link';
import { ArrowLeft, Plus, TrendingUp, Package, Search } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
}

export default function StockManagement() {
  const { config } = useWhitelabel();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Batch Update State
  const [batchType, setBatchType] = useState('PERCENTAGE');
  const [batchValue, setBatchValue] = useState(0);
  const [stockAdjustment, setStockAdjustment] = useState(0);
  
  // Create Product State
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, stockQuantity: 0 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStock = async (id: string, newQuantity: number) => {
    try {
      await api.patch(`/products/${id}`, { stockQuantity: Number(newQuantity) });
      setProducts(products.map(p => p.id === id ? { ...p, stockQuantity: Number(newQuantity) } : p));
    } catch (err) {
      alert('Falha ao atualizar estoque');
    }
  };

  const handleBatchUpdate = async () => {
    try {
      await api.patch('/products/batch', {
        type: batchType,
        value: Number(batchValue),
        stockAdjustment: Number(stockAdjustment)
      });
      alert('Atualização em lote realizada!');
      setShowBatchModal(false);
      fetchProducts();
    } catch (err) {
      alert('Falha na atualização em lote');
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/products', newProduct);
      alert('Produto criado com sucesso!');
      setShowCreateModal(false);
      setNewProduct({ name: '', price: 0, stockQuantity: 0 });
      fetchProducts();
    } catch (err: any) {
      alert(`Falha ao criar produto: ${err.response?.data?.message || err.message}`);
    }
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
                    <h1 className="text-2xl font-black uppercase tracking-tight leading-none">ESTOQUE</h1>
                    <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1">Gerenciamento Geral</p>
                 </div>
             </div>
             <div className="flex gap-2">
                 <button 
                     onClick={() => setShowCreateModal(true)}
                     className="bg-green-600 text-white p-3 rounded-2xl shadow-lg shadow-green-900/20 active:scale-95 transition-all"
                     title="Novo Produto"
                 >
                     <Plus size={20} strokeWidth={3} />
                 </button>
                 <button 
                     onClick={() => setShowBatchModal(true)}
                     className="bg-white text-[var(--primary-color)] p-3 rounded-2xl shadow-lg active:scale-95 transition-all"
                     title="Ajuste em Lote"
                 >
                     <TrendingUp size={20} strokeWidth={3} />
                 </button>
             </div>
         </div>
      </header>

      {/* Overlapping Content */}
      <main className="px-6 -mt-16 relative z-10 space-y-6">
        
        {/* Search Bar */}
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
                type="text"
                placeholder="Pesquisar no estoque..."
                className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-xl focus:ring-2 focus:ring-white/20 transition-all font-bold text-gray-900 placeholder:text-gray-300"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="space-y-4">
            {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-[2rem] p-4 sm:p-5 shadow-sm border border-gray-50 group hover:border-[var(--primary-color)]/20 transition-all overflow-hidden">
                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-blue-50 flex items-center justify-center text-[var(--primary-color)]">
                                <Package size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-black text-gray-800 uppercase tracking-tight text-base sm:text-lg leading-tight truncate">{product.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Preço</span>
                                    <span className="text-sm font-bold text-[var(--primary-color)]">R$ {Number(product.price).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 p-1.5 sm:p-2 rounded-2xl border border-gray-100 shrink-0">
                            <div className="text-center px-1 sm:px-2 border-r border-gray-200 pr-2 sm:pr-3">
                                <p className="text-[8px] sm:text-[9px] font-black text-gray-400 uppercase leading-none mb-1">Atual</p>
                                <p className="text-base sm:text-xl font-black text-gray-800 leading-none">{product.stockQuantity}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-[8px] sm:text-[9px] font-black text-[var(--primary-color)] uppercase leading-none mb-1">Novo</p>
                                <div className="relative group/input">
                                    <input 
                                        type="number" 
                                        className="w-14 h-10 sm:w-20 sm:h-12 bg-white border-2 border-gray-100 focus:border-[var(--primary-color)] rounded-xl text-center font-black text-gray-900 shadow-sm outline-none transition-all"
                                        defaultValue={product.stockQuantity}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleUpdateStock(product.id, Number((e.target as HTMLInputElement).value));
                                                (e.target as HTMLInputElement).blur();
                                            }
                                        }}
                                        onChange={(e) => {
                                            const btn = document.getElementById(`save-btn-${product.id}`);
                                            if (btn) {
                                                if (Number(e.target.value) !== product.stockQuantity) {
                                                    btn.style.display = 'flex';
                                                } else {
                                                    btn.style.display = 'none';
                                                }
                                            }
                                        }}
                                        placeholder="--"
                                    />
                                    <button 
                                        id={`save-btn-${product.id}`}
                                        onClick={(e) => {
                                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                            handleUpdateStock(product.id, Number(input.value));
                                            e.currentTarget.style.display = 'none';
                                        }}
                                        className="absolute -right-2 -top-2 w-6 h-6 bg-green-500 text-white rounded-full hidden items-center justify-center shadow-lg hover:bg-green-600 transition-colors animate-in zoom-in"
                                    >
                                        <Plus size={14} strokeWidth={4} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
            {filteredProducts.length === 0 && (
                <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                    <Package size={48} className="mx-auto mb-4 text-gray-100" />
                    <p className="text-gray-400 font-black uppercase tracking-tight">Estoque Vazio</p>
                    <button 
                        onClick={() => setShowCreateModal(true)}
                        className="mt-4 text-[var(--primary-color)] font-black text-xs uppercase tracking-widest"
                    >
                        Cadastrar Primeiro Produto
                    </button>
                </div>
            )}
        </div>
      </main>

      {/* Modals - Using updated styles */}
      {showCreateModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                  <h3 className="text-2xl font-black mb-8 text-gray-800 uppercase tracking-tighter">Novo Produto</h3>
                  <form onSubmit={handleCreateProduct} className="space-y-6">
                      <div className="space-y-1.5">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nome do Produto</label>
                          <input 
                              required
                              value={newProduct.name}
                              onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                              className="w-full bg-gray-50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-2xl p-4 text-gray-900 font-bold transition-all outline-none placeholder:text-gray-300"
                              placeholder="Ex: Parafuso M8"
                          />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Preço (R$)</label>
                            <input 
                                required
                                type="number"
                                step="0.01"
                                value={newProduct.price}
                                onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-2xl p-4 text-gray-900 font-bold transition-all outline-none placeholder:text-gray-300"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Qtd Inicial</label>
                            <input 
                                required
                                type="number"
                                value={newProduct.stockQuantity}
                                onChange={e => setNewProduct({...newProduct, stockQuantity: Number(e.target.value)})}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-2xl p-4 text-gray-900 font-bold transition-all outline-none placeholder:text-gray-300"
                                placeholder="0"
                            />
                        </div>
                      </div>
                      <div className="flex gap-4 pt-4">
                          <button 
                              type="button"
                              onClick={() => setShowCreateModal(false)}
                              className="flex-1 px-4 py-4 border-2 border-gray-100 rounded-2xl font-black text-gray-400 uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors"
                          >
                              Cancelar
                          </button>
                          <button 
                              type="submit"
                              className="flex-1 px-4 py-4 bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-lg shadow-green-500/20"
                          >
                              Criar
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* Batch Update Modal */}
      {showBatchModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                  <h3 className="text-2xl font-black mb-8 text-gray-800 uppercase tracking-tighter">Ajuste em Lote</h3>
                  
                  <div className="space-y-6">
                      <div className="space-y-1.5">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Tipo de Ajuste</label>
                          <select 
                              value={batchType} 
                              onChange={e => setBatchType(e.target.value)}
                              className="w-full bg-gray-50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-2xl p-4 text-gray-900 font-bold transition-all outline-none appearance-none cursor-pointer"
                          >
                              <option value="PERCENTAGE">Porcentagem (%)</option>
                              <option value="FIXED">Valor Fixo (R$)</option>
                          </select>
                      </div>

                      <div className="space-y-1.5">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                              {batchType === 'PERCENTAGE' ? 'Valor (+ ou - %)' : 'Valor (+ ou - R$)'}
                          </label>
                          <input 
                              type="number" 
                              value={batchValue} 
                              onChange={e => setBatchValue(Number(e.target.value))}
                              className="w-full bg-gray-50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-2xl p-4 text-gray-900 font-bold transition-all outline-none"
                              placeholder="0"
                          />
                      </div>


                      <div className="flex gap-4 pt-4">
                          <button 
                              onClick={() => setShowBatchModal(false)}
                              className="flex-1 px-4 py-4 border-2 border-gray-100 rounded-2xl font-black text-gray-400 uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors"
                          >
                              Cancelar
                          </button>
                          <button 
                              onClick={handleBatchUpdate}
                              className="flex-1 px-4 py-4 bg-[var(--primary-color)] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-lg shadow-blue-500/20"
                          >
                              Aplicar
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}

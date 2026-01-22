"use client";
import React, { useEffect, useState } from 'react';
import api from '@/api/api';
import { useAuth } from '@/context/AuthContext';
import { useWhitelabel } from '@/context/WhitelabelContext';
import Link from 'next/link';
import { Package, AlertTriangle, Clock, Settings, BarChart3, Plus, Lock, LogOut } from 'lucide-react';
import ChangePasswordModal from '@/components/ui/ChangePasswordModal';

interface ConsumptionItem {
  id: string;
  product: { name: string };
  user: { name: string; id: string };
  quantity: number;
  status: string;
}

interface Metrics {
  totalProducts: number;
  lowStockCount: number;
  pendingConsumptions: number;
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { config } = useWhitelabel();
  const [pendingItems, setPendingItems] = useState<ConsumptionItem[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    fetchPending();
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
        const res = await api.get('/metrics/dashboard');
        setMetrics(res.data);
    } catch (err) {
        console.error("Failed to load metrics", err);
    }
  };

  const fetchPending = async () => {
    try {
      const res = await api.get('/consumption/all');
      setPendingItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async (userId: string) => {
    if(!confirm('Confirmar baixa para este usuário? Isso atualizará o estoque.')) return;
    try {
      await api.post(`/consumption/checkout/${userId}`);
      fetchPending();
      fetchMetrics();
      alert('Baixa realizada com sucesso!');
    } catch (err) {
      alert('Falha ao processar baixa');
    }
  };

  // Group by user
  const groupedItems = pendingItems.reduce((acc, item) => {
    if (!acc[item.user.id]) {
        acc[item.user.id] = { name: item.user.name, items: [] };
    }
    acc[item.user.id].items.push(item);
    return acc;
  }, {} as Record<string, { name: string, items: ConsumptionItem[] }>);

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24 font-sans text-[var(--foreground)]">
      {/* Header */}
      <header className="bg-[var(--primary-color)] pt-12 pb-24 px-6 rounded-b-[2.5rem] shadow-lg relative z-0">
         <div className="flex justify-between items-center mb-6">
             <div className="text-white">
                 <p className="text-blue-100 text-sm font-medium">Bem vindo(a),</p>
                 <h1 className="text-2xl font-bold">{user?.name}</h1>
             </div>
             <div className="flex items-center gap-2">
                  <button 
                      onClick={() => setIsPasswordModalOpen(true)}
                      className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all active:scale-90"
                      title="Trocar Senha"
                  >
                      <Lock size={20} strokeWidth={2.5} />
                  </button>
                  <button 
                      onClick={logout}
                      className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all active:scale-90"
                      title="Sair"
                  >
                      <LogOut size={20} strokeWidth={2.5} />
                  </button>
                  {config?.logoUrl ? (
                      <img src={config.logoUrl} alt="Logo" className="w-10 h-10 rounded-xl bg-white/20 p-1 object-contain" />
                  ) : (
                     <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold">
                         {user?.name?.substring(0,1).toUpperCase() || 'U'}
                     </div>
                  )}
             </div>
         </div>
      </header>

      {/* Main Content (Overlapping Header) */}
      <main className="px-6 -mt-16 relative z-10 space-y-6">
        
        {/* Metrics Cards */}
        {metrics && (
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                        <Package size={24} className="text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Produtos</h3>
                        <p className="text-2xl font-black text-gray-800 leading-none">{metrics.totalProducts}</p>
                    </div>
                </div>
                
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                        <Clock size={24} className="text-orange-500" />
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Pendentes</h3>
                        <p className="text-2xl font-black text-gray-800 leading-none">{metrics.pendingConsumptions}</p>
                    </div>
                </div>
            </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
            <Link href="/admin/stock" className="bg-white rounded-[2rem] p-4 py-6 shadow-sm border border-gray-100 active:scale-[0.95] transition-transform flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <Package size={24} className="text-[var(--primary-color)]" />
                </div>
                <span className="font-extrabold text-[11px] text-gray-800 uppercase tracking-tighter leading-tight">Gerenciar<br/>Estoque</span>
            </Link>
            
            <Link href="/admin/consume" className="bg-white rounded-[2rem] p-4 py-6 shadow-sm border border-gray-100 active:scale-[0.95] transition-transform flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                    <Plus size={24} className="text-purple-600" />
                </div>
                <span className="font-extrabold text-[11px] text-gray-800 uppercase tracking-tighter leading-tight">Consumir<br/>Produto</span>
            </Link>
            
            <Link href="/admin/inventory" className="bg-white rounded-[2rem] p-4 py-6 shadow-sm border border-gray-100 active:scale-[0.95] transition-transform flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                    <BarChart3 size={24} className="text-green-600" />
                </div>
                <span className="font-extrabold text-[11px] text-gray-800 uppercase tracking-tighter leading-tight">Contagem<br/>Física</span>
            </Link>
        </div>

        {/* Pending Consumptions */}
        <div className="pt-2">
            <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">Consumos Pendentes</h2>
                <div className="h-px bg-gray-100 flex-1 ml-4"></div>
            </div>
            
            {Object.keys(groupedItems).length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-12 text-center shadow-sm border border-gray-50">
                    <Clock size={48} className="mx-auto mb-3 text-gray-100" />
                    <p className="text-gray-400 font-bold text-sm uppercase tracking-tight">Tudo limpo por aqui!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {Object.entries(groupedItems).map(([userId, { name, items }]) => (
                        <div key={userId} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 group hover:border-[var(--primary-color)]/20 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="font-black text-xl text-gray-800 uppercase tracking-tighter">{name}</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                        {items.length} itens • {items.reduce((s, i) => s + i.quantity, 0)} un. total
                                    </p>
                                </div>
                                <button 
                                    onClick={() => handleCheckout(userId)}
                                    className="bg-red-600 text-white px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20 active:scale-95"
                                >
                                    Processar
                                </button>
                            </div>
                            <div className="space-y-3 bg-gray-50/50 p-4 rounded-2xl">
                                {items.map(item => (
                                    <div key={item.id} className="flex justify-between items-center group-hover:bg-white p-1 rounded-lg transition-colors">
                                        <span className="text-sm font-bold text-gray-600 uppercase tracking-tight">{item.product.name}</span>
                                        <span className="font-black text-gray-800 bg-white px-2 py-0.5 rounded-lg shadow-sm border border-gray-100">x{item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </main>
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
      />
    </div>
  );
}

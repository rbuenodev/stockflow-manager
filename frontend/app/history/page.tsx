"use client";
import React, { useEffect, useState } from 'react';
import api from '@/api/api';
import BottomNav from '@/components/layout/BottomNav';
import { useAuth } from '@/context/AuthContext';
import { useWhitelabel } from '@/context/WhitelabelContext';
import { Clock, CheckCircle2, AlertCircle, ShoppingBag } from 'lucide-react';

interface ConsumptionItem {
  id: string;
  product: { name: string };
  quantity: number;
  status: string;
  createdAt?: string;
}

export default function HistoryPage() {
  const { user } = useAuth();
  const { config } = useWhitelabel();
  const [consumption, setConsumption] = useState<ConsumptionItem[]>([]);

  useEffect(() => {
    fetchConsumption();
  }, []);

  const fetchConsumption = async () => {
    try {
      const res = await api.get('/consumption/my');
      setConsumption(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PENDING':
        return (
          <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-yellow-100 italic">
            <Clock size={12} strokeWidth={3} />
            PENDENTE
          </span>
        );
      case 'PROCESSED':
        return (
          <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-green-100 italic">
            <CheckCircle2 size={12} strokeWidth={3} />
            EFETUADO
          </span>
        );
      default:
        return (
          <span className="bg-gray-50 text-gray-500 px-2 py-1 rounded-lg text-[10px] font-bold border border-gray-100 italic">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24 font-sans text-[var(--foreground)]">
      {/* Header - Matching Stock/Dashboard Style */}
      <header className="bg-[var(--primary-color)] pt-12 pb-24 px-6 rounded-b-[2.5rem] shadow-lg relative z-0">
         <div>
            <h1 className="text-2xl font-black uppercase tracking-tight leading-none text-white">MEU HISTÓRICO</h1>
            <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1 italic opacity-80">Registros de consumo</p>
         </div>
      </header>

      <main className="px-6 -mt-16 relative z-10 max-w-lg mx-auto">
        {consumption.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 shadow-xl">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag size={32} className="text-gray-200" />
                </div>
                <p className="text-gray-400 font-black uppercase tracking-tight">Vazio por enquanto</p>
                <p className="text-gray-300 font-bold text-[10px] uppercase tracking-widest mt-1">Seus consumos aparecerão aqui</p>
            </div>
        ) : (
            <div className="space-y-4">
                {consumption.map(item => (
                    <div key={item.id} className="bg-white p-5 rounded-[2rem] shadow-xl border border-gray-50 flex justify-between items-center group active:scale-[0.98] transition-transform overflow-hidden">
                        <div className="flex flex-col gap-1 flex-1 min-w-0 pr-4">
                             <span className="font-black text-gray-800 text-lg sm:text-xl leading-none uppercase tracking-tighter truncate">{item.product.name}</span>
                             <div className="flex items-center gap-1.5 mt-0.5">
                                <Clock size={12} className="text-gray-300" />
                                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }) : 'Recentemente'}
                                </span>
                             </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                             <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Qtd</span>
                                <span className="font-black text-2xl text-[var(--primary-color)] leading-none">x{item.quantity}</span>
                             </div>
                             {getStatusBadge(item.status)}
                        </div>
                    </div>
                ))}
            </div>
        )}
      </main>

      <BottomNav isAdmin={user?.role === 'ADMIN' || user?.role === 'SUPERADMIN'} />
    </div>
  );
}

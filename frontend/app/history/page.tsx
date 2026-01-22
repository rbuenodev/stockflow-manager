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
      <header className="bg-white px-6 py-8 shadow-sm sticky top-0 z-30 border-b border-gray-100 rounded-b-[2rem]">
         <h1 className="text-2xl font-black text-gray-800 tracking-tight">MEU HISTÓRICO</h1>
         <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Registros de consumo</p>
      </header>

      <main className="px-6 py-6 max-w-lg mx-auto">
        {consumption.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag size={32} className="text-gray-200" />
                </div>
                <p className="text-gray-400 font-bold">Nenhum registro ainda</p>
                <p className="text-gray-300 text-xs mt-1">Seus consumos aparecerão aqui</p>
            </div>
        ) : (
            <div className="space-y-4">
                {consumption.map(item => (
                    <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group active:scale-[0.98] transition-transform">
                        <div className="flex flex-col gap-0.5">
                             <span className="font-extrabold text-gray-800 text-lg leading-tight uppercase tracking-tight">{item.product.name}</span>
                             <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                                <Clock size={12} />
                                {item.createdAt ? new Date(item.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }) : 'Recentemente'}
                             </span>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                             <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-black text-gray-400">QTD</span>
                                <span className="font-black text-xl text-[var(--primary-color)]">x{item.quantity}</span>
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

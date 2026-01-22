"use client";
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useWhitelabel } from '@/context/WhitelabelContext';
import { Settings, Users, Palette, LogOut, ShieldCheck } from 'lucide-react';

export default function SuperAdminDashboard() {
  const { user, logout } = useAuth();
  const { config } = useWhitelabel();

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24 font-sans text-[var(--foreground)]">
      {/* Header */}
      <header className="bg-[var(--primary-color)] pt-12 pb-24 px-6 rounded-b-[2.5rem] shadow-lg relative z-0">
         <div className="flex justify-between items-center mb-6">
             <div className="text-white">
                 <p className="text-blue-100 text-sm font-medium">Painel Master</p>
                 <h1 className="text-2xl font-bold">Olá, {user?.name}</h1>
             </div>
             <div className="flex items-center gap-3">
                 <button 
                     onClick={logout}
                     className="text-white/80 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors"
                 >
                     <LogOut size={16} />
                     Sair
                 </button>
                 <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/10">
                     <ShieldCheck size={20} />
                 </div>
             </div>
         </div>
      </header>

      {/* Main Content (Overlapping Header) */}
      <main className="px-6 -mt-16 relative z-10 space-y-8 max-w-4xl mx-auto">
        
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/superadmin/users" className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 active:scale-[0.98] transition-all hover:shadow-2xl group">
                <div className="flex flex-col items-center text-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                        <Users size={40} className="text-[var(--primary-color)] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Gerenciar Usuários</h3>
                        <p className="text-sm text-gray-500">Adicione, edite ou remova contas de acesso ao sistema.</p>
                    </div>
                </div>
            </Link>
            
            <Link href="/superadmin/whitelabel" className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 active:scale-[0.98] transition-all hover:shadow-2xl group">
                <div className="flex flex-col items-center text-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                        <Palette size={40} className="text-purple-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Identidade Visual</h3>
                        <p className="text-sm text-gray-500">Personalize cores, logos e o nome da sua plataforma.</p>
                    </div>
                </div>
            </Link>
        </div>

        {/* Info Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-[2rem] p-8 border border-white/50 shadow-sm text-center">
            <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Configuração Global</h2>
            <p className="text-gray-600 font-medium">Você está operando no modo Super Administrador.</p>
            <p className="text-gray-400 text-sm mt-1">Todas as alterações afetarão o sistema globalmente.</p>
        </div>
      </main>
    </div>
  );
}

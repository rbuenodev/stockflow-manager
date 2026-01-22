"use client";
import React, { useState, useEffect } from 'react';
import api from '@/api/api';
import { useAuth } from '@/context/AuthContext';
import { useWhitelabel } from '@/context/WhitelabelContext';
import { Mail, Lock, ArrowRight, AlertCircle, Loader2, Check } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { config } = useWhitelabel();

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.access_token, res.data.user);
    } catch (err: any) {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)] relative overflow-hidden font-sans">
      {/* Dynamic Background Orbs */}
      <div 
        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 animate-pulse"
        style={{ backgroundColor: config?.primaryColor || '#2563eb' }}
      />
      <div 
        className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 animate-pulse"
        style={{ backgroundColor: config?.secondaryColor || '#64748b' }}
      />

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-10 shadow-2xl border border-white/20">
            <div className="flex flex-col items-center mb-10">
                {config?.logoUrl ? (
                    <div className="p-4 bg-white rounded-3xl shadow-sm mb-4">
                        <img src={config.logoUrl} alt="Logo" className="h-12 w-auto object-contain" />
                    </div>
                ) : (
                    <div className="w-16 h-16 rounded-[1.5rem] bg-[var(--primary-color)] flex items-center justify-center text-white mb-4 shadow-lg shadow-[var(--primary-color)]/20">
                        <span className="text-3xl font-black">{config?.name?.charAt(0) || 'S'}</span>
                    </div>
                )}
                <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter text-center leading-none">
                    {config?.name || 'STOCKFLOW'}
                </h1>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2">Acesse sua conta</p>
            </div>
            
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 text-left">
                    <AlertCircle className="text-red-500 shrink-0" size={18} />
                    <p className="text-xs font-bold text-red-600 leading-tight">{error}</p>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">E-mail Corporativo</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-50/50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-900 font-bold transition-all outline-none placeholder:text-gray-300 shadow-inner"
                            placeholder="ex: voce@empresa.com"
                        />
                    </div>
                </div>

                <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sua Senha</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50/50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-900 font-bold transition-all outline-none placeholder:text-gray-300 shadow-inner"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-start ml-1">
                    <button 
                        type="button"
                        onClick={() => setRememberMe(!rememberMe)}
                        className="flex items-center gap-2 group cursor-pointer"
                    >
                        <div className={`w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${
                            rememberMe 
                            ? 'bg-[var(--primary-color)] border-[var(--primary-color)] shadow-lg shadow-[var(--primary-color)]/20' 
                            : 'bg-gray-50 border-gray-200'
                        }`}>
                            {rememberMe && <Check size={12} className="text-white" strokeWidth={4} />}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                            rememberMe ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-500'
                        }`}>
                            Lembrar meu usuário
                        </span>
                    </button>
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-[var(--primary-color)] text-white rounded-[1.5rem] py-5 font-black uppercase tracking-[0.15em] text-xs shadow-xl shadow-[var(--primary-color)]/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>
                            Entrar no Sistema
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" strokeWidth={3} />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center text-left">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-relaxed">
                    © {new Date().getFullYear()} {config?.name || 'StockFlow'}<br/>
                    Sistema de Gestão de Fluxo
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}

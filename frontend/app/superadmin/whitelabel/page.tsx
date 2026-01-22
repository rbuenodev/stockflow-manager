"use client";
import React, { useEffect, useState } from 'react';
import api from '@/api/api';
import Link from 'next/link';
import { useWhitelabel } from '@/context/WhitelabelContext';
import { ArrowLeft, Palette, Save, Globe, Type, Image as ImageIcon } from 'lucide-react';

export default function WhitelabelConfig() {
  const configContext = useWhitelabel();
  const config = configContext.config;
  const [formData, setFormData] = useState({
    name: '',
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    logoUrl: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (config) {
        setFormData({
            name: config.name || '',
            primaryColor: config.primaryColor || '#2563eb',
            secondaryColor: config.secondaryColor || '#64748b',
            logoUrl: config.logoUrl || ''
        });
    }
  }, [config]);

  const handleSave = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
        await api.patch('/whitelabel', formData);
        await configContext.refreshConfig(); 
        alert('Configuração salva com sucesso!');
    } catch (err: any) {
        console.error('Error saving whitelabel:', err);
        alert(`Falha ao salvar: ${err.response?.data?.message || err.message}`);
    } finally {
        setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24 font-sans text-[var(--foreground)]">
      {/* Header - Premium Style */}
      <header className="bg-[var(--primary-color)] pt-12 pb-24 px-6 rounded-b-[2.5rem] shadow-lg relative z-0">
         <div className="max-w-4xl mx-auto flex items-start justify-between">
             <div className="flex items-center gap-4 text-white">
                 <Link href="/superadmin" className="hover:opacity-80 transition-opacity">
                     <ArrowLeft size={24} strokeWidth={3} />
                 </Link>
                 <div>
                    <h1 className="text-2xl font-black uppercase tracking-tight leading-none">IDENTIDADE</h1>
                    <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1">Configurações Visuais</p>
                 </div>
             </div>
             <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-white text-[var(--primary-color)] px-5 py-3 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center gap-2 font-black text-xs uppercase tracking-widest disabled:opacity-50"
             >
                <Save size={18} strokeWidth={3} />
                <span>{saving ? '...' : 'Salvar'}</span>
             </button>
         </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 -mt-16 relative z-10">
        <form onSubmit={handleSave} className="space-y-6">
            {/* System Name Section */}
            <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 group hover:border-[var(--primary-color)]/10 transition-all">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <Type size={24} strokeWidth={3} />
                    </div>
                    <h2 className="text-xl font-black text-gray-800 uppercase tracking-tighter leading-tight">Nome da Plataforma</h2>
                </div>
                
                <div className="space-y-1.5">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nome de Exibição</label>
                    <input 
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-2xl py-4 px-6 text-gray-900 font-bold transition-all outline-none placeholder:text-gray-300" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        placeholder="Ex: StockFlow Manager"
                    />
                </div>
            </section>

            {/* Colors Section */}
            <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 group hover:border-[var(--primary-color)]/10 transition-all">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                        <Palette size={24} strokeWidth={3} />
                    </div>
                    <h2 className="text-xl font-black text-gray-800 uppercase tracking-tighter leading-tight">Esquema de Cores</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Primary Color */}
                    <div className="space-y-3 p-4 bg-gray-50 rounded-3xl border border-gray-100">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cor Primária</label>
                        <div className="flex gap-3 items-center">
                            <div className="relative shrink-0">
                                <input 
                                    type="color" 
                                    value={formData.primaryColor} 
                                    onChange={e => setFormData({...formData, primaryColor: e.target.value})} 
                                    className="h-12 w-12 rounded-xl border-none cursor-pointer absolute opacity-0"
                                />
                                <div 
                                    className="h-12 w-12 rounded-xl border-2 border-white shadow-sm"
                                    style={{ backgroundColor: formData.primaryColor }}
                                />
                            </div>
                            <input 
                                type="text" 
                                value={formData.primaryColor} 
                                onChange={e => setFormData({...formData, primaryColor: e.target.value})} 
                                className="bg-white border-2 border-transparent focus:border-[var(--primary-color)] rounded-xl py-3 px-4 flex-1 font-mono text-xs text-gray-900 font-black outline-none transition-all shadow-inner"
                                placeholder="#2563eb"
                            />
                        </div>
                        <p className="text-[8px] text-gray-400 font-black uppercase px-1 tracking-widest text-center">Base do Sistema</p>
                    </div>

                    {/* Secondary Color */}
                    <div className="space-y-3 p-4 bg-gray-50 rounded-3xl border border-gray-100">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cor Secundária</label>
                        <div className="flex gap-3 items-center">
                            <div className="relative shrink-0">
                                <input 
                                    type="color" 
                                    value={formData.secondaryColor} 
                                    onChange={e => setFormData({...formData, secondaryColor: e.target.value})} 
                                    className="h-12 w-12 rounded-xl border-none cursor-pointer absolute opacity-0"
                                />
                                <div 
                                    className="h-12 w-12 rounded-xl border-2 border-white shadow-sm"
                                    style={{ backgroundColor: formData.secondaryColor }}
                                />
                            </div>
                            <input 
                                type="text" 
                                value={formData.secondaryColor} 
                                onChange={e => setFormData({...formData, secondaryColor: e.target.value})} 
                                className="bg-white border-2 border-transparent focus:border-[var(--primary-color)] rounded-xl py-3 px-4 flex-1 font-mono text-xs text-gray-900 font-black outline-none transition-all shadow-inner"
                                placeholder="#64748b"
                            />
                        </div>
                        <p className="text-[8px] text-gray-400 font-black uppercase px-1 tracking-widest text-center">Visual Auxiliar</p>
                    </div>
                </div>
            </section>

            {/* Logo Section */}
            <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 group hover:border-[var(--primary-color)]/10 transition-all">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                        <Globe size={24} strokeWidth={3} />
                    </div>
                    <h2 className="text-xl font-black text-gray-800 uppercase tracking-tighter leading-tight">Logotipo</h2>
                </div>
                
                <div className="space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">URL da Imagem</label>
                        <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                            <input 
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-900 font-bold transition-all outline-none placeholder:text-gray-300" 
                                value={formData.logoUrl} 
                                onChange={e => setFormData({...formData, logoUrl: e.target.value})} 
                                placeholder="https://exemplo.com/logo.png"
                            />
                        </div>
                    </div>
                    
                    {formData.logoUrl && (
                        <div className="p-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center">
                            <span className="text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Prévia em Tempo Real</span>
                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <img src={formData.logoUrl} alt="Logo Preview" className="h-12 w-auto object-contain" onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }} />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </form>
      </main>
    </div>
  );
}

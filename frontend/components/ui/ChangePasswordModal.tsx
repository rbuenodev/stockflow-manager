import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';
import api from '@/api/api';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    setLoading(true);
    try {
      await api.patch('/users/profile', { password: newPassword });
      alert("Senha alterada com sucesso!");
      onClose();
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      alert("Falha ao alterar senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="bg-white rounded-[2.5rem] w-full max-w-sm p-8 relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
        <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
            <X size={24} />
        </button>

        <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[var(--primary-color)] mb-4">
                <Lock size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Trocar Senha</h3>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Sua nova credencial</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nova Senha</label>
                <input 
                    required
                    type="password"
                    autoFocus
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-2xl py-4 px-6 text-gray-900 font-bold transition-all outline-none placeholder:text-gray-300"
                    placeholder="••••••••"
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirmar Senha</label>
                <input 
                    required
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-2xl py-4 px-6 text-gray-900 font-bold transition-all outline-none placeholder:text-gray-300"
                    placeholder="••••••••"
                />
            </div>

            <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--primary-color)] text-white font-black py-4 rounded-2xl text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
                {loading ? 'Salvando...' : 'Atualizar Senha'}
            </button>
        </form>
      </div>
    </div>
  );
}

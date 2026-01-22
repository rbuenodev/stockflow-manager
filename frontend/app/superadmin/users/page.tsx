"use client";
import React, { useEffect, useState } from 'react';
import api from '@/api/api';
import Link from 'next/link';
import { Trash2, UserPlus, ArrowLeft, Search, User as UserIcon, Mail, Shield, Users, Lock } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  organizationId?: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER'
  });

  // Password Reset State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Deseja realmente excluir este usuário?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      alert("Falha ao excluir usuário");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/users', formData);
      setShowModal(false);
      setFormData({ name: '', email: '', password: '', role: 'USER' });
      fetchUsers();
    } catch (err) {
      alert("Falha ao criar usuário");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      await api.patch(`/users/${selectedUser.id}`, { password: newPassword });
      setShowPasswordModal(false);
      setNewPassword('');
      setSelectedUser(null);
      alert("Senha alterada com sucesso!");
    } catch (err) {
      alert("Falha ao alterar senha");
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24 font-sans text-[var(--foreground)]">
      {/* Header - Premium Style */}
      <header className="bg-[var(--primary-color)] pt-12 pb-24 px-6 rounded-b-[2.5rem] shadow-lg relative z-0">
         <div className="max-w-6xl mx-auto flex items-start justify-between">
             <div className="flex items-center gap-4 text-white">
                 <Link href="/superadmin" className="hover:opacity-80 transition-opacity">
                     <ArrowLeft size={24} strokeWidth={3} />
                 </Link>
                 <div>
                    <h1 className="text-2xl font-black uppercase tracking-tight leading-none">USUÁRIOS</h1>
                    <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1">{users.length} Cadastrados</p>
                 </div>
             </div>
             <button 
                onClick={() => setShowModal(true)}
                className="bg-white text-[var(--primary-color)] p-3 rounded-2xl shadow-lg active:scale-95 transition-all"
                title="Novo Usuário"
             >
                <UserPlus size={20} strokeWidth={3} />
             </button>
         </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-16 relative z-10 space-y-6">
        {/* Search Bar */}
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
                type="text"
                placeholder="Buscar por nome ou email..."
                className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-xl focus:ring-2 focus:ring-white/20 transition-all font-bold text-gray-900 placeholder:text-gray-300"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Users List */}
        <div className="space-y-4">
            {filteredUsers.map(user => (
                <div key={user.id} className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-50 flex items-center justify-between gap-4 group hover:border-[var(--primary-color)]/20 transition-all">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[var(--primary-color)] font-black text-xl shrink-0">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-black text-gray-800 uppercase tracking-tight text-lg leading-tight truncate">{user.name}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <Mail size={12} className="text-gray-400" />
                                <span className="text-xs font-bold text-gray-400 truncate">{user.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                        <span className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            user.role === 'SUPERADMIN' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                            user.role === 'ADMIN' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                            'bg-gray-50 text-gray-500 border border-gray-100'
                        }`}>
                            <Shield size={12} strokeWidth={3} />
                            {user.role}
                        </span>

                        {user.role !== 'SUPERADMIN' && (
                            <div className="flex items-center gap-1">
                                <button 
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setShowPasswordModal(true);
                                    }}
                                    className="p-3 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-2xl transition-all active:scale-95"
                                    title="Trocar Senha"
                                >
                                    <Lock size={20} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(user.id)}
                                    className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all active:scale-95"
                                    title="Excluir Usuário"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            
            {filteredUsers.length === 0 && (
                <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                    <Users size={48} className="mx-auto mb-4 text-gray-100" />
                    <p className="text-gray-400 font-black uppercase tracking-tight">Vazio</p>
                </div>
            )}
        </div>
      </main>

      {/* Modern Modal */}
      {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-4 mb-8">
                      <div className="p-4 bg-green-50 rounded-[1.5rem] text-green-600">
                          <UserPlus size={24} strokeWidth={3} />
                      </div>
                      <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Novo Usuário</h3>
                  </div>

                  <form onSubmit={handleCreate} className="space-y-6">
                      <div className="space-y-1.5">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nome Completo</label>
                          <div className="relative">
                              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                              <input 
                                  required
                                  value={formData.name}
                                  onChange={e => setFormData({...formData, name: e.target.value})}
                                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-900 font-bold transition-all outline-none placeholder:text-gray-300"
                                  placeholder="Ex: João Silva"
                              />
                          </div>
                      </div>

                      <div className="space-y-1.5">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">E-mail</label>
                          <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                              <input 
                                  required
                                  type="email"
                                  value={formData.email}
                                  onChange={e => setFormData({...formData, email: e.target.value})}
                                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-900 font-bold transition-all outline-none placeholder:text-gray-300"
                                  placeholder="exemplo@email.com"
                              />
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Senha</label>
                            <input 
                                required
                                type="password"
                                value={formData.password}
                                onChange={e => setFormData({...formData, password: e.target.value})}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-2xl py-4 px-6 text-gray-900 font-bold transition-all outline-none placeholder:text-gray-300"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Papel</label>
                            <select 
                                value={formData.role}
                                onChange={e => setFormData({...formData, role: e.target.value})}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-[var(--primary-color)] focus:bg-white rounded-2xl py-4 px-6 text-gray-900 font-bold transition-all outline-none appearance-none cursor-pointer"
                            >
                                <option value="USER">Comum</option>
                                <option value="ADMIN">Admin</option>
                                <option value="SUPERADMIN">Super</option>
                            </select>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                          <button 
                              type="button"
                              onClick={() => setShowModal(false)}
                              className="flex-1 px-4 py-4 border-2 border-gray-100 rounded-2xl font-black text-gray-400 uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors"
                          >
                              Cancelar
                          </button>
                          <button 
                              type="submit"
                              className="flex-1 px-4 py-4 bg-[var(--primary-color)] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-lg"
                          >
                              Criar
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* Password Reset Modal */}
      {showPasswordModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-4 mb-8">
                      <div className="p-4 bg-gray-50 rounded-[1.5rem] text-[var(--primary-color)]">
                          <Lock size={24} strokeWidth={3} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Alterar Senha</h3>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{selectedUser?.name}</p>
                      </div>
                  </div>

                  <form onSubmit={handleResetPassword} className="space-y-6">
                      <div className="space-y-1.5">
                          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nova Senha</label>
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

                      <div className="flex gap-4 pt-4">
                          <button 
                              type="button"
                              onClick={() => {
                                setShowPasswordModal(false);
                                setNewPassword('');
                              }}
                              className="flex-1 px-4 py-4 border-2 border-gray-100 rounded-2xl font-black text-gray-400 uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors"
                          >
                              Cancelar
                          </button>
                          <button 
                              type="submit"
                              className="flex-1 px-4 py-4 bg-[var(--primary-color)] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-lg"
                          >
                              Salvar
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  )
}

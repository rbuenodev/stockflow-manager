"use client";
import React from 'react';
import { Home, History, Settings, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BottomNavProps {
    isAdmin?: boolean;
}

export default function BottomNav({ isAdmin }: BottomNavProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 px-6 py-3 flex justify-between items-center pb-safe z-40">
      <Link 
        href="/dashboard" 
        className={`flex flex-col items-center gap-1 transition-colors ${isActive('/dashboard') ? 'text-[var(--primary-color)]' : 'text-gray-400'}`}
      >
        <Home size={24} strokeWidth={isActive('/dashboard') ? 2.5 : 2} />
        <span className={`text-[10px] font-bold ${isActive('/dashboard') ? 'opacity-100' : 'opacity-70'}`}>Início</span>
      </Link>
      
      {/* Floating Action Button (Center) */}
      <div className="relative -top-8">
        <Link 
            href="/dashboard" 
            className="flex items-center justify-center w-14 h-14 bg-[var(--primary-color)] rounded-full text-white shadow-xl shadow-blue-500/30 border-4 border-[#f8fafc] active:scale-90 transition-transform"
        >
            <Plus size={28} strokeWidth={3} />
        </Link>
      </div>

      <div className="flex gap-10">
          <Link 
            href="/history" 
            className={`flex flex-col items-center gap-1 transition-colors ${isActive('/history') ? 'text-[var(--primary-color)]' : 'text-gray-400'}`}
          >
            <History size={24} strokeWidth={isActive('/history') ? 2.5 : 2} />
            <span className={`text-[10px] font-bold ${isActive('/history') ? 'opacity-100' : 'opacity-70'}`}>Histórico</span>
          </Link>
          
          {isAdmin && (
            <Link 
                href="/admin" 
                className={`flex flex-col items-center gap-1 transition-colors ${isActive('/admin') ? 'text-[var(--primary-color)]' : 'text-gray-400'}`}
            >
                <Settings size={24} strokeWidth={isActive('/admin') ? 2.5 : 2} />
                <span className={`text-[10px] font-bold ${isActive('/admin') ? 'opacity-100' : 'opacity-70'}`}>Admin</span>
            </Link>
          )}
      </div>
    </div>
  );
}

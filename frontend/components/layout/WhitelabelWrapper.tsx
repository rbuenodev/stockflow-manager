"use client";
import React from 'react';
import { useWhitelabel } from '@/context/WhitelabelContext';

export default function WhitelabelWrapper({ children }: { children: React.ReactNode }) {
  const { loading, config } = useWhitelabel();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
        <div className="relative flex flex-col items-center animate-in fade-in duration-700">
            {/* Logo Placeholder */}
            <div className="w-24 h-24 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center mb-8 animate-pulse">
                <div className="w-12 h-12 bg-gray-100 rounded-xl" />
            </div>
            
            {/* Name Placeholder */}
            <div className="h-6 w-32 bg-gray-200 rounded-full mb-2 animate-pulse" />
            <div className="h-3 w-48 bg-gray-100 rounded-full animate-pulse opacity-50" />
            
            {/* Spinner style loader */}
            <div className="mt-12 flex gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
            </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

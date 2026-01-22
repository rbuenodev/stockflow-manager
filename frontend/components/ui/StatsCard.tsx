import React from 'react';
import { Wallet } from 'lucide-react';

interface StatsCardProps {
  total: number;
  label?: string;
}

export default function StatsCard({ total, label = "MEU CONSUMO TOTAL" }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Wallet size={80} className="text-[var(--primary-color)]" />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-medium text-gray-400">R$</span>
          <span className="text-4xl font-extrabold text-[var(--foreground)]">
            {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        
        {/* Simple Progress Indicator / Decoration */}
        <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
             <div className="h-full bg-[var(--primary-color)] w-[70%]" style={{ borderRadius: 'inherit' }}></div>
        </div>
      </div>
    </div>
  );
}

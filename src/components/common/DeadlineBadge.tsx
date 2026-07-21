import React from 'react';
import { AlertTriangle, Clock, AlertOctagon, CheckCircle } from 'lucide-react';

interface DeadlineBadgeProps {
  deadlineDate: string; // ISO String or YYYY-MM-DD
}

export const DeadlineBadge: React.FC<DeadlineBadgeProps> = ({ deadlineDate }) => {
  const today = new Date().getTime();
  const target = new Date(deadlineDate).getTime();
  const diffDays = Math.ceil((target - today) / (1000 * 3600 * 24));

  if (diffDays < 0) {
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-bold bg-red-950 text-red-400 border border-red-800">
        <AlertOctagon className="w-3.5 h-3.5" />
        <span>VENCIDO ({Math.abs(diffDays)}d)</span>
      </span>
    );
  }

  if (diffDays <= 5) {
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40 animate-bounce">
        <AlertOctagon className="w-3.5 h-3.5" />
        <span>Crítico: {diffDays} dias</span>
      </span>
    );
  }

  if (diffDays <= 15) {
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>Alerta: {diffDays} dias</span>
      </span>
    );
  }

  if (diffDays <= 30) {
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
        <Clock className="w-3.5 h-3.5" />
        <span>Atenção: {diffDays} dias</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
      <CheckCircle className="w-3.5 h-3.5 text-slate-400" />
      <span>{diffDays} dias restantes</span>
    </span>
  );
};

import React from 'react';
import { AlertTriangle, Clock, AlertOctagon, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDateBR } from '../../utils/format';

interface DeadlineBadgeProps {
  deadlineDate: string; // ISO String or YYYY-MM-DD
}

export const DeadlineBadge: React.FC<DeadlineBadgeProps> = ({ deadlineDate }) => {
  const { getCriticalDeadlinesCount } = useApp();
  const config = getCriticalDeadlinesCount().config;
  const CRITICAL_DAYS = config?.CRITICAL_DAYS || 5;
  const WARNING_DAYS = config?.WARNING_DAYS || 15;
  const INFO_DAYS = config?.INFO_DAYS || 30;

  const today = new Date().getTime();
  const target = new Date(deadlineDate).getTime();
  const diffDays = Math.ceil((target - today) / (1000 * 3600 * 24));

  if (diffDays < 0) {
    return (
      <div className="flex flex-col items-end">
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-bold bg-red-950 text-red-400 border border-red-800">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>VENCIDO ({Math.abs(diffDays)}d)</span>
        </span>
        <span className="text-[10px] text-slate-400 mt-1">{formatDateBR(deadlineDate)}</span>
      </div>
    );
  }

  if (diffDays <= CRITICAL_DAYS) {
    return (
      <div className="flex flex-col items-end">
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>Crítico: {diffDays} dias</span>
        </span>
        <span className="text-[10px] text-slate-400 mt-1">{formatDateBR(deadlineDate)}</span>
      </div>
    );
  }

  if (diffDays <= WARNING_DAYS) {
    return (
      <div className="flex flex-col items-end">
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Alerta: {diffDays} dias</span>
        </span>
        <span className="text-[10px] text-slate-400 mt-1">{formatDateBR(deadlineDate)}</span>
      </div>
    );
  }

  if (diffDays <= INFO_DAYS) {
    return (
      <div className="flex flex-col items-end">
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
          <Clock className="w-3.5 h-3.5" />
          <span>Atenção: {diffDays} dias</span>
        </span>
        <span className="text-[10px] text-slate-400 mt-1">{formatDateBR(deadlineDate)}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
        <CheckCircle className="w-3.5 h-3.5 text-slate-400" />
        <span>{diffDays} dias restantes</span>
      </span>
      <span className="text-[10px] text-slate-400 mt-1">{formatDateBR(deadlineDate)}</span>
    </div>
  );
};

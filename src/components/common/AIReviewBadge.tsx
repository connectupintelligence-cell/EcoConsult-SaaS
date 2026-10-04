import React from 'react';
import { Sparkles, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AIReviewBadgeProps {
  approved: boolean;
  onApprove?: () => void;
  size?: 'sm' | 'md';
}

export const AIReviewBadge: React.FC<AIReviewBadgeProps> = ({ approved, onApprove, size = 'sm' }) => {
  if (approved) {
    return (
      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Revisado & Aprovado por Técnico</span>
      </span>
    );
  }

  return (
    <div className="inline-flex items-center space-x-2">
      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Rascunho IA (Requer Aprovação Humana)</span>
      </span>
      {onApprove && (
        <button
          onClick={onApprove}
          className="text-[10px] bg-brand-600 hover:bg-brand-500 text-white font-medium px-2 py-1 rounded border border-brand-400 transition"
        >
          Aprovar Agora
        </button>
      )}
    </div>
  );
};

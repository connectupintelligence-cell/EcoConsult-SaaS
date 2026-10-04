import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth, PerfilAcesso } from '../../context/AuthContext';
import { Sparkles, ShieldAlert, LogOut, FlaskConical } from 'lucide-react';

interface HeaderProps {
  onOpenAiCopilot?: () => void;
}

const roleLabels: Record<PerfilAcesso, string> = {
  administradora: 'Administradora',
  executora: 'Executora técnica',
  cliente: 'Cliente'
};

export const Header: React.FC<HeaderProps> = ({ onOpenAiCopilot }) => {
  const { getCriticalDeadlinesCount } = useApp();
  const { profile, session, signOut } = useAuth();
  const isStaff = profile?.role === 'administradora' || profile?.role === 'executora';
  const deadLines = getCriticalDeadlinesCount();

  return (
    <header className="h-16 bg-eco-surface border-b border-eco-border px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
      <div className="flex items-center space-x-2 text-[11px] font-medium px-2.5 py-1 rounded-lg border bg-amber-950/40 text-amber-300 border-amber-800">
        <FlaskConical className="w-3.5 h-3.5" />
        <span>Ambiente de teste — somente dados fictícios</span>
      </div>

      <div className="flex items-center space-x-4">
        {isStaff && onOpenAiCopilot && (
          <button
            onClick={onOpenAiCopilot}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Copiloto IA</span>
          </button>
        )}

        {isStaff && (
          <div className="flex items-center bg-eco-card border border-eco-border px-3 py-1.5 rounded-lg text-xs space-x-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300 font-medium hidden md:inline">Prazos (30d):</span>
            <span className="font-bold text-red-400" title="até 5 dias ou vencidos">{deadLines.danger}</span>
            <span className="font-bold text-amber-400" title="até 15 dias">{deadLines.warning}</span>
            <span className="font-bold text-blue-400" title="até 30 dias">{deadLines.info}</span>
          </div>
        )}

        <div className="flex items-center space-x-3 pl-3 border-l border-eco-border">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-200">{profile?.full_name}</div>
            <div className="text-[10px] text-slate-400">
              {profile ? roleLabels[profile.role] : ''} · {session?.user.email}
            </div>
          </div>
          <button
            onClick={signOut}
            title="Sair"
            className="flex items-center space-x-1 text-xs text-slate-300 hover:text-white border border-eco-border hover:border-slate-500 rounded-lg px-2.5 py-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
};

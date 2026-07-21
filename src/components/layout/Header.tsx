import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_TENANTS } from '../../services/mockData';
import { UserRole } from '../../types';
import { SupabaseService } from '../../services/supabaseService';
import { SUPABASE_PROJECT_URL } from '../../lib/supabase';
import { Bell, Sparkles, Building2, UserCheck, ShieldAlert, Database, CheckCircle2, AlertCircle } from 'lucide-react';

interface HeaderProps {
  onOpenAiCopilot: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAiCopilot }) => {
  const { currentTenant, setCurrentTenant, currentUser, setCurrentUserRole, getCriticalDeadlinesCount } = useApp();
  const deadLines = getCriticalDeadlinesCount();

  const [dbStatus, setDbStatus] = useState<{ connected: boolean; message: string }>({
    connected: false,
    message: 'Verificando conexão Supabase...'
  });

  useEffect(() => {
    SupabaseService.checkConnection().then(res => setDbStatus(res));
  }, []);

  const roleLabels: Record<UserRole, string> = {
    admin: 'Administrador Sócio',
    gestor: 'Gestor de Projetos',
    tecnico: 'Engenheiro / Técnico',
    financeiro: 'Analista Financeiro',
    cliente_externo: 'Portal do Cliente (Externo)'
  };

  return (
    <header className="h-16 bg-eco-surface border-b border-eco-border px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* Left: Tenant Switcher & Supabase Status Badge */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-eco-dark/60 border border-eco-border rounded-lg px-3 py-1.5 text-sm">
          <Building2 className="w-4 h-4 text-brand-500" />
          <span className="text-xs text-slate-400 font-medium">Tenant Ativo:</span>
          <select 
            value={currentTenant.id} 
            onChange={(e) => {
              const selected = INITIAL_TENANTS.find(t => t.id === e.target.value);
              if (selected) setCurrentTenant(selected);
            }}
            className="bg-transparent font-semibold text-slate-200 text-sm focus:outline-none cursor-pointer"
          >
            {INITIAL_TENANTS.map(t => (
              <option key={t.id} value={t.id} className="bg-eco-surface text-slate-200">
                {t.logo} {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Supabase Status Indicator */}
        <div 
          className={`hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium font-mono ${
            dbStatus.connected
              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
              : 'bg-eco-dark text-slate-300 border-eco-border'
          }`}
          title={dbStatus.message}
        >
          <Database className={`w-3.5 h-3.5 ${dbStatus.connected ? 'text-emerald-400' : 'text-brand-400'}`} />
          <span>Supabase:</span>
          <span className="text-slate-300 font-semibold">{SUPABASE_PROJECT_URL.replace('https://', '')}</span>
          {dbStatus.connected ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <span className="text-[9px] bg-slate-800 text-brand-300 px-1 py-0.2 rounded border border-slate-700">Ready</span>
          )}
        </div>
      </div>

      {/* Right: Actions, Deadlines, Role Selector, User Profile */}
      <div className="flex items-center space-x-4">
        {/* IA Copilot Trigger */}
        <button
          onClick={onOpenAiCopilot}
          className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium transition shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          <span>Copiloto IA EcoConsult</span>
        </button>

        {/* Critical Deadline Alert Indicator */}
        <div className="relative flex items-center bg-eco-card border border-eco-border px-3 py-1.5 rounded-lg text-xs space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span className="text-slate-300 font-medium hidden md:inline">Prazos Légais (30d):</span>
          <div className="flex items-center space-x-1 font-bold">
            {deadLines.danger > 0 && (
              <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded animate-pulse" title="Crítico <= 5 dias ou vencidas">
                {deadLines.danger} 🚨
              </span>
            )}
            {deadLines.warning > 0 && (
              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded" title="Aviso <= 15 dias">
                {deadLines.warning} ⚠️
              </span>
            )}
            {deadLines.info > 0 && (
              <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded" title="Atenção <= 30 dias">
                {deadLines.info} ℹ️
              </span>
            )}
          </div>
        </div>

        {/* RBAC Role Selector for testing */}
        <div className="flex items-center space-x-2 bg-eco-dark/60 border border-eco-border rounded-lg px-2.5 py-1.5 text-xs">
          <UserCheck className="w-3.5 h-3.5 text-blue-400" />
          <select
            value={currentUser.role}
            onChange={(e) => setCurrentUserRole(e.target.value as UserRole)}
            className="bg-transparent font-medium text-slate-300 focus:outline-none cursor-pointer"
          >
            {(['admin', 'gestor', 'tecnico', 'financeiro', 'cliente_externo'] as UserRole[]).map(r => (
              <option key={r} value={r} className="bg-eco-surface text-slate-200">
                {roleLabels[r]}
              </option>
            ))}
          </select>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-3 pl-2 border-l border-eco-border">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full border border-brand-500/50 object-cover"
          />
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-slate-200">{currentUser.name}</div>
            <div className="text-[10px] text-slate-400 capitalize">{currentUser.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import { DeadlineBadge } from '../common/DeadlineBadge';
import { AIReviewBadge } from '../common/AIReviewBadge';
import { 
  FolderKanban, Award, DollarSign, AlertTriangle, ShieldAlert, ArrowUpRight, CheckCircle2, FileText, Clock 
} from 'lucide-react';

export const DashboardView: React.FC<{ onNavigate: (tab: any) => void }> = ({ onNavigate }) => {
  const { currentTenant, projects, licenses, invoices, getCriticalDeadlinesCount, auditLogs } = useApp();
  const deadLines = getCriticalDeadlinesCount();

  const totalRevenue = invoices.reduce((acc, inv) => acc + inv.amount, 0);
  const issuedRevenue = invoices.filter(i => i.status === 'emitida').reduce((acc, inv) => acc + inv.amount, 0);

  // Flatten all conditions across licenses
  const allConditions = licenses.flatMap(lic => lic.conditions.map(c => ({
    ...c,
    processNumber: lic.processNumber,
    organ: lic.environmentalOrgan
  })));

  const urgentConditions = allConditions
    .sort((a, b) => new Date(a.deadlineDate).getTime() - new Date(b.deadlineDate).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-eco-card via-eco-surface to-eco-card p-6 rounded-2xl border border-eco-border shadow-lg">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Visão Geral Executiva</span>
            <span className="text-sm font-semibold text-brand-400 bg-brand-950/80 px-2.5 py-0.5 rounded border border-brand-800">
              {currentTenant.name}
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitoramento em tempo real de licenças ambientais, condicionantes legais, faturamento fiscal e equipe.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('licensing')}
            className="flex items-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow transition"
          >
            <Award className="w-4 h-4" />
            <span>Ver Licenciamento & Prazos</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Critical Deadlines */}
        <div className="bg-eco-surface p-5 rounded-xl border border-red-500/30 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Prazos Críticos (30d)</span>
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
              <ShieldAlert className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-3 flex items-baseline gap-2">
            <span>{deadLines.danger + deadLines.warning + deadLines.info}</span>
            <span className="text-xs font-normal text-slate-400">alertas legais</span>
          </div>
          <div className="mt-3 flex items-center space-x-2 text-[11px]">
            <span className="text-red-400 font-bold bg-red-950 px-1.5 py-0.5 rounded">{deadLines.danger} Críticos (&lt;=5d)</span>
            <span className="text-amber-400 font-semibold">{deadLines.warning} em Alerta (&lt;=15d)</span>
          </div>
        </div>

        {/* Card 2: Active Projects */}
        <div className="bg-eco-surface p-5 rounded-xl border border-eco-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Projetos Ativos</span>
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400">
              <FolderKanban className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-3">{projects.length}</div>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center space-x-2">
            <span className="text-emerald-400 font-medium">
              {projects.filter(p => p.status === 'em_dia').length} Em Dia
            </span>
            <span>•</span>
            <span className="text-red-400 font-medium">
              {projects.filter(p => p.status === 'atrasado').length} Atrasado
            </span>
          </div>
        </div>

        {/* Card 3: Licensing Processes */}
        <div className="bg-eco-surface p-5 rounded-xl border border-eco-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Processos Ambientais</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Award className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-3">{licenses.length}</div>
          <div className="mt-3 text-[11px] text-slate-400">
            IBAMA, CETESB, SEMAD, INEA
          </div>
        </div>

        {/* Card 4: Financial Summary */}
        <div className="bg-eco-surface p-5 rounded-xl border border-eco-border shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Faturamento Previsto</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-3">
            R$ {totalRevenue.toLocaleString('pt-BR')}
          </div>
          <div className="mt-3 text-[11px] text-slate-400">
            R$ {issuedRevenue.toLocaleString('pt-BR')} emitidos via Adapter NF
          </div>
        </div>
      </div>

      {/* Main Grid: Urgent Legal Deadlines & Project Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Urgent Legal Deadlines & Conditions */}
        <div className="lg:col-span-2 bg-eco-surface border border-eco-border rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-eco-border pb-3">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white">Condicionantes & Licenças com Prazo Próximo</h2>
            </div>
            <button
              onClick={() => onNavigate('licensing')}
              className="text-xs text-brand-400 hover:underline flex items-center space-x-1"
            >
              <span>Ver todas</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {urgentConditions.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">Nenhuma condicionante cadastrada.</p>
            ) : (
              urgentConditions.map(cond => (
                <div key={cond.id} className="bg-eco-dark/60 border border-eco-border p-3.5 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-brand-500/40 transition">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-semibold bg-blue-950 text-blue-300 border border-blue-800 px-1.5 py-0.2 rounded">
                        {cond.organ}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{cond.processNumber}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-200">{cond.title}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{cond.description}</div>
                  </div>
                  <div className="flex items-center space-x-3 shrink-0">
                    <DeadlineBadge deadlineDate={cond.deadlineDate} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Col: Active Projects Progress */}
        <div className="bg-eco-surface border border-eco-border rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-eco-border pb-3">
            <div className="flex items-center space-x-2">
              <FolderKanban className="w-4 h-4 text-brand-400" />
              <h2 className="text-sm font-bold text-white">Status dos Projetos</h2>
            </div>
            <button onClick={() => onNavigate('projects')} className="text-xs text-brand-400 hover:underline">
              Detalhes
            </button>
          </div>

          <div className="space-y-4">
            {projects.map(p => (
              <div key={p.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{p.name}</span>
                  <span className="font-mono text-brand-400 font-bold">{p.progress}%</span>
                </div>
                <div className="w-full bg-eco-dark h-2 rounded-full overflow-hidden border border-eco-border">
                  <div
                    className={`h-full transition-all duration-500 ${
                      p.status === 'atrasado' ? 'bg-red-500' : 'bg-brand-500'
                    }`}
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Categoria: {p.category}</span>
                  <span className={p.status === 'atrasado' ? 'text-red-400 font-semibold' : 'text-slate-400'}>
                    Entrega: {p.deadlineDate}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Audit snippet */}
          <div className="pt-3 border-t border-eco-border space-y-2">
            <div className="text-[11px] font-semibold text-slate-400">Última Ação de IA Registrada:</div>
            {auditLogs.filter(a => a.isAiAction).slice(0, 1).map(log => (
              <div key={log.id} className="bg-eco-dark/80 p-2.5 rounded border border-eco-border text-[10px] text-slate-300">
                <div className="flex items-center justify-between text-amber-400 font-mono mb-1">
                  <span>{log.action}</span>
                  <span>{log.timestamp}</span>
                </div>
                <p className="text-slate-400">{log.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

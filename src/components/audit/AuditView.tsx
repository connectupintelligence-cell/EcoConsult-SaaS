import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Sparkles, Filter, Clock } from 'lucide-react';

export const AuditView: React.FC = () => {
  const { auditLogs } = useApp();
  const [onlyAi, setOnlyAi] = useState(false);

  const filteredLogs = onlyAi ? auditLogs.filter(l => l.isAiAction) : auditLogs;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Trilha de Auditoria & Segurança de IA</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Registro imutável de todas as ações críticas (alteração de prazos, emissão fiscal, uso de IA e uploads).
          </p>
        </div>

        <button
          onClick={() => setOnlyAi(!onlyAi)}
          className={`flex items-center space-x-2 text-xs font-semibold px-3.5 py-2 rounded-lg border transition ${
            onlyAi
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-eco-surface text-slate-300 border-eco-border hover:border-slate-500'
          }`}
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>{onlyAi ? 'Exibindo Somente Ações de IA' : 'Filtrar Ações de IA'}</span>
        </button>
      </div>

      {/* Logs Table */}
      <div className="bg-eco-surface border border-eco-border rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-eco-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Log de Operações do Tenant</h2>
          <span className="text-xs text-slate-400">Total: {filteredLogs.length} eventos</span>
        </div>

        <div className="divide-y divide-eco-border">
          {filteredLogs.map(log => (
            <div key={log.id} className="p-4 hover:bg-eco-dark/40 transition flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-100">{log.action}</span>
                  <span className="text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800 px-1.5 py-0.2 rounded">
                    {log.module}
                  </span>
                  {log.isAiAction && (
                    <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      IA Service
                    </span>
                  )}
                </div>
                <p className="text-slate-400">{log.details}</p>
              </div>

              <div className="text-right text-slate-400 text-[11px] shrink-0">
                <div className="font-semibold text-slate-200">{log.userName}</div>
                <div className="font-mono text-slate-400">{log.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DeadlineBadge } from '../common/DeadlineBadge';
import { LicensingProcess } from '../../types';
import { 
  Award, Plus, Clock, ShieldAlert, CheckCircle2, Filter, AlertTriangle, Building2 
} from 'lucide-react';

export const LicensingView: React.FC = () => {
  const { clients, licenses, addLicenseProcess, updateConditionStatus } = useApp();

  const [selectedOrgan, setSelectedOrgan] = useState<string>('TODOS');
  const [showNewProcessModal, setShowNewProcessModal] = useState(false);

  // New License Process Form
  const [processNum, setProcessNum] = useState('');
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [organ, setOrgan] = useState<LicensingProcess['environmentalOrgan']>('CETESB');
  const [licenseType, setLicenseType] = useState<LicensingProcess['licenseType']>('LI');
  const [expDate, setExpDate] = useState('2026-09-30');

  const filteredLicenses = selectedOrgan === 'TODOS' 
    ? licenses 
    : licenses.filter(l => l.environmentalOrgan === selectedOrgan);

  const handleCreateProcess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!processNum) return;

    addLicenseProcess({
      clientId,
      processNumber: processNum,
      environmentalOrgan: organ,
      licenseType,
      issueDate: new Date().toISOString().split('T')[0],
      expirationDate: expDate,
      status: 'em_analise',
      conditions: [
        {
          id: `cond-${Date.now()}-1`,
          processId: '',
          title: 'Relatório Técnico Semestral de Monitoramento',
          description: 'Apresentar laudo impresso com ART assinado.',
          deadlineDate: new Date(Date.now() + 28 * 86400000).toISOString().split('T')[0],
          alertDays: 30,
          status: 'em_andamento'
        }
      ]
    });

    setShowNewProcessModal(false);
    setProcessNum('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Licenciamento Ambiental & Matriz de Condicionantes</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Linha do tempo de condicionantes legais com contagem regressiva de prazos críticos (30/15/5 dias).
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Organ Filter */}
          <div className="flex items-center space-x-2 bg-eco-surface border border-eco-border px-3 py-1.5 rounded-lg text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium">Órgão:</span>
            <select
              value={selectedOrgan}
              onChange={(e) => setSelectedOrgan(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="TODOS" className="bg-eco-surface">Todos os Órgãos</option>
              <option value="IBAMA" className="bg-eco-surface">IBAMA (Federal)</option>
              <option value="CETESB" className="bg-eco-surface">CETESB (SP)</option>
              <option value="SEMAD" className="bg-eco-surface">SEMAD (MG)</option>
              <option value="INEA" className="bg-eco-surface">INEA (RJ)</option>
              <option value="IAT" className="bg-eco-surface">IAT (PR)</option>
            </select>
          </div>

          <button
            onClick={() => setShowNewProcessModal(true)}
            className="flex items-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Licença / Processo</span>
          </button>
        </div>
      </div>

      {/* Main Process List */}
      <div className="space-y-6">
        {filteredLicenses.map(lic => {
          const client = clients.find(c => c.id === lic.clientId);

          return (
            <div key={lic.id} className="bg-eco-surface border border-eco-border rounded-xl p-5 shadow-sm space-y-4">
              {/* Process Top Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-eco-border pb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono">
                    {lic.environmentalOrgan}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{lic.licenseType} - Processo nº {lic.processNumber}</span>
                    </h3>
                    <span className="text-xs text-slate-400">Cliente: <strong className="text-slate-200">{client?.name}</strong></span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right text-xs">
                    <span className="text-slate-400 block text-[10px]">Vencimento da Licença:</span>
                    <DeadlineBadge deadlineDate={lic.expirationDate} />
                  </div>

                  <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded ${
                    lic.status === 'deferido' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    lic.status === 'pendencia' ? 'bg-red-950 text-red-400 border border-red-800' :
                    'bg-blue-950 text-blue-400 border border-blue-800'
                  }`}>
                    {lic.status}
                  </span>
                </div>
              </div>

              {/* Conditions List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-400" />
                    Condicionantes e Obrigações Legais Assumidas ({lic.conditions.length})
                  </span>
                  <span className="text-[10px] text-slate-400">Notificações automáticas ativas (30, 15 e 5 dias antes)</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {lic.conditions.map(cond => (
                    <div key={cond.id} className="bg-eco-dark/70 border border-eco-border p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-100">{cond.title}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.2 rounded ${
                            cond.status === 'cumprida' ? 'bg-emerald-950 text-emerald-400' :
                            cond.status === 'vencida' ? 'bg-red-950 text-red-400' : 'bg-amber-950 text-amber-300'
                          }`}>
                            {cond.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{cond.description}</p>
                      </div>

                      <div className="flex items-center space-x-4 shrink-0">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">Data Limite:</span>
                          <DeadlineBadge deadlineDate={cond.deadlineDate} />
                        </div>

                        {cond.status !== 'cumprida' && (
                          <button
                            onClick={() => updateConditionStatus(lic.id, cond.id, 'cumprida')}
                            className="flex items-center space-x-1 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-1.5 rounded transition shadow"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Marcar Cumprida</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: NEW LICENSE */}
      {showNewProcessModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateProcess} className="bg-eco-surface border border-eco-border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-eco-border pb-3">
              <h3 className="text-base font-bold text-white">Cadastrar Novo Processo Ambiental</h3>
              <button type="button" onClick={() => setShowNewProcessModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Número do Processo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: IBAMA-02001.00492/2026"
                  value={processNum}
                  onChange={(e) => setProcessNum(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cliente</label>
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Órgão Ambiental</label>
                  <select
                    value={organ}
                    onChange={(e) => setOrgan(e.target.value as any)}
                    className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                  >
                    <option value="CETESB">CETESB (SP)</option>
                    <option value="IBAMA">IBAMA (Federal)</option>
                    <option value="SEMAD">SEMAD (MG)</option>
                    <option value="INEA">INEA (RJ)</option>
                    <option value="IAT">IAT (PR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Tipo de Licença</label>
                  <select
                    value={licenseType}
                    onChange={(e) => setLicenseType(e.target.value as any)}
                    className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                  >
                    <option value="LP">LP - Prévia</option>
                    <option value="LI">LI - Instalação</option>
                    <option value="LO">LO - Operação</option>
                    <option value="Outorga">Outorga de Água</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Data de Vencimento da Licença</label>
                <input
                  type="date"
                  required
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-eco-border">
              <button type="button" onClick={() => setShowNewProcessModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-400">
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-lg shadow">
                Salvar Licença
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

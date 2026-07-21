import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Invoice } from '../../types';
import { 
  DollarSign, FileCode2, CheckCircle, AlertCircle, RefreshCw, Building2, Layers, Cpu, Eye 
} from 'lucide-react';

export const FinancialView: React.FC = () => {
  const { currentTenant, clients, invoices, emitInvoiceViaAdapter } = useApp();

  const [activeTab, setActiveTab] = useState<'invoices' | 'adapter'>('invoices');
  const [selectedXml, setSelectedXml] = useState<string | null>(null);
  const [isEmittingId, setIsEmittingId] = useState<string | null>(null);

  const providerName = currentTenant.id === 'tenant-1' ? 'Focus NFe' : 'PlugNotas';

  const handleEmitInvoice = async (invoiceId: string) => {
    setIsEmittingId(invoiceId);
    await emitInvoiceViaAdapter(invoiceId);
    setIsEmittingId(null);
  };

  const totalRevenue = invoices.reduce((acc, inv) => acc + inv.amount, 0);
  const issuedRevenue = invoices.filter(i => i.status === 'emitida').reduce((acc, inv) => acc + inv.amount, 0);
  const pendingRevenue = invoices.filter(i => i.status === 'pendente').reduce((acc, inv) => acc + inv.amount, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <span>Financeiro & Módulo de Emissão Fiscal (Adapter Pattern)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Faturamento desacoplado pronto para plugar Focus NFe, PlugNotas ou emissor municipal sem refatorar código.
          </p>
        </div>

        <div className="bg-eco-surface border border-eco-border p-1 rounded-lg flex space-x-1 text-xs">
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-3 py-1.5 rounded-md font-semibold transition ${
              activeTab === 'invoices' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Faturamento & Notas ({invoices.length})
          </button>
          <button
            onClick={() => setActiveTab('adapter')}
            className={`px-3 py-1.5 rounded-md font-semibold transition ${
              activeTab === 'adapter' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Configurações do Adapter Fiscal ({providerName})
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-eco-surface p-4 rounded-xl border border-eco-border shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase">Faturamento Total Contratado</span>
          <div className="text-xl font-extrabold text-white mt-1">R$ {totalRevenue.toLocaleString('pt-BR')}</div>
        </div>

        <div className="bg-eco-surface p-4 rounded-xl border border-emerald-500/30 shadow-sm">
          <span className="text-xs font-semibold text-emerald-400 uppercase">Emitido via Adapter Fiscal</span>
          <div className="text-xl font-extrabold text-emerald-400 mt-1">R$ {issuedRevenue.toLocaleString('pt-BR')}</div>
        </div>

        <div className="bg-eco-surface p-4 rounded-xl border border-amber-500/30 shadow-sm">
          <span className="text-xs font-semibold text-amber-400 uppercase">Aguardando Emissão</span>
          <div className="text-xl font-extrabold text-amber-300 mt-1">R$ {pendingRevenue.toLocaleString('pt-BR')}</div>
        </div>
      </div>

      {/* SUBTAB 1: INVOICES */}
      {activeTab === 'invoices' && (
        <div className="bg-eco-surface border border-eco-border rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-eco-border flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Contratos e Notas Fiscais Eletrônicas (NFS-e)</h2>
            <span className="text-xs text-slate-400">Provedor Ativo: <strong className="text-brand-400 font-mono">{providerName}</strong></span>
          </div>

          <div className="divide-y divide-eco-border">
            {invoices.map(inv => {
              const client = clients.find(c => c.id === inv.clientId);

              return (
                <div key={inv.id} className="p-4 hover:bg-eco-dark/40 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-white">{inv.contractTitle}</h3>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.2 rounded ${
                        inv.status === 'emitida' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        inv.status === 'erro' ? 'bg-red-950 text-red-400 border border-red-800' :
                        'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {inv.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center space-x-3">
                      <span>Tomador: <strong className="text-slate-200">{client?.name}</strong></span>
                      <span>•</span>
                      <span>Vencimento: {inv.dueDate}</span>
                      {inv.fiscalRef && (
                        <>
                          <span>•</span>
                          <span className="text-brand-300 font-mono">{inv.fiscalRef}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-white">
                        R$ {inv.amount.toLocaleString('pt-BR')}
                      </div>
                      <span className="text-[10px] text-slate-400">ISS 2.0% Retido</span>
                    </div>

                    {inv.status === 'emitida' ? (
                      <button
                        onClick={() => setSelectedXml(inv.xmlMockContent || '<?xml version="1.0"?><NFSe>Selo fiscal validado</NFSe>')}
                        className="flex items-center space-x-1.5 bg-eco-dark border border-eco-border hover:border-brand-500 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                      >
                        <FileCode2 className="w-4 h-4 text-emerald-400" />
                        <span>Ver XML / PDF</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEmitInvoice(inv.id)}
                        disabled={isEmittingId === inv.id}
                        className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow transition disabled:opacity-50"
                      >
                        {isEmittingId === inv.id ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Cpu className="w-3.5 h-3.5" />
                        )}
                        <span>Emitir via Adapter ({providerName})</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: ADAPTER CONFIG */}
      {activeTab === 'adapter' && (
        <div className="bg-eco-surface border border-eco-border rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-eco-border pb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-brand-400" />
              <span>Arquitetura de Emissão Fiscal (Adapter Pattern Interface)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              O módulo de faturamento conversa exclusivamente com a interface <code className="text-brand-300">InvoicingAdapterService</code>.
              Troque de FocusNFe para PlugNotas ou webservice municipal sem mexer em nenhuma linha do financeiro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-eco-dark/70 border border-eco-border p-5 rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span>Provedor Ativo do Tenant</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                  {providerName}
                </span>
              </h3>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between border-b border-eco-border/50 py-1">
                  <span className="text-slate-400">Município de Emissão:</span>
                  <span className="font-semibold">{currentTenant.fiscalCity} - {currentTenant.state}</span>
                </div>
                <div className="flex justify-between border-b border-eco-border/50 py-1">
                  <span className="text-slate-400">Ambiente:</span>
                  <span className="font-mono text-amber-300">Homologação / Teste de API</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Status do Adapter:</span>
                  <span className="text-emerald-400 font-bold">Conectado (Ready)</span>
                </div>
              </div>
            </div>

            <div className="bg-eco-dark/70 border border-eco-border p-5 rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-white">Provedores Suportados Fora da Caixa:</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center space-x-2 bg-eco-card p-2 rounded border border-eco-border">
                  <CheckCircle className="w-4 h-4 text-brand-400" />
                  <span><strong>Focus NFe:</strong> API REST nacional para NFS-e / NF-e</span>
                </li>
                <li className="flex items-center space-x-2 bg-eco-card p-2 rounded border border-eco-border">
                  <CheckCircle className="w-4 h-4 text-brand-400" />
                  <span><strong>PlugNotas (TecnoSpeed):</strong> Multi-prefeitura automatizado</span>
                </li>
                <li className="flex items-center space-x-2 bg-eco-card p-2 rounded border border-eco-border">
                  <CheckCircle className="w-4 h-4 text-brand-400" />
                  <span><strong>eNotas Gateway:</strong> Emissão automática de NFS-e Recorrente</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* XML PREVIEW MODAL */}
      {selectedXml && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-eco-surface border border-eco-border rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-eco-border pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-emerald-400" />
                <span>XML da Nota Fiscal Eletrônica Emitida</span>
              </h3>
              <button onClick={() => setSelectedXml(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="bg-eco-dark p-4 rounded-xl border border-eco-border font-mono text-xs text-emerald-300 whitespace-pre-wrap max-h-72 overflow-y-auto">
              {selectedXml}
            </div>

            <div className="flex justify-end">
              <button onClick={() => setSelectedXml(null)} className="bg-brand-600 text-white font-semibold text-xs px-4 py-2 rounded-lg">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

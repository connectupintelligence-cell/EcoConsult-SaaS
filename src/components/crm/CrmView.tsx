import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AIReviewBadge } from '../common/AIReviewBadge';
import { AIService } from '../../services/aiService';
import { ProposalTemplate, Proposal } from '../../types';
import { 
  Plus, FileText, Sparkles, Download, Check, Eye, Edit3, Layers, Building, RefreshCw 
} from 'lucide-react';

export const CrmView: React.FC = () => {
  const { clients, proposalTemplates, proposals, addProposalTemplate, addProposal, updateProposalStatus, addClient } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'clients' | 'proposals' | 'templates'>('clients');

  // New Client Form State
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [newClientData, setNewClientData] = useState({
    name: '', cnpj: '', contactPerson: '', email: '', phone: '', sector: 'Outros', city: '', state: ''
  });
  const [isSubmittingClient, setIsSubmittingClient] = useState(false);

  // New Proposal Form State
  const [showNewProposalModal, setShowNewProposalModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');
  const [selectedTemplateId, setSelectedTemplateId] = useState(proposalTemplates[0]?.id || '');
  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({
    escopo: 'Licenciamento Ambiental com elaboração de PCA e acompanhamento de condicionantes.',
    valor: '45.000,00',
    prazo: '45',
    responsavel_tecnico: 'Dra. Camila Siqueira (CRBio 10450)'
  });
  const [previewProposal, setPreviewProposal] = useState<Proposal | null>(null);

  // New Template Form State
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [newTplTitle, setNewTplTitle] = useState('');
  const [newTplServiceType, setNewTplServiceType] = useState('Licenciamento Ambiental');
  const [newTplContent, setNewTplContent] = useState(`## PROPOSTA COMERCIAL DE CONSULTORIA

**Cliente:** {{cliente}}
**Escopo:** {{escopo}}
**Investimento:** R$ {{valor}}
**Prazo:** {{prazo}} dias.`);

  const handleGenerateProposalWithAI = () => {
    const template = proposalTemplates.find(t => t.id === selectedTemplateId) || proposalTemplates[0];
    const client = clients.find(c => c.id === selectedClientId) || clients[0];

    const generated = AIService.generateProposalFromTemplate(template, client.name, placeholderValues);

    const newPropData: Omit<Proposal, 'id' | 'tenantId' | 'createdAt'> = {
      clientId: client.id,
      templateId: template.id,
      title: generated.title,
      version: 1,
      filledValues: generated.filledValues,
      totalValue: generated.totalValue,
      deliveryDays: generated.deliveryDays,
      status: 'rascunho',
      generatedByAI: true,
      humanApproved: false
    };

    addProposal(newPropData);
    setShowNewProposalModal(false);
  };

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTplTitle) return;

    addProposalTemplate({
      title: newTplTitle,
      serviceType: newTplServiceType,
      placeholders: ['cliente', 'escopo', 'valor', 'prazo'],
      contentMarkdown: newTplContent
    });

    setShowNewTemplateModal(false);
    setNewTplTitle('');
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientData.name || !newClientData.cnpj) return;
    setIsSubmittingClient(true);
    try {
      const ok = await addClient(newClientData as any);
      if (ok) {
        setShowNewClientModal(false);
        setNewClientData({ name: '', cnpj: '', contactPerson: '', email: '', phone: '', sector: 'Outros', city: '', state: '' });
      } else {
        alert('Erro ao salvar cliente. Verifique os dados (o CPF/CNPJ já pode existir).');
      }
    } catch (err) {
      alert('Erro inesperado ao salvar cliente.');
    } finally {
      setIsSubmittingClient(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-400" />
            <span>CRM & Propostas Comerciais (Template Engine)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Geração de propostas automatizada com suporte a placeholders (<code className="text-brand-300">{"{{cliente}}, {{escopo}}, {{valor}}, {{prazo}}"}</code>).
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-eco-surface border border-eco-border p-1 rounded-lg flex space-x-1 text-xs">
            <button
              onClick={() => setActiveSubTab('clients')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                activeSubTab === 'clients' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Clientes ({clients.length})
            </button>
            <button
              onClick={() => setActiveSubTab('proposals')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                activeSubTab === 'proposals' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Propostas ({proposals.length})
            </button>
            <button
              onClick={() => setActiveSubTab('templates')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                activeSubTab === 'templates' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Templates ({proposalTemplates.length})
            </button>
          </div>

          <button
            onClick={() => setShowNewProposalModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 hover:to-emerald-400 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow transition"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Gerar Proposta por IA</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 0: CLIENTS */}
      {activeSubTab === 'clients' && (
        <div className="bg-eco-surface border border-eco-border rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-eco-border flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Base de Clientes (CPF/CNPJ)</h2>
            <button 
              className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition" 
              onClick={() => setShowNewClientModal(true)}
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Novo Cliente
            </button>
          </div>
          <div className="divide-y divide-eco-border">
            {clients.map(client => (
              <div key={client.id} className="p-4 hover:bg-eco-dark/40 transition flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Building className="w-4 h-4 text-brand-400" />
                    {client.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1 flex space-x-3">
                    <span>Doc: {client.cnpj}</span>
                    <span>Setor: {client.sector}</span>
                    <span>Local: {client.city}/{client.state}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-300 text-right">
                  <p>{client.contactPerson}</p>
                  <p>{client.email}</p>
                  <p>{client.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 1: PROPOSALS */}
      {activeSubTab === 'proposals' && (
        <div className="bg-eco-surface border border-eco-border rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-eco-border flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Histórico e Versionamento de Propostas</h2>
            <span className="text-xs text-slate-400">Total: {proposals.length} propostas</span>
          </div>

          <div className="divide-y divide-eco-border">
            {proposals.map(prop => {
              const client = clients.find(c => c.id === prop.clientId);
              return (
                <div key={prop.id} className="p-4 hover:bg-eco-dark/40 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">{prop.title}</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-1.5 py-0.2 rounded">
                        v{prop.version}.0
                      </span>
                      <AIReviewBadge approved={prop.humanApproved} />
                    </div>
                    <div className="text-xs text-slate-400 flex items-center space-x-3">
                      <span>Cliente: <strong className="text-slate-200">{client?.name || 'Cliente'}</strong></span>
                      <span>•</span>
                      <span>Criada em: {prop.createdAt}</span>
                      <span>•</span>
                      <span>Prazo: {prop.deliveryDays} dias</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-emerald-400">
                        R$ {prop.totalValue.toLocaleString('pt-BR')}
                      </div>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                        prop.status === 'aprovado' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        prop.status === 'enviado' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {prop.status}
                      </span>
                    </div>

                    <button
                      onClick={() => setPreviewProposal(prop)}
                      className="p-2 bg-eco-dark border border-eco-border hover:border-brand-500 rounded-lg text-slate-300 hover:text-white transition"
                      title="Visualizar Proposta em PDF"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {prop.status === 'rascunho' && (
                      <button
                        onClick={() => updateProposalStatus(prop.id, 'enviado')}
                        className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition"
                      >
                        Enviar ao Cliente
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: TEMPLATES */}
      {activeSubTab === 'templates' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowNewTemplateModal(true)}
              className="flex items-center space-x-2 bg-eco-card border border-eco-border hover:border-brand-500 text-slate-200 text-xs font-semibold px-3.5 py-2 rounded-lg transition"
            >
              <Plus className="w-4 h-4 text-brand-400" />
              <span>Novo Template de Proposta</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proposalTemplates.map(tpl => (
              <div key={tpl.id} className="bg-eco-surface border border-eco-border rounded-xl p-5 shadow-sm space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{tpl.title}</h3>
                    <span className="text-[10px] font-mono text-brand-400 bg-brand-950 px-2 py-0.5 rounded border border-brand-800 mt-1 inline-block">
                      {tpl.serviceType}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Atualizado: {tpl.updatedAt}</span>
                </div>

                <div className="text-xs text-slate-300 bg-eco-dark/60 border border-eco-border p-3 rounded-lg font-mono text-[11px] whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {tpl.contentMarkdown}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-eco-border">
                  <span>Variables: {tpl.placeholders.map(p => `{{${p}}}`).join(', ')}</span>
                  <button
                    onClick={() => {
                      setSelectedTemplateId(tpl.id);
                      setShowNewProposalModal(true);
                    }}
                    className="text-brand-400 hover:underline font-semibold"
                  >
                    Usar este template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: NEW PROPOSAL GENERATOR */}
      {showNewProposalModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-eco-surface border border-eco-border rounded-2xl w-full max-w-xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-eco-border pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span>Gerar Proposta Comercial via IA</span>
              </h3>
              <button onClick={() => setShowNewProposalModal(false)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Selecione o Cliente</label>
                <select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.sector})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Selecione o Template Base</label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => setSelectedTemplateId(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500"
                >
                  {proposalTemplates.map(t => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              </div>

              <div className="bg-eco-dark/60 p-3 rounded-lg border border-eco-border space-y-3">
                <span className="font-semibold text-slate-200">Preenchimento de Placeholders da Proposta</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block text-[10px]">Valor (R$)</label>
                    <input
                      type="text"
                      value={placeholderValues.valor}
                      onChange={(e) => setPlaceholderValues(prev => ({ ...prev, valor: e.target.value }))}
                      className="w-full bg-eco-card border border-eco-border rounded p-1.5 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block text-[10px]">Prazo (Dias)</label>
                    <input
                      type="text"
                      value={placeholderValues.prazo}
                      onChange={(e) => setPlaceholderValues(prev => ({ ...prev, prazo: e.target.value }))}
                      className="w-full bg-eco-card border border-eco-border rounded p-1.5 text-white text-xs"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-slate-400 block text-[10px]">Escopo Resumido</label>
                    <textarea
                      rows={2}
                      value={placeholderValues.escopo}
                      onChange={(e) => setPlaceholderValues(prev => ({ ...prev, escopo: e.target.value }))}
                      className="w-full bg-eco-card border border-eco-border rounded p-1.5 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-300 text-[11px] flex items-center space-x-2">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                <span>A IA montará o documento final mantendo o selo de revisão técnica humana obrigatória antes do envio.</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-eco-border">
              <button
                onClick={() => setShowNewProposalModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleGenerateProposalWithAI}
                className="px-4 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-lg shadow transition"
              >
                Gerar Proposta Agora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: NEW TEMPLATE */}
      {showNewTemplateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateTemplate} className="bg-eco-surface border border-eco-border rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-eco-border pb-3">
              <h3 className="text-base font-bold text-white">Cadastrar Modelo de Proposta Comercial</h3>
              <button type="button" onClick={() => setShowNewTemplateModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Título do Template</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Proposta Comercial - Estudo de Impacto de Vizinhança (EIV)"
                  value={newTplTitle}
                  onChange={(e) => setNewTplTitle(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tipo de Serviço</label>
                <input
                  type="text"
                  required
                  value={newTplServiceType}
                  onChange={(e) => setNewTplServiceType(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Conteúdo Markdown com Placeholders</label>
                <textarea
                  rows={6}
                  value={newTplContent}
                  onChange={(e) => setNewTplContent(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white font-mono text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-eco-border">
              <button type="button" onClick={() => setShowNewTemplateModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-400">
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-lg shadow">
                Salvar Template
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewProposal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{previewProposal.title}</h2>
                <div className="text-xs text-slate-500">Versão {previewProposal.version}.0 • {previewProposal.createdAt}</div>
              </div>
              <button onClick={() => setPreviewProposal(null)} className="text-slate-400 hover:text-slate-900 text-lg font-bold">✕</button>
            </div>

            <div className="prose prose-sm font-sans space-y-4">
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 text-emerald-900 text-xs">
                <strong>Proposta Comercial Oficial</strong> - Gerada dinamicamente com base no modelo cadastrado pela consultoria.
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <p><strong>Cliente:</strong> {previewProposal.filledValues.cliente}</p>
                <p><strong>Escopo:</strong> {previewProposal.filledValues.escopo}</p>
                <p><strong>Investimento Total:</strong> R$ {previewProposal.filledValues.valor}</p>
                <p><strong>Prazo Estimado:</strong> {previewProposal.filledValues.prazo} dias úteis</p>
                {previewProposal.filledValues.responsavel_tecnico && (
                  <p><strong>Responsável Técnico:</strong> {previewProposal.filledValues.responsavel_tecnico}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t text-xs">
              <span className="text-slate-500">Documento exportável para PDF</span>
              <button
                onClick={() => setPreviewProposal(null)}
                className="bg-slate-900 text-white font-bold px-4 py-2 rounded-lg"
              >
                Fechar Visualização
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: NOVO CLIENTE */}
      {showNewClientModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateClient} className="bg-eco-surface border border-eco-border rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-eco-border pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-brand-400" />
                <span>Cadastrar Cliente</span>
              </h3>
              <button type="button" onClick={() => setShowNewClientModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Fantasia ou Razão Social</label>
                <input type="text" required value={newClientData.name} onChange={e => setNewClientData({...newClientData, name: e.target.value})} className="w-full bg-eco-dark border border-eco-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500" placeholder="Ex: Agro Fazenda Bela Vista" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">CPF ou CNPJ</label>
                  <input type="text" required value={newClientData.cnpj} onChange={e => setNewClientData({...newClientData, cnpj: e.target.value})} className="w-full bg-eco-dark border border-eco-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500" placeholder="00.000.000/0001-00" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Setor de Atuação</label>
                  <select value={newClientData.sector} onChange={e => setNewClientData({...newClientData, sector: e.target.value})} className="w-full bg-eco-dark border border-eco-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500">
                    <option>Agronegócio</option>
                    <option>Indústria</option>
                    <option>Mineração</option>
                    <option>Construção Civil</option>
                    <option>Logística</option>
                    <option>Outros</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Pessoa de Contato</label>
                <input type="text" value={newClientData.contactPerson} onChange={e => setNewClientData({...newClientData, contactPerson: e.target.value})} className="w-full bg-eco-dark border border-eco-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500" placeholder="Nome do representante" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail</label>
                  <input type="email" value={newClientData.email} onChange={e => setNewClientData({...newClientData, email: e.target.value})} className="w-full bg-eco-dark border border-eco-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500" placeholder="contato@empresa.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Telefone / WhatsApp</label>
                  <input type="text" value={newClientData.phone} onChange={e => setNewClientData({...newClientData, phone: e.target.value})} className="w-full bg-eco-dark border border-eco-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500" placeholder="(31) 99999-9999" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Cidade</label>
                  <input type="text" value={newClientData.city} onChange={e => setNewClientData({...newClientData, city: e.target.value})} className="w-full bg-eco-dark border border-eco-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500" placeholder="Ex: Belo Horizonte" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estado (UF)</label>
                  <input type="text" maxLength={2} value={newClientData.state} onChange={e => setNewClientData({...newClientData, state: e.target.value.toUpperCase()})} className="w-full bg-eco-dark border border-eco-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500" placeholder="MG" />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3">
              <button type="button" onClick={() => setShowNewClientModal(false)} className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition">Cancelar</button>
              <button type="submit" disabled={isSubmittingClient} className="px-4 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-lg shadow disabled:opacity-50">
                {isSubmittingClient ? 'Salvando...' : 'Salvar Cliente'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

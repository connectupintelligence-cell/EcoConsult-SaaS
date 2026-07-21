import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AIService } from '../../services/aiService';
import { AIReviewBadge } from '../common/AIReviewBadge';
import { DocumentItem } from '../../types';
import { 
  Files, Upload, Sparkles, FileText, History, Check, ShieldCheck, Download, Search 
} from 'lucide-react';

export const DocumentsView: React.FC = () => {
  const { clients, documents, addDocument } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New Doc Form
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<DocumentItem['category']>('Relatórios Técnicos');
  const [docClientId, setDocClientId] = useState(clients[0]?.id || '');
  const [runAiExtraction, setRunAiExtraction] = useState(true);
  const [isProcessingAi, setIsProcessingAi] = useState(false);

  const filteredDocs = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'TODAS' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (doc.aiExtractedSummary && doc.aiExtractedSummary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle) return;

    let aiSummary = undefined;

    if (runAiExtraction) {
      setIsProcessingAi(true);
      const parsed = await AIService.parseEnvironmentalDocument(docTitle);
      aiSummary = parsed.aiNotes;
      setIsProcessingAi(false);
    }

    addDocument({
      clientId: docClientId,
      title: docTitle,
      category: docCategory,
      currentVersion: 1,
      versions: [
        {
          versionNumber: 1,
          fileName: docTitle,
          uploadedAt: new Date().toISOString().split('T')[0],
          uploadedBy: 'Dra. Camila Siqueira',
          fileSize: '3.4 MB',
          note: 'Versão inicial enviada ao repositório'
        }
      ],
      isAiParsed: runAiExtraction,
      aiExtractedSummary: aiSummary
    });

    setShowUploadModal(false);
    setDocTitle('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Files className="w-5 h-5 text-brand-400" />
            <span>Gestão Documental & Extrator de IA</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Repositório com versionamento automático ilimitado e leitor de licenças/estudos ambientais via IA.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-brand-600 to-emerald-500 hover:from-brand-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          <Upload className="w-4 h-4" />
          <span>Upload & Processar com IA</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-eco-surface border border-eco-border p-4 rounded-xl shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por nome do arquivo ou conteúdo extraído pela IA..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-eco-dark border border-eco-border rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Categoria:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-eco-dark border border-eco-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
          >
            <option value="TODAS">Todas as Categorias</option>
            <option value="Licenças & Portarias">Licenças & Portarias</option>
            <option value="Relatórios Técnicos">Relatórios Técnicos</option>
            <option value="Estudos de Campo">Estudos de Campo</option>
            <option value="Contratos">Contratos</option>
            <option value="Fiscal">Fiscal</option>
          </select>
        </div>
      </div>

      {/* Document List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDocs.map(doc => {
          const client = clients.find(c => c.id === doc.clientId);

          return (
            <div key={doc.id} className="bg-eco-surface border border-eco-border rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-eco-card border border-eco-border flex items-center justify-center text-brand-400 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-white">{doc.title}</h3>
                      <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.2 rounded border border-slate-700">
                        v{doc.currentVersion}.0 ({doc.versions.length} versões)
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Cliente: <strong className="text-slate-200">{client?.name}</strong> • Categoria: <span className="text-brand-300">{doc.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-1.5 text-xs bg-eco-dark border border-eco-border hover:border-brand-500 text-slate-300 px-3 py-1.5 rounded-lg transition">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download v{doc.currentVersion}.0</span>
                  </button>
                </div>
              </div>

              {/* Version History List */}
              <div className="bg-eco-dark/70 p-3 rounded-lg border border-eco-border space-y-2">
                <div className="text-[11px] font-bold text-slate-300 flex items-center space-x-1.5">
                  <History className="w-3.5 h-3.5 text-brand-400" />
                  <span>Histórico de Versionamento Ilógico (Nunca Sobrescreve):</span>
                </div>
                <div className="space-y-1">
                  {doc.versions.map(v => (
                    <div key={v.versionNumber} className="flex items-center justify-between text-[11px] text-slate-400 bg-eco-card/60 p-2 rounded border border-eco-border/40">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-brand-400">v{v.versionNumber}.0</span>
                        <span className="text-slate-200">{v.fileName}</span>
                        {v.note && <span className="text-slate-400 italic">({v.note})</span>}
                      </div>
                      <div className="flex items-center space-x-3 text-[10px]">
                        <span>{v.uploadedBy}</span>
                        <span>•</span>
                        <span>{v.uploadedAt}</span>
                        <span>•</span>
                        <span>{v.fileSize}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI OCR Summary Box */}
              {doc.isAiParsed && doc.aiExtractedSummary && (
                <div className="bg-emerald-950/30 border border-emerald-800/40 p-3 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-emerald-300">Resumo Extraído por Inteligência Artificial</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">{doc.aiExtractedSummary}</p>
                  </div>
                  <AIReviewBadge approved={false} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL: UPLOAD DOC */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleUploadDocument} className="bg-eco-surface border border-eco-border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-eco-border pb-3">
              <h3 className="text-base font-bold text-white">Upload de Documento Ambiental</h3>
              <button type="button" onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nome do Arquivo / Estudo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Licenca_Operacao_CETESB_2026.pdf"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cliente Vinculado</label>
                <select
                  value={docClientId}
                  onChange={(e) => setDocClientId(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Categoria</label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value as any)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                >
                  <option value="Licenças & Portarias">Licenças & Portarias</option>
                  <option value="Relatórios Técnicos">Relatórios Técnicos</option>
                  <option value="Estudos de Campo">Estudos de Campo</option>
                  <option value="Contratos">Contratos</option>
                  <option value="Fiscal">Fiscal</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 bg-eco-dark p-3 rounded-lg border border-eco-border">
                <input
                  type="checkbox"
                  id="aiCheck"
                  checked={runAiExtraction}
                  onChange={(e) => setRunAiExtraction(e.target.checked)}
                  className="rounded text-brand-500"
                />
                <label htmlFor="aiCheck" className="text-slate-200 cursor-pointer font-medium">
                  Executar leitura assíncrona por IA (Extrair condicionantes e datas)
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-eco-border">
              <button type="button" onClick={() => setShowUploadModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-400">
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isProcessingAi}
                className="px-4 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-lg shadow"
              >
                {isProcessingAi ? 'Processando IA...' : 'Realizar Upload'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

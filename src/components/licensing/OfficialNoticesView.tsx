import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OfficialNotice } from '../../types';
import { 
  FileCheck2, Search, Filter, Plus, Calendar, Building2, User, ExternalLink, ShieldCheck, Download 
} from 'lucide-react';

export const OfficialNoticesView: React.FC = () => {
  const { officialNotices, addOfficialNotice } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrgan, setSelectedOrgan] = useState<string>('TODOS');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Notice Form State
  const [num, setNum] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [organ, setOrgan] = useState<OfficialNotice['organ']>('FEAM/URA Sul de Minas');
  const [subject, setSubject] = useState('');
  const [signedBy, setSignedBy] = useState('Engª. Thaynan Melo');
  const [evidenceLocation, setEvidenceLocation] = useState('Sistema Eletrônico de Informações (SEI)');
  const [seiNotes, setSeiNotes] = useState('');

  const filteredNotices = officialNotices.filter(notice => {
    const matchesOrgan = selectedOrgan === 'TODOS' || notice.organ === selectedOrgan;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      notice.noticeNumber.toLowerCase().includes(query) ||
      notice.subject.toLowerCase().includes(query) ||
      notice.seiProcessOrNotes.toLowerCase().includes(query) ||
      notice.signedBy.toLowerCase().includes(query);
    return matchesOrgan && matchesSearch;
  });

  const countFEAM = officialNotices.filter(n => n.organ === 'FEAM/URA Sul de Minas').length;
  const countSEMMA = officialNotices.filter(n => n.organ === 'Secretaria de Meio Ambiente Poços de Caldas').length;
  const countIGAM = officialNotices.filter(n => n.organ === 'IGAM / URGA').length;
  const countIBAMA = officialNotices.filter(n => n.organ === 'IBAMA').length;

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!num || !subject) return;

    addOfficialNotice({
      noticeNumber: num,
      date,
      organ,
      subject,
      signedBy,
      protocolDate: date,
      evidenceLocation,
      seiProcessOrNotes: seiNotes || 'Protocolado via SEI'
    });

    setShowAddModal(false);
    setNum('');
    setSubject('');
    setSeiNotes('');
  };

  const getOrganBadgeClass = (organName: OfficialNotice['organ']) => {
    switch (organName) {
      case 'FEAM/URA Sul de Minas':
        return 'bg-purple-950/80 text-purple-300 border-purple-800';
      case 'Secretaria de Meio Ambiente Poços de Caldas':
        return 'bg-amber-950/80 text-amber-300 border-amber-800';
      case 'IGAM / URGA':
        return 'bg-blue-950/80 text-blue-300 border-blue-800';
      case 'IBAMA':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-eco-card via-eco-surface to-eco-card p-6 rounded-2xl border border-eco-border shadow-lg">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCheck2 className="w-5.5 h-5.5 text-brand-400" />
            <span>Controle de Ofícios & Protocolos de Licenciamento</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Registro oficial de ofícios emitidos para FEAM/URA, IGAM, IBAMA e SEMMA Poços de Caldas (Responsável Técnica: <strong>Engª. Thaynan Melo</strong>).
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Ofício</span>
          </button>
        </div>
      </div>

      {/* Statistics Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-eco-surface border border-eco-border p-3.5 rounded-xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Ofícios</span>
          <div className="text-xl font-extrabold text-white mt-1">{officialNotices.length}</div>
        </div>
        <div className="bg-eco-surface border border-purple-500/30 p-3.5 rounded-xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-purple-400">FEAM / URA</span>
          <div className="text-xl font-extrabold text-purple-300 mt-1">{countFEAM}</div>
        </div>
        <div className="bg-eco-surface border border-amber-500/30 p-3.5 rounded-xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-amber-400">SEMMA Poços</span>
          <div className="text-xl font-extrabold text-amber-300 mt-1">{countSEMMA}</div>
        </div>
        <div className="bg-eco-surface border border-blue-500/30 p-3.5 rounded-xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-blue-400">IGAM / URGA</span>
          <div className="text-xl font-extrabold text-blue-300 mt-1">{countIGAM}</div>
        </div>
        <div className="bg-eco-surface border border-emerald-500/30 p-3.5 rounded-xl shadow-sm">
          <span className="text-[10px] uppercase font-bold text-emerald-400">IBAMA</span>
          <div className="text-xl font-extrabold text-emerald-300 mt-1">{countIBAMA}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-eco-surface border border-eco-border p-4 rounded-xl shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por Nº de Ofício, Processo SEI, Assunto ou RT..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-eco-dark border border-eco-border rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Órgão Ambiental:</span>
          <select
            value={selectedOrgan}
            onChange={(e) => setSelectedOrgan(e.target.value)}
            className="bg-eco-dark border border-eco-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
          >
            <option value="TODOS">Todos os Órgãos ({officialNotices.length})</option>
            <option value="FEAM/URA Sul de Minas">FEAM/URA Sul de Minas ({countFEAM})</option>
            <option value="Secretaria de Meio Ambiente Poços de Caldas">SEMMA Poços de Caldas ({countSEMMA})</option>
            <option value="IGAM / URGA">IGAM / URGA ({countIGAM})</option>
            <option value="IBAMA">IBAMA ({countIBAMA})</option>
          </select>
        </div>
      </div>

      {/* Official Notices Interactive Table */}
      <div className="bg-eco-surface border border-eco-border rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-eco-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Ofícios & Condicionantes Registrados</span>
            <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded">
              Exibindo {filteredNotices.length} de {officialNotices.length}
            </span>
          </h2>
          <span className="text-xs text-slate-400">Origem: Planilha Oficial de Controle</span>
        </div>

        <div className="divide-y divide-eco-border">
          {filteredNotices.map(notice => (
            <div key={notice.id} className="p-4 hover:bg-eco-dark/40 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-extrabold text-brand-400 font-mono bg-brand-950 px-2 py-0.5 rounded border border-brand-800">
                    Nº {notice.noticeNumber}
                  </span>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border font-mono ${getOrganBadgeClass(notice.organ)}`}>
                    {notice.organ}
                  </span>

                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    Data: {notice.date}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-100">{notice.subject}</div>

                <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                  <span className="flex items-center gap-1 text-slate-300">
                    <User className="w-3.5 h-3.5 text-brand-500" />
                    RT: <strong>{notice.signedBy}</strong>
                  </span>
                  <span>•</span>
                  <span>Protocolo: <strong className="text-slate-200">{notice.protocolDate}</strong></span>
                  <span>•</span>
                  <span className="text-slate-300 font-mono">{notice.evidenceLocation}</span>
                </div>
              </div>

              <div className="lg:w-72 shrink-0 bg-eco-dark/80 p-3 rounded-lg border border-eco-border space-y-1 text-right">
                <span className="text-[10px] uppercase font-bold text-amber-400 block">SEI / Observações:</span>
                <p className="text-[11px] text-slate-200 font-mono line-clamp-2 leading-tight">
                  {notice.seiProcessOrNotes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: ADD OFFICIAL NOTICE */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddNotice} className="bg-eco-surface border border-eco-border rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-eco-border pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-brand-400" />
                <span>Cadastrar Novo Ofício Ambiental</span>
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nº do Ofício</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 145902123/2026"
                    value={num}
                    onChange={(e) => setNum(e.target.value)}
                    className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Data</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Órgão Ambiental</label>
                <select
                  value={organ}
                  onChange={(e) => setOrgan(e.target.value as any)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                >
                  <option value="FEAM/URA Sul de Minas">FEAM/URA Sul de Minas</option>
                  <option value="Secretaria de Meio Ambiente Poços de Caldas">Secretaria de Meio Ambiente Poços de Caldas</option>
                  <option value="IGAM / URGA">IGAM / URGA</option>
                  <option value="IBAMA">IBAMA</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Assunto / Referência</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Descrição do cumprimento de condicionante ou solicitação..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Responsável pela Assinatura</label>
                  <input
                    type="text"
                    required
                    value={signedBy}
                    onChange={(e) => setSignedBy(e.target.value)}
                    className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Local da Evidência</label>
                  <input
                    type="text"
                    value={evidenceLocation}
                    onChange={(e) => setEvidenceLocation(e.target.value)}
                    className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Processo SEI / Observações</label>
                <input
                  type="text"
                  placeholder="Ex: PROC. SEI FEAM/URA 1370.01.0049245/2021-52"
                  value={seiNotes}
                  onChange={(e) => setSeiNotes(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-eco-border">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-400">
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-lg shadow">
                Salvar Ofício
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

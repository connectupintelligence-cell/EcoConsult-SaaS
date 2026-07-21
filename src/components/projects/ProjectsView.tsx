import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectTemplate, Project } from '../../types';
import { AIService } from '../../services/aiService';
import { AIReviewBadge } from '../common/AIReviewBadge';
import { 
  FolderKanban, Plus, CheckSquare, Sparkles, Layers, ListChecks, FileText, ArrowRight, ShieldCheck 
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { clients, projectTemplates, projects, addProjectTemplate, addProject } = useApp();

  const [activeTab, setActiveTab] = useState<'active' | 'templates'>('active');

  // AI Deliverable Modal State
  const [selectedProjectForAi, setSelectedProjectForAi] = useState<Project | null>(null);
  const [aiGeneratedDeliverable, setAiGeneratedDeliverable] = useState<string | null>(null);

  // New Project State
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [projName, setProjName] = useState('');
  const [projClientId, setProjClientId] = useState(clients[0]?.id || '');
  const [projTemplateId, setProjTemplateId] = useState(projectTemplates[0]?.id || '');

  // New Template State
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [tplName, setTplName] = useState('');
  const [tplCategory, setTplCategory] = useState<ProjectTemplate['category']>('Licenciamento de Instalação');
  const [tplPrompt, setTplPrompt] = useState('Gerar relatório focado na mitigação de impactos de flora e fauna local.');
  const [tplDocs, setTplDocs] = useState('Certidão de Uso do Solo, Outorga de Água, ART do RT');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const tpl = projectTemplates.find(t => t.id === projTemplateId) || projectTemplates[0];

    addProject({
      clientId: projClientId,
      templateId: tpl.id,
      name: projName || `Projeto - ${tpl.category}`,
      category: tpl.category,
      status: 'em_dia',
      progress: 10,
      responsibleUserId: 'user-2',
      startDate: new Date().toISOString().split('T')[0],
      deadlineDate: new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
      steps: tpl.defaultChecklist.map(s => ({
        id: s.id,
        title: s.title,
        completed: false,
        responsible: 'Eng. Lucas Mendes',
        dueDate: new Date(Date.now() + s.estimatedDays * 86400000).toISOString().split('T')[0]
      }))
    });

    setShowNewProjectModal(false);
    setProjName('');
  };

  const handleGenerateDeliverable = (project: Project) => {
    const tpl = projectTemplates.find(t => t.id === project.templateId) || projectTemplates[0];
    const content = AIService.generateProjectDeliverable(tpl, project.name);
    setSelectedProjectForAi(project);
    setAiGeneratedDeliverable(content);
  };

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tplName) return;

    addProjectTemplate({
      name: tplName,
      category: tplCategory,
      defaultChecklist: [
        { id: 'step-1', title: 'Diagnóstico e Levantamento Preliminar', estimatedDays: 10 },
        { id: 'step-2', title: 'Elaboração Técnica dos Documentos', estimatedDays: 15 },
        { id: 'step-3', title: 'Protocolo e Acompanhamento Institucional', estimatedDays: 5 }
      ],
      requiredDocs: tplDocs.split(',').map(d => d.trim()),
      aiPromptBase: tplPrompt
    });

    setShowNewTemplateModal(false);
    setTplName('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-brand-400" />
            <span>Gestão de Projetos & Moldes Ambientais</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Projetos direcionados por modelos (EIA/RIMA, PGRS, Outorga, LI) que orientam o checklist e o prompt da IA.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-eco-surface border border-eco-border p-1 rounded-lg flex space-x-1 text-xs">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                activeTab === 'active' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Projetos em Andamento ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                activeTab === 'templates' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Moldes / Project Templates ({projectTemplates.length})
            </button>
          </div>

          <button
            onClick={() => setShowNewProjectModal(true)}
            className="flex items-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>Iniciar Projeto</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ACTIVE PROJECTS */}
      {activeTab === 'active' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map(proj => {
            const client = clients.find(c => c.id === proj.clientId);
            const template = projectTemplates.find(t => t.id === proj.templateId);

            return (
              <div key={proj.id} className="bg-eco-surface border border-eco-border rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-semibold bg-brand-950 text-brand-400 border border-brand-800 px-2 py-0.5 rounded">
                      {proj.category}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1.5">{proj.name}</h3>
                    <div className="text-xs text-slate-400">Cliente: <strong className="text-slate-200">{client?.name}</strong></div>
                  </div>

                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    proj.status === 'atrasado' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}>
                    {proj.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Progresso Geral</span>
                    <span className="font-bold text-brand-400">{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-eco-dark h-2 rounded-full overflow-hidden border border-eco-border">
                    <div className="bg-brand-500 h-full transition-all" style={{ width: `${proj.progress}%` }} />
                  </div>
                </div>

                {/* Checklist */}
                <div className="bg-eco-dark/60 border border-eco-border rounded-lg p-3 space-y-2">
                  <div className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ListChecks className="w-3.5 h-3.5 text-brand-400" />
                      Checklist Padrão do Molde
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {proj.steps.filter(s => s.completed).length} / {proj.steps.length} concluídas
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {proj.steps.map(step => (
                      <div key={step.id} className="flex items-center justify-between text-xs text-slate-300 bg-eco-card/50 p-2 rounded border border-eco-border/50">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" checked={step.completed} readOnly className="rounded text-brand-500" />
                          <span className={step.completed ? 'line-through text-slate-500' : ''}>{step.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{step.dueDate}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Deliverable Trigger Button */}
                <div className="flex items-center justify-between pt-2 border-t border-eco-border">
                  <span className="text-[11px] text-slate-400">
                    Prompt IA: <em className="text-slate-300">{template?.aiPromptBase || 'Padrão'}</em>
                  </span>
                  <button
                    onClick={() => handleGenerateDeliverable(proj)}
                    className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Gerar Entregável via IA</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: PROJECT TEMPLATES */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowNewTemplateModal(true)}
              className="flex items-center space-x-2 bg-eco-card border border-eco-border hover:border-brand-500 text-slate-200 text-xs font-semibold px-3.5 py-2 rounded-lg transition"
            >
              <Plus className="w-4 h-4 text-brand-400" />
              <span>Novo Molde de Projeto</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectTemplates.map(tpl => (
              <div key={tpl.id} className="bg-eco-surface border border-eco-border rounded-xl p-5 shadow-sm space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{tpl.name}</h3>
                    <span className="text-[10px] font-mono text-brand-400 bg-brand-950 px-2 py-0.5 rounded border border-brand-800 mt-1 inline-block">
                      {tpl.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="bg-eco-dark/60 p-2.5 rounded border border-eco-border">
                    <span className="font-semibold text-slate-200 block mb-1">Checklist Obrigatório Padrão:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[11px]">
                      {tpl.defaultChecklist.map(s => (
                        <li key={s.id}>{s.title} ({s.estimatedDays} dias)</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-eco-dark/60 p-2.5 rounded border border-eco-border">
                    <span className="font-semibold text-slate-200 block mb-1">Documentos Exigidos por Lei:</span>
                    <p className="text-slate-400 text-[11px]">{tpl.requiredDocs.join(', ')}</p>
                  </div>

                  <div className="bg-emerald-950/40 p-2.5 rounded border border-emerald-800/40">
                    <span className="font-semibold text-emerald-400 block mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Prompt-Base Direcionador da IA:
                    </span>
                    <p className="text-slate-300 italic text-[11px]">"{tpl.aiPromptBase}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: NEW PROJECT */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateProject} className="bg-eco-surface border border-eco-border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-eco-border pb-3">
              <h3 className="text-base font-bold text-white">Iniciar Novo Projeto Ambiental</h3>
              <button type="button" onClick={() => setShowNewProjectModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nome do Projeto</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Licenciamento de Instalação - Cava Norte"
                  value={projName}
                  onChange={(e) => setProjName(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cliente</label>
                <select
                  value={projClientId}
                  onChange={(e) => setProjClientId(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Selecione o Molde / Template de Projeto</label>
                <select
                  value={projTemplateId}
                  onChange={(e) => setProjTemplateId(e.target.value)}
                  className="w-full bg-eco-dark border border-eco-border rounded-lg p-2.5 text-white focus:outline-none"
                >
                  {projectTemplates.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-eco-border">
              <button type="button" onClick={() => setShowNewProjectModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-400">
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-lg shadow">
                Criar Projeto
              </button>
            </div>
          </form>
        </div>
      )}

      {/* AI DELIVERABLE RESULT MODAL */}
      {selectedProjectForAi && aiGeneratedDeliverable && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-eco-surface border border-eco-border rounded-2xl w-full max-w-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-eco-border pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <h3 className="text-base font-bold text-white">Entregável Técnico Gerado pela IA</h3>
              </div>
              <button onClick={() => setAiGeneratedDeliverable(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <AIReviewBadge approved={false} />

            <div className="bg-eco-dark p-4 rounded-xl border border-eco-border text-slate-200 font-mono text-xs whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
              {aiGeneratedDeliverable}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-eco-border text-xs">
              <span className="text-slate-400">Aprovação salva no log de auditoria do tenant.</span>
              <button
                onClick={() => setAiGeneratedDeliverable(null)}
                className="bg-brand-600 hover:bg-brand-500 text-white font-semibold px-4 py-2 rounded-lg"
              >
                Concluir Revisão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

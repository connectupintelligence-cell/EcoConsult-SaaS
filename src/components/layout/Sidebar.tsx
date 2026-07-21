import React from 'react';
import { 
  LayoutDashboard, FileText, FolderKanban, Award, Files, DollarSign, Users, ShieldCheck, Leaf, FileCheck2 
} from 'lucide-react';

export type TabType = 'dashboard' | 'crm' | 'projects' | 'licensing' | 'notices' | 'documents' | 'financial' | 'team' | 'audit';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'notices', label: 'Controle de Ofícios', icon: <FileCheck2 className="w-4 h-4" />, badge: 'Planilha' },
    { id: 'licensing', label: 'Licenciamento Ambiental', icon: <Award className="w-4 h-4" />, badge: 'Prazos 30d' },
    { id: 'crm', label: 'CRM & Propostas', icon: <FileText className="w-4 h-4" />, badge: 'Templates' },
    { id: 'projects', label: 'Projetos & Moldes', icon: <FolderKanban className="w-4 h-4" />, badge: 'IA Prompt' },
    { id: 'documents', label: 'Gestão Documental', icon: <Files className="w-4 h-4" /> },
    { id: 'financial', label: 'Financeiro & Adapter NF', icon: <DollarSign className="w-4 h-4" />, badge: 'Adapter' },
    { id: 'team', label: 'Gestão de Equipe', icon: <Users className="w-4 h-4" /> },
    { id: 'audit', label: 'Auditoria & Logs IA', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-eco-surface border-r border-eco-border flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Brand Logo */}
        <div className="h-16 flex items-center px-6 border-b border-eco-border space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-brand-900/40">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
              EcoConsult <span className="text-brand-500 text-xs px-1.5 py-0.2 bg-brand-950 border border-brand-800 rounded">SaaS</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Gestão para Consultorias</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'bg-brand-600/15 text-brand-400 border border-brand-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-eco-card'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={isActive ? 'text-brand-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isActive ? 'bg-brand-500/20 text-brand-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & Human Review Mandate Notice */}
      <div className="p-4 border-t border-eco-border">
        <div className="bg-eco-dark/80 rounded-lg p-3 border border-eco-border text-[11px] text-slate-400">
          <div className="flex items-center space-x-1.5 font-semibold text-amber-400 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Regra de Segurança IA</span>
          </div>
          <p className="text-[10px] leading-tight text-slate-400">
            Qualquer documento ou proposta pré-gerado pela IA exige <strong className="text-slate-200">revisão técnica humana obrigatória</strong> antes do protocolo oficial.
          </p>
        </div>
      </div>
    </aside>
  );
};

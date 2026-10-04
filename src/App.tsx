import React, { useState } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth, PerfilAcesso } from './context/AuthContext';
import { isSupabaseConfigured } from './lib/supabase';
import { Header } from './components/layout/Header';
import { Sidebar, TabType } from './components/layout/Sidebar';
import { LoginView } from './components/auth/LoginView';
import { ClientPortalView } from './components/client-portal/ClientPortalView';
import { DashboardView } from './components/dashboard/DashboardView';
import { CrmView } from './components/crm/CrmView';
import { ProjectsView } from './components/projects/ProjectsView';
import { LicensingView } from './components/licensing/LicensingView';
import { OfficialNoticesView } from './components/licensing/OfficialNoticesView';
import { PortalCredentialsView } from './components/credentials/PortalCredentialsView';
import { DocumentsView } from './components/documents/DocumentsView';
import { TeamView } from './components/team/TeamView';
import { AuditView } from './components/audit/AuditView';
import { AICopilotDrawer } from './components/ai/AICopilotDrawer';

// Abas por perfil. Financeiro removido do MVP (Adendo 01, item 1.2).
// "credentials" restrito à administradora até confirmação (ver perguntas em aberto).
const TABS_POR_PERFIL: Record<Exclude<PerfilAcesso, 'cliente'>, TabType[]> = {
  administradora: ['dashboard', 'notices', 'credentials', 'licensing', 'crm', 'projects', 'documents', 'team', 'audit'],
  executora: ['dashboard', 'notices', 'licensing', 'projects', 'documents']
};

const CenteredMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-eco-dark text-slate-200 flex items-center justify-center p-6">
    <div className="max-w-md text-center text-sm space-y-3">{children}</div>
  </div>
);

const StaffLayout: React.FC<{ role: 'administradora' | 'executora' }> = ({ role }) => {
  const allowed = TABS_POR_PERFIL[role];
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState(false);
  const can = (t: TabType) => allowed.includes(t) && activeTab === t;

  return (
    <div className="flex h-screen bg-eco-dark text-slate-100 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} allowedTabs={allowed} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onOpenAiCopilot={() => setIsAiCopilotOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {can('dashboard') && <DashboardView onNavigate={(tab) => allowed.includes(tab) && setActiveTab(tab)} />}
            {can('notices') && <OfficialNoticesView />}
            {can('credentials') && <PortalCredentialsView />}
            {can('crm') && <CrmView />}
            {can('projects') && <ProjectsView />}
            {can('licensing') && <LicensingView />}
            {can('documents') && <DocumentsView />}
            {can('team') && <TeamView />}
            {can('audit') && <AuditView />}
          </div>
        </main>
      </div>
      <AICopilotDrawer isOpen={isAiCopilotOpen} onClose={() => setIsAiCopilotOpen(false)} />
    </div>
  );
};

const ClientLayout: React.FC = () => (
  <div className="flex flex-col h-screen bg-eco-dark text-slate-100 overflow-hidden">
    <Header />
    <main className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto"><ClientPortalView /></div>
    </main>
  </div>
);

const Gate: React.FC = () => {
  const { session, profile, loading, profileError, signOut } = useAuth();

  if (!isSupabaseConfigured) {
    return (
      <CenteredMessage>
        <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
        <p>Sistema sem conexão configurada com o banco de dados.</p>
        <p className="text-slate-400 text-xs">Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env e gere um novo build.</p>
      </CenteredMessage>
    );
  }
  if (loading) {
    return <CenteredMessage><Loader2 className="w-6 h-6 animate-spin text-brand-400 mx-auto" /></CenteredMessage>;
  }
  if (!session) return <LoginView />;
  if (!profile) {
    return (
      <CenteredMessage>
        <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
        <p>{profileError || 'Carregando perfil...'}</p>
        <button onClick={signOut} className="text-xs underline text-slate-400">Sair</button>
      </CenteredMessage>
    );
  }
  if (profile.role === 'cliente') return <ClientLayout />;
  return <StaffLayout role={profile.role} />;
};

export function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Gate />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;

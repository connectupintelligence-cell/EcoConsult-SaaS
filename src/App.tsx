import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar, TabType } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { CrmView } from './components/crm/CrmView';
import { ProjectsView } from './components/projects/ProjectsView';
import { LicensingView } from './components/licensing/LicensingView';
import { DocumentsView } from './components/documents/DocumentsView';
import { FinancialView } from './components/financial/FinancialView';
import { TeamView } from './components/team/TeamView';
import { AuditView } from './components/audit/AuditView';
import { AICopilotDrawer } from './components/ai/AICopilotDrawer';

const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState(false);

  return (
    <div className="flex h-screen bg-eco-dark text-slate-100 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header onOpenAiCopilot={() => setIsAiCopilotOpen(true)} />

        {/* Dynamic View Scroll Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && <DashboardView onNavigate={(tab) => setActiveTab(tab)} />}
            {activeTab === 'crm' && <CrmView />}
            {activeTab === 'projects' && <ProjectsView />}
            {activeTab === 'licensing' && <LicensingView />}
            {activeTab === 'documents' && <DocumentsView />}
            {activeTab === 'financial' && <FinancialView />}
            {activeTab === 'team' && <TeamView />}
            {activeTab === 'audit' && <AuditView />}
          </div>
        </main>
      </div>

      {/* AI Copilot Drawer */}
      <AICopilotDrawer
        isOpen={isAiCopilotOpen}
        onClose={() => setIsAiCopilotOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Tenant, User, Client, ProposalTemplate, Proposal, ProjectTemplate, Project, 
  LicensingProcess, DocumentItem, Invoice, AuditLog, UserRole 
} from '../types';
import { 
  INITIAL_TENANTS, INITIAL_USERS, INITIAL_CLIENTS, INITIAL_PROPOSAL_TEMPLATES, 
  INITIAL_PROPOSALS, INITIAL_PROJECT_TEMPLATES, INITIAL_PROJECTS, INITIAL_LICENSES, 
  INITIAL_DOCUMENTS, INITIAL_INVOICES, INITIAL_AUDIT_LOGS 
} from '../services/mockData';
import { InvoicingAdapterService } from '../services/invoicingAdapter';

interface AppContextType {
  currentTenant: Tenant;
  setCurrentTenant: (tenant: Tenant) => void;
  currentUser: User;
  setCurrentUserRole: (role: UserRole) => void;
  
  // Data for current tenant
  clients: Client[];
  proposalTemplates: ProposalTemplate[];
  proposals: Proposal[];
  projectTemplates: ProjectTemplate[];
  projects: Project[];
  licenses: LicensingProcess[];
  documents: DocumentItem[];
  invoices: Invoice[];
  auditLogs: AuditLog[];

  // Actions
  addAuditLog: (action: string, module: AuditLog['module'], isAi: boolean, details: string) => void;
  addProposalTemplate: (template: Omit<ProposalTemplate, 'id' | 'tenantId' | 'updatedAt'>) => void;
  addProposal: (proposal: Omit<Proposal, 'id' | 'tenantId' | 'createdAt'>) => void;
  updateProposalStatus: (id: string, status: Proposal['status']) => void;
  addProjectTemplate: (template: Omit<ProjectTemplate, 'id' | 'tenantId'>) => void;
  addProject: (project: Omit<Project, 'id' | 'tenantId'>) => void;
  addLicenseProcess: (process: Omit<LicensingProcess, 'id' | 'tenantId'>) => void;
  updateConditionStatus: (processId: string, conditionId: string, status: 'cumprida' | 'em_andamento' | 'pendente' | 'vencida') => void;
  emitInvoiceViaAdapter: (invoiceId: string) => Promise<boolean>;
  addDocument: (doc: Omit<DocumentItem, 'id' | 'tenantId'>) => void;
  
  // Filtered Critical Deadlines
  getCriticalDeadlinesCount: () => { danger: number; warning: number; info: number };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenants] = useState<Tenant[]>(INITIAL_TENANTS);
  const [currentTenant, setCurrentTenantState] = useState<Tenant>(INITIAL_TENANTS[0]);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);

  // Master State
  const [allClients, setAllClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [allProposalTemplates, setAllProposalTemplates] = useState<ProposalTemplate[]>(INITIAL_PROPOSAL_TEMPLATES);
  const [allProposals, setAllProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);
  const [allProjectTemplates, setAllProjectTemplates] = useState<ProjectTemplate[]>(INITIAL_PROJECT_TEMPLATES);
  const [allProjects, setAllProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [allLicenses, setAllLicenses] = useState<LicensingProcess[]>(INITIAL_LICENSES);
  const [allDocuments, setAllDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [allInvoices, setAllInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [allAuditLogs, setAllAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Sync user with current tenant
  const setCurrentTenant = (tenant: Tenant) => {
    setCurrentTenantState(tenant);
    const tenantUser = users.find(u => u.tenantId === tenant.id) || {
      id: `user-${tenant.id}`,
      tenantId: tenant.id,
      name: 'Gestor Responsável',
      email: `admin@${tenant.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br`,
      role: 'admin' as UserRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    setCurrentUser(tenantUser);
  };

  const setCurrentUserRole = (role: UserRole) => {
    setCurrentUser(prev => ({ ...prev, role }));
  };

  // Filtered views per Tenant
  const clients = allClients.filter(c => c.tenantId === currentTenant.id);
  const proposalTemplates = allProposalTemplates.filter(pt => pt.tenantId === currentTenant.id);
  const proposals = allProposals.filter(p => p.tenantId === currentTenant.id);
  const projectTemplates = allProjectTemplates.filter(pjt => pjt.tenantId === currentTenant.id);
  const projects = allProjects.filter(p => p.tenantId === currentTenant.id);
  const licenses = allLicenses.filter(l => l.tenantId === currentTenant.id);
  const documents = allDocuments.filter(d => d.tenantId === currentTenant.id);
  const invoices = allInvoices.filter(i => i.tenantId === currentTenant.id);
  const auditLogs = allAuditLogs.filter(a => a.tenantId === currentTenant.id);

  const addAuditLog = (action: string, module: AuditLog['module'], isAi: boolean, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      tenantId: currentTenant.id,
      userName: currentUser.name,
      action,
      module,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      isAiAction: isAi,
      details
    };
    setAllAuditLogs(prev => [newLog, ...prev]);
  };

  const addProposalTemplate = (template: Omit<ProposalTemplate, 'id' | 'tenantId' | 'updatedAt'>) => {
    const newTpl: ProposalTemplate = {
      ...template,
      id: `pt-${Date.now()}`,
      tenantId: currentTenant.id,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setAllProposalTemplates(prev => [...prev, newTpl]);
    addAuditLog(`Novo Template de Proposta: ${newTpl.title}`, 'CRM', false, 'Template cadastrado.');
  };

  const addProposal = (proposalData: Omit<Proposal, 'id' | 'tenantId' | 'createdAt'>) => {
    const newProp: Proposal = {
      ...proposalData,
      id: `prop-${Date.now()}`,
      tenantId: currentTenant.id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAllProposals(prev => [newProp, ...prev]);
    addAuditLog(`Proposta criada: ${newProp.title}`, 'CRM', newProp.generatedByAI, `Valor: R$ ${newProp.totalValue.toLocaleString('pt-BR')}`);
  };

  const updateProposalStatus = (id: string, status: Proposal['status']) => {
    setAllProposals(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    addAuditLog(`Status de Proposta alterado para ${status.toUpperCase()}`, 'CRM', false, `ID: ${id}`);
  };

  const addProjectTemplate = (templateData: Omit<ProjectTemplate, 'id' | 'tenantId'>) => {
    const newTpl: ProjectTemplate = {
      ...templateData,
      id: `pj-tpl-${Date.now()}`,
      tenantId: currentTenant.id
    };
    setAllProjectTemplates(prev => [...prev, newTpl]);
    addAuditLog(`Novo Modelo de Projeto: ${newTpl.name}`, 'Projetos', false, `Categoria: ${newTpl.category}`);
  };

  const addProject = (projectData: Omit<Project, 'id' | 'tenantId'>) => {
    const newProj: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      tenantId: currentTenant.id
    };
    setAllProjects(prev => [newProj, ...prev]);
    addAuditLog(`Novo Projeto iniciado: ${newProj.name}`, 'Projetos', false, `Cliente ID: ${newProj.clientId}`);
  };

  const addLicenseProcess = (processData: Omit<LicensingProcess, 'id' | 'tenantId'>) => {
    const newLic: LicensingProcess = {
      ...processData,
      id: `lic-${Date.now()}`,
      tenantId: currentTenant.id
    };
    setAllLicenses(prev => [newLic, ...prev]);
    addAuditLog(`Novo Processo Ambiental cadastrado: ${newLic.processNumber}`, 'Licenciamento', false, `Órgão: ${newLic.environmentalOrgan}`);
  };

  const updateConditionStatus = (processId: string, conditionId: string, status: 'cumprida' | 'em_andamento' | 'pendente' | 'vencida') => {
    setAllLicenses(prev => prev.map(l => {
      if (l.id === processId) {
        return {
          ...l,
          conditions: l.conditions.map(c => c.id === conditionId ? { ...c, status } : c)
        };
      }
      return l;
    }));
    addAuditLog(`Status da Condicionante alterado para ${status}`, 'Licenciamento', false, `Processo ID: ${processId}`);
  };

  const emitInvoiceViaAdapter = async (invoiceId: string): Promise<boolean> => {
    const targetInvoice = allInvoices.find(i => i.id === invoiceId);
    if (!targetInvoice) return false;

    const adapter = new InvoicingAdapterService({
      provider: currentTenant.id === 'tenant-1' ? 'FocusNFe' : 'PlugNotas',
      apiKey: 'sk_test_eco_consult_2026_key',
      environment: 'homologation'
    });

    const result = await adapter.emitInvoice(targetInvoice);
    if (result.success) {
      setAllInvoices(prev => prev.map(i => i.id === invoiceId ? {
        ...i,
        status: 'emitida',
        fiscalRef: result.fiscalRef,
        xmlMockContent: result.xmlMock
      } : i));
      addAuditLog(`NF emitida via Adapter (${adapter.getProviderInfo().provider})`, 'Financeiro', false, result.fiscalRef);
      return true;
    } else {
      setAllInvoices(prev => prev.map(i => i.id === invoiceId ? { ...i, status: 'erro' } : i));
      addAuditLog(`Falha na emissão de NF via Adapter`, 'Financeiro', false, result.errorMessage || 'Erro de emissão');
      return false;
    }
  };

  const addDocument = (docData: Omit<DocumentItem, 'id' | 'tenantId'>) => {
    const newDoc: DocumentItem = {
      ...docData,
      id: `doc-${Date.now()}`,
      tenantId: currentTenant.id
    };
    setAllDocuments(prev => [newDoc, ...prev]);
    addAuditLog(`Novo documento catalogado: ${newDoc.title}`, 'Documentos', newDoc.isAiParsed, `Categoria: ${newDoc.category}`);
  };

  const getCriticalDeadlinesCount = () => {
    let danger = 0; // <= 5 dias ou vencida
    let warning = 0; // <= 15 dias
    let info = 0; // <= 30 dias

    const today = new Date().getTime();

    licenses.forEach(lic => {
      // Checar vencimento da licença
      const expTime = new Date(lic.expirationDate).getTime();
      const diffDays = Math.ceil((expTime - today) / (1000 * 3600 * 24));

      if (diffDays <= 5) danger++;
      else if (diffDays <= 15) warning++;
      else if (diffDays <= 30) info++;

      // Checar condicionantes
      lic.conditions.forEach(cond => {
        if (cond.status !== 'cumprida') {
          const condTime = new Date(cond.deadlineDate).getTime();
          const condDiff = Math.ceil((condTime - today) / (1000 * 3600 * 24));
          if (condDiff <= 5 || cond.status === 'vencida') danger++;
          else if (condDiff <= 15) warning++;
          else if (condDiff <= 30) info++;
        }
      });
    });

    return { danger, warning, info };
  };

  return (
    <AppContext.Provider value={{
      currentTenant,
      setCurrentTenant,
      currentUser,
      setCurrentUserRole,
      clients,
      proposalTemplates,
      proposals,
      projectTemplates,
      projects,
      licenses,
      documents,
      invoices,
      auditLogs,
      addAuditLog,
      addProposalTemplate,
      addProposal,
      updateProposalStatus,
      addProjectTemplate,
      addProject,
      addLicenseProcess,
      updateConditionStatus,
      emitInvoiceViaAdapter,
      addDocument,
      getCriticalDeadlinesCount
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};

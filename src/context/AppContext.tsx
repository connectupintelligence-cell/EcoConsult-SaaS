import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Tenant, User, Client, ProposalTemplate, Proposal, ProjectTemplate, Project, 
  LicensingProcess, DocumentItem, Invoice, AuditLog, OfficialNotice, PortalCredential, UserRole 
} from '../types';
import { 
  INITIAL_TENANTS, INITIAL_USERS, INITIAL_CLIENTS, INITIAL_PROPOSAL_TEMPLATES, 
  INITIAL_PROPOSALS, INITIAL_PROJECT_TEMPLATES, INITIAL_PROJECTS, INITIAL_LICENSES, 
  INITIAL_DOCUMENTS, INITIAL_INVOICES, INITIAL_AUDIT_LOGS, INITIAL_OFFICIAL_NOTICES, INITIAL_PORTAL_CREDENTIALS 
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
  officialNotices: OfficialNotice[];
  portalCredentials: PortalCredential[];

  // Actions
  addAuditLog: (action: string, module: AuditLog['module'], isAi: boolean, details: string) => void;
  addClient: (client: Omit<Client, 'id' | 'tenantId'>) => Promise<boolean>;
  addProposalTemplate: (template: Omit<ProposalTemplate, 'id' | 'tenantId' | 'updatedAt'>) => void;
  addProposal: (proposal: Omit<Proposal, 'id' | 'tenantId' | 'createdAt'>) => void;
  updateProposalStatus: (id: string, status: Proposal['status']) => void;
  addProjectTemplate: (template: Omit<ProjectTemplate, 'id' | 'tenantId'>) => void;
  addProject: (project: Omit<Project, 'id' | 'tenantId'>) => void;
  addLicenseProcess: (process: Omit<LicensingProcess, 'id' | 'tenantId'>) => void;
  updateConditionStatus: (processId: string, conditionId: string, status: 'cumprida' | 'em_andamento' | 'pendente' | 'vencida') => void;
  emitInvoiceViaAdapter: (invoiceId: string) => Promise<boolean>;
  addDocument: (doc: Omit<DocumentItem, 'id' | 'tenantId'>) => void;
  toggleDocumentStatus: (docId: string, field: 'is_liberado' | 'is_validado', value: boolean) => Promise<boolean>;
  addOfficialNotice: (notice: Omit<OfficialNotice, 'id' | 'tenantId'>) => void;
  addPortalCredential: (credential: Omit<PortalCredential, 'id' | 'tenantId'>) => void;
  
  // Filtered Critical Deadlines
  getCriticalDeadlinesCount: () => { danger: number; warning: number; info: number; config: { CRITICAL_DAYS: number; WARNING_DAYS: number; INFO_DAYS: number } };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenants] = useState<Tenant[]>(INITIAL_TENANTS);
  const [currentTenant, setCurrentTenantState] = useState<Tenant>(INITIAL_TENANTS[0]);
  const [users] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);

  // Master State
  const [allClients, setAllClients] = useState<Client[]>(INITIAL_CLIENTS);
  
  // Real database fetch for Clients
  useEffect(() => {
    import('../lib/supabase').then(({ supabase }) => {
      if (!supabase) return;
      supabase.from('clients').select('*').then(({ data, error }) => {
        if (!error && data) {
          const mappedClients: Client[] = data.map((c: any) => ({
            id: c.id,
            tenantId: 'tenant-cbp',
            name: c.nome,
            cnpj: c.documento, // maps to CPF or CNPJ
            contactPerson: c.contact_person || '',
            email: c.email || '',
            phone: c.phone || '',
            sector: c.sector || 'Outros',
            city: c.cidade || '',
            state: c.uf || ''
          }));
          setAllClients(mappedClients);
        }
      });
      
      // Fetch Documents from the new documents table
      supabase.from('documents').select('*').then(({ data, error }) => {
        if (!error && data) {
          const mappedDocs: DocumentItem[] = data.map((d: any) => ({
            id: d.id,
            tenantId: 'tenant-cbp', // fallback, ignored
            clientId: d.client_id,
            title: d.title,
            category: d.category,
            currentVersion: d.version_number,
            versions: [{
              versionNumber: d.version_number,
              fileName: d.storage_path,
              uploadedAt: new Date(d.created_at).toISOString().split('T')[0],
              uploadedBy: d.uploaded_by,
              fileSize: d.file_size || 'N/A',
              note: d.is_liberado ? 'Liberado para cliente' : 'Uso Interno'
            }],
            isAiParsed: !!d.ai_summary,
            aiExtractedSummary: d.ai_summary,
            isLiberado: d.is_liberado,
            isValidado: d.is_validado
          }));
          setAllDocuments(mappedDocs);
        }
      });

      // Fetch Licensing Data
      supabase.from('licensing_processes').select('*, licensing_conditions(*)').then(({ data, error }) => {
        if (!error && data) {
          const mappedLicenses: LicensingProcess[] = data.map((lp: any) => ({
            id: lp.id,
            tenantId: 'tenant-cbp',
            clientId: lp.client_id,
            processNumber: lp.process_number,
            environmentalOrgan: lp.environmental_organ,
            licenseType: lp.license_type,
            issueDate: lp.issue_date,
            expirationDate: lp.expiration_date,
            status: lp.status,
            conditions: (lp.licensing_conditions || []).map((c: any) => ({
              id: c.id,
              processId: lp.id,
              title: c.description.length > 30 ? c.description.substring(0, 30) + '...' : c.description,
              description: c.description,
              deadlineDate: c.deadline_date,
              status: c.status,
              alertDays: 30
            }))
          }));
          setAllLicenses(mappedLicenses);
        }
      });
    });
  }, []);

  const [allProposalTemplates, setAllProposalTemplates] = useState<ProposalTemplate[]>(INITIAL_PROPOSAL_TEMPLATES);
  const [allProposals, setAllProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);
  const [allProjectTemplates, setAllProjectTemplates] = useState<ProjectTemplate[]>(INITIAL_PROJECT_TEMPLATES);
  const [allProjects, setAllProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [allLicenses, setAllLicenses] = useState<LicensingProcess[]>(INITIAL_LICENSES);
  const [allDocuments, setAllDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [allInvoices, setAllInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [allAuditLogs, setAllAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [allOfficialNotices, setAllOfficialNotices] = useState<OfficialNotice[]>(INITIAL_OFFICIAL_NOTICES);
  const [allPortalCredentials, setAllPortalCredentials] = useState<PortalCredential[]>(INITIAL_PORTAL_CREDENTIALS);

  // Sync user with current tenant
  const setCurrentTenant = (tenant: Tenant) => {
    setCurrentTenantState(tenant);
    const tenantUser = users.find(u => u.tenantId === tenant.id) || {
      id: `user-${tenant.id}`,
      tenantId: tenant.id,
      name: 'Usuária de Teste',
      email: `admin@${tenant.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br`,
      role: 'admin' as UserRole,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
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
  const officialNotices = allOfficialNotices.filter(o => o.tenantId === currentTenant.id);
  const portalCredentials = allPortalCredentials.filter(c => c.tenantId === currentTenant.id);

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

  const addClient = async (clientData: Omit<Client, 'id' | 'tenantId'>) => {
    const { supabase } = await import('../lib/supabase');
    if (!supabase) return false;
    
    // Identificar CPF vs CNPJ para salvar no banco
    const tipo = clientData.cnpj.length > 14 ? 'CNPJ' : 'CPF';
    const num = clientData.cnpj.replace(/\D/g, '');

    const { data, error } = await supabase.from('clients').insert({
      nome: clientData.name,
      tipo_documento: tipo,
      documento: num,
      contact_person: clientData.contactPerson,
      email: clientData.email,
      phone: clientData.phone,
      sector: clientData.sector,
      cidade: clientData.city,
      uf: clientData.state
    }).select().single();

    if (!error && data) {
      const newClient: Client = {
        ...clientData,
        id: data.id,
        tenantId: 'tenant-cbp'
      };
      setAllClients(prev => [...prev, newClient]);
      addAuditLog(`Novo cliente cadastrado: ${newClient.name}`, 'CRM', false, `Documento: ${num}`);
      return true;
    }
    return false;
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

  const toggleDocumentStatus = async (docId: string, field: 'is_liberado' | 'is_validado', value: boolean) => {
    try {
      const { supabase } = await import('../lib/supabase');
      if (!supabase) return false;
      const { error } = await supabase.from('documents').update({ [field]: value }).eq('id', docId);
      if (error) throw error;
      
      setAllDocuments(prev => prev.map(d => d.id === docId ? { 
        ...d, 
        isLiberado: field === 'is_liberado' ? value : d.isLiberado,
        isValidado: field === 'is_validado' ? value : d.isValidado
      } : d));
      
      const actionStr = field === 'is_liberado' ? (value ? 'liberado ao cliente' : 'retirado do cliente') : (value ? 'validado pelo cliente' : 'invalidação');
      addAuditLog(`Documento marcado como ${actionStr}`, 'Documentos', false, `Doc ID: ${docId}`);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const addOfficialNotice = (noticeData: Omit<OfficialNotice, 'id' | 'tenantId'>) => {
    const newNotice: OfficialNotice = {
      ...noticeData,
      id: `of-${Date.now()}`,
      tenantId: currentTenant.id
    };
    setAllOfficialNotices(prev => [newNotice, ...prev]);
    addAuditLog(`Ofício cadastrado: ${newNotice.noticeNumber}`, 'Controle de Ofícios', false, `Órgão: ${newNotice.organ}`);
  };

  const addPortalCredential = (credData: Omit<PortalCredential, 'id' | 'tenantId'>) => {
    const newCred: PortalCredential = {
      ...credData,
      id: `cred-${Date.now()}`,
      tenantId: currentTenant.id
    };
    setAllPortalCredentials(prev => [...prev, newCred]);
    addAuditLog(`Nova credencial cadastrada para ${newCred.systemName}`, 'Portais & Credenciais', false, `Login/CNPJ: ${newCred.loginCnpjOrUser}`);
  };

  const getCriticalDeadlinesCount = () => {
    let danger = 0;
    let warning = 0;
    let info = 0;

    const today = new Date().getTime();
    
    // As faixas serão redefinidas pela Cristiane em 10/10
    const CRITICAL_DAYS = 5;
    const WARNING_DAYS = 15;
    const INFO_DAYS = 30;

    licenses.forEach(lic => {
      const expTime = new Date(lic.expirationDate).getTime();
      const diffDays = Math.ceil((expTime - today) / (1000 * 3600 * 24));

      if (diffDays <= CRITICAL_DAYS) danger++;
      else if (diffDays <= WARNING_DAYS) warning++;
      else if (diffDays <= INFO_DAYS) info++;

      lic.conditions.forEach(cond => {
        if (cond.status !== 'cumprida') {
          const condTime = new Date(cond.deadlineDate).getTime();
          const condDiff = Math.ceil((condTime - today) / (1000 * 3600 * 24));
          if (condDiff <= CRITICAL_DAYS || cond.status === 'vencida') danger++;
          else if (condDiff <= WARNING_DAYS) warning++;
          else if (condDiff <= INFO_DAYS) info++;
        }
      });
    });

    return { danger, warning, info, config: { CRITICAL_DAYS, WARNING_DAYS, INFO_DAYS } };
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
      officialNotices,
      portalCredentials,
      addAuditLog,
      addClient,
      addProposalTemplate,
      addProposal,
      updateProposalStatus,
      addProjectTemplate,
      addProject,
      addLicenseProcess,
      updateConditionStatus,
      emitInvoiceViaAdapter,
      addDocument,
      toggleDocumentStatus,
      addOfficialNotice,
      addPortalCredential,
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

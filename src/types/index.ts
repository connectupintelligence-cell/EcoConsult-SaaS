export type UserRole = 'admin' | 'gestor' | 'tecnico' | 'financeiro' | 'cliente_externo';

export interface Tenant {
  id: string;
  name: string;
  cnpj: string;
  logo: string;
  fiscalCity: string;
  state: string;
  plan: 'Professional' | 'Enterprise';
}

export interface User {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Client {
  id: string;
  tenantId: string;
  name: string;
  cnpj: string;
  contactPerson: string;
  email: string;
  phone: string;
  sector: 'Mineração' | 'Indústria' | 'Agronegócio' | 'Energia' | 'Construção Civil' | 'Logística' | 'Alimentício';
  city: string;
  state: string;
}

export interface ProposalTemplate {
  id: string;
  tenantId: string;
  title: string;
  serviceType: string;
  placeholders: string[]; // e.g. ['cliente', 'escopo', 'valor', 'prazo']
  contentMarkdown: string;
  updatedAt: string;
}

export interface Proposal {
  id: string;
  tenantId: string;
  clientId: string;
  templateId: string;
  title: string;
  version: number;
  filledValues: Record<string, string>;
  totalValue: number;
  deliveryDays: number;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'recusado';
  generatedByAI: boolean;
  humanApproved: boolean;
  createdAt: string;
}

export interface ProjectTemplateStep {
  id: string;
  title: string;
  estimatedDays: number;
}

export interface ProjectTemplate {
  id: string;
  tenantId: string;
  name: string;
  category: 'Licenciamento de Instalação' | 'PGRS' | 'Estudo de Impacto Ambiental (EIA/RIMA)' | 'Outorga de Uso de Água' | 'PRAD';
  defaultChecklist: ProjectTemplateStep[];
  requiredDocs: string[];
  aiPromptBase: string;
}

export interface ProjectStep {
  id: string;
  title: string;
  completed: boolean;
  responsible: string;
  dueDate: string;
}

export interface Project {
  id: string;
  tenantId: string;
  clientId: string;
  templateId?: string;
  name: string;
  category: string;
  status: 'em_dia' | 'atrasado' | 'concluido';
  progress: number; // 0 - 100
  responsibleUserId: string;
  startDate: string;
  deadlineDate: string;
  steps: ProjectStep[];
}

export interface LicensingCondition {
  id: string;
  processId: string;
  title: string;
  description: string;
  deadlineDate: string; // ISO date
  alertDays: number; // e.g., 30, 15, 5
  status: 'cumprida' | 'em_andamento' | 'pendente' | 'vencida';
}

export interface LicensingProcess {
  id: string;
  tenantId: string;
  clientId: string;
  processNumber: string;
  environmentalOrgan: 'IBAMA' | 'CETESB' | 'INEA' | 'IAT' | 'SEMAD' | 'FEPAM' | 'FAPAM' | 'FEAM/URA Sul de Minas' | 'Secretaria de Meio Ambiente Poços de Caldas' | 'IGAM / URGA';
  licenseType: 'LP' | 'LI' | 'LO' | 'Outorga' | 'ASV' | 'AA' | 'Ofício/Processo';
  issueDate: string;
  expirationDate: string;
  status: 'protocolado' | 'em_analise' | 'deferido' | 'pendencia' | 'vencido';
  conditions: LicensingCondition[];
}

export interface DocumentVersion {
  versionNumber: number;
  fileName: string;
  uploadedAt: string;
  uploadedBy: string;
  fileSize: string;
  note?: string;
}

export interface DocumentItem {
  id: string;
  tenantId: string;
  clientId: string;
  projectId?: string;
  title: string;
  category: 'Licenças & Portarias' | 'Relatórios Técnicos' | 'Estudos de Campo' | 'Contratos' | 'Fiscal' | 'Ofícios Emitidos';
  currentVersion: number;
  versions: DocumentVersion[];
  isAiParsed: boolean;
  aiExtractedSummary?: string;
}

export interface Invoice {
  id: string;
  tenantId: string;
  clientId: string;
  contractTitle: string;
  amount: number;
  dueDate: string;
  issueDate: string;
  status: 'pendente' | 'emitida' | 'cancelada' | 'erro';
  provider: 'FocusNFe' | 'PlugNotas' | 'eNotas' | 'EmissorMunicipal';
  fiscalRef?: string;
  xmlMockContent?: string;
}

export interface AuditLog {
  id: string;
  tenantId: string;
  userName: string;
  action: string;
  module: 'CRM' | 'Projetos' | 'Licenciamento' | 'Documentos' | 'Financeiro' | 'IA Engine' | 'Controle de Ofícios';
  timestamp: string;
  isAiAction: boolean;
  details: string;
}

export interface OfficialNotice {
  id: string;
  tenantId: string;
  noticeNumber: string;
  date: string;
  organ: 'FEAM/URA Sul de Minas' | 'Secretaria de Meio Ambiente Poços de Caldas' | 'IGAM / URGA' | 'IBAMA';
  subject: string;
  signedBy: string;
  protocolDate: string;
  evidenceLocation: string;
  seiProcessOrNotes: string;
}

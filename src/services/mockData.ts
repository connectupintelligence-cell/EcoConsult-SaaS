// =====================================================================
// DADOS DE TESTE — FICTÍCIOS
// Adendo 01, seção 2: até o backup do Supabase estar confirmado,
// NENHUM dado real de cliente pode estar no sistema.
// Nomes, CPF/CNPJ, processos e senhas abaixo são inventados.
// =====================================================================
import { Tenant, User, Client, ProposalTemplate, Proposal, ProjectTemplate, Project, LicensingProcess, DocumentItem, Invoice, AuditLog, OfficialNotice, PortalCredential } from '../types';

const T = 'tenant-cbp';

const daysFromNow = (d: number) => {
  const dt = new Date();
  dt.setDate(dt.getDate() + d);
  return dt.toISOString().split('T')[0];
};

export const INITIAL_TENANTS: Tenant[] = [
  { id: T, name: 'Consultoria Ambiental (ambiente de teste)', cnpj: '00.000.000/0001-00', logo: '🌿', fiscalCity: 'Cidade Teste', state: 'MG', plan: 'Enterprise' }
];

export const INITIAL_USERS: User[] = [
  { id: 'user-test', tenantId: T, name: 'Usuária de Teste', email: 'teste@exemplo.com', role: 'admin', avatar: '' }
];

export const INITIAL_CLIENTS: Client[] = [
  { id: 'cli-teste-1', tenantId: T, name: 'Indústria Teste Alfa Ltda', cnpj: '11.111.111/0001-11', contactPerson: 'Contato Alfa', email: 'alfa@exemplo.com', phone: '(00) 0000-0001', sector: 'Indústria', city: 'Cidade Teste', state: 'MG' },
  { id: 'cli-teste-2', tenantId: T, name: 'Fazenda Teste Beta (pessoa física)', cnpj: 'CPF 111.111.111-11', contactPerson: 'Produtor Beta', email: 'beta@exemplo.com', phone: '(00) 0000-0002', sector: 'Agronegócio', city: 'Cidade Teste', state: 'MG' },
  { id: 'cli-teste-3', tenantId: T, name: 'Loteamento Teste Gama', cnpj: '22.222.222/0001-22', contactPerson: 'Contato Gama', email: 'gama@exemplo.com', phone: '(00) 0000-0003', sector: 'Construção Civil', city: 'Cidade Teste', state: 'SP' }
];

export const INITIAL_PORTAL_CREDENTIALS: PortalCredential[] = [
  { id: 'cred-t1', tenantId: T, clientId: 'cli-teste-1', systemName: 'Sistema MTR', loginCnpjOrUser: '11111111000111', encryptedPassword: '•••••••• (senha-ficticia)', notes: 'Credencial FICTÍCIA para teste' },
  { id: 'cred-t2', tenantId: T, clientId: 'cli-teste-1', systemName: 'IBAMA', loginCnpjOrUser: '11.111.111/0001-11', encryptedPassword: '•••••••• (senha-ficticia)', notes: 'Credencial FICTÍCIA para teste' }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-t1', tenantId: T, clientId: 'cli-teste-1', title: 'Licenca_Operacao_TESTE.pdf', category: 'Licenças & Portarias', currentVersion: 1,
    versions: [{ versionNumber: 1, fileName: 'Licenca_Operacao_TESTE.pdf', uploadedAt: daysFromNow(-30), uploadedBy: 'Usuária de Teste', fileSize: '1.0 MB', note: 'Documento fictício' }],
    isAiParsed: false
  },
  {
    id: 'doc-t2', tenantId: T, clientId: 'cli-teste-2', title: 'Recibo_CAR_TESTE.pdf', category: 'Licenças & Portarias', currentVersion: 1,
    versions: [{ versionNumber: 1, fileName: 'Recibo_CAR_TESTE.pdf', uploadedAt: daysFromNow(-10), uploadedBy: 'Usuária de Teste', fileSize: '0.5 MB', note: 'Documento fictício' }],
    isAiParsed: false
  }
];

export const INITIAL_OFFICIAL_NOTICES: OfficialNotice[] = [
  { id: 'of-t1', tenantId: T, noticeNumber: 'TESTE-001/2026', date: daysFromNow(-20), organ: 'IBAMA', subject: 'Ofício fictício para teste', signedBy: 'Usuária de Teste', protocolDate: daysFromNow(-19), evidenceLocation: 'Teste', seiProcessOrNotes: 'Processo fictício 0000.00.0000000/2026-00' }
];

export const INITIAL_PROPOSAL_TEMPLATES: ProposalTemplate[] = [
  {
    id: 'pt-1', tenantId: T, title: 'Modelo de Proposta (teste)', serviceType: 'Licenciamento Ambiental',
    placeholders: ['cliente', 'escopo', 'valor', 'prazo', 'responsavel_tecnico'],
    contentMarkdown: `## PROPOSTA (MODELO DE TESTE)\n\n**Contratante:** {{cliente}}\n**Responsável Técnica:** {{responsavel_tecnico}}\n\n### Escopo\n- {{escopo}}\n\n### Valor\nR$ {{valor}}\n\n### Prazo\n{{prazo}} dias úteis.`,
    updatedAt: daysFromNow(0)
  }
];

export const INITIAL_PROPOSALS: Proposal[] = [];

export const INITIAL_PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'pj-tpl-1', tenantId: T, name: 'Modelo de Projeto (teste)', category: 'Outorga de Uso de Água',
    defaultChecklist: [
      { id: 'st-1', title: 'Levantamento de documentos', estimatedDays: 5 },
      { id: 'st-2', title: 'Protocolo no órgão', estimatedDays: 10 }
    ],
    requiredDocs: ['Documento de teste'],
    aiPromptBase: 'Modelo de teste.'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-t1', tenantId: T, clientId: 'cli-teste-1', name: 'Renovação de LO (teste)', category: 'Licenciamento de Instalação',
    status: 'em_dia', progress: 40, responsibleUserId: 'user-test', startDate: daysFromNow(-60), deadlineDate: daysFromNow(45),
    steps: [
      { id: 's1', title: 'Coleta de documentos', completed: true, responsible: 'Executora (teste)', dueDate: daysFromNow(-30) },
      { id: 's2', title: 'Protocolo', completed: false, responsible: 'Executora (teste)', dueDate: daysFromNow(20) }
    ]
  }
];

export const INITIAL_LICENSES: LicensingProcess[] = [
  {
    id: 'lic-t1', tenantId: T, clientId: 'cli-teste-1', processNumber: 'TESTE 0001/2026', environmentalOrgan: 'IBAMA', licenseType: 'LO',
    issueDate: daysFromNow(-300), expirationDate: daysFromNow(6), status: 'em_analise',
    conditions: [{ id: 'c1', processId: 'lic-t1', title: 'Condicionante fictícia', description: 'Teste', deadlineDate: daysFromNow(12), alertDays: 30, status: 'pendente' }]
  },
  {
    id: 'lic-t2', tenantId: T, clientId: 'cli-teste-2', processNumber: 'TESTE 0002/2026', environmentalOrgan: 'IGAM / URGA', licenseType: 'Outorga',
    issueDate: daysFromNow(-200), expirationDate: daysFromNow(25), status: 'deferido', conditions: []
  },
  {
    id: 'lic-t3', tenantId: T, clientId: 'cli-teste-3', processNumber: 'TESTE 0003/2026', environmentalOrgan: 'CETESB', licenseType: 'LP',
    issueDate: daysFromNow(-100), expirationDate: daysFromNow(90), status: 'protocolado', conditions: []
  }
];

// Financeiro está fora do MVP (Adendo 01, item 1.2) — mantido vazio.
export const INITIAL_INVOICES: Invoice[] = [];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [];

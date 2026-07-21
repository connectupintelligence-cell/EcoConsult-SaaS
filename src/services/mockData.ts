import { Tenant, User, Client, ProposalTemplate, Proposal, ProjectTemplate, Project, LicensingProcess, DocumentItem, Invoice, AuditLog } from '../types';

export const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'tenant-1',
    name: 'VerdeAmbiental Consultoria',
    cnpj: '12.345.678/0001-90',
    logo: '🌱',
    fiscalCity: 'São Paulo',
    state: 'SP',
    plan: 'Enterprise'
  },
  {
    id: 'tenant-2',
    name: 'BioEco Engenharia & Meio Ambiente',
    cnpj: '98.765.432/0001-10',
    logo: '🌊',
    fiscalCity: 'Curitiba',
    state: 'PR',
    plan: 'Professional'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-1',
    tenantId: 'tenant-1',
    name: 'Dra. Camila Siqueira',
    email: 'camila@verdeambiental.com.br',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-2',
    tenantId: 'tenant-1',
    name: 'Eng. Lucas Mendes',
    email: 'lucas@verdeambiental.com.br',
    role: 'tecnico',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-3',
    tenantId: 'tenant-1',
    name: 'Roberto Alencar',
    email: 'roberto@verdeambiental.com.br',
    role: 'financeiro',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-4',
    tenantId: 'tenant-2',
    name: 'Dr. Fernando Paes',
    email: 'fernando@bioeco.com.br',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli-1',
    tenantId: 'tenant-1',
    name: 'Mineração Serra Dourada S/A',
    cnpj: '44.111.222/0001-33',
    contactPerson: 'Juliano Prado',
    email: 'juliano@serradourada.com.br',
    phone: '(11) 98765-4321',
    sector: 'Mineração',
    city: 'Belo Horizonte',
    state: 'MG'
  },
  {
    id: 'cli-2',
    tenantId: 'tenant-1',
    name: 'Indústria Química Paulista Ltda',
    cnpj: '55.333.444/0001-88',
    contactPerson: 'Renata Farias',
    email: 'rfarias@iquimica.com.br',
    phone: '(19) 3456-7890',
    sector: 'Indústria',
    city: 'Campinas',
    state: 'SP'
  },
  {
    id: 'cli-3',
    tenantId: 'tenant-1',
    name: 'Agropecuária Vale Verde',
    cnpj: '66.777.888/0001-99',
    contactPerson: 'Marcos Pozzi',
    email: 'mpozzi@valeverde.com.br',
    phone: '(16) 99123-8899',
    sector: 'Agronegócio',
    city: 'Ribeirão Preto',
    state: 'SP'
  },
  {
    id: 'cli-4',
    tenantId: 'tenant-2',
    name: 'Parque Eólico Ventos do Sul',
    cnpj: '77.888.999/0001-11',
    contactPerson: 'Carla Hoffmann',
    email: 'carla@ventosdosul.com.br',
    phone: '(41) 98877-6655',
    sector: 'Energia',
    city: 'Curitiba',
    state: 'PR'
  }
];

export const INITIAL_PROPOSAL_TEMPLATES: ProposalTemplate[] = [
  {
    id: 'pt-1',
    tenantId: 'tenant-1',
    title: 'Proposta Comercial - Licenciamento de Instalação (LI)',
    serviceType: 'Licenciamento Ambiental',
    placeholders: ['cliente', 'escopo', 'valor', 'prazo', 'responsavel_tecnico'],
    contentMarkdown: `## PROPOSTA COMERCIAL DE CONSULTORIA AMBIENTAL

**Contratante:** {{cliente}}
**Elaborado por:** VerdeAmbiental Consultoria
**Responsável Técnico:** {{responsavel_tecnico}}

---

### 1. Escopo dos Serviços
A VerdeAmbiental prestará assessoria técnica especializada para obtenção da Licença de Instalação (LI), incluindo:
- {{escopo}}
- Protocolo e acompanhamento junto ao órgão ambiental competente.
- Elaboração do Relatório de Controle Ambiental (RCA) e Plano de Controle Ambiental (PCA).

### 2. Investimento e Condições Financeiras
- **Valor Total:** R$ {{valor}}
- **Forma de Pagamento:** 40% no aceite da proposta, 30% no protocolo, 30% na emissão da licença.

### 3. Prazo de Execução
Estimado em **{{prazo}} dias úteis** a contar do envio completo da documentação pelo cliente.

*Validade desta proposta: 15 dias.*`,
    updatedAt: '2026-07-10'
  },
  {
    id: 'pt-2',
    tenantId: 'tenant-1',
    title: 'Proposta Comercial - Plano de Gerenciamento de Resíduos Sólidos (PGRS)',
    serviceType: 'Resíduos Sólidos',
    placeholders: ['cliente', 'escopo', 'valor', 'prazo'],
    contentMarkdown: `## PROPOSTA DE ELABORAÇÃO DE PGRS

**Cliente:** {{cliente}}

### Escopo Proposto
1. Diagnóstico da geração de resíduos industriais/comerciais.
2. Identificação de alternativas de triagem, reuso e destinação final ambientalmente adequada.
3. {{escopo}}

### Condições Comerciais
- **Honorários Profissionais:** R$ {{valor}}
- **Prazo de Entrega:** {{prazo}} dias.`,
    updatedAt: '2026-07-12'
  }
];

export const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 'prop-101',
    tenantId: 'tenant-1',
    clientId: 'cli-1',
    templateId: 'pt-1',
    title: 'LI Expansão Mina Dourada 2026',
    version: 1,
    filledValues: {
      cliente: 'Mineração Serra Dourada S/A',
      escopo: 'Licenciamento de Instalação para nova cava de extração de quartzito e cava seca.',
      valor: '85.000,00',
      prazo: '60',
      responsavel_tecnico: 'Dra. Camila Siqueira (CRBio 10450)'
    },
    totalValue: 85000,
    deliveryDays: 60,
    status: 'enviado',
    generatedByAI: true,
    humanApproved: true,
    createdAt: '2026-07-15'
  },
  {
    id: 'prop-102',
    tenantId: 'tenant-1',
    clientId: 'cli-2',
    templateId: 'pt-2',
    title: 'Atualização PGRS Químicos Campinas',
    version: 2,
    filledValues: {
      cliente: 'Indústria Química Paulista Ltda',
      escopo: 'Revisão anual do PGRS para atendimento à exigência da CETESB.',
      valor: '18.500,00',
      prazo: '20'
    },
    totalValue: 18500,
    deliveryDays: 20,
    status: 'aprovado',
    generatedByAI: false,
    humanApproved: true,
    createdAt: '2026-07-18'
  }
];

export const INITIAL_PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'pj-tpl-1',
    tenantId: 'tenant-1',
    name: 'Modelo de Projeto - Licenciamento de Instalação (LI)',
    category: 'Licenciamento de Instalação',
    defaultChecklist: [
      { id: 'st-1', title: 'Levantamento de Campo e Caracterização Ambiental', estimatedDays: 15 },
      { id: 'st-2', title: 'Elaboração de Planta Baixa e PCA/RCA', estimatedDays: 20 },
      { id: 'st-3', title: 'Montagem de Dossiê e Protocolo no Órgão', estimatedDays: 5 },
      { id: 'st-4', title: 'Acompanhamento do Deferimento e Condicionantes', estimatedDays: 30 }
    ],
    requiredDocs: ['Outorga Prévia de Água', 'Certidão de Uso do Solo Municipal', 'Matrícula do Imóvel', 'ART do Responsável Técnico'],
    aiPromptBase: 'Gerar relatórios de progresso focados no cumprimento de condicionantes da LI e mitigação de impactos vegetais.'
  },
  {
    id: 'pj-tpl-2',
    tenantId: 'tenant-1',
    name: 'Modelo de Projeto - PGRS Industrial',
    category: 'PGRS',
    defaultChecklist: [
      { id: 'st-5', title: 'Mapeamento de Pontos de Geração', estimatedDays: 7 },
      { id: 'st-6', title: 'Classificação NBR 10.004', estimatedDays: 5 },
      { id: 'st-7', title: 'Elaboração da Minuta do PGRS', estimatedDays: 10 },
      { id: 'st-8', title: 'Apresentação e Treinamento da Equipe do Cliente', estimatedDays: 3 }
    ],
    requiredDocs: ['MTRs dos últimos 12 meses', 'Certificados de Destinação Final (CDF)', 'Alvará de Funcionamento'],
    aiPromptBase: 'Gerar sumário de resíduos perigosos Classe I e recomendações de redução na fonte.'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    tenantId: 'tenant-1',
    clientId: 'cli-1',
    templateId: 'pj-tpl-1',
    name: 'Licenciamento de Instalação - Cava 04 Serra Dourada',
    category: 'Licenciamento de Instalação',
    status: 'em_dia',
    progress: 65,
    responsibleUserId: 'user-2',
    startDate: '2026-05-10',
    deadlineDate: '2026-08-30',
    steps: [
      { id: 's-1', title: 'Levantamento de Campo e Flora', completed: true, responsible: 'Eng. Lucas Mendes', dueDate: '2026-06-01' },
      { id: 's-2', title: 'Elaboração do PCA/RCA', completed: true, responsible: 'Dra. Camila Siqueira', dueDate: '2026-06-25' },
      { id: 's-3', title: 'Protocolo na SEMAD/MG', completed: true, responsible: 'Eng. Lucas Mendes', dueDate: '2026-07-05' },
      { id: 's-4', title: 'Atendimento a Pendências Técnicas', completed: false, responsible: 'Eng. Lucas Mendes', dueDate: '2026-08-15' }
    ]
  },
  {
    id: 'proj-2',
    tenantId: 'tenant-1',
    clientId: 'cli-2',
    templateId: 'pj-tpl-2',
    name: 'PGRS Anual Indústria Química',
    category: 'PGRS',
    status: 'atrasado',
    progress: 40,
    responsibleUserId: 'user-2',
    startDate: '2026-06-15',
    deadlineDate: '2026-07-25',
    steps: [
      { id: 's-5', title: 'Auditoria de MTRs 2025/2026', completed: true, responsible: 'Eng. Lucas Mendes', dueDate: '2026-06-20' },
      { id: 's-6', title: 'Consolidação de Dados de Destinação', completed: false, responsible: 'Eng. Lucas Mendes', dueDate: '2026-07-10' },
      { id: 's-7', title: 'Submissão no SIGOR Resíduos (CETESB)', completed: false, responsible: 'Eng. Lucas Mendes', dueDate: '2026-07-25' }
    ]
  }
];

export const INITIAL_LICENSES: LicensingProcess[] = [
  {
    id: 'lic-1',
    tenantId: 'tenant-1',
    clientId: 'cli-1',
    processNumber: 'SEMAD-10495/2024',
    environmentalOrgan: 'SEMAD',
    licenseType: 'LI',
    issueDate: '2024-08-15',
    expirationDate: '2026-08-15', // Expirando em 25 dias!
    status: 'em_analise',
    conditions: [
      {
        id: 'cond-1',
        processId: 'lic-1',
        title: 'Relatório Trimestral de Monitoramento de Ruídos e Poeira Fugitiva',
        description: 'Enviar laudo com ART assinado demonstrando pressão sonora abaixo de 60 dB(A).',
        deadlineDate: '2026-07-30', // Faltam 9 dias! (Alerta Crítico < 15 dias)
        alertDays: 15,
        status: 'em_andamento'
      },
      {
        id: 'cond-2',
        processId: 'lic-1',
        title: 'Programa de Reflorestamento de Mata Ciliar (5 ha)',
        description: 'Comprovar plantio de 800 mudas nativas com relatório fotográfico.',
        deadlineDate: '2026-08-10', // Faltam 20 dias (Alerta < 30 dias)
        alertDays: 30,
        status: 'pendente'
      }
    ]
  },
  {
    id: 'lic-2',
    tenantId: 'tenant-1',
    clientId: 'cli-2',
    processNumber: 'CETESB-99481/2025',
    environmentalOrgan: 'CETESB',
    licenseType: 'LO',
    issueDate: '2023-08-01',
    expirationDate: '2026-07-26', // Faltam 5 dias!! ALERTA MÁXIMO
    status: 'pendencia',
    conditions: [
      {
        id: 'cond-3',
        processId: 'lic-2',
        title: 'Apresentação do Laudo de Efluente Líquido Industrial',
        description: 'Parâmetros DBO, DQO e Óleos e Graxas conforme Art. 18 do Regulamento.',
        deadlineDate: '2026-07-24', // Faltam 3 dias! (URGENTE 5 dias)
        alertDays: 5,
        status: 'vencida'
      }
    ]
  },
  {
    id: 'lic-3',
    tenantId: 'tenant-1',
    clientId: 'cli-3',
    processNumber: 'IBAMA-02001.00394/2023',
    environmentalOrgan: 'IBAMA',
    licenseType: 'Outorga',
    issueDate: '2025-01-10',
    expirationDate: '2027-01-10',
    status: 'deferido',
    conditions: [
      {
        id: 'cond-4',
        processId: 'lic-3',
        title: 'Instalação de Horímetro e Hidrômetro Digital no Poço Tubular P-02',
        description: 'Registrar vazão máxima captada em m³/h diários.',
        deadlineDate: '2026-10-15',
        alertDays: 30,
        status: 'cumprida'
      }
    ]
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    tenantId: 'tenant-1',
    clientId: 'cli-1',
    projectId: 'proj-1',
    title: 'PCA_Plano_Controle_Ambiental_V3.pdf',
    category: 'Relatórios Técnicos',
    currentVersion: 3,
    versions: [
      { versionNumber: 1, fileName: 'PCA_Rascunho.pdf', uploadedAt: '2026-05-12', uploadedBy: 'Eng. Lucas Mendes', fileSize: '4.2 MB' },
      { versionNumber: 2, fileName: 'PCA_Revisao_Camila.pdf', uploadedAt: '2026-06-01', uploadedBy: 'Dra. Camila Siqueira', fileSize: '5.1 MB' },
      { versionNumber: 3, fileName: 'PCA_Final_Protocolado.pdf', uploadedAt: '2026-07-05', uploadedBy: 'Eng. Lucas Mendes', fileSize: '6.4 MB', note: 'Versão final protocolada na SEMAD/MG' }
    ],
    isAiParsed: true,
    aiExtractedSummary: 'Extração IA: 4 condicionantes identificadas, 2 programas de monitoramento obrigatórios, prazo final de LI em 15/08/2026.'
  },
  {
    id: 'doc-2',
    tenantId: 'tenant-1',
    clientId: 'cli-2',
    title: 'Licenca_Operacao_CETESB_2023.pdf',
    category: 'Licenças & Portarias',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: 'Licenca_Operacao_CETESB_2023.pdf', uploadedAt: '2025-08-01', uploadedBy: 'Roberto Alencar', fileSize: '1.8 MB' }
    ],
    isAiParsed: true,
    aiExtractedSummary: 'Extração IA: LO nº 99481/2025, Vencimento: 26/07/2026, Exigência de laudo de efluentes a cada 6 meses.'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    tenantId: 'tenant-1',
    clientId: 'cli-1',
    contractTitle: 'Contrato de Assessoria Ambiental Continuada - Serra Dourada',
    amount: 14500,
    dueDate: '2026-07-28',
    issueDate: '2026-07-01',
    status: 'emitida',
    provider: 'FocusNFe',
    fiscalRef: 'NFS-e nº 0004928 - Cod. Verificação: A9F8-33',
    xmlMockContent: '<?xml version="1.0" encoding="UTF-8"?><NFSe><Numero>4928</Numero><ValorServicos>14500.00</ValorServicos><Prestador>VerdeAmbiental Consultoria</Prestador><Tomador>Mineração Serra Dourada S/A</Tomador></NFSe>'
  },
  {
    id: 'inv-2',
    tenantId: 'tenant-1',
    clientId: 'cli-2',
    contractTitle: 'Parcela 2/2 - Atualização PGRS Industrial',
    amount: 9250,
    dueDate: '2026-07-31',
    issueDate: '2026-07-15',
    status: 'pendente',
    provider: 'FocusNFe',
    fiscalRef: 'Aguardando Aprovação de Emissão'
  },
  {
    id: 'inv-3',
    tenantId: 'tenant-1',
    clientId: 'cli-3',
    contractTitle: 'Estudo Hidrogeológico Poço Tubular',
    amount: 22000,
    dueDate: '2026-08-05',
    issueDate: '2026-07-20',
    status: 'pendente',
    provider: 'FocusNFe'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    tenantId: 'tenant-1',
    userName: 'Dra. Camila Siqueira',
    action: 'Emissão de Proposta Comercial v1',
    module: 'CRM',
    timestamp: '2026-07-15 14:32',
    isAiAction: true,
    details: 'Gerada proposta a partir do template "LI Expansão" com suporte de IA.'
  },
  {
    id: 'log-2',
    tenantId: 'tenant-1',
    userName: 'Eng. Lucas Mendes',
    action: 'Upload de Versão 3 do Documento PCA',
    module: 'Documentos',
    timestamp: '2026-07-05 09:15',
    isAiAction: false,
    details: 'Versão 3 gravada no repositório de documentos.'
  },
  {
    id: 'log-3',
    tenantId: 'tenant-1',
    userName: 'Roberto Alencar',
    action: 'Emissão de NFS-e nº 0004928 via Adapter',
    module: 'Financeiro',
    timestamp: '2026-07-01 11:00',
    isAiAction: false,
    details: 'Integração FocusNFe executada com sucesso.'
  }
];

import { Tenant, User, Client, ProposalTemplate, Proposal, ProjectTemplate, Project, LicensingProcess, DocumentItem, Invoice, AuditLog, OfficialNotice, PortalCredential } from '../types';

export const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'tenant-cbp',
    name: 'Cristiane Beatriz Pereira - Consultoria Ambiental',
    cnpj: '34.892.102/0001-44',
    logo: '🌿',
    fiscalCity: 'Poços de Caldas',
    state: 'MG',
    plan: 'Enterprise'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-cbp',
    tenantId: 'tenant-cbp',
    name: 'Cristiane Beatriz Pereira',
    email: 'cristiane@cristiane-consultoria.com.br',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli-midea',
    tenantId: 'tenant-cbp',
    name: 'Midea Carrier do Brasil S.A.',
    cnpj: '14.508.829/0001-92',
    contactPerson: 'EHS & Meio Ambiente Midea',
    email: 'ehs@mideacarrier.com.br',
    phone: '(35) 3449-3000',
    sector: 'Indústria',
    city: 'Pouso Alegre',
    state: 'MG'
  },
  {
    id: 'cli-acg',
    tenantId: 'tenant-cbp',
    name: 'ACG do Brasil S.A.',
    cnpj: '09.625.967/0002-14',
    contactPerson: 'Bárbara Fernanda Pereira Oliveira (EHS)',
    email: 'ehs.brasil@acg-world.com',
    phone: '(35) 3729-2000',
    sector: 'Farmoquímico',
    city: 'Pouso Alegre',
    state: 'MG'
  },
  {
    id: 'cli-ferrero',
    tenantId: 'tenant-cbp',
    name: 'Ferrero do Brasil Indústria Doceira',
    cnpj: '02.502.943/0001-80',
    contactPerson: 'Gestão Ambiental Ferrero',
    email: 'meioambiente@ferrero.com.br',
    phone: '(35) 3729-1000',
    sector: 'Alimentício',
    city: 'Poços de Caldas',
    state: 'MG'
  },
  {
    id: 'cli-loteamento-pa',
    tenantId: 'tenant-cbp',
    name: 'Loteamento Parque Pouso Alegre',
    cnpj: '18.402.912/0001-55',
    contactPerson: 'Engenharia & Urbanismo NEO',
    email: 'contato@loteamentopousoalegre.com.br',
    phone: '(35) 3421-9500',
    sector: 'Construção Civil',
    city: 'Pouso Alegre',
    state: 'MG'
  },
  {
    id: 'cli-nr2',
    tenantId: 'tenant-cbp',
    name: 'Propriedade Rural NR 2 - Sapucaí Mirim',
    cnpj: '29.102.843/0001-10',
    contactPerson: 'Gestão de Agronegócio NR 2',
    email: 'nr2.sapucaimirim@agromail.com.br',
    phone: '(35) 99872-4100',
    sector: 'Agronegócio',
    city: 'Sapucaí-Mirim',
    state: 'MG'
  }
];

export const INITIAL_PORTAL_CREDENTIALS: PortalCredential[] = [
  // MIDEA CARRIER CREDENTIALS
  {
    id: 'cred-midea-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-midea',
    systemName: 'Sistema MTR',
    loginCnpjOrUser: '14508829000192',
    encryptedPassword: '•••••••• (mtr_midea2026)',
    notes: 'Acesso Cadastrado Sistema MTR FEAM - Ficha cadastral Midea Pouso Alegre'
  },
  {
    id: 'cred-midea-2',
    tenantId: 'tenant-cbp',
    clientId: 'cli-midea',
    systemName: 'IBAMA',
    loginCnpjOrUser: '14.508.829/0001-92',
    encryptedPassword: '•••••••• (midea_ibama26)',
    notes: 'Cadastro Técnico Federal (CTF Válido até 29/04/2026)'
  },

  // ACG DO BRASIL CREDENTIALS
  {
    id: 'cred-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-acg',
    systemName: 'IBAMA',
    loginCnpjOrUser: '09.625.967/0002-14',
    encryptedPassword: '•••••••• (mgca2014)',
    notes: 'Cadastro Técnico Federal (CTF) - Licença Geral IBAMA'
  },
  {
    id: 'cred-2',
    tenantId: 'tenant-cbp',
    clientId: 'cli-acg',
    systemName: 'Sistema MTR',
    loginCnpjOrUser: '09625967000214',
    cpfNameUser: 'CPF: 05475230684 - Maurício Djalles Costa',
    encryptedPassword: '•••••••• (e22964)',
    notes: 'Manifesto de Transporte de Resíduos - Operador MTR 01'
  },
  {
    id: 'cred-3',
    tenantId: 'tenant-cbp',
    clientId: 'cli-acg',
    systemName: 'Sistema MTR',
    loginCnpjOrUser: '09625967000214',
    cpfNameUser: 'CPF: 10228808880 - Miguel Augusto Rocha',
    emailContact: 'maugustorocha@hotmail.com',
    encryptedPassword: '•••••••• (acg2020)',
    notes: 'Manifesto de Transporte de Resíduos - Operador MTR 02'
  },
  {
    id: 'cred-4',
    tenantId: 'tenant-cbp',
    clientId: 'cli-acg',
    systemName: 'Sistema MTR',
    loginCnpjOrUser: '09625967000214',
    cpfNameUser: 'CPF: 143.588.216.42 - Bárbara Fernanda Pereira Oliveira',
    emailContact: 'ehs.brasil@acg-world.com',
    encryptedPassword: '•••••••• (acg2020b)',
    notes: 'Gestão EHS Brasil - Responsável Autorizada MTR'
  },
  {
    id: 'cred-5',
    tenantId: 'tenant-cbp',
    clientId: 'cli-acg',
    systemName: 'Sistema MTR',
    loginCnpjOrUser: '09625967000214',
    cpfNameUser: 'CPF: 022.987.346-40 - Raphael Gonçalves Albinati',
    emailContact: 'raphael.albinati@acg-world.com',
    encryptedPassword: '•••••••• (acg2022)',
    notes: 'Manifesto de Transporte de Resíduos - Gestor EHS'
  },
  {
    id: 'cred-6',
    tenantId: 'tenant-cbp',
    clientId: 'cli-acg',
    systemName: 'Sistema SINIR',
    loginCnpjOrUser: '09625967000214',
    cpfNameUser: 'CPF: 05475230684 - Maurício Djalles Costa',
    encryptedPassword: '•••••••• (4qik3j)',
    notes: 'Sistema Nacional de Informações sobre a Gestão dos Resíduos Sólidos'
  },

  // FERRERO DO BRASIL CREDENTIALS
  {
    id: 'cred-f-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-ferrero',
    systemName: 'FEAM SEI',
    loginCnpjOrUser: '02.502.943/0001-80',
    encryptedPassword: '•••••••• (ferrero2024)',
    notes: 'Acesso Externo SEI MG - Processos Ambientais FEAM / IGAM / IEF / SEMAD'
  },
  {
    id: 'cred-f-2',
    tenantId: 'tenant-cbp',
    clientId: 'cli-ferrero',
    systemName: 'IBAMA',
    loginCnpjOrUser: '02.502.943/0001-80',
    encryptedPassword: '•••••••• (ferrero_ibama24)',
    notes: 'Cadastro Técnico Federal - IBAMA Serviços'
  },
  {
    id: 'cred-f-3',
    tenantId: 'tenant-cbp',
    clientId: 'cli-ferrero',
    systemName: 'Sistema SINIR',
    loginCnpjOrUser: '02502943000180',
    encryptedPassword: '•••••••• (sigor2024)',
    notes: 'SIGOR / CETESB - Sistema de Gerenciamento Online de Resíduos'
  },
  {
    id: 'cred-f-4',
    tenantId: 'tenant-cbp',
    clientId: 'cli-ferrero',
    systemName: 'Polícia Federal',
    loginCnpjOrUser: '02.502.943/0001-80',
    emailContact: 'licenciamentoma.semma@gmail.com',
    encryptedPassword: '•••••••• (semma_pocos24)',
    notes: 'SEMMA Poços de Caldas - Protocolos de Certidões e Terraplanagem'
  },
  {
    id: 'cred-f-5',
    tenantId: 'tenant-cbp',
    clientId: 'cli-ferrero',
    systemName: 'Sistema MTR',
    loginCnpjOrUser: '02502943000180',
    encryptedPassword: '•••••••• (mtr_ferrero24)',
    notes: 'Sistema MTR MG - Manifesto de Transporte de Resíduos FEAM'
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  // MIDEA CARRIER DOCUMENTS
  {
    id: 'doc-midea-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-midea',
    title: 'LICENCA_AMBIENTAL_FEAM_MIDEA_FABRICA_DE_ISOPOR.pdf',
    category: 'Licenças & Portarias',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: 'LICENCA_AMBIENTAL_FEAM_MIDEA_FABRICA_DE_ISOPOR.pdf', uploadedAt: '2025-08-10', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '5.2 MB', note: 'Licença Ambiental Operacional FEAM para unidade de Isopor' }
    ],
    isAiParsed: true,
    aiExtractedSummary: 'Extração IA: Licença FEAM de Operação para a fábrica de peças de Isopor Midea Carrier Pouso Alegre.'
  },
  {
    id: 'doc-midea-2',
    tenantId: 'tenant-cbp',
    clientId: 'cli-midea',
    title: 'Certificado_Regularidade_Ibama_MIDEA_valido_29-04-2026.pdf',
    category: 'Licenças & Portarias',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: 'Certificado_Regularidade_Ibama_MIDEA_valido_29-04-2026.pdf', uploadedAt: '2026-04-29', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '1.4 MB', note: 'Certificado de Regularidade CTF IBAMA válido até 29/04/2026' }
    ],
    isAiParsed: true,
    aiExtractedSummary: 'Extração IA: Certificado de Regularidade CTF IBAMA nº 2026/MIDEA renovado com sucesso.'
  },
  {
    id: 'doc-midea-3',
    tenantId: 'tenant-cbp',
    clientId: 'cli-midea',
    title: 'Estudo_de_Impacto_de_Vizinhanca_EIV_MIDEA_REV_assinado.pdf',
    category: 'Estudos de Campo',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: 'Estudo_de_Impacto_de_Vizinhanca_EIV_MIDEA_REV_assinado.pdf', uploadedAt: '2025-07-15', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '14.2 MB', note: 'EIV Revisado e assinado para aprovação municipal' }
    ],
    isAiParsed: true
  },

  // NR 2 SAPUCAÍ MIRIM DOCUMENTS
  {
    id: 'doc-nr2-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-nr2',
    title: 'CAR_MG_3165404_Propriedade_Rural_NR2.pdf',
    category: 'Licenças & Portarias',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: 'CAR_MG_3165404_Propriedade_Rural_NR2.pdf', uploadedAt: '2025-03-20', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '2.8 MB', note: 'Recibo de Inscrição CAR MG-3165404 Sapucaí Mirim' }
    ],
    isAiParsed: true,
    aiExtractedSummary: 'Extração IA: Cadastro Ambiental Rural (CAR) da Propriedade NR 2 ativo no SICAR MG.'
  },
  {
    id: 'doc-nr2-2',
    tenantId: 'tenant-cbp',
    clientId: 'cli-nr2',
    title: 'SEI_IBAMA_1593169_Ficha_Tecnica_Enquadramento_ADA.pdf',
    category: 'Relatórios Técnicos',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: 'SEI_IBAMA_1593169_Ficha_Tecnica_Enquadramento_ADA.pdf', uploadedAt: '2025-04-10', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '1.9 MB', note: 'Ato Declaratório Ambiental ADA IBAMA 1593169' }
    ],
    isAiParsed: true
  },
  {
    id: 'doc-nr2-3',
    tenantId: 'tenant-cbp',
    clientId: 'cli-nr2',
    title: 'Projeto_Jardins_Filtrantes_Tratamento_Efluente.rar',
    category: 'Estudos de Campo',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: 'Projeto_Jardins_Filtrantes_Tratamento_Efluente.rar', uploadedAt: '2025-05-02', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '8.4 MB', note: 'Projeto ecológico de fito-depuração e tratamento efluente' }
    ],
    isAiParsed: false
  },

  // LOTEAMENTO PARQUE POUSO ALEGRE DOCUMENTS
  {
    id: 'doc-pa-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-loteamento-pa',
    title: 'Relatorio_Tecnico_Ambiental_Descaracterizacao_ZPA.pdf',
    category: 'Estudos de Campo',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: 'Relatorio_Tecnico_Ambiental_Descaracterizacao_ZPA.pdf', uploadedAt: '2018-04-06', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '1.3 MB', note: 'Relatório de descaracterização de Zona de Proteção Ambiental' }
    ],
    isAiParsed: true,
    aiExtractedSummary: 'Extração IA: Estudo técnico ambiental justificando a descaracterização de ZPA para aprovação do parcelamento urbano em Pouso Alegre.'
  },
  {
    id: 'doc-pa-2',
    tenantId: 'tenant-cbp',
    clientId: 'cli-loteamento-pa',
    title: 'Diretrizes_Tecnicas_Basicas_DTB_COPASA_MG.pdf',
    category: 'Licenças & Portarias',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: 'Diretrizes_Tecnicas_Basicas_DTB_COPASA_MG.pdf', uploadedAt: '2017-11-06', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '2.0 MB', note: 'Diretrizes aprovadas pela COPASA MG para rede de água e esgoto' }
    ],
    isAiParsed: true,
    aiExtractedSummary: 'Extração IA: DTB COPASA MG concedendo viabilidade técnica de abastecimento de água e coleta de esgoto para o Loteamento Parque Pouso Alegre.'
  },

  // FERRERO DOCUMENTS
  {
    id: 'doc-ferrero-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-ferrero',
    title: 'PGRSI_FERRERO_PERIODO_2026_SEI_143721449.pdf',
    category: 'Ofícios Emitidos',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: 'PGRSI_FERRERO_PERIODO_2026_SEI_143721449.pdf', uploadedAt: '2026-07-05', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '8.5 MB', note: 'Protocolado no SEI FEAM/URA 1370.01.0049245/2021-51' }
    ],
    isAiParsed: true,
    aiExtractedSummary: 'Extração IA: Ofício nº 143721449/2026 referente ao PGRSI Ferrero. Protocolo confirmado em 05/07/2026 por Cristiane Beatriz Pereira.'
  },
  {
    id: 'doc-ferrero-2',
    tenantId: 'tenant-cbp',
    clientId: 'cli-ferrero',
    title: '116ª_ALTERACAO_CONSOLIDACO_CONTRATO_SOCIAL_JUCEMG.pdf',
    category: 'Documentos da Empresa',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: '116ª_ALTERACAO_CONSOLIDACO_CONTRATO_SOCIAL_JUCEMG.pdf', uploadedAt: '2025-06-06', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '276 KB', note: 'Registrado na JUCEMG - Contrato Social Ferrero do Brasil' }
    ],
    isAiParsed: true
  },

  // ACG DOCUMENTS
  {
    id: 'doc-acg-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-acg',
    title: '13_Licenca_Funcionamento_Operacao_ACG.pdf',
    category: 'Licenças de Funcionamento',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: '13_Licenca_Funcionamento_Operacao_ACG.pdf', uploadedAt: '2025-05-30', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '4.8 MB', note: 'Licença de Operação e Alvará Municipal de Funcionamento' }
    ],
    isAiParsed: true
  }
];

export const INITIAL_OFFICIAL_NOTICES: OfficialNotice[] = [
  {
    id: 'of-1',
    tenantId: 'tenant-cbp',
    noticeNumber: '79738866/2023',
    date: '2023-12-29',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'Atualização nas condições de operação e melhorias implementadas no sistema produtivo da empresa',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2023-12-29',
    evidenceLocation: 'Sistema Eletrônico de Informações - Acesso Parcial',
    seiProcessOrNotes: 'PROC. SEI FEAM/URA 1370.01.0049245/2021-40'
  },
  {
    id: 'of-2',
    tenantId: 'tenant-cbp',
    noticeNumber: '81033758/2024',
    date: '2024-01-19',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'Relatório Técnico referente a ampliação da área da subestação de energia - área de 0,36ha ou 3.600m²',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2024-01-26',
    evidenceLocation: 'Sistema Eletrônico de Informações - Acesso Integral',
    seiProcessOrNotes: 'PROC. SEI FEAM/URA 2090.01.0002616/2024-49'
  },
  {
    id: 'of-3',
    tenantId: 'tenant-cbp',
    noticeNumber: '91838854/2024',
    date: '2024-07-03',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'Apresentação das informações complementares solicitadas pelo analista - polígonos das áreas',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2024-07-04',
    evidenceLocation: 'Sistema Eletrônico de Informações - Acesso Integral',
    seiProcessOrNotes: 'Resposta ao Ofício FEAM/URA SM - CAT nº 94/2024 (SEI 2090.01.0002616/2024-49)'
  },
  {
    id: 'of-4',
    tenantId: 'tenant-cbp',
    noticeNumber: '82565056/2024',
    date: '2024-02-22',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'Cumprimento de condicionante - Efluentes Líquidos ETE e montante e jusante do corpo receptor',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2024-02-22',
    evidenceLocation: 'Sistema Eletrônico de Informações - Acesso Parcial',
    seiProcessOrNotes: 'PROC. SEI FEAM/URA 1370.01.0049245/2021-41'
  },
  {
    id: 'of-5',
    tenantId: 'tenant-cbp',
    noticeNumber: '2501_2024',
    date: '2024-01-25',
    organ: 'Secretaria de Meio Ambiente Poços de Caldas',
    subject: 'Comunicado de ampliação da área útil referente à implantação da subestação de energia elétrica',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2025-01-25',
    evidenceLocation: 'E-mail : licenciamentoma.semma@gmail.com',
    seiProcessOrNotes: 'Emitida Certidão de Dispensa de Licenciamento Ambiental nº 005/2024'
  },
  {
    id: 'of-6',
    tenantId: 'tenant-cbp',
    noticeNumber: '2024/04',
    date: '2024-06-06',
    organ: 'Secretaria de Meio Ambiente Poços de Caldas',
    subject: 'Solicitação de renovação da Autorização para terraplanagem',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2025-10-25',
    evidenceLocation: 'E-mail : licenciamentoma.semma@gmail.com',
    seiProcessOrNotes: 'Autorização de Terraplanagem nº 005/2024'
  },
  {
    id: 'of-7',
    tenantId: 'tenant-cbp',
    noticeNumber: '2024/05',
    date: '2024-10-15',
    organ: 'Secretaria de Meio Ambiente Poços de Caldas',
    subject: 'Documentos da Responsável Técnico (Envio de ART e Certidões)',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2024-10-15',
    evidenceLocation: 'E-mail : licenciamentoma.semma@gmail.com',
    seiProcessOrNotes: 'Documentação do RT anexada'
  },
  {
    id: 'of-8',
    tenantId: 'tenant-cbp',
    noticeNumber: '93953511/2025',
    date: '2024-07-31',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'Ofício Condicionante Nº 01 (1º semestre/2024)',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2024-07-31',
    evidenceLocation: 'Sistema SEI MG - Acesso Parcial',
    seiProcessOrNotes: 'PROC. SEI FEAM/URA 1370.01.0049245/2021-42'
  },
  {
    id: 'of-9',
    tenantId: 'tenant-cbp',
    noticeNumber: '100361584/2024',
    date: '2024-10-25',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'Apresentação do Laudo Relatório Emissões Atmosféricas 2024',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2024-10-25',
    evidenceLocation: 'Portal SEI-MG Consulta Externa (ID 13796971)',
    seiProcessOrNotes: 'PROC. SEI FEAM/URA 1370.01.0049245/2021-43'
  },
  {
    id: 'of-10',
    tenantId: 'tenant-cbp',
    noticeNumber: '106106007/2025',
    date: '2025-01-24',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'Cumprimento de Condicionante - Efluentes Líquidos/Montante e Jusante',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2025-01-24',
    evidenceLocation: 'Sistema SEI MG - Acesso Parcial',
    seiProcessOrNotes: 'PROC. SEI FEAM/URA 1370.01.0049245/2021-44'
  },
  {
    id: 'of-11',
    tenantId: 'tenant-cbp',
    noticeNumber: '113835652/2025',
    date: '2025-05-17',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'Ofício Apresentação melhorias e juntada PGRS',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2025-05-17',
    evidenceLocation: 'Sistema SEI MG - Acesso Parcial',
    seiProcessOrNotes: 'PROC. SEI FEAM/URA 1370.01.0049245/2021-45'
  },
  {
    id: 'of-12',
    tenantId: 'tenant-cbp',
    noticeNumber: '114071235/2025',
    date: '2025-05-21',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'Documento Plano Gerenc. Resíduos Sólidos Industrial (PGRSI)',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2025-05-21',
    evidenceLocation: 'Sistema SEI MG - Acesso Parcial',
    seiProcessOrNotes: 'PROC. SEI FEAM/URA 1370.01.0049245/2021-46'
  },
  {
    id: 'of-13',
    tenantId: 'tenant-cbp',
    noticeNumber: '118939128/2025',
    date: '2025-07-24',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'Cumprimento de Condicionante - Efluentes Líquidos (Item 1 – Anexo II)',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2025-07-24',
    evidenceLocation: 'Sistema SEI MG - Acesso Parcial',
    seiProcessOrNotes: 'PROC. SEI FEAM/URA 1370.01.0049245/2021-47'
  },
  {
    id: 'of-14',
    tenantId: 'tenant-cbp',
    noticeNumber: '124144074/2025',
    date: '2025-10-01',
    organ: 'IGAM / URGA',
    subject: 'Cumprimento de condicionante - Portaria de outorga _ Poço 3',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2025-10-01',
    evidenceLocation: 'Sistema SEI IGAM',
    seiProcessOrNotes: 'PROC. SEI IGAM 2240.01.0005754/2025-41'
  },
  {
    id: 'of-15',
    tenantId: 'tenant-cbp',
    noticeNumber: '125505510/2025',
    date: '2025-10-20',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'Ofício Justificativa de prorrogação de prazo efluente atmosférico',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2025-10-20',
    evidenceLocation: 'Sistema SEI MG - Acesso Parcial',
    seiProcessOrNotes: 'PROC. SEI FEAM/URA 1370.01.0049245/2021-48'
  },
  {
    id: 'of-16',
    tenantId: 'tenant-cbp',
    noticeNumber: '1711_2025',
    date: '2025-11-17',
    organ: 'IBAMA',
    subject: 'Apresentação de Requerimento de adesão ao pagamento da multa e cancelamento do processo',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2026-06-12',
    evidenceLocation: 'SEI/IBAMA - 27015164 - Notificação',
    seiProcessOrNotes: 'PROC. SEI IBAMA 02285.000442/2019-51'
  },
  {
    id: 'of-17',
    tenantId: 'tenant-cbp',
    noticeNumber: '129740853/2025',
    date: '2025-12-17',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'Ofício protocolo cumprimento de condicionante efluente atmosférico',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2025-12-17',
    evidenceLocation: 'Sistema SEI MG - Acesso Parcial',
    seiProcessOrNotes: 'PROC. SEI FEAM/URA 1370.01.0049245/2021-48'
  },
  {
    id: 'of-18',
    tenantId: 'tenant-cbp',
    noticeNumber: '131673378/2026',
    date: '2026-01-22',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'Cumprimento de Condicionantes - Efluentes líquidos montante e jusante do corpo hídrico',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2025-01-22',
    evidenceLocation: 'Sistema SEI MG - Acesso Parcial',
    seiProcessOrNotes: 'PROC. SEI FEAM/URA 1370.01.0049245/2021-49'
  },
  {
    id: 'of-19',
    tenantId: 'tenant-cbp',
    noticeNumber: '136934989/2026',
    date: '2026-04-06',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'Documento PGRSS Serviço de Saúde',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2026-04-06',
    evidenceLocation: 'Sistema SEI MG - Acesso Parcial',
    seiProcessOrNotes: 'PROC. SEI FEAM/URA 1370.01.0049245/2021-50'
  },
  {
    id: 'of-20',
    tenantId: 'tenant-cbp',
    noticeNumber: '140438602/2026',
    date: '2026-05-22',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'Solicitação de vistas no processo de Renovação da Licença Ambiental - RENLO',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2026-05-22',
    evidenceLocation: 'Sistema SEI MG - Acompanhamento Integral',
    seiProcessOrNotes: 'PROC. SEI FEAM/URA 2090.01.0004791/2026-03'
  },
  {
    id: 'of-21',
    tenantId: 'tenant-cbp',
    noticeNumber: '143721449/2026',
    date: '2026-07-05',
    organ: 'FEAM/URA Sul de Minas',
    subject: 'PGRSI_FERRERO_PERIODO 2026 - Plano de Gerenciamento de Resíduos Sólidos Industriais',
    signedBy: 'Cristiane Beatriz Pereira',
    protocolDate: '2026-07-05',
    evidenceLocation: 'Sistema SEI MG - Acesso Parcial',
    seiProcessOrNotes: 'PROC. SEI FEAM/URA 1370.01.0049245/2021-51'
  }
];

export const INITIAL_PROPOSAL_TEMPLATES: ProposalTemplate[] = [
  {
    id: 'pt-1',
    tenantId: 'tenant-cbp',
    title: 'Proposta Comercial - Licenciamento de Instalação (LI)',
    serviceType: 'Licenciamento Ambiental',
    placeholders: ['cliente', 'escopo', 'valor', 'prazo', 'responsavel_tecnico'],
    contentMarkdown: `## PROPOSTA COMERCIAL DE CONSULTORIA AMBIENTAL

**Contratante:** {{cliente}}
**Elaborado por:** Cristiane Beatriz Pereira - Consultoria Ambiental
**Responsável Técnica:** {{responsavel_tecnico}}

---

### 1. Escopo dos Serviços
A consultoria prestará assessoria técnica especializada para obtenção da Licença de Instalação (LI), incluindo:
- {{escopo}}
- Protocolo e acompanhamento junto ao órgão ambiental competente.
- Elaboração do Relatório de Controle Ambiental (RCA) e Plano de Controle Ambiental (PCA).

### 2. Investimento e Condições Financeiras
- **Valor Total:** R$ {{valor}}
- **Forma de Pagamento:** 40% no aceite da proposta, 30% no protocolo, 30% na emissão da licença.

### 3. Prazo de Execução
Estimado em **{{prazo}} dias úteis** a contar do envio completo da documentação pelo cliente.

*Validade desta proposta: 15 dias.*`,
    updatedAt: '2026-07-21'
  }
];

export const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 'prop-101',
    tenantId: 'tenant-cbp',
    clientId: 'cli-midea',
    templateId: 'pt-1',
    title: 'Licenciamento FEAM & Renovações IBAMA 2026 - Midea Carrier',
    version: 1,
    filledValues: {
      cliente: 'Midea Carrier do Brasil S.A.',
      escopo: 'Acompanhamento do licenciamento ambiental da Fábrica de Isopor, renovação CTF IBAMA 2026 e EIV.',
      valor: '145.000,00',
      prazo: '60',
      responsavel_tecnico: 'Cristiane Beatriz Pereira'
    },
    totalValue: 145000,
    deliveryDays: 60,
    status: 'aprovado',
    generatedByAI: true,
    humanApproved: true,
    createdAt: '2026-07-21'
  }
];

export const INITIAL_PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'pj-tpl-1',
    tenantId: 'tenant-cbp',
    name: 'Modelo de Projeto - Licenciamento & Produtos Controlados',
    category: 'Polícia Federal / SPDA',
    defaultChecklist: [
      { id: 'st-1', title: 'Auditoria de Estoque de Químicos Controlados', estimatedDays: 7 },
      { id: 'st-2', title: 'Renovação do CLF Polícia Federal', estimatedDays: 15 },
      { id: 'st-3', title: 'Inspeção e Medição da Malha SPDA (NBR 5419)', estimatedDays: 10 },
      { id: 'st-4', title: 'Emissão da ART e Relatório Final', estimatedDays: 5 }
    ],
    requiredDocs: ['Certificado CLF DPF', 'Laudo Técnico SPDA', 'Certificado HALAL', 'Alvará de Funcionamento'],
    aiPromptBase: 'Gerar relatórios de conformidade para auditoria ambiental e produtos controlados da Polícia Federal.'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-midea-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-midea',
    name: 'Licenciamento FEAM & Gestão EIV - Midea Carrier Pouso Alegre',
    category: 'Licenciamento de Instalação',
    status: 'em_dia',
    progress: 88,
    responsibleUserId: 'user-cbp',
    startDate: '2026-01-15',
    deadlineDate: '2026-09-30',
    steps: [
      { id: 'sm-1', title: 'Renovação do Certificado de Regularidade CTF IBAMA', completed: true, responsible: 'Cristiane Beatriz Pereira', dueDate: '2026-04-29' },
      { id: 'sm-2', title: 'Protocolo de EIV e Impacto de Circulação PMPA', completed: true, responsible: 'Cristiane Beatriz Pereira', dueDate: '2026-05-30' },
      { id: 'sm-3', title: 'Renovação Anual da Licença FEAM Fábrica de Isopor', completed: false, responsible: 'Cristiane Beatriz Pereira', dueDate: '2026-09-15' }
    ]
  },
  {
    id: 'proj-nr2-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-nr2',
    name: 'Regularização Ambiental Rural & Outorga ETE - Propriedade NR 2',
    category: 'Outorga de Uso de Água',
    status: 'em_dia',
    progress: 92,
    responsibleUserId: 'user-cbp',
    startDate: '2025-03-10',
    deadlineDate: '2026-11-30',
    steps: [
      { id: 'snr-1', title: 'Inscrição e Retificação CAR MG-3165404 Sapucaí Mirim', completed: true, responsible: 'Cristiane Beatriz Pereira', dueDate: '2025-03-20' },
      { id: 'snr-2', title: 'Ficha Técnica de Enquadramento ADA IBAMA 1593169', completed: true, responsible: 'Cristiane Beatriz Pereira', dueDate: '2025-04-10' },
      { id: 'snr-3', title: 'Implantação do Sistema Ecológico de Jardins Filtrantes', completed: false, responsible: 'Cristiane Beatriz Pereira', dueDate: '2026-10-30' }
    ]
  }
];

export const INITIAL_LICENSES: LicensingProcess[] = [
  {
    id: 'lic-midea-feam',
    tenantId: 'tenant-cbp',
    clientId: 'cli-midea',
    processNumber: 'FEAM/URA 2090.01.008912/2025',
    environmentalOrgan: 'FEAM/URA Sul de Minas',
    licenseType: 'LO',
    issueDate: '2025-08-10',
    expirationDate: '2026-08-28', // Alert < 30 days
    status: 'em_analise',
    conditions: [
      {
        id: 'cond-midea-1',
        processId: 'lic-midea-feam',
        title: 'Manutenção do Certificado de Regularidade CTF IBAMA',
        description: 'Apresentar certidão atualizada do CTF IBAMA Válido até 29/04/2026.',
        deadlineDate: '2026-08-15',
        alertDays: 30,
        status: 'em_andamento'
      }
    ]
  },
  {
    id: 'lic-nr2-outorga',
    tenantId: 'tenant-cbp',
    clientId: 'cli-nr2',
    processNumber: 'IGAM URGA 2240.01.009812/2025',
    environmentalOrgan: 'IGAM / URGA',
    licenseType: 'Outorga',
    issueDate: '2025-04-15',
    expirationDate: '2026-10-20',
    status: 'deferido',
    conditions: [
      {
        id: 'cond-nr2-1',
        processId: 'lic-nr2-outorga',
        title: 'Medição Semestral de Vazão do Efluente Tratado ETE Sapucaí Mirim',
        description: 'Envio dos laudos de qualidade e vazão da ETE e Jardins Filtrantes.',
        deadlineDate: '2026-10-10',
        alertDays: 30,
        status: 'em_andamento'
      }
    ]
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-midea-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-midea',
    contractTitle: 'Contrato de Consultoria Licenciamento FEAM & IBAMA - Midea Carrier',
    amount: 55000,
    dueDate: '2026-08-10',
    issueDate: '2026-07-01',
    status: 'emitida',
    provider: 'FocusNFe',
    fiscalRef: 'NFS-e nº 0005120 - Cod. Verificação: MIDEA-2026',
    xmlMockContent: '<?xml version="1.0" encoding="UTF-8"?><NFSe><Numero>5120</Numero><ValorServicos>55000.00</ValorServicos><Prestador>Cristiane Beatriz Pereira - Consultoria Ambiental</Prestador><Tomador>Midea Carrier do Brasil S.A.</Tomador></NFSe>'
  },
  {
    id: 'inv-nr2-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-nr2',
    contractTitle: 'Assessoria Ambiental Rural CAR/ADA & Jardins Filtrantes - Propriedade NR 2',
    amount: 24000,
    dueDate: '2026-08-20',
    issueDate: '2026-07-05',
    status: 'emitida',
    provider: 'FocusNFe',
    fiscalRef: 'NFS-e nº 0005128 - Cod. Verificação: NR2-AGRO-2026',
    xmlMockContent: '<?xml version="1.0" encoding="UTF-8"?><NFSe><Numero>5128</Numero><ValorServicos>24000.00</ValorServicos><Prestador>Cristiane Beatriz Pereira - Consultoria Ambiental</Prestador><Tomador>Propriedade Rural NR 2</Tomador></NFSe>'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-midea-1',
    tenantId: 'tenant-cbp',
    userName: 'Cristiane Beatriz Pereira',
    action: 'Inclusão da Midea Carrier e Propriedade Rural NR 2 na consultoria',
    module: 'CRM',
    timestamp: '2026-07-21 09:43',
    isAiAction: false,
    details: 'Processos FEAM, CTF IBAMA 2026, CAR MG e Outorga cadastrados.'
  }
];

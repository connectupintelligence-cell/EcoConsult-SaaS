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
  }
];

export const INITIAL_PORTAL_CREDENTIALS: PortalCredential[] = [
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
    isAiParsed: true,
    aiExtractedSummary: 'Extração IA: 116ª Alteração Contratual da Ferrero do Brasil Indústria Doceira arquivada na JUCEMG.'
  },
  {
    id: 'doc-ferrero-3',
    tenantId: 'tenant-cbp',
    clientId: 'cli-ferrero',
    title: '01_Certidoes_e_Declaracoes_Ambientais_Ferrero.pdf',
    category: 'Licenças & Portarias',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: '01_Certidoes_e_Declaracoes_Ambientais_Ferrero.pdf', uploadedAt: '2025-05-30', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '1.8 MB', note: 'Certidões Negativas de Débitos Ambientais e Quitação de Taxas' }
    ],
    isAiParsed: true
  },
  {
    id: 'doc-ferrero-4',
    tenantId: 'tenant-cbp',
    clientId: 'cli-ferrero',
    title: '02_Comprovantes_Pagamento_Taxas_FEAM_URA.pdf',
    category: 'Fiscal',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: '02_Comprovantes_Pagamento_Taxas_FEAM_URA.pdf', uploadedAt: '2025-05-30', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '1.2 MB', note: 'Comprovantes de arrecadação estadual DAE/FEAM' }
    ],
    isAiParsed: false
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
    isAiParsed: true,
    aiExtractedSummary: 'Extração IA: Licença de Funcionamento válida para unidade Farmoquímica ACG do Brasil. Próxima renovação em 30/05/2026.'
  },
  {
    id: 'doc-acg-2',
    tenantId: 'tenant-cbp',
    clientId: 'cli-acg',
    title: '14_Certificado_Policia_Federal_CLF_2025.pdf',
    category: 'Polícia Federal',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: '14_Certificado_Policia_Federal_CLF_2025.pdf', uploadedAt: '2025-05-30', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '2.4 MB', note: 'CLF DPF - Produtos Químicos Controlados' }
    ],
    isAiParsed: true,
    aiExtractedSummary: 'Extração IA: Certificado de Licença de Funcionamento DPF nº 2025/PF-MG. Autorização para manuseio de solventes controlados.'
  },
  {
    id: 'doc-acg-3',
    tenantId: 'tenant-cbp',
    clientId: 'cli-acg',
    title: '15_Laudo_Tecnico_SPDA_Para_Raios_2025.pdf',
    category: 'SPDA',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: '15_Laudo_Tecnico_SPDA_Para_Raios_2025.pdf', uploadedAt: '2025-05-30', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '6.1 MB', note: 'Laudo de inspeção do Sistema de Proteção contra Descargas Atmosféricas com ART' }
    ],
    isAiParsed: true,
    aiExtractedSummary: 'Extração IA: Laudo SPDA conforme NBR 5419. Malha de aterramento e para-raios aprovados com ART assinado.'
  },
  {
    id: 'doc-acg-4',
    tenantId: 'tenant-cbp',
    clientId: 'cli-acg',
    title: '12_Certificado_HALAL_Exportacao_2025.pdf',
    category: 'HALAL',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: '12_Certificado_HALAL_Exportacao_2025.pdf', uploadedAt: '2025-05-30', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '3.2 MB', note: 'Certificação internacional de conformidade HALAL' }
    ],
    isAiParsed: true,
    aiExtractedSummary: 'Extração IA: Certificado HALAL para a linha de produção de cápsulas de gelatina dura ACG do Brasil.'
  },
  {
    id: 'doc-acg-5',
    tenantId: 'tenant-cbp',
    clientId: 'cli-acg',
    title: '11_Documentos_Empresa_CNPJ_Estatuto.pdf',
    category: 'Documentos da Empresa',
    currentVersion: 1,
    versions: [
      { versionNumber: 1, fileName: '11_Documentos_Empresa_CNPJ_Estatuto.pdf', uploadedAt: '2025-05-30', uploadedBy: 'Cristiane Beatriz Pereira', fileSize: '5.5 MB', note: 'Cartão CNPJ 09.625.967/0002-14 e Contrato Social' }
    ],
    isAiParsed: false
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
    clientId: 'cli-acg',
    templateId: 'pt-1',
    title: 'Licenciamento & Gestão EHS ACG do Brasil 2026',
    version: 1,
    filledValues: {
      cliente: 'ACG do Brasil S.A.',
      escopo: 'Gestão de licenças de funcionamento, certificado Polícia Federal, laudo SPDA e portais MTR/SINIR/IBAMA.',
      valor: '120.000,00',
      prazo: '60',
      responsavel_tecnico: 'Cristiane Beatriz Pereira'
    },
    totalValue: 120000,
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
    id: 'proj-acg-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-acg',
    templateId: 'pj-tpl-1',
    name: 'Gestão de Licenças & Polícia Federal - ACG do Brasil',
    category: 'Polícia Federal / SPDA',
    status: 'em_dia',
    progress: 90,
    responsibleUserId: 'user-cbp',
    startDate: '2026-01-10',
    deadlineDate: '2026-09-15',
    steps: [
      { id: 's-1', title: 'Renovação de CLF Polícia Federal 2025/2026', completed: true, responsible: 'Cristiane Beatriz Pereira', dueDate: '2026-05-30' },
      { id: 's-2', title: 'Laudo de Vistoria SPDA NBR 5419', completed: true, responsible: 'Cristiane Beatriz Pereira', dueDate: '2026-06-15' },
      { id: 's-3', title: 'Auditoria Mensal MTR / SINIR Resíduos', completed: false, responsible: 'Cristiane Beatriz Pereira', dueDate: '2026-08-30' }
    ]
  }
];

export const INITIAL_LICENSES: LicensingProcess[] = [
  {
    id: 'lic-ferrero-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-ferrero',
    processNumber: 'FEAM/URA 1370.01.0049245/2021-51',
    environmentalOrgan: 'FEAM/URA Sul de Minas',
    licenseType: 'LO',
    issueDate: '2024-01-10',
    expirationDate: '2026-08-20',
    status: 'em_analise',
    conditions: [
      {
        id: 'cond-f-1',
        processId: 'lic-ferrero-1',
        title: 'Cumprimento de Condicionante - Efluentes Líquidos (Montante e Jusante)',
        description: 'Laudos laboratoriais periódicos do corpo receptor conforme Ofício SEI 131673378/2026.',
        deadlineDate: '2026-08-10',
        alertDays: 30,
        status: 'em_andamento'
      }
    ]
  },
  {
    id: 'lic-acg-pf',
    tenantId: 'tenant-cbp',
    clientId: 'cli-acg',
    processNumber: 'CLF DPF 2025-00921/MG',
    environmentalOrgan: 'Polícia Federal',
    licenseType: 'CLF Polícia Federal',
    issueDate: '2025-05-30',
    expirationDate: '2026-08-25',
    status: 'em_analise',
    conditions: [
      {
        id: 'cond-acg-1',
        processId: 'lic-acg-pf',
        title: 'Envio de Relatório Trimestral de Insumos Controlados DPF',
        description: 'Balanço mensal de entradas e saídas de solventes químicos controlados.',
        deadlineDate: '2026-08-15',
        alertDays: 30,
        status: 'em_andamento'
      }
    ]
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-ferrero-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-ferrero',
    contractTitle: 'Contrato de Assessoria Ambiental Continuada & Ofícios SEI - Ferrero',
    amount: 38500,
    dueDate: '2026-08-05',
    issueDate: '2026-07-01',
    status: 'emitida',
    provider: 'FocusNFe',
    fiscalRef: 'NFS-e nº 0005102 - Cod. Verificação: FEAM-MG-2026',
    xmlMockContent: '<?xml version="1.0" encoding="UTF-8"?><NFSe><Numero>5102</Numero><ValorServicos>38500.00</ValorServicos><Prestador>Cristiane Beatriz Pereira - Consultoria Ambiental</Prestador><Tomador>Ferrero do Brasil Indústria Doceira</Tomador></NFSe>'
  },
  {
    id: 'inv-acg-1',
    tenantId: 'tenant-cbp',
    clientId: 'cli-acg',
    contractTitle: 'Contrato de Consultoria EHS & Licenciamento PF/SPDA - ACG do Brasil',
    amount: 42000,
    dueDate: '2026-08-10',
    issueDate: '2026-07-01',
    status: 'emitida',
    provider: 'FocusNFe',
    fiscalRef: 'NFS-e nº 0005108 - Cod. Verificação: ACG-EHS-2026',
    xmlMockContent: '<?xml version="1.0" encoding="UTF-8"?><NFSe><Numero>5108</Numero><ValorServicos>42000.00</ValorServicos><Prestador>Cristiane Beatriz Pereira - Consultoria Ambiental</Prestador><Tomador>ACG do Brasil S.A.</Tomador></NFSe>'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-f1',
    tenantId: 'tenant-cbp',
    userName: 'Cristiane Beatriz Pereira',
    action: 'Credenciais dos Portais SEI MG, IBAMA e MTR da Ferrero validadas',
    module: 'Portais & Credenciais',
    timestamp: '2026-07-21 09:30',
    isAiAction: false,
    details: 'Acessos cadastrados para Ferrero do Brasil.'
  }
];

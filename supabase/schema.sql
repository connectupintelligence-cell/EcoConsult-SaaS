-- ====================================================================
-- ECOCONSULT SAAS - ESQUEMA DE BANCO DE DADOS POSTGRESQL (SUPABASE)
-- Projeto: https://xjbvtfydakyvayikrxjq.supabase.co
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABELA DE TENANTS (CONSULTORIAS)
CREATE TABLE IF NOT EXISTS public.tenants (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cnpj VARCHAR(20) NOT NULL,
  logo VARCHAR(255),
  fiscal_city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL,
  plan VARCHAR(50) DEFAULT 'Enterprise',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABELA DE CONTROLE DE OFÍCIOS & PROTOCOLOS (DADOS REAIS IMPORTADOS)
CREATE TABLE IF NOT EXISTS public.official_notices (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) REFERENCES public.tenants(id) ON DELETE CASCADE,
  notice_number VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  organ VARCHAR(150) NOT NULL,
  subject TEXT NOT NULL,
  signed_by VARCHAR(255) NOT NULL,
  protocol_date DATE,
  evidence_location TEXT,
  sei_process_or_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.official_notices ENABLE ROW LEVEL SECURITY;

-- SEED DE DATOS REAIS (21 OFÍCIOS)
INSERT INTO public.tenants (id, name, cnpj, logo, fiscal_city, state, plan)
VALUES ('tenant-1', 'VerdeAmbiental Consultoria', '12.345.678/0001-90', '🌱', 'São Paulo', 'SP', 'Enterprise')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.official_notices (id, tenant_id, notice_number, date, organ, subject, signed_by, protocol_date, evidence_location, sei_process_or_notes)
VALUES
  ('of-1', 'tenant-1', '79738866/2023', '2023-12-29', 'FEAM/URA Sul de Minas', 'Atualização nas condições de operação e melhorias implementadas no sistema produtivo da empresa', 'Thaynan Melo', '2023-12-29', 'Sistema Eletrônico de Informações - Acesso Externo (Parcial)', 'PROC. SEI FEAM/URA 1370.01.0049245/2021-40'),
  ('of-2', 'tenant-1', '81033758/2024', '2024-01-19', 'FEAM/URA Sul de Minas', 'Relatório Técnico referente a ampliação da área da subestação de energia - área de 0,36ha ou 3.600m²', 'Thaynan Melo', '2024-01-26', 'Sistema Eletrônico de Informações - Acesso Externo (Integral)', 'PROC. SEI FEAM/URA 2090.01.0002616/2024-49'),
  ('of-3', 'tenant-1', '91838854/2024', '2024-07-03', 'FEAM/URA Sul de Minas', 'Apresentação das informações complementares solicitadas pelo analista - polígonos das áreas', 'Thaynan Melo', '2024-07-04', 'Sistema Eletrônico de Informações - Acesso Externo (Integral)', 'Resposta ao Ofício FEAM/URA SM - CAT nº 94/2024 (SEI 2090.01.0002616/2024-49)'),
  ('of-4', 'tenant-1', '82565056/2024', '2024-02-22', 'FEAM/URA Sul de Minas', 'Cumprimento de condicionante - Efluentes Líquidos ETE e montante e jusante do corpo receptor', 'Thaynan Melo', '2024-02-22', 'Sistema Eletrônico de Informações - Acesso Parcial', 'PROC. SEI FEAM/URA 1370.01.0049245/2021-41'),
  ('of-5', 'tenant-1', '2501_2024', '2024-01-25', 'Secretaria de Meio Ambiente Poços de Caldas', 'Comunicado de ampliação da área útil referente à implantação da subestação de energia elétrica', 'Thaynan Melo', '2025-01-25', 'E-mail : licenciamentoma.semma@gmail.com', 'Emitida Certidão de Dispensa de Licenciamento Ambiental nº 005/2024'),
  ('of-6', 'tenant-1', '2024/04', '2024-06-06', 'Secretaria de Meio Ambiente Poços de Caldas', 'Solicitação de renovação da Autorização para terraplanagem', 'Thaynan Melo', '2025-10-25', 'E-mail : licenciamentoma.semma@gmail.com', 'Autorização de Terraplanagem nº 005/2024'),
  ('of-7', 'tenant-1', '2024/05', '2024-10-15', 'Secretaria de Meio Ambiente Poços de Caldas', 'Documentos da Responsável Técnico (Envio de ART e Certidões)', 'Thaynan Melo', '2024-10-15', 'E-mail : licenciamentoma.semma@gmail.com', 'Documentação do RT anexada'),
  ('of-8', 'tenant-1', '93953511/2025', '2024-07-31', 'FEAM/URA Sul de Minas', 'Ofício Condicionante Nº 01 (1º semestre/2024)', 'Thaynan Melo', '2024-07-31', 'Sistema SEI MG - Acesso Parcial', 'PROC. SEI FEAM/URA 1370.01.0049245/2021-42'),
  ('of-9', 'tenant-1', '100361584/2024', '2024-10-25', 'FEAM/URA Sul de Minas', 'Apresentação do Laudo Relatório Emissões Atmosféricas 2024', 'Thaynan Melo', '2024-10-25', 'Portal SEI-MG Consulta Externa (ID 13796971)', 'PROC. SEI FEAM/URA 1370.01.0049245/2021-43'),
  ('of-10', 'tenant-1', '106106007/2025', '2025-01-24', 'FEAM/URA Sul de Minas', 'Cumprimento de Condicionante - Efluentes Líquidos/Montante e Jusante', 'Thaynan Melo', '2025-01-24', 'Sistema SEI MG - Acesso Parcial', 'PROC. SEI FEAM/URA 1370.01.0049245/2021-44'),
  ('of-11', 'tenant-1', '113835652/2025', '2025-05-17', 'FEAM/URA Sul de Minas', 'Ofício Apresentação melhorias e juntada PGRS', 'Thaynan Melo', '2025-05-17', 'Sistema SEI MG - Acesso Parcial', 'PROC. SEI FEAM/URA 1370.01.0049245/2021-45'),
  ('of-12', 'tenant-1', '114071235/2025', '2025-05-21', 'FEAM/URA Sul de Minas', 'Documento Plano Gerenc. Resíduos Sólidos Industrial (PGRSI)', 'Thaynan Melo', '2025-05-21', 'Sistema SEI MG - Acesso Parcial', 'PROC. SEI FEAM/URA 1370.01.0049245/2021-46'),
  ('of-13', 'tenant-1', '118939128/2025', '2025-07-24', 'FEAM/URA Sul de Minas', 'Cumprimento de Condicionante - Efluentes Líquidos (Item 1 – Anexo II)', 'Thaynan Melo', '2025-07-24', 'Sistema SEI MG - Acesso Parcial', 'PROC. SEI FEAM/URA 1370.01.0049245/2021-47'),
  ('of-14', 'tenant-1', '124144074/2025', '2025-10-01', 'IGAM / URGA', 'Cumprimento de condicionante - Portaria de outorga _ Poço 3', 'Thaynan Melo', '2025-10-01', 'Sistema SEI IGAM', 'PROC. SEI IGAM 2240.01.0005754/2025-41'),
  ('of-15', 'tenant-1', '125505510/2025', '2025-10-20', 'FEAM/URA Sul de Minas', 'Ofício Justificativa de prorrogação de prazo efluente atmosférico', 'Thaynan Melo', '2025-10-20', 'Sistema SEI MG - Acesso Parcial', 'PROC. SEI FEAM/URA 1370.01.0049245/2021-48'),
  ('of-16', 'tenant-1', '1711_2025', '2025-11-17', 'IBAMA', 'Apresentação de Requerimento de adesão ao pagamento da multa e cancelamento do processo', 'Thaynan Melo', '2026-06-12', 'SEI/IBAMA - 27015164 - Notificação', 'PROC. SEI IBAMA 02285.000442/2019-51'),
  ('of-17', 'tenant-1', '129740853/2025', '2025-12-17', 'FEAM/URA Sul de Minas', 'Ofício protocolo cumprimento de condicionante efluente atmosférico', 'Thaynan Melo', '2025-12-17', 'Sistema SEI MG - Acesso Parcial', 'PROC. SEI FEAM/URA 1370.01.0049245/2021-48'),
  ('of-18', 'tenant-1', '131673378/2026', '2026-01-22', 'FEAM/URA Sul de Minas', 'Cumprimento de Condicionantes - Efluentes líquidos montante e jusante do corpo hídrico', 'Thaynan Melo', '2025-01-22', 'Sistema SEI MG - Acesso Parcial', 'PROC. SEI FEAM/URA 1370.01.0049245/2021-49'),
  ('of-19', 'tenant-1', '136934989/2026', '2026-04-06', 'FEAM/URA Sul de Minas', 'Documento PGRSS Serviço de Saúde', 'Thaynan Melo', '2026-04-06', 'Sistema SEI MG - Acesso Parcial', 'PROC. SEI FEAM/URA 1370.01.0049245/2021-50'),
  ('of-20', 'tenant-1', '140438602/2026', '2026-05-22', 'FEAM/URA Sul de Minas', 'Solicitação de vistas no processo de Renovação da Licença Ambiental - RENLO', 'Thaynan Melo', '2026-05-22', 'Sistema SEI MG - Acompanhamento Integral', 'PROC. SEI FEAM/URA 2090.01.0004791/2026-03'),
  ('of-21', 'tenant-1', '143721449/2026', '2026-07-05', 'FEAM/URA Sul de Minas', 'PGRSI_FERRERO_PERIODO 2026 - Plano de Gerenciamento de Resíduos Sólidos Industriais', 'Thaynan Melo', '2026-07-05', 'Sistema SEI MG - Acesso Parcial', 'PROC. SEI FEAM/URA 1370.01.0049245/2021-51')
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- ECOCONSULT SAAS - ESQUEMA DE BANCO DE DADOS POSTGRESQL (SUPABASE)
-- Projeto: https://xjbvtfydakyvayikrxjq.supabase.co
-- ====================================================================

-- Habilitar extensões úteis
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

-- 2. TABELA DE USUÁRIOS
CREATE TABLE IF NOT EXISTS public.users (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) REFERENCES public.tenants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(50) NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABELA DE CLIENTES (PJ/PF)
CREATE TABLE IF NOT EXISTS public.clients (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) REFERENCES public.tenants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  cnpj VARCHAR(20) NOT NULL,
  contact_person VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  sector VARCHAR(100),
  city VARCHAR(100),
  state VARCHAR(2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABELA DE TEMPLATES DE PROPOSTA
CREATE TABLE IF NOT EXISTS public.proposal_templates (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) REFERENCES public.tenants(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  placeholders JSONB NOT NULL DEFAULT '[]'::jsonb,
  content_markdown TEXT NOT NULL,
  updated_at DATE DEFAULT CURRENT_DATE
);

-- 5. TABELA DE PROPOSTAS COMERCIAIS
CREATE TABLE IF NOT EXISTS public.proposals (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) REFERENCES public.tenants(id) ON DELETE CASCADE,
  client_id VARCHAR(64) REFERENCES public.clients(id) ON DELETE CASCADE,
  template_id VARCHAR(64) REFERENCES public.proposal_templates(id),
  title VARCHAR(255) NOT NULL,
  version INT DEFAULT 1,
  filled_values JSONB NOT NULL DEFAULT '{}'::jsonb,
  total_value NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  delivery_days INT DEFAULT 30,
  status VARCHAR(50) DEFAULT 'rascunho',
  generated_by_ai BOOLEAN DEFAULT FALSE,
  human_approved BOOLEAN DEFAULT FALSE,
  created_at DATE DEFAULT CURRENT_DATE
);

-- 6. TABELA DE TEMPLATES DE PROJETO (MOLDES)
CREATE TABLE IF NOT EXISTS public.project_templates (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) REFERENCES public.tenants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  default_checklist JSONB NOT NULL DEFAULT '[]'::jsonb,
  required_docs JSONB NOT NULL DEFAULT '[]'::jsonb,
  ai_prompt_base TEXT
);

-- 7. TABELA DE PROJETOS AMBIENTAIS
CREATE TABLE IF NOT EXISTS public.projects (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) REFERENCES public.tenants(id) ON DELETE CASCADE,
  client_id VARCHAR(64) REFERENCES public.clients(id) ON DELETE CASCADE,
  template_id VARCHAR(64) REFERENCES public.project_templates(id),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'em_dia',
  progress INT DEFAULT 0,
  responsible_user_id VARCHAR(64),
  start_date DATE DEFAULT CURRENT_DATE,
  deadline_date DATE,
  steps JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- 8. TABELA DE PROCESSOS E CONDICIONANTES DE LICENCIAMENTO
CREATE TABLE IF NOT EXISTS public.licensing_processes (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) REFERENCES public.tenants(id) ON DELETE CASCADE,
  client_id VARCHAR(64) REFERENCES public.clients(id) ON DELETE CASCADE,
  process_number VARCHAR(100) NOT NULL,
  environmental_organ VARCHAR(50) NOT NULL,
  license_type VARCHAR(50) NOT NULL,
  issue_date DATE,
  expiration_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'em_analise',
  conditions JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- 9. TABELA DE DOCUMENTOS E VERSIONAMENTO
CREATE TABLE IF NOT EXISTS public.documents (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) REFERENCES public.tenants(id) ON DELETE CASCADE,
  client_id VARCHAR(64) REFERENCES public.clients(id) ON DELETE CASCADE,
  project_id VARCHAR(64),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  current_version INT DEFAULT 1,
  versions JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_ai_parsed BOOLEAN DEFAULT FALSE,
  ai_extracted_summary TEXT
);

-- 10. TABELA DE FATURAMENTO E NOTAS FISCAIS
CREATE TABLE IF NOT EXISTS public.invoices (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) REFERENCES public.tenants(id) ON DELETE CASCADE,
  client_id VARCHAR(64) REFERENCES public.clients(id) ON DELETE CASCADE,
  contract_title VARCHAR(255) NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  due_date DATE NOT NULL,
  issue_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(50) DEFAULT 'pendente',
  provider VARCHAR(50) DEFAULT 'FocusNFe',
  fiscal_ref VARCHAR(255),
  xml_mock_content TEXT
);

-- 11. TABELA DE AUDITORIA & SEGURANÇA IA
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_name VARCHAR(255) NOT NULL,
  action VARCHAR(255) NOT NULL,
  module VARCHAR(100) NOT NULL,
  timestamp VARCHAR(50) NOT NULL,
  is_ai_action BOOLEAN DEFAULT FALSE,
  details TEXT
);

-- HABILITAR ROW LEVEL SECURITY (RLS) PARA ISOLAMENTO MULTI-TENANT
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposal_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licensing_processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- DADOS INICIAIS DE HOMOLOGAÇÃO (TENANTS SEED)
INSERT INTO public.tenants (id, name, cnpj, logo, fiscal_city, state, plan)
VALUES 
  ('tenant-1', 'VerdeAmbiental Consultoria', '12.345.678/0001-90', '🌱', 'São Paulo', 'SP', 'Enterprise'),
  ('tenant-2', 'BioEco Engenharia & Meio Ambiente', '98.765.432/0001-10', '🌊', 'Curitiba', 'PR', 'Professional')
ON CONFLICT (id) DO NOTHING;

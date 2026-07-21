-- ====================================================================
-- ECOCONSULT SAAS - ESQUEMA DE BANCO DE DADOS POSTGRESQL (SUPABASE)
-- Consultoria: Cristiane Beatriz Pereira - Consultoria Ambiental
-- Clientes Enterprise: Midea Carrier, ACG do Brasil, Ferrero do Brasil, Loteamento PA & NR 2
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

-- 2. TABELA DE CREDENCIAIS E ACESSOS A PORTAIS AMBIENTAIS
CREATE TABLE IF NOT EXISTS public.portal_credentials (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) REFERENCES public.tenants(id) ON DELETE CASCADE,
  client_id VARCHAR(64) NOT NULL,
  system_name VARCHAR(100) NOT NULL,
  login_cnpj_or_user VARCHAR(255) NOT NULL,
  cpf_name_user VARCHAR(255),
  email_contact VARCHAR(255),
  encrypted_password VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portal_credentials ENABLE ROW LEVEL SECURITY;

-- SEED DE CONSULTORIA E CLIENTES ENTERPRISE
INSERT INTO public.tenants (id, name, cnpj, logo, fiscal_city, state, plan)
VALUES ('tenant-cbp', 'Cristiane Beatriz Pereira - Consultoria Ambiental', '34.892.102/0001-44', '🌿', 'Poços de Caldas', 'MG', 'Enterprise')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portal_credentials (id, tenant_id, client_id, system_name, login_cnpj_or_user, cpf_name_user, email_contact, encrypted_password, notes)
VALUES
  -- MIDEA CARRIER
  ('cred-midea-1', 'tenant-cbp', 'cli-midea', 'Sistema MTR', '14508829000192', NULL, NULL, 'mtr_midea2026', 'Acesso Cadastrado Sistema MTR FEAM - Ficha cadastral Midea Pouso Alegre'),
  ('cred-midea-2', 'tenant-cbp', 'cli-midea', 'IBAMA', '14.508.829/0001-92', NULL, NULL, 'midea_ibama26', 'Cadastro Técnico Federal (CTF Válido até 29/04/2026)'),
  -- ACG DO BRASIL
  ('cred-1', 'tenant-cbp', 'cli-acg', 'IBAMA', '09.625.967/0002-14', NULL, NULL, 'mgca2014', 'Cadastro Técnico Federal (CTF) - Licença Geral IBAMA'),
  ('cred-2', 'tenant-cbp', 'cli-acg', 'Sistema MTR', '09625967000214', 'CPF: 05475230684 - Maurício Djalles Costa', NULL, 'e22964', 'Manifesto de Transporte de Resíduos - Operador MTR 01'),
  ('cred-3', 'tenant-cbp', 'cli-acg', 'Sistema MTR', '09625967000214', 'CPF: 10228808880 - Miguel Augusto Rocha', 'maugustorocha@hotmail.com', 'acg2020', 'Manifesto de Transporte de Resíduos - Operador MTR 02'),
  ('cred-4', 'tenant-cbp', 'cli-acg', 'Sistema MTR', '09625967000214', 'CPF: 143.588.216.42 - Bárbara Fernanda Pereira Oliveira', 'ehs.brasil@acg-world.com', 'acg2020b', 'Gestão EHS Brasil - Responsável Autorizada MTR'),
  ('cred-5', 'tenant-cbp', 'cli-acg', 'Sistema MTR', '09625967000214', 'CPF: 022.987.346-40 - Raphael Gonçalves Albinati', 'raphael.albinati@acg-world.com', 'acg2022', 'Manifesto de Transporte de Resíduos - Gestor EHS'),
  ('cred-6', 'tenant-cbp', 'cli-acg', 'Sistema SINIR', '09625967000214', 'CPF: 05475230684 - Maurício Djalles Costa', NULL, '4qik3j', 'Sistema Nacional de Informações sobre a Gestão dos Resíduos Sólidos'),
  -- FERRERO DO BRASIL
  ('cred-f-1', 'tenant-cbp', 'cli-ferrero', 'FEAM SEI', '02.502.943/0001-80', NULL, NULL, 'ferrero2024', 'Acesso Externo SEI MG - Processos Ambientais FEAM / IGAM / IEF / SEMAD'),
  ('cred-f-2', 'tenant-cbp', 'cli-ferrero', 'IBAMA', '02.502.943/0001-80', NULL, NULL, 'ferrero_ibama24', 'Cadastro Técnico Federal - IBAMA Serviços'),
  ('cred-f-3', 'tenant-cbp', 'cli-ferrero', 'Sistema SINIR', '02502943000180', NULL, NULL, 'sigor2024', 'SIGOR / CETESB - Sistema de Gerenciamento Online de Resíduos'),
  ('cred-f-4', 'tenant-cbp', 'cli-ferrero', 'Polícia Federal', '02.502.943/0001-80', NULL, 'licenciamentoma.semma@gmail.com', 'semma_pocos24', 'SEMMA Poços de Caldas - Protocolos de Certidões e Terraplanagem'),
  ('cred-f-5', 'tenant-cbp', 'cli-ferrero', 'Sistema MTR', '02502943000180', NULL, NULL, 'mtr_ferrero24', 'Sistema MTR MG - Manifesto de Transporte de Resíduos FEAM')
ON CONFLICT (id) DO NOTHING;

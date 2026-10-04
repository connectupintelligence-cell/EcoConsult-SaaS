-- =====================================================================
-- Módulo 2: Expansão da tabela de clientes
-- Adiciona os campos de contato e setor para o CRM
-- =====================================================================

alter table public.clients
  add column if not exists contact_person text,
  add column if not exists email text,
  add column if not exists phone text,
  add column if not exists sector text;

-- Corrige os dados de teste já inseridos para terem os novos campos
update public.clients
set contact_person = 'Contato Alfa', email = 'alfa@exemplo.com', phone = '(00) 0000-0001', sector = 'Indústria'
where documento = '11111111000111';

update public.clients
set contact_person = 'Produtor Beta', email = 'beta@exemplo.com', phone = '(00) 0000-0002', sector = 'Agronegócio'
where documento = '11111111111';

update public.clients
set contact_person = 'Contato Gama', email = 'gama@exemplo.com', phone = '(00) 0000-0003', sector = 'Construção Civil'
where documento = '22222222000122';

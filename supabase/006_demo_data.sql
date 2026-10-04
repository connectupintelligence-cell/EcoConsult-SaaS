-- =====================================================================
-- Massa de Dados Realista para a DEMO de 10/10
-- Adiciona 3 a 5 clientes fictícios, processos, condicionantes e regras
-- =====================================================================

-- 1. Inserindo Clientes Fictícios (1 CPF e CNPJs)
insert into public.clients (id, nome, tipo_documento, documento, cidade, uf) values
  ('d1111111-1111-1111-1111-111111111111', 'Agropecuária Fazenda Bela Vista (CPF)', 'CPF', '12345678901', 'Belo Horizonte', 'MG'),
  ('d2222222-2222-2222-2222-222222222222', 'Indústria Química Sigma S/A', 'CNPJ', '11222333000144', 'Contagem', 'MG'),
  ('d3333333-3333-3333-3333-333333333333', 'Loteamento Residencial Flores', 'CNPJ', '55666777000188', 'Nova Lima', 'MG'),
  ('d4444444-4444-4444-4444-444444444444', 'Mineradora Terra Rica', 'CNPJ', '99888777000166', 'Brumadinho', 'MG')
on conflict (documento) do nothing;

-- 2. Inserindo Processos Ambientais para esses clientes
insert into public.licensing_processes (id, client_id, process_number, environmental_organ, license_type, issue_date, expiration_date, status) values
  ('p1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', '12345/2026', 'IGAM / URGA', 'Outorga', '2026-01-10', '2026-12-31', 'deferido'),
  ('p2222222-2222-2222-2222-222222222222', 'd2222222-2222-2222-2222-222222222222', '67890/2026', 'FEAM', 'LO', '2025-05-20', '2030-05-20', 'deferido'),
  ('p3333333-3333-3333-3333-333333333333', 'd3333333-3333-3333-3333-333333333333', '54321/2026', 'CETESB', 'LP', null, null, 'em_analise'),
  ('p4444444-4444-4444-4444-444444444444', 'd4444444-4444-4444-4444-444444444444', '98765/2026', 'Polícia Federal', 'CLF Polícia Federal', '2026-03-01', '2027-03-01', 'deferido')
on conflict do nothing;

-- 3. Inserindo Condicionantes (Prazos em faixas diferentes para a demonstração visual)
-- Faixas requeridas: Crítico (<=5 dias), Alerta (<=15 dias), Regular (>15 dias), Vencido
insert into public.licensing_conditions (process_id, description, deadline_date, status) values
  ('p1111111-1111-1111-1111-111111111111', 'Instalação de horímetro no poço tubular', current_date - interval '2 days', 'vencida'), -- Vencido
  ('p2222222-2222-2222-2222-222222222222', 'Entrega do Relatório de Automonitoramento', current_date + interval '4 days', 'pendente'), -- Crítico (<=5)
  ('p2222222-2222-2222-2222-222222222222', 'Renovação do AVCB (Bombeiros)', current_date + interval '12 days', 'pendente'), -- Alerta (<=15)
  ('p3333333-3333-3333-3333-333333333333', 'Protocolar resposta técnica do projeto', current_date + interval '45 days', 'pendente'), -- Regular (>15)
  ('p4444444-4444-4444-4444-444444444444', 'Mapa Mensal Polícia Federal', current_date + interval '1 days', 'em_andamento') -- Crítico
on conflict do nothing;

-- =====================================================================
-- Módulo 3: Tabela de Prazos e Licenças (Licenciamento Ambiental)
-- =====================================================================

-- Tabela principal de Processos Ambientais
create table if not exists public.licensing_processes (
  id                  uuid primary key default gen_random_uuid(),
  client_id           uuid not null references public.clients(id) on delete cascade,
  process_number      text not null,
  environmental_organ text not null,
  license_type        text not null,
  issue_date          date,
  expiration_date     date,
  status              text not null check (status in ('protocolado', 'em_analise', 'deferido', 'pendencia', 'vencido')),
  created_at          timestamptz not null default now()
);

-- Tabela de Condicionantes (Prazos filhos do Processo)
create table if not exists public.licensing_conditions (
  id                  uuid primary key default gen_random_uuid(),
  process_id          uuid not null references public.licensing_processes(id) on delete cascade,
  description         text not null,
  deadline_date       date not null,
  status              text not null check (status in ('cumprida', 'em_andamento', 'pendente', 'vencida')),
  created_at          timestamptz not null default now()
);

-- RLS
alter table public.licensing_processes enable row level security;
alter table public.licensing_conditions enable row level security;

-- Admin e Executora veem e gerenciam tudo
create policy "Equipe gerencia processos" on public.licensing_processes for all to authenticated
using (public.meu_perfil() in ('administradora','executora'))
with check (public.meu_perfil() in ('administradora','executora'));

create policy "Equipe gerencia condicionantes" on public.licensing_conditions for all to authenticated
using (public.meu_perfil() in ('administradora','executora'))
with check (public.meu_perfil() in ('administradora','executora'));

-- Cliente só vê os processos atrelados ao CNPJ/CPF dele
create policy "Cliente ve seus processos" on public.licensing_processes for select to authenticated
using (public.meu_perfil() = 'cliente' and client_id = public.meu_cliente());

-- Cliente vê as condicionantes dos seus processos
create policy "Cliente ve suas condicionantes" on public.licensing_conditions for select to authenticated
using (
  public.meu_perfil() = 'cliente' 
  and process_id in (select id from public.licensing_processes where client_id = public.meu_cliente())
);

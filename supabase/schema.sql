-- =====================================================================
-- EcoConsult SaaS — Migração 001: autenticação, perfis, clientes, auditoria
-- PRD Rev. 02 (módulos 1, 2 e 5) — SOMENTE DADOS DE TESTE.
--
-- Como usar (painel Supabase > SQL Editor > New query):
--   1) Rode a PARTE A inteira.
--   2) Crie os 3 usuários de teste em Authentication > Users > Add user
--      (marque "Auto Confirm User"):
--        admin.teste@ecoconsult.test
--        executora.teste@ecoconsult.test
--        cliente.teste@ecoconsult.test
--   3) Rode a PARTE B (atribui os perfis).
-- O script é idempotente: pode ser executado mais de uma vez.
-- =====================================================================

-- ============================== PARTE A ==============================

-- ---------- Clientes (CPF ou CNPJ — Adendo 01, item 1.1) ----------
create table if not exists public.clients (
  id              uuid primary key default gen_random_uuid(),
  nome            text not null,
  tipo_documento  text not null check (tipo_documento in ('CPF','CNPJ')),
  documento       text not null unique,          -- somente dígitos
  cidade          text,
  uf              char(2),
  created_at      timestamptz not null default now(),
  constraint documento_formato check (
    (tipo_documento = 'CPF'  and documento ~ '^[0-9]{11}$') or
    (tipo_documento = 'CNPJ' and documento ~ '^[0-9]{14}$')
  )
);

-- ---------- Perfis de acesso (módulo 1) ----------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null,
  role        text not null check (role in ('administradora','executora','cliente')),
  client_id   uuid references public.clients(id) on delete set null,
  created_at  timestamptz not null default now(),
  constraint cliente_precisa_vinculo check (role <> 'cliente' or client_id is not null)
);

-- ---------- Auditoria (módulo 5) — somente inserção ----------
create table if not exists public.audit_logs (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users(id),
  action      text not null,          -- ex.: login, logout, visualizou, alterou, aprovou
  module      text not null,
  entity_id   text,
  details     text,
  created_at  timestamptz not null default now()   -- data/hora definida pelo servidor
);

-- ---------- Funções auxiliares (security definer evita recursão na RLS) ----------
create or replace function public.meu_perfil() returns text
language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.meu_cliente() returns uuid
language sql stable security definer set search_path = public as $$
  select client_id from public.profiles where id = auth.uid()
$$;

-- ---------- RLS ----------
alter table public.clients    enable row level security;
alter table public.profiles   enable row level security;
alter table public.audit_logs enable row level security;

-- clients: equipe interna vê todos; cliente vê só o seu
drop policy if exists clients_select on public.clients;
create policy clients_select on public.clients for select to authenticated
  using (public.meu_perfil() in ('administradora','executora') or id = public.meu_cliente());

drop policy if exists clients_write on public.clients;
create policy clients_write on public.clients for all to authenticated
  using (public.meu_perfil() in ('administradora','executora'))
  with check (public.meu_perfil() in ('administradora','executora'));

-- profiles: cada um lê o próprio; administradora lê e gerencia todos.
-- Ninguém altera o próprio perfil (impede autopromoção a administradora).
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select to authenticated
  using (id = auth.uid() or public.meu_perfil() = 'administradora');

drop policy if exists profiles_admin_write on public.profiles;
create policy profiles_admin_write on public.profiles for all to authenticated
  using (public.meu_perfil() = 'administradora')
  with check (public.meu_perfil() = 'administradora');

-- audit_logs: qualquer usuário logado registra eventos em seu próprio nome;
-- só a administradora consulta; não existe política de UPDATE/DELETE (imutável).
drop policy if exists audit_insert on public.audit_logs;
create policy audit_insert on public.audit_logs for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists audit_select on public.audit_logs;
create policy audit_select on public.audit_logs for select to authenticated
  using (public.meu_perfil() = 'administradora');

revoke update, delete, truncate on public.audit_logs from anon, authenticated;

-- ---------- Clientes de TESTE (fictícios) ----------
insert into public.clients (nome, tipo_documento, documento, cidade, uf) values
  ('Indústria Teste Alfa Ltda',        'CNPJ', '11111111000111', 'Cidade Teste', 'MG'),
  ('Fazenda Teste Beta (pessoa física)', 'CPF',  '11111111111',    'Cidade Teste', 'MG'),
  ('Loteamento Teste Gama',            'CNPJ', '22222222000122', 'Cidade Teste', 'SP')
on conflict (documento) do nothing;


-- ============================== PARTE B ==============================
-- Rode depois de criar os 3 usuários em Authentication > Users.

insert into public.profiles (id, full_name, role, client_id)
select u.id, v.full_name, v.role,
       (select c.id from public.clients c where c.documento = v.doc)
from (values
  ('admin.teste@ecoconsult.test',     'Administradora (teste)', 'administradora', null),
  ('executora.teste@ecoconsult.test', 'Executora (teste)',      'executora',      null),
  ('cliente.teste@ecoconsult.test',   'Cliente Alfa (teste)',   'cliente',        '11111111000111')
) as v(email, full_name, role, doc)
join auth.users u on lower(u.email) = v.email
on conflict (id) do update
  set full_name = excluded.full_name, role = excluded.role, client_id = excluded.client_id;

-- Conferência: deve listar 3 linhas
select u.email, p.role, c.nome as cliente_vinculado
from public.profiles p
join auth.users u on u.id = p.id
left join public.clients c on c.id = p.client_id;

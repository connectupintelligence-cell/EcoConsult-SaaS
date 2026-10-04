-- =====================================================================
-- Módulo 4: Tabela de Metadados de Documentos
-- Armazena histórico de versão, sumário de IA, cliente e status de liberação
-- =====================================================================

create table if not exists public.documents (
  id              uuid primary key default gen_random_uuid(),
  client_id       uuid not null references public.clients(id) on delete cascade,
  title           text not null,
  category        text not null,          -- ex: Relatórios Técnicos, Ofícios, etc.
  storage_path    text not null,          -- caminho do arquivo no bucket 'documentos'
  file_size       text,                   -- ex: "2.4 MB"
  version_number  integer not null default 1,
  is_liberado     boolean not null default false, -- Se true, o cliente pode ver
  is_validado     boolean not null default false, -- Se true, o cliente validou
  ai_summary      text,                   -- Resumo extraído pela IA
  uploaded_by     text not null,          -- Nome de quem enviou
  created_at      timestamptz not null default now()
);

-- RLS
alter table public.documents enable row level security;

-- Admin e Executora veem todos
create policy docs_internal_select on public.documents for select to authenticated
using (public.meu_perfil() in ('administradora','executora'));

-- Cliente vê apenas os seus E que estiverem liberados
create policy docs_cliente_select on public.documents for select to authenticated
using (
  public.meu_perfil() = 'cliente' 
  and client_id = public.meu_cliente()
  and is_liberado = true
);

-- Admin e Executora podem inserir/alterar
create policy docs_internal_write on public.documents for all to authenticated
using (public.meu_perfil() in ('administradora','executora'))
with check (public.meu_perfil() in ('administradora','executora'));

-- Cliente só pode atualizar para marcar como "validado = true" no documento dele
create policy docs_cliente_update on public.documents for update to authenticated
using (
  public.meu_perfil() = 'cliente' 
  and client_id = public.meu_cliente()
  and is_liberado = true
)
with check (
  is_validado = true
);

-- =====================================================================
-- SCRIPT DE LIMPEZA GERAL DO BANCO DE DADOS E STORAGE (ATUALIZADO)
-- =====================================================================
-- Este script apaga TODOS os dados de teste para a "virada de chave".
-- Deve ser executado pelo Felipe apenas com autorização da Cristiane.

do $$ 
declare
  real_users_count integer;
begin
  -- (a) Trava de Segurança: Aborta se existir usuário real (fora do domínio de teste)
  select count(*) into real_users_count from auth.users where email not like '%@ecoconsult.test';
  if real_users_count > 0 then
    raise exception 'ABORTADO: Existem usuários reais no sistema. O script de limpeza só pode rodar em ambiente puramente de teste.';
  end if;

  -- (b) Limpeza do Storage (Ao deletar de storage.objects, o Supabase deleta fisicamente o arquivo via triggers)
  delete from storage.objects where bucket_id = 'documentos';

  -- (c) Limpeza das Tabelas Públicas (Atualizado a cada novo módulo)
  truncate table public.documents cascade;
  truncate table public.audit_logs cascade;
  truncate table public.profiles cascade;
  truncate table public.clients cascade;

  -- Limpeza de Usuários de Autenticação (Testes)
  delete from auth.users where email like '%@ecoconsult.test';
end $$;

-- (c) Conferência Única (Retorna contagem zerada se tudo der certo)
select 
  (select count(*) from auth.users) as usuarios_auth,
  (select count(*) from public.profiles) as perfis,
  (select count(*) from public.clients) as clientes,
  (select count(*) from public.documents) as documentos_banco,
  (select count(*) from storage.objects where bucket_id = 'documentos') as arquivos_storage,
  (select count(*) from public.audit_logs) as auditoria;

-- 1. Adicionar o vínculo do login com o cliente na tabela profiles
alter table public.profiles 
add column if not exists client_id uuid references public.clients(id);

-- 2. Atualiza os dados de teste (vinculando o login do cliente teste ao cliente Beta)
update public.profiles 
set client_id = (select id from public.clients where documento = '11111111111' limit 1)
where role = 'cliente';

-- 3. Cria o bucket (pasta raiz) privado
insert into storage.buckets (id, name, public) 
values ('documentos', 'documentos', false)
on conflict (id) do nothing;

-- 4. Regra 1: Administradora tem acesso total
create policy "Admin tem acesso total" on storage.objects for all to authenticated
using (bucket_id = 'documentos' and (select role from public.profiles where id = auth.uid()) = 'administradora');

-- 5. Regra 2: Executora pode Fazer Upload e Ler (sem deletar)
create policy "Executora pode ler e fazer upload" on storage.objects for select to authenticated
using (bucket_id = 'documentos' and (select role from public.profiles where id = auth.uid()) = 'executora');

create policy "Executora pode inserir" on storage.objects for insert to authenticated
with check (bucket_id = 'documentos' and (select role from public.profiles where id = auth.uid()) = 'executora');

-- 6. Regra 3: Cliente lê apenas sua própria pasta (CPF/CNPJ)
create policy "Cliente lê apenas sua pasta" on storage.objects for select to authenticated
using (
  bucket_id = 'documentos' 
  and (select role from public.profiles where id = auth.uid()) = 'cliente'
  and (storage.foldername(name))[1] = (
    select c.documento 
    from public.profiles p 
    join public.clients c on c.id = p.client_id 
    where p.id = auth.uid()
  )
);

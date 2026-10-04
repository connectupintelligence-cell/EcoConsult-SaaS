# Diretrizes de Segurança e Privacidade de Dados (EcoConsult SaaS)

Este documento estabelece as regras absolutas de manipulação de dados para o repositório, ambiente de desenvolvimento e interações com assistentes de IA (incluindo Antigravity).

## 1. Proibição de Dados Reais no Repositório
**É estritamente proibido** inserir qualquer dado real de clientes, processos ou pessoas da EcoConsult ou de seus clientes neste repositório. Isso inclui, mas não se limita a:
- Nomes reais de empresas, fazendas, responsáveis técnicos ou funcionários.
- Números de CNPJ, CPF, RG ou registros em conselhos (CREA/CRQ).
- Números reais de processos ambientais (IBAMA, CETESB, FEAM, etc.).
- Endereços, e-mails, telefones ou credenciais (mesmo que antigas).
- Trechos copiados de relatórios, laudos, ofícios ou condicionantes reais.

## 2. Padrão para Massa de Testes (Mock Data)
Todo desenvolvimento, script SQL (`schema.sql`, `demo_data.sql`), mockups de Front-end ou testes automatizados devem utilizar exclusivamente **dados 100% fictícios**.
- **Empresas:** Indústria Acme, Fazenda Teste, Empresa Beta.
- **Pessoas:** Usuário Teste, Técnico Responsável, João da Silva.
- **Documentos:** `11.111.111/0001-11`, `123.456.789-00`.
- **E-mails:** Devem usar domínios controlados como `@ecoconsult.test` ou `@exemplo.com`.

## 3. Integração com Inteligência Artificial
Nenhum documento real (PDF, DOCX) ou base de dados da EcoConsult deve ser anexado diretamente no chat de agentes de programação (como Antigravity/Gemini) para evitar que o modelo memorize informações sigilosas.
- A arquitetura da aplicação SaaS utilizará chamadas de API (via Backend/Edge Functions) cobertas pelos **Termos de IA Corporativa** (Zero Data Retention / No Training).
- Durante a fase de construção (até autorização explícita), todos os fluxos de IA no aplicativo usarão respostas fixas de simulação (*mock*).

## 4. Histórico Git
Caso qualquer dado real seja acidentalmente *comitado*, o histórico do Git deve ser imediatamente reescrito (Orphan Branch ou Filter-Repo) para purgar o vazamento. Um simples `git rm` ou commit de correção não é suficiente, pois os dados permanecem no histórico.

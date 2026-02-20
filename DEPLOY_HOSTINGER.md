# Documentação de Correções e Guia de Deploy - Hostinger

Este documento explica as falhas corrigidas e fornece um guia passo a passo para colocar o projeto em produção na Hostinger.

---

## 1. O que estava errado e como foi corrigido?

Três problemas principais impediam o funcionamento correto do projeto em produção:

### A. Erro de Rota no Express 5 (Path-to-Regexp)
*   **Problema:** O projeto usa o **Express 5**, que é mais rigoroso com rotas curinga. O uso de `app.get('*', ...)` causava um erro interno (`Missing parameter name`), pois o Express 5 exige que o curinga `*` tenha um nome.
*   **Correção:** Alterei o código no `server/index.ts` para `app.get('{/*path}', ...)`. Isso nomeia o parâmetro e satisfaz os requisitos da nova versão do Express.

### B. Conflito entre Streaming e Response Body
*   **Problema:** Em `pages/+config.ts`, o `stream` estava definido como `true`. Quando o streaming está ativo, o Vike envia a página em "pedaços" (pipes). No entanto, o seu servidor Express tentava ler a página inteira como uma string (`httpResponse.body`). Isso gerava o erro `pageContext.httpResponse.body can't be used`.
*   **Correção:** Alterei `stream` para `false` em `pages/+config.ts`. Isso garante que o Vike gere o HTML completo antes de entregá-lo ao servidor, permitindo o uso do `.body`.

### C. Pasta `dist/server` desaparecendo (Prerender)
*   **Problema:** A opção `prerender: true` fazia com que o Vike gerasse arquivos estáticos e, ao terminar, limpasse o ambiente de servidor, deletando a pasta `dist/server`. Isso causava o erro `Cannot find module ... entry.mjs`.
*   **Correção:** Desativei o `prerender: true` global em `pages/+config.ts`. Isso preserva o bundle do servidor, permitindo que as rotas dinâmicas do catálogo funcionem via **SSR (Server-Side Rendering)**, consultando o banco de dados em tempo real.

---

## 2. Guia de Deploy para Hostinger (Node.js)

O seu projeto agora está preparado para rodar via **SSR**. Siga estes passos para o deploy:

### Passo 1: Preparar o Build Localmente
Antes de subir os arquivos, gere a versão final:
```bash
npm run build
```
Isso criará a pasta `dist` com tudo o que é necessário.

### Passo 2: Subir os arquivos para a Hostinger
Você deve mover para o Gerenciador de Arquivos da Hostinger:
1.  **Tudo na raiz do seu site** (geralmente dentro de `domains/seu-dominio.com/public_html`).
2.  Não esqueça de subir:
    *   Pasta `dist/`
    *   Pasta `server/`
    *   Pasta `node_modules/` (ou rodar `npm install --production` no terminal da Hostinger)
    *   `package.json`
    *   `package-lock.json`
    *   `.env` (com suas credenciais do Supabase)

### Passo 3: Configuração do Node.js na Hostinger
No painel de controle da Hostinger (hPanel):
1.  Vá em **Avançado > Node.js**.
2.  **Versão do Node**: Selecione **20 ou superior**.
3.  **Diretório do App**: Onde você subiu os arquivos.
4.  **Comando de Execução**: Utilize o comando padrão **`npm start`**. Eu adicionei esse script ao seu `package.json` e ele chamará automaticamente o servidor em modo de produção.

---

## 3. Comandos Úteis

*   **Para testar localmente exatamente como na Hostinger:**
    ```bash
    npm run build
    npm run preview
    ```
*   **Para rodar em produção (Hostinger):**
    ```bash
    npm start
    ```

---

> [!TIP]
> O comando `server:prod` agora usa o `tsx` para rodar o arquivo `.ts` do servidor diretamente em produção, o que facilita muito o gerenciamento, mantendo o SSR ativo para que seu catálogo mostre sempre os dados mais recentes do Supabase.

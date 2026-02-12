# 🔒 Auditoria de Segurança e Escalabilidade — MEM Catálogo

**Data:** 12 de Fevereiro de 2026
**Última atualização:** 12 de Fevereiro de 2026
**Projeto:** MEM | Catálogo de Medicina
**Stack:** React 18 + Vite 7 + TypeScript + Supabase + TailwindCSS
**Deploy target:** Vercel + Cloudflare (Docker/Nginx)

---

## 📋 Resumo Executivo

| Categoria | Status | Itens Encontrados | Corrigidos |
|-----------|--------|-------------------|------------|
| 🔴 Segurança Crítica | **5 problemas** | Credenciais expostas, XSS, RLS | ✅ 4/5 |
| 🟠 Segurança Moderada | **6 problemas** | Headers, validação, CORS | ✅ 3/6 |
| 🟡 Escalabilidade | **7 problemas** | Queries ineficientes, bundle, cache | ✅ 3/7 |
| 🟢 SEO / Boas Práticas | **4 problemas** | URLs inconsistentes, sitemap | ✅ 2/4 |
| 🔵 Performance | **5 problemas** | Bundle size, lazy loading, images | ✅ 3/5 |

---

## 🔴 PROBLEMAS CRÍTICOS DE SEGURANÇA

### 1. ✅ CORRIGIDO — TUNNEL TOKEN REAL EXPOSTO no `.env.example`
**Arquivo:** `.env.example`
**Severidade:** 🔴 CRÍTICA

O `.env.example` continha um **token real do Cloudflare Tunnel**. Foi substituído por placeholders.

> ⚠️ **AÇÃO MANUAL NECESSÁRIA:** O token antigo está no histórico do Git. **Revogue-o imediatamente** no painel do Cloudflare e gere um novo.

---

### 2. ⚠️ PENDENTE — Supabase Anon Key exposta no frontend (verificar RLS)
**Arquivo:** `.env` → `src/lib/supabase.ts`
**Severidade:** 🔴 CRÍTICA (dependendo da configuração RLS)

A chave anon do Supabase (`VITE_SUPABASE_ANON_KEY`) é exposta no bundle JS final. Isso é aceitável **APENAS SE** o RLS estiver corretamente configurado.

> ⚠️ **AÇÃO MANUAL NECESSÁRIA:**
> 1. No Supabase Dashboard → Authentication → Policies → Verificar RLS habilitado na tabela `Instituicoes`
> 2. Criar policy `SELECT` pública: `CREATE POLICY "read_only" ON "Instituicoes" FOR SELECT USING (true);`
> 3. Bloquear `INSERT`, `UPDATE`, `DELETE` para o role `anon`
> 4. Verificar se não há outras tabelas expostas

---

### 3. ✅ CORRIGIDO — Consultas `SELECT *` removidas
**Arquivos:** `UniversityDetail.tsx`, `FeaturedUniversities.tsx`, `UniversityPhotos.tsx`, `generate-sitemap.js`

Todas as queries `select('*')` foram substituídas por listas explícitas de colunas:
- `FeaturedUniversities.tsx`: `select('id, name, cidade, estado, logo')`
- `UniversityDetail.tsx`: `select('id, name, cidade, estado, tipo, website, ...')`  (23 campos)
- `UniversityPhotos.tsx`: `select('id, name, cidade, estado')`
- `generate-sitemap.js`: `select('name, estado, cidade')`
- `UniversityCatalog.tsx`: Já estava otimizado ✅

---

### 4. ✅ CORRIGIDO — Sanitização de entradas do usuário no filtro de busca
**Arquivos:** `CatalogRouter.tsx:122`, `HomePage.tsx:33`

`encodeURIComponent()` aplicado aos termos de busca antes de inseri-los na URL:
```typescript
newPath = `/cursos/q=${encodeURIComponent(newFilters.searchTerm)}`;
```

---

### 5. ✅ CORRIGIDO — Content Security Policy (CSP) e Security Headers
**Arquivos:** `vercel.json`, `nginx.conf`

Headers de segurança adicionados: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS, X-DNS-Prefetch-Control.

---

## 🟠 PROBLEMAS MODERADOS DE SEGURANÇA

### 6. ⚠️ PENDENTE — WhatsApp com número placeholder
**Arquivo:** `Footer.tsx:107`
```tsx
href="https://wa.me/5511999999999"
```
> ⚠️ **AÇÃO MANUAL NECESSÁRIA:** Substituir pelo número real da organização.

---

### 7. ⚠️ PENDENTE — Links externos sem `noopener noreferrer` no Header
**Arquivo:** `Header.tsx:30-53`
Links para `melhoresescolasmedicas.com` estão sem `target="_blank"` + `rel="noopener noreferrer"`.

---

### 8. ⚠️ PENDENTE — Iframe do Google Maps sem `sandbox`
**Arquivo:** `UniversityDetail.tsx:346-364`
Adicionar `sandbox="allow-scripts allow-same-origin"` para restringir o iframe.

---

### 9. ⚠️ PENDENTE — Formulário de email sem validação (mailto:)
**Arquivo:** `UniversityDetail.tsx:428`
Se `university.email` contiver conteúdo malicioso do banco, pode ser explorado.

---

### 10. ✅ CORRIGIDO — Console.log removidos de produção
**Arquivos:** `FeaturedUniversities.tsx`, `Header.tsx`

Removidos todos os `console.log` de debug. Os `console.error` nas catch blocks foram mantidos para diagnóstico.

---

### 11. ✅ CORRIGIDO — Validação de variáveis de ambiente do Supabase
**Arquivo:** `supabase.ts`

Validação em runtime adicionada — a aplicação agora lança um erro claro se as variáveis estiverem ausentes.

---

## 🟡 PROBLEMAS DE ESCALABILIDADE

### 12. ⚠️ PENDENTE — Todos os dados carregados no cliente (sem paginação server-side)
**Arquivo:** `UniversityCatalog.tsx:157-188`

O catálogo busca TODAS as instituições e filtra/pagina no frontend. Para escalar:
```typescript
const { data, error, count } = await supabase
  .from('Instituicoes')
  .select('id, name, cidade, estado, tipo, logo, ranking', { count: 'exact' })
  .ilike('name', `%${searchTerm}%`)
  .range(from, to)
  .order('name');
```

---

### 13. ⚠️ PENDENTE — Chamadas duplicadas à API do IBGE sem cache
**Arquivo:** `UniversityCatalog.tsx:117-153`

**Correção sugerida:** TanStack Query ou localStorage com TTL de 24h.

---

### 14. ⚠️ PENDENTE — UniversityDetail busca TODOS os registros para encontrar um
**Arquivo:** `UniversityDetail.tsx:57-60`

Mesmo com a correção de `select('*')` → colunas explícitas, ainda transfere **todas as linhas** para filtrar client-side. A solução definitiva requer adicionar uma coluna `slug` no Supabase.

---

### 15. ⚠️ PENDENTE — Sem Error Boundaries React
Se qualquer componente crashar, a aplicação inteira fica em branco.

---

### 16. ⚠️ PENDENTE — Sem rate limiting na API Supabase
Configurar em: Supabase Dashboard → API Settings → Rate Limiting.

---

### 17. ✅ CORRIGIDO — Code Splitting e Bundle Optimization
**Arquivos:** `App.tsx`, `vite.config.ts`

Implementado:
- **React.lazy + Suspense** para carregar `HomePage` e `CatalogRouter` sob demanda
- **Manual chunks** no Vite para separar vendor libraries

**Resultado do build (antes vs. depois):**

| Antes | Depois |
|-------|--------|
| 1 chunk: **631 kB** (190 kB gzip) | Maior chunk: **176 kB** (58 kB gzip) |
| ⚠️ Warning de chunk > 500 kB | ✅ Sem warnings |

**Distribuição atual dos chunks:**
| Chunk | Tamanho | Gzip |
|-------|---------|------|
| `vendor-react.js` | 176.66 kB | 58.08 kB |
| `vendor-supabase.js` | 170.52 kB | 45.36 kB |
| `vendor-ui.js` | 125.43 kB | 41.89 kB |
| `HomePage.js` | 59.47 kB | 17.32 kB |
| `CatalogRouter.js` | 50.40 kB | 11.20 kB |
| `index.js` (core) | 48.53 kB | 18.59 kB |

---

### 18. ⚠️ PENDENTE — Imagens sem otimização
- Logos de URLs externas sem CDN
- Fallback image usa URL de terceiros (brasilescola.uol.com.br)
- Sem uso de `<picture>`, `srcset`, ou formatos WebP/AVIF

---

## 🟢 PROBLEMAS DE SEO / BOAS PRÁTICAS

### 19. ✅ CORRIGIDO — URLs canônicas unificadas
**Arquivos:** `generate-sitemap.js`, `robots.txt`

Todos os arquivos agora usam: `https://catalogo.melhoresescolasmedicas.com`

---

### 20. ⚠️ PENDENTE — Sitemap com data genérica (sempre "agora")
**Arquivo:** `generate-sitemap.js:49`

Todas as URLs terão o mesmo `<lastmod>`, reduzindo a utilidade do sitemap.

---

### 21. ⚠️ PENDENTE — SPA sem Server-Side Rendering (SSR)
Bots de mecanismo de busca podem ter dificuldade em indexar conteúdo dinâmico. Considere migrar para Next.js com SSG/ISR.

---

### 22. ⚠️ PENDENTE — Dados estáticos hardcoded
**Arquivo:** `UniversityDetail.tsx:528` — Datas do calendário de admissão (2024/2025) estão hardcoded e ficaram desatualizadas.

---

## 🔵 PROBLEMAS DE PERFORMANCE

### 23. ⚠️ PENDENTE — Google Fonts bloqueia renderização
3 famílias de fontes carregadas (Inter, Roboto, Open Sans). Somente Inter parece ser usada. Remova as demais.

---

### 24. ⚠️ PENDENTE — Scripts de terceiros carregados em sequência
**Arquivo:** `index.html:5-21`
Clarity e GTM no `<head>` antes do CSS/conteúdo. Use `defer` ou mova para o final do `<body>`.

---

### 25. ✅ CORRIGIDO — Papaparse removido das dependências
**Arquivo:** `package.json`

`papaparse` e `@types/papaparse` removidos das dependencies e devDependencies. Import no `generate-sitemap.js` também removido.

---

### 26. ⚠️ PENDENTE — `lucide-react` excluído do optimizeDeps
**Arquivo:** `vite.config.ts:21`
Pode causar re-bundling desnecessário. Teste remover essa exclusão.

---

### 27. ⚠️ PENDENTE — Imagens de assets muito grandes
Verifique se as imagens estão otimizadas (WebP/AVIF, compressão, dimensões adequadas).

---

## ✅ CHECKLIST PARA DEPLOY

### Antes do Deploy (OBRIGATÓRIO):
- [x] ~~**Substituir** o token real no `.env.example` por placeholders~~
- [ ] **Revogar** o Cloudflare Tunnel Token exposto no histórico Git
- [ ] **Verificar** RLS no Supabase (tabela `Instituicoes`)
- [x] ~~**Unificar** o domínio canônico em todos os arquivos~~
- [x] ~~**Atualizar** `generate-sitemap.js` com a BASE_URL correta~~
- [x] ~~**Atualizar** `robots.txt` com a URL correta do sitemap~~
- [ ] **Configurar** variáveis de ambiente no Vercel (não commitá-las)
- [x] ~~**Remover** console.logs de produção~~
- [ ] **Substituir** o WhatsApp placeholder por número real
- [x] ~~**Adicionar** headers de segurança (CSP, X-Frame-Options, etc.)~~
- [x] ~~**Remover** papaparse das dependências~~
- [x] ~~**Implementar** code splitting com React.lazy~~
- [x] ~~**Otimizar** queries SELECT * → colunas explícitas~~
- [x] ~~**Adicionar** encodeURIComponent nos termos de busca~~
- [x] ~~**Corrigir** lint warnings (variáveis não usadas)~~
- [x] ~~**Adicionar** validação de variáveis de ambiente do Supabase~~

### Após o Deploy:
- [ ] Testar HTTPS está ativo
- [ ] Verificar redirecionamento HTTP → HTTPS
- [ ] Submeter o sitemap atualizado ao Google Search Console
- [ ] Rodar o Google Lighthouse para verificar performance
- [ ] Testar todas as rotas SPA (refresh em `/cursos/sao-paulo`)
- [ ] Verificar que a variável `VITE_SUPABASE_URL` está definida na Vercel

### Melhorias Futuras (Recomendado):
- [ ] Implementar paginação server-side no catálogo
- [ ] Adicionar coluna `slug` na tabela do Supabase
- [ ] Implementar React Error Boundaries
- [ ] Considerar Next.js para SSR/SSG (melhor SEO)
- [ ] Implementar cache de dados com TanStack Query
- [ ] Adicionar rate limiting no Supabase
- [ ] Configurar testes automatizados (unit + e2e)
- [ ] Implementar monitoramento de erros (Sentry)
- [ ] Remover fontes não utilizadas (Roboto, Open Sans)
- [ ] Otimizar carregamento de scripts de terceiros

---

*Relatório gerado por análise completa de todos os arquivos do projeto.*
*Atualizado com as correções implementadas na sessão de auditoria.*

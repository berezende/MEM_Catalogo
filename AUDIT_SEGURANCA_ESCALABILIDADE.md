# 🔒 Auditoria de Segurança e Escalabilidade — MEM Catálogo

**Data:** 12 de Fevereiro de 2026  
**Projeto:** MEM | Catálogo de Medicina  
**Stack:** React 18 + Vite 7 + TypeScript + Supabase + TailwindCSS  
**Deploy target:** Vercel + Cloudflare (Docker/Nginx)

---

## 📋 Resumo Executivo

| Categoria | Status | Itens Encontrados |
|-----------|--------|-------------------|
| 🔴 Segurança Crítica | **5 problemas** | Credenciais expostas, XSS, RLS |
| 🟠 Segurança Moderada | **6 problemas** | Headers, validação, CORS |
| 🟡 Escalabilidade | **7 problemas** | Queries ineficientes, bundle, cache |
| 🟢 SEO / Boas Práticas | **4 problemas** | URLs inconsistentes, sitemap |
| 🔵 Performance | **5 problemas** | Bundle size, lazy loading, images |

---

## 🔴 PROBLEMAS CRÍTICOS DE SEGURANÇA

### 1. ⚠️ TUNNEL TOKEN REAL EXPOSTO no `.env.example`
**Arquivo:** `.env.example`  
**Severidade:** 🔴 CRÍTICA  
**Status:** Commitado no Git desde o primeiro commit

O arquivo `.env.example` contém um **token real do Cloudflare Tunnel**:
```
TUNNEL_TOKEN=eyJhIjoiODNmY2...
```

Este token está no histórico do Git e permite a qualquer pessoa com acesso ao repositório criar túneis na sua conta Cloudflare.

**✅ Correção:**
1. Revogar imediatamente esse token no painel do Cloudflare
2. Gerar um novo token
3. Substituir o `.env.example` por placeholders

---

### 2. ⚠️ Supabase Anon Key exposta no frontend (risco se RLS não estiver configurado)
**Arquivo:** `.env` → `src/lib/supabase.ts`  
**Severidade:** 🔴 CRÍTICA (dependendo da configuração RLS)

A chave anon do Supabase (`VITE_SUPABASE_ANON_KEY`) é exposta no bundle JS final (variáveis `VITE_` são visíveis no frontend por design do Vite). Isso é aceitável **APENAS SE**:
- Row Level Security (RLS) estiver habilitado em TODAS as tabelas
- Policies de RLS permitam APENAS operações de `SELECT` para `anon`
- Não existam tabelas com dados sensíveis acessíveis via `anon`

**✅ Verificações obrigatórias antes do deploy:**
1. No painel Supabase → Authentication → Policies: Verifique se a tabela `Instituicoes` tem RLS habilitado
2. Crie uma policy `SELECT` pública: `CREATE POLICY "read_only" ON "Instituicoes" FOR SELECT USING (true);`
3. Bloqueie `INSERT`, `UPDATE`, `DELETE` para o role `anon`
4. Verifique se não há outras tabelas expostas

---

### 3. ⚠️ Consultas `SELECT *` trazem TODOS os dados do banco
**Arquivos:** `UniversityDetail.tsx:59`, `FeaturedUniversities.tsx:44`, `UniversityPhotos.tsx:52`, `generate-sitemap.js:41`  
**Severidade:** 🔴 CRÍTICA para segurança + escalabilidade

Múltiplos componentes fazem `supabase.from('Instituicoes').select('*')`, trazendo **TODAS as colunas e TODAS as linhas** para o cliente. Isso:
- Expõe campos que talvez não devam ser públicos (emails internos, telefones, etc.)
- Transfere dados desnecessários para o navegador
- Não escala conforme a tabela cresce

**✅ Correção:**
```typescript
// UniversityDetail.tsx - buscar apenas a instituição necessária por slug
const { data, error } = await supabase
  .from('Instituicoes')
  .select('id, name, cidade, estado, tipo, website, ...')  // apenas campos necessários
  .ilike('name', slug.replace(/-/g, '%'))  // ou usar uma coluna slug
  .limit(1)
  .single();

// FeaturedUniversities.tsx - buscar apenas as em destaque
const { data, error } = await supabase
  .from('Instituicoes')
  .select('id, name, cidade, estado, logo')
  .in('name', featuredUniversityNames);

// UniversityCatalog.tsx - já seleciona apenas campos necessários ✅
```

---

### 4. ⚠️ Sem sanitização de entradas do usuário no filtro de busca
**Arquivo:** `UniversityCatalog.tsx:320-327`, `Hero.tsx:91`  
**Severidade:** 🟠 MODERADA

Os valores de busca do usuário são usados diretamente em filtros JavaScript client-side e na construção de URLs sem sanitização adequada:
```typescript
// CatalogRouter.tsx linha 122
newPath = `/cursos/q=${newFilters.searchTerm}`; // searchTerm não sanitizado na URL
```

Embora o risco de XSS seja baixo (React escapa por padrão), valores maliciosos na URL podem causar problemas.

**✅ Correção:**
```typescript
newPath = `/cursos/q=${encodeURIComponent(newFilters.searchTerm)}`;
```

---

### 5. ⚠️ Sem Content Security Policy (CSP) Headers
**Arquivo:** `nginx.conf`, `vercel.json`, `index.html`  
**Severidade:** 🟠 MODERADA

O site carrega scripts de terceiros (Google Tag Manager, Clarity, RD Station) sem CSP definida. Isso permite que qualquer script injetado execute no contexto do seu site.

**✅ Correção para `vercel.json`:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.clarity.ms https://d335luupugsy2.cloudfront.net https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co https://servicodados.ibge.gov.br https://www.google-analytics.com; frame-src https://maps.google.com https://www.googletagmanager.com;"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

**✅ Correção para `nginx.conf`:**
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
```

---

## 🟠 PROBLEMAS MODERADOS DE SEGURANÇA

### 6. WhatsApp com número fake
**Arquivo:** `Footer.tsx:107`
```tsx
href="https://wa.me/5511999999999"
```
O número de WhatsApp usado é um placeholder. Se não for substituído, aponta para um número inexistente ou de terceiros.

---

### 7. Links externos sem `noopener noreferrer` em alguns locais
**Arquivo:** `Header.tsx:30-53`  
Links para `melhoresescolasmedicas.com` estão sem `target="_blank"` + `rel="noopener noreferrer"`. Embora sejam do mesmo domínio, é boa prática incluir.

---

### 8. Iframe do Google Maps aceita third-party content
**Arquivo:** `UniversityDetail.tsx:346-364`  
O iframe do Google Maps não tem atributo `sandbox`. Adicione:
```html
sandbox="allow-scripts allow-same-origin"
```

---

### 9. Formulário de email sem validação (mailto:)
**Arquivo:** `UniversityDetail.tsx:428`
```tsx
<a href={`mailto:${university.email}`}>
```
Se `university.email` contiver conteúdo malicioso do banco de dados, pode ser explorado.

---

### 10. Console.log em produção
**Arquivos:** Múltiplos (`FeaturedUniversities.tsx:108-110`, `Header.tsx:13`, `UniversityCatalog.tsx:164`, etc.)

Console logs expõem detalhes internos do sistema no browser do usuário. Remova ou use um logger condicional.

---

### 11. Falta de tratamento de erro amigável
**Arquivo:** `supabase.ts:7`

Se as variáveis de ambiente não estiverem definidas, o `createClient` fará crash silencioso:
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;      // pode ser undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;  // pode ser undefined
export const supabase = createClient(supabaseUrl, supabaseAnonKey); // crash
```

**✅ Correção:**
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## 🟡 PROBLEMAS DE ESCALABILIDADE

### 12. Todos os dados carregados no cliente (sem paginação server-side)
**Arquivo:** `UniversityCatalog.tsx:157-188`

O catálogo busca TODAS as instituições do Supabase de uma vez e filtra/pagina no frontend. Com centenas ou milhares de registros, isso:
- Aumenta o tempo de carregamento inicial
- Consome memória do navegador
- Desperdiça largura de banda

**✅ Correção:** Implementar paginação server-side:
```typescript
const { data, error, count } = await supabase
  .from('Instituicoes')
  .select('id, name, cidade, estado, tipo, logo, ranking', { count: 'exact' })
  .ilike('name', `%${searchTerm}%`)  // filtro no servidor
  .eq('estado', selectedState)        // se houver
  .range(from, to)                    // paginação
  .order('name');
```

---

### 13. Chamadas duplicadas à API do IBGE sem cache
**Arquivo:** `UniversityCatalog.tsx:117-153`

A cada montagem do componente, faz-se 1 fetch para estados + 1 para cidades. Os dados do IBGE raramente mudam.

**✅ Correção:** Utilize cache (React Query / TanStack Query) ou salve em localStorage com TTL de 24h.

---

### 14. UniversityDetail busca TODOS os registros para encontrar um
**Arquivo:** `UniversityDetail.tsx:57-60`

```typescript
const { data: universities, error } = await supabase
  .from('Instituicoes')
  .select('*');  // busca TUDO para depois filtrar client-side
```

Isso é O(n) desnecessário. Se houver 1000 universidades, transfere 1000 registros inteiros para encontrar 1.

**✅ Correção:** Adicione uma coluna `slug` na tabela e busque diretamente:
```typescript
const { data, error } = await supabase
  .from('Instituicoes')
  .select('*')
  .eq('slug', slug)
  .single();
```

---

### 15. Sem Error Boundaries React
Se qualquer componente crashar, a aplicação inteira fica em branco. Implemente Error Boundaries.

---

### 16. Sem rate limiting na API Supabase
Qualquer pessoa pode fazer milhares de requests à sua API do Supabase. Configure rate limiting no Supabase Dashboard → API Settings.

---

### 17. Bundle sem code splitting adequado
**Arquivo:** `App.tsx`

Todos os componentes são importados estaticamente. Para melhorar o tempo de carregamento:
```typescript
const HomePage = React.lazy(() => import('./pages/HomePage'));
const CatalogRouter = React.lazy(() => import('./components/CatalogRouter'));
```

---

### 18. Imagens sem otimização
- Imagens de logos comerem de URLs externas sem CDN
- Fallback image usa URL de terceiros (brasilescola.uol.com.br) — se esse site cair, seu catálogo perde todas as imagens fallback
- Sem uso de `<picture>`, `srcset`, ou formatos WebP/AVIF

---

## 🟢 PROBLEMAS DE SEO / BOAS PRÁTICAS

### 19. URLs inconsistentes no sitemap vs. canonical
**Arquivos:** `generate-sitemap.js:19`, `index.html:36`, `robots.txt:4`, `HomePage.tsx:88`

```
generate-sitemap.js → BASE_URL = 'https://catalogo-mem-main.vercel.app'
index.html          → canonical = 'https://catalogo.melhoresescolasmedicas.com/'
robots.txt          → Sitemap: https://catalogomedicina.com.br/sitemap.xml
HomePage.tsx        → canonical = 'https://catalogo.melhoresescolasmedicas.com/'
```

**São 3 domínios diferentes!** Isso confunde os mecanismos de busca e prejudica severamente o SEO.

**✅ Correção:** Defina UM domínio canônico e use-o em TODOS os lugares:
```
const BASE_URL = 'https://catalogo.melhoresescolasmedicas.com';
```

---

### 20. Sitemap com data genérica (sempre "agora")
**Arquivo:** `generate-sitemap.js:49`
```javascript
const date = new Date().toISOString(); // Sempre a data do build
```
Todas as URLs terão o mesmo `<lastmod>`, reduzindo a utilidade do sitemap.

---

### 21. SPA sem Server-Side Rendering (SSR)
Como é uma SPA React, bots de mecanismo de busca podem ter dificuldade em indexar o conteúdo dinâmico. O `react-helmet-async` ajuda com meta tags, mas o conteúdo real (lista de universidades) não estará no HTML inicial.

**✅ Consideração:** Para SEO robusto, considere migrar para Next.js com SSG/ISR ou usar um serviço de pre-rendering.

---

### 22. Dados estáticos hardcoded em componentes
**Arquivo:** `UniversityDetail.tsx:528` — Datas do calendário de admissão (2024/2025) estão hardcoded e ficaram desatualizadas.

---

## 🔵 PROBLEMAS DE PERFORMANCE

### 23. Google Fonts bloqueia renderização
**Arquivo:** `index.html:56-60`
3 famílias de fontes são carregadas (Inter, Roboto, Open Sans) com múltiplos pesos. Somente Inter parece ser usada extensivamente.

**✅ Correção:**
1. Remova Roboto e Open Sans se não forem essenciais
2. Use `display=swap` (já está usando ✅)
3. Pre-conecte (já está usando ✅)

---

### 24. Scripts de terceiros carregados em sequência
**Arquivo:** `index.html:5-21`  
Clarity e GTM são carregados no `<head>` antes do CSS/conteúdo. Use `defer` ou mova para o final do `<body>`.

---

### 25. Papaparse ainda nas dependências
**Arquivo:** `package.json:19`  
`papaparse` e `@types/papaparse` ainda estão instalados mas não são mais usados (migração para Supabase). Remova para reduzir o bundle.

---

### 26. `lucide-react` excluído do optimizeDeps
**Arquivo:** `vite.config.ts:21`
```typescript
optimizeDeps: { exclude: ['lucide-react'] }
```
Isso pode causar re-bundling desnecessário. Teste remover essa exclusão.

---

### 27. Imagens de assets muito grandes
**Arquivo:** `src/assets/banner_mem.jpg` e outros  
Verifique se as imagens estão otimizadas (WebP/AVIF, compressão, dimensões adequadas).

---

## ✅ CHECKLIST PARA DEPLOY

### Antes do Deploy (OBRIGATÓRIO):
- [ ] **Revogar** o Cloudflare Tunnel Token exposto no `.env.example`
- [ ] **Verificar** RLS no Supabase (tabela `Instituicoes`)
- [ ] **Unificar** o domínio canônico em todos os arquivos
- [ ] **Atualizar** `generate-sitemap.js` com a BASE_URL correta
- [ ] **Atualizar** `robots.txt` com a URL correta do sitemap
- [ ] **Configurar** variáveis de ambiente no Vercel (não commitá-las)
- [ ] **Remover** console.logs de produção
- [ ] **Substituir** o WhatsApp placeholder
- [ ] **Adicionar** headers de segurança (CSP, X-Frame-Options, etc.)
- [ ] **Remover** papaparse das dependências

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
- [ ] Adicionar lazy loading com `React.lazy()` + `Suspense`
- [ ] Considerar Next.js para SSR/SSG (melhor SEO)
- [ ] Implementar cache de dados com TanStack Query
- [ ] Adicionar rate limiting no Supabase
- [ ] Configurar testes automatizados (unit + e2e)
- [ ] Implementar monitoramento de erros (Sentry)

---

*Relatório gerado por análise completa de todos os arquivos do projeto.*

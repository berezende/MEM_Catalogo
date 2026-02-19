# MEM Catálogo - Migração SSR com Vike

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrar o MEM Catálogo de SPA (client-side rendering) para SSR com Vike, permitindo que crawlers indexem corretamente todas as páginas.

**Architecture:** File-based routing com Vike substituindo React Router. Data fetching server-side via `+data.ts` files. Componentes existentes reutilizados com mínimas alterações. Hydration automático para interatividade.

**Tech Stack:** Vite + Vike + React + TypeScript + Supabase + Tailwind CSS

---

## Contexto do Problema

O app atual é SPA com renderização 100% client-side:
- HTML inicial: `<div id="root"></div>` (vazio)
- Crawlers não conseguem indexar conteúdo
- Meta tags injetadas via react-helmet-async (parcialmente funcional)

**Vike já está instalado** em `pages/+config.ts` com `ssr: true`, mas não utilizado (React Router ainda controla tudo).

---

## Task 1: Configurar Vike no Vite

**Files:**
- Modify: `vite.config.ts`
- Modify: `package.json`

**Step 1: Verificar dependências Vike instaladas**

Run: `npm ls vike vike-react vike-server`

Expected: Versões instaladas (vike@0.4.253, vike-react@0.5.13, vike-server@1.0.25)

**Step 2: Atualizar vite.config.ts com plugin Vike**

```typescript
import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';

export default defineConfig({
  plugins: [
    react(),
    vike()
  ],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  base: "/",
  server: {
    host: true,
    port: 5173,
  },
});
```

**Step 3: Atualizar scripts no package.json**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "npm run generate-sitemap && vite build",
    "preview": "vite preview",
    "server:dev": "tsx server/index.ts",
    "server:prod": "node dist/server/index.js",
    "generate-sitemap": "node scripts/generate-sitemap.js",
    "lint": "eslint ."
  }
}
```

**Step 4: Verificar que Vike inicia**

Run: `npm run dev`

Expected: Servidor inicia, logs do Vike aparecem

**Step 5: Commit**

```bash
git add vite.config.ts package.json
git commit -m "feat: integrate vike plugin into vite config"
```

---

## Task 2: Criar Layout Global e Estrutura Base

**Files:**
- Modify: `pages/+config.ts`
- Create: `pages/+Layout.tsx`
- Create: `pages/+Head.tsx`

**Step 1: Expandir pages/+config.ts**

```typescript
import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';

export default {
  extends: vikeReact,
  ssr: true,
  stream: true,
  passToClient: ['pageProps', 'routeParams'],
} satisfies Config;
```

**Step 2: Criar pages/+Layout.tsx**

```tsx
import '../src/index.css';
import React from 'react';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  const handleNavigateHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigateHome={handleNavigateHome} />
      {children}
      <Footer />
    </div>
  );
}
```

**Step 3: Criar pages/+Head.tsx para meta tags globais**

```tsx
import React from 'react';

export default function Head() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/png" href="/favicon.png" />
    </>
  );
}
```

**Step 4: Testar estrutura básica**

Run: `npm run dev`

Expected: Página carrega com Header e Footer visíveis

**Step 5: Commit**

```bash
git add pages/
git commit -m "feat: add vike layout and head components"
```

---

## Task 3: Migrar HomePage

**Files:**
- Create: `pages/index/+Page.tsx`
- Create: `pages/index/+data.ts`
- Create: `pages/index/+Head.tsx`
- Modify: `src/components/FeaturedUniversities.tsx` (adicionar prop initialData)

**Step 1: Criar pages/index/+data.ts (server-side fetch)**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function data() {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: featuredUniversities, error } = await supabase
    .from('Instituicoes')
    .select('id, name, cidade, estado, logo')
    .limit(9);

  if (error) {
    console.error('Error fetching featured universities:', error);
    return { featuredUniversities: [] };
  }

  return {
    featuredUniversities: featuredUniversities || []
  };
}
```

**Step 2: Criar pages/index/+Page.tsx**

```tsx
import React from 'react';
import { useData } from 'vike-react/useData';
import Hero from '../../src/components/Hero';
import FeaturedUniversities from '../../src/components/FeaturedUniversities';
import CategoriesSection from '../../src/components/CategoriesSection';
import NewsletterSection from '../../src/components/NewsletterSection';
import NewsSection from '../../src/components/NewsSection';
import { slugify } from '../../src/utils/urlHelpers';

export default function HomePage() {
  const { featuredUniversities } = useData<{ featuredUniversities: any[] }>();

  const handleUniversitySelect = (slug: string, state?: string, city?: string) => {
    if (state && city) {
      window.location.href = `/cursos/${slugify(state)}/${slugify(city)}/${slug}`;
    } else {
      window.location.href = `/cursos/${slug}`;
    }
  };

  const handleSearch = (filters: any) => {
    let url = '/cursos';
    if (filters.searchTerm) {
      url = `/cursos/q=${encodeURIComponent(filters.searchTerm)}`;
    } else if (filters.state) {
      url = `/cursos/${slugify(filters.state)}`;
      if (filters.city) url += `/${slugify(filters.city)}`;
    } else if (filters.type) {
      url = `/cursos/${filters.type.toLowerCase()}`;
    }
    window.location.href = url;
  };

  const handleCategorySelect = (category: string, type?: 'institution' | 'special') => {
    if (type === 'institution') {
      window.location.href = `/cursos/${slugify(category)}`;
    } else {
      window.location.href = '/cursos';
    }
  };

  return (
    <>
      <Hero onSearch={handleSearch} />
      <FeaturedUniversities
        onUniversitySelect={handleUniversitySelect}
        initialData={featuredUniversities}
      />
      <CategoriesSection onCategorySelect={handleCategorySelect} />
      <NewsletterSection />
      <NewsSection />
    </>
  );
}
```

**Step 3: Criar pages/index/+Head.tsx (SEO)**

```tsx
import React from 'react';

export function Head() {
  return (
    <>
      <title>MEM | Catálogo de Medicina</title>
      <meta
        name="description"
        content="O guia mais completo de cursos de medicina do Brasil. Compare universidades públicas e particulares, veja notas de corte, mensalidades, rankings e descubra a faculdade de medicina ideal para sua carreira."
      />
      <meta
        name="keywords"
        content="faculdade de medicina, curso de medicina, vestibular medicina, medicina no Brasil"
      />
      <link rel="canonical" href="https://guia.melhoresescolasmedicas.com/" />
      <meta property="og:title" content="MEM | Catálogo de Medicina" />
      <meta property="og:type" content="website" />
    </>
  );
}
```

**Step 4: Atualizar FeaturedUniversities para aceitar initialData**

Modify `src/components/FeaturedUniversities.tsx`:

```tsx
// Adicionar na interface de props:
interface FeaturedUniversitiesProps {
  onUniversitySelect: (slug: string, state?: string, city?: string) => void;
  initialData?: any[];  // NOVO
}

// No componente, usar initialData se fornecido:
const [universities, setUniversities] = useState<any[]>(initialData || []);

useEffect(() => {
  // Só buscar se não tiver initialData
  if (initialData && initialData.length > 0) return;

  // ... fetch existente
}, [initialData]);
```

**Step 5: Testar HomePage**

Run: `npm run dev`

Navigate to: `http://localhost:5173/`

Verify: View Page Source mostra conteúdo HTML completo

**Step 6: Commit**

```bash
git add pages/index/ src/components/FeaturedUniversities.tsx
git commit -m "feat: migrate homepage to vike with SSR data fetching"
```

---

## Task 4: Migrar CatalogPage (Listagem)

**Files:**
- Create: `pages/cursos/+Page.tsx`
- Create: `pages/cursos/+data.ts`
- Create: `pages/cursos/+Head.tsx`
- Create: `pages/cursos/+route.ts`
- Modify: `src/components/UniversityCatalog.tsx` (adicionar prop initialUniversities)

**Step 1: Criar pages/cursos/+route.ts (routing logic)**

```typescript
import type { RouteSync } from 'vike/types';

export const route: RouteSync = (pageContext) => {
  const { urlPathname } = pageContext;

  if (!urlPathname.startsWith('/cursos')) return false;

  const segments = urlPathname.replace(/^\/cursos\/?/, '').split('/').filter(Boolean);

  // Se 3 segmentos, é página de detalhe (state/city/slug)
  if (segments.length === 3) return false;

  // Extrair filtros da URL
  const routeParams: Record<string, string> = {};

  if (segments.length >= 1) {
    const first = segments[0];
    if (first === 'publica' || first === 'particular') {
      routeParams.type = first;
    } else if (first.startsWith('q=')) {
      routeParams.searchTerm = first.substring(2);
    } else {
      routeParams.state = first;
    }
  }

  if (segments.length >= 2) {
    routeParams.city = segments[1];
  }

  return { routeParams };
};
```

**Step 2: Criar pages/cursos/+data.ts**

```typescript
import { createClient } from '@supabase/supabase-js';
import type { PageContextServer } from 'vike/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function data(pageContext: PageContextServer) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { routeParams } = pageContext;

  const { data: universities, error } = await supabase
    .from('Instituicoes')
    .select('id, name, cidade, estado, tipo, logo, ranking');

  if (error) {
    console.error('Error fetching universities:', error);
    return { universities: [], filters: routeParams || {} };
  }

  return {
    universities: universities || [],
    filters: {
      state: routeParams?.state || '',
      city: routeParams?.city || '',
      type: routeParams?.type || '',
      searchTerm: routeParams?.searchTerm || ''
    }
  };
}
```

**Step 3: Criar pages/cursos/+Page.tsx**

```tsx
import React from 'react';
import { useData } from 'vike-react/useData';
import UniversityCatalog from '../../src/components/UniversityCatalog';
import { slugify } from '../../src/utils/urlHelpers';

interface PageData {
  universities: any[];
  filters: {
    state: string;
    city: string;
    type: string;
    searchTerm: string;
  };
}

export default function CatalogPage() {
  const { universities, filters } = useData<PageData>();

  const handleUniversitySelect = (
    slug: string,
    currentFilters: any,
    visibleCount?: number,
    state?: string,
    city?: string
  ) => {
    if (state && city) {
      window.location.href = `/cursos/${slugify(state)}/${slugify(city)}/${slug}`;
    } else {
      window.location.href = `/cursos/${slug}`;
    }
  };

  const handleFilterChange = (newFilters: any) => {
    let newPath = '/cursos';

    if (newFilters.searchTerm) {
      newPath = `/cursos/q=${encodeURIComponent(newFilters.searchTerm)}`;
    } else if (newFilters.state) {
      newPath = `/cursos/${slugify(newFilters.state)}`;
      if (newFilters.city) {
        newPath += `/${slugify(newFilters.city)}`;
      }
    } else if (newFilters.type) {
      const typeSlug = newFilters.type === 'Pública' ? 'publica' : 'particular';
      newPath = `/cursos/${typeSlug}`;
    }

    window.location.href = newPath;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <UniversityCatalog
        onUniversitySelect={handleUniversitySelect}
        onFilterChange={handleFilterChange}
        initialUniversities={universities}
        searchFilters={{
          searchTerm: filters.searchTerm,
          state: filters.state,
          city: filters.city,
          type: filters.type,
          sortBy: 'name'
        }}
      />
    </div>
  );
}
```

**Step 4: Criar pages/cursos/+Head.tsx**

```tsx
import React from 'react';
import { useData } from 'vike-react/useData';

export function Head() {
  const { filters } = useData<{ filters: any }>();

  const buildTitle = () => {
    const parts = ['MEM | Catálogo de Medicina'];
    if (filters?.type) parts.push(filters.type === 'publica' ? 'Pública' : 'Particular');
    if (filters?.state) parts.push(`em ${filters.state}`);
    return parts.join(' ');
  };

  return (
    <>
      <title>{buildTitle()}</title>
      <meta name="description" content="Encontre cursos de medicina em todo o Brasil." />
    </>
  );
}
```

**Step 5: Atualizar UniversityCatalog para aceitar initialUniversities**

Modify `src/components/UniversityCatalog.tsx`:

```tsx
// Adicionar na interface de props:
interface UniversityCatalogProps {
  // ... props existentes
  initialUniversities?: any[];  // NOVO
}

// No componente:
const [universities, setUniversities] = useState<any[]>(initialUniversities || []);

useEffect(() => {
  // Só buscar se não tiver initialUniversities
  if (initialUniversities && initialUniversities.length > 0) return;

  // ... fetch existente do Supabase
}, [initialUniversities]);
```

**Step 6: Testar CatalogPage**

Run: `npm run dev`

Navigate to: `http://localhost:5173/cursos`

Verify: View Page Source mostra lista de universidades

**Step 7: Commit**

```bash
git add pages/cursos/ src/components/UniversityCatalog.tsx
git commit -m "feat: migrate catalog page to vike with server-side filtering"
```

---

## Task 5: Migrar UniversityDetail (Página Individual)

**Files:**
- Create: `pages/cursos/@state/@city/@slug/+Page.tsx`
- Create: `pages/cursos/@state/@city/@slug/+data.ts`
- Create: `pages/cursos/@state/@city/@slug/+Head.tsx`
- Create: `src/components/UniversityDetailView.tsx`

**Step 1: Criar pages/cursos/@state/@city/@slug/+data.ts**

```typescript
import { createClient } from '@supabase/supabase-js';
import type { PageContextServer } from 'vike/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const slugify = (text: string): string => {
  return text.toString().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
};

export async function data(pageContext: PageContextServer) {
  const { routeParams } = pageContext;
  const { state, city, slug } = routeParams as { state: string; city: string; slug: string };

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: universities, error } = await supabase
    .from('Instituicoes')
    .select('*');

  if (error) {
    console.error('Error fetching university:', error);
    return { university: null };
  }

  const university = universities?.find((u: any) => {
    const nameMatch = slugify(u.name) === slug;
    const stateMatch = slugify(u.estado) === state;
    const cityMatch = slugify(u.cidade) === city;
    return nameMatch && stateMatch && cityMatch;
  });

  if (!university) {
    return { university: null };
  }

  return {
    university: {
      id: university.id,
      name: university.name,
      city: university.cidade,
      state: university.estado,
      type: university.tipo,
      website: university.website,
      vacancies: university.Qt_Vagas_Autorizadas || 'Não informado',
      periodization: university.Tipo_de_Periodicidade || 'Semestral',
      description: university.descricao,
      mensalidade: university.mensalidade,
      campus_name: university.Nome_do_Campus || '',
      address: university.endereco || '',
      address_number: university.numero_endereco || '',
      neighborhood: university.bairro || '',
      image: university.logo || 'https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg',
      mec_rating: university.Valor_CC || '5',
      phone: university.telefone || 'Não Informado',
      creation_date: university.data_criacao ? new Date(university.data_criacao).getFullYear().toString() : 'Não informado',
      cpc: university.CPC || 'Não informado',
      ranking: university.ranking || 'Não informado'
    }
  };
}
```

**Step 2: Criar pages/cursos/@state/@city/@slug/+Head.tsx**

```tsx
import React from 'react';
import { useData } from 'vike-react/useData';

export function Head() {
  const { university } = useData<{ university: any }>();

  if (!university) {
    return <title>Universidade não encontrada | MEM</title>;
  }

  const title = `${university.name} - Medicina em ${university.city}, ${university.state} | MEM`;
  const description = `Curso de Medicina na ${university.name} em ${university.city}, ${university.state}. Instituição ${university.type}. Confira notas de corte, endereço e tudo sobre o curso.`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={`medicina ${university.city}, ${university.name}, faculdade medicina`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
    </>
  );
}
```

**Step 3: Criar src/components/UniversityDetailView.tsx**

Extrair a lógica de renderização de `UniversityDetail.tsx` para um componente que recebe `university` como prop:

```tsx
import React, { useState } from 'react';
// ... imports de ícones e assets existentes

interface UniversityDetailViewProps {
  university: {
    name: string;
    city: string;
    state: string;
    type: string;
    website: string;
    description: string;
    mensalidade: string;
    image: string;
    // ... outros campos
  };
  onBack: () => void;
}

const UniversityDetailView: React.FC<UniversityDetailViewProps> = ({ university, onBack }) => {
  // Copiar JSX de renderização do UniversityDetail.tsx
  // Remover toda lógica de fetch (useEffect, useState para loading, etc.)

  return (
    <div className="min-h-screen bg-white">
      {/* ... JSX existente usando university como prop */}
    </div>
  );
};

export default UniversityDetailView;
```

**Step 4: Criar pages/cursos/@state/@city/@slug/+Page.tsx**

```tsx
import React from 'react';
import { useData } from 'vike-react/useData';
import UniversityDetailView from '../../../../src/components/UniversityDetailView';

interface PageData {
  university: any | null;
}

export default function UniversityDetailPage() {
  const { university } = useData<PageData>();

  const handleBack = () => {
    window.history.back();
  };

  if (!university) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Universidade não encontrada</h2>
          <button onClick={handleBack} className="mt-4 text-blue-600">
            Voltar ao Catálogo
          </button>
        </div>
      </div>
    );
  }

  return <UniversityDetailView university={university} onBack={handleBack} />;
}
```

**Step 5: Testar página de detalhe**

Run: `npm run dev`

Navigate to: `http://localhost:5173/cursos/sao-paulo/sao-paulo/universidade-de-sao-paulo`

Verify: View Page Source mostra todos os dados da universidade

**Step 6: Commit**

```bash
git add pages/cursos/@state/@city/@slug/ src/components/UniversityDetailView.tsx
git commit -m "feat: migrate university detail page to vike with full SSR"
```

---

## Task 6: Criar Express Server para Produção

**Files:**
- Create: `server/index.ts`
- Modify: `package.json`

**Step 1: Criar server/index.ts**

```typescript
import express from 'express';
import compression from 'compression';
import { renderPage } from 'vike/server';
import { createServer as createViteServer } from 'vite';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

async function startServer() {
  const app = express();

  app.use(compression());

  if (isProduction) {
    const sirv = (await import('sirv')).default;
    app.use(sirv('dist/client', { extensions: [] }));
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  }

  app.get('*', async (req, res, next) => {
    const pageContextInit = { urlOriginal: req.originalUrl };
    const pageContext = await renderPage(pageContextInit);

    if (pageContext.errorWhileRendering) {
      console.error('SSR Error:', pageContext.errorWhileRendering);
    }

    const { httpResponse } = pageContext;
    if (!httpResponse) return next();

    const { body, statusCode, headers } = httpResponse;
    headers.forEach(([name, value]) => res.setHeader(name, value));
    res.status(statusCode).send(body);
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
```

**Step 2: Atualizar package.json**

```json
{
  "scripts": {
    "dev": "tsx server/index.ts",
    "build": "npm run generate-sitemap && vite build",
    "preview": "cross-env NODE_ENV=production tsx server/index.ts",
    "generate-sitemap": "node scripts/generate-sitemap.js",
    "lint": "eslint ."
  }
}
```

**Step 3: Testar servidor**

Run: `npm run dev`

Expected: Servidor Express inicia, SSR funciona

**Step 4: Testar build de produção**

Run: `npm run build && npm run preview`

Expected: Build completa, servidor funciona

**Step 5: Commit**

```bash
git add server/ package.json
git commit -m "feat: add express server for vike SSR"
```

---

## Task 7: Atualizar Docker para Node.js

**Files:**
- Modify: `Dockerfile`
- Modify: `docker-compose.yaml`

**Step 1: Atualizar Dockerfile**

```dockerfile
# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/package*.json ./

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/server/index.js"]
```

**Step 2: Atualizar docker-compose.yaml**

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
```

**Step 3: Testar Docker**

Run: `docker build -t mem-catalogo . && docker run -p 3000:3000 --env-file .env mem-catalogo`

Expected: Container inicia, app funciona

**Step 4: Commit**

```bash
git add Dockerfile docker-compose.yaml
git commit -m "feat: update docker for node.js SSR"
```

---

## Task 8: Limpeza de Código Legado

**Files:**
- Delete: `src/App.tsx`
- Delete: `src/main.tsx`
- Delete: `src/pages/HomePage.tsx`
- Delete: `src/pages/CatalogPage.tsx`
- Delete: `src/components/CatalogRouter.tsx`
- Delete: `src/components/SEO.tsx`
- Delete: `index.html`
- Delete: `nginx.conf`
- Modify: `package.json` (remover deps não usadas)

**Step 1: Remover dependências não utilizadas**

Run: `npm uninstall react-router-dom react-helmet-async`

**Step 2: Remover arquivos legados**

```bash
rm src/App.tsx src/main.tsx
rm src/pages/HomePage.tsx src/pages/CatalogPage.tsx
rm src/components/CatalogRouter.tsx src/components/SEO.tsx
rm index.html nginx.conf
```

**Step 3: Verificar que tudo funciona**

Run: `npm run dev`

Navigate through all pages

Expected: Todas as rotas funcionam

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove legacy SPA code"
```

---

## Task 9: Verificação SEO Final

**Step 1: Verificar HTML no servidor**

```bash
curl -s http://localhost:3000/ | grep '<title>'
curl -s http://localhost:3000/cursos | grep '<title>'
curl -s http://localhost:3000/cursos/sao-paulo/sao-paulo/usp | grep '<title>'
```

Expected: Títulos corretos

**Step 2: Verificar meta description**

```bash
curl -s http://localhost:3000/cursos/sao-paulo/sao-paulo/usp | grep 'meta name="description"'
```

Expected: Description com dados da universidade

**Step 3: Verificar conteúdo no HTML**

```bash
curl -s http://localhost:3000/cursos | grep -c "Medicina"
```

Expected: Número > 0

**Step 4: Tag de versão**

```bash
git tag v2.0.0-ssr
git push origin main --tags
```

---

## Resumo de Arquivos

### Criados:
- `pages/+Layout.tsx`
- `pages/+Head.tsx`
- `pages/index/+Page.tsx`
- `pages/index/+data.ts`
- `pages/index/+Head.tsx`
- `pages/cursos/+Page.tsx`
- `pages/cursos/+data.ts`
- `pages/cursos/+Head.tsx`
- `pages/cursos/+route.ts`
- `pages/cursos/@state/@city/@slug/+Page.tsx`
- `pages/cursos/@state/@city/@slug/+data.ts`
- `pages/cursos/@state/@city/@slug/+Head.tsx`
- `server/index.ts`
- `src/components/UniversityDetailView.tsx`

### Modificados:
- `vite.config.ts`
- `package.json`
- `pages/+config.ts`
- `src/components/FeaturedUniversities.tsx`
- `src/components/UniversityCatalog.tsx`
- `Dockerfile`
- `docker-compose.yaml`

### Deletados:
- `src/App.tsx`
- `src/main.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/CatalogPage.tsx`
- `src/components/CatalogRouter.tsx`
- `src/components/SEO.tsx`
- `index.html`
- `nginx.conf`

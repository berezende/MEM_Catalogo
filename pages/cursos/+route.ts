import type { PageContext } from 'vike/types';

// Route Function com precedência alta para ganhar sobre qualquer filesystem routing
export function route(pageContext: PageContext) {
    const { urlPathname } = pageContext;

    if (!urlPathname.startsWith('/cursos')) return false;

    const segments = urlPathname.replace(/^\/cursos\/?/, '').split('/').filter(Boolean);

    const firstIsType = segments.length > 0 && (segments[0] === 'publica' || segments[0] === 'particular');

    // Se 3 segmentos e NÃO começa com tipo → é página de detalhe (state/city/slug)
    if (segments.length === 3 && !firstIsType) return false;

    // Se 4+ segmentos não é uma rota de catálogo
    if (segments.length > 3) return false;

    // Extrair filtros da URL
    const routeParams: Record<string, string> = {};

    // Lê query string: /cursos?q=medicina
    // urlParsed.search é um Record<string, string> no Vike 0.4
    const search: Record<string, string> = (pageContext as any).urlParsed?.search ?? {};
    if (search['q']) routeParams.searchTerm = search['q'];
    if (search['type']) routeParams.type = search['type'];
    if (search['state']) routeParams.state = search['state'];
    if (search['city']) routeParams.city = search['city'];

    if (segments.length >= 1) {
        const first = segments[0];

        if (firstIsType) {
            // Ex: /cursos/publica → type
            // Ex: /cursos/publica/sergipe → type + state
            // Ex: /cursos/publica/sergipe/aracaju → type + state + city
            routeParams.type = first;
            if (segments.length >= 2) routeParams.state = segments[1];
            if (segments.length >= 3) routeParams.city = segments[2];

        } else {
            // Ex: /cursos/sergipe → state
            // Ex: /cursos/sergipe/aracaju → state + city
            routeParams.state = first;
            if (segments.length >= 2) routeParams.city = segments[1];
        }
    }

    // precedence: 10 wins over Filesystem Routing (precedence 3) and parameterized route strings (precedence 6)
    return { routeParams, precedence: 10 };
}


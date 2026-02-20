import type { PageContext } from 'vike/types';

// Route Function com precedência alta para ganhar sobre qualquer filesystem routing
export function route(pageContext: PageContext) {
    const { urlPathname } = pageContext;

    if (!urlPathname.startsWith('/cursos')) return false;

    const segments = urlPathname.replace(/^\/cursos\/?/, '').split('/').filter(Boolean);

    const firstIsType = segments.length > 0 && (segments[0] === 'publica' || segments[0] === 'particular');
    const firstIsSearch = segments.length > 0 && segments[0].startsWith('q=');

    // Se 3 segmentos e NÃO começa com tipo → é página de detalhe (state/city/slug)
    if (segments.length === 3 && !firstIsType) return false;

    // Se 4+ segmentos não é uma rota de catálogo
    if (segments.length > 3) return false;

    // Extrair filtros da URL
    const routeParams: Record<string, string> = {};

    if (segments.length >= 1) {
        const first = segments[0];

        if (firstIsType) {
            // Ex: /cursos/publica → type
            // Ex: /cursos/publica/sergipe → type + state
            // Ex: /cursos/publica/sergipe/aracaju → type + state + city
            routeParams.type = first;
            if (segments.length >= 2) routeParams.state = segments[1];
            if (segments.length >= 3) routeParams.city = segments[2];

        } else if (firstIsSearch) {
            // Ex: /cursos/q=medicina?type=publica&state=sergipe&city=aracaju
            routeParams.searchTerm = decodeURIComponent(first.substring(2));

            // Lê filtros adicionais dos query params
            const urlParsed = (pageContext as any).urlParsed;
            const qs = urlParsed?.searchOriginal ?? urlParsed?.search ?? '';
            const params = new URLSearchParams(qs.startsWith('?') ? qs.slice(1) : qs);
            if (params.get('type')) routeParams.type = params.get('type')!;
            if (params.get('state')) routeParams.state = params.get('state')!;
            if (params.get('city')) routeParams.city = params.get('city')!;

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

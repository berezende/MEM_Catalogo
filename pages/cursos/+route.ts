import type { PageContext } from 'vike/types';

// Route Function com precedência alta para ganhar sobre qualquer filesystem routing
export function route(pageContext: PageContext) {
    const { urlPathname } = pageContext;

    if (!urlPathname.startsWith('/cursos')) return false;

    const segments = urlPathname.replace(/^\/cursos\/?/, '').split('/').filter(Boolean);

    // Se 3 segmentos, é página de detalhe (state/city/slug) - deixa para outra rota
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

    // precedence: 10 wins over Filesystem Routing (precedence 3) and parameterized route strings (precedence 6)
    return { routeParams, precedence: 10 };
}

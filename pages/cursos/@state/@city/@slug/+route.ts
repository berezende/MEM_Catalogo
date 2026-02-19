import type { PageContext } from 'vike/types';

// Route Function para página de detalhe - requer exatamente 3 segmentos após /cursos/
export function route(pageContext: PageContext) {
    const { urlPathname } = pageContext;

    if (!urlPathname.startsWith('/cursos/')) return false;

    const segments = urlPathname.replace(/^\/cursos\//, '').split('/').filter(Boolean);

    // SOMENTE 3 segmentos: state/city/slug
    if (segments.length !== 3) return false;

    return {
        routeParams: {
            state: segments[0],
            city: segments[1],
            slug: segments[2]
        }
    };
}

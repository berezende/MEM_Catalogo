
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CatalogPage from '../pages/CatalogPage';

import UniversityDetail from './UniversityDetail';
import { isBrazilianState, getOriginalStateName, slugify } from '../utils/urlHelpers';

const CatalogRouter: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Parsing da URL
    // Remove o prefixo /instituicoes
    const path = location.pathname.replace(/^\/cursos\/?/, '');
    const segments = path.split('/').filter(Boolean).map(decodeURIComponent);
    const searchParams = new URLSearchParams(location.search);

    let view: 'catalog' | 'detail' = 'catalog';
    let filters = {
        searchTerm: '',
        state: '',
        city: '',
        type: ''
    };
    let detailSlug = '';

    // 1. Parse Path Segments (Priority Logic)
    if (segments.length === 0) {
        // /cursos -> List Catalog
    } else if (segments.length === 1) {
        const p1 = segments[0];
        const p1Lower = p1.toLowerCase();

        if (p1Lower === 'publica' || p1Lower === 'particular') {
            filters.type = p1Lower === 'publica' ? 'Pública' : 'Particular';
        } else if (p1Lower.startsWith('q=')) {
            filters.searchTerm = p1.substring(2);
        } else if (isBrazilianState(p1)) {
            filters.state = getOriginalStateName(p1) || p1;
        } else {
            // Fallback -> Detalhes
            view = 'detail';
            detailSlug = p1;
        }
    } else if (segments.length >= 2) {
        const p1 = segments[0];
        const p2 = segments[1];
        const p3 = segments[2];

        // Case 3 segments: /cursos/state/city/slug (Detail View)
        if (segments.length === 3) {
            view = 'detail';
            detailSlug = p3;
            // We could also pass state/city to detail if needed for better lookup
            // filters.state = p1; // slugified
            // filters.city = p2; // slugified
        }
        // Verifica filtro de cidade: /cursos/:estado/:cidade
        else if (isBrazilianState(p1)) {
            filters.state = getOriginalStateName(p1) || p1;
            filters.city = p2;
        } else {
            // Se não é estado, assume que o primeiro segmento é slug (spec fallback)
            view = 'detail';
            detailSlug = p1;
        }
    }

    // 2. Parse Query Params (Apply extra filters not in path)
    if (searchParams.get('type')) filters.type = searchParams.get('type') || '';
    if (searchParams.get('q')) filters.searchTerm = searchParams.get('q') || '';
    if (searchParams.get('state')) {
        const rawState = searchParams.get('state') || '';
        filters.state = getOriginalStateName(rawState) || rawState;
    }
    if (searchParams.get('city')) filters.city = searchParams.get('city') || '';


    // Get preserved state from location if available
    const preservedState = location.state?.fromCatalogState;

    // Use Memo to prevent unnecessary re-renders of child components
    const activeFilters = useMemo(() => filters, [
        filters.searchTerm,
        filters.state,
        filters.city,
        filters.type
    ]);

    const handleUniversitySelect = (slug: string, currentFilters: any, visibleCount?: number, state?: string, city?: string) => {
        const scrollY = window.scrollY;
        const catalogState = {
            filters: currentFilters,
            visibleCount,
            scrollY: scrollY,
            previousPath: location.pathname + location.search
        };

        if (state && city) {
            navigate(`/cursos/${slugify(state)}/${slugify(city)}/${slug}`, {
                state: { fromCatalogState: catalogState }
            });
        } else {
            navigate(`/cursos/${slug}`, {
                state: { fromCatalogState: catalogState }
            });
        }
    };

    const handleFilterChange = (newFilters: {
        searchTerm: string;
        state: string;
        city: string;
        type: string;
    }) => {
        // Construct Clean URL based on priority
        let newPath = '/cursos';
        const params = new URLSearchParams();

        if (newFilters.searchTerm) {
            newPath = `/cursos/q=${newFilters.searchTerm}`;
            // Add others as query params if needed
            if (newFilters.state) params.set('state', slugify(newFilters.state));
            if (newFilters.city) params.set('city', slugify(newFilters.city));
            if (newFilters.type) params.set('type', newFilters.type);

        } else if (newFilters.state) {
            newPath = `/cursos/${slugify(newFilters.state)}`;
            if (newFilters.city) {
                newPath += `/${slugify(newFilters.city)}`;
            }
            if (newFilters.type) params.set('type', newFilters.type);

        } else if (newFilters.type) {
            // Only Type is active
            const typeSlug = newFilters.type === 'Pública' ? 'publica' : 'particular';
            newPath = `/cursos/${typeSlug}`;

        } else {
            // No main filters
            newPath = '/cursos';
        }

        const queryString = params.toString();
        const finalUrl = queryString ? `${newPath}?${queryString}` : newPath;

        navigate(finalUrl);
    };

    if (view === 'detail') {
        const handleBack = () => {
            if (preservedState && preservedState.previousPath) {
                navigate(preservedState.previousPath, {
                    state: { fromCatalogState: preservedState }
                });
            } else {
                navigate('/cursos');
            }
        };

        return (
            <UniversityDetail
                slug={detailSlug}
                stateSlug={segments.length === 3 ? segments[0] : undefined}
                citySlug={segments.length === 3 ? segments[1] : undefined}
                onBack={handleBack}
                onNavigateHome={() => navigate('/')}
            />
        );
    }

    return (
        <CatalogPage
            onUniversitySelect={handleUniversitySelect}
            onNavigateToHome={() => navigate('/')}
            onFilterChange={handleFilterChange}
            initialSearchTerm={activeFilters.searchTerm}
            initialCategory={activeFilters.type}
            initialState={activeFilters.state}
            initialCity={activeFilters.city}
            initialVisibleCount={preservedState?.visibleCount}
            initialScrollPosition={preservedState?.scrollY}
        />
    );
};

export default CatalogRouter;

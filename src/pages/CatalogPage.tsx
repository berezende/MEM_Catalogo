import React from 'react';
import UniversityCatalog from '../components/UniversityCatalog';
import SEO from '../components/SEO';

interface CatalogPageProps {
  onUniversitySelect: (slug: string, currentFilters: {
    searchTerm: string;
    state: string;
    city: string;
    type: string;
  }, visibleCount?: number, state?: string, city?: string) => void;
  onFilterChange?: (filters: {
    searchTerm: string;
    state: string;
    city: string;
    type: string;
  }) => void;
  onNavigateToHome: () => void;
  initialSearchTerm?: string;
  initialCategory?: string;
  initialState?: string;
  initialCity?: string;
  initialVisibleCount?: number;
  initialScrollPosition?: number;
}

const CatalogPage: React.FC<CatalogPageProps> = ({
  onUniversitySelect,
  onFilterChange,
  onNavigateToHome,
  initialSearchTerm,
  initialCategory,
  initialState,
  initialCity,
  initialVisibleCount,
  initialScrollPosition
}) => {
  const searchFilters = React.useMemo(() => {
    return (initialSearchTerm || initialCategory || initialState || initialCity) ? {
      searchTerm: initialSearchTerm || '',
      state: initialState || '',
      city: initialCity || '',
      type: initialCategory || '',
      sortBy: 'name'
    } : undefined;
  }, [initialSearchTerm, initialCategory, initialState, initialCity]);

  const metaTitle = `MEM | Catálogo de Medicina${searchFilters?.state ? ` em ${searchFilters.city}, ${searchFilters.state}` : ''}${searchFilters?.city ? ` - ${searchFilters.city}` : ''}`;
  const metaDescription = `Confira a lista completa de Cursos de Medicina${searchFilters?.state ? ` em ${searchFilters.city}, ${searchFilters.state}` : ' no Brasil'}${searchFilters?.city ? `, ${searchFilters.city}` : ''}. Encontre a melhor opção para sua carreira médica.`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEO title={metaTitle} description={metaDescription} type="website" />
      {/* Header do Catálogo - Redesenhado */}


      {/* Catálogo com Filtros */}
      <UniversityCatalog
        onUniversitySelect={onUniversitySelect}
        onFilterChange={onFilterChange}
        searchFilters={searchFilters}
        initialVisibleCount={initialVisibleCount}
        initialScrollPosition={initialScrollPosition}
      />
    </div>
  );
};

export default CatalogPage;


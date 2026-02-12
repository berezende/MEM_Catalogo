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
  const searchFilters = React.useMemo(() => ({
    searchTerm: initialSearchTerm || '',
    state: initialState || '',
    city: initialCity || '',
    type: initialCategory || '',
    sortBy: 'name'
  }), [initialSearchTerm, initialCategory, initialState, initialCity]);

  // --- Meta title dinâmico ---
  const buildMetaTitle = () => {
    const parts: string[] = ['MEM | Catálogo de Medicina'];
    if (searchFilters.type) {
      parts.push(searchFilters.type === 'publica' || searchFilters.type === 'Pública' ? 'Pública' : 'Particular');
    }
    if (searchFilters.state && searchFilters.city) {
      parts.push(`em ${searchFilters.city}, ${searchFilters.state}`);
    } else if (searchFilters.state) {
      parts.push(`em ${searchFilters.state}`);
    }
    if (searchFilters.searchTerm) {
      parts[0] = `${searchFilters.searchTerm} - Cursos de Medicina`;
    }
    return parts.join(' ');
  };

  // --- Meta description dinâmica ---
  const buildMetaDescription = () => {
    let locationText = 'no Brasil';
    if (searchFilters.state && searchFilters.city) {
      locationText = `em ${searchFilters.city}, ${searchFilters.state}`;
    } else if (searchFilters.state) {
      locationText = `no estado de ${searchFilters.state}`;
    } else if (searchFilters.city) {
      locationText = `em ${searchFilters.city}`;
    }

    const typeText = searchFilters.type
      ? ` em instituições ${searchFilters.type === 'publica' || searchFilters.type === 'Pública' ? 'públicas' : 'particulares'}`
      : '';

    const searchText = searchFilters.searchTerm
      ? ` Resultados para "${searchFilters.searchTerm}".`
      : '';

    return `Confira a lista completa de Cursos de Medicina ${locationText}${typeText}.${searchText} Compare notas, mensalidades e encontre a melhor opção para sua carreira médica.`;
  };

  // --- Keywords dinâmicas ---
  const buildKeywords = () => {
    const kw: string[] = ['medicina', 'faculdade de medicina', 'curso de medicina', 'vestibular medicina'];
    if (searchFilters.state) kw.push(`medicina ${searchFilters.state}`, `faculdade medicina ${searchFilters.state}`);
    if (searchFilters.city) kw.push(`medicina ${searchFilters.city}`, `faculdade medicina ${searchFilters.city}`);
    if (searchFilters.type) kw.push(`medicina ${searchFilters.type}`);
    if (searchFilters.searchTerm) kw.push(searchFilters.searchTerm);
    return kw.join(', ');
  };

  const metaTitle = buildMetaTitle();
  const metaDescription = buildMetaDescription();
  const metaKeywords = buildKeywords();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEO title={metaTitle} description={metaDescription} type="website" keywords={metaKeywords} />
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


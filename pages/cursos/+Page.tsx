import { useData } from 'vike-react/useData';
import UniversityCatalog from '@/components/UniversityCatalog';
import { slugify } from '@/utils/urlHelpers';


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
        _currentFilters: any,
        _visibleCount?: number,
        state?: string,
        city?: string
    ) => {
        if (state && city) {
            window.location.href = `/cursos/${slugify(state)}/${slugify(city)}/${slug}`;
        } else {
            window.location.href = `/cursos/${slug}`;
        }
    };

    // Filtros são aplicados localmente sem recarregar a página
    const handleFilterChange = (_newFilters: any) => {
        // Filtros gerenciados localmente no UniversityCatalog, sem navegação
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

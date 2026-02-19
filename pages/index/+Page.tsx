import { useData } from 'vike-react/useData';
import Hero from '@/components/Hero';
import FeaturedUniversities from '@/components/FeaturedUniversities';
import CategoriesSection from '@/components/CategoriesSection';
import NewsletterSection from '@/components/NewsletterSection';
import NewsSection from '@/components/NewsSection';
import { slugify } from '@/utils/urlHelpers';


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

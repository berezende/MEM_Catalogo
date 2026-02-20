import { useData } from 'vike-react/useData';
import Hero from '@/components/Hero';
import FeaturedUniversities from '@/components/FeaturedUniversities';
import CategoriesSection from '@/components/CategoriesSection';
import NewsletterSection from '@/components/NewsletterSection';
import NewsSection from '@/components/NewsSection';
import { slugify } from '@/utils/urlHelpers';
import doctorGroupImg from '@/assets/doctor-group1.png';


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
            url = `/cursos?q=${encodeURIComponent(filters.searchTerm)}`;
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

            {/* Seção Sobre a MEM */}
            <div className="font-sans py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-gray-100">
                        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-12">
                            {/* Conteúdo à esquerda */}
                            <div className="flex-1 animate-fade-in-up">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 sm:mb-8">
                                    Sobre a <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">MEM</span>
                                </h2>

                                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed text-gray-700">
                                    <p className="text-lg sm:text-xl">
                                        <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">O Portal Melhores Escolas Médicas</span> é a maior plataforma de comunicação dedicada à <span className="font-semibold text-blue-600">Educação, Saúde e Medicina</span>. Produzimos conteúdo gratuito, claro e confiável para ampliar o acesso à informação sobre faculdades de Medicina e apoiar estudantes em escolhas mais seguras ao longo do caminho.
                                    </p>

                                    <p className="text-lg sm:text-xl">
                                        Conectamos futuros médicos às principais informações sobre cursos de <span className="font-semibold text-blue-600">Medicina</span> no Brasil e acompanhamos toda a jornada acadêmica do vestibular à residência.
                                    </p>
                                </div>
                            </div>

                            {/* Imagem à direita */}
                            <div className="flex-1 relative group animate-fade-in-up animation-delay-200 w-full">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-all duration-500"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl transform -rotate-6 opacity-50 group-hover:opacity-70 transition-all duration-500"></div>
                                <img
                                    src={doctorGroupImg}
                                    alt="Equipe Melhores Escolas Médicas"
                                    className="relative w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NewsletterSection />
            <NewsSection />
        </>
    );
}

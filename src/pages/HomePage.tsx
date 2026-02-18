import React from 'react';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../utils/urlHelpers';
import Hero from '../components/Hero';
import FeaturedUniversities from '../components/FeaturedUniversities';
import CategoriesSection from '../components/CategoriesSection';
import NewsletterSection from '../components/NewsletterSection';
import NewsSection from '../components/NewsSection';

import SEO from '../components/SEO';
import doctorGroupImg from '../assets/doctor-group1.png';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleUniversitySelect = (slug: string, state?: string, city?: string) => {
    if (state && city) {
      navigate(`/cursos/${slugify(state)}/${slugify(city)}/${slug}`);
    } else {
      navigate(`/cursos/${slug}`);
    }
  };
  const handleSearch = (filters: {
    searchTerm: string;
    state: string;
    city: string;
    type: string;
    sortBy: string;
  }) => {
    let url = '/cursos';
    const params = new URLSearchParams();

    if (filters.searchTerm) {
      url = `/cursos/q=${encodeURIComponent(filters.searchTerm)}`;
    } else if (filters.state) {
      url = `/cursos/${slugify(filters.state)}`;
      if (filters.city) {
        url += `/${slugify(filters.city)}`;
      }
    } else if (filters.type) {
      url = `/cursos/${filters.type.toLowerCase()}`;
    }

    // Append extra params if needed or just navigate
    // For simplicity, just navigate to the constructed path.
    // If multiple filters, we might lose some?
    // Hero search usually sets one main criteria?
    // Hero has State/City/Search/Type inputs.
    // If user fills EVERYTHING?
    // We should fallback to Query logic if Path is taken?
    // But let's keep it simple: Search Term overrides all.

    // If not search term, try State.
    // If validation fails or mixed, we can use query params.
    if (filters.searchTerm) {
      if (filters.state) params.set('state', filters.state);
      if (filters.city) params.set('city', filters.city);
      if (filters.type) params.set('type', filters.type);
    }

    const queryString = params.toString();
    const finalUrl = queryString ? `${url}?${queryString}` : url;

    navigate(finalUrl);
  };

  const handleCategorySelect = (category: string, type?: 'institution' | 'special') => {
    if (type === 'institution') {
      // category is "Pública" or "Particular"
      navigate(`/cursos/${slugify(category)}`);
    } else {
      // Special categories like "FIES". Navigate to catalog maybe with query param?
      // Or just empty catalog for now.
      navigate('/cursos');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="MEM | Catálogo de Medicina"
        description="O guia mais completo de cursos de medicina do Brasil. Compare universidades públicas e particulares, veja notas de corte, mensalidades, rankings e descubra a faculdade de medicina ideal para sua carreira."
        type="website"
        keywords="faculdade de medicina, curso de medicina, vestibular medicina, medicina no Brasil, universidades de medicina, melhores escolas médicas, nota de corte medicina, ENEM medicina, SISU medicina"
        canonical="https://guia.melhoresescolasmedicas.com/"
      />
      <Hero onSearch={handleSearch} />
      <FeaturedUniversities onUniversitySelect={handleUniversitySelect} />
      <CategoriesSection
        onCategorySelect={handleCategorySelect}
      />

      {/* Seção Sobre a MEM */}
      <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
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

      {/* Seção de Newsletter */}
      <NewsletterSection />

      {/* Seção de Notícias */}
      <NewsSection />
    </div>
  );
};

export default HomePage;


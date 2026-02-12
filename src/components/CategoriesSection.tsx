import React from 'react';
import { Landmark, Building2 } from 'lucide-react';

interface CategoriesSectionProps {
  onCategorySelect: (category: string, type?: 'institution' | 'special') => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onCategorySelect
}) => {
  const categories = [
    {
      id: 'public',
      title: 'Pública',
      icon: Landmark,
      onClick: () => onCategorySelect('Pública', 'institution')
    },
    {
      id: 'private',
      title: 'Particular',
      icon: Building2,
      onClick: () => onCategorySelect('Particular', 'institution')
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título da Seção */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Explore por <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Categoria</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Selecione o tipo de instituição para encontrar o curso de medicina ideal para o seu futuro.
          </p>
        </div>

        {/* Grid de Categorias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                onClick={category.onClick}
                className="group relative bg-white rounded-3xl p-8 sm:p-10 cursor-pointer transition-all duration-300 hover:-translate-y-2 shadow-lg shadow-gray-200/80 hover:shadow-2xl hover:shadow-blue-500/20 border border-gray-300 hover:border-blue-500 flex flex-col items-center justify-center text-center overflow-hidden"
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Sheen Effect */}
                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 z-0" />

                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon Container with Modern Layers */}
                  <div className="mb-8 relative">
                    {/* Rotating Squares Background */}
                    <div className="absolute inset-0 bg-blue-100/50 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-indigo-100/50 rounded-2xl -rotate-6 group-hover:-rotate-12 transition-transform duration-500 delay-75" />

                    {/* Main Icon Box */}
                    <div className="relative w-20 h-20 bg-gradient-to-br from-white to-blue-50 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/5 border border-white group-hover:scale-110 transition-transform duration-300 group-hover:shadow-blue-500/20">
                      <Icon
                        className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                    {category.title}
                  </h3>

                  {/* Description/Action */}
                  <p className="text-gray-500 text-sm mb-6 group-hover:text-gray-600 transition-colors duration-300">
                    {category.id === 'public' ? 'Universidades Federais, Estaduais e Municipais' : 'Faculdades Particulares de Excelência'}
                  </p>

                  {/* Animated Action Button */}
                  <div className="flex items-center text-blue-600 font-semibold text-sm bg-blue-50 px-4 py-2 rounded-full transform scale-90 opacity-0 translate-y-4 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span>Ver lista completa</span>
                    <svg className="w-4 h-4 ml-1.5 -mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botão Explorar Todos os Cursos */}
        <div className="mt-16 text-center">
          <button
            onClick={() => onCategorySelect('', 'special')}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-700 hover:to-indigo-700 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Explorar Todas as Instituições
            <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { AnimatedText } from "@/components/ui/animated-text";

interface HeroProps {
  onSearch: (filters: {
    searchTerm: string;
    state: string;
    city: string;
    type: string;
    sortBy: string;
  }) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch({
      searchTerm,
      state: '',
      city: '',
      type: '',
      sortBy: 'name'
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Título Principal */}
          {/* Título Principal */}
          <div className="flex flex-col items-center justify-center mb-4 sm:mb-6 px-2">
            <div className="flex flex-wrap justify-center gap-x-2 sm:gap-x-4 items-baseline w-full">
              <AnimatedText
                text="Encontre seu"
                textClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900"
                underlineClassName="hidden"
                className="items-center"
                duration={0.05}
              />
              <AnimatedText
                text="Curso de Medicina"
                textClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                underlineGradient="from-blue-600 to-indigo-600"
                className="items-center"
                duration={0.05}
              />
            </div>
            <AnimatedText
              text="no Brasil"
              textClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900"
              underlineClassName="hidden"
              className="mt-2"
              duration={0.05}
            />
          </div>

          {/* Subtítulo */}
          <AnimatedText
            text="O guia mais completo de cursos de medicina do país."
            as="p"
            textClassName="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-light text-center"
            className="mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto px-4"
            underlineClassName="hidden"
            delay={2.0}
            duration={0.02}
          />

          {/* Barra de Pesquisa */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center bg-white rounded-2xl shadow-2xl p-2 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
              <div className="relative flex-1">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                <input
                  type="text"
                  placeholder="Digite o nome da universidade, estado ou cidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 md:py-5 text-gray-900 placeholder-gray-400 focus:outline-none rounded-xl text-sm sm:text-base md:text-lg"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

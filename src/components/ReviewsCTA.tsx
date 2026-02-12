import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface ReviewsCTAProps {
  onNavigateToCatalog: () => void;
}

const ReviewsCTA: React.FC<ReviewsCTAProps> = ({ onNavigateToCatalog }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Maria Silva",
      role: "Estudante, USP",
      rating: 5,
      comment: "Excelente plataforma! Encontrei todas as informações que precisava para escolher minha faculdade de medicina. O sistema de filtros facilitou muito minha busca."
    },
    {
      id: 2,
      name: "João Santos",
      role: "Estudante, UFRJ",
      rating: 5,
      comment: "Interface intuitiva e dados completos. Consegui comparar várias universidades facilmente e tomar a melhor decisão para meu futuro acadêmico."
    },
    {
      id: 3,
      name: "Ana Costa",
      role: "Estudante, UFMG",
      rating: 5,
      comment: "Muito útil! As informações detalhadas sobre cada universidade me ajudaram a tomar a melhor decisão. Recomendo para todos os futuros médicos."
    },
    {
      id: 4,
      name: "Pedro Oliveira",
      role: "Estudante, Unicamp",
      rating: 5,
      comment: "Plataforma incrível com informações precisas e atualizadas. Me ajudou muito no processo de escolha da universidade ideal para minha carreira."
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 3 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= reviews.length - 3 ? 0 : prev + 1));
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-md mb-4">
            Depoimentos
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Avaliações dos <span className="text-gray-900">Estudantes</span>
            </h2>
            
            {/* Navigation Arrows */}
            <div className="hidden md:flex gap-3">
              <button
                onClick={handlePrevious}
                className="p-3 rounded-full border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 group"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 group"
                aria-label="Próximo"
              >
                <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {visibleReviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-blue-600 text-blue-600" />
                ))}
              </div>
              
              {/* Comment */}
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                {review.comment}
              </p>
              
              {/* Author */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-gray-900 font-bold text-lg mb-1">{review.name}</h4>
                <p className="text-gray-500 text-sm">{review.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden justify-center gap-3 mb-12">
          <button
            onClick={handlePrevious}
            className="p-3 rounded-full border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300"
            aria-label="Próximo"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Pronto para encontrar sua universidade ideal?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de estudantes que já realizaram o sonho de estudar medicina
            </p>
            <button
              onClick={onNavigateToCatalog}
              className="bg-white text-blue-600 px-12 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 inline-flex items-center gap-3"
            >
              Explorar Universidades
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCTA;


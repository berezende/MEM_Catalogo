import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { slugify } from '../utils/urlHelpers';

interface FeaturedUniversitiesProps {
  onUniversitySelect: (slug: string, state?: string, city?: string) => void;
  initialData?: any[];
}

interface University {
  id: number;
  name: string;
  location: string;
  state: string;
  city: string;
  image: string;
}



const FeaturedUniversities: React.FC<FeaturedUniversitiesProps> = ({ onUniversitySelect, initialData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [_itemsPerView, setItemsPerView] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [featuredUniversities, setFeaturedUniversities] = useState<University[]>(() => {
    if (initialData && initialData.length > 0) {
      return initialData.map((row: any) => ({
        id: row.id,
        name: row.name,
        location: `${row.cidade}, ${row.estado}`,
        state: row.estado,
        city: row.cidade,
        image: row.logo || 'https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg'
      }));
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(!initialData || initialData.length === 0);

  // Trigger animação de entrada
  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Carrega as universidades da planilha
  useEffect(() => {
    // Só buscar se não tiver initialData
    if (initialData && initialData.length > 0) return;

    const fetchUniversities = async () => {
      try {
        const { data: universities, error } = await supabase
          .from('Instituicoes')
          .select('id, name, cidade, estado, logo');

        if (error) throw error;

        if (universities) {
          // Lista de universidades específicas para destaque (em MAIÚSCULAS como na planilha)
          const featuredUniversityNames = [
            'UNIVERSIDADE DE SÃO PAULO',
            'UNIVERSIDADE FEDERAL DO RIO DE JANEIRO',
            'UNIVERSIDADE FEDERAL DE MINAS GERAIS',
            'UNIVERSIDADE FEDERAL DE SERGIPE',
            'UNIVERSIDADE ESTADUAL DE CAMPINAS',
            'UNIVERSIDADE FEDERAL DO RIO GRANDE DO SUL',
            'UNIVERSIDADE ESTADUAL PAULISTA',
            'UNIVERSIDADE DE BRASÍLIA',
            'UNIVERSIDADE FEDERAL DE SANTA CATARINA'
          ];

          const allUniversities = universities.map((row: any) => ({
            id: row.id,
            name: row.name,
            location: `${row.cidade}, ${row.estado}`,
            state: row.estado,
            city: row.cidade,
            image: row.logo || 'https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg'
          }));

          // Filtra apenas as universidades em destaque (comparação exata)
          const featured = allUniversities.filter((uni: University) =>
            featuredUniversityNames.some(featuredName =>
              uni.name.toUpperCase() === featuredName
            )
          );

          // Remove duplicatas - mantém apenas uma ocorrência de cada universidade
          // Prioriza entradas com logos únicas (evita mostrar a mesma logo para universidades diferentes)
          const uniqueFeatured = featured.reduce((acc: University[], current: University) => {
            const isDuplicateName = acc.some(uni => uni.name.toUpperCase() === current.name.toUpperCase());

            if (!isDuplicateName) {
              // Verifica se já existe outra universidade com a mesma logo
              const hasLogoConflict = acc.some(uni =>
                uni.image === current.image &&
                uni.image !== 'https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg'
              );

              // Se houver conflito de logo, busca outra ocorrência desta universidade com logo diferente
              if (hasLogoConflict) {
                const alternativeEntry = featured.find(uni =>
                  uni.name.toUpperCase() === current.name.toUpperCase() &&
                  !acc.some(accUni => accUni.image === uni.image)
                );
                if (alternativeEntry) {
                  acc.push(alternativeEntry);
                } else {
                  acc.push(current); // Se não encontrar alternativa, usa a atual mesmo
                }
              } else {
                acc.push(current);
              }
            }
            return acc;
          }, []);

          setFeaturedUniversities(uniqueFeatured);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setIsLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Ajusta o número de itens visíveis baseado no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1280) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredUniversities.length - 1 : prevIndex - 1
    );
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredUniversities.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  // Handlers para drag/swipe
  const handleDragStart = (clientX: number) => {
    if (isTransitioning) return;
    setDragStart(clientX);
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number) => {
    if (dragStart === null || !isDragging) return;
    const diff = clientX - dragStart;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (dragStart === null) return;

    const threshold = 50; // Pixels necessários para trocar de slide

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
    }

    setDragStart(null);
    setDragOffset(0);
    setIsDragging(false);
  };

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const onMouseUp = () => {
    handleDragEnd();
  };

  const onMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  const getVisibleUniversities = () => {
    if (featuredUniversities.length === 0) return [];

    const visible = [];
    const sideCount = 2; // 2 cards de cada lado
    const totalVisible = sideCount * 2 + 1; // 2 esquerda + 1 centro + 2 direita = 5

    for (let i = 0; i < totalVisible; i++) {
      const offset = i - sideCount; // -2, -1, 0, 1, 2
      const index = (currentIndex + offset + featuredUniversities.length) % featuredUniversities.length;
      visible.push({ ...featuredUniversities[index], position: i });
    }
    return visible;
  };

  const visibleUniversities = getVisibleUniversities();

  // Mostra loading enquanto carrega os dados
  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 text-center title-animate">
            Cursos em <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Destaque</span>
          </h2>
          <div className="flex items-center justify-center gap-4 lg:gap-6 py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 text-lg">Carregando ...</p>
          </div>
        </div>
      </section>
    );
  }

  // Se não houver universidades carregadas
  if (featuredUniversities.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 text-center">
            Cursos em <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Destaque</span>
          </h2>
          <p className="text-center text-gray-600">Nenhuma instituição encontrada.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .card-container {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .card-float {
          animation: float 6s ease-in-out infinite;
        }

        .card-float:nth-child(2) {
          animation-delay: 0.5s;
        }

        .card-float:nth-child(3) {
          animation-delay: 1s;
        }

        .card-float:nth-child(4) {
          animation-delay: 1.5s;
        }

        .card-float:nth-child(5) {
          animation-delay: 2s;
        }

        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }

        .shimmer-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 1;
        }

        .shimmer-effect:hover::before {
          opacity: 1;
        }

        .title-animate {
          animation: scaleIn 0.6s ease-out;
        }

        .carousel-dragging {
          cursor: grabbing !important;
          user-select: none;
        }

        .carousel-draggable {
          cursor: grab;
          touch-action: pan-y;
        }

        .card-item:hover {
          /* Removed global hover effects to keep side cards blurred */
        }

        @keyframes buttonPulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(0.95);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .button-clicked {
          animation: buttonPulse 0.3s ease-out;
        }

        .drag-indicator {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          color: #6B7280;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .drag-indicator.active {
          opacity: 1;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 text-center title-animate">
          Cursos em <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Destaque</span>
        </h2>

        <div className="relative px-12 sm:px-16 lg:px-24">
          {/* Botão Anterior */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-2 sm:p-3 md:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:from-blue-700 hover:to-indigo-700 active:scale-95"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>

          {/* Botão Próximo */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-2 sm:p-3 md:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:from-blue-700 hover:to-indigo-700 active:scale-95"
            aria-label="Próximo"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>

          {/* Indicador de Arrasto */}
          <div className={`drag-indicator ${Math.abs(dragOffset) > 10 ? 'active' : ''}`}>
            {dragOffset > 10 ? '← Arraste para navegar' : dragOffset < -10 ? 'Arraste para navegar →' : ''}
          </div>

          {/* Carrossel */}
          <div
            className={`flex items-center justify-center gap-4 lg:gap-6 ${isDragging ? 'carousel-dragging' : 'carousel-draggable'}`}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              transform: `translateX(${dragOffset}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            }}
          >
            {visibleUniversities.map((university, idx) => {
              const centerIndex = 2; // Sempre o índice 2 (meio de 5 cards: 0,1,[2],3,4)
              const isCenter = idx === centerIndex;
              const isEdge = idx === 0 || idx === visibleUniversities.length - 1;

              return (
                <div
                  key={university.position}
                  className={`
                    flex-shrink-0 card-float card-item
                    ${isCenter ? 'cursor-pointer' : 'cursor-default'}
                    ${isEdge ? 'hidden lg:block' : ''}
                    ${isCenter ? 'z-10' : 'z-0'}
                    ${hasAnimated ? 'card-container' : 'opacity-0'}
                  `}
                  style={{
                    width: isCenter ? '340px' : '270px',
                    transform: `translateX(${(idx - 2) * 10}px) scale(${isCenter ? 1.05 : 0.9})`,
                    opacity: isCenter ? 1 : 0.4,
                    filter: isCenter ? 'blur(0px)' : 'blur(2px)',
                    transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                    willChange: 'transform, opacity, filter, width',
                    animationDelay: `${idx * 0.15}s`,
                    ['--card-offset' as any]: `${(idx - 2) * 10}px`,
                  }}
                  onClick={() => {
                    if (!isDragging && Math.abs(dragOffset) < 5 && isCenter) {
                      onUniversitySelect(slugify(university.name), university.state, university.city);
                    }
                  }}
                >
                  <div className={`bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-500 border border-gray-100 transform ${isCenter ? 'group shimmer-effect hover:shadow-2xl hover:border-blue-300 hover:-translate-y-3 hover:rotate-1' : ''}`}>
                    <div className="relative h-48 overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
                      <div
                        className="absolute inset-0 m-4 bg-center bg-no-repeat transform group-hover:scale-105 transition-all duration-700 ease-out"
                        style={{
                          backgroundImage: `url(${university.image})`,
                          backgroundSize: 'contain',
                          backgroundColor: '#FFFFFF',
                        }}
                        onError={(e: any) => {
                          e.currentTarget.style.backgroundImage = 'url(https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg)';
                        }}
                      />
                    </div>
                    <div className="border-t border-gray-200"></div>
                    <div className="p-5 relative z-20 bg-white">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-all duration-300 transform group-hover:translate-x-1">
                        {university.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                        <MapPin className="h-4 w-4 mr-1 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                        {university.location}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-10">
            {featuredUniversities.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsTransitioning(false), 700);
                  }
                }}
                className={`
                  h-2 rounded-full transition-all duration-500 ease-in-out transform
                  ${currentIndex === index
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 w-10 scale-110'
                    : 'bg-gray-300 w-2 hover:bg-gray-400 hover:scale-125'}
                `}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;


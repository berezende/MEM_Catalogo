import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

import { slugify } from '../utils/urlHelpers';

interface UniversityPhotosProps {
  universityId?: number;
  slug?: string;
  onBack: () => void;
}

interface University {
  id: number;
  name: string;
  city: string;
  state: string;
}



const UniversityPhotos: React.FC<UniversityPhotosProps> = ({ universityId, slug, onBack }) => {
  const [university, setUniversity] = useState<University | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 12;

  // Array de fotos da universidade
  const photos = [
    "https://images.unsplash.com/photo-1562774053-701939374585?w=600",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600",
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600",
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600",
    "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=600",
    "https://images.unsplash.com/photo-1567168539593-59673ababaae?w=600",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600",
    "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=600"
  ];

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const { data: universities, error } = await supabase
          .from('Instituicoes')
          .select('*');

        if (error) throw error;

        if (universities) {
          const data: any[] = universities;
          let targetIndex = -1;
          if (universityId) {
            // Assuming IDs are 1-based and match DB, or we find by ID
            const foundId = data.findIndex(u => u.id === universityId);
            targetIndex = foundId;
          } else if (slug) {
            targetIndex = data.findIndex((u: any) => slugify(u.name) === slug);
          }

          const target = targetIndex >= 0 ? data[targetIndex] : null;

          if (target) {
            setUniversity({
              id: target.id,
              name: target.name,
              city: target.cidade,
              state: target.estado
            });
          }
        }
      } catch (error) {
        console.error('Erro ao buscar universidade:', error);
      }
    };

    fetchUniversity();
  }, [universityId, slug]);

  const totalPages = Math.ceil(photos.length / photosPerPage);
  const startIndex = (currentPage - 1) * photosPerPage;
  const currentPhotos = photos.slice(startIndex, startIndex + photosPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!university) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-semibold"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar aos Detalhes</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header da Galeria */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Galeria de Fotos</h1>
          <p className="text-gray-600 text-base sm:text-lg mb-2">
            Explore nossa infraestrutura e instalações
          </p>
          <p className="text-sm text-gray-500">
            Exibindo {startIndex + 1} a {Math.min(startIndex + photosPerPage, photos.length)} de {photos.length} fotos
          </p>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {currentPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
              onClick={() => setSelectedPhoto(photo.replace('w=600', 'w=1200'))}
            >
              <img
                src={photo}
                alt={`Foto ${startIndex + index + 1} da ${university.name}`}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg className="w-12 h-12 text-white transform scale-0 group-hover:scale-100 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-semibold">Foto {startIndex + index + 1}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
            >
              « Anterior
            </button>

            <div className="flex gap-1 sm:gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${currentPage === page
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-110'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
            >
              Próxima »
            </button>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-6xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedPhoto}
              alt="Foto expandida"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityPhotos;


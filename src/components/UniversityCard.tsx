import React, { useState } from 'react';
import { MapPin, Star, Heart, Clock, Users, Award, School, ArrowRight, Sparkles } from 'lucide-react';
import { slugify } from '../utils/urlHelpers';

interface UniversityProps {
  id: number;
  name: string;
  location: string;
  type: string;
  image?: string;

  onViewDetails: (slug: string) => void;
}

const UniversityCard: React.FC<UniversityProps> = ({
  id,
  name,
  location,
  type,
  image,

  onViewDetails
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden group flex flex-col h-full border border-gray-100">
      {/* Imagem com Overlay */}
      <div className="relative h-56 overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
        <div
          className="absolute inset-0 m-4 bg-center bg-no-repeat transform group-hover:scale-105 transition-all duration-700 ease-out"
          style={{
            backgroundImage: `url(${image || 'https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg'})`,
            backgroundSize: 'contain',
            backgroundColor: '#FFFFFF',
          }}
          onError={(e: any) => {
            e.currentTarget.style.backgroundImage = 'url(https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg)';
          }}
        />

        {/* Tags Container */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
          {/* Tag Tipo */}
          <div className="inline-flex items-center gap-1.5 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            <School className="w-3.5 h-3.5" />
            {type}
          </div>


        </div>

        {/* Botão Favorito */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorited(!isFavorited);
          }}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg transform hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${isFavorited
              ? 'fill-red-500 text-red-500'
              : 'text-gray-600'
              }`}
          />
        </button>
      </div>

      {/* Divisória */}
      <div className="border-t border-gray-200"></div>

      {/* Conteúdo */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Título */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
          {name}
        </h3>

        {/* Localização */}
        <div className="flex items-center gap-2 text-gray-600 mb-6">
          <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span className="text-sm font-medium">{location}</span>
        </div>

        {/* Botão na parte inferior */}
        <div className="mt-auto">
          <button
            onClick={() => onViewDetails(slugify(name))}
            className="group/btn w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold shadow-md hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            Ver Detalhes
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniversityCard;
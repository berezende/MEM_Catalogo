import React from 'react';
import { Calendar, User } from 'lucide-react';

interface NewsArticle {
  id: number;
  image: string;
  tags: string[];
  title: string;
  excerpt: string;
  date: string;
  author: string;
  url: string;
}

const NewsSection: React.FC = () => {
  const articles: NewsArticle[] = [
    {
      id: 1,
      image: 'https://melhoresescolasmedicas.com/wp-content/uploads/2024/06/Avenidapaulista-1024x662-1-5.jpg',
      tags: ['Escolas Médicas', 'Medicina'],
      title: 'As 5 melhores faculdades de medicina particulares de São Paulo',
      excerpt: 'Dentre os estados brasileiros, São Paulo é o que possui o maior número populacional. Além disso, quando se trata de...',
      date: '12/06/2024',
      author: 'Jornalista Karla Thyale',
      url: 'https://melhoresescolasmedicas.com/as-5-melhores-faculdades-de-medicina-particulares-de-sao-paulo/'
    },
    {
      id: 2,
      image: 'https://melhoresescolasmedicas.com/wp-content/uploads/2022/07/transferencia-externa-para-medicina-scaled.jpg.webp',
      tags: ['Blog', 'Medicina no exterior'],
      title: 'Faculdades públicas que aceitam transferência externa para medicina',
      excerpt: 'Se você está por aqui, das duas uma: ou você já cursa medicina e está interessado em trocar de instituição,...',
      date: '25/02/2025',
      author: 'Melhores Escolas Médicas',
      url: 'https://melhoresescolasmedicas.com/faculdades-que-aceitam-transferencia-externa-em-medicina/'
    },
    {
      id: 3,
      image: 'https://melhoresescolasmedicas.com/wp-content/uploads/2024/08/Novo-Projeto.webp',
      tags: ['Escolas Médicas', 'Medicina'],
      title: 'Dez anos do Mais Médicos: 78% dos municípios sofrem com carência de profissionais',
      excerpt: 'Instituído em julho de 2013 pelo governo brasileiro, o Programa Mais Médicos surgiu como uma resposta emergencial à carência de...',
      date: '02/08/2024',
      author: 'Bruno Daniel',
      url: 'https://melhoresescolasmedicas.com/dez-anos-do-mais-medicos-78-dos-municipios-sofrem-com-carencia-de-profissionais/'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 px-2">
            Notícias mais <span className="text-blue-600">acessadas</span>
          </h2>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group block"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    <span className="truncate max-w-[150px]">{article.author}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Ver mais button */}
        <div className="text-center mt-12">
          <a 
            href="https://melhoresescolasmedicas.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Ver todas as notícias
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;


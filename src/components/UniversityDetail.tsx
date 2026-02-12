import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Users, Award, School, Phone, Mail, Calendar, GraduationCap, Globe, ExternalLink, Trophy, Banknote, HandCoins } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { slugify } from '../utils/urlHelpers';
import bannerMem from '../assets/banner_mem.jpg';
import SEO from './SEO';

interface UniversityDetailProps {
  universityId?: number;
  slug?: string;
  stateSlug?: string;
  citySlug?: string;
  onBack: () => void;
  onNavigateHome: () => void;

}

interface University {
  id: number;
  name: string;
  city: string;
  state: string;
  type: string;
  website: string;
  vacancies: string;
  periodization: string;
  process: string;
  description: string;
  mensalidade: string;
  students: string;
  campus_name: string;
  address: string;
  address_number: string;
  neighborhood: string;
  image: string;
  mec_rating: string;
  regional_bonus: string;
  phone?: string;
  email?: string;
  creation_date?: string;
  cpc?: string;
  ranking?: string;
}



const UniversityDetail: React.FC<UniversityDetailProps> = ({ universityId, slug, stateSlug, citySlug, onBack }) => {
  const [university, setUniversity] = useState<University | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activeTab] = useState<'visao-geral' | 'admissao' | 'localizacao'>('visao-geral');



  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const { data: universities, error } = await supabase
          .from('Instituicoes')
          .select('*');

        if (error) throw error;

        if (universities) {
          const data = universities;
          let targetIndex = -1;
          let target = null;

          if (universityId) {
            // If searching by ID, we can look it up directly or find it in the array
            const found = data.find((u: any) => u.id === universityId);
            if (found) {
              target = found;
              targetIndex = universityId; // Just for the logic below to pass
            }
          } else if (slug) {
            targetIndex = data.findIndex((u: any) => {
              const nameMatch = slugify(u.name) === slug;
              if (!stateSlug || !citySlug) return nameMatch;

              // If filtering by location as well (handling duplicate names)
              const stateMatch = slugify(u.estado) === stateSlug;
              const cityMatch = slugify(u.cidade) === citySlug;

              return nameMatch && stateMatch && cityMatch;
            });
            if (targetIndex >= 0) {
              target = data[targetIndex];
            }
          }

          if (target) {
            setUniversity({
              id: target.id,
              name: target.name,
              city: target.cidade,
              state: target.estado,
              type: target.tipo,
              website: target.website,
              vacancies: target.vacancies || 'Não informado',
              periodization: target.periodization || 'Semestral',
              process: target.process || 'Vestibular/ENEM',
              description: target.descricao,
              mensalidade: target.mensalidade,
              students: target.students || 'N/A',
              campus_name: target.campus_name || '',
              address: target.endereco || '',
              address_number: target.numero_endereco || '',
              neighborhood: target.bairro || '',
              image: target.logo || 'https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg',
              mec_rating: target.mec_rating || '5',
              regional_bonus: target.regional_bonus || 'Sim',
              phone: target.telefone || 'Não Informado',
              email: target.email || 'Não Informado',
              creation_date: target.data_criacao ? new Date(target.data_criacao).getFullYear().toString() : 'Não informado',
              cpc: target.CPC || 'Não informado',
              ranking: target.ranking || 'Não informado'
            });
          } else {
            setUniversity(null);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar universidade:', error);
        setUniversity(null);
        setIsLoading(false);
      }
    };

    fetchUniversity();
  }, [universityId, slug]);

  if (!isLoading && !university) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <School className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Universidade não encontrada</h2>
          <p className="text-gray-600 mb-6">Não foi possível encontrar as informações desta universidade.</p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Catálogo
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !university) return null;


  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${university.name} - ${university.city}, ${university.state}`}
        description={`Medicina na ${university.name} em ${university.city}, ${university.state}. Confira notas de corte, endereço e tudo sobre o curso.`}
        type="article"
      />
      {/* Header com breadcrumb */}


      {/* Hero Banner com Logo */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[400px]">
        {/* Botão de Voltar */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 inline-flex items-center gap-2 px-4 py-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40 group text-sm sm:text-base"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Voltar ao Catálogo</span>
        </button>

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bannerMem})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/10"></div>
        </div>
      </div>

      {/* Conteúdo Sobreposto (Card Principal) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-10 mb-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
          {/* Logo Container */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-xl shadow-lg p-2 flex-shrink-0 border border-gray-100 dark:border-gray-800 relative z-20">
            <img
              src={university.image}
              alt={`${university.name} Logo`}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = 'https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg';
              }}
            />
          </div>

          {/* Informações Principais */}
          <div className="flex-1 text-center lg:text-left w-full pt-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
              {university.name}
            </h1>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-2 text-gray-600 justify-center lg:justify-start">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-sm sm:text-base">{university.city}, {university.state}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-2 justify-center lg:justify-start mt-6">
              <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-blue-100 text-blue-600">
                {university.type}
              </span>
              {university.ranking && university.ranking !== 'Não informado' && (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold bg-amber-100 text-amber-700">
                  <Trophy className="w-4 h-4" />
                  {university.ranking} no Ranking Oficial da Folha
                </span>
              )}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex-shrink-0 pt-4 lg:pt-0 lg:self-end">
            <a
              href={university.website.startsWith('http') ? university.website : `https://${university.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-bold shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
            >
              <span>Visitar Site</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>



      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Visão Geral Tab */}
        {activeTab === 'visao-geral' && (
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {/* Visão Geral e Informações Rápidas - Grid */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Visão Geral</h2>
              {/* Visão Geral - Texto Completo */}
              <div className="w-full mb-16">
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  {university.description}
                </p>
                <p className="text-gray-700 text-base leading-relaxed">
                </p>
              </div>

              {/* Fatos e Números - Cards Animados */}

            </div>

            {/* Seção Mensalidade */}
            {university.mensalidade && university.mensalidade.trim() !== '' && (
              <div className="mt-12 mb-20">
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Investimento e Bolsas</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {/* Card Valor */}
                  <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2">
                    {/* Background Icon Decoration */}
                    <div className="absolute -top-6 -right-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500">
                      <Banknote className="w-48 h-48 text-blue-600 transform rotate-12" />
                    </div>

                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-all duration-500 shadow-sm group-hover:shadow-blue-200 group-hover:rotate-6 group-hover:scale-110">
                        <Banknote className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-500" />
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">Valor da Mensalidade</h3>
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 mb-4">
                        <span className="text-sm text-gray-500 font-medium">A partir de</span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">{university.mensalidade}</span>
                      </div>

                      <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4 group-hover:border-blue-100 transition-colors duration-300">
                        O valor pode variar dependendo do campus e do ano de ingresso. Consulte o site oficial para informações mais detalhadas.
                      </p>
                    </div>
                  </div>

                  {/* Card Bolsas */}
                  <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2">
                    {/* Background Icon Decoration */}
                    <div className="absolute -top-6 -right-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500">
                      <HandCoins className="w-48 h-48 text-blue-600 transform -rotate-12" />
                    </div>

                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-all duration-500 shadow-sm group-hover:shadow-blue-200 group-hover:rotate-6 group-hover:scale-110">
                        <HandCoins className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-500" />
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">Bolsas e Financiamentos</h3>
                      <div className="min-h-[40px] mb-2 flex items-center">
                        <p className="text-gray-700 font-medium leading-snug">
                          Opções de <span className="text-blue-600 font-bold">ProUni</span>, <span className="text-blue-600 font-bold">FIES</span> e bolsas institucionais.
                        </p>
                      </div>

                      <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4 group-hover:border-blue-100 transition-colors duration-300">
                        Verifique as opções de Bolsas e Financiamentos disponíveis. Consulte o site oficial para informações mais detalhadas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Localização e Contato */}
            <div className="mt-32 sm:mt-48" style={{ marginTop: '70px' }}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Localização e Contato</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Mapa e Botão */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 h-64 sm:h-80 md:h-96 lg:h-[400px]">
                    <iframe
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        [
                          university.name,
                          university.address,
                          university.address_number,
                          university.neighborhood,
                          university.city,
                          university.state
                        ].filter(Boolean).join(', ')
                      )}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Mapa de localização - ${university.name}`}
                    />
                  </div>

                  {/* Botão Ver no Google Maps */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      [
                        university.name,
                        university.address,
                        university.address_number,
                        university.neighborhood,
                        university.city,
                        university.state
                      ].filter(Boolean).join(', ')
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-sm hover:shadow-md"
                  >
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Ver no Google Maps
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Entre em Contato */}
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 h-fit">
                  <div className="space-y-5">
                    {/* Endereço */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <MapPin className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900 mb-1">Endereço</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {university.address && university.neighborhood
                            ? `${university.address}, ${university.neighborhood} - ${university.city}, ${university.state}`
                            : `${university.city}, ${university.state}`
                          }
                        </p>
                      </div>
                    </div>

                    {/* Telefone */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <Phone className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900 mb-1">Telefone</h4>
                        <p className="text-gray-600 text-sm font-medium">{university.phone}</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <Mail className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900 mb-1">E-mail</h4>
                        <a href={`mailto:${university.email}`} className="text-gray-600 text-sm font-medium hover:text-blue-600 transition-colors">
                          {university.email}
                        </a>
                      </div>
                    </div>

                    {/* Site */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <Globe className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900 mb-1">Site</h4>
                        {university.website ? (
                          <a
                            href={university.website.startsWith('http') ? university.website : `https://${university.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium underline break-words block max-w-full"
                          >
                            {university.website}
                          </a>
                        ) : (
                          <span className="text-gray-600 text-sm font-medium">Não informado</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>              </div>
            </div>
          </div>
        )}

        {/* Admissão Tab */}
        {activeTab === 'admissao' && (
          <div className="space-y-16">
            {/* Título */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Processo de Admissão</h2>
            </div>

            {/* Cards de Informações de Admissão */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
              {/* Vestibular Tradicional */}
              <div className="group bg-white rounded-lg p-6 sm:p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200">
                <div className="flex justify-start mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">Vestibular Tradicional</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Prepare-se para a prova específica da universidade. Conheça o formato, matérias e cronograma.
                </p>
              </div>

              {/* ENEM/SISU */}
              <div className="group bg-white rounded-lg p-6 sm:p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200">
                <div className="flex justify-start mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <School className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">ENEM/SISU</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Utilize sua nota do Exame Nacional do Ensino Médio para concorrer a vagas em todo o país.
                </p>
              </div>

              {/* Transferência e Diploma */}
              <div className="group bg-white rounded-lg p-6 sm:p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200">
                <div className="flex justify-start mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">Transferência e Diploma</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Veja as regras e prazos para transferir seu curso ou ingressar como segunda graduação.
                </p>
              </div>
            </div>

            {/* Calendário e Datas Importantes */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-md mt-16 sm:mt-24">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Calendário e Datas Importantes</h3>

              <div className="space-y-6">
                {/* Abertura das Inscrições */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-base font-bold text-gray-900">Abertura das Inscrições</h4>
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">Próximo</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">15 de Agosto, 2024</p>
                    <p className="text-sm text-gray-700">
                      Início do período para se inscrever no vestibular e processos seletivos via ENEM/SISU.
                    </p>
                  </div>
                </div>

                {/* Data da Prova - 1ª Fase */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-gray-900 mb-1">Data da Prova - 1ª Fase</h4>
                    <p className="text-sm text-gray-500 mb-2">20 de Outubro, 2024</p>
                    <p className="text-sm text-gray-700">
                      Realização da primeira fase do vestibular tradicional, com questões de múltipla escolha.
                    </p>
                  </div>
                </div>

                {/* Divulgação de Resultados */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-gray-900 mb-1">Divulgação de Resultados</h4>
                    <p className="text-sm text-gray-500 mb-2">15 de Novembro, 2024</p>
                    <p className="text-sm text-gray-700">
                      Publicação da lista de aprovados na primeira chamada e abertura do período de matrículas.
                    </p>
                  </div>
                </div>

                {/* Início das Aulas */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-gray-900 mb-1">Início das Aulas</h4>
                    <p className="text-sm text-gray-500 mb-2">Fevereiro, 2025</p>
                    <p className="text-sm text-gray-700">
                      Começo do semestre letivo para os calouros de Medicina.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notas de Corte Section - Somente para Universidades Públicas */}
            {university.type === 'Pública' && (
              <div className="mt-24">
                <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notas de Corte</h2>

                  {/* Tabs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-sm shadow-md">
                      Ampla Concorrência
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">
                      Cotas Escola Pública
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">
                      Cotas Raciais
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors">
                      Cota para PCDs
                    </button>
                  </div>

                  {/* Chart */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 text-center mb-4">Evolução da Nota de Corte (SISU)</h3>

                    <div className="relative bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <svg className="w-full" viewBox="0 0 600 160" style={{ minHeight: '160px' }}>
                        {/* Grid Lines */}
                        <line x1="50" y1="25" x2="550" y2="25" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="50" y1="60" x2="550" y2="60" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="50" y1="95" x2="550" y2="95" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="50" y1="130" x2="550" y2="130" stroke="#e5e7eb" strokeWidth="1" />

                        {/* Y-axis labels */}
                        <text x="30" y="30" fill="#6b7280" fontSize="11" textAnchor="end">825</text>
                        <text x="30" y="65" fill="#6b7280" fontSize="11" textAnchor="end">820</text>
                        <text x="30" y="100" fill="#6b7280" fontSize="11" textAnchor="end">815</text>
                        <text x="30" y="135" fill="#6b7280" fontSize="11" textAnchor="end">810</text>

                        {/* X-axis labels */}
                        <text x="120" y="150" fill="#6b7280" fontSize="12" textAnchor="middle" fontWeight="500">2023</text>
                        <text x="300" y="150" fill="#6b7280" fontSize="12" textAnchor="middle" fontWeight="500">2024</text>
                        <text x="480" y="150" fill="#6b7280" fontSize="12" textAnchor="middle" fontWeight="500">2025</text>

                        {/* Line Path with gradient */}
                        <defs>
                          <linearGradient id="lineGradientAdmissao" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                          <linearGradient id="areaGradientAdmissao" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.05" />
                          </linearGradient>
                        </defs>

                        {/* Area under the line */}
                        <path
                          d="M 120 115 L 300 72 L 480 25 L 480 130 L 300 130 L 120 130 Z"
                          fill="url(#areaGradientAdmissao)"
                        />

                        {/* Main line */}
                        <path
                          d="M 120 115 L 300 72 L 480 25"
                          stroke="url(#lineGradientAdmissao)"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Data points */}
                        <circle cx="120" cy="115" r="4" fill="#2563eb" stroke="white" strokeWidth="2" />
                        <circle cx="300" cy="72" r="4" fill="#2563eb" stroke="white" strokeWidth="2" />
                        <circle cx="480" cy="25" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />

                        {/* Value labels */}
                        <text x="120" y="107" fill="#1f2937" fontSize="12" textAnchor="middle" fontWeight="bold">816</text>
                        <text x="300" y="64" fill="#1f2937" fontSize="12" textAnchor="middle" fontWeight="bold">820</text>
                        <text x="480" y="17" fill="#1f2937" fontSize="12" textAnchor="middle" fontWeight="bold">825</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bolsas e Financiamento - Somente para Universidades Particulares */}
            {university.type === 'Particular' && (
              <div className="mt-24 sm:mt-32" style={{ marginTop: '78px' }}>
                <div className="mb-8 sm:mb-10 md:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Bolsas e Financiamento</h2>
                  <p className="text-gray-600 text-base sm:text-lg">
                    Conheça as opções de apoio financeiro disponíveis para realizar seu sonho de estudar Medicina.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                  {/* Bolsa Mérito Acadêmico */}
                  <div className="group relative flex flex-col bg-white rounded-xl p-8 border-2 border-gray-200 hover:shadow-2xl hover:border-orange-400 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden hover:scale-105">
                    {/* Efeito de brilho animado */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>

                    <div className="relative mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:from-orange-600 group-hover:to-orange-700 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/50">
                        <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>

                    <div className="relative flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">Bolsa Mérito Acadêmico</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300 flex-1">
                        Bolsas parciais ou integrais para estudantes com excelente desempenho no processo seletivo.
                      </p>
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        Saiba Mais
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Prouni */}
                  <div className="group relative flex flex-col bg-white rounded-xl p-8 border-2 border-gray-200 hover:shadow-2xl hover:border-orange-400 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden hover:scale-105">
                    {/* Efeito de brilho animado */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>

                    <div className="relative mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:from-orange-600 group-hover:to-orange-700 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/50">
                        <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>

                    <div className="relative flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">Prouni</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300 flex-1">
                        Participe do Programa Universidade para Todos e utilize sua nota do ENEM para concorrer a bolsas.
                      </p>
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        Saiba Mais
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* FIES */}
                  <div className="group relative flex flex-col bg-white rounded-xl p-8 border-2 border-gray-200 hover:shadow-2xl hover:border-orange-400 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden hover:scale-105">
                    {/* Efeito de brilho animado */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>

                    <div className="relative mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:from-orange-600 group-hover:to-orange-700 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/50">
                        <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>

                    <div className="relative flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">FIES</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300 flex-1">
                        Financie seus estudos através do Fundo de Financiamento Estudantil do governo federal.
                      </p>
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        Saiba Mais
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}


      </div>

      {/* Photo Modal - Melhorado */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
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

export default UniversityDetail;
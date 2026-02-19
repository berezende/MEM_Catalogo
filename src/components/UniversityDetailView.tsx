import React, { useState } from 'react';
import { ArrowLeft, MapPin, Users, Award, School, Phone, Globe, ExternalLink, Trophy, Banknote, HandCoins } from 'lucide-react';
import bannerMem from '../assets/banner_mem.jpg';

interface UniversityDetailViewProps {
    university: {
        id: number;
        name: string;
        city: string;
        state: string;
        type: string;
        website: string;
        vacancies: string;
        periodization: string;
        description: string;
        mensalidade: string;
        campus_name: string;
        address: string;
        address_number: string;
        neighborhood: string;
        image: string;
        mec_rating: string;
        phone: string;
        creation_date: string;
        cpc: string;
        ranking: string;
    };
    onBack: () => void;
}

const UniversityDetailView: React.FC<UniversityDetailViewProps> = ({ university, onBack }) => {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
    const [activeTab] = useState<'visao-geral' | 'admissao' | 'localizacao'>('visao-geral');

    return (
        <div className="min-h-screen bg-white">
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
                                    {university.ranking} no RUF (Folha de SP)
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex-shrink-0 pt-4 lg:pt-0 lg:self-end">
                        <a
                            href={university.website && university.website.startsWith('http') ? university.website : `https://${university.website}`}
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
                            </div>
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
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Admissão Tab */}
                {activeTab === 'admissao' && (
                    <div className="space-y-16">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Processo de Admissão</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
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
                    </div>
                )}
            </div>

            {/* Photo Modal */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
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

export default UniversityDetailView;

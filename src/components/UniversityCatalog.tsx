import React, { useState, useEffect, useRef } from 'react';
import UniversityCard from './UniversityCard';
import { Search, MapPin, Filter, ChevronDown, X } from 'lucide-react';
import Papa from 'papaparse';
import { slugify } from '../utils/urlHelpers';

interface UniversityCatalogProps {
  onUniversitySelect: (slug: string, currentFilters: {
    searchTerm: string;
    state: string;
    city: string;
    type: string;
  }, visibleCount?: number, state?: string, city?: string) => void;
  onFilterChange?: (filters: {
    searchTerm: string;
    state: string;
    city: string;
    type: string;
  }) => void;
  searchFilters?: {
    searchTerm: string;
    state: string;
    city: string;
    type: string;
    sortBy: string;
  };
  initialVisibleCount?: number;
  initialScrollPosition?: number;
}

interface IBGEState {
  id: number;
  nome: string;
  sigla: string;
}

interface IBGECity {
  nome: string;
}

const UniversityCatalog: React.FC<UniversityCatalogProps> = ({
  onUniversitySelect,
  onFilterChange,
  searchFilters,
  initialVisibleCount = 6,
  initialScrollPosition = 0
}) => {
  const [viewType, setViewType] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [universities, setUniversities] = useState<any[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const isInitialMount = useRef(true);

  // Estados para os filtros na sidebar
  const [searchTerm, setSearchTerm] = useState(searchFilters?.searchTerm || '');
  const [selectedState, setSelectedState] = useState(searchFilters?.state || '');
  const [selectedCity, setSelectedCity] = useState(searchFilters?.city || '');
  const [selectedType, setSelectedType] = useState(searchFilters?.type || '');
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [stateIdMap, setStateIdMap] = useState<{ [nome: string]: number }>({});

  // Debounce ref for search
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const notifyFilterChange = (updates: Partial<typeof searchFilters>) => {
    if (onFilterChange) {
      onFilterChange({
        searchTerm,
        state: selectedState,
        city: selectedCity,
        type: selectedType,
        ...updates
      } as any);
    }
  };

  const CSV_URL = 'https://docs.google.com/spreadsheets/d/1m3bBtUxBAnZYhbgDpSaoyE_TuG8gLUXn9F-_ADTmNNk/export?format=csv';

  // Inicializa os filtros quando searchFilters é fornecido (exceto cidade)
  useEffect(() => {
    if (searchFilters) {
      if (searchFilters.searchTerm !== undefined) setSearchTerm(searchFilters.searchTerm);
      if (searchFilters.state !== undefined) setSelectedState(searchFilters.state);
      if (searchFilters.type !== undefined) setSelectedType(searchFilters.type);

      // Se a cidade vier vazia no filtro, limpa localmente
      // Caso tenha valor, deixamos o useEffect abaixo lidar (para resolver o nome real)
      if (searchFilters.city === '') {
        setSelectedCity('');
      }
    }
  }, [searchFilters]);

  // Atualiza a cidade quando temos a lista de cidades carregada
  useEffect(() => {
    if (searchFilters?.city && cities.length > 0) {
      const urlCity = searchFilters.city;
      // Tenta encontrar o nome real da cidade (caso venha slug da URL)
      const realCity = cities.find(c => c === urlCity || slugify(c) === urlCity);
      // Se encontrar, usa o nome real; senão, mantém o da URL
      const cityToSet = realCity || urlCity;

      // Só atualiza se for diferente para evitar loops desnecessários
      setSelectedCity(current => current !== cityToSet ? cityToSet : current);
    }
  }, [searchFilters, cities]);

  // Carrega os estados do IBGE
  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(res => res.json())
      .then((data: IBGEState[]) => {
        setStates(data.map(e => e.nome));
        const map: { [nome: string]: number } = {};
        data.forEach(e => {
          map[e.nome] = e.id;
        });
        setStateIdMap(map);
      });
  }, []);

  // Carrega as cidades ao mudar de estado
  useEffect(() => {
    if (!selectedState || !stateIdMap[selectedState]) {
      setCities([]);
      return;
    }

    const estadoId = stateIdMap[selectedState];

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
      .then(res => res.json())
      .then((data: IBGECity[]) => {
        const cityNames = data.map(e => e.nome);
        setCities(cityNames);

        // Se a cidade selecionada for um slug (da URL), tenta encontrar o nome real
        if (selectedCity && !cityNames.includes(selectedCity)) {
          const realName = cityNames.find(name => slugify(name) === selectedCity);
          if (realName) {
            setSelectedCity(realName);
          }
        }
      });
  }, [selectedState, stateIdMap]);

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch(CSV_URL);
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data.map((row: any, index: number) => ({
              id: index + 1,
              name: row.name,
              location: `${row.cidade}, ${row.estado}`,
              state: row.estado,
              city: row.cidade,
              type: row.tipo,
              image: row.logo || 'https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg',
              ranking: row.ranking
            }));
            setUniversities(parsedData);
          }
        });
      } catch (error) {
        console.error("Erro ao carregar dados da planilha:", error);
      }
    };

    fetchCSVData();
  }, []);

  useEffect(() => {
    let filtered = [...universities];

    // Aplica filtros locais da sidebar
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(uni =>
        uni.name.toLowerCase().includes(searchLower) ||
        uni.state.toLowerCase().includes(searchLower) ||
        uni.city.toLowerCase().includes(searchLower) ||
        uni.location.toLowerCase().includes(searchLower)
      );
    }
    if (selectedState) {
      filtered = filtered.filter(uni => uni.state === selectedState);
    }
    if (selectedCity) {
      filtered = filtered.filter(uni => uni.city === selectedCity || slugify(uni.city) === selectedCity);
    }
    if (selectedType) {
      filtered = filtered.filter(uni => uni.type === selectedType);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredUniversities(filtered);

    // Só reinicia a contagem se não for a primeira montagem
    // (ou seja, o usuário mudou filtros manualmente após o componente carregar)
    if (!isInitialMount.current) {
      setVisibleCount(6);
    }
  }, [universities, sortBy, searchTerm, selectedState, selectedCity, selectedType]);

  // Restaura a posição do scroll quando o componente é montado e há uma posição salva
  useEffect(() => {
    if (initialScrollPosition > 0 && filteredUniversities.length > 0 && isInitialMount.current) {
      // Usa setTimeout para garantir que o DOM foi completamente renderizado
      setTimeout(() => {
        window.scrollTo({
          top: initialScrollPosition,
          behavior: 'instant' as ScrollBehavior
        });
        isInitialMount.current = false;
      }, 100);
    } else if (filteredUniversities.length > 0 && isInitialMount.current) {
      // Marca como não sendo mais a primeira montagem
      isInitialMount.current = false;
    }
  }, [initialScrollPosition, filteredUniversities]);

  const visibleUniversities = filteredUniversities.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedState('');
    setSelectedCity('');
    setSelectedType('');
    if (onFilterChange) {
      onFilterChange({
        searchTerm: '',
        state: '',
        city: '',
        type: ''
      });
    }
  };



  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botão Filtros Mobile - Melhorado */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden mb-6 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
        >
          <Filter className="h-5 w-5" />
          {showMobileFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar com Filtros - Modernizada */}
          <aside className={`
            ${showMobileFilters ? 'block' : 'hidden'} 
            lg:block 
            w-full lg:w-80 
            flex-shrink-0
          `}>
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:sticky lg:top-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Filter className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Filtros</h2>
                </div>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Barra de Pesquisa */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Pesquisar
                </label>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="Nome, cidade, estado..."
                    value={searchTerm}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearchTerm(val);
                      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
                      searchTimeoutRef.current = setTimeout(() => {
                        notifyFilterChange({ searchTerm: val });
                      }, 500);
                    }}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm font-medium hover:border-gray-300"
                  />
                </div>
              </div>

              {/* Tipo de Instituição */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tipo de Instituição
                </label>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="type"
                      value=""
                      checked={selectedType === ''}
                      onChange={(e) => {
                        setSelectedType(e.target.value);
                        notifyFilterChange({ type: e.target.value });
                      }}
                      className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                    />
                    <span className="ml-3 text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Todas</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="type"
                      value="Pública"
                      checked={selectedType === 'Pública'}
                      onChange={(e) => {
                        setSelectedType(e.target.value);
                        notifyFilterChange({ type: e.target.value });
                      }}
                      className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                    />
                    <span className="ml-3 text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Pública</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="type"
                      value="Particular"
                      checked={selectedType === 'Particular'}
                      onChange={(e) => {
                        setSelectedType(e.target.value);
                        notifyFilterChange({ type: e.target.value });
                      }}
                      className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                    />
                    <span className="ml-3 text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Particular</span>
                  </label>
                </div>
              </div>

              {/* Estado */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Estado
                </label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedCity('');
                      notifyFilterChange({ state: e.target.value, city: '' });
                    }}
                    className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 appearance-none text-sm font-medium hover:border-gray-300 cursor-pointer"
                  >
                    <option value="">Todos os Estados</option>
                    {states.map((stateName) => (
                      <option key={stateName} value={stateName}>{stateName}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Cidade */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Cidade
                </label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      notifyFilterChange({ city: e.target.value });
                    }}
                    className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 appearance-none text-sm font-medium hover:border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedState}
                  >
                    <option value="">Todas as Cidades</option>
                    {cities.map((cityName) => (
                      <option key={cityName} value={cityName}>{cityName}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>



              {/* Botão Limpar Filtros */}
              <button
                onClick={handleClearFilters}
                className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow transform hover:scale-[1.02]"
              >
                Limpar Filtros
              </button>
            </div>
          </aside>

          {/* Área Principal */}
          <main className="flex-1">
            {/* Header com contador - Melhorado */}
            <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Resultados da busca</p>
                  <p className="text-2xl font-bold text-gray-900">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{filteredUniversities.length}</span>
                    <span className="text-gray-500 text-lg ml-2">Instituições Encontradas</span>
                  </p>
                </div>
                {filteredUniversities.length > 0 && (
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                      Ordenar por:
                    </label>
                    <div className="relative group">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="pl-4 pr-10 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 appearance-none text-sm font-medium hover:border-gray-300 cursor-pointer bg-white"
                      >
                        <option value="name">A-Z (Alfabética)</option>
                        <option value="name-desc">Z-A (Alfabética Inversa)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* University Grid */}
            {visibleUniversities.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {visibleUniversities.map((university) => (
                  <UniversityCard
                    key={university.id}
                    {...university}
                    onViewDetails={(slug) => onUniversitySelect(slug, {
                      searchTerm,
                      state: selectedState,
                      city: selectedCity,
                      type: selectedType
                    }, visibleCount, university.state, university.city)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Nenhuma instituição encontrada
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Não encontramos instituições com os filtros selecionados. Tente ajustar seus critérios de busca.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
                  >
                    <X className="w-5 h-5" />
                    Limpar Filtros
                  </button>
                </div>
              </div>
            )}

            {/* Load More Button - Melhorado */}
            {visibleCount < filteredUniversities.length && (
              <div className="text-center mt-10">
                <button
                  onClick={handleLoadMore}
                  className="group inline-flex items-center gap-3 bg-white text-blue-600 border-2 border-blue-600 px-10 py-4 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Carregar Mais Instituições
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  Mostrando {visibleCount} de {filteredUniversities.length} instituições
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default UniversityCatalog;

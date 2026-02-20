import { onRenderHtml } from "vike-react/__internal/integration/onRenderHtml";
import { jsxs, jsx } from "react/jsx-runtime";
import { useData } from "vike-react/useData";
import { useState, useRef, useEffect } from "react";
import { School, Heart, MapPin, ArrowRight, Filter, X, Search, ChevronDown } from "lucide-react";
import { s as slugify, g as getOriginalStateName, a as supabase } from "../chunks/chunk-iNVzkSn2.js";
import { createClient } from "@supabase/supabase-js";
import { i as import5 } from "../chunks/chunk-CQQYeZIn.js";
import { i as import7$1, a as import6 } from "../chunks/chunk-CkrktRxr.js";
import import7 from "vike-react/__internal/integration/Loading";
/* empty css                       */
/*! src/components/UniversityCard.tsx [vike:pluginModuleBanner] */
const UniversityCard = ({
  id,
  name,
  location,
  type,
  image,
  onViewDetails
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden group flex flex-col h-full border border-gray-100", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative h-56 overflow-hidden", style: { backgroundColor: "#FFFFFF" }, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 m-4 bg-center bg-no-repeat transform group-hover:scale-105 transition-all duration-700 ease-out",
          style: {
            backgroundImage: `url(${image || "https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg"})`,
            backgroundSize: "contain",
            backgroundColor: "#FFFFFF"
          },
          onError: (e) => {
            e.currentTarget.style.backgroundImage = "url(https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg)";
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 flex flex-col items-end gap-2", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1.5 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg", children: [
        /* @__PURE__ */ jsx(School, { className: "w-3.5 h-3.5" }),
        type
      ] }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: (e) => {
            e.stopPropagation();
            setIsFavorited(!isFavorited);
          },
          className: "absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg transform hover:scale-110",
          children: /* @__PURE__ */ jsx(
            Heart,
            {
              className: `w-5 h-5 transition-all duration-300 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200" }),
    /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col flex-grow", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight", children: name }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-gray-600 mb-6", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-blue-600 flex-shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: location })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => onViewDetails(slugify(name)),
          className: "group/btn w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold shadow-md hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2",
          children: [
            "Ver Detalhes",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" })
          ]
        }
      ) })
    ] })
  ] });
};
/*! src/components/UniversityCatalog.tsx [vike:pluginModuleBanner] */
function normalizeTypeSlug(type) {
  if (type === "publica") return "Pública";
  if (type === "particular") return "Particular";
  return type;
}
function parseUniversityRows(rows) {
  return rows.map((row, index) => ({
    _uid: `${row.id}-${index}`,
    id: row.id,
    name: row.name,
    location: `${row.cidade}, ${row.estado}`,
    state: row.estado,
    city: row.cidade,
    type: row.tipo,
    image: row.logo || "https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg",
    ranking: row.ranking
  }));
}
function computeInitialFiltered(universities, searchFilters) {
  if (!searchFilters) return [...universities];
  let filtered = [...universities];
  const term = searchFilters.searchTerm || "";
  const stateSlug = slugify(searchFilters.state || "");
  const citySlug = slugify(searchFilters.city || "");
  const type = normalizeTypeSlug(searchFilters.type || "");
  if (term) {
    const lower = term.toLowerCase();
    filtered = filtered.filter(
      (u) => u.name.toLowerCase().includes(lower) || u.state.toLowerCase().includes(lower) || u.city.toLowerCase().includes(lower) || u.location.toLowerCase().includes(lower)
    );
  }
  if (stateSlug) {
    filtered = filtered.filter((u) => slugify(u.state) === stateSlug);
  }
  if (citySlug) {
    filtered = filtered.filter((u) => slugify(u.city) === citySlug);
  }
  if (type) {
    filtered = filtered.filter((u) => u.type === type);
  }
  filtered.sort((a, b) => a.name.localeCompare(b.name));
  return filtered;
}
const UniversityCatalog = ({
  onUniversitySelect,
  onFilterChange,
  searchFilters,
  initialVisibleCount = 6,
  initialScrollPosition = 0,
  initialUniversities
}) => {
  const [sortBy, setSortBy] = useState("name");
  const [universities, setUniversities] = useState(
    initialUniversities ? parseUniversityRows(initialUniversities) : []
  );
  const [filteredUniversities, setFilteredUniversities] = useState(() => {
    const parsed = initialUniversities ? parseUniversityRows(initialUniversities) : [];
    return computeInitialFiltered(parsed, searchFilters);
  });
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const isInitialMount = useRef(true);
  const [searchTerm, setSearchTerm] = useState(searchFilters?.searchTerm || "");
  const [selectedState, setSelectedState] = useState(
    getOriginalStateName(searchFilters?.state || "") || searchFilters?.state || ""
  );
  const [selectedCity, setSelectedCity] = useState(searchFilters?.city || "");
  const [selectedType, setSelectedType] = useState(normalizeTypeSlug(searchFilters?.type || ""));
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stateIdMap, setStateIdMap] = useState({});
  const urlUpdateTimeoutRef = useRef(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchFilters?.searchTerm || "");
  const buildFilterUrl = (type, state, city, search) => {
    const typeSlug = type === "Pública" ? "publica" : type === "Particular" ? "particular" : "";
    const stateSlug = state ? slugify(state) : "";
    const citySlug = city ? slugify(city) : "";
    if (search) {
      const params = new URLSearchParams();
      params.set("q", search);
      if (typeSlug) params.set("type", typeSlug);
      if (stateSlug) params.set("state", stateSlug);
      if (citySlug) params.set("city", citySlug);
      return `/cursos?${params.toString()}`;
    }
    if (typeSlug) {
      let url = `/cursos/${typeSlug}`;
      if (stateSlug) url += `/${stateSlug}`;
      if (stateSlug && citySlug) url += `/${citySlug}`;
      return url;
    }
    if (stateSlug) {
      let url = `/cursos/${stateSlug}`;
      if (citySlug) url += `/${citySlug}`;
      return url;
    }
    return "/cursos";
  };
  const didInitRef = useRef(false);
  useEffect(() => {
    if (searchFilters && !didInitRef.current) {
      didInitRef.current = true;
      setSearchTerm(searchFilters.searchTerm || "");
      setSelectedState(getOriginalStateName(searchFilters.state || "") || searchFilters.state || "");
      setSelectedType(normalizeTypeSlug(searchFilters.type || ""));
      if (!searchFilters.city) {
        setSelectedCity("");
      }
    }
  }, [searchFilters]);
  useEffect(() => {
    if (searchFilters?.city && cities.length > 0) {
      const urlCity = searchFilters.city;
      const realCity = cities.find((c) => c === urlCity || slugify(c) === urlCity);
      const cityToSet = realCity || urlCity;
      setSelectedCity((current) => current !== cityToSet ? cityToSet : current);
    }
  }, [searchFilters, cities]);
  useEffect(() => {
    if (!didInitRef.current) return;
    if (urlUpdateTimeoutRef.current) clearTimeout(urlUpdateTimeoutRef.current);
    urlUpdateTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
  }, [searchTerm]);
  useEffect(() => {
    if (!didInitRef.current) return;
    const newUrl = buildFilterUrl(selectedType, selectedState, selectedCity, debouncedSearchTerm);
    const currentUrl = window.location.pathname + window.location.search;
    if (currentUrl !== newUrl) {
      history.pushState(null, "", newUrl);
    }
  }, [selectedType, selectedState, selectedCity, debouncedSearchTerm]);
  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome").then((res) => res.json()).then((data2) => {
      setStates(data2.map((e) => e.nome));
      const map = {};
      data2.forEach((e) => {
        map[e.nome] = e.id;
      });
      setStateIdMap(map);
    });
  }, []);
  useEffect(() => {
    if (!selectedState || !stateIdMap[selectedState]) {
      setCities([]);
      return;
    }
    const estadoId = stateIdMap[selectedState];
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`).then((res) => res.json()).then((data2) => {
      const cityNames = data2.map((e) => e.nome);
      setCities(cityNames);
      if (selectedCity && !cityNames.includes(selectedCity)) {
        const realName = cityNames.find((name) => slugify(name) === selectedCity);
        if (realName) {
          setSelectedCity(realName);
        }
      }
    });
  }, [selectedState, stateIdMap]);
  useEffect(() => {
    if (initialUniversities && initialUniversities.length > 0) return;
    const fetchSupabaseData = async () => {
      try {
        const { data: data2, error } = await supabase.from("Instituicoes").select("id, name, cidade, estado, tipo, logo, ranking");
        if (error) {
          console.error("Erro ao carregar dados do Supabase:", error);
          return;
        }
        if (data2) {
          const parsedData = data2.map((row, index) => ({
            _uid: `${row.id}-${index}`,
            id: row.id,
            name: row.name,
            location: `${row.cidade}, ${row.estado}`,
            state: row.estado,
            city: row.cidade,
            type: row.tipo,
            image: row.logo || "https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg",
            ranking: row.ranking
          }));
          setUniversities(parsedData);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do Supabase:", error);
      }
    };
    fetchSupabaseData();
  }, []);
  useEffect(() => {
    let filtered = [...universities];
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (uni) => uni.name.toLowerCase().includes(searchLower) || uni.state.toLowerCase().includes(searchLower) || uni.city.toLowerCase().includes(searchLower) || uni.location.toLowerCase().includes(searchLower)
      );
    }
    if (selectedState) {
      filtered = filtered.filter((uni) => uni.state === selectedState || slugify(uni.state) === slugify(selectedState));
    }
    if (selectedCity) {
      filtered = filtered.filter((uni) => uni.city === selectedCity || slugify(uni.city) === selectedCity);
    }
    if (selectedType) {
      filtered = filtered.filter((uni) => uni.type === selectedType);
    }
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
    setFilteredUniversities(filtered);
    if (!isInitialMount.current) {
      setVisibleCount(6);
    }
  }, [universities, sortBy, searchTerm, selectedState, selectedCity, selectedType]);
  useEffect(() => {
    if (initialScrollPosition > 0 && filteredUniversities.length > 0 && isInitialMount.current) {
      setTimeout(() => {
        window.scrollTo({
          top: initialScrollPosition,
          behavior: "instant"
        });
        isInitialMount.current = false;
      }, 100);
    } else if (filteredUniversities.length > 0 && isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, [initialScrollPosition, filteredUniversities]);
  const visibleUniversities = filteredUniversities.slice(0, visibleCount);
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };
  const handleClearFilters = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setSelectedState("");
    setSelectedCity("");
    setSelectedType("");
    if (onFilterChange) {
      onFilterChange({
        searchTerm: "",
        state: "",
        city: "",
        type: ""
      });
    }
  };
  return /* @__PURE__ */ jsx("section", { className: "py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setShowMobileFilters(!showMobileFilters),
        className: "lg:hidden mb-6 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105",
        children: [
          /* @__PURE__ */ jsx(Filter, { className: "h-5 w-5" }),
          showMobileFilters ? "Ocultar Filtros" : "Mostrar Filtros"
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
      /* @__PURE__ */ jsx("aside", { className: `
            ${showMobileFilters ? "block" : "hidden"} 
            lg:block 
            w-full lg:w-80 
            flex-shrink-0
          `, children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-xl p-6 lg:sticky lg:top-6 border border-gray-100", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center", children: /* @__PURE__ */ jsx(Filter, { className: "h-5 w-5 text-white" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent", children: "Filtros" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShowMobileFilters(false),
              className: "lg:hidden text-gray-400 hover:text-gray-600 transition-colors",
              children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3", children: "Pesquisar" }),
          /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Nome, cidade, estado...",
                value: searchTerm,
                onChange: (e) => {
                  const val = e.target.value;
                  setSearchTerm(val);
                },
                className: "w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm font-medium hover:border-gray-300"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3", children: "Tipo de Instituição" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer group", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  name: "type",
                  value: "",
                  checked: selectedType === "",
                  onChange: (e) => {
                    setSelectedType(e.target.value);
                  },
                  className: "w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "ml-3 text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors", children: "Todas" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer group", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  name: "type",
                  value: "Pública",
                  checked: selectedType === "Pública",
                  onChange: (e) => {
                    setSelectedType(e.target.value);
                  },
                  className: "w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "ml-3 text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors", children: "Pública" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer group", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  name: "type",
                  value: "Particular",
                  checked: selectedType === "Particular",
                  onChange: (e) => {
                    setSelectedType(e.target.value);
                  },
                  className: "w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "ml-3 text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors", children: "Particular" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3", children: "Estado" }),
          /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: selectedState,
                onChange: (e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity("");
                },
                className: "w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 appearance-none text-sm font-medium hover:border-gray-300 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Todos os Estados" }),
                  states.map((stateName) => /* @__PURE__ */ jsx("option", { value: stateName, children: stateName }, stateName))
                ]
              }
            ),
            /* @__PURE__ */ jsx(ChevronDown, { className: "absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-3", children: "Cidade" }),
          /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: selectedCity,
                onChange: (e) => {
                  setSelectedCity(e.target.value);
                },
                className: "w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 appearance-none text-sm font-medium hover:border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                disabled: !selectedState,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Todas as Cidades" }),
                  cities.map((cityName) => /* @__PURE__ */ jsx("option", { value: cityName, children: cityName }, cityName))
                ]
              }
            ),
            /* @__PURE__ */ jsx(ChevronDown, { className: "absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleClearFilters,
            className: "w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow transform hover:scale-[1.02]",
            children: "Limpar Filtros"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("main", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-1", children: "Resultados da busca" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [
              /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: filteredUniversities.length }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-lg ml-2", children: "Instituições Encontradas" })
            ] })
          ] }),
          filteredUniversities.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-semibold text-gray-700 whitespace-nowrap", children: "Ordenar por:" }),
            /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: sortBy,
                  onChange: (e) => setSortBy(e.target.value),
                  className: "pl-4 pr-10 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 appearance-none text-sm font-medium hover:border-gray-300 cursor-pointer bg-white",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "name", children: "A-Z (Alfabética)" }),
                    /* @__PURE__ */ jsx("option", { value: "name-desc", children: "Z-A (Alfabética Inversa)" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(ChevronDown, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" })
            ] })
          ] })
        ] }) }),
        visibleUniversities.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3", children: visibleUniversities.map((university) => /* @__PURE__ */ jsx(
          UniversityCard,
          {
            ...university,
            onViewDetails: (slug) => onUniversitySelect(slug, {
              searchTerm,
              state: selectedState,
              city: selectedCity,
              type: selectedType
            }, visibleCount, university.state, university.city)
          },
          university._uid
        )) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(Search, { className: "w-10 h-10 text-blue-600" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-3", children: "Nenhuma instituição encontrada" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "Não encontramos instituições com os filtros selecionados. Tente ajustar seus critérios de busca." }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleClearFilters,
              className: "inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105",
              children: [
                /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }),
                "Limpar Filtros"
              ]
            }
          )
        ] }) }),
        visibleCount < filteredUniversities.length && /* @__PURE__ */ jsxs("div", { className: "text-center mt-10", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleLoadMore,
              className: "group inline-flex items-center gap-3 bg-white text-blue-600 border-2 border-blue-600 px-10 py-4 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105",
              children: [
                "Carregar Mais Instituições",
                /* @__PURE__ */ jsx(ChevronDown, { className: "w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mt-4", children: [
            "Mostrando ",
            visibleCount,
            " de ",
            filteredUniversities.length,
            " instituições"
          ] })
        ] })
      ] })
    ] })
  ] }) });
};
/*! pages/cursos/+Page.tsx [vike:pluginModuleBanner] */
function CatalogPage() {
  const { universities, filters } = useData();
  const handleUniversitySelect = (slug, _currentFilters, _visibleCount, state, city) => {
    if (state && city) {
      window.location.href = `/cursos/${slugify(state)}/${slugify(city)}/${slug}`;
    } else {
      window.location.href = `/cursos/${slug}`;
    }
  };
  const handleFilterChange = (_newFilters) => {
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-b from-gray-50 to-white", children: /* @__PURE__ */ jsx(
    UniversityCatalog,
    {
      onUniversitySelect: handleUniversitySelect,
      onFilterChange: handleFilterChange,
      initialUniversities: universities,
      searchFilters: {
        searchTerm: filters.searchTerm,
        state: filters.state,
        city: filters.city,
        type: filters.type,
        sortBy: "name"
      }
    }
  ) });
}
const import2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CatalogPage
}, Symbol.toStringTag, { value: "Module" }));
/*! pages/cursos/+data.ts [vike:pluginModuleBanner] */
const supabaseUrl = "https://vidduudezriknkhsfzjq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZGR1dWRlenJpa25raHNmempxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTE0NjcsImV4cCI6MjA4NjM4NzQ2N30.rBm7v3yB5q1w8D6O9QxwVlLI8nZrtx7wx68AqTFLDkk";
async function data(pageContext) {
  const supabase2 = createClient(supabaseUrl, supabaseKey);
  const { routeParams } = pageContext;
  const { data: universities, error } = await supabase2.from("Instituicoes").select("id, name, cidade, estado, tipo, logo, ranking");
  if (error) {
    console.error("Error fetching universities:", error);
    return { universities: [], filters: routeParams || {} };
  }
  return {
    universities: universities || [],
    filters: {
      state: routeParams?.state || "",
      city: routeParams?.city || "",
      type: routeParams?.type || "",
      searchTerm: routeParams?.searchTerm || ""
    }
  };
}
const import3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  data
}, Symbol.toStringTag, { value: "Module" }));
/*! virtual:vike:page-entry:server:/pages/cursos [vike:pluginModuleBanner] */
const configValuesSerialized = {
  ["isClientRuntimeLoaded"]: {
    type: "computed",
    definedAtData: null,
    valueSerialized: {
      type: "js-serialized",
      value: true
    }
  },
  ["onRenderHtml"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "vike-react/__internal/integration/onRenderHtml", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "pointer-import",
      value: onRenderHtml
    }
  },
  ["Page"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/cursos/+Page.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import2
    }
  },
  ["passToClient"]: {
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "/pages/+config.ts", "fileExportPathToShowToUser": ["default", "passToClient"] }, { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "passToClient"] }],
    valueSerialized: [{
      type: "js-serialized",
      value: ["pageProps", "routeParams"]
    }, {
      type: "js-serialized",
      value: ["_configFromHook"]
    }]
  },
  ["data"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/cursos/+data.ts", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import3
    }
  },
  ["Head"]: {
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "/pages/cursos/+Head.tsx", "fileExportPathToShowToUser": [] }, { "filePathToShowToUser": "/pages/+Head.tsx", "fileExportPathToShowToUser": [] }],
    valueSerialized: [{
      type: "plus-file",
      exportValues: import5
    }, {
      type: "plus-file",
      exportValues: import6
    }]
  },
  ["Layout"]: {
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "/pages/+Layout.tsx", "fileExportPathToShowToUser": [] }],
    valueSerialized: [{
      type: "plus-file",
      exportValues: import7$1
    }]
  },
  ["stream"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/+config.ts", "fileExportPathToShowToUser": ["default", "stream"] },
    valueSerialized: {
      type: "js-serialized",
      value: true
    }
  },
  ["Loading"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "vike-react/__internal/integration/Loading", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "pointer-import",
      value: import7
    }
  }
};
export {
  configValuesSerialized
};

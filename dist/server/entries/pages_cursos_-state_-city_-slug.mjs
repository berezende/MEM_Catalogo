import { onRenderHtml } from "vike-react/__internal/integration/onRenderHtml";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useData } from "vike-react/useData";
import { useState } from "react";
import { ArrowLeft, MapPin, Trophy, ExternalLink, Banknote, HandCoins, Phone, Globe, Award, School, Users } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { i as import5 } from "../chunks/chunk-CQQYeZIn.js";
import { i as import7$1, a as import6 } from "../chunks/chunk-CkrktRxr.js";
import import7 from "vike-react/__internal/integration/Loading";
/* empty css                       */
/*! src/assets/banner_mem.jpg [vike:pluginModuleBanner] */
const bannerMem = "/assets/static/banner_mem.BkP88hwf.jpg";
/*! src/components/UniversityDetailView.tsx [vike:pluginModuleBanner] */
const UniversityDetailView = ({ university, onBack }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeTab] = useState("visao-geral");
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative h-64 sm:h-80 md:h-96 lg:h-[400px]", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onBack,
          className: "absolute top-4 left-4 sm:top-6 sm:left-6 z-20 inline-flex items-center gap-2 px-4 py-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40 group text-sm sm:text-base",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" }),
            /* @__PURE__ */ jsx("span", { children: "Voltar ao Catálogo" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center",
          style: {
            backgroundImage: `url(${bannerMem})`
          },
          children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/10" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-10 mb-12", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-6 sm:gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-xl shadow-lg p-2 flex-shrink-0 border border-gray-100 dark:border-gray-800 relative z-20", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: university.image,
          alt: `${university.name} Logo`,
          className: "w-full h-full object-contain",
          onError: (e) => {
            e.currentTarget.src = "https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg";
          }
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center lg:text-left w-full pt-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 leading-tight", children: university.name }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row items-center lg:items-start gap-2 text-gray-600 justify-center lg:justify-start", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-blue-500" }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium text-sm sm:text-base", children: [
            university.city,
            ", ",
            university.state
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center lg:items-start gap-2 justify-center lg:justify-start mt-6", children: [
          /* @__PURE__ */ jsx("span", { className: "px-4 py-1.5 rounded-full text-sm font-bold bg-blue-100 text-blue-600", children: university.type }),
          university.ranking && university.ranking !== "Não informado" && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold bg-amber-100 text-amber-700", children: [
            /* @__PURE__ */ jsx(Trophy, { className: "w-4 h-4" }),
            university.ranking,
            " no RUF (Folha de SP)"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 pt-4 lg:pt-0 lg:self-end", children: /* @__PURE__ */ jsxs(
        "a",
        {
          href: university.website && university.website.startsWith("http") ? university.website : `https://${university.website}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-bold shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5",
          children: [
            /* @__PURE__ */ jsx("span", { children: "Visitar Site" }),
            /* @__PURE__ */ jsx(ExternalLink, { className: "w-5 h-5" })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
      activeTab === "visao-geral" && /* @__PURE__ */ jsxs("div", { className: "space-y-8 sm:space-y-10 md:space-y-12", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8", children: "Visão Geral" }),
          /* @__PURE__ */ jsx("div", { className: "w-full mb-16", children: /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-base leading-relaxed mb-6", children: university.description }) })
        ] }),
        university.mensalidade && university.mensalidade.trim() !== "" && /* @__PURE__ */ jsxs("div", { className: "mt-12 mb-20", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 mb-8", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900", children: "Investimento e Bolsas" }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -top-6 -right-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500", children: /* @__PURE__ */ jsx(Banknote, { className: "w-48 h-48 text-blue-600 transform rotate-12" }) }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-all duration-500 shadow-sm group-hover:shadow-blue-200 group-hover:rotate-6 group-hover:scale-110", children: /* @__PURE__ */ jsx(Banknote, { className: "w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-500" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300", children: "Valor da Mensalidade" }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-baseline gap-1 mb-4", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 font-medium", children: "A partir de" }),
                  /* @__PURE__ */ jsx("span", { className: "text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight", children: university.mensalidade })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4 group-hover:border-blue-100 transition-colors duration-300", children: "O valor pode variar dependendo do campus e do ano de ingresso. Consulte o site oficial para informações mais detalhadas." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -top-6 -right-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500", children: /* @__PURE__ */ jsx(HandCoins, { className: "w-48 h-48 text-blue-600 transform -rotate-12" }) }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-all duration-500 shadow-sm group-hover:shadow-blue-200 group-hover:rotate-6 group-hover:scale-110", children: /* @__PURE__ */ jsx(HandCoins, { className: "w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-500" }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300", children: "Bolsas e Financiamentos" }),
                /* @__PURE__ */ jsx("div", { className: "min-h-[40px] mb-2 flex items-center", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-700 font-medium leading-snug", children: [
                  "Opções de ",
                  /* @__PURE__ */ jsx("span", { className: "text-blue-600 font-bold", children: "ProUni" }),
                  ", ",
                  /* @__PURE__ */ jsx("span", { className: "text-blue-600 font-bold", children: "FIES" }),
                  " e bolsas institucionais."
                ] }) }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4 group-hover:border-blue-100 transition-colors duration-300", children: "Verifique as opções de Bolsas e Financiamentos disponíveis. Consulte o site oficial para informações mais detalhadas." })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-32 sm:mt-48", style: { marginTop: "70px" }, children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8", children: "Localização e Contato" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-gray-100 rounded-xl overflow-hidden mb-4 h-64 sm:h-80 md:h-96 lg:h-[400px]", children: /* @__PURE__ */ jsx(
                "iframe",
                {
                  src: `https://maps.google.com/maps?q=${encodeURIComponent(
                    [
                      university.name,
                      university.address,
                      university.address_number,
                      university.neighborhood,
                      university.city,
                      university.state
                    ].filter(Boolean).join(", ")
                  )}&t=&z=16&ie=UTF8&iwloc=B&output=embed`,
                  width: "100%",
                  height: "100%",
                  style: { border: 0 },
                  allowFullScreen: true,
                  loading: "lazy",
                  referrerPolicy: "no-referrer-when-downgrade",
                  title: `Mapa de localização - ${university.name}`
                }
              ) }),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    [
                      university.name,
                      university.address,
                      university.address_number,
                      university.neighborhood,
                      university.city,
                      university.state
                    ].filter(Boolean).join(", ")
                  )}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-sm hover:shadow-md",
                  children: [
                    /* @__PURE__ */ jsx(MapPin, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" }),
                    "Ver no Google Maps",
                    /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 h-fit", children: /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx(MapPin, { className: "w-6 h-6 text-blue-600", strokeWidth: 2.5 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-base font-bold text-gray-900 mb-1", children: "Endereço" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: university.address && university.neighborhood ? `${university.address}, ${university.neighborhood} - ${university.city}, ${university.state}` : `${university.city}, ${university.state}` })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx(Phone, { className: "w-6 h-6 text-blue-600", strokeWidth: 2.5 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-base font-bold text-gray-900 mb-1", children: "Telefone" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm font-medium", children: university.phone })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-1", children: /* @__PURE__ */ jsx(Globe, { className: "w-6 h-6 text-blue-600", strokeWidth: 2.5 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-base font-bold text-gray-900 mb-1", children: "Site" }),
                  university.website ? /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: university.website.startsWith("http") ? university.website : `https://${university.website}`,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "text-blue-600 hover:text-blue-700 text-sm font-medium underline break-words block max-w-full",
                      children: university.website
                    }
                  ) : /* @__PURE__ */ jsx("span", { className: "text-gray-600 text-sm font-medium", children: "Não informado" })
                ] })
              ] })
            ] }) })
          ] })
        ] })
      ] }),
      activeTab === "admissao" && /* @__PURE__ */ jsxs("div", { className: "space-y-16", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8", children: "Processo de Admissão" }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "group bg-white rounded-lg p-6 sm:p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-start mb-4", children: /* @__PURE__ */ jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300", children: /* @__PURE__ */ jsx(Award, { className: "h-5 w-5 sm:h-6 sm:w-6 text-blue-600 group-hover:text-white transition-colors duration-300" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300", children: "Vestibular Tradicional" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: "Prepare-se para a prova específica da universidade. Conheça o formato, matérias e cronograma." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "group bg-white rounded-lg p-6 sm:p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-start mb-4", children: /* @__PURE__ */ jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300", children: /* @__PURE__ */ jsx(School, { className: "h-5 w-5 sm:h-6 sm:w-6 text-blue-600 group-hover:text-white transition-colors duration-300" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300", children: "ENEM/SISU" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: "Utilize sua nota do Exame Nacional do Ensino Médio para concorrer a vagas em todo o país." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "group bg-white rounded-lg p-6 sm:p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-start mb-4", children: /* @__PURE__ */ jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300", children: /* @__PURE__ */ jsx(Users, { className: "h-5 w-5 sm:h-6 sm:w-6 text-blue-600 group-hover:text-white transition-colors duration-300" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300", children: "Transferência e Diploma" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: "Veja as regras e prazos para transferir seu curso ou ingressar como segunda graduação." })
          ] })
        ] })
      ] })
    ] }),
    selectedPhoto && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4",
        onClick: () => setSelectedPhoto(null),
        children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-5xl max-h-full", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedPhoto(null),
              className: "absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110",
              children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: selectedPhoto,
              alt: "Foto expandida",
              className: "max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            }
          )
        ] })
      }
    )
  ] });
};
/*! pages/cursos/@state/@city/@slug/+Page.tsx [vike:pluginModuleBanner] */
function UniversityDetailPage() {
  const { university } = useData();
  const handleBack = () => {
    window.history.back();
  };
  if (!university) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Universidade não encontrada" }),
      /* @__PURE__ */ jsx("button", { onClick: handleBack, className: "mt-4 text-blue-600", children: "Voltar ao Catálogo" })
    ] }) });
  }
  return /* @__PURE__ */ jsx(UniversityDetailView, { university, onBack: handleBack });
}
const import2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UniversityDetailPage
}, Symbol.toStringTag, { value: "Module" }));
/*! pages/cursos/@state/@city/@slug/+data.ts [vike:pluginModuleBanner] */
const supabaseUrl = "https://vidduudezriknkhsfzjq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZGR1dWRlenJpa25raHNmempxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTE0NjcsImV4cCI6MjA4NjM4NzQ2N30.rBm7v3yB5q1w8D6O9QxwVlLI8nZrtx7wx68AqTFLDkk";
const slugify = (text) => {
  return text.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
};
async function data(pageContext) {
  const { routeParams } = pageContext;
  const { state, city, slug } = routeParams;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: universities, error } = await supabase.from("Instituicoes").select("*");
  if (error) {
    console.error("Error fetching university:", error);
    return { university: null };
  }
  const university = universities?.find((u) => {
    const nameMatch = slugify(u.name) === slug;
    const stateMatch = slugify(u.estado) === state;
    const cityMatch = slugify(u.cidade) === city;
    return nameMatch && stateMatch && cityMatch;
  });
  if (!university) {
    return { university: null };
  }
  return {
    university: {
      id: university.id,
      name: university.name,
      city: university.cidade,
      state: university.estado,
      type: university.tipo,
      website: university.website || "",
      vacancies: university.Qt_Vagas_Autorizadas || "Não informado",
      periodization: university.Tipo_de_Periodicidade || "Semestral",
      description: university.descricao || "",
      mensalidade: university.mensalidade || "",
      campus_name: university.Nome_do_Campus || "",
      address: university.endereco || "",
      address_number: university.numero_endereco || "",
      neighborhood: university.bairro || "",
      image: university.logo || "https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg",
      mec_rating: university.Valor_CC || "5",
      phone: university.telefone || "Não Informado",
      creation_date: university.data_criacao ? new Date(university.data_criacao).getFullYear().toString() : "Não informado",
      cpc: university.CPC || "Não informado",
      ranking: university.ranking || "Não informado"
    }
  };
}
const import3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  data
}, Symbol.toStringTag, { value: "Module" }));
/*! pages/cursos/@state/@city/@slug/+Head.tsx [vike:pluginModuleBanner] */
function Head() {
  const { university } = useData();
  if (!university) {
    return /* @__PURE__ */ jsx("title", { children: "Universidade não encontrada | MEM" });
  }
  const title = `${university.name} - Medicina em ${university.city}, ${university.state} | MEM`;
  const description = `Curso de Medicina na ${university.name} em ${university.city}, ${university.state}. Instituição ${university.type}. Confira notas de corte, endereço e tudo sobre o curso.`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "keywords", content: `medicina ${university.city}, ${university.name}, faculdade medicina` }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "article" }),
    /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/png", href: "https://melhoresescolasmedicas.com/wp-content/uploads/2023/12/Group-22.png" }),
    /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
    /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }),
    /* @__PURE__ */ jsx(
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700&family=Open+Sans:wght@300;400;600;700&display=swap",
        rel: "stylesheet"
      }
    )
  ] });
}
const import4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Head
}, Symbol.toStringTag, { value: "Module" }));
/*! virtual:vike:page-entry:server:/pages/cursos/@state/@city/@slug [vike:pluginModuleBanner] */
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
    definedAtData: { "filePathToShowToUser": "/pages/cursos/@state/@city/@slug/+Page.tsx", "fileExportPathToShowToUser": [] },
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
    definedAtData: { "filePathToShowToUser": "/pages/cursos/@state/@city/@slug/+data.ts", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import3
    }
  },
  ["Head"]: {
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "/pages/cursos/@state/@city/@slug/+Head.tsx", "fileExportPathToShowToUser": [] }, { "filePathToShowToUser": "/pages/cursos/+Head.tsx", "fileExportPathToShowToUser": [] }, { "filePathToShowToUser": "/pages/+Head.tsx", "fileExportPathToShowToUser": [] }],
    valueSerialized: [{
      type: "plus-file",
      exportValues: import4
    }, {
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

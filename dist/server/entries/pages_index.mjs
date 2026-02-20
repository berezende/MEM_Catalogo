import { onRenderHtml } from "vike-react/__internal/integration/onRenderHtml";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useData } from "vike-react/useData";
import * as React from "react";
import React__default, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, MapPin, Landmark, Building2, TrendingUp, Users, Shield, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { s as slugify, a as supabase } from "../chunks/chunk-iNVzkSn2.js";
import { createClient } from "@supabase/supabase-js";
import { i as import7$1, a as import6 } from "../chunks/chunk-CkrktRxr.js";
import import7 from "vike-react/__internal/integration/Loading";
/* empty css                       */
/*! src/lib/utils.ts [vike:pluginModuleBanner] */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
/*! src/components/ui/animated-text.tsx [vike:pluginModuleBanner] */
const AnimatedText = React.forwardRef(
  ({
    text,
    duration = 0.5,
    delay = 0.1,
    replay = true,
    className,
    textClassName,
    underlineClassName,
    as: Component = "h1",
    underlineGradient = "from-blue-500 via-purple-500 to-pink-500",
    underlineHeight = "h-1",
    underlineOffset = "-bottom-2",
    ...props
  }, ref) => {
    const words = text.split(" ");
    const letters = Array.from(text);
    const container = {
      hidden: {
        opacity: 0
      },
      visible: (i = 1) => ({
        opacity: 1,
        transition: {
          staggerChildren: duration,
          delayChildren: i * delay
        }
      })
    };
    const child = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200
        }
      },
      hidden: {
        opacity: 0,
        y: 20,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200
        }
      }
    };
    const lineVariants = {
      hidden: {
        width: "0%",
        left: "50%"
      },
      visible: {
        width: "100%",
        left: "0%",
        transition: {
          delay: letters.length * duration,
          duration: 0.8,
          ease: "easeOut"
        }
      }
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("flex flex-col items-center justify-center gap-2", className),
        ...props,
        children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: container,
              initial: "hidden",
              animate: replay ? "visible" : "hidden",
              className: cn("flex flex-wrap justify-center text-4xl font-bold text-center", textClassName),
              children: words.map((word, wordIndex) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    className: "flex whitespace-nowrap",
                    transition: { staggerChildren: duration },
                    children: Array.from(word).map((letter, letterIndex) => /* @__PURE__ */ jsx(motion.span, { variants: child, children: letter }, letterIndex))
                  }
                ),
                wordIndex < words.length - 1 && /* @__PURE__ */ jsx("span", { className: "inline-block", children: " " })
              ] }, wordIndex))
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: lineVariants,
              initial: "hidden",
              animate: "visible",
              className: cn(
                "absolute",
                underlineHeight,
                underlineOffset,
                "bg-gradient-to-r",
                underlineGradient,
                underlineClassName
              )
            }
          )
        ] })
      }
    );
  }
);
AnimatedText.displayName = "AnimatedText";
/*! src/components/Hero.tsx [vike:pluginModuleBanner] */
const Hero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    onSearch({
      searchTerm,
      state: "",
      city: "",
      type: "",
      sortBy: "name"
    });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 sm:py-16 md:py-20 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" }),
    /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center mb-4 sm:mb-6 px-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-x-2 sm:gap-x-4 items-baseline w-full", children: [
          /* @__PURE__ */ jsx(
            AnimatedText,
            {
              text: "Encontre seu",
              textClassName: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900",
              underlineClassName: "hidden",
              className: "items-center",
              duration: 0.05
            }
          ),
          /* @__PURE__ */ jsx(
            AnimatedText,
            {
              text: "Curso de Medicina",
              textClassName: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent",
              underlineGradient: "from-blue-600 to-indigo-600",
              className: "items-center",
              duration: 0.05
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          AnimatedText,
          {
            text: "no Brasil",
            textClassName: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900",
            underlineClassName: "hidden",
            className: "mt-2",
            duration: 0.05
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        AnimatedText,
        {
          text: "O guia mais completo de cursos de medicina do país.",
          as: "p",
          textClassName: "text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-light text-center",
          className: "mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto px-4",
          underlineClassName: "hidden",
          delay: 2,
          duration: 0.02
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center bg-white rounded-2xl shadow-2xl p-2 border border-gray-100 hover:shadow-3xl transition-shadow duration-300", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-blue-500" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Digite o nome da universidade, estado ou cidade...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              onKeyPress: handleKeyPress,
              className: "w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 md:py-5 text-gray-900 placeholder-gray-400 focus:outline-none rounded-xl text-sm sm:text-base md:text-lg"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSearch,
            className: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base",
            children: "Buscar"
          }
        )
      ] }) })
    ] }) })
  ] });
};
/*! src/components/FeaturedUniversities.tsx [vike:pluginModuleBanner] */
const FEATURED_UNIVERSITY_NAMES = [
  "UNIVERSIDADE DE SÃO PAULO",
  "UNIVERSIDADE FEDERAL DO RIO DE JANEIRO",
  "UNIVERSIDADE FEDERAL DE MINAS GERAIS",
  "UNIVERSIDADE FEDERAL DE SERGIPE",
  "UNIVERSIDADE ESTADUAL DE CAMPINAS",
  "UNIVERSIDADE FEDERAL DO RIO GRANDE DO SUL",
  "UNIVERSIDADE ESTADUAL PAULISTA",
  "UNIVERSIDADE DE BRASÍLIA",
  "UNIVERSIDADE FEDERAL DE SANTA CATARINA"
];
const FeaturedUniversities = ({ onUniversitySelect, initialData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [_itemsPerView, setItemsPerView] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [featuredUniversities, setFeaturedUniversities] = useState(() => {
    if (initialData && initialData.length > 0) {
      const allData = initialData.map((row) => ({
        id: row.id,
        name: row.name,
        location: `${row.cidade}, ${row.estado}`,
        state: row.estado,
        city: row.cidade,
        image: row.logo || "https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg"
      }));
      const filtered = allData.filter(
        (uni) => FEATURED_UNIVERSITY_NAMES.some(
          (featuredName) => uni.name.toUpperCase() === featuredName
        )
      );
      const unique = filtered.reduce((acc, current) => {
        const isDuplicateName = acc.some((uni) => uni.name.toUpperCase() === current.name.toUpperCase());
        if (!isDuplicateName) {
          const hasLogoConflict = acc.some(
            (uni) => uni.image === current.image && uni.image !== "https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg"
          );
          if (hasLogoConflict) {
            const alternativeEntry = filtered.find(
              (uni) => uni.name.toUpperCase() === current.name.toUpperCase() && !acc.some((accUni) => accUni.image === uni.image)
            );
            acc.push(alternativeEntry || current);
          } else {
            acc.push(current);
          }
        }
        return acc;
      }, []);
      return unique.sort((a, b) => {
        const indexA = FEATURED_UNIVERSITY_NAMES.indexOf(a.name.toUpperCase());
        const indexB = FEATURED_UNIVERSITY_NAMES.indexOf(b.name.toUpperCase());
        return indexA - indexB;
      });
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(!initialData || initialData.length === 0);
  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (initialData && initialData.length > 0) return;
    const fetchUniversities = async () => {
      try {
        const { data: universities, error } = await supabase.from("Instituicoes").select("id, name, cidade, estado, logo");
        if (error) throw error;
        if (universities) {
          const allUniversities = universities.map((row) => ({
            id: row.id,
            name: row.name,
            location: `${row.cidade}, ${row.estado}`,
            state: row.estado,
            city: row.cidade,
            image: row.logo || "https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg"
          }));
          const featured = allUniversities.filter(
            (uni) => FEATURED_UNIVERSITY_NAMES.some(
              (featuredName) => uni.name.toUpperCase() === featuredName
            )
          );
          const uniqueFeatured = featured.reduce((acc, current) => {
            const isDuplicateName = acc.some((uni) => uni.name.toUpperCase() === current.name.toUpperCase());
            if (!isDuplicateName) {
              const hasLogoConflict = acc.some(
                (uni) => uni.image === current.image && uni.image !== "https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg"
              );
              if (hasLogoConflict) {
                const alternativeEntry = featured.find(
                  (uni) => uni.name.toUpperCase() === current.name.toUpperCase() && !acc.some((accUni) => accUni.image === uni.image)
                );
                acc.push(alternativeEntry || current);
              } else {
                acc.push(current);
              }
            }
            return acc;
          }, []);
          const sortedFeatured = uniqueFeatured.sort((a, b) => {
            const indexA = FEATURED_UNIVERSITY_NAMES.indexOf(a.name.toUpperCase());
            const indexB = FEATURED_UNIVERSITY_NAMES.indexOf(b.name.toUpperCase());
            return indexA - indexB;
          });
          setFeaturedUniversities(sortedFeatured);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setIsLoading(false);
      }
    };
    fetchUniversities();
  }, []);
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) => prevIndex === 0 ? featuredUniversities.length - 1 : prevIndex - 1
    );
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };
  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) => prevIndex === featuredUniversities.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };
  const handleDragStart = (clientX) => {
    if (isTransitioning) return;
    setDragStart(clientX);
    setIsDragging(true);
  };
  const handleDragMove = (clientX) => {
    if (dragStart === null || !isDragging) return;
    const diff = clientX - dragStart;
    setDragOffset(diff);
  };
  const handleDragEnd = () => {
    if (dragStart === null) return;
    const threshold = 50;
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
  const onMouseDown = (e) => {
    handleDragStart(e.clientX);
  };
  const onMouseMove = (e) => {
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
  const onTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };
  const onTouchMove = (e) => {
    handleDragMove(e.touches[0].clientX);
  };
  const onTouchEnd = () => {
    handleDragEnd();
  };
  const getVisibleUniversities = () => {
    if (featuredUniversities.length === 0) return [];
    const visible = [];
    const sideCount = 2;
    const totalVisible = sideCount * 2 + 1;
    for (let i = 0; i < totalVisible; i++) {
      const offset = i - sideCount;
      const index = (currentIndex + offset + featuredUniversities.length) % featuredUniversities.length;
      visible.push({ ...featuredUniversities[index], position: i });
    }
    return visible;
  };
  const visibleUniversities = getVisibleUniversities();
  if (isLoading) {
    return /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-8 sm:px-12 lg:px-16", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 text-center title-animate", children: [
        "Cursos em ",
        /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: "Destaque" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4 lg:gap-6 py-20", children: [
        /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg", children: "Carregando ..." })
      ] })
    ] }) });
  }
  if (featuredUniversities.length === 0) {
    return /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-8 sm:px-12 lg:px-16", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 text-center", children: [
        "Cursos em ",
        /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: "Destaque" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-gray-600", children: "Nenhuma instituição encontrada." })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("section", { className: "py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden", children: [
    /* @__PURE__ */ jsx("style", { children: `
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
      ` }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-8 sm:px-12 lg:px-16", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-5xl font-extrabold text-gray-900 mb-16 text-center title-animate", children: [
        "Cursos em ",
        /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: "Destaque" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative px-12 sm:px-16 lg:px-24", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handlePrevious,
            className: "absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-2 sm:p-3 md:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:from-blue-700 hover:to-indigo-700 active:scale-95",
            "aria-label": "Anterior",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleNext,
            className: "absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-2 sm:p-3 md:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:from-blue-700 hover:to-indigo-700 active:scale-95",
            "aria-label": "Próximo",
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: `drag-indicator ${Math.abs(dragOffset) > 10 ? "active" : ""}`, children: dragOffset > 10 ? "← Arraste para navegar" : dragOffset < -10 ? "Arraste para navegar →" : "" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `flex items-center justify-center gap-4 lg:gap-6 ${isDragging ? "carousel-dragging" : "carousel-draggable"}`,
            onMouseDown,
            onMouseMove,
            onMouseUp,
            onMouseLeave,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            style: {
              transform: `translateX(${dragOffset}px)`,
              transition: isDragging ? "none" : "transform 0.3s ease-out"
            },
            children: visibleUniversities.map((university, idx) => {
              const centerIndex = 2;
              const isCenter = idx === centerIndex;
              const isEdge = idx === 0 || idx === visibleUniversities.length - 1;
              return /* @__PURE__ */ jsx(
                "div",
                {
                  className: `
                    flex-shrink-0 card-float card-item
                    ${isCenter ? "cursor-pointer" : "cursor-default"}
                    ${isEdge ? "hidden lg:block" : ""}
                    ${isCenter ? "z-10" : "z-0"}
                    ${hasAnimated ? "card-container" : "opacity-0"}
                  `,
                  style: {
                    width: isCenter ? "340px" : "270px",
                    transform: `translateX(${(idx - 2) * 10}px) scale(${isCenter ? 1.05 : 0.9})`,
                    opacity: isCenter ? 1 : 0.4,
                    filter: isCenter ? "blur(0px)" : "blur(2px)",
                    transition: isDragging ? "none" : "all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)",
                    willChange: "transform, opacity, filter, width",
                    animationDelay: `${idx * 0.15}s`,
                    ["--card-offset"]: `${(idx - 2) * 10}px`
                  },
                  onClick: () => {
                    if (!isDragging && Math.abs(dragOffset) < 5 && isCenter) {
                      onUniversitySelect(slugify(university.name), university.state, university.city);
                    }
                  },
                  children: /* @__PURE__ */ jsxs("div", { className: `bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-500 border border-gray-100 transform ${isCenter ? "group shimmer-effect hover:shadow-2xl hover:border-blue-300 hover:-translate-y-3 hover:rotate-1" : ""}`, children: [
                    /* @__PURE__ */ jsx("div", { className: "relative h-48 overflow-hidden", style: { backgroundColor: "#FFFFFF" }, children: /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "absolute inset-0 m-4 bg-center bg-no-repeat transform group-hover:scale-105 transition-all duration-700 ease-out",
                        style: {
                          backgroundImage: `url(${university.image})`,
                          backgroundSize: "contain",
                          backgroundColor: "#FFFFFF"
                        },
                        onError: (e) => {
                          e.currentTarget.style.backgroundImage = "url(https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg)";
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200" }),
                    /* @__PURE__ */ jsxs("div", { className: "p-5 relative z-20 bg-white", children: [
                      /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-all duration-300 transform group-hover:translate-x-1", children: university.name }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300", children: [
                        /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 mr-1 text-blue-600 group-hover:scale-110 transition-transform duration-300" }),
                        university.location
                      ] })
                    ] })
                  ] })
                },
                university.position
              );
            })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2 mt-10", children: featuredUniversities.map((_, index) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 700);
              }
            },
            className: `
                  h-2 rounded-full transition-all duration-500 ease-in-out transform
                  ${currentIndex === index ? "bg-gradient-to-r from-blue-600 to-indigo-600 w-10 scale-110" : "bg-gray-300 w-2 hover:bg-gray-400 hover:scale-125"}
                `,
            "aria-label": `Ir para slide ${index + 1}`
          },
          index
        )) })
      ] })
    ] })
  ] });
};
/*! src/components/CategoriesSection.tsx [vike:pluginModuleBanner] */
const CategoriesSection = ({
  onCategorySelect
}) => {
  const categories = [
    {
      id: "public",
      title: "Pública",
      icon: Landmark,
      onClick: () => onCategorySelect("Pública", "institution")
    },
    {
      id: "private",
      title: "Particular",
      icon: Building2,
      onClick: () => onCategorySelect("Particular", "institution")
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 md:py-20 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12 sm:mb-16", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight", children: [
        "Explore por ",
        /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: "Categoria" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg max-w-2xl mx-auto", children: "Selecione o tipo de instituição para encontrar o curso de medicina ideal para o seu futuro." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto px-4", children: categories.map((category, index) => {
      const Icon = category.icon;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          onClick: category.onClick,
          className: "group relative bg-white rounded-3xl p-8 sm:p-10 cursor-pointer transition-all duration-300 hover:-translate-y-2 shadow-lg shadow-gray-200/80 hover:shadow-2xl hover:shadow-blue-500/20 border border-gray-300 hover:border-blue-500 flex flex-col items-center justify-center text-center overflow-hidden",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 z-0" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-8 relative", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-blue-100/50 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500" }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-indigo-100/50 rounded-2xl -rotate-6 group-hover:-rotate-12 transition-transform duration-500 delay-75" }),
                /* @__PURE__ */ jsx("div", { className: "relative w-20 h-20 bg-gradient-to-br from-white to-blue-50 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/5 border border-white group-hover:scale-110 transition-transform duration-300 group-hover:shadow-blue-500/20", children: /* @__PURE__ */ jsx(
                  Icon,
                  {
                    className: "w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform duration-300",
                    strokeWidth: 1.5
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300", children: category.title }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-6 group-hover:text-gray-600 transition-colors duration-300", children: category.id === "public" ? "Universidades Federais, Estaduais e Municipais" : "Faculdades Particulares de Excelência" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center text-blue-600 font-semibold text-sm bg-blue-50 px-4 py-2 rounded-full transform scale-90 opacity-0 translate-y-4 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300", children: [
                /* @__PURE__ */ jsx("span", { children: "Ver lista completa" }),
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 ml-1.5 -mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 7l5 5m0 0l-5 5m5-5H6" }) })
              ] })
            ] })
          ]
        },
        category.id
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-16 text-center", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => onCategorySelect("", "special"),
        className: "inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-700 hover:to-indigo-700 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        children: [
          "Explorar Todas as Instituições",
          /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 ml-2 -mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
        ]
      }
    ) })
  ] }) });
};
/*! src/components/NewsletterSection.tsx [vike:pluginModuleBanner] */
const NewsletterSection = () => {
  const formCreatedRef = React__default.useRef(false);
  React__default.useEffect(() => {
    if (formCreatedRef.current) {
      return;
    }
    const scriptSrc = "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";
    const scriptId = "rd-station-forms-script";
    const formContainerId = "catalogo-mem-d8ccd54a052a30050f2d";
    const createForm = () => {
      const formContainer = document.getElementById(formContainerId);
      if (!formContainer) return;
      if (formContainer.children.length > 0) {
        formCreatedRef.current = true;
        return;
      }
      if (window.RDStationForms) {
        new window.RDStationForms(formContainerId, "UA-151180973-1").createForm();
        formCreatedRef.current = true;
      }
    };
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      createForm();
      return;
    }
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = scriptSrc;
    script.type = "text/javascript";
    script.async = true;
    script.onload = createForm;
    document.body.appendChild(script);
    return () => {
      const formContainer = document.getElementById(formContainerId);
      if (formContainer) {
        formContainer.innerHTML = "";
      }
      formCreatedRef.current = false;
    };
  }, []);
  return /* @__PURE__ */ jsxs("section", { id: "newsletter-section", className: "relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-cover bg-center bg-no-repeat",
        style: {
          backgroundImage: "url(https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920)"
        },
        children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-blue-400/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-indigo-400/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-400/20 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000" }),
    /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/50 transition-all duration-500 hover:shadow-[0_35px_80px_-15px_rgba(0,0,0,0.4)] hover:scale-[1.01] sm:hover:scale-[1.02] hover:-translate-y-1 sm:hover:-translate-y-2", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50/50", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-6", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://melhoresescolasmedicas.com/wp-content/uploads/2024/07/me-azul-2.png",
            alt: "Melhores Escolas Médicas",
            className: "h-14 sm:h-16 md:h-20 w-auto object-contain"
          }
        ) }),
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight", children: [
          "O mundo da medicina",
          /* @__PURE__ */ jsx("span", { className: "block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: "no seu email" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed", children: "Acompanhe todas as novidades, dicas, notícias e curiosidades do mundo da medicina no seu email." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-blue-600" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-medium", children: "Notícias exclusivas diariamente" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Users, { className: "w-5 h-5 text-indigo-600" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-medium", children: "Dicas e novidades" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Shield, { className: "w-5 h-5 text-purple-600" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-medium", children: "Conteúdo verificado e confiável" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 pt-6 border-t border-gray-200", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-900", children: "25k+" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Inscritos" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-900", children: "10+" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Notícias Diárias" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-gray-900", children: "100%" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Gratuito" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-[#2854A2] flex flex-col justify-center lg:min-h-[500px]", children: /* @__PURE__ */ jsx("div", { className: "w-full lg:h-full", children: /* @__PURE__ */ jsx("div", { role: "main", id: "catalogo-mem-d8ccd54a052a30050f2d" }) }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .hover:shadow-3xl:hover {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.4);
        }
      ` })
  ] });
};
/*! src/components/NewsSection.tsx [vike:pluginModuleBanner] */
const NewsSection = () => {
  const articles = [
    {
      id: 1,
      image: "https://melhoresescolasmedicas.com/wp-content/uploads/2024/06/Avenidapaulista-1024x662-1-5.jpg",
      tags: ["Escolas Médicas", "Medicina"],
      title: "As 5 melhores faculdades de medicina particulares de São Paulo",
      excerpt: "Dentre os estados brasileiros, São Paulo é o que possui o maior número populacional. Além disso, quando se trata de...",
      date: "12/06/2024",
      author: "Jornalista Karla Thyale",
      url: "https://melhoresescolasmedicas.com/as-5-melhores-faculdades-de-medicina-particulares-de-sao-paulo/"
    },
    {
      id: 2,
      image: "https://melhoresescolasmedicas.com/wp-content/uploads/2022/07/transferencia-externa-para-medicina-scaled.jpg.webp",
      tags: ["Blog", "Medicina no exterior"],
      title: "Faculdades públicas que aceitam transferência externa para medicina",
      excerpt: "Se você está por aqui, das duas uma: ou você já cursa medicina e está interessado em trocar de instituição,...",
      date: "25/02/2025",
      author: "Melhores Escolas Médicas",
      url: "https://melhoresescolasmedicas.com/faculdades-que-aceitam-transferencia-externa-em-medicina/"
    },
    {
      id: 3,
      image: "https://melhoresescolasmedicas.com/wp-content/uploads/2024/08/Novo-Projeto.webp",
      tags: ["Escolas Médicas", "Medicina"],
      title: "Dez anos do Mais Médicos: 78% dos municípios sofrem com carência de profissionais",
      excerpt: "Instituído em julho de 2013 pelo governo brasileiro, o Programa Mais Médicos surgiu como uma resposta emergencial à carência de...",
      date: "02/08/2024",
      author: "Bruno Daniel",
      url: "https://melhoresescolasmedicas.com/dez-anos-do-mais-medicos-78-dos-municipios-sofrem-com-carencia-de-profissionais/"
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 md:py-20 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-8 sm:mb-10 md:mb-12", children: /* @__PURE__ */ jsxs("h2", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 px-2", children: [
      "Notícias mais ",
      /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "acessadas" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8", children: articles.map((article) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: article.url,
        className: "bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group block",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative h-48 sm:h-52 md:h-56 overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: article.image,
                alt: article.title,
                className: "w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-5 md:p-6", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: article.tags.map((tag, index) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200",
                children: tag
              },
              index
            )) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300", children: article.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4 line-clamp-3 leading-relaxed", children: article.excerpt }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-gray-100", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-500", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 mr-1" }),
                /* @__PURE__ */ jsx("span", { children: article.date })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-500", children: [
                /* @__PURE__ */ jsx(User, { className: "w-4 h-4 mr-1" }),
                /* @__PURE__ */ jsx("span", { className: "truncate max-w-[150px]", children: article.author })
              ] })
            ] })
          ] })
        ]
      },
      article.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "text-center mt-12", children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: "https://melhoresescolasmedicas.com/",
        className: "inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl",
        children: [
          "Ver todas as notícias",
          /* @__PURE__ */ jsx("svg", { className: "ml-2 w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 7l5 5m0 0l-5 5m5-5H6" }) })
        ]
      }
    ) })
  ] }) });
};
/*! src/assets/doctor-group1.png [vike:pluginModuleBanner] */
const doctorGroupImg = "/assets/static/doctor-group1.DbdYUOtH.png";
/*! pages/index/+Page.tsx [vike:pluginModuleBanner] */
function HomePage() {
  const { featuredUniversities } = useData();
  const handleUniversitySelect = (slug, state, city) => {
    if (state && city) {
      window.location.href = `/cursos/${slugify(state)}/${slugify(city)}/${slug}`;
    } else {
      window.location.href = `/cursos/${slug}`;
    }
  };
  const handleSearch = (filters) => {
    let url = "/cursos";
    if (filters.searchTerm) {
      url = `/cursos?q=${encodeURIComponent(filters.searchTerm)}`;
    } else if (filters.state) {
      url = `/cursos/${slugify(filters.state)}`;
      if (filters.city) url += `/${slugify(filters.city)}`;
    } else if (filters.type) {
      url = `/cursos/${filters.type.toLowerCase()}`;
    }
    window.location.href = url;
  };
  const handleCategorySelect = (category, type) => {
    if (type === "institution") {
      window.location.href = `/cursos/${slugify(category)}`;
    } else {
      window.location.href = "/cursos";
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Hero, { onSearch: handleSearch }),
    /* @__PURE__ */ jsx(
      FeaturedUniversities,
      {
        onUniversitySelect: handleUniversitySelect,
        initialData: featuredUniversities
      }
    ),
    /* @__PURE__ */ jsx(CategoriesSection, { onCategorySelect: handleCategorySelect }),
    /* @__PURE__ */ jsx("div", { className: "font-sans py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 animate-fade-in-up", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 sm:mb-8", children: [
          "Sobre a ",
          /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: "MEM" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed text-gray-700", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-lg sm:text-xl", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: "O Portal Melhores Escolas Médicas" }),
            " é a maior plataforma de comunicação dedicada à ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-blue-600", children: "Educação, Saúde e Medicina" }),
            ". Produzimos conteúdo gratuito, claro e confiável para ampliar o acesso à informação sobre faculdades de Medicina e apoiar estudantes em escolhas mais seguras ao longo do caminho."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg sm:text-xl", children: [
            "Conectamos futuros médicos às principais informações sobre cursos de ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-blue-600", children: "Medicina" }),
            " no Brasil e acompanhamos toda a jornada acadêmica do vestibular à residência."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 relative group animate-fade-in-up animation-delay-200 w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-all duration-500" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl transform -rotate-6 opacity-50 group-hover:opacity-70 transition-all duration-500" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: doctorGroupImg,
            alt: "Equipe Melhores Escolas Médicas",
            className: "relative w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500"
          }
        )
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsx(NewsletterSection, {}),
    /* @__PURE__ */ jsx(NewsSection, {})
  ] });
}
const import2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HomePage
}, Symbol.toStringTag, { value: "Module" }));
/*! pages/index/+data.ts [vike:pluginModuleBanner] */
const supabaseUrl = "https://vidduudezriknkhsfzjq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZGR1dWRlenJpa25raHNmempxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTE0NjcsImV4cCI6MjA4NjM4NzQ2N30.rBm7v3yB5q1w8D6O9QxwVlLI8nZrtx7wx68AqTFLDkk";
async function data() {
  const supabase2 = createClient(supabaseUrl, supabaseKey);
  const featuredUniversityNames = [
    "UNIVERSIDADE DE SÃO PAULO",
    "UNIVERSIDADE FEDERAL DO RIO DE JANEIRO",
    "UNIVERSIDADE FEDERAL DE MINAS GERAIS",
    "UNIVERSIDADE FEDERAL DE SERGIPE",
    "UNIVERSIDADE ESTADUAL DE CAMPINAS",
    "UNIVERSIDADE FEDERAL DO RIO GRANDE DO SUL",
    "UNIVERSIDADE ESTADUAL PAULISTA",
    "UNIVERSIDADE DE BRASÍLIA",
    "UNIVERSIDADE FEDERAL DE SANTA CATARINA"
  ];
  const { data: featuredUniversities, error } = await supabase2.from("Instituicoes").select("id, name, cidade, estado, logo").in("name", featuredUniversityNames);
  if (error) {
    console.error("Error fetching featured universities:", error);
    return { featuredUniversities: [] };
  }
  return {
    featuredUniversities: featuredUniversities || []
  };
}
const import3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  data
}, Symbol.toStringTag, { value: "Module" }));
/*! pages/index/+Head.tsx [vike:pluginModuleBanner] */
function Head() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("title", { children: "MEM | Catálogo de Medicina" }),
    /* @__PURE__ */ jsx(
      "meta",
      {
        name: "description",
        content: "O guia mais completo de cursos de medicina do Brasil. Compare universidades públicas e particulares, veja notas de corte, mensalidades, rankings e descubra a faculdade de medicina ideal para sua carreira."
      }
    ),
    /* @__PURE__ */ jsx(
      "meta",
      {
        name: "keywords",
        content: "faculdade de medicina, curso de medicina, vestibular medicina, medicina no Brasil"
      }
    ),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: "https://guia.melhoresescolasmedicas.com/" }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: "MEM | Catálogo de Medicina" }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
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
/*! virtual:vike:page-entry:server:/pages/index [vike:pluginModuleBanner] */
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
    definedAtData: { "filePathToShowToUser": "/pages/index/+Page.tsx", "fileExportPathToShowToUser": [] },
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
    definedAtData: { "filePathToShowToUser": "/pages/index/+data.ts", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import3
    }
  },
  ["Head"]: {
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "/pages/index/+Head.tsx", "fileExportPathToShowToUser": [] }, { "filePathToShowToUser": "/pages/+Head.tsx", "fileExportPathToShowToUser": [] }],
    valueSerialized: [{
      type: "plus-file",
      exportValues: import4
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

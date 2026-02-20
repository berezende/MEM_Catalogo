import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useData } from "vike-react/useData";
/*! pages/cursos/+Head.tsx [vike:pluginModuleBanner] */
function Head() {
  const { filters } = useData();
  const buildTitle = () => {
    const parts = ["MEM | Catálogo de Medicina"];
    if (filters?.type) parts.push(filters.type === "publica" ? "Pública" : "Particular");
    if (filters?.state) parts.push(`em ${filters.state}`);
    return parts.join(" ");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("title", { children: buildTitle() }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: "Encontre cursos de medicina em todo o Brasil." }),
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
const import5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Head
}, Symbol.toStringTag, { value: "Module" }));
export {
  import5 as i
};

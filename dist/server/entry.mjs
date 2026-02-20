import { setGlobalContext_prodBuildEntry } from "vike/__internal";
/*! virtual:vike:server:constantsGlobalThis [vike:pluginModuleBanner] */
globalThis.__VIKE__IS_DEV = false;
globalThis.__VIKE__IS_CLIENT = false;
globalThis.__VIKE__IS_DEBUG = false;
/*! pages/cursos/+route.ts [vike:pluginModuleBanner] */
function route$1(pageContext) {
  const { urlPathname } = pageContext;
  if (!urlPathname.startsWith("/cursos")) return false;
  const segments = urlPathname.replace(/^\/cursos\/?/, "").split("/").filter(Boolean);
  const firstIsType = segments.length > 0 && (segments[0] === "publica" || segments[0] === "particular");
  if (segments.length === 3 && !firstIsType) return false;
  if (segments.length > 3) return false;
  const routeParams = {};
  const search = pageContext.urlParsed?.search ?? {};
  if (search["q"]) routeParams.searchTerm = search["q"];
  if (search["type"]) routeParams.type = search["type"];
  if (search["state"]) routeParams.state = search["state"];
  if (search["city"]) routeParams.city = search["city"];
  if (segments.length >= 1) {
    const first = segments[0];
    if (firstIsType) {
      routeParams.type = first;
      if (segments.length >= 2) routeParams.state = segments[1];
      if (segments.length >= 3) routeParams.city = segments[2];
    } else {
      routeParams.state = first;
      if (segments.length >= 2) routeParams.city = segments[1];
    }
  }
  return { routeParams, precedence: 10 };
}
const import2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  route: route$1
}, Symbol.toStringTag, { value: "Module" }));
/*! pages/cursos/@state/@city/@slug/+route.ts [vike:pluginModuleBanner] */
function route(pageContext) {
  const { urlPathname } = pageContext;
  if (!urlPathname.startsWith("/cursos/")) return false;
  const segments = urlPathname.replace(/^\/cursos\//, "").split("/").filter(Boolean);
  if (segments.length !== 3) return false;
  return {
    routeParams: {
      state: segments[0],
      city: segments[1],
      slug: segments[2]
    }
  };
}
const import3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  route
}, Symbol.toStringTag, { value: "Module" }));
/*! virtual:vike:global-entry:server [vike:pluginModuleBanner] */
const pageFilesLazy = {};
const pageFilesEager = {};
const pageFilesExportNamesLazy = {};
const pageFilesExportNamesEager = {};
const pageFilesList = [];
const neverLoaded = {};
const pageConfigsSerialized = [
  {
    pageId: "/pages/index",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/", "definedAtLocation": "/pages/index/" },
    loadVirtualFilePageEntry: () => ({ moduleId: "virtual:vike:page-entry:server:/pages/index", moduleExportsPromise: import("./entries/pages_index.mjs") }),
    configValuesSerialized: {
      ["isClientRuntimeLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  },
  {
    pageId: "/pages/cursos",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/cursos", "definedAtLocation": "/pages/cursos/" },
    loadVirtualFilePageEntry: () => ({ moduleId: "virtual:vike:page-entry:server:/pages/cursos", moduleExportsPromise: import("./entries/pages_cursos.mjs") }),
    configValuesSerialized: {
      ["isClientRuntimeLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["route"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "/pages/cursos/+route.ts", "fileExportPathToShowToUser": [] },
        valueSerialized: {
          type: "plus-file",
          exportValues: import2
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  },
  {
    pageId: "/pages/cursos/@state/@city/@slug",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/cursos/@state/@city/@slug", "definedAtLocation": "/pages/cursos/@state/@city/@slug/" },
    loadVirtualFilePageEntry: () => ({ moduleId: "virtual:vike:page-entry:server:/pages/cursos/@state/@city/@slug", moduleExportsPromise: import("./entries/pages_cursos_-state_-city_-slug.mjs") }),
    configValuesSerialized: {
      ["isClientRuntimeLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["route"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "/pages/cursos/@state/@city/@slug/+route.ts", "fileExportPathToShowToUser": [] },
        valueSerialized: {
          type: "plus-file",
          exportValues: import3
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  }
];
const pageConfigGlobalSerialized = {
  configValuesSerialized: {}
};
const pageFilesLazyIsomorph1 = /* @__PURE__ */ Object.assign({});
const pageFilesLazyIsomorph = { ...pageFilesLazyIsomorph1 };
pageFilesLazy[".page"] = pageFilesLazyIsomorph;
const pageFilesLazyServer1 = /* @__PURE__ */ Object.assign({});
const pageFilesLazyServer = { ...pageFilesLazyServer1 };
pageFilesLazy[".page.server"] = pageFilesLazyServer;
const pageFilesEagerRoute1 = /* @__PURE__ */ Object.assign({});
const pageFilesEagerRoute = { ...pageFilesEagerRoute1 };
pageFilesEager[".page.route"] = pageFilesEagerRoute;
const pageFilesExportNamesEagerClient1 = /* @__PURE__ */ Object.assign({});
const pageFilesExportNamesEagerClient = { ...pageFilesExportNamesEagerClient1 };
pageFilesExportNamesEager[".page.client"] = pageFilesExportNamesEagerClient;
const virtualFileExportsGlobalEntry = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  neverLoaded,
  pageConfigGlobalSerialized,
  pageConfigsSerialized,
  pageFilesEager,
  pageFilesExportNamesEager,
  pageFilesExportNamesLazy,
  pageFilesLazy,
  pageFilesList
}, Symbol.toStringTag, { value: "Module" }));
/*! virtual:@brillout/vite-plugin-server-entry:serverEntry [vike:pluginModuleBanner] */
{
  const assetsManifest = {
  "_chunk-B9bfo-Uh.js": {
    "file": "assets/chunks/chunk-B9bfo-Uh.js",
    "name": "school",
    "imports": [
      "_chunk-LOchvrxB.js"
    ]
  },
  "_chunk-Bg5VY5Ee.js": {
    "file": "assets/chunks/chunk-Bg5VY5Ee.js",
    "name": "users",
    "imports": [
      "_chunk-LOchvrxB.js"
    ]
  },
  "_chunk-Chflhp3s.js": {
    "file": "assets/chunks/chunk-Chflhp3s.js",
    "name": "renderPageClient"
  },
  "_chunk-Dsq9SuiG.js": {
    "file": "assets/chunks/chunk-Dsq9SuiG.js",
    "name": "urlHelpers",
    "imports": [
      "_chunk-LOchvrxB.js"
    ]
  },
  "_chunk-LOchvrxB.js": {
    "file": "assets/chunks/chunk-LOchvrxB.js",
    "name": "Loading",
    "imports": [
      "_chunk-Chflhp3s.js"
    ],
    "css": [
      "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
      "assets/static/src_index-b3c78705.K3oEMG7c.css"
    ]
  },
  "_src_index-b3c78705.K3oEMG7c.css": {
    "file": "assets/static/src_index-b3c78705.K3oEMG7c.css",
    "src": "_src_index-b3c78705.K3oEMG7c.css"
  },
  "_vike-react-b64a028b.BcWtY8Ol.css": {
    "file": "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
    "src": "_vike-react-b64a028b.BcWtY8Ol.css"
  },
  "node_modules/vike/dist/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.Cdi01Bn1.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-Chflhp3s.js"
    ],
    "dynamicImports": [
      "virtual:vike:page-entry:client:/pages/index",
      "virtual:vike:page-entry:client:/pages/cursos",
      "virtual:vike:page-entry:client:/pages/cursos/@state/@city/@slug"
    ]
  },
  "src/assets/banner_mem.jpg": {
    "file": "assets/static/banner_mem.BkP88hwf.jpg",
    "src": "src/assets/banner_mem.jpg"
  },
  "src/assets/doctor-group1.png": {
    "file": "assets/static/doctor-group1.DbdYUOtH.png",
    "src": "src/assets/doctor-group1.png"
  },
  "virtual:vike:page-entry:client:/pages/cursos": {
    "file": "assets/entries/pages_cursos.C6Uoz0B3.js",
    "name": "entries/pages/cursos",
    "src": "virtual:vike:page-entry:client:/pages/cursos",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-LOchvrxB.js",
      "_chunk-Dsq9SuiG.js",
      "_chunk-B9bfo-Uh.js",
      "_chunk-Chflhp3s.js"
    ],
    "css": [
      "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
      "assets/static/src_index-b3c78705.K3oEMG7c.css"
    ]
  },
  "virtual:vike:page-entry:client:/pages/cursos/@state/@city/@slug": {
    "file": "assets/entries/pages_cursos_-state_-city_-slug.CmiVCC7E.js",
    "name": "entries/pages/cursos/@state/@city/@slug",
    "src": "virtual:vike:page-entry:client:/pages/cursos/@state/@city/@slug",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-LOchvrxB.js",
      "_chunk-B9bfo-Uh.js",
      "_chunk-Bg5VY5Ee.js",
      "_chunk-Chflhp3s.js"
    ],
    "css": [
      "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
      "assets/static/src_index-b3c78705.K3oEMG7c.css"
    ],
    "assets": [
      "assets/static/banner_mem.BkP88hwf.jpg"
    ]
  },
  "virtual:vike:page-entry:client:/pages/index": {
    "file": "assets/entries/pages_index.B3Gw9EAe.js",
    "name": "entries/pages/index",
    "src": "virtual:vike:page-entry:client:/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-LOchvrxB.js",
      "_chunk-Dsq9SuiG.js",
      "_chunk-Bg5VY5Ee.js",
      "_chunk-Chflhp3s.js"
    ],
    "css": [
      "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
      "assets/static/src_index-b3c78705.K3oEMG7c.css"
    ],
    "assets": [
      "assets/static/doctor-group1.DbdYUOtH.png"
    ]
  }
};
  const buildInfo = {
    "versionAtBuildTime": "0.4.253",
    "usesClientRouter": false,
    "viteConfigRuntime": {
      "root": "C:/Users/COLABORADOR.DESKTOP-PUJU6JM/Desktop/MEM_Catalogo",
      "build": {
        "outDir": "C:/Users/COLABORADOR.DESKTOP-PUJU6JM/Desktop/MEM_Catalogo/dist/"
      },
      "_baseViteOriginal": "/",
      "vitePluginServerEntry": {}
    }
  };
  setGlobalContext_prodBuildEntry({
    virtualFileExportsGlobalEntry,
    assetsManifest,
    buildInfo
  });
}

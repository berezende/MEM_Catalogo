import { createClient } from "@supabase/supabase-js";
/*! src/lib/supabase.ts [vike:pluginModuleBanner] */
const supabaseUrl = "https://vidduudezriknkhsfzjq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZGR1dWRlenJpa25raHNmempxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTE0NjcsImV4cCI6MjA4NjM4NzQ2N30.rBm7v3yB5q1w8D6O9QxwVlLI8nZrtx7wx68AqTFLDkk";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
/*! src/utils/urlHelpers.ts [vike:pluginModuleBanner] */
const slugify = (text) => {
  return text.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
};
const BRAZILIAN_STATES = [
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins"
];
const getOriginalStateName = (slug) => {
  return BRAZILIAN_STATES.find((state) => slugify(state) === slugify(slug));
};
export {
  supabase as a,
  getOriginalStateName as g,
  slugify as s
};

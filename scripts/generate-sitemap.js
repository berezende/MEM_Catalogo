
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega .env do root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BASE_URL = 'https://catalogo.melhoresescolasmedicas.com';

const slugify = (text) => {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD') // Decompose accented characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start
        .replace(/-+$/, ''); // Trim - from end
};

async function generateSitemap() {
    console.log('Generating Sitemap...');
    console.log(`Fetching data from Supabase...`);

    try {
        const { data: universities, error } = await supabase
            .from('Instituicoes')
            .select('*');

        if (error) {
            throw error;
        }

        const urls = new Set();
        const date = new Date().toISOString();

        // 1. Static Routes
        urls.add(`${BASE_URL}/`);
        urls.add(`${BASE_URL}/cursos`);
        urls.add(`${BASE_URL}/cursos/publica`);
        urls.add(`${BASE_URL}/cursos/particular`);

        // 2. Dynamic Routes from Supabase
        if (universities) {
            universities.forEach(row => {
                if (!row.name || !row.estado || !row.cidade) return;

                const stateSlug = slugify(row.estado);
                const citySlug = slugify(row.cidade);
                const uniSlug = slugify(row.name);

                // Structure: /cursos/:stateSlug/:citySlug/:uniSlug
                if (stateSlug && citySlug && uniSlug) {
                    const url = `${BASE_URL}/cursos/${stateSlug}/${citySlug}/${uniSlug}`;
                    urls.add(url);
                }

                // Also add state pages if SEO relevant
                if (stateSlug) {
                    urls.add(`${BASE_URL}/cursos/${stateSlug}`);
                }

                // Also add state/city pages
                if (stateSlug && citySlug) {
                    urls.add(`${BASE_URL}/cursos/${stateSlug}/${citySlug}`);
                }
            });
        }

        // 3. Generate XML
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

        urls.forEach(url => {
            xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;
        });

        xml += `</urlset>`;

        // 4. Write to public/sitemap.xml
        // Ensure public dir exists
        const publicDir = path.resolve(__dirname, '../public');
        if (!fs.existsSync(publicDir)) {
            console.log('Creating public directory...');
            fs.mkdirSync(publicDir);
        }

        const sitemapPath = path.join(publicDir, 'sitemap.xml');
        fs.writeFileSync(sitemapPath, xml);

        console.log(`Sitemap generated with ${urls.size} URLs at ${sitemapPath}`);

    } catch (error) {
        console.error('Error generating sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();


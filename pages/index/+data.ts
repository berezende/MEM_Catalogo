import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function data() {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const featuredUniversityNames = [
        'UNIVERSIDADE DE SÃO PAULO',
        'UNIVERSIDADE FEDERAL DO RIO DE JANEIRO',
        'UNIVERSIDADE FEDERAL DE MINAS GERAIS',
        'UNIVERSIDADE FEDERAL DE SERGIPE',
        'UNIVERSIDADE ESTADUAL DE CAMPINAS',
        'UNIVERSIDADE FEDERAL DO RIO GRANDE DO SUL',
        'UNIVERSIDADE ESTADUAL PAULISTA',
        'UNIVERSIDADE DE BRASÍLIA',
        'UNIVERSIDADE FEDERAL DE SANTA CATARINA'
    ];

    const { data: featuredUniversities, error } = await supabase
        .from('Instituicoes')
        .select('id, name, cidade, estado, logo')
        .in('name', featuredUniversityNames);

    if (error) {
        console.error('Error fetching featured universities:', error);
        return { featuredUniversities: [] };
    }

    return {
        featuredUniversities: featuredUniversities || []
    };
}


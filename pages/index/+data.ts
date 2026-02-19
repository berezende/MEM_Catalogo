import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function data() {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: featuredUniversities, error } = await supabase
        .from('Instituicoes')
        .select('id, name, cidade, estado, logo')
        .limit(9);

    if (error) {
        console.error('Error fetching featured universities:', error);
        return { featuredUniversities: [] };
    }

    return {
        featuredUniversities: featuredUniversities || []
    };
}

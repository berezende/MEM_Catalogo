import { createClient } from '@supabase/supabase-js';
import type { PageContextServer } from 'vike/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function data(pageContext: PageContextServer) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { routeParams } = pageContext;

    const { data: universities, error } = await supabase
        .from('Instituicoes')
        .select('id, name, cidade, estado, tipo, logo, ranking');

    if (error) {
        console.error('Error fetching universities:', error);
        return { universities: [], filters: routeParams || {} };
    }

    return {
        universities: universities || [],
        filters: {
            state: (routeParams as any)?.state || '',
            city: (routeParams as any)?.city || '',
            type: (routeParams as any)?.type || '',
            searchTerm: (routeParams as any)?.searchTerm || ''
        }
    };
}

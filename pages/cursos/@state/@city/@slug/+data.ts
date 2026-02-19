import { createClient } from '@supabase/supabase-js';
import type { PageContextServer } from 'vike/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const slugify = (text: string): string => {
    return text.toString().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
};

export async function data(pageContext: PageContextServer) {
    const { routeParams } = pageContext;
    const { state, city, slug } = routeParams as { state: string; city: string; slug: string };

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: universities, error } = await supabase
        .from('Instituicoes')
        .select('*');

    if (error) {
        console.error('Error fetching university:', error);
        return { university: null };
    }

    const university = universities?.find((u: any) => {
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
            website: university.website || '',
            vacancies: university.Qt_Vagas_Autorizadas || 'Não informado',
            periodization: university.Tipo_de_Periodicidade || 'Semestral',
            description: university.descricao || '',
            mensalidade: university.mensalidade || '',
            campus_name: university.Nome_do_Campus || '',
            address: university.endereco || '',
            address_number: university.numero_endereco || '',
            neighborhood: university.bairro || '',
            image: university.logo || 'https://s1.static.brasilescola.uol.com.br/be/vestibular/66f30f0386eaf116ba64518409582190.jpg',
            mec_rating: university.Valor_CC || '5',
            phone: university.telefone || 'Não Informado',
            creation_date: university.data_criacao ? new Date(university.data_criacao).getFullYear().toString() : 'Não informado',
            cpc: university.CPC || 'Não informado',
            ranking: university.ranking || 'Não informado'
        }
    };
}

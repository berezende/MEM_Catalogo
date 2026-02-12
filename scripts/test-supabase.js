
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega .env do root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Erro: Variáveis de ambiente VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não encontradas.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('Testando conexão com Supabase...');
    console.log('URL:', supabaseUrl);
    console.log('Key (parcial):', supabaseKey.substring(0, 10) + '...');

    try {
        const { data, error } = await supabase
            .from('Instituicoes')
            .select('*')
            .limit(1);

        if (error) {
            console.error('Erro ao buscar dados:', error);
            if (error.code === '42P01') {
                console.error('Dica: A tabela "Instituicoes" não existe. Verifique o nome exato no Supabase (maiúsculas/minúsculas importam).');
                // Tenta listar tabelas (requer permissões administrativas, pode falhar com anon key)
            }
        } else {
            console.log('Sucesso! Dados retornados:', data);
            if (data.length === 0) {
                console.warn('Aviso: A consulta retornou 0 resultados. Verifique se a tabela tem dados e se as políticas RLS permitem leitura pública (anon).');
            } else {
                console.log('Estrutura da primeira linha:', Object.keys(data[0]));
            }
        }
    } catch (err) {
        console.error('Erro inesperado:', err);
    }
}

testConnection();

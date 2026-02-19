import { useData } from 'vike-react/useData';

export function Head() {
    const { filters } = useData<{ filters: any }>();

    const buildTitle = () => {
        const parts = ['MEM | Catálogo de Medicina'];
        if (filters?.type) parts.push(filters.type === 'publica' ? 'Pública' : 'Particular');
        if (filters?.state) parts.push(`em ${filters.state}`);
        return parts.join(' ');
    };

    return (
        <>
            <title>{buildTitle()}</title>
            <meta name="description" content="Encontre cursos de medicina em todo o Brasil." />
        </>
    );
}

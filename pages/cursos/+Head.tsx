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
            <link rel="icon" type="image/png" href="https://melhoresescolasmedicas.com/wp-content/uploads/2023/12/Group-22.png" />
            {/* Google Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700&family=Open+Sans:wght@300;400;600;700&display=swap"
                rel="stylesheet"
            />
        </>
    );
}

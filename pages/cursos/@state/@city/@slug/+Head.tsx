import { useData } from 'vike-react/useData';

export function Head() {
    const { university } = useData<{ university: any }>();

    if (!university) {
        return <title>Universidade não encontrada | MEM</title>;
    }

    const title = `${university.name} - Medicina em ${university.city}, ${university.state} | MEM`;
    const description = `Curso de Medicina na ${university.name} em ${university.city}, ${university.state}. Instituição ${university.type}. Confira notas de corte, endereço e tudo sobre o curso.`;

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={`medicina ${university.city}, ${university.name}, faculdade medicina`} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="article" />
            <link rel="icon" type="image/png" href="https://melhoresescolasmedicas.com/wp-content/uploads/2023/12/Group-22.png" />
        </>
    );
}

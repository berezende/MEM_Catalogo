import { useData } from 'vike-react/useData';
import UniversityDetailView from '@/components/UniversityDetailView';
interface PageData {
    university: any | null;
}

export default function UniversityDetailPage() {
    const { university } = useData<PageData>();

    const handleBack = () => {
        window.history.back();
    };

    if (!university) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Universidade não encontrada</h2>
                    <button onClick={handleBack} className="mt-4 text-blue-600">
                        Voltar ao Catálogo
                    </button>
                </div>
            </div>
        );
    }

    return <UniversityDetailView university={university} onBack={handleBack} />;
}

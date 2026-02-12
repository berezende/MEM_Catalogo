
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    name?: string;
    type?: string;
    image?: string;
    url?: string;
    keywords?: string;
    canonical?: string;
}

const DEFAULT_IMAGE = 'https://melhoresescolasmedicas.com/wp-content/uploads/2023/12/Group-22.png';
const SITE_NAME = 'MEM | Melhores Escolas Médicas';

const SEO: React.FC<SEOProps> = ({ title, description, name, type, image, url, keywords, canonical }) => {
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const metaImage = image || DEFAULT_IMAGE;

    return (
        <Helmet>
            { /* Standard metadata tags */}
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
            {canonical && <link rel="canonical" href={canonical} />}

            { /* Facebook / OpenGraph tags */}
            <meta property="og:site_name" content={SITE_NAME} />
            {type && <meta property="og:type" content={type} />}
            {title && <meta property="og:title" content={title} />}
            {description && <meta property="og:description" content={description} />}
            <meta property="og:image" content={metaImage} />
            {currentUrl && <meta property="og:url" content={currentUrl} />}
            <meta property="og:locale" content="pt_BR" />

            { /* Twitter tags */}
            <meta name="twitter:card" content="summary_large_image" />
            {name && <meta name="twitter:creator" content={name} />}
            {title && <meta name="twitter:title" content={title} />}
            {description && <meta name="twitter:description" content={description} />}
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
};

export default SEO;

import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import '@/index.css';

export default function onRenderClient(pageContext) {
    // Ensure we match the structure of server render
    hydrateRoot(
        document.getElementById('root')!,
        <React.StrictMode>
            <HelmetProvider>
                <BrowserRouterWrapper>
                    <App />
                </BrowserRouterWrapper>
            </HelmetProvider>
        </React.StrictMode>
    );
}

// Wrapper to handle potential basename logic if needed, 
// though standard BrowserRouter is usually fine.
// We use BrowserRouter directly to match onRenderHtml's StaticRouter structure (minus context)
function BrowserRouterWrapper({ children }: { children: React.ReactNode }) {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    );
}

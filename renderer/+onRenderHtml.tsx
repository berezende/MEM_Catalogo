import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { escapeInject, dangerouslySkipEscape } from 'vike/server';
import App from '@/App';
import '@/index.css';

export default async function onRenderHtml(pageContext) {
    const helmetContext: any = {};

    // Render the App to string
    const pageHtml = renderToString(
        <React.StrictMode>
            <HelmetProvider context={helmetContext}>
                <StaticRouter location={pageContext.urlOriginal}>
                    <App />
                </StaticRouter>
            </HelmetProvider>
        </React.StrictMode>
    );

    const { helmet } = helmetContext;

    // Extract Helmet data. 
    // react-helmet-async's server usage returns objects with .toString() methods
    const title = helmet && helmet.title ? helmet.title.toString() : '';
    const meta = helmet && helmet.meta ? helmet.meta.toString() : '';
    const link = helmet && helmet.link ? helmet.link.toString() : '';
    const script = helmet && helmet.script ? helmet.script.toString() : '';

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${dangerouslySkipEscape(title)}
        ${dangerouslySkipEscape(meta)}
        ${dangerouslySkipEscape(link)}
        ${dangerouslySkipEscape(script)}
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

    return {
        documentHtml,
        pageContext: {
            // We can pass some data to the client if needed
        }
    };
}

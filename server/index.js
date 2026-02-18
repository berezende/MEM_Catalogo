import express from 'express';
import { renderPage } from 'vike/server';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = path.resolve(__dirname, '..');
const isProduction = process.env.NODE_ENV === 'production';

startServer();

async function startServer() {
    const app = express();

    app.use(compression());

    // Servir arquivos estáticos em produção ou desenvolvimento
    if (isProduction) {
        const sirv = (await import('sirv')).default;
        app.use(sirv(`${root}/dist/client`));
    } else {
        // Integração com Vite em desenvolvimento
        const vite = await import('vite');
        const viteDevMiddleware = (
            await vite.createServer({
                root,
                server: { middlewareMode: true },
                appType: 'custom', // disable Vite's own HTML serving logic
            })
        ).middlewares;
        app.use(viteDevMiddleware);
    }

    // Intercepta todas as requisições para renderizar a página com Vike
    app.get('*', async (req, res, next) => {
        const pageContextInit = {
            urlOriginal: req.originalUrl,
        };
        const pageContext = await renderPage(pageContextInit);
        const { httpResponse } = pageContext;

        if (!httpResponse) {
            return next();
        } else {
            const { body, statusCode, headers, earlyHints } = httpResponse;
            if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
            headers.forEach(([name, value]) => res.setHeader(name, value));
            res.status(statusCode);
            // For streaming (recommended for React 18 + Suspense):
            // httpResponse.pipe(res); 
            // But we are using body string for now for simplicity unless we switch to stream
            res.send(body);
        }
    });

    const port = process.env.PORT || 3000;
    app.listen(port);
    console.log(`Server running at http://localhost:${port}`);
}

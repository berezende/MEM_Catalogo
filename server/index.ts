import express from 'express';
import compression from 'compression';
import { renderPage } from 'vike/server';
import { createServer as createViteServer } from 'vite';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

async function startServer() {
    const app = express();

    app.use(compression());

    if (isProduction) {
        const sirv = (await import('sirv')).default;
        app.use(sirv('dist/client', { extensions: [] }));
    } else {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'custom'
        });
        app.use(vite.middlewares);
    }

    app.get('*', async (req, res, next) => {
        const pageContextInit = { urlOriginal: req.originalUrl };
        const pageContext = await renderPage(pageContextInit);

        if (pageContext.errorWhileRendering) {
            console.error('SSR Error:', pageContext.errorWhileRendering);
        }

        const { httpResponse } = pageContext;
        if (!httpResponse) return next();

        const { body, statusCode, headers } = httpResponse;
        headers.forEach(([name, value]) => res.setHeader(name, value));
        res.status(statusCode).send(body);
    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

startServer();

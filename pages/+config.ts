
import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';

export default {
    extends: vikeReact,
    ssr: true,
    prerender: false,
    stream: false,
    passToClient: ['pageProps', 'routeParams'],
} satisfies Config;

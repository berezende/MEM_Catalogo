
import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';

export default {
    extends: vikeReact,
    ssr: true,
    stream: true,
    passToClient: ['pageProps', 'routeParams'],
} satisfies Config;

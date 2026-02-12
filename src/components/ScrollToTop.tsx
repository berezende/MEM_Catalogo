import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, search, state } = useLocation();
    const navType = useNavigationType();

    useEffect(() => {
        // If it's a POP action (browser back/forward), 
        // we typically want to let the browser handle scroll restoration.
        if (navType === 'POP') {
            return;
        }

        // Check if we are in a "restoring scroll" state explicitly managed by our app
        const fromCatalogState = (state as any)?.fromCatalogState;
        const currentPath = pathname + search;

        // If the state indicates we should restore scroll to this specific path,
        // we skip scrolling to top and let the component handle it.
        if (fromCatalogState?.previousPath === currentPath && fromCatalogState?.scrollY > 0) {
            return;
        }

        // Otherwise, scroll to top
        window.scrollTo(0, 0);
    }, [pathname, search, state, navType]);

    return null;
};

export default ScrollToTop;

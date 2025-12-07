import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import PageLoader from './Components/PageLoader';

const appName = import.meta.env.VITE_APP_NAME || 'SkyHouse Property';

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <PageLoader>
                <App {...props} />
            </PageLoader>
        );
    },
    progress: {
        color: '#F5D87F',
    },
});

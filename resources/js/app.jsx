import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { trackPageView, initDelegatedTracking } from '@/tracker';

const appName = import.meta.env.VITE_APP_NAME || 'SkyHouse Property';

const isAdmin = () => window.location.pathname.startsWith('/admin');

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);

    // Delegated click listener for data-track-* attributes
    initDelegatedTracking();

    // Track the initial hard load — router 'navigate' may not fire for this
    if (!isAdmin()) {
      trackPageView();
    }
  },
  progress: {
    color: '#3B82F6',
  },
});

// Track subsequent SPA navigations
let initialLoad = true;
router.on('navigate', () => {
  if (initialLoad) {
    // Already tracked above in setup(); skip the first navigate event
    initialLoad = false;
    return;
  }
  if (!isAdmin()) trackPageView();
});

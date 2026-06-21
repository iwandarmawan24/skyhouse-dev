import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { trackPageView, initDelegatedTracking } from '@/tracker';

const appName = import.meta.env.VITE_APP_NAME || 'SkyHouse Property';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);

    // Single delegated click listener for data-track-* attributes
    initDelegatedTracking();
  },
  progress: {
    color: '#3B82F6',
  },
});

// Fire page_view on every Inertia navigation (skip admin)
router.on('navigate', () => {
  if (window.location.pathname.startsWith('/admin')) return;
  trackPageView();
});

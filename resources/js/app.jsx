import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { trackPageView, trackTimeOnPage, initDelegatedTracking, onNavigate } from '@/tracker';

const appName = import.meta.env.VITE_APP_NAME || 'SkyHouse Property';

const isAdmin = () => window.location.pathname.startsWith('/admin');

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);

    // Single delegated listeners — clicks, forms, copy, tel/mailto, WhatsApp
    initDelegatedTracking();

    // Track the initial hard load (direct URL / refresh)
    if (!isAdmin()) trackPageView();
  },
  progress: { color: '#3B82F6' },
});

// Track subsequent SPA navigations
let initialLoad = true;
router.on('navigate', () => {
  if (initialLoad) {
    // Initial page_view already fired above in setup()
    initialLoad = false;
    return;
  }
  if (!isAdmin()) {
    onNavigate();     // reset scroll milestones + page timer
    trackPageView();
  }
});

// Send time-on-page just before the user leaves
router.on('before', () => {
  if (!isAdmin()) trackTimeOnPage();
});

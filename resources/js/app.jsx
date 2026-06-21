import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import axios from 'axios';

const appName = import.meta.env.VITE_APP_NAME || 'SkyHouse Property';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <App {...props} />
    );
  },
  progress: {
    color: '#3B82F6',
  },
});

// Global page view tracker — fires on every Inertia navigation
router.on('navigate', () => {
  // Skip admin pages
  if (window.location.pathname.startsWith('/admin')) return;

  axios.post('/api/tracker', {
    event_type: 'page_view',
    page_url: window.location.pathname + window.location.search,
    referrer: document.referrer || null,
    meta: {},
  }).catch(() => {});
});

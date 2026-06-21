import { trackEvent } from '@/tracker';

// Legacy hook — existing callers keep the same `track(eventType, meta)` API.
// Internally routes to the privacy-compliant tracker module.
const LEGACY_TARGET_MAP = {
    contact_submit:        ['contact_submit', 'cta'],
    wa_click:              ['wa_click',       'cta'],
    whatsapp_click:        ['wa_click',       'cta'],
    unit_contact:          ['contact_click',  'unit'],
    unit_brochure:         ['download_click', 'unit'],
    article_view:          ['article_view',   'article'],
    media_highlight_click: ['click',          'media'],
};

const useTracker = () => {
    const track = (eventType, meta = {}) => {
        const [mappedType, mappedTarget] = LEGACY_TARGET_MAP[eventType] ?? [eventType, null];
        const { unit_name, title, subject, url, ...rest } = meta;
        trackEvent(
            mappedType,
            mappedTarget,
            meta.id ?? null,
            unit_name ?? title ?? subject ?? null,
            { ...rest, ...(url ? { url } : {}) },
        );
    };

    return { track };
};

export default useTracker;

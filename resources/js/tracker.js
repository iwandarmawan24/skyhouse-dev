/**
 * Privacy-compliant client-side tracker.
 *
 * - Calls POST /api/track (rate-limited, session-cookie managed server-side)
 * - Never sends raw IP or UA — those are handled server-side
 * - Delegated click listener reads data-track-type / data-track-id / data-track-label
 *   from the closest ancestor that has them, so no per-element JS needed
 */

const ENDPOINT = '/api/track';

function post(payload) {
    navigator.sendBeacon
        ? navigator.sendBeacon(ENDPOINT, new Blob([JSON.stringify(payload)], { type: 'application/json' }))
        : fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), keepalive: true }).catch(() => {});
}

/**
 * Track a page view. Called by app.jsx on every Inertia navigate event.
 */
export function trackPageView(properties = {}) {
    post({
        event_type: 'page_view',
        event_target: 'page',
        page_url: window.location.pathname + window.location.search,
        referrer: document.referrer || null,
        properties,
    });
}

/**
 * Track an explicit event.
 * @param {string} eventType  - e.g. 'contact_submit' | 'wa_click' | 'download_click'
 * @param {string} eventTarget - category: 'unit' | 'article' | 'media' | 'cta' | 'page'
 * @param {string|null} targetId    - UUID / slug of the resource
 * @param {string|null} targetLabel - human-readable label (unit name, article title…)
 * @param {object} properties - arbitrary extra context
 */
export function trackEvent(eventType, eventTarget = null, targetId = null, targetLabel = null, properties = {}) {
    post({
        event_type:   eventType,
        event_target: eventTarget,
        target_id:    targetId,
        target_label: targetLabel,
        page_url:     window.location.pathname + window.location.search,
        referrer:     document.referrer || null,
        properties,
    });
}

/**
 * Attach a single delegated click listener that auto-fires trackEvent
 * whenever the user clicks an element (or its ancestor) carrying:
 *   data-track-type    — maps to event_target
 *   data-track-id      — maps to target_id
 *   data-track-label   — maps to target_label
 *   data-track-action  — maps to event_type (defaults to 'click')
 *
 * Call once on app boot.
 */
export function initDelegatedTracking() {
    document.addEventListener('click', (e) => {
        const el = e.target.closest('[data-track-type]');
        if (!el) return;

        trackEvent(
            el.dataset.trackAction || 'click',
            el.dataset.trackType   || null,
            el.dataset.trackId     || null,
            el.dataset.trackLabel  || el.textContent?.trim().slice(0, 100) || null,
        );
    }, { passive: true });
}

/**
 * Comprehensive client-side tracker.
 * Tracks: page views, every click (with context), scroll depth,
 * outbound links, time on page, form submissions, copy events.
 * Raw IP/UA handled server-side only — never sent from here.
 */

const ENDPOINT = '/api/track';

// ─── Core post ───────────────────────────────────────────────────────────────

function post(payload) {
    fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: JSON.stringify(payload),
        keepalive: true,
    }).then(res => {
        if (!res.ok) res.text().then(t => console.error('[tracker] POST failed', res.status, t));
    }).catch(err => console.error('[tracker] POST error', err));
}

function currentPage() {
    return window.location.pathname + window.location.search;
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function trackPageView(properties = {}) {
    post({
        event_type:   'page_view',
        event_target: 'page',
        page_url:     currentPage(),
        referrer:     document.referrer || null,
        properties,
    });
}

export function trackEvent(eventType, eventTarget = null, targetId = null, targetLabel = null, properties = {}) {
    post({
        event_type:   eventType,
        event_target: eventTarget,
        target_id:    targetId   ? String(targetId).slice(0, 100)   : null,
        target_label: targetLabel ? String(targetLabel).slice(0, 200) : null,
        page_url:     currentPage(),
        referrer:     document.referrer || null,
        properties,
    });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function nearestSection(el) {
    const s = el.closest('[data-section]');
    return s ? s.dataset.section : null;
}

function elementLabel(el) {
    return (
        el.getAttribute('aria-label') ||
        el.getAttribute('title') ||
        el.getAttribute('alt') ||
        el.textContent?.trim().replace(/\s+/g, ' ').slice(0, 100) ||
        null
    );
}

function elementTarget(el) {
    const tag = el.tagName.toLowerCase();
    if (tag === 'a')      return 'link';
    if (tag === 'button') return 'button';
    if (tag === 'input' || tag === 'select' || tag === 'textarea') return 'input';
    if (tag === 'img')    return 'image';
    if (tag === 'form')   return 'form';
    return 'element';
}

function isOutbound(href) {
    try { return new URL(href).hostname !== window.location.hostname; }
    catch { return false; }
}

// ─── Per-page state (reset on each Inertia navigate) ─────────────────────────

let pageStartTime = Date.now();
let scrollMilestones = new Set();
let scrollListenerAttached = false;

function resetPageState() {
    pageStartTime    = Date.now();
    scrollMilestones = new Set();
}

// ─── Scroll depth tracker ────────────────────────────────────────────────────

function attachScrollTracker() {
    if (scrollListenerAttached) return;
    scrollListenerAttached = true;

    const checkScroll = () => {
        const scrolled    = window.scrollY + window.innerHeight;
        const total       = document.documentElement.scrollHeight;
        const pct         = total > 0 ? Math.round((scrolled / total) * 100) : 0;
        const milestones  = [25, 50, 75, 90, 100];

        milestones.forEach(m => {
            if (pct >= m && !scrollMilestones.has(m)) {
                scrollMilestones.add(m);
                trackEvent('scroll_depth', 'page', null, `${m}%`, { depth_pct: m });
            }
        });
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
}

// ─── Time on page (fires before navigation away) ─────────────────────────────

export function trackTimeOnPage() {
    const seconds = Math.round((Date.now() - pageStartTime) / 1000);
    if (seconds < 2) return; // ignore instant bounces
    trackEvent('time_on_page', 'page', null, null, { seconds });
}

// ─── All-click delegated listener ────────────────────────────────────────────

function handleClick(e) {
    const el = e.target.closest('a, button, [data-track-type], [role="button"], input[type="submit"], input[type="button"]')
            ?? e.target;

    // 1. Explicit data-track-* takes priority
    const tracked = e.target.closest('[data-track-type]');
    if (tracked) {
        trackEvent(
            tracked.dataset.trackAction || 'click',
            tracked.dataset.trackType   || null,
            tracked.dataset.trackId     || null,
            tracked.dataset.trackLabel  || elementLabel(tracked),
            { section: nearestSection(tracked) },
        );
        return;
    }

    // 2. Outbound links
    const anchor = e.target.closest('a[href]');
    if (anchor) {
        const href = anchor.getAttribute('href') || '';
        if (isOutbound(href)) {
            trackEvent('outbound_link', 'link', href, elementLabel(anchor) || href, {
                section: nearestSection(anchor),
                href,
            });
            return;
        }
        // Internal link — track as nav_click with the path
        if (href && !href.startsWith('#') && !href.startsWith('javascript')) {
            trackEvent('nav_click', 'link', null, elementLabel(anchor) || href, {
                section: nearestSection(anchor),
                href,
            });
            return;
        }
    }

    // 3. Buttons that aren't inside an anchor
    const btn = e.target.closest('button, [role="button"], input[type="submit"]');
    if (btn && !e.target.closest('a')) {
        trackEvent('button_click', 'button', btn.id || null, elementLabel(btn), {
            section: nearestSection(btn),
        });
    }
}

// ─── Form submit listener ────────────────────────────────────────────────────

function handleFormSubmit(e) {
    const form  = e.target;
    const label = form.getAttribute('aria-label')
               || form.id
               || form.querySelector('h1,h2,h3,legend')?.textContent?.trim()?.slice(0, 100)
               || null;
    trackEvent('form_submit', 'form', form.id || null, label, {
        action:  form.action || null,
        method:  form.method || 'get',
        section: nearestSection(form),
    });
}

// ─── Copy listener ───────────────────────────────────────────────────────────

function handleCopy() {
    const selection = window.getSelection()?.toString().trim().slice(0, 80) || null;
    trackEvent('copy', 'page', null, selection, { section: null });
}

// ─── Phone / email tel: / mailto: clicks ────────────────────────────────────

function handleSpecialLinks(e) {
    const a = e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const type = href.startsWith('tel:') ? 'phone_click' : 'email_click';
    trackEvent(type, 'cta', null, href.replace(/^(tel:|mailto:)/, ''), {
        section: nearestSection(a),
    });
}

// ─── WhatsApp link tracker ───────────────────────────────────────────────────

function handleWhatsApp(e) {
    const a = e.target.closest('a[href*="wa.me"], a[href*="whatsapp"]');
    if (!a) return;
    trackEvent('wa_click', 'cta', null, 'WhatsApp', { section: nearestSection(a) });
}

// ─── Init — call once on app boot ────────────────────────────────────────────

let inited = false;
export function initDelegatedTracking() {
    if (inited) return;
    inited = true;

    document.addEventListener('click',  handleClick,       { passive: true });
    document.addEventListener('click',  handleSpecialLinks, { passive: true });
    document.addEventListener('click',  handleWhatsApp,    { passive: true });
    document.addEventListener('submit', handleFormSubmit,  { capture: true });
    document.addEventListener('copy',   handleCopy,        { passive: true });

    attachScrollTracker();
}

// ─── Call on each Inertia navigate to reset per-page trackers ────────────────
export function onNavigate() {
    resetPageState();
    scrollMilestones = new Set();
}

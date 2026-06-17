import React, { useRef, useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PageLayout from '@/Components/Frontend/PageLayout';
import '@css/frontend.css';
import '@css/frontend/news-page.css';

export default function Policy({ policy, pageTitle, policyType }) {
    const contentRef = useRef(null);
    const [toc, setToc] = useState([]);
    const [activeId, setActiveId] = useState('');

    const isTerms = policyType === 'terms';

    // Per-theme hero color tokens
    const hero = isTerms
        ? {
            bg: 'linear-gradient(135deg, #1153BD 0%, #0a3a8a 100%)',
            ring: 'rgba(255,255,255,0.08)',
            ring2: 'rgba(255,255,255,0.05)',
            breadcrumbMuted: 'rgba(255,255,255,0.55)',
            chevron: 'rgba(255,255,255,0.35)',
            breadcrumbActive: 'rgba(255,255,255,0.9)',
            badgeBg: 'rgba(255,255,255,0.12)',
            badgeBorder: 'rgba(255,255,255,0.2)',
            badgeText: 'rgba(255,255,255,0.9)',
            heading: '#ffffff',
            meta: 'rgba(255,255,255,0.65)',
        }
        : {
            bg: 'linear-gradient(135deg, #FFFBEB 0%, #F5D87F 100%)',
            ring: 'rgba(30,58,138,0.07)',
            ring2: 'rgba(30,58,138,0.04)',
            breadcrumbMuted: 'rgba(30,58,138,0.45)',
            chevron: 'rgba(30,58,138,0.3)',
            breadcrumbActive: '#1E3A8A',
            badgeBg: 'rgba(30,58,138,0.08)',
            badgeBorder: 'rgba(30,58,138,0.15)',
            badgeText: '#1E3A8A',
            heading: '#1E3A8A',
            meta: '#4A5568',
        };

    // Extract headings from rendered WYSIWYG content and build TOC
    useEffect(() => {
        if (!contentRef.current || !policy) return;

        const headings = contentRef.current.querySelectorAll('h2, h3');
        const items = [];

        headings.forEach((heading, index) => {
            const id = `toc-${index}`;
            heading.id = id;
            items.push({ id, text: heading.textContent, level: heading.tagName });
        });

        setToc(items);
        if (items.length > 0) setActiveId(items[0].id);
    }, [policy]);

    // Highlight active section as user scrolls
    useEffect(() => {
        if (toc.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: '-80px 0px -65% 0px', threshold: 0 }
        );

        toc.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [toc]);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <>
            <Head title={pageTitle} />
            <PageLayout showBackgroundDefault>

                {/* ── Hero Banner ─────────────────────────────── */}
                <section style={{ position: 'relative', overflow: 'hidden', minHeight: '360px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ position: 'absolute', inset: 0, background: hero.bg }} />

                    {/* decorative rings */}
                    <div style={{
                        position: 'absolute', top: '-80px', right: '-80px',
                        width: '480px', height: '480px', borderRadius: '50%',
                        border: `1px solid ${hero.ring}`, pointerEvents: 'none',
                    }} />
                    <div style={{
                        position: 'absolute', bottom: '-100px', left: '-60px',
                        width: '360px', height: '360px', borderRadius: '50%',
                        border: `1px solid ${hero.ring2}`, pointerEvents: 'none',
                    }} />

                    <div className="padding-global" style={{
                        position: 'relative', zIndex: 1, width: '100%',
                        paddingTop: '9rem', paddingBottom: '4.5rem',
                    }}>
                        <div className="container-large">
                            {/* breadcrumb */}
                            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                <Link href="/" style={{ color: hero.breadcrumbMuted, fontSize: '0.85rem', fontWeight: 500 }}>
                                    Home
                                </Link>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hero.chevron} strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span style={{ color: hero.breadcrumbActive, fontSize: '0.85rem', fontWeight: 500 }}>
                                    {pageTitle}
                                </span>
                            </nav>

                            {/* type badge */}
                            <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                background: hero.badgeBg,
                                border: `1px solid ${hero.badgeBorder}`,
                                color: hero.badgeText,
                                fontSize: '0.72rem', fontWeight: 700,
                                letterSpacing: '0.08em', textTransform: 'uppercase',
                                padding: '0.3rem 0.85rem', borderRadius: '999px',
                                marginBottom: '1.25rem',
                            }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Legal Document
                            </span>

                            <h1 style={{
                                color: hero.heading, margin: 0,
                                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                                fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15,
                            }}>
                                {policy?.title || pageTitle}
                            </h1>

                            {/* metadata row */}
                            {policy && (policy.version || policy.updatedAt) && (
                                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', marginTop: '1.25rem' }}>
                                    {policy.version && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: hero.meta, fontSize: '0.85rem' }}>
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" strokeLinecap="round" />
                                            </svg>
                                            Version {policy.version}
                                        </span>
                                    )}
                                    {policy.updatedAt && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: hero.meta, fontSize: '0.85rem' }}>
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                            Last updated {policy.updatedAt}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* ── Content Section ─────────────────────────── */}
                <section style={{ background: '#FDFEF0', paddingTop: '4rem', paddingBottom: '6rem' }}>
                    <div className="padding-global">
                        <div className="container-large">
                            {policy ? (
                                <div className="policy-layout">

                                    {/* Sticky TOC sidebar — desktop only */}
                                    {toc.length > 0 && (
                                        <aside className="policy-toc">
                                            <div style={{
                                                background: '#fff',
                                                border: '1px solid rgba(30,58,138,0.1)',
                                                borderRadius: '1rem',
                                                padding: '1.5rem',
                                                position: 'sticky',
                                                top: '100px',
                                            }}>
                                                <p style={{
                                                    fontSize: '0.7rem', fontWeight: 700,
                                                    letterSpacing: '0.1em', textTransform: 'uppercase',
                                                    color: '#1E3A8A', marginBottom: '1rem', marginTop: 0,
                                                }}>
                                                    On this page
                                                </p>
                                                <nav>
                                                    {toc.map((item) => (
                                                        <button
                                                            key={item.id}
                                                            onClick={() => scrollToSection(item.id)}
                                                            style={{
                                                                display: 'block', width: '100%', textAlign: 'left',
                                                                background: 'none', border: 'none', cursor: 'pointer',
                                                                padding: `0.375rem 0.75rem 0.375rem ${item.level === 'H3' ? '1.5rem' : '0.75rem'}`,
                                                                fontSize: '0.825rem', lineHeight: 1.45,
                                                                color: activeId === item.id ? '#1E3A8A' : '#718096',
                                                                fontWeight: activeId === item.id ? 600 : 400,
                                                                borderLeft: `2px solid ${activeId === item.id ? '#1E3A8A' : 'transparent'}`,
                                                                borderRadius: '0 0.25rem 0.25rem 0',
                                                                transition: 'color 0.2s, border-color 0.2s',
                                                            }}
                                                        >
                                                            {item.text}
                                                        </button>
                                                    ))}
                                                </nav>
                                            </div>
                                        </aside>
                                    )}

                                    {/* Main prose content */}
                                    <div
                                        ref={contentRef}
                                        className="prose policy-prose"
                                        dangerouslySetInnerHTML={{ __html: policy.content }}
                                    />
                                </div>
                            ) : (
                                /* Empty state */
                                <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                                    <div style={{
                                        width: '72px', height: '72px',
                                        background: 'rgba(30,58,138,0.07)',
                                        borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 1.5rem',
                                    }}>
                                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                                        </svg>
                                    </div>
                                    <h3 style={{ color: '#1E3A8A', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                                        Page Not Available
                                    </h3>
                                    <p style={{ color: '#718096', maxWidth: '380px', margin: '0 auto 2rem', lineHeight: 1.65 }}>
                                        This document hasn't been published yet. Please check back later.
                                    </p>
                                    <Link href="/" style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                        background: '#1E3A8A', color: '#fff',
                                        padding: '0.75rem 2rem', borderRadius: '999px',
                                        fontWeight: 600, fontSize: '0.9375rem',
                                        textDecoration: 'none',
                                    }}>
                                        ← Back to Home
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

            </PageLayout>

            <style>{`
                .policy-layout {
                    display: flex;
                    gap: 3rem;
                    align-items: flex-start;
                }
                .policy-toc {
                    width: 240px;
                    flex-shrink: 0;
                }
                .policy-prose {
                    flex: 1;
                    min-width: 0;
                    max-width: none;
                }
                .policy-prose h2 {
                    position: relative;
                    padding-left: 1rem;
                    margin-top: 2.5em;
                    scroll-margin-top: 110px;
                }
                .policy-prose h2::before {
                    content: '';
                    position: absolute;
                    left: 0; top: 0.15em; bottom: 0.15em;
                    width: 3px;
                    background: #1E3A8A;
                    border-radius: 2px;
                }
                .policy-prose h3 {
                    scroll-margin-top: 110px;
                    color: #2C3E50;
                }
                .policy-prose .ql-align-center  { text-align: center; }
                .policy-prose .ql-align-right   { text-align: right; }
                .policy-prose .ql-align-justify { text-align: justify; }
                .policy-prose .ql-indent-1 { padding-left: 2em; }
                .policy-prose .ql-indent-2 { padding-left: 4em; }
                .policy-prose .ql-indent-3 { padding-left: 6em; }
                .policy-prose blockquote {
                    background: rgba(30,58,138,0.04);
                    border-radius: 0 0.5rem 0.5rem 0;
                    padding: 1rem 1.25rem;
                }
                @media (max-width: 1023px) {
                    .policy-toc { display: none; }
                }
            `}</style>
        </>
    );
}

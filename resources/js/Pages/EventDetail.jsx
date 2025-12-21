import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navigation from '@/Components/Frontend/Navigation';
import Footer from '@/Components/Frontend/Footer';
import '@css/frontend.css';
import '@css/frontend/news-detail.css';

export default function EventDetail({ event }) {
    // SEO data for Event Detail page - use custom SEO fields if available
    const pageTitle = event.meta_title || `${event.title} - Skyhouse Alamsutera`;
    const pageDescription = event.meta_description || event.description?.replace(/<[^>]*>/g, '').substring(0, 155) || "Join us for this exciting event at Skyhouse Alamsutera";
    const pageImage = event.image_url || event.image || window.location.origin + "/images/default-og-image.jpg";
    const pageUrl = window.location.origin + `/events/${event.slug}`;
    const pageKeywords = event.meta_keywords || `${event.title}, event, Skyhouse Alamsutera`;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const options = { hour: '2-digit', minute: '2-digit' };
        return date.toLocaleTimeString('en-US', options);
    };

    return (
        <>
            <Head>
                {/* Basic Meta Tags */}
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                {pageKeywords && <meta name="keywords" content={pageKeywords} />}

                {/* Open Graph Tags for Facebook, WhatsApp, LinkedIn */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={pageImage} />
                <meta property="og:image:secure_url" content={pageImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content={event.title} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:site_name" content="Skyhouse Alamsutera" />
                <meta property="og:locale" content="id_ID" />

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />

                {/* Canonical URL */}
                <link rel="canonical" href={pageUrl} />
            </Head>

            <div className="page-wrapper">
                <Navigation />
                <main className="main-wrapper">
                    <div className="news-detail-page">
                        {/* Hero Image */}
                        <div className="news-detail-hero">
                            <img 
                                src={event.image_url || event.image} 
                                alt={event.title} 
                                className="news-detail-hero-image" 
                            />
                            {event.is_past && (
                                <div style={{
                                    position: 'absolute',
                                    top: '2rem',
                                    right: '2rem',
                                    background: 'rgba(0,0,0,0.7)',
                                    color: 'white',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: '600'
                                }}>
                                    Past Event
                                </div>
                            )}
                        </div>

                        {/* Content Container */}
                        <div className="padding-global">
                            <div className="container-medium">
                                <div className="padding-section-medium">
                                    {/* Breadcrumb */}
                                    <div className="news-detail-breadcrumb">
                                        <Link href="/" className="breadcrumb-link">Home</Link>
                                        <span className="breadcrumb-separator">/</span>
                                        <Link href="/events" className="breadcrumb-link">Events</Link>
                                        <span className="breadcrumb-separator">/</span>
                                        <span className="breadcrumb-current">{event.title}</span>
                                    </div>

                                    {/* Event Header */}
                                    <div className="news-detail-header">
                                        <h1 className="news-detail-title">{event.title}</h1>
                                        
                                        <div className="news-detail-meta">
                                            <div className="news-detail-date">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M15.8333 3.33333H4.16667C3.24619 3.33333 2.5 4.07952 2.5 5V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V5C17.5 4.07952 16.7538 3.33333 15.8333 3.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M13.3333 1.66667V5.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M6.66667 1.66667V5.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M2.5 8.33333H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <span>{event.event_date_formatted || formatDate(event.event_date)}</span>
                                            </div>

                                            {event.event_time && (
                                                <div className="news-detail-date">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M10 5V10L13.3333 11.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <span>{event.event_time || formatTime(event.event_date)}</span>
                                                </div>
                                            )}

                                            {event.location && (
                                                <div className="news-detail-date">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path d="M17.5 8.33333C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33333C2.5 6.34424 3.29018 4.4366 4.6967 3.03007C6.10322 1.62355 8.01088 0.833336 10 0.833336C11.9891 0.833336 13.8968 1.62355 15.3033 3.03007C16.7098 4.4366 17.5 6.34424 17.5 8.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71405 8.61929 10.8333 10 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <span>{event.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Event Info Cards */}
                                    {(event.max_participants || event.registration_link) && (
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                            gap: '1.5rem',
                                            marginBottom: '3rem',
                                            marginTop: '2rem'
                                        }}>
                                            {event.max_participants && (
                                                <div style={{
                                                    padding: '1.5rem',
                                                    background: '#f8fafc',
                                                    borderRadius: '8px',
                                                    border: '1px solid #e2e8f0'
                                                }}>
                                                    <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                                        Participants
                                                    </div>
                                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1E3A8A' }}>
                                                        {event.current_participants || 0} / {event.max_participants}
                                                    </div>
                                                </div>
                                            )}

                                            {event.registration_link && !event.is_past && (
                                                <div style={{
                                                    padding: '1.5rem',
                                                    background: '#1E3A8A',
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <a 
                                                        href={event.registration_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            color: 'white',
                                                            textDecoration: 'none',
                                                            fontWeight: '600',
                                                            fontSize: '1rem'
                                                        }}
                                                    >
                                                        Register Now →
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Event Content */}
                                    <div className="news-detail-content">
                                        {event.description ? (
                                            <div
                                                dangerouslySetInnerHTML={{ __html: event.description }}
                                                style={{ lineHeight: '1.8' }}
                                            />
                                        ) : (
                                            <div>
                                                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700', color: '#1E3A8A' }}>About This Event</h3>
                                                <p style={{ lineHeight: '1.8', marginBottom: '1.5rem' }}>
                                                    Event details coming soon...
                                                </p>

                                                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700', color: '#1E3A8A' }}>Event Highlights</h3>
                                                <ul style={{ lineHeight: '1.8', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                                                    <li>Exclusive property showcase</li>
                                                    <li>Special promotional pricing</li>
                                                    <li>Meet our expert consultants</li>
                                                    <li>Refreshments and entertainment</li>
                                                    <li>Doorprize and giveaways</li>
                                                </ul>

                                                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700', color: '#1E3A8A' }}>What to Expect</h3>
                                                <p style={{ lineHeight: '1.8', marginBottom: '1.5rem' }}>
                                                    Join us for an exciting event showcasing our latest housing products. This is a perfect opportunity to explore our properties, meet our team, and discover exclusive offers available only during this event.
                                                </p>
                                                <p style={{ lineHeight: '1.8' }}>
                                                    Whether you're a first-time homebuyer or an experienced investor, our team will be on hand to answer your questions and guide you through the process of finding your dream home.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Back to Events */}
                                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                                        <Link 
                                            href="/events"
                                            style={{
                                                display: 'inline-block',
                                                padding: '1rem 2rem',
                                                background: '#1E3A8A',
                                                color: 'white',
                                                textDecoration: 'none',
                                                borderRadius: '8px',
                                                fontWeight: '600',
                                                transition: 'background 0.3s'
                                            }}
                                        >
                                            ← Back to Events
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

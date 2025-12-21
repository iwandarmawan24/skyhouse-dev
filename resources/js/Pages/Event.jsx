import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import Navigation from "@/Components/Frontend/Navigation";
import Footer from "@/Components/Frontend/Footer";
import { CTA } from "@/Components/Frontend/AllComponents";
import "@css/frontend.css";
import "@css/frontend/events-page.css";

export default function Event({ events }) {
    // SEO data for Events page
    const pageTitle = "Events & Activities - Skyhouse Alamsutera";
    const pageDescription = "Join us at our exciting events and activities showcasing our housing products and community lifestyle at Skyhouse Alamsutera.";
    const pageImage = window.location.origin + "/images/default-og-image.jpg";
    const pageUrl = window.location.origin + "/events";

    const [activeFilter, setActiveFilter] = useState("all");
    const [filteredEvents, setFilteredEvents] = useState(events || []);
    const [displayedEvents, setDisplayedEvents] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(6);

    // Filter events based on status
    useEffect(() => {
        if (!events) return;

        let filtered = events;
        if (activeFilter === "upcoming") {
            filtered = events.filter(event => !event.is_past);
        } else if (activeFilter === "past") {
            filtered = events.filter(event => event.is_past);
        }
        
        setFilteredEvents(filtered);
        setItemsToShow(6); // Reset items to show when filter changes
    }, [activeFilter, events]);

    // Update displayed events when filteredEvents or itemsToShow changes
    useEffect(() => {
        setDisplayedEvents(filteredEvents.slice(0, itemsToShow));
    }, [filteredEvents, itemsToShow]);

    const handleLoadMore = () => {
        setItemsToShow(prev => prev + 6);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <>
            <Head>
                {/* Basic Meta Tags */}
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />

                {/* Open Graph Tags for Facebook, WhatsApp, LinkedIn */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={pageImage} />
                <meta property="og:image:secure_url" content={pageImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content={pageTitle} />
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
                    {/* Top Banner Section */}
                    <section className="news-top-banner">
                        <div className="events-banner-wrapper">
                            <img
                                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=600&fit=crop"
                                alt="Events Banner"
                                className="events-banner-image"
                            />
                            <div className="events-banner-overlay">
                                <div className="padding-global events-banner-content">
                                    <div className="container-large">
                                        <h1 className="events-banner-title">
                                            Events & Activities
                                        </h1>
                                        <p className="events-banner-subtitle">
                                            Discover our upcoming events and past activities
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Filter Tabs */}
                    <section className="padding-section-large">
                        <div className="padding-global">
                            <div className="container-large">
                                <div className="events-filter-container">
                                    <button
                                        onClick={() => setActiveFilter("all")}
                                        className={`events-filter-btn ${activeFilter === "all" ? "active" : ""}`}
                                    >
                                        All Events
                                    </button>
                                    <button
                                        onClick={() => setActiveFilter("upcoming")}
                                        className={`events-filter-btn ${activeFilter === "upcoming" ? "active" : ""}`}
                                    >
                                        Upcoming
                                    </button>
                                    <button
                                        onClick={() => setActiveFilter("past")}
                                        className={`events-filter-btn ${activeFilter === "past" ? "active" : ""}`}
                                    >
                                        Past Events
                                    </button>
                                </div>

                                {/* Events Grid */}
                                {displayedEvents && displayedEvents.length > 0 ? (
                                    <>
                                        <div className="events-grid">
                                            {displayedEvents.map((event) => (
                                                <Link
                                                    key={event.uid}
                                                    href={`/events/${event.slug}`}
                                                    className="event-card"
                                                >
                                                    <div className="event-card-image-wrapper">
                                                        <img
                                                            src={event.image_url || event.image}
                                                            alt={event.title}
                                                            className="event-card-image"
                                                        />
                                                        {event.is_past && (
                                                            <div className="event-card-badge">
                                                                Past Event
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="event-card-content">
                                                        <div className="event-card-meta">
                                                            <div className="event-card-meta-item">
                                                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                                                    <path d="M15.8333 3.33333H4.16667C3.24619 3.33333 2.5 4.07952 2.5 5V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V5C17.5 4.07952 16.7538 3.33333 15.8333 3.33333Z" stroke="currentColor" strokeWidth="1.5"/>
                                                                    <path d="M2.5 8.33333H17.5" stroke="currentColor" strokeWidth="1.5"/>
                                                                </svg>
                                                                <span>{event.event_date_formatted || formatDate(event.event_date)}</span>
                                                            </div>
                                                            {event.location && (
                                                                <div className="event-card-meta-item">
                                                                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                                                        <path d="M17.5 8.33333C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33333C2.5 6.34424 3.29018 4.4366 4.6967 3.03007C6.10322 1.62355 8.01088 0.833336 10 0.833336C11.9891 0.833336 13.8968 1.62355 15.3033 3.03007C16.7098 4.4366 17.5 6.34424 17.5 8.33333Z" stroke="currentColor" strokeWidth="1.5"/>
                                                                    </svg>
                                                                    <span>{event.location}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <h3 className="event-card-title">
                                                            {event.title}
                                                        </h3>
                                                        <p className="event-card-description">
                                                            {event.description && event.description.length > 120
                                                                ? event.description.substring(0, 120) + "..."
                                                                : event.description}
                                                        </p>
                                                        <div className="event-card-link">
                                                            Learn More
                                                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>

                                        {/* Load More Button */}
                                        {displayedEvents.length < filteredEvents.length && (
                                            <div className="events-load-more-container">
                                                <button
                                                    onClick={handleLoadMore}
                                                    className="events-load-more-btn"
                                                >
                                                    Load More Events
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="events-empty-state">
                                        <svg width="64" height="64" viewBox="0 0 20 20" fill="none" className="events-empty-icon">
                                            <path d="M15.8333 3.33333H4.16667C3.24619 3.33333 2.5 4.07952 2.5 5V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V5C17.5 4.07952 16.7538 3.33333 15.8333 3.33333Z" stroke="currentColor" strokeWidth="1.5"/>
                                        </svg>
                                        <p className="events-empty-title">
                                            No events found
                                        </p>
                                        <p className="events-empty-description">
                                            Check back later for upcoming events
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <CTA />
                </main>
                <Footer />
            </div>
        </>
    );
}

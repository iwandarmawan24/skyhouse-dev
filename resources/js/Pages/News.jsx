import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import Navigation from "@/Components/Frontend/Navigation";
import Footer from "@/Components/Frontend/Footer";
import { CTA } from "@/Components/Frontend/AllComponents";
import "@css/frontend.css";
import "@css/frontend/news-page.css";
import axios from "axios";

export default function News({ featured }) {
    const [activeTab, setActiveTab] = useState("media_highlights");
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch items when tab changes
    useEffect(() => {
        fetchItems(1, true);
    }, [activeTab]);

    const fetchItems = async (page = 1, reset = false) => {
        setLoading(true);
        try {
            const response = await axios.get("/api/news", {
                params: {
                    type: activeTab,
                    page: page,
                },
            });

            const data = response.data;

            if (reset) {
                setItems(data.items);
            } else {
                setItems((prev) => [...prev, ...data.items]);
            }

            setCurrentPage(data.currentPage);
            setHasMore(data.hasMore);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            fetchItems(currentPage + 1, false);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
        setItems([]);
    };

    // Use featured data from backend or fallback
    const featuredNews = featured || {
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
        date: "September 18, 2024",
        mediaLogo: "https://placehold.co/120x40/1E3A8A/white?text=NEWS",
        title: "Kolaborasi dengan Anabuki Group, Skyhouse Alamsutera Bangun Hunian Terbaru di Serpong, Tangerang Selatan",
        description:
            "Kolaborasi ini akan memperkuat kerja operasional Skyhouse Alamsutera yang saat ini sedang membangun perumahan di daerah Tangerang Selatan",
    };

    return (
        <div className="page-wrapper">
            <Navigation />
            <main className="main-wrapper">
                {/* Top Banner Section */}
                <section className="news-top-banner">
                    <div className="news-banner-image-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=600&fit=crop"
                            alt="News Banner"
                            className="news-banner-image"
                        />
                        <div className="news-banner-overlay">
                            <div className="padding-global">
                                <div className="container-large">
                                    <h1 className="news-banner-title">
                                        Latest News & Updates
                                    </h1>
                                    <p className="news-banner-subtitle">
                                        Stay informed with our latest
                                        developments and achievements
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured News Section */}
                <section className="news-hero">
                    <div className="padding-global">
                        <div className="container-large">
                            <div className="news-hero-content">
                                <div className="news-hero-image">
                                    <img
                                        src={featuredNews.image}
                                        alt={featuredNews.title}
                                    />
                                </div>
                                <div className="news-hero-details">
                                    <div className="news-hero-meta">
                                        <span className="news-hero-date">
                                            {featuredNews.date}
                                        </span>
                                        <span className="news-hero-separator">
                                            |
                                        </span>
                                        <img
                                            src={featuredNews.mediaLogo}
                                            alt="Media logo"
                                            className="news-hero-logo"
                                        />
                                    </div>
                                    <h1 className="news-hero-title">
                                        {featuredNews.title}
                                    </h1>
                                    <p className="news-hero-description">
                                        {featuredNews.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* News List Section */}
                <section className="news-list-section background-color-cream">
                    <div className="padding-global">
                        <div className="container-large">
                            <div className="padding-section-large">
                                {/* Tabs */}
                                <div className="news-filters">
                                    <button
                                        className={`news-filter-tab ${
                                            activeTab === "media_highlights"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleTabChange("media_highlights")
                                        }
                                    >
                                        Media Highlights
                                    </button>
                                    <button
                                        className={`news-filter-tab ${
                                            activeTab === "articles"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleTabChange("articles")
                                        }
                                    >
                                        Articles
                                    </button>
                                </div>

                                {/* Items Grid */}
                                <div className="news-grid">
                                    {items.length === 0 && !loading && (
                                        <div className="col-span-full text-center py-12">
                                            <p className="text-gray-500">
                                                No {activeTab === "articles" ? "articles" : "media highlights"} found.
                                            </p>
                                        </div>
                                    )}

                                    {items.map((item) => (
                                        item.type === "media_highlight" ? (
                                            <a
                                                key={item.id}
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="news-card"
                                            >
                                                <div className="news-card-image">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className="news-card-content">
                                                    <div className="news-card-meta">
                                                        <span className="news-card-date">
                                                            {item.date}
                                                        </span>
                                                        <span className="news-card-separator">
                                                            |
                                                        </span>
                                                        <img
                                                            src={item.mediaLogo}
                                                            alt="Media logo"
                                                            className="news-card-logo"
                                                        />
                                                    </div>
                                                    <h3 className="news-card-title">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                            </a>
                                        ) : (
                                            <Link
                                                key={item.id}
                                                href={`/news/${item.id}`}
                                                className="news-card"
                                            >
                                                <div className="news-card-image">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className="news-card-content">
                                                    <div className="news-card-meta">
                                                        <span className="news-card-date">
                                                            {item.date}
                                                        </span>
                                                        {item.category && (
                                                            <>
                                                                <span className="news-card-separator">
                                                                    |
                                                                </span>
                                                                <span className="news-card-category">
                                                                    {item.category}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <h3 className="news-card-title">
                                                        {item.title}
                                                    </h3>
                                                    {item.excerpt && (
                                                        <p className="news-card-excerpt">
                                                            {item.excerpt}
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>
                                        )
                                    ))}
                                </div>

                                {/* Load More Button */}
                                {hasMore && (
                                    <div className="news-load-more">
                                        <button
                                            onClick={handleLoadMore}
                                            className="button is-secondary"
                                            disabled={loading}
                                        >
                                            {loading ? "Loading..." : "Load More"}
                                        </button>
                                    </div>
                                )}

                                {/* Loading indicator for initial load */}
                                {loading && items.length === 0 && (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500">Loading...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <CTA />
            <Footer />
        </div>
    );
}

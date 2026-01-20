import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import PageLayout from "@/Components/Frontend/PageLayout";
import "@css/frontend.css";
import "@css/frontend/news-page.css";
import axios from "axios";

export default function MediaHighlights({ featured }) {
  const pageTitle = "Media Highlights - Skyhouse Alamsutera";
  const pageDescription = "Stay informed with our latest media coverage and press releases from Skyhouse Alamsutera.";
  const pageImage = featured?.image || window.location.origin + "/images/default-og-image.jpg";
  const pageUrl = window.location.origin + "/media-highlights";
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems(1, true);
  }, []);

  const fetchItems = async (page = 1, reset = false) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/news", {
        params: {
          type: "media_highlights",
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

  const featuredNews = featured || {
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
    date: "September 18, 2024",
    mediaLogo: "https://placehold.co/120x40/1E3A8A/white?text=NEWS",
    title: "Kolaborasi dengan Anabuki Group, Skyhouse Alamsutera Bangun Hunian Terbaru di Serpong, Tangerang Selatan",
    description:
      "Kolaborasi ini akan memperkuat kerja operasional Skyhouse Alamsutera yang saat ini sedang membangun perumahan di daerah Tangerang Selatan",
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

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

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />

        <link rel="canonical" href={pageUrl} />
      </Head>

      <PageLayout>
        <section className="news-top-banner">
          <div className="news-banner-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=600&fit=crop"
              alt="Media Highlights Banner"
              className="news-banner-image"
            />
            <div className="news-banner-overlay">
              <div className="padding-global">
                <div className="container-large">
                  <h1 className="news-banner-title">
                    Media Highlights
                  </h1>
                  <p className="news-banner-subtitle">
                    Stay informed with our latest media coverage and press releases
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

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

        <section className="news-list-section background-color-cream">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="news-grid">
                  {items.length === 0 && !loading && (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">
                        No media highlights found.
                      </p>
                    </div>
                  )}

                  {items.map((item) => (
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
                  ))}
                </div>

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

                {loading && items.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Loading...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}

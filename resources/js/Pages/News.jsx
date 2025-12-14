import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Navigation from '@/Components/Frontend/Navigation';
import Footer from '@/Components/Frontend/Footer';
import { CTA } from '@/Components/Frontend/AllComponents';
import '@css/frontend.css';
import '@css/frontend/news-page.css';

export default function News() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleItems, setVisibleItems] = useState(6);

  // Featured news for hero
  const featuredNews = {
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
    date: 'September 18, 2024',
    mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
    title: 'Kolaborasi dengan Anabuki Group, Skyhouse Alamsutera Bangun Hunian Terbaru di Serpong, Tangerang Selatan',
    description: 'Kolaborasi ini akan memperkuat kerja operasional Skyhouse Alamsutera yang saat ini sedang membangun perumahan di daerah Tangerang Selatan',
    category: 'residential'
  };

  // All news data
  const allNewsData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
      date: 'September 18, 2024',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      title: 'Kolaborasi dengan Anabuki Group, Skyhouse Alamsutera Bangun Hunian Terbaru di Serpong, Tangerang Selatan',
      description: 'Kolaborasi ini akan memperkuat kerja operasional Skyhouse Alamsutera yang saat ini sedang membangun perumahan di daerah Tangerang Selatan',
      category: 'residential'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      date: 'October 2, 2023',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      title: 'Skyhouse Alamsutera Bakal Luncurkan Hunian Dekat Stasiun LRT Ciracas',
      description: 'Skyhouse Alamsutera akan meluncurkan hunian baru yang strategis dekat dengan stasiun LRT Ciracas untuk kemudahan akses transportasi',
      category: 'residential'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&h=600&fit=crop',
      date: 'January 13, 2023',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      title: 'Kebal Resesi, Skyhouse Alamsutera Raup Revenue Rp 32 M',
      description: 'Skyhouse Alamsutera mampu meraup revenue hingga Rp 32 miliar di tengah kondisi ekonomi yang menantang',
      category: 'awards'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      date: 'August 15, 2023',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      title: 'Skyhouse Alamsutera Hadirkan Konsep Rumah Ramah Lingkungan di Jakarta',
      description: 'Konsep hunian ramah lingkungan menjadi fokus utama dalam pengembangan properti modern',
      category: 'residential'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      date: 'July 22, 2023',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      title: 'Skyhouse Alamsutera Raih Penghargaan Best Developer 2023',
      description: 'Penghargaan ini diberikan atas dedikasi dalam menghadirkan hunian berkualitas tinggi',
      category: 'awards'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      date: 'June 10, 2023',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      title: 'Peresmian Shophouse Terbaru di Kawasan BSD',
      description: 'Shophouse dengan konsep modern dan strategis untuk kebutuhan bisnis Anda',
      category: 'shophouse'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
      date: 'May 5, 2023',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      title: 'Inovasi Desain Rumah Minimalis Modern',
      description: 'Desain minimalis modern yang tetap fungsional dan nyaman untuk keluarga Indonesia',
      category: 'residential'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      date: 'April 18, 2023',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      title: 'Skyhouse Alamsutera Masuk Jajaran Top 50 Developer Indonesia',
      description: 'Pencapaian luar biasa dalam industri properti tanah air',
      category: 'awards'
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
      date: 'March 25, 2023',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      title: 'Grand Opening Shophouse Premium di Alam Sutera',
      description: 'Lokasi strategis dengan akses mudah ke berbagai fasilitas umum',
      category: 'shophouse'
    }
  ];

  // Filter news based on active filter
  const filteredNews = activeFilter === 'all'
    ? allNewsData
    : allNewsData.filter(news => news.category === activeFilter);

  // Get visible news items
  const visibleNews = filteredNews.slice(0, visibleItems);
  const hasMore = visibleItems < filteredNews.length;

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + 3);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setVisibleItems(6); // Reset to initial count when filter changes
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
                  <h1 className="news-banner-title">Latest News & Updates</h1>
                  <p className="news-banner-subtitle">Stay informed with our latest developments and achievements</p>
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
                  <img src={featuredNews.image} alt={featuredNews.title} />
                </div>
                <div className="news-hero-details">
                  <div className="news-hero-meta">
                    <span className="news-hero-date">{featuredNews.date}</span>
                    <span className="news-hero-separator">|</span>
                    <img src={featuredNews.mediaLogo} alt="Media logo" className="news-hero-logo" />
                  </div>
                  <h1 className="news-hero-title">{featuredNews.title}</h1>
                  <p className="news-hero-description">{featuredNews.description}</p>
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
                {/* Filter Tabs */}
                <div className="news-filters">
                  <button
                    className={`news-filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('all')}
                  >
                    All Posts
                  </button>
                  <button
                    className={`news-filter-tab ${activeFilter === 'awards' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('awards')}
                  >
                    Awards
                  </button>
                  <button
                    className={`news-filter-tab ${activeFilter === 'residential' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('residential')}
                  >
                    Residential
                  </button>
                  <button
                    className={`news-filter-tab ${activeFilter === 'shophouse' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('shophouse')}
                  >
                    Shophouse
                  </button>
                </div>

                {/* News Grid */}
                <div className="news-grid">
                  {visibleNews.map((news) => (
                    <Link key={news.id} href={`/news/${news.id}`} className="news-card">
                      <div className="news-card-image">
                        <img src={news.image} alt={news.title} />
                      </div>
                      <div className="news-card-content">
                        <div className="news-card-meta">
                          <span className="news-card-date">{news.date}</span>
                          <span className="news-card-separator">|</span>
                          <img src={news.mediaLogo} alt="Media logo" className="news-card-logo" />
                        </div>
                        <h3 className="news-card-title">{news.title}</h3>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="news-load-more">
                    <button onClick={handleLoadMore} className="button is-secondary">
                      Load More
                    </button>
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

import React from 'react';
import Navigation from '@/Components/Frontend/Navigation';
import Footer from '@/Components/Frontend/Footer';
import '@css/frontend.css';
import '@css/frontend/news-detail.css';

const NewsDetail = ({ newsId }) => {
  // Sample news data - replace with actual data from backend
  const newsData = {
    id: newsId,
    title: 'Kolaborasi dengan Anabuki Group, Skyhouse Alamsutera Bangun Hunian Terbaru di Serpong, Tangerang Selatan',
    date: 'September 18, 2024',
    mediaSource: 'Kompas',
    mediaLogo: 'https://cdn.prod.website-files.com/6507e5069d2b6119052df387/650c0a1a4b89d76de4ab3c5a_kompas-logo.webp',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
    content: `
      <p>Skyhouse Alamsutera, pengembang properti terkemuka di Indonesia, mengumumkan kolaborasi strategis dengan Anabuki Group dari Jepang untuk membangun hunian terbaru di kawasan Serpong, Tangerang Selatan.</p>
      
      <p>Proyek ini merupakan bagian dari komitmen Skyhouse Alamsutera untuk terus menghadirkan hunian berkualitas tinggi yang menggabungkan desain modern dengan konsep berkelanjutan.</p>
      
      <h3>Tentang Proyek</h3>
      <p>Hunian terbaru ini akan menampilkan desain arsitektur kontemporer yang memadukan keindahan estetika dengan fungsi praktis. Setiap unit dirancang untuk memaksimalkan pencahayaan alami dan ventilasi, menciptakan lingkungan hidup yang sehat dan nyaman.</p>
      
      <h3>Fasilitas Unggulan</h3>
      <p>Proyek ini akan dilengkapi dengan berbagai fasilitas modern seperti:</p>
      <ul>
        <li>Taman bermain anak yang luas</li>
        <li>Jogging track dan area olahraga outdoor</li>
        <li>Kolam renang dan fitness center</li>
        <li>Co-working space dan business lounge</li>
        <li>Keamanan 24 jam dengan sistem smart security</li>
      </ul>
      
      <h3>Lokasi Strategis</h3>
      <p>Berlokasi di Serpong, Tangerang Selatan, hunian ini menawarkan akses mudah ke berbagai pusat bisnis, pendidikan, dan komersial. Kawasan Serpong dikenal sebagai salah satu area berkembang pesat dengan infrastruktur yang terus membaik.</p>
      
      <p>Diperkirakan proyek ini akan mulai dipasarkan pada kuartal pertama tahun depan dengan berbagai pilihan tipe unit yang disesuaikan dengan kebutuhan berbagai segmen pasar.</p>
    `,
    tags: ['Property', 'Real Estate', 'Serpong', 'Tangerang Selatan']
  };

  return (
    <>
      <Navigation />
      <div className="news-detail-page">
        {/* Hero Image */}
        <div className="news-detail-hero">
          <img src={newsData.image} alt={newsData.title} className="news-detail-hero-image" />
        </div>

        {/* Content Container */}
        <div className="padding-global">
          <div className="container-medium">
            <div className="padding-section-medium">
              {/* Breadcrumb */}
              <div className="news-detail-breadcrumb">
                <a href="/" className="breadcrumb-link">Home</a>
                <span className="breadcrumb-separator">/</span>
                <a href="/news" className="breadcrumb-link">News</a>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">Article</span>
              </div>

              {/* Article Header */}
              <div className="news-detail-header">
                <h1 className="news-detail-title">{newsData.title}</h1>
                
                <div className="news-detail-meta">
                  <div className="news-detail-date">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M15.8333 3.33333H4.16667C3.24619 3.33333 2.5 4.07952 2.5 5V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V5C17.5 4.07952 16.7538 3.33333 15.8333 3.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.3333 1.66667V5.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6.66667 1.66667V5.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.5 8.33333H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{newsData.date}</span>
                  </div>
                  
                  {newsData.mediaLogo && (
                    <div className="news-detail-source">
                      <span>Source:</span>
                      <img src={newsData.mediaLogo} alt={newsData.mediaSource} className="news-detail-source-logo" />
                    </div>
                  )}
                </div>
              </div>

              {/* Article Content */}
              <div className="news-detail-content">
                <div dangerouslySetInnerHTML={{ __html: newsData.content }} />
              </div>

              {/* Tags */}
              {newsData.tags && newsData.tags.length > 0 && (
                <div className="news-detail-tags">
                  <span className="tags-label">Tags:</span>
                  <div className="tags-list">
                    {newsData.tags.map((tag, index) => (
                      <span key={index} className="tag-item">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="news-detail-share">
                <span className="share-label">Share:</span>
                <div className="share-buttons">
                  <a href="#" className="share-button facebook" aria-label="Share on Facebook">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"/>
                    </svg>
                  </a>
                  <a href="#" className="share-button twitter" aria-label="Share on Twitter">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                  </a>
                  <a href="#" className="share-button linkedin" aria-label="Share on LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M18.72 0H1.28C.57 0 0 .57 0 1.28v17.44C0 19.43.57 20 1.28 20h17.44c.71 0 1.28-.57 1.28-1.28V1.28C20 .57 19.43 0 18.72 0zM5.92 17.04H2.96V7.5h2.96v9.54zM4.44 6.2c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72zm12.6 10.84h-2.96v-4.64c0-1.11-.02-2.53-1.54-2.53-1.54 0-1.78 1.2-1.78 2.45v4.72H8.8V7.5h2.84v1.3h.04c.4-.75 1.36-1.54 2.8-1.54 2.99 0 3.54 1.97 3.54 4.53v5.25z"/>
                    </svg>
                  </a>
                  <a href="#" className="share-button whatsapp" aria-label="Share on WhatsApp">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.002 0C4.477 0 0 4.477 0 10a9.954 9.954 0 001.346 5.025L.046 19.502l4.59-1.204A9.959 9.959 0 0010.002 20c5.524 0 10-4.477 10-10s-4.476-10-10-10zm5.849 14.117c-.243.686-1.444 1.26-1.98 1.335-.527.076-1.024.245-3.456-.721-3.11-1.237-5.122-4.39-5.278-4.594-.156-.204-1.276-1.7-1.276-3.244 0-1.543.808-2.303 1.095-2.617.287-.313.627-.391.836-.391.209 0 .418.002.6.011.193.009.452-.073.707.539.262.627.893 2.178.972 2.337.079.16.131.346.026.55-.105.204-.157.33-.313.507-.157.177-.329.395-.47.531-.156.151-.319.315-.137.618.183.302.81 1.337 1.738 2.165 1.194 1.066 2.2 1.397 2.513 1.554.313.156.496.131.679-.079.183-.209.783-.914 992-.158 1.251.078.287.131.469.21.653.079.183.052.339-.052.469-.105.131-.47.683-.705 1.026z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Back to News */}
              <div className="news-detail-back">
                <a href="/news" className="back-button">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Back to News</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail;

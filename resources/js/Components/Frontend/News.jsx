import React, { useRef, useEffect } from 'react';
import { Heading, Button } from '@/Components/Frontend/atoms';
import NewsItem from './NewsItem';

// News Component
const News = () => {
  const newsBgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (newsBgRef.current) {
        const scrollY = window.scrollY;
        const rect = newsBgRef.current.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const offset = scrollY - elementTop;
        
        // Apply parallax effect (move slower than scroll)
        newsBgRef.current.style.transform = `translateY(${offset * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const newsData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      title: 'Kolaborasi dengan Anabuki Group, Skyhouse Alamsutera Bangun Hunian Terbaru di Serpong, Tangerang Selatan',
      date: 'September 18, 2024',
      mediaSource: 'Kompas',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      link: '#'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      title: 'Skyhouse Alamsutera Bakal Luncurkan Hunian Dekat Stasiun LRT Ciracas',
      date: 'October 2, 2023',
      mediaSource: 'Kompas',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      link: '#'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&h=600&fit=crop',
      title: 'Skyhouse Alamsutera Hadirkan Konsep Rumah Ramah Lingkungan di Jakarta',
      date: 'August 15, 2023',
      mediaSource: 'Kompas',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      link: '#'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
      title: 'Inovasi Terbaru dalam Desain Hunian Modern di Alam Sutera',
      date: 'July 20, 2023',
      mediaSource: 'Kompas',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      link: '#'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
      title: 'Skyhouse Alamsutera Raih Penghargaan Developer Terbaik 2023',
      date: 'June 10, 2023',
      mediaSource: 'Kompas',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      link: '#'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
      title: 'Program Subsidi Khusus untuk Pembeli Rumah Pertama',
      date: 'May 5, 2023',
      mediaSource: 'Kompas',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      link: '#'
    }
  ];

  return (
    <section className="section_news bg-white is-20 relative overflow-hidden">
      {/* Background with gradient mask */}
      <div 
        ref={newsBgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/images/hero/bg-blur-2.png)',
          maskImage: 'linear-gradient(to top, transparent 0%, transparent 15%, rgba(0,0,0,0.3) 20%, black 70%)',
          WebkitMaskImage: 'linear-gradient(to top, transparent 0%, transparent 15%, rgba(0,0,0,0.3) 20%, black 70%)'
        }}
      ></div>
      
      {/* Blue overlay to darken the background */}
      <div className="absolute inset-0"></div>
      
      <div className="padding-global relative z-10">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="flex flex-row items-center justify-between mb-12">
              <Heading as="h2" variant="section" className="flex-1 !leading-12">Follow our <span className="font-bodoni italic">Updates</span></Heading>
              <Button 
                href="/news" 
                variant="sunshine"
                size="sm"
                squash
              >
                View All News
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {newsData.map((news) => (
                <NewsItem
                  key={news.id}
                  image={news.image}
                  title={news.title}
                  date={news.date}
                  mediaSource={news.mediaSource}
                  mediaLogo={news.mediaLogo}
                  link={news.link}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;

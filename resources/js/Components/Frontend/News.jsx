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
          <div className="padding-section-large news-layout">
            <div className="news-items order-2 lg:order-1">
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
            <div className="order-1 lg:order-2 flex flex-row lg:flex-col items-center lg:items-start gap-4">
              <Heading as="h2" variant="section" className="flex-1 lg:flex-none !leading-12">Follow our <span className="font-bodoni italic">updates</span></Heading>
              <Button 
                href="/news" 
                variant="sunshine"
                size="sm"
                squash
                className="flex-shrink-0 lg:mt-6"
              >
                View All News
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;

import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

// Default/fallback slide data
const defaultSlides = [
  {
    id: 1,
    banner_link: '',
    image_url: '/images/hero/hero-sky-bg.png'
  }
];

const Hero = () => {
  const [slides, setSlides] = useState(defaultSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch hero banners from backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('/api/hero-banners');
        const banners = response.data.data;

        if (banners && banners.length > 0) {
          const formattedSlides = banners.map((banner) => ({
            id: banner.uid,
            banner_link: banner.banner_link || '',
            image_url: banner.image_url || '/images/hero/hero-sky-bg.png',
            mobile_image_url: banner.mobile_image_url || null,
          }));

          setSlides(formattedSlides);
        }
      } catch (error) {
        console.error('Error fetching hero banners:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play slider (only start after data is loaded)
  useEffect(() => {
    if (!isLoading && slides.length > 1) {
      intervalRef.current = setInterval(() => {
        handleNextSlide();
      }, 5000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [currentSlide, isLoading, slides.length]);

  const handleNextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }
  };

  const handlePrevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);

      // Reset interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          handleNextSlide();
        }, 5000);
      }
    }
  };

  const handleBannerClick = (bannerLink) => {
    if (bannerLink) {
      window.open(bannerLink, '_blank', 'noopener,noreferrer');
    }
  };

  // Show loading state if needed
  if (isLoading) {
    return (
      <header className="section_hero is-bottom-rounded relative overflow-hidden" data-section="hero-banners">
        <div className="hero_slider_wrapper">
          <div className="hero_slide hero_sky active" />
        </div>
      </header>
    );
  }

  return (
    <header className="section_hero is-bottom-rounded relative overflow-hidden" data-section="hero-banners">
      {/* Background Slides with Fade Effect */}
      <div className="hero_slider_wrapper">
        {slides.map((slide, index) => {
          const bgImage = isMobile && slide.mobile_image_url
            ? slide.mobile_image_url
            : slide.image_url;

          return (
            <div
              key={slide.id}
              className={`hero_slide ${index === currentSlide ? 'active' : ''} ${slide.banner_link ? 'cursor-pointer' : ''}`}
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                transform: `translateY(${scrollY * 0.5}px)`,
              }}
              onClick={() => handleBannerClick(slide.banner_link)}
            />
          );
        })}
      </div>

      {/* Navigation Controls - Only show if more than 1 slide */}
      {slides.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevSlide}
            className="slider_nav slider_nav_prev"
            aria-label="Previous slide"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleNextSlide}
            className="slider_nav slider_nav_next"
            aria-label="Next slide"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Dot Navigation */}
          <div className="slider_dots">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`slider_dot ${index === currentSlide ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </header>
  );
};

export default Hero;

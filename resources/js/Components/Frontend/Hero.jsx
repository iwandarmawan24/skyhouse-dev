import React, { useEffect, useState, useRef } from 'react';
import Button from '@/Components/Frontend/atoms/Button';
import { Heading, Text } from '@/Components/Frontend/atoms';
import axios from 'axios';

// Default/fallback slide data
const defaultSlides = [
  {
    id: 1,
    title: 'Find the Place Where your Story Begins',
    description: 'Discover your dream home with Skyhouse Alamsutera where comfort meets elegance in the heart of the city.',
    button_text: 'Explore Our Projects',
    button_link: '/project',
    image_url: '/images/hero/hero-sky-bg.png'
  }
];

const Hero = () => {
  const [slides, setSlides] = useState(defaultSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null);

  // Fetch hero banners from backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('/api/hero-banners');
        const banners = response.data.data;

        if (banners && banners.length > 0) {
          // Format the data to match our component structure
          const formattedSlides = banners.map((banner, index) => ({
            id: banner.uid,
            title: banner.title,
            description: banner.description,
            button_text: banner.button_text || 'Explore Our Projects',
            button_link: banner.button_link || '/project',
            image_url: banner.image_url || `/images/hero/hero-sky-bg.png`,
          }));

          setSlides(formattedSlides);
        }
      } catch (error) {
        console.error('Error fetching hero banners:', error);
        // Use default slides if fetch fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Auto-play slider (only start after data is loaded)
  useEffect(() => {
    if (!isLoading && slides.length > 1) {
      intervalRef.current = setInterval(() => {
        handleNextSlide();
      }, 5000); // Change slide every 5 seconds

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
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const handlePrevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 800);

      // Reset interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          handleNextSlide();
        }, 5000);
      }
    }
  };

  // Show loading state if needed
  if (isLoading) {
    return (
      <header className="section_hero is-bottom-rounded relative overflow-hidden">
        <div className="hero_slider_wrapper">
          <div className="hero_slide hero_sky active" />
        </div>
      </header>
    );
  }

  return (
    <header className="section_hero is-bottom-rounded relative overflow-hidden">
      {/* Background Slides with Fade Effect */}
      <div className="hero_slider_wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero_slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${slide.image_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="padding-global" style={{ position: 'relative', zIndex: 20 }}>
        <div className="container-large">
          <div className="padding-section-large" style={{ paddingTop: '2rem' }}>
            <div className="header26_component">

              {/* Hero Text Container */}
              <div className="text-align-center is-center">
                <div className="hero-text">
                  <div className="padding-bottom padding-small"></div>

                  {/* Logo - Only rendered once */}
                  <img
                    src="https://www.skyhousealamsutera.id/wp-content/uploads/2020/12/logo.png"
                    alt="Skyhouse Alamsutera"
                    className="navbar_logo"
                    style={{ width: '150px', height: 'auto', margin: '0 auto', marginBottom: '40px' }}
                  />

                  {/* Slide Content with Fade */}
                  {slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`slide_content ${index === currentSlide ? 'active' : ''}`}
                    >
                      <div className="margin-bottom margin-small">
                        <Heading as="h1" variant="hero" color="white" className="text-center !leading-none">
                          <div dangerouslySetInnerHTML={{ __html: slide.title }} />
                        </Heading>
                        <div className="block bg-white h-1 w-24 mx-auto my-12"></div>
                        <Text className="text-center !mb-12" color="white" size="md">
                          <div dangerouslySetInnerHTML={{ __html: slide.description }} />
                        </Text>

                        {slide.button_text && (
                          <Button
                            href={slide.button_link}
                            variant="pill-light-sunshine"
                            size="md"
                            squash
                          >
                            {slide.button_text}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Houses - Static Foreground */}
      <div className="hero_houses"></div>

      {/* Navigation Controls - Only show if more than 1 slide */}
      {slides.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevSlide}
            className="slider_nav slider_nav_prev"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleNextSlide}
            className="slider_nav slider_nav_next"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

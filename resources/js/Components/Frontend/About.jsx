import React, { useState, useEffect, useRef } from 'react';
import { Heading, Text, Button } from '@/Components/Frontend/atoms';

const FacilityCard = ({ images, title, description, className = "", rowSpan = "" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const goToIndex = (index) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentImageIndex((index + images.length) % images.length);
      setFadeIn(true);
    }, 300);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (intervalRef.current) clearInterval(intervalRef.current);
    goToIndex(currentImageIndex - 1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (intervalRef.current) clearInterval(intervalRef.current);
    goToIndex(currentImageIndex + 1);
  };

  useEffect(() => {
    if (!isHovered) {
      setCurrentImageIndex(0);
      setFadeIn(true);
      return;
    }

    intervalRef.current = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setFadeIn(true);
      }, 400);
    }, 1400);
    return () => clearInterval(intervalRef.current);
  }, [isHovered, images.length]);

  return (
    <div
      className={`service-card relative rounded-3xl overflow-hidden h-[300px] md:h-[400px] group cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg ${rowSpan} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={images[currentImageIndex]}
        alt={title}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        style={{ transition: 'opacity 300ms ease-in-out, transform 700ms ease-out' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Slider Indicator Dots */}
      <div className="absolute top-4 left-4 flex gap-2 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                ? 'bg-white w-6'
                : 'bg-white/50'
              }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
        <Heading as="h3" variant="card" color="white" className="mb-2 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: title }} />
        <Text size="sm" color="white" className="max-w-sm opacity-90 text-xs md:text-sm">
          {description}
        </Text>
      </div>
    </div>
  );
};

const LifestyleSlider = ({ images, children, className = "" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const goToIndex = (index) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentImageIndex((index + images.length) % images.length);
      setFadeIn(true);
    }, 300);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (intervalRef.current) clearInterval(intervalRef.current);
    goToIndex(currentImageIndex - 1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (intervalRef.current) clearInterval(intervalRef.current);
    goToIndex(currentImageIndex + 1);
  };

  useEffect(() => {
    if (!isHovered) {
      setCurrentImageIndex(0);
      setFadeIn(true);
      return;
    }

    intervalRef.current = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setFadeIn(true);
      }, 400);
    }, 1400);
    return () => clearInterval(intervalRef.current);
  }, [isHovered, images.length]);

  return (
    <div
      className={`service-card relative rounded-3xl overflow-hidden group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={images[currentImageIndex]}
        alt="Lifestyle"
        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        style={{ transition: 'opacity 300ms ease-in-out, transform 700ms ease-out' }}
      />
      <div className="absolute top-4 left-4 flex gap-2 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                ? 'bg-white w-6'
                : 'bg-white/50'
              }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {children}
    </div>
  );
};

const About = () => {
  return (
    <>
      {/* Facilities Section */}
      <section
        className="services-section bg-skyhouse-ocean py-20 px-4 md:px-8 lg:px-16"
        style={{
          backgroundImage: 'url(/images/hero/bg-blur.png)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="services-grid grid grid-cols-1 lg:grid-cols-2 gap-6 lg:grid-rows-3">
            {/* Left Top - Lifestyle Card */}
            <LifestyleSlider
              images={[
                "/images/experiences/lifestyle/mall @ alam sutera.jpg",
                "/images/experiences/lifestyle/revaeon.jpg",
                "/images/experiences/lifestyle/revallfresh.jpg",
                "/images/experiences/lifestyle/revdutabuah.jpg",
                "/images/experiences/lifestyle/revpasar8.jpg",
                "/images/experiences/lifestyle/revrumahbuah.jpg",
              ]}
              className="min-h-[350px] lg:row-span-2 order-2 lg:order-1"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
                <Heading as="h3" variant="card" color="white" className="mb-2 text-base md:text-xl">Daily Freshness,<br />Effortlessly Close<br /></Heading>
                <br className="hidden md:block" />
                <Text size="sm" color="white" className="max-w-xs opacity-90 text-xs md:text-sm">
                  From premium fruit markets to modern grocery stores like AEON and All Fresh, enjoy convenient access to quality ingredients every day.
                </Text>
              </div>
            </LifestyleSlider>

            <FacilityCard
              images={[
                "/images/experiences/lifestyle/living-world-alamsutera.jpg",
                "/images/experiences/lifestyle/ikea-alam-sutera.webp",
                "/images/experiences/lifestyle/flavor-bliss.jpg",
                "/images/experiences/lifestyle/jakarta-premium-outlet.jpg",
                "/images/experiences/lifestyle/decathlon.jpg",
              ]}
              title="Endless Entertainment"
              description="Living World Mall, IKEA, Flavor Bliss, Decathlon, and Jakarta Premium Outlet—all within a short drive from home."
              className="order-4"
            />

            {/* Experience Card */}
            <div className="service-card bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl p-6 md:p-8 flex flex-col justify-center order-1 lg:order-3">
              <Heading as="h3" variant="card" className="mb-3 text-lg md:text-xl">Experience</Heading>
              <Heading as="h3" variant="card" bodoni className="mb-3 italic text-lg md:text-xl">Sky House Alam Sutera<span className="font-sans not-italic text-[0.55em] align-super font-semibold">+</span></Heading>
              <div className="block bg-blue-300 h-1 w-16 my-4"></div>
              <Text size="base" color="charcoal" className="text-sm md:text-base">
                Surrounded by top shopping malls, fresh groceries, leading universities, and thriving business hubs—everything you need is right at your fingertips.
              </Text>
              <div>
                <Button
                  href="/project"
                  variant="sunshine"
                  size="md"
                  squash
                  className="mt-6 self-start"
                >
                  Explore Our Projects
                </Button>
              </div>
            </div>

            <FacilityCard
              images={[
                "/images/experiences/univ/binus-alsut.jpg",
                "/images/experiences/univ/binus-aso.jpg",
                "/images/experiences/univ/sgu.jpeg",
                "/images/experiences/univ/ubm.jpeg",
              ]}
              title="Top Universities Nearby"
              description="Binus University, Swiss German University, and Universitas Bunda Mulia—ideal for students and academic professionals."
              className="order-4"
            />

            <FacilityCard
              images={[
                "/images/experiences/office/alfa-tower.jpg",
                "/images/experiences/office/kino.jpg",
              ]}
              title="Thriving Business Hub"
              description="Synergy Building, Alfa Tower, Kino Tower, and other major offices in Alam Sutera's growing commercial district."
              className="order-5"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

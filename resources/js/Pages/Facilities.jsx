import React, { useState, useEffect } from 'react';
import PageLayout from '@/Components/Frontend/PageLayout';
import { Heading, Text, Button } from '@/Components/Frontend/atoms';
import '@css/frontend.css';

export default function Facilities({ facilities: backendFacilities = [] }) {
  const [flippedCard, setFlippedCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  // Update cards per slide based on viewport
  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth < 768) {
        setCardsPerSlide(1);
      } else {
        setCardsPerSlide(3);
      }
    };

    updateCardsPerSlide();
    window.addEventListener('resize', updateCardsPerSlide);
    return () => window.removeEventListener('resize', updateCardsPerSlide);
  }, []);

  // Use backend data for facilities
  const facilities = backendFacilities;

  // What makes a good house great
  const greatFeatures = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Security & Safety',
      description: '24/7 security surveillance, gated access control, and professional security personnel ensuring your family\'s safety at all times.'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Strategic Location',
      description: 'Prime location with easy access to shopping centers, schools, hospitals, and major transportation routes for ultimate convenience.'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Vibrant Community',
      description: 'A warm and welcoming community atmosphere where neighbors become friends, creating lasting memories together.'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Green Environment',
      description: 'Eco-friendly design with abundant green spaces, parks, and sustainable features for a healthier lifestyle.'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Quality Construction',
      description: 'Built with premium materials and expert craftsmanship, ensuring durability and timeless elegance in every detail.'
    }
  ];

  const nextSlide = () => {
    const totalSlides = Math.ceil(greatFeatures.length / cardsPerSlide);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    const totalSlides = Math.ceil(greatFeatures.length / cardsPerSlide);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <PageLayout showBackgroundDefault={true}>
      <div
        className="w-full"
        style={{ 
          backgroundImage: 'url(/images/hero/bg-blur.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }}
      >
        {/* Description Section */}
        <div className="container mx-auto px-4 py-16 md:py-32 pt-24 md:pt-48">
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h2" variant="section" color="charcoal" className="!mb-6">
              Elevate Your Living Experience
            </Heading>
            <Text size="lg" color="charcoal" className="mb-8">
              At Skyhouse, we believe that a home is more than just four walls. It's a lifestyle, a community, 
              and a sanctuary where memories are made. Our carefully curated facilities are designed to enhance 
              every aspect of your daily life, providing you with unparalleled comfort and convenience.
            </Text>
            <Text size="lg" color="charcoal">
              From state-of-the-art fitness centers to serene relaxation spaces, every facility is thoughtfully 
              planned to meet the diverse needs of our residents. Whether you're looking to stay active, spend 
              quality time with family, or simply unwind after a long day, our premium amenities are here to 
              support your lifestyle goals.
            </Text>
          </div>
        </div>

        {/* Facilities Grid with Flip Cards */}
        <div className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Heading as="h2" variant="section" color="charcoal" className="mb-4">
                Explore Our Facilities
              </Heading>
              <Text size="lg" color="slate">
                Hover over each card to discover more details
              </Text>
            </div>

            {facilities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {facilities.map((facility) => (
                  <div
                    key={facility.id}
                    className="group h-80 perspective-1000"
                    onMouseEnter={() => setFlippedCard(facility.id)}
                    onMouseLeave={() => setFlippedCard(null)}
                  >
                    <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                      flippedCard === facility.id ? 'rotate-y-180' : ''
                    }`}>
                      {/* Front of Card - Image */}
                      <div className="absolute inset-0 backface-hidden rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={facility.image}
                          alt={facility.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                          <Heading as="h3" variant="card" color="white" className="!text-2xl">
                            {facility.title}
                          </Heading>
                        </div>
                      </div>

                      {/* Back of Card - Details */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-skyhouse-ocean to-skyhouse-slate rounded-lg shadow-lg p-6 flex flex-col justify-center items-center text-center">
                        <Heading as="h3" variant="card" color="white" className="!text-2xl mb-4">
                          {facility.title}
                        </Heading>
                        <Text color="white" className="opacity-90">
                          {facility.description}
                        </Text>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <Text size="lg" color="slate">No facilities available at the moment</Text>
              </div>
            )}
          </div>
        </div>

        {/* What Makes a Good House Great - Slider Section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Side - Title */}
            <div className="lg:col-span-4 text-center lg:text-left">
              <Heading as="h2" variant="section" color="charcoal" className="mb-4">
                What Makes a Good House Great
              </Heading>
            </div>

            {/* Right Side - Slider */}
            <div className="lg:col-span-8">
              <div className="relative">
                {/* Slider Container */}
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {Array.from({ length: Math.ceil(greatFeatures.length / cardsPerSlide) }).map((_, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {greatFeatures.slice(slideIndex * cardsPerSlide, slideIndex * cardsPerSlide + cardsPerSlide).map((feature, index) => (
                            <div key={slideIndex * 3 + index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                              <div className="inline-flex items-center justify-center w-16 h-16 bg-skyhouse-ocean/10 rounded-full mb-4">
                                <div className="text-skyhouse-ocean scale-75">
                                  {feature.icon}
                                </div>
                              </div>
                              <Heading as="h3" variant="card" color="charcoal" className="!mb-3 !text-lg">
                                {feature.title}
                              </Heading>
                              <Text size="sm" color="charcoal" className="opacity-80">
                                {feature.description}
                              </Text>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 p-2 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 p-2 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                  aria-label="Next slide"
                >
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: Math.ceil(greatFeatures.length / cardsPerSlide) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentSlide === index 
                        ? 'bg-skyhouse-ocean w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </PageLayout>
  );
}

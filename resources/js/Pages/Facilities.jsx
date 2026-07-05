import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import PageLayout from '@/Components/Frontend/PageLayout';
import { Heading, Text, Button } from '@/Components/Frontend/atoms';
import ImagePreviewModal from '@/Components/Frontend/ImagePreviewModal';
import '@css/frontend.css';
import '@css/frontend/news-page.css';

export default function Facilities({ facilities: backendFacilities = [], pageInfo = null }) {
  const { settings } = usePage().props;
  const facilitiesSubtitle = settings?.sections?.facilities_section_subtitle || 'Click on each card to explore our complete range of facilities';

  const [previewFacility, setPreviewFacility] = useState(null);
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: 'CCTV 360°',
      description:
        'Comprehensive surveillance across all public areas with complete visibility and no blind spots, ensuring maximum safety throughout the property.'
    },

    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M8 17l4 4 4-4m-4-5v9M5 8h14l-2-4H7L5 8z"
          />
        </svg>
      ),
      title: 'Integrated Parking',
      description:
        'Smart parking system connected directly with building management and security to keep vehicle access organized and protected.'
    },

    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M17 20h5V10H2v10h5m10 0v-2a3 3 0 00-6 0v2m6 0H7"
          />
        </svg>
      ),
      title: 'Lobby Security Personnel',
      description:
        'Dedicated security staff stationed in every tower to provide additional protection and rapid assistance whenever needed.'
    },

    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M8 10h8m-8 4h5m-9 7h14a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: 'Lobby Concierge',
      description:
        'Hotel-style concierge service that welcomes residents and manages entry flow professionally for added comfort and convenience.'
    },

    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 13H3v-2a6 6 0 0118 0v2z"
          />
        </svg>
      ),
      title: 'Elevator Access Card',
      description:
        'Private access card system allowing residents to reach only authorized floors and shared facilities, enhancing privacy and security.'
    },

    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-9 5h8a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: 'Video Intercom',
      description:
        'Monitor and communicate with visitors directly from inside your unit before granting access for greater convenience and peace of mind.'
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
    <>
      <Head>
        <title>Facilities - Sky House Alam Sutera</title>
        <meta name="description" content="Explore world-class facilities at Sky House Alam Sutera — designed for comfort, security, and modern living." />
      </Head>
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
          {/* Top Banner Section */}
          <section className="news-top-banner" data-section="facilities-page-info">
            <div className="news-banner-image-wrapper">
              <img
                src={pageInfo?.banner_image || "/images/banner/Facilities-Banner.webp"}
                alt="Facilities Banner"
                className="news-banner-image"
              />
              <div className="news-banner-overlay">
                <div className="padding-global">
                  <div className="container-large">
                    <h1 className="news-banner-title">{pageInfo?.title || "Our Facilities"}</h1>
                    <p className="news-banner-subtitle">{pageInfo?.subtitle || "Elevate your living experience with our premium amenities"}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Facilities Grid with Flip Cards */}
          <div className="bg-gray-50 py-16 md:py-24" data-section="facilities">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Heading as="h2" variant="section" color="charcoal" className="mb-4">
                  Explore Our Facilities
                </Heading>
                <Text size="lg" color="slate">
                  {facilitiesSubtitle}
                </Text>
              </div>

              {facilities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {facilities.map((facility) => (
                    <div
                      key={facility.id}
                      className="group h-80 cursor-pointer"
                      onClick={() => setPreviewFacility(facility)}
                    >
                      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={facility.image}
                          alt={facility.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                          <div>
                            <Heading as="h3" variant="card" color="white" className="!text-2xl">
                              {facility.title}
                            </Heading>
                            {facility.description && (
                              <Text size="sm" color="white" className="mt-2 line-clamp-1 opacity-0 group-hover:opacity-90 transition-opacity duration-300">
                                {facility.description}
                              </Text>
                            )}
                          </div>
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
                  6 Layers Security System
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
                        <div key={slideIndex} className="w-full flex-shrink-0 flex justify-center">
                          <div className="flex flex-wrap justify-center gap-6 w-full">
                            {greatFeatures.slice(slideIndex * cardsPerSlide, slideIndex * cardsPerSlide + cardsPerSlide).map((feature, index) => (
                              <div key={slideIndex * 3 + index} className="bg-white rounded-lg shadow-lg p-6 text-center w-full md:w-[calc(33.333%-1rem)]">
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
                      className={`w-3 h-3 rounded-full transition-all ${currentSlide === index
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

        {/* Facility detail modal */}
        {previewFacility && (
          <ImagePreviewModal
            isOpen={!!previewFacility}
            onClose={() => setPreviewFacility(null)}
            image={previewFacility?.image}
            title={previewFacility?.title}
            description={previewFacility?.description}
            layout="side-by-side"
          />
        )}
      </PageLayout>
    </>
  );
}

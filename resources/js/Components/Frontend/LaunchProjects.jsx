import React, { useRef, useEffect, useState } from 'react';
import { Button, Heading, Text } from '@/Components/Frontend/atoms';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// LaunchProjects Component - Visit Kinary House
const LaunchProjects = ({ facilities: backendFacilities = [] }) => {
  const bgRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        const rect = bgRef.current.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const offset = scrollY - elementTop;
        
        // Apply parallax effect (move slower than scroll)
        bgRef.current.style.transform = `translateY(${offset * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && !isModalOpen) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % facilitiesData.length);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, isModalOpen]);

  // Fallback data if no backend data is available
  const defaultFacilitiesData = [
    {
      id: 1,
      title: 'Swimming Pool',
      description: 'Olympic-sized pool with modern facilities',
      image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=1200&h=800&fit=crop'
    },
    {
      id: 2,
      title: 'Fitness Center',
      description: 'State-of-the-art gym equipment',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop'
    },
    {
      id: 3,
      title: 'Garden Park',
      description: 'Lush green spaces for relaxation',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop'
    },
    {
      id: 4,
      title: 'Kids Playground',
      description: 'Safe and fun play area for children',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=800&fit=crop'
    },
    {
      id: 5,
      title: 'Clubhouse',
      description: 'Community gathering and events space',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop'
    },
    {
      id: 6,
      title: 'Basketball Court',
      description: 'Full-size court for sports activities',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=800&fit=crop'
    },
    {
      id: 7,
      title: 'Jogging Track',
      description: 'Scenic running and walking paths',
      image: 'https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=1200&h=800&fit=crop'
    }
  ];

  // Use backend data if available, otherwise use default data
  const facilitiesData = backendFacilities.length > 0 ? backendFacilities : defaultFacilitiesData;

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background with gradient mask */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/images/hero/bg-blur.png)',
          maskImage: 'linear-gradient(to top, transparent 0%, transparent 15%, rgba(0,0,0,0.3) 40%, black 70%)',
          WebkitMaskImage: 'linear-gradient(to top, transparent 0%, transparent 15%, rgba(0,0,0,0.3) 40%, black 70%)'
        }}
      ></div>
      
      

      {/* Facilities Section */}
      <div className="max-w-7xl mx-auto relative z-10 mt-16 lg:mt-4 px-4">
        <div className="text-center mb-8 lg:mb-12">
          <div className="flex">
            <div>
              <Heading as="h3" variant="section" className="mb-4">
                Premium
              </Heading>
              <Heading as="h1" variant="section" className="mb-4">
                <span className="font-bodoni !italic">Facilities</span>
              </Heading>
            </div>
            <Button href="/facilities" variant="outline" className="ml-auto self-center hidden lg:flex">
              See all facilities
            </Button>
          </div>
          <Text size="lg" className="text-gray-600 max-w-2xl mx-auto">
            Discover exceptional amenities designed for your lifestyle
          </Text>
        </div>

        <div 
          className="flex gap-3 lg:gap-5 h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {facilitiesData.map((facility, index) => (
            <div
              key={facility.id}
              onClick={() => {
                if (index === activeIndex) {
                  setIsModalOpen(true);
                  setIsPaused(true);
                } else {
                  setActiveIndex(index);
                }
              }}
              className={`relative overflow-hidden rounded-[100px] shadow-xl transition-all duration-700 ease-in-out group cursor-pointer ${
                index === activeIndex 
                  ? 'flex-[3] md:flex-[4] lg:flex-[5] !rounded-[30px]' 
                  : 'hidden lg:flex lg:flex-1 lg:hover:flex-[1.5]'
              }`}
            >
              <img
                src={facility.image}
                alt={facility.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className={`absolute bottom-0 left-0 right-0 p-4 lg:p-8 transition-opacity duration-500 ${
                index === activeIndex ? 'opacity-100' : 'opacity-0 lg:opacity-0'
              }`}>
                <Heading as="h3" variant="card" className="text-white mb-2">
                  {facility.title}
                </Heading>
                <Text size="sm" className="text-white/90">
                  {facility.description}
                </Text>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {facilitiesData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === activeIndex 
                  ? 'w-8 h-3 bg-skyhouse-ocean' 
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Mobile button positioned below slider */}
        <div className="flex justify-center mt-6 lg:hidden">
          <Button href="/facilities" variant="outline">
            See all facilities
          </Button>
        </div>
      </div>

      {/* Full size image modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4"
          style={{ zIndex: 10000 }}
          onClick={() => {
            setIsModalOpen(false);
            setIsPaused(false);
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsPaused(false);
              }}
              className="absolute top-4 right-4 text-white hover:text-skyhouse-sunshine transition-colors z-10"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="relative max-w-full max-h-full">
              <img
                src={facilitiesData[activeIndex].image}
                alt={facilitiesData[activeIndex].title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <Heading as="h3" variant="card" className="text-white mb-2">
                  {facilitiesData[activeIndex].title}
                </Heading>
                <Text size="md" className="text-white/90">
                  {facilitiesData[activeIndex].description}
                </Text>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .launch-projects-pagination :global(.swiper-pagination-bullet),
        .launch-projects-pagination-mobile :global(.swiper-pagination-bullet) {
          width: 10px;
          height: 10px;
          background: #cbd5e1;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        @media (min-width: 1024px) {
          .launch-projects-pagination :global(.swiper-pagination-bullet) {
            width: 12px;
            height: 12px;
          }
        }
        .launch-projects-pagination :global(.swiper-pagination-bullet-active),
        .launch-projects-pagination-mobile :global(.swiper-pagination-bullet-active) {
          background: #1E3A8A;
          opacity: 1;
          transform: scale(1.3);
        }
        .launch-projects-pagination :global(.swiper-pagination-bullet:hover),
        .launch-projects-pagination-mobile :global(.swiper-pagination-bullet:hover) {
          opacity: 0.8;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default LaunchProjects;

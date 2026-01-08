import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Button, Heading, Text } from '@/Components/Frontend/atoms';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// LaunchProjects Component - Visit Kinary House
const LaunchProjects = () => {
  const swiperRef = useRef(null);
  const bgRef = useRef(null);

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

  const launchProjectsData = [
    {
      id: 1,
      title: 'Visit',
      subtitle: 'Kinary House',
      location: 'South Tangerang',
      description: 'Hi, skyhousefam! We\'re excited to share that Kinary House finally has its own show unit. Make sure to book an appointment with our skyhouseteam before stopping by.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      link: '#'
    },
    {
      id: 2,
      title: 'Discover',
      subtitle: 'Wellspring House',
      location: 'South Tangerang',
      description: 'Experience the serene beauty of Wellspring House. A perfect blend of modern design and natural elements, featuring a stunning sunny patio for your outdoor moments.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      link: '#'
    },
    {
      id: 3,
      title: 'Explore',
      subtitle: 'Evertree House',
      location: 'South Tangerang',
      description: 'Step into Evertree House and embrace outdoor living. With a semi-outdoor kitchen and dining area, this is where comfort meets nature in perfect harmony.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      link: '#'
    }
  ];

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
      
        <div className="max-w-7xl mx-auto relative z-10 overflow-hidden">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.launch-projects-pagination',
            }}
            navigation={{
              prevEl: '.launch-projects-prev',
              nextEl: '.launch-projects-next',
            }}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            className="h-auto lg:h-[700px] pb-16 lg:pb-0 overflow-visible"
          >
            {launchProjectsData.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12 items-center h-full p-4">
                  {/* Left Content */}
                  <div className="space-y-3 lg:space-y-4 lg:col-span-2 order-2 lg:order-1 px-2 lg:px-0">
                  <Heading as="h3" className="mb-0 leading-none">{project.title}</Heading>
                  <Heading as="h2" bodoni variant="section" className="italic">
                    {project.subtitle}
                  </Heading>
                  <div className="w-16 lg:w-20 h-1 bg-blue-900 my-4 lg:my-6"></div>
                  <Text>{project.description}</Text>
                  <div className="pt-2 lg:pt-4">
                    <Button
                      href="/project" 
                      variant="sunshine"
                      size="md"
                      squash
                    >
                        Make appointment
                    </Button>
                  </div>
                </div>

                {/* Right Image Card */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl group lg:col-span-3 order-1 lg:order-2">
                  <img
                    src={project.image}
                    alt={project.subtitle}
                    className="w-full h-[350px] md:h-[450px] lg:h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <Text as="span" size="sm" className="text-white/90 mb-2">{project.location}</Text>
                    <Heading as="h3" variant="card" className="text-white mb-0">{project.subtitle}</Heading>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons - Mobile: on sides, Desktop: horizontal layout at bottom */}
        <button 
          className="launch-projects-prev absolute left-2 top-[140px] md:top-[180px] lg:hidden -translate-y-[-20px] z-20 w-10 h-10 rounded-full !bg-white hover:!bg-skyhouse-ocean shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group border-2 border-skyhouse-ocean"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-skyhouse-ocean group-hover:text-white">
            <path d="M18 12L6 12M6 12L12 18M6 12L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button 
          className="launch-projects-next absolute right-2 top-[140px] md:top-[180px] lg:hidden -translate-y-[-20px] z-20 w-10 h-10 rounded-full !bg-white hover:!bg-skyhouse-ocean shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group border-2 border-skyhouse-ocean"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-skyhouse-ocean group-hover:text-white">
            <path d="M6 12L18 12M18 12L12 6M18 12L12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Desktop Navigation - horizontal layout at bottom */}
        <div className="hidden lg:flex items-center gap-4 absolute bottom-6 right-6 z-20">
          <button 
            className="launch-projects-prev flex-shrink-0 w-12 h-12 rounded-full !bg-white hover:!bg-skyhouse-ocean shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group border-2 border-skyhouse-ocean"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-skyhouse-ocean group-hover:text-white">
              <path d="M18 12L6 12M6 12L12 18M6 12L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="launch-projects-pagination flex flex-row gap-3 items-center"></div>

          <button 
            className="launch-projects-next flex-shrink-0 w-12 h-12 rounded-full !bg-white hover:!bg-skyhouse-ocean shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group border-2 border-skyhouse-ocean"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-skyhouse-ocean group-hover:text-white">
              <path d="M6 12L18 12M18 12L12 6M18 12L12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Mobile Pagination Dots - Below content */}
        <div className="flex lg:hidden items-center justify-center mt-6">
          <div className="launch-projects-pagination-mobile flex flex-row gap-3"></div>
        </div>
      </div>

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

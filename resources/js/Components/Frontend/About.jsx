import React, { useState, useEffect } from 'react';
import { Heading, Text, Button } from '@/Components/Frontend/atoms';

const FacilityCard = ({ images, title, description, className = "", rowSpan = "" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setCurrentImageIndex(0);
      setFadeIn(true);
      return;
    }

    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setFadeIn(true);
      }, 400);
    }, 1400);
    return () => clearInterval(interval);
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
      {/* {isHovered && ( */}
        <div className="absolute top-4 left-4 flex gap-2 z-20">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      {/* )} */}
      
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
        <Heading as="h3" variant="card" color="white" className="mb-2 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: title }} />
        <Text size="sm" color="white" className="max-w-sm opacity-90 text-xs md:text-sm">
          {description}
        </Text>
      </div>
    </div>
  );
};

const About = () => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const mapRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsMapVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* About Section */}
      <section className="py-16 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 mb-12" ref={mapRef}>
          {/* World Map Container */}
          <div className="relative w-full max-w-6xl mx-auto hidden md:block">
            {/* Map SVG */}
            <div className={`relative rounded-2xl overflow-hidden transition-all duration-1000 ${
              isMapVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`}>
              <img 
                src="/images/hero/map-curved.png" 
                alt="World Map"
                className="w-full h-auto opacity-30"
              />
              
              {/* City Pins */}
              <div className={`absolute top-[20%] left-[20%] group transition-all duration-500 ${
                isMapVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-0'
              }`} style={{ transitionDelay: '400ms' }}>
                <div className="relative">
                  <svg 
                    width="60" 
                    height="60" 
                    viewBox="0 0 24 24" 
                    className="cursor-pointer hover:scale-125 transition-transform drop-shadow-lg"
                  >
                    <path 
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                      fill="#F5D87F"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                    />
                  </svg>
                  <div className="absolute top-1/2 -translate-y-1/2 left-full mr-1 opacity-100 pointer-events-none">
                    <div className="relative bg-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-3">
                      <Text size="sm" weight="semibold" color="charcoal">USA</Text>
                      <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* India */}
              <div className={`absolute top-[26%] left-[70%] group transition-all duration-500 ${
                isMapVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-0'
              }`} style={{ transitionDelay: '600ms' }}>
                <div className="relative">
                  <svg 
                    width="60" 
                    height="60" 
                    viewBox="0 0 24 24" 
                    className="cursor-pointer hover:scale-125 transition-transform drop-shadow-lg"
                  >
                    <path 
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                      fill="#F5D87F"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                    />
                  </svg>
                  <div className="absolute top-1/2 -translate-y-1/2 right-full mr-1 opacity-100 pointer-events-none">
                    <div className="relative bg-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-3">
                      <Text size="sm" weight="semibold" color="charcoal">India</Text>
                      <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Thailand */}
              <div className={`absolute top-[32%] left-[77%] group transition-all duration-500 ${
                isMapVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-0'
              }`} style={{ transitionDelay: '800ms' }}>
                <div className="relative">
                  <svg 
                    width="60" 
                    height="60" 
                    viewBox="0 0 24 24" 
                    className="cursor-pointer hover:scale-125 transition-transform drop-shadow-lg"
                  >
                    <path 
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                      fill="#F5D87F"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                    />
                  </svg>
                  <div className="absolute top-1/2 -translate-y-1/2 left-full mr-1 opacity-100 pointer-events-none">
                    <div className="relative bg-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-3">
                      <Text size="sm" weight="semibold" color="charcoal">Thailand</Text>
                      <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Indonesia */}
              <div className={`absolute top-[46%] left-[78%] group transition-all duration-500 ${
                isMapVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-0'
              }`} style={{ transitionDelay: '1000ms' }}>
                <div className="relative">
                  <svg 
                    width="60" 
                    height="60" 
                    viewBox="0 0 24 24" 
                    className="cursor-pointer hover:scale-125 transition-transform drop-shadow-lg"
                  >
                    <path 
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                      fill="#F5D87F"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                    />
                  </svg>
                  <div className="absolute top-1/2 -translate-y-1/2 left-full mr-1 opacity-100 pointer-events-none">
                    <div className="relative bg-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-3">
                      <Text size="sm" weight="semibold" color="charcoal">Indonesia</Text>
                      <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* New Zealand */}
              <div className={`absolute top-[85%] left-[88%] group transition-all duration-500 ${
                isMapVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-0'
              }`} style={{ transitionDelay: '1200ms' }}>
                <div className="relative">
                  <svg 
                    width="60" 
                    height="60" 
                    viewBox="0 0 24 24" 
                    className="cursor-pointer hover:scale-125 transition-transform drop-shadow-lg"
                  >
                    <path 
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                      fill="#F5D87F"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                    />
                  </svg>
                  <div className="absolute top-1/2 -translate-y-1/2 right-full mr-1 opacity-100 pointer-events-none">
                    <div className="relative bg-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-3">
                      <Text size="sm" weight="semibold" color="charcoal">New Zealand</Text>
                      <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <img src="/images/hero/risland-logo.jpeg" alt="Risland Logo" className="w-64 h-64 md:w-48 md:h-48 pointer-events-none rounded-full mx-auto md:mx-0 md:absolute md:bottom-0 md:left-0" />
        </div>

        <div className="px-4 md:px-12 mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/3 order-1 lg:order-2">
              <div className="block rounded-3xl p-0 md:p-8 flex flex-col">
                <Heading as="h2" variant="card" className="mb-3">About</Heading>
                <Heading as="h2" variant="card" bodoni className="mb-3 italic">Company</Heading>
                <div className="block bg-blue-300 h-1 w-16 my-4"></div>
              </div>
            </div>
            <div className="w-full lg:w-2/3 px-0 md:px-14 order-2 lg:order-1">
              <Text
                as="span"
                size="lg"
                className="block"
                style={{ textAlign: 'justify' }}
              >
                <b>Risland Holdings</b> is a Hong Kong–based multinational real estate company engaged in residential development, commercial real estate, property management, and infrastructure construction and operation. By 2018, it had developed projects across multiple countries, including the United States, New Zealand, Thailand, India, and Indonesia.
                In Indonesia, Risland combines its leading design concepts with local market needs through its premium apartment line, Sky House, which has been present in the market for two years. Sky House Alam Sutera+ is the second Sky House project in Indonesia.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section
        className="services-section bg-skyhouse-ocean py-20 px-4 md:px-8 lg:px-16"
        style={{ 
          backgroundImage: 'url(/images/hero/bg-blur.png)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="services-grid grid grid-cols-1 lg:grid-cols-2 gap-6 lg:grid-rows-3">
            {/* Left Top - Co-working Space Card */}
            <div className="service-card relative rounded-3xl overflow-hidden min-h-[350px] lg:row-span-2 group cursor-pointer order-2 lg:order-1">
              <img
                src="/images/facilities/jakarta.jpg"
                alt="Co-working Space"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
                <Heading as="h3" variant="card" color="white" className="mb-2 text-base md:text-xl">Located<br />in the Heart of<br /> Jabodetabek<br /> Transportation</Heading>
                <br className="hidden md:block" />
                <Text size="sm" color="white" className="max-w-xs opacity-90 text-xs md:text-sm">
                  Strategically positioned between Jakarta CBD, BSD CBD, and Soekarno-Hatta International Airport, right at the “Golden Triangle” of Greater Jakarta.
                </Text>
              </div>
            </div>

            <FacilityCard
              images={[
                "/images/facilities/2.jpg",
                "/images/facilities/1.jpeg",
                "/images/facilities/3.jpg"
              ]}
              title="Complete Surroundings"
              description="Mall @ Alam Sutera, Living World Mall, Flavor Bliss, Binus University, Omni Hospital, and other key facilities within 5–10 minutes."
              className="order-4"
            />

            {/* Architecture Card */}
            <div className="service-card bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl p-6 md:p-8 flex flex-col justify-center order-1 lg:order-3">
              <Heading as="h3" variant="card" className="mb-3 text-lg md:text-xl">Experience</Heading>
              <Heading as="h3" variant="card" bodoni className="mb-3 italic text-lg md:text-xl">Skyhouse Alam Sutera</Heading>
              <div className="block bg-blue-300 h-1 w-16 my-4"></div>
              <Text size="base" color="charcoal" className="text-sm md:text-base">
                We offers a strategic location, complete surrounding facilities, high investment potential, and an efficient layout—making it an ideal choice for both living and investment.
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
                "/images/facilities/studio-1.jpg",
                "/images/facilities/studio-2.jpg",
              ]}
              title="High Investment Potential"
              description="The most affordable studio-unit investment in Alam Sutera with strong potential for high ROI."
              className="order-4"
            />

            <FacilityCard
              images={[
                "/images/facilities/room-1.jpg",
                "/images/facilities/room-2.jpg",
                "/images/facilities/room-3.jpg",
              ]}
              title="Efficient Layout"
              description="Smart, professional design with zero wasted space and a 3-meter-wide cozy room for maximum comfort."
              className="order-5"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

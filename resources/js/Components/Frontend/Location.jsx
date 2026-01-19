import React, { useState, useEffect } from 'react';
import { Heading, Text, Button } from '@/Components/Frontend/atoms';
import axios from 'axios';

const Location = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationData, setLocationData] = useState({
    title: 'Strategic Location in CBD of Alam Sutera',
    image_url: '/images/maps.jpg',
    google_maps_link: 'https://maps.app.goo.gl/Ru7myaVcPCSgNspo7'
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch location map data from backend
  useEffect(() => {
    const fetchLocationMap = async () => {
      try {
        const response = await axios.get('/api/location-map');
        const data = response.data.data;

        if (data) {
          setLocationData({
            title: data.title || 'Strategic Location in CBD of Alam Sutera',
            image_url: data.image_url || '/images/maps.jpg',
            google_maps_link: data.google_maps_link || 'https://maps.app.goo.gl/Ru7myaVcPCSgNspo7'
          });
        }
      } catch (error) {
        console.error('Error fetching location map:', error);
        // Use default data if fetch fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationMap();
  }, []);

  return (
    <>
      <section
      className="relative overflow-hidden px-4 md:px-8 lg:px-16 bg-skyhouse-ocean"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(245, 216, 127, 0.15) 1px, transparent 2px)`,
        backgroundSize: '20px 20px'
      }}
    >
      {/* Inner shadow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10" style={{
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent)'
      }}></div>

      <div className="container mx-auto relative z-0">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-6 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left w-full lg:w-1/3 py-8 lg:py-12 px-4 lg:px-0">
            <Heading
              as="h3"
              variant="section"
              color="white"
              weight="light"
              className="text-center md:text-left text-2xl md:text-3xl lg:text-4xl"
            >
              <div dangerouslySetInnerHTML={{ __html: locationData.title }} />
            </Heading>

            <Button
              onClick={() => window.open(locationData.google_maps_link, '_blank')}
              href="#"
              variant="pill-light-sunshine"
              size="md"
              squash
              className="mt-6 lg:mt-8"
            >
              See Google Map
            </Button>
          </div>

          <div
            className="w-full lg:w-2/3 h-[400px] md:h-[600px] lg:h-[600px] py-0 lg:py-12 px-4 lg:px-0 transition-transform duration-300 hover:-translate-y-6 cursor-pointer -mb-[200px] relative group"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={locationData.image_url}
              alt={locationData.title}
              className="w-full h-full object-cover object-top rounded-[30px] lg:rounded-[50px] shadow-2xl"
            />
            {/* Click to expand button */}
            <div className="absolute top-4 left-4 lg:top-8 lg:left-8 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg flex items-center gap-3 transition-all duration-300 group-hover:scale-110">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                <span className="text-skyhouse-ocean font-medium text-lg">Click to expand</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Full size map modal */}
    {isModalOpen && (
      <div
        className="fixed inset-0 bg-black/80 flex items-center justify-center p-4"
        style={{ zIndex: 10000 }}
        onClick={() => setIsModalOpen(false)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-skyhouse-sunshine transition-colors z-10"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <img
            src={locationData.image_url}
            alt={`${locationData.title} - Full Size`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    )}
    </>
  );
};

export default Location;

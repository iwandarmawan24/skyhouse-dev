import React, { useState, useEffect } from 'react';
import { Heading, Text, Button } from '@/Components/Frontend/atoms';
import axios from 'axios';

const Location = () => {
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

      <div className="container max-w-7xl mx-auto pt-8 relative z-0">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center py-8 lg:py-16">
          {/* Left side - Content */}
          <div className="text-center lg:text-left w-full lg:w-1/3 shrink-0 py-8 lg:py-12 px-4 lg:px-0">
            <Heading
              as="h3"
              variant="section"
              color="white"
              weight="light"
              className="text-center text-2xl md:text-3xl lg:text-4xl"
            >
              <div dangerouslySetInnerHTML={{ __html: locationData.title }} />
            </Heading>

            <Button
              onClick={() => window.open(locationData.google_maps_link, '_blank')}
              href="#"
              variant="pill-light-sunshine"
              size="md"
              squash
              className="mt-2 lg:mt-8"
            >
              See Google Map
            </Button>
          </div>

          <div
            className="w-full lg:w-2/3 px-4 lg:px-0 mb-12 bg-white rounded-[30px] lg:rounded-[50px] p-3 lg:p-5 shadow-2xl max-h-[500px] overflow-hidden flex flex-row justify-center"
          >
            <img
              src={locationData.image_url}
              alt={locationData.title}
              style={{ width: 'max-content', height: '100%', maxHeight: '500px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;

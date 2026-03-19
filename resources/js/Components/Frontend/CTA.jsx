import React, { useState, useEffect } from 'react';
import { Button, Heading, Text } from '@/Components/Frontend/atoms';

// CTA Component
const CTA = () => {
  const [instagramImages, setInstagramImages] = useState([]);

  // Fallback images for when no data from backend
  const fallbackImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=400&fit=crop'
  ];

  useEffect(() => {
    const fetchInstagramImages = async () => {
      try {
        const response = await fetch('/api/instagram-gallery');
        const result = await response.json();
        if (result.success && result.data) {
          const images = result.data.map((url, index) => url || fallbackImages[index]);
          setInstagramImages(images);
        } else {
          setInstagramImages(fallbackImages);
        }
      } catch (error) {
        console.error('Failed to fetch Instagram images:', error);
        setInstagramImages(fallbackImages);
      }
    };

    fetchInstagramImages();
  }, []);

  const displayImages = instagramImages.length > 0 ? instagramImages : fallbackImages;

  return (
    <section className="relative bg-skyhouse-ocean overflow-hidden">
      {/* Large decorative italic text in background */}
      <div className="pointer-events-none select-none absolute -top-6 left-0 right-0 flex justify-center overflow-hidden">
        <span className="font-bodoni italic text-[clamp(80px,18vw,220px)] font-bold text-white/5 whitespace-nowrap leading-none">
          Skyhouse
        </span>
      </div>

      {/* Sunshine accent line at top */}
      <div className="h-1 w-full bg-skyhouse-sunshine" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* Left — CTA content */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Label chip */}
            <span className="inline-flex self-start items-center gap-2 bg-skyhouse-sunshine/10 border border-skyhouse-sunshine/40 text-skyhouse-sunshine text-sm font-semibold tracking-widest uppercase px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-skyhouse-sunshine inline-block" />
              Get in touch
            </span>

            <Heading as="h2" variant="section" color="white" weight="light" className="leading-snug">
              Reach out to us and explore{' '}
              <span className="font-bodoni italic text-skyhouse-sunshine">Skyhouse</span>{' '}
              in more detail!
            </Heading>

            <Text className="text-white/70 text-lg max-w-md">
              Feel free to ask anything, and our team will respond to you right away.
            </Text>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button href="/contact-us" variant="sunshine" size="lg">
                Contact us
              </Button>
            </div>
          </div>

          {/* Right — Instagram mosaic */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {displayImages.map((image, index) => (
                <div
                  key={index}
                  className={`overflow-hidden rounded-2xl`}
                >
                  <img
                    src={image}
                    alt={`Instagram post ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            <a
              href="https://www.instagram.com/skyhouse_alamsuteraid/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/60 hover:text-skyhouse-sunshine transition-colors duration-200 text-base font-medium self-end"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
              See our Instagram
            </a>
          </div>

        </div>
      </div>

      {/* Sunshine accent line at bottom */}
      <div className="h-1 w-full bg-skyhouse-sunshine" />
    </section>
  );
};

export default CTA;

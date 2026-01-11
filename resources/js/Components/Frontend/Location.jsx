import React, { useState } from 'react';
import { Heading, Text, Button } from '@/Components/Frontend/atoms';

const Location = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              Strategic Location in CBD of <span className="font-bodoni italic">Alam Sutera</span>
            </Heading>

            <Button
              onClick={() => window.open('https://maps.app.goo.gl/Ru7myaVcPCSgNspo7', '_blank')}
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
            className="w-full lg:w-2/3 h-[400px] md:h-[600px] lg:h-[600px] py-0 lg:py-12 px-4 lg:px-0 transition-transform duration-300 hover:-translate-y-6 cursor-pointer -mb-[200px]"
            onClick={() => setIsModalOpen(true)}
          >
            <img 
              src="/images/maps.jpg" 
              alt="Strategic Location Map" 
              className="w-full h-full object-cover object-top rounded-[30px] lg:rounded-[50px] shadow-2xl"
            />
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
            src="/images/maps.jpg" 
            alt="Strategic Location Map - Full Size" 
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

import React, { useState, useEffect } from 'react';
import PageLayout from '@/Components/Frontend/PageLayout';
import { Heading, Text } from '@/Components/Frontend/atoms';
import Button from '@/Components/Frontend/atoms/Button';
import axios from 'axios';
import '@css/frontend.css';

export default function ProjectDetail({ project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [brochure, setBrochure] = useState(null);
  const [isLoadingBrochure, setIsLoadingBrochure] = useState(true);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === project.gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? project.gallery.length - 1 : prevIndex - 1
    );
  };

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextModalImage = () => {
    setModalImageIndex((prevIndex) => 
      prevIndex === project.gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevModalImage = () => {
    setModalImageIndex((prevIndex) => 
      prevIndex === 0 ? project.gallery.length - 1 : prevIndex - 1
    );
  };

  // Fetch brochure data
  useEffect(() => {
    const fetchBrochure = async () => {
      try {
        const response = await axios.get('/api/brochure');
        if (response.data.success) {
          setBrochure(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching brochure:', error);
      } finally {
        setIsLoadingBrochure(false);
      }
    };

    fetchBrochure();
  }, []);

  // Handle download brochure
  const handleDownloadBrochure = () => {
    if (brochure && brochure.file_url) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = brochure.file_url;
      link.download = brochure.filename || 'brochure';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Close modal on ESC key
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

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
        {/* Featured Image Hero Section */}
        <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
          <img 
            src={project.featured_image} 
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
            <div className="container mx-auto">
              <Text as="span" size="sm" weight="medium" color="white" className="inline-block px-4 py-1 mb-4 bg-white/20 backdrop-blur-sm rounded-full">
                {project.type}
              </Text>
              <Heading as="h1" variant="section" color="white" className="mb-2">
                {project.name}
              </Heading>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-12 py-12 md:py-16">
          {/* Price and Quick Info */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 bg-gray-50 rounded-lg">
              <div>
                <Text color="slate" className="!text-lg mb-1">Starting Price</Text>
                <Heading as="h4" variant="subsection" color="charcoal">
                  {project.price}
                </Heading>
              </div>
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <Text className="!text-md" color="charcoal">{project.specifications.bedrooms} Bedrooms</Text>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <Text className="!text-md" color="charcoal">{project.specifications.bathrooms} Bathrooms</Text>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <Text className="!text-md" color="charcoal">{project.specifications.land_area} m²</Text>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description Section */}
              <div>
                <Heading as="h4" variant="subsection" color="charcoal" className="!mb-6">
                  About This Project
                </Heading>
                <div
                  className="prose prose-lg max-w-none text-justify text-gray-700"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </div>

              {/* Specifications Grid */}
              <div>
                <Heading as="h4" variant="subsection" color="charcoal" className="!mb-6">
                  Specifications
                </Heading>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="relative p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden">
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-10">
                      <svg className="w-24 h-24 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <Heading as="h3" variant="card" color="slate" className="!text-sm !font-medium mb-2">Land Area</Heading>
                      <Text size="lg" weight="bold" color="charcoal" className="!text-lg">{project.specifications.land_area} m²</Text>
                    </div>
                  </div>
                  <div className="relative p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden">
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-10">
                      <svg className="w-24 h-24 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <Heading as="h3" variant="card" color="slate" className="!text-sm !font-medium mb-2">Building Area</Heading>
                      <Text size="lg" weight="bold" color="charcoal" className="!text-lg">{project.specifications.building_area} m²</Text>
                    </div>
                  </div>
                  <div className="relative p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden">
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-10">
                      <svg className="w-24 h-24 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <Heading as="h3" variant="card" color="slate" className="!text-sm !font-medium mb-2">Bedrooms</Heading>
                      <Text size="lg" weight="bold" color="charcoal" className="!text-lg">{project.specifications.bedrooms}</Text>
                    </div>
                  </div>
                  <div className="relative p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden">
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-10">
                      <svg className="w-24 h-24 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <Heading as="h3" variant="card" color="slate" className="!text-sm !font-medium mb-2">Bathrooms</Heading>
                      <Text size="lg" weight="bold" color="charcoal" className="!text-lg">{project.specifications.bathrooms}</Text>
                    </div>
                  </div>
                  <div className="relative p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden">
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-10">
                      <svg className="w-24 h-24 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <Heading as="h3" variant="card" color="slate" className="!text-sm !font-medium mb-2">Floors</Heading>
                      <Text size="lg" weight="bold" color="charcoal" className="!text-lg">{project.specifications.floors}</Text>
                    </div>
                  </div>
                  <div className="relative p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden">
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-10">
                      <svg className="w-24 h-24 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <Heading as="h3" variant="card" color="slate" className="!text-sm !font-medium mb-2">Carports</Heading>
                      <Text size="lg" weight="bold" color="charcoal" className="!text-lg">{project.specifications.carports}</Text>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Gallery Slider */}
              <div>
                <Heading as="h4" variant="subsection" color="charcoal" className="!mb-6">
                  Gallery
                </Heading>
                <div className="relative">
                  {/* Main Image */}
                  <div 
                    className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg bg-gray-100 cursor-pointer group"
                    onClick={() => openModal(currentImageIndex)}
                  >
                    <img 
                      src={project.gallery[currentImageIndex]} 
                      alt={`${project.name} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Click to Enlarge Hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 px-4 py-2 rounded-full">
                        <Text size="sm" weight="medium" color="charcoal">Click to enlarge</Text>
                      </div>
                    </div>
                    
                    {/* Navigation Arrows */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110 z-10"
                      aria-label="Previous image"
                    >
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110 z-10"
                      aria-label="Next image"
                    >
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/70 text-white text-sm rounded-full">
                      {currentImageIndex + 1} / {project.gallery.length}
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                    {project.gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentImageIndex(index);
                          openModal(index);
                        }}
                        className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all hover:scale-105 cursor-pointer ${
                          currentImageIndex === index 
                            ? 'ring-4 ring-blue-500 scale-105' 
                            : 'ring-2 ring-gray-200 hover:ring-gray-300'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Make Appointment Section */}
              <div className="bg-gradient-to-br from-skyhouse-ocean/80 to-skyhouse-ocean rounded-lg shadow-lg overflow-hidden p-6">
                <Heading as="h4" variant="card" color="white" className="!mb-4">
                  Are you interested?
                </Heading>
                <Text size="sm" color="white" className="!mb-6 opacity-90">
                  Schedule a viewing or get more information about this property. Contact us to know more about pricing, availability, and special offers.
                </Text>

                <Button
                  variant="sunshine"
                  size="md"
                  fullWidth
                  className="mb-4"
                >
                  Contact Us
                </Button>

                {brochure && (
                  <Button
                    variant="terracota"
                    size="md"
                    fullWidth
                    onClick={handleDownloadBrochure}
                    disabled={isLoadingBrochure}
                  >
                    {isLoadingBrochure ? 'Loading...' : 'Download Brochure'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all z-50"
            aria-label="Close modal"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Container */}
          <div 
            className="relative max-w-7xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={project.gallery[modalImageIndex]} 
              alt={`${project.name} - Image ${modalImageIndex + 1}`}
              className="w-full h-full object-contain rounded-lg"
            />

            {/* Navigation Arrows */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                prevModalImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all hover:scale-110"
              aria-label="Previous image"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                nextModalImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all hover:scale-110"
              aria-label="Next image"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/70 backdrop-blur-sm text-white text-lg rounded-full">
              {modalImageIndex + 1} / {project.gallery.length}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}

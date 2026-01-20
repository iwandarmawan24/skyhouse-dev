import React, { useState, useMemo } from 'react';
import PageLayout from '@/Components/Frontend/PageLayout';
import '@css/frontend.css';

export default function Gallery({ galleries = [] }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);

  // Build gallery data by category from backend data
  const galleryData = useMemo(() => {
    const data = {
      all: galleries,
      facilities: galleries.filter(item => item.category === 'facilities'),
      units: galleries.filter(item => item.category === 'units'),
      events: galleries.filter(item => item.category === 'events'),
    };
    return data;
  }, [galleries]);

  const tabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'units', label: 'Units' },
    { id: 'events', label: 'Events' },
  ];

  const currentGallery = galleryData[activeTab] || [];

  const nextSlide = () => {
    setCurrentSliderIndex((prevIndex) => 
      prevIndex === currentGallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentSliderIndex((prevIndex) => 
      prevIndex === 0 ? currentGallery.length - 1 : prevIndex - 1
    );
  };

  const openLightbox = (index) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextLightboxImage = () => {
    setSelectedImage((prevIndex) => 
      prevIndex === currentGallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevLightboxImage = () => {
    setSelectedImage((prevIndex) => 
      prevIndex === 0 ? currentGallery.length - 1 : prevIndex - 1
    );
  };

  return (
    <PageLayout showBackgroundDefault={true}>
      <div className="w-full">
        {/* Hero Section with Featured Slider */}
        <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
          <div className="relative h-full">
            {currentGallery.length > 0 ? (
              <img
                src={currentGallery[currentSliderIndex]?.url}
                alt={currentGallery[currentSliderIndex]?.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <svg className="w-24 h-24 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* Slider Controls */}
            {currentGallery.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110 z-10"
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110 z-10"
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Slide Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white z-10">
              <div className="container mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                  Gallery
                </h1>
                <p className="text-lg md:text-xl text-white/90">
                  {currentGallery[currentSliderIndex]?.title || 'Explore our gallery'}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  {currentGallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSliderIndex(index)}
                      className={`h-1 rounded-full transition-all ${
                        index === currentSliderIndex 
                          ? 'w-8 bg-white' 
                          : 'w-4 bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Gallery Content */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* Tabs */}
          <div className="mb-8 border-b border-gray-200">
            <div className="flex flex-wrap gap-2 md:gap-4 pb-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentSliderIndex(0);
                  }}
                  className={`px-6 py-3 font-medium transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-skyhouse-ocean'
                      : 'border-transparent text-gray-400 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {currentGallery.map((image, index) => (
              <button
                key={image.id}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h4 className="font-semibold text-sm md:text-base">{image.title}</h4>
                  </div>
                </div>
                <div className="absolute top-2 right-2 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Empty State */}
          {currentGallery.length === 0 && (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600 text-lg">No images available in this category</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              prevLightboxImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            aria-label="Previous image"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="max-w-7xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img 
              src={currentGallery[selectedImage]?.url}
              alt={currentGallery[selectedImage]?.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4 text-white">
              <h4 className="text-lg font-semibold mb-2">
                {currentGallery[selectedImage]?.title}
              </h4>
              <p className="text-white/70">
                {selectedImage + 1} / {currentGallery.length}
              </p>
            </div>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              nextLightboxImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            aria-label="Next image"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </PageLayout>
  );
}

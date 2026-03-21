import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import ImagePreviewModal from '@/Components/Frontend/ImagePreviewModal';

const ConstructionProgressModal = ({ isOpen, onClose, data }) => {
  const [previewItem, setPreviewItem] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Only handle Escape when image preview is NOT open
  useEffect(() => {
    if (!isOpen || previewItem) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, previewItem, onClose]);

  if (!isOpen || !data) return null;

  const items = data.items || [];

  return createPortal(
    <div
      className="fixed inset-0 bg-black/90 flex flex-col z-[9999]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-[#1a3a7a]/80 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <h2 className="text-white font-bold text-lg md:text-xl truncate">
            {data.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-white hover:text-[#f5c518] transition-colors ml-4 shrink-0"
          title="Close (Esc)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
          {/* Description */}
          {data.description && (
            <p className="text-white/70 text-sm md:text-base mb-8 max-w-2xl">
              {data.description}
            </p>
          )}

          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ProgressCard
                  key={item.uid}
                  item={item}
                  onPreview={() => setPreviewItem(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/50 text-base">
                No construction progress updates yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        isOpen={!!previewItem}
        onClose={() => setPreviewItem(null)}
        image={previewItem?.image_url}
        title={previewItem?.progress_month}
      />
    </div>,
    document.body
  );
};

const ProgressCard = ({ item, onPreview }) => {
  return (
    <div className="group relative rounded-lg overflow-hidden bg-white/5 border border-white/10 hover:border-[#f5c518]/40 transition-all duration-300">
      {/* Image */}
      <div
        className="relative cursor-pointer overflow-hidden"
        onClick={() => {
          if (item.image_url) onPreview();
        }}
      >
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.progress_month}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-48 bg-white/10 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/30">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        {/* Zoom indicator */}
        {item.image_url && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
        )}
      </div>

      {/* Date label */}
      <div className="px-4 py-3">
        <h3 className="text-[#f5c518] font-semibold text-sm md:text-base uppercase tracking-wider">
          {item.progress_month}
        </h3>
      </div>
    </div>
  );
};

const ConstructionProgress = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/construction-progress');
        if (response.data.data) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching construction progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  if (isLoading || !data) return null;

  return (
    <>
      <section
        className="relative overflow-hidden bg-[#1a3a7a] cursor-pointer group"
        onClick={handleOpenModal}
      >
        {/* Yellow top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#f5c518] z-10" />

        <div className="padding-global">
          <div className="container-large">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[280px] md:min-h-[320px]">
              {/* Left - Text Content */}
              <div className="py-12 md:py-16 pr-8 lg:pr-16">
                <h2 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide mb-4">
                  {data.title}
                </h2>
                {data.description && (
                  <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-lg">
                    {data.description}
                  </p>
                )}
                {/* Click hint */}
                <div className="mt-6 flex items-center gap-2 text-[#f5c518] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>View Progress</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="translate-x-0 group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Right - Tilted Image with Overlay */}
              <div className="relative h-full flex items-center justify-center py-8 lg:py-0">
                <div
                  className="relative w-full max-w-xl transform rotate-[-4deg] shadow-2xl rounded-lg overflow-hidden group-hover:rotate-[-2deg] group-hover:scale-105 transition-all duration-500"
                >
                  <img
                    src={data.image_url}
                    alt={data.title}
                    className="w-full h-48 md:h-64 lg:h-72 object-cover"
                  />
                  {/* Overlay band */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#1a3a7a]/80 backdrop-blur-sm px-6 py-4">
                    <h3 className="text-white font-bold text-lg md:text-xl">
                      Sky House Alam Sutera+
                    </h3>
                    <p className="text-[#f5c518] font-semibold text-xs md:text-sm uppercase tracking-wider">
                      Construction Progress
                    </p>
                    <p className="text-white/70 text-xs md:text-sm">
                      nothing can stop us from building your home
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yellow bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#f5c518] z-10" />
      </section>

      <ConstructionProgressModal
        isOpen={showModal}
        onClose={handleCloseModal}
        data={data}
      />
    </>
  );
};

export default ConstructionProgress;

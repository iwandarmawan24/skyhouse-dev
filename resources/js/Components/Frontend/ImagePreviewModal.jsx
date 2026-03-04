import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Heading, Text } from '@/Components/Frontend/atoms';

const ImagePreviewModal = ({ isOpen, onClose, image, title, description }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;
  const ZOOM_STEP = 0.5;

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      positionRef.current = { x: 0, y: 0 };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => {
      const next = Math.min(prev + ZOOM_STEP, MAX_SCALE);
      if (next === 1) {
        setPosition({ x: 0, y: 0 });
        positionRef.current = { x: 0, y: 0 };
      }
      return next;
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => {
      const next = Math.max(prev - ZOOM_STEP, MIN_SCALE);
      if (next === 1) {
        setPosition({ x: 0, y: 0 });
        positionRef.current = { x: 0, y: 0 };
      }
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    positionRef.current = { x: 0, y: 0 };
  }, []);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => {
        const next = Math.min(prev + 0.2, MAX_SCALE);
        return next;
      });
    } else {
      setScale((prev) => {
        const next = Math.max(prev - 0.2, MIN_SCALE);
        if (next === 1) {
          setPosition({ x: 0, y: 0 });
          positionRef.current = { x: 0, y: 0 };
        }
        return next;
      });
    }
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - positionRef.current.x, y: e.clientY - positionRef.current.y };
  }, [scale]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const newPos = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };
    positionRef.current = newPos;
    setPosition(newPos);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (scale > 1) {
      handleReset();
    } else {
      setScale(2);
    }
  }, [scale, handleReset]);

  if (!isOpen) return null;

  const isZoomed = scale > 1;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/90 flex flex-col z-[9999]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/50 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {title && (
            <Heading as="h3" variant="card" className="text-white truncate">
              {title}
            </Heading>
          )}
          {description && (
            <Text size="sm" className="text-white/70 truncate hidden md:block">
              {description}
            </Text>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1">
            <button
              onClick={handleZoomOut}
              disabled={scale <= MIN_SCALE}
              className="p-1.5 text-white hover:text-skyhouse-sunshine transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Zoom out"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </button>

            <button
              onClick={handleReset}
              className="px-2 py-0.5 text-white/80 text-sm font-mono hover:text-white transition-colors min-w-[3.5rem] text-center"
              title="Reset zoom"
            >
              {Math.round(scale * 100)}%
            </button>

            <button
              onClick={handleZoomIn}
              disabled={scale >= MAX_SCALE}
              className="p-1.5 text-white hover:text-skyhouse-sunshine transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Zoom in"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1.5 text-white hover:text-skyhouse-sunshine transition-colors ml-2"
            title="Close (Esc)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image area */}
      <div
        ref={containerRef}
        className={`flex-1 flex items-center justify-center overflow-hidden ${isZoomed ? 'cursor-grab' : 'cursor-zoom-in'} ${isDragging ? '!cursor-grabbing' : ''}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={(e) => {
          if (e.target === e.currentTarget && !isDragging) onClose();
        }}
      >
        <img
          src={image}
          alt={title}
          draggable={false}
          onDoubleClick={handleDoubleClick}
          className="select-none rounded-lg shadow-2xl transition-transform duration-200 ease-out"
          style={{
            maxWidth: '90vw',
            maxHeight: 'calc(100vh - 60px)',
            objectFit: 'contain',
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>,
    document.body
  );
};

export default ImagePreviewModal;

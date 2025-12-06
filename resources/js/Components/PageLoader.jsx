import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import '../../css/page-loader.css';

const PageLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  console.log('PageLoader state:', { isLoading, isClosing, isNavigating });

  useEffect(() => {
    console.log('PageLoader mounted - Initial load');
    // Initial page load - wait minimum 1 second
    const timer = setTimeout(() => {
      console.log('Starting closing animation');
      setIsClosing(true);
      // Wait for curtain animation to complete
      setTimeout(() => {
        console.log('Loader hidden');
        setIsLoading(false);
        setIsClosing(false);
      }, 1500); // Curtain animation duration
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Handle Inertia page navigation
    const handleStart = () => {
      setIsNavigating(true);
      setIsClosing(false);
    };

    const handleFinish = () => {
      // Wait minimum 1 second
      setTimeout(() => {
        setIsClosing(true);
        // Wait for curtain animation to complete
        setTimeout(() => {
          setIsNavigating(false);
          setIsClosing(false);
        }, 1500);
      }, 1000);
    };

    router.on('start', handleStart);
    router.on('finish', handleFinish);

    return () => {
      router.off('start', handleStart);
      router.off('finish', handleFinish);
    };
  }, []);

  const showLoader = isLoading || isNavigating;

  return (
    <>
      {/* Loading Screen */}
      {showLoader && (
        <div className={`page-loader ${isClosing ? 'is-closing' : ''}`}>
          {/* Logo Container */}
          <div className="loader-logo-container">
            <img
              src="https://www.skyhousealamsutera.id/wp-content/uploads/2020/12/logo.png"
              alt="Skyhouse"
              className="loader-logo"
            />
          </div>

          {/* Layered Curtains */}
          <div className="curtain curtain-1"></div>
          <div className="curtain curtain-2"></div>
          <div className="curtain curtain-3"></div>
          <div className="curtain curtain-4"></div>
          <div className="curtain curtain-5"></div>
        </div>
      )}

      {/* Page Content */}
      <div className={showLoader && !isClosing ? 'content-hidden' : 'content-visible'}>
        {children}
      </div>
    </>
  );
};

export default PageLoader;

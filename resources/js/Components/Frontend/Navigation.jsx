import React, { useState, useEffect } from 'react';
import Button from '@/Components/Frontend/atoms/Button';

const Navigation = ({ hideLogoOnTop = false, showBackgroundDefault = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`navbar_component ${isScrolled ? 'is-scrolled' : ''}`}
      style={{
        backgroundColor: (isScrolled || showBackgroundDefault) ? 'rgba(17, 83, 189, 0.85)' : 'transparent',
        backdropFilter: (isScrolled || showBackgroundDefault) ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: (isScrolled || showBackgroundDefault) ? 'blur(12px)' : 'none',
        boxShadow: (isScrolled || showBackgroundDefault) ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <div className="navbar_container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        {/* Left: Desktop Menu */}
        <div className="navbar_menu" style={{ flex: '1', justifyContent: 'flex-start' }}>
          <div className="navbar-menu_wrapper">
            {/* Projects Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProjectsDropdownOpen(true)}
              onMouseLeave={() => setIsProjectsDropdownOpen(false)}
            >
              <div className="navbar2_link flex items-center gap-1">
                Projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Dropdown Menu */}
              {isProjectsDropdownOpen && (
                <div 
                  className="absolute top-full left-0 w-48 rounded-lg shadow-lg py-2 z-50"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  <a href="/project" className="block px-4 py-2 text-skyhouse-ocean hover:bg-gray-100 transition-colors">
                    Project
                  </a>
                  <a href="/facilities" className="block px-4 py-2 text-skyhouse-ocean hover:bg-gray-100 transition-colors">
                    Facilities
                  </a>
                  <a href="/gallery" className="block px-4 py-2 text-skyhouse-ocean hover:bg-gray-100 transition-colors">
                    Gallery
                  </a>
                </div>
              )}
            </div>

            {/* Company Link */}
            <a href="/about" className="navbar2_link">
              Company
            </a>

            {/* Events Link */}
            <a href="/events" className="navbar2_link">
              Events
            </a>

            {/* News Link */}
            <a href="/news" className="navbar2_link">
              News
            </a>
          </div>
        </div>

        {/* Center: Logo */}
        <a 
          href="/" 
          className="navbar_logo-link" 
          aria-label="home" 
          style={{ 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)',
            opacity: hideLogoOnTop && !isScrolled ? 0 : 1,
            visibility: hideLogoOnTop && !isScrolled ? 'hidden' : 'visible',
            transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out'
          }}
        >
          <img
            src="https://www.skyhousealamsutera.id/wp-content/uploads/2020/12/logo.png"
            alt="Skyhouse Alamsutera"
            className="navbar_logo"
          />
        </a>

        {/* Right: Contact Button - Hidden on mobile */}
        <div className="hidden lg:block">
          <Button 
            href="/contact-us"
            variant="sunshine"
            size="sm"
            squash
          >
            Get in Touch
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="navbar_menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="menu"
        >
          <div className={`menu-icon2 ${isMobileMenuOpen ? 'is-open' : ''}`}>
            <div className="menu-icon2_line-top" style={{ backgroundColor: (isScrolled || showBackgroundDefault) ? 'white' : '#1E3A8A', transition: 'background-color 0.3s ease-in-out' }}></div>
            <div className="menu-icon2_line-middle">
              <div className="menu-icon_line-middle-inner" style={{ backgroundColor: (isScrolled || showBackgroundDefault) ? 'white' : '#1E3A8A', transition: 'background-color 0.3s ease-in-out' }}></div>
            </div>
            <div className="menu-icon2_line-bottom" style={{ backgroundColor: (isScrolled || showBackgroundDefault) ? 'white' : '#1E3A8A', transition: 'background-color 0.3s ease-in-out' }}></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <a href="/project" className="mobile-menu-link">Project</a>
            <a href="/facilities" className="mobile-menu-link">Facilities</a>
            <a href="/gallery" className="mobile-menu-link">Gallery</a>
            <a href="/about" className="mobile-menu-link">About</a>
            <a href="/events" className="mobile-menu-link">Events</a>
            <a href="/news" className="mobile-menu-link">News</a>
            <a href="/contact-us" className="mobile-menu-link">Contact Us</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

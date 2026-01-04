import React, { useState, useEffect } from 'react';
import Button from '@/Components/Frontend/atoms/Button';

const Navigation = ({ isHomePage = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        backgroundColor: isScrolled ? 'rgba(17, 83, 189, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <div className="navbar_container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        {/* Left: Desktop Menu */}
        <div className="navbar_menu" style={{ flex: '1', justifyContent: 'flex-start' }}>
          <div className="navbar-menu_wrapper">
            {/* Projects Link */}
            <a href="/project" className="navbar2_link">
              Projects
            </a>

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
            opacity: isHomePage && !isScrolled ? 0 : 1,
            visibility: isHomePage && !isScrolled ? 'hidden' : 'visible',
            transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out'
          }}
        >
          <img
            src="https://www.skyhousealamsutera.id/wp-content/uploads/2020/12/logo.png"
            alt="Skyhouse Alamsutera"
            className="navbar_logo"
          />
        </a>

        {/* Right: Contact Button */}
        <div>
          <Button 
            href="/contact-us"
            variant="sunshine"
            size="sm"
            squash
          >
            Contact us
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="navbar_menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="menu"
        >
          <div className={`menu-icon2 ${isMobileMenuOpen ? 'is-open' : ''}`}>
            <div className="menu-icon2_line-top" style={{ backgroundColor: isScrolled ? 'white' : '#1E3A8A', transition: 'background-color 0.3s ease-in-out' }}></div>
            <div className="menu-icon2_line-middle">
              <div className="menu-icon_line-middle-inner" style={{ backgroundColor: isScrolled ? 'white' : '#1E3A8A', transition: 'background-color 0.3s ease-in-out' }}></div>
            </div>
            <div className="menu-icon2_line-bottom" style={{ backgroundColor: isScrolled ? 'white' : '#1E3A8A', transition: 'background-color 0.3s ease-in-out' }}></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <a href="/project" className="mobile-menu-link">Projects</a>
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

import React, { useState, useEffect } from 'react';

const Navigation = () => {
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
        backgroundColor: isScrolled ? 'rgba(245, 216, 127, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <div className="navbar_container">
        {/* Logo */}
        <a href="/" className="navbar_logo-link" aria-label="home">
          <img
            src="https://www.skyhousealamsutera.id/wp-content/uploads/2020/12/logo.png"
            alt="Skyhouse Alamsutera"
            className="navbar_logo"
          />
        </a>

        {/* Desktop Menu */}
        <div className="navbar_menu">
          <div className="navbar-menu_wrapper">
            {/* Projects Link */}
            <a href="/project" className="navbar2_link">
              Projects
            </a>

            {/* Company Link */}
            <a href="/about" className="navbar2_link">
              Company
            </a>

            {/* News Link */}
            <a href="/news" className="navbar2_link">
              News
            </a>
          </div>

          {/* Contact Button */}
          <div className="navbar_button-wrapper">
            <div className="button-squash">
              <a href="/contact-us" className="button is-navbar2-button">
                Contact us
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="navbar_menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="menu"
        >
          <div className={`menu-icon2 ${isMobileMenuOpen ? 'is-open' : ''}`}>
            <div className="menu-icon2_line-top"></div>
            <div className="menu-icon2_line-middle">
              <div className="menu-icon_line-middle-inner"></div>
            </div>
            <div className="menu-icon2_line-bottom"></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <a href="/project" className="mobile-menu-link">Projects</a>
            <a href="/about" className="mobile-menu-link">About</a>
            <a href="/news" className="mobile-menu-link">News</a>
            <a href="/contact-us" className="mobile-menu-link">Contact Us</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

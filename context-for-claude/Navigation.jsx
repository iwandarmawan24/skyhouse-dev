import React, { useState, useEffect } from 'react';
import '../styles/navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
        backgroundColor: isScrolled ? 'rgba(253, 254, 240, 1)' : 'rgba(253, 254, 240, 0.7)',
      }}
    >
      <div className="navbar_container">
        {/* Logo */}
        <a href="/" className="navbar_logo-link" aria-label="home">
          <img
            src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/650bd13efa78b97c70d9a8d8_Logo%20Easton.webp"
            alt="Easton Urban Kapital"
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

            {/* Company Dropdown */}
            <div 
              className="navbar2_menu-dropdown"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="navbar2_dropdwn-toggle">
                <div className="text-size-regular">Company</div>
                <div 
                  className="dropdown-chevron"
                  style={{
                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.55806 6.29544C2.46043 6.19781 2.46043 6.03952 2.55806 5.94189L3.44195 5.058C3.53958 4.96037 3.69787 4.96037 3.7955 5.058L8.00001 9.26251L12.2045 5.058C12.3021 4.96037 12.4604 4.96037 12.5581 5.058L13.4419 5.94189C13.5396 6.03952 13.5396 6.19781 13.4419 6.29544L8.17678 11.5606C8.07915 11.6582 7.92086 11.6582 7.82323 11.5606L2.55806 6.29544Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>

              {/* Dropdown Menu */}
              <div className={`navbar2_dropdown-list ${isDropdownOpen ? 'is-open' : ''}`}>
                <div className="navbar_dropdown-wrapper">
                  <div className="navbar_dropdown-list">
                    <div className="navbar_dropdown-title">
                      <div className="navbar_text-title">EASTON URBAN KAPITAL</div>
                    </div>
                    <a href="/about" className="navbar2_dropdown-link">About</a>
                    <a href="/career" className="navbar2_dropdown-link">Careers</a>
                    <a href="/csr" className="navbar2_dropdown-link">CSR</a>
                    <a href="https://quiz.eastonurbankapital.com/landing" target="_blank" rel="noopener noreferrer" className="navbar2_dropdown-link">Easton Quiz</a>
                    <a href="/easton-characters" className="navbar2_dropdown-link">Easton Characters</a>
                    <a href="/easton-virtual-tour" className="navbar2_dropdown-link">Easton Virtual Tour</a>
                    <a href="/easton-facilities" className="navbar2_dropdown-link">Easton Facilities</a>
                    <a href="/booklet-collection" className="navbar2_dropdown-link">Booklet Collections</a>
                  </div>

                  <div className="navbar_dropdown-list">
                    <div className="navbar_dropdown-title">
                      <div className="navbar_text-title">AFTER SALES</div>
                    </div>
                    <a href="/easton-home" className="navbar2_dropdown-link">Easton Home Mobile App</a>
                    <a href="/easton-guidebook" className="navbar2_dropdown-link">Eastonfam Guidebook</a>
                  </div>

                  <div className="navbar_dropdown-list">
                    <div className="navbar_dropdown-title">
                      <div className="navbar_text-title">AGENT</div>
                    </div>
                    <a href="/agent-portal" className="navbar2_dropdown-link">Agent Portal</a>
                  </div>
                </div>
              </div>
            </div>

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

// ==================================
// REMAINING COMPONENTS
// ==================================

import React from 'react';

// LaunchProjects Component - Visit Kinary House
export const LaunchProjects = () => {
  return (
    <section className="visit-kinary-section">
      <div className="visit-kinary-container">
        {/* Left Content */}
        <div className="visit-kinary-content">
          <h2>
            Visit<br />
            Kinary<br />
            House
          </h2>
          <p>
            Hi, eastonfam! We're excited to share that Kinary House finally has its own show unit.
            Make sure to book an appointment with our eastonteam before stopping by.
          </p>
        </div>

        {/* Right Image Card */}
        <div className="visit-kinary-card">
          <img
            src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/68c7e36c8706105a104e4804_WhatsApp-Image-2025-09-14-at-07.37-p-2600.jpg"
            alt="Kinary House"
            className="visit-kinary-image"
          />
          <div className="visit-kinary-overlay">
            <span className="visit-kinary-location">South Tangerang</span>
            <h3 className="visit-kinary-title">Kinary House</h3>
          </div>
          <a href="#" className="visit-kinary-button">
            Make appointment
          </a>
        </div>
      </div>
    </section>
  );
};

// Benefits Component
export const Benefits = () => {
  return (
    <section className="section_benefit background-color-yellow is-20">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-medium">
            <div className="benefit_component">
              <div className="benefit_wrapper">
                <h2>Easton Home, Makes Everything Better</h2>
                <p>A convenient application to support all your household needs</p>
                <a href="/easton-home" className="button">Explore more</a>
              </div>
              <div className="benefit_wrapper">
                <h2>Great Environment, Superb Public Facilities</h2>
                <p>You are welcome to utilize our general amenities at any time, at your convenience.</p>
                <a href="/easton-facilities" className="button">Discover more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Component
export const Projects = () => {
  return (
    <section className="section_project background-color-cream is-20">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-medium">
            <div className="text-align-center">
              <h2>All Easton Projects</h2>
            </div>
            {/* Add tabs and project carousel here */}
          </div>
        </div>
      </div>
    </section>
  );
};

// ShowMoreBanner Component
export const ShowMoreBanner = () => {
  return (
    <a href="/project" className="banner_component">
      <div className="project_button-text">
        <h3>Show More Projects</h3>
      </div>
      <div className="project_arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="29.541" height="22.323" viewBox="0 0 29.541 22.323">
          <g transform="translate(0 1.014)">
            <path d="M115.445,20.633l9.311-10.148L115.445.338" transform="translate(-97.25 -0.338)" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3"/>
            <line x1="27.506" transform="translate(0 10.148)" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3"/>
          </g>
        </svg>
      </div>
    </a>
  );
};

// Quiz Component
export const Quiz = () => {
  return (
    <section className="section_quiz is-bottom-rounded">
      <div className="quiz_bg"></div>
      <div className="padding-global">
        <div className="padding-section-medium">
          <div className="text-align-center">
            <h2 className="text-color-white">Discover Your Dream Home</h2>
            <p className="text-size-medium text-color-white">
              Let Easton turn your dream home wish into a wonderful reality!
            </p>
            <div className="margin-top margin-medium">
              <a href="https://quiz.eastonurbankapital.com/landing" target="_blank" rel="noopener noreferrer" className="button is-terracota">
                Start now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Characters Component
export const Characters = () => {
  return (
    <section className="section_character background-color-yellow is-bottom-rounded">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="character_component">
              <h2>Meet the Characters in Every Easton Projects</h2>
              <p className="text-size-medium">
                They're simply adorable, loads of fun, and guaranteed to bring a big smile to your day!
              </p>
              <a href="/easton-characters" className="button">Let's say hi!</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// News Component
export const News = () => {
  return (
    <section className="section_news background-color-cream is-20">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <h2>News</h2>
            <p className="text-size-medium">Don't miss our latest media update!</p>
            <a href="/news" className="button">View more</a>
            {/* Add news items here */}
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Component
export const CTA = () => {
  return (
    <section className="section_cta background-color-brown is-bottom-rounded is-20">
      <div className="padding-global">
        <div className="container-large">
          <div className="cta_component">
            <div className="cta_left">
              <h2 className="text-color-white">
                Get in touch with us to discover more about Easton!
              </h2>
              <p className="text-color-white">Ask anything, we will answer it immediately.</p>
              <a href="/contact-us" className="button">Contact us</a>
            </div>
            <div className="cta_right">
              {/* Instagram grid would go here */}
              <a href="https://www.instagram.com/eastonurbankapital/" target="_blank" rel="noopener noreferrer" className="button">
                See our instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="footer1_component">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="footer_wrapper">
              <div className="footer_left">
                <img
                  src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/650bd13efa78b97c70d9a8d8_Logo%20Easton.webp"
                  alt="Easton Urban Kapital"
                  className="footer_logo"
                />
                <div className="footer_info">
                  <h4>Address</h4>
                  <p className="text-size-small">
                    Weston Lane No.17, RT.002/RW.003, East Panunggangan, Pinang, 
                    Tangerang City, Banten 15143
                  </p>
                  <h4>Contact</h4>
                  <a href="tel:+622125684507" className="text-size-small">+62 2125 684 507 - Jakarta</a>
                  <a href="mailto:hello@eastonurbankapital.com" className="text-size-small">
                    hello@eastonurbankapital.com
                  </a>
                </div>
              </div>
              <div className="footer_links">
                <div>
                  <h4>Company</h4>
                  <a href="/about">About</a>
                  <a href="/csr">CSR</a>
                  <a href="/career">Careers</a>
                  <a href="/news">News</a>
                </div>
                <div>
                  <h4>House</h4>
                  <a href="/project">Easton Projects</a>
                  <a href="/easton-home">Easton Home App</a>
                  <a href="/easton-facilities">Easton Facilities</a>
                </div>
              </div>
            </div>
            <div className="footer_bottom">
              <p className="text-size-tiny">© 2025 Easton Urban Kapital. All rights reserved.</p>
              <a href="https://www.dianadia.com" target="_blank" rel="noopener noreferrer" className="text-size-tiny">
                Website by dianadia
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

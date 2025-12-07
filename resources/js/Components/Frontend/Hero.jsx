import React, { useEffect, useState, useRef } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const skyRef = useRef(null);
  const housesRef = useRef(null);
  const treesRef = useRef(null);

  useEffect(() => {
    // Show hero text after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      
      // Sky moves slowly (background)
      if (skyRef.current) {
        skyRef.current.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
      }
      
      // Houses move faster (foreground)
      if (housesRef.current) {
        housesRef.current.style.transform = `translate3d(-50%, ${scrolled * 0.3}px, 0)`;
      }
      
      // Trees move fastest (if enabled)
      // if (treesRef.current) {
      //   treesRef.current.style.transform = `translate3d(-50%, ${scrolled * 0.05}px, 0)`;
      // }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header ref={heroRef} className="section_hero is-bottom-rounded">
      <div className="hero_wrapper">
        {/* Sky Background - Layer 1 (slowest) */}
        <div ref={skyRef} className="hero_sky"></div>

        {/* Trees - Layer 3 (fastest) */}
        {/* <div ref={treesRef} className="hero_trees"></div> */}
      </div>

      {/* Hero Content */}
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large" style={{ paddingTop: '2rem' }}>
            <div className="header26_component">

              {/* Hero Text */}
              <div className={`text-align-center is-center ${isVisible ? 'is-visible' : ''}`}>
                <div className="hero-text">
                  <div className="padding-bottom padding-small"></div>
                  <img
                    src="https://www.skyhousealamsutera.id/wp-content/uploads/2020/12/logo.png"
                    alt="Skyhouse Alamsutera"
                    className="navbar_logo"
                    style={{ width: '150px', height: 'auto', margin: '0 auto', marginBottom: '40px' }}
                  />
                  <div className="margin-bottom margin-small">
                    <h1 className="text-color-white is-home">
                      Homes match <span className="gradient-text">lifestyle</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button - Separate from text to be in front of house */}
      <div className="padding-global" style={{ position: 'absolute', top: '60vh', left: 0, right: 0, zIndex: 25 }}>
        <div className="container-large">
          <div className="margin-top margin-large padding-bottom">
            <div className="button-group is-center">
              <div className="button-squash">
                <a href="/project" className="button is-icon">
                  <div>Knock the door</div>
                  <div className="icon-embed-xxsmall">
                    <svg height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12.6893 7.25L6.96967 1.53033L8.03033 0.469666L15.5607 8L8.03033 15.5303L6.96967 14.4697L12.6893 8.75H0.5V7.25H12.6893Z" fill="currentColor"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Houses - Layer 2 (medium speed) - Now outside wrapper */}
      <div ref={housesRef} className="hero_houses"></div>

      {/* Hero Background Overlay */}
      <div className="hero_bg"></div>
    </header>
  );
};

export default Hero;

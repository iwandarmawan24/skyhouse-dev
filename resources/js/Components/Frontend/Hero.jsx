import React, { useEffect, useState, useRef } from 'react';
import Button from '@/Components/Frontend/atoms/Button';
import { Heading, Text } from '@/Components/Frontend/atoms';

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
      <div className="padding-global" style={{ position: 'relative', zIndex: 20 }}>
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
                    <Heading as="h1" variant="hero" color="white" className="text-center !leading-none">
                      <span className="font-bodoni italic">Find</span> the Place
                      <br />Where your <span className="font-bodoni italic">Story Begins</span>
                    </Heading>
                    <div className="block bg-white h-1 w-24 mx-auto my-12"></div>
                    <Text className="text-center !mb-12" color="white" size="md">
                      Discover your dream home with Skyhouse Alamsutera
                      <br />where comfort meets elegance in the heart of the city.
                    </Text>

                    <Button 
                      href="/project" 
                      variant="pill-light-sunshine"
                      size="md"
                      squash
                    >
                      Explore Our Projects
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button - Separate from text to be in front of house */}
      {/* <div className="padding-global absolute top-[70vh] lg:top-[60vh] left-0 right-0 z-25">
        <div className="container-large">
          <div className="margin-top margin-large padding-bottom">
            <div className="button-group flex justify-center items-center">
              <Button 
                href="/project" 
                variant="pill-light-sunshine"
                size="md"
                squash
              >
                Explore Our Projects
              </Button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Houses - Layer 2 (medium speed) - Now outside wrapper */}
      <div ref={housesRef} className="hero_houses"></div>

      {/* Hero Background Overlay */}
      {/* <div className="hero_bg"></div> */}
    </header>
  );
};

export default Hero;

import React, { useEffect, useState } from 'react';
import '../styles/hero.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeHouse, setActiveHouse] = useState(1);

  useEffect(() => {
    // Show hero text after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Cycle through houses
    const houseTimer = setInterval(() => {
      setActiveHouse((prev) => (prev === 3 ? 1 : prev + 1));
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(houseTimer);
    };
  }, []);

  return (
    <header className="section_hero is-bottom-rounded">
      <div className="hero_wrapper">
        {/* Sky Background */}
        <div className="hero_sky"></div>

        {/* Animated Houses */}
        <div className="hero_hause-wrapper">
          {/* House 1 */}
          <div className={`house_box is-1 ${activeHouse === 1 ? 'is-active' : ''}`}>
            <div className="hero_tree"></div>
            <div className="hero_home"></div>
          </div>

          {/* House 2 */}
          <div className={`house_box is-2 ${activeHouse === 2 ? 'is-active' : ''}`}>
            <div className="hero_tree"></div>
            <div className="hero_home is-2"></div>
          </div>

          {/* House 3 */}
          <div className={`house_box is-3 ${activeHouse === 3 ? 'is-active' : ''}`}>
            <div className="hero_tree"></div>
            <div className="hero_home is-3"></div>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="header26_component">
              {/* Architects Logo Section */}
              <div className="logo_box hide-mobile-landscape">
                <div className="margin-bottom margin-xxsmall">
                  <div className="text-align-center">
                    <div className="max-width-large align-center">
                      <h3 className="text-size-medium text-color-white text-weight-light">
                        Proudly designed by
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="logo_wrapper align-center">
                  <div className="logo_img-wrapper">
                    <img
                      src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/654870859326159aef820b0a_logo%20arkides%20putih%201.webp"
                      alt="Arkides"
                      className="logo_arsitek"
                      loading="lazy"
                    />
                  </div>
                  <div className="logo_img-wrapper is-medium">
                    <img
                      src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/654870867a4896c258eb019c_logo%20dhaniesal%20putih%201.webp"
                      alt="Dhanie Sal"
                      className="logo_arsitek"
                      loading="lazy"
                    />
                  </div>
                  <div className="logo_img-wrapper is-medium">
                    <img
                      src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/65576fb85f9fd1c3d8de19a5_logo%20rafaelmiranti%201.webp"
                      alt="Rafael Miranti"
                      className="logo_arsitek"
                      loading="lazy"
                    />
                  </div>
                  <div className="logo_img-wrapper is-medium">
                    <img
                      src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/675a664cd3e1a57016716c0e_kevintan-logo.png"
                      alt="Kevin Tan"
                      className="logo_arsitek"
                      loading="lazy"
                    />
                  </div>
                  <div className="logo_img-wrapper is-medium">
                    <img
                      src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/6548722cdf1bfe388e78f945_logo%20pranala%20putih%201.webp"
                      alt="Pranala"
                      className="logo_arsitek"
                      loading="lazy"
                    />
                  </div>
                  <div className="logo_img-wrapper is-medium">
                    <img
                      src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/689969d15baf4cd978419273_logo-spoa.png"
                      alt="SPOA"
                      className="logo_arsitek"
                      loading="lazy"
                    />
                  </div>
                  <div className="logo_img-wrapper is-potrait">
                    <img
                      src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/654870861c79cfcab476b42d_logo%20kara%20putih%201.webp"
                      alt="KARA"
                      className="logo_arsitek"
                      loading="lazy"
                    />
                  </div>
                  <div className="logo_img-wrapper is-xsmall">
                    <img
                      src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/6548722c29d7c8ad6c497235_logo%20tamara%20wibowo%20putih%201.webp"
                      alt="Tamara Wibowo"
                      className="logo_arsitek"
                      loading="lazy"
                    />
                  </div>
                  <div className="logo_img-wrapper is-potrait">
                    <img
                      src="https://cdn.prod.website-files.com/6507e5069d2b6119052df387/65487087d4f6279df27533cd_logo%20ruang%20rona%20putih%201.webp"
                      alt="Ruang Rona"
                      className="logo_arsitek"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Text */}
              <div className={`text-align-center is-center ${isVisible ? 'is-visible' : ''}`}>
                <div className="hero-text">
                  <div className="padding-bottom padding-small"></div>
                  <div className="margin-bottom margin-small">
                    <h1 className="text-color-white is-home">
                      Your Dream Home is Here, Let's Step Inside!
                    </h1>
                  </div>
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
            </div>
          </div>
        </div>
      </div>

      {/* Hero Background Overlay */}
      <div className="hero_bg"></div>
    </header>
  );
};

export default Hero;

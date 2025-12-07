import React, { useEffect, useRef, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <section 
        ref={sectionRef}
        className={`section_about background-color-cream is-20 ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="architect-section">
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
      </section>
      <section 
        ref={sectionRef}
        className={`section_about background-color-cream is-20 ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large" style={{ paddingBottom: '200px' }}>
              <div className="padding-bottom padding-xlarge"></div>
              <div className="home-about_component">
                {/* Stats Numbers */}
                <div className="home-about_number">
                  <div className="number_content">
                    <div className="heading-style-h3">22</div>
                    <p>Residential projects filled with happy eastonfam</p>
                  </div>
                  <div className="number_content">
                    <div className="heading-style-h3">7</div>
                    <p className="paragraph">Sold out shophouses in Greater Jakarta</p>
                  </div>
                </div>

                {/* About Content */}
                <div className="home-about_content">
                  <div className="margin-bottom margin-small">
                    <h2 style={{ marginBottom: "24px" }}>Skyhouse is a <span className="font-bodoni"><i>property</i></span> company based in <span className="font-bodoni"><i>Jakarta</i></span></h2>
                    <div style={{ width: "80px", height: "4px", backgroundColor: '#1E3A8A', marginBottom: "24px" }}></div>
                    <p className="text-size-large"> 
                      We creates projects with good design aesthetics to enhance the urban 
                      fabric of the city, mainly focus our development in Jabodetabek Area 
                      and Palembang.
                    </p>
                  </div>
                  <div className="margin-top margin-large"></div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

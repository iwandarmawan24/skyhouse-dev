import React, { useEffect, useRef, useState } from 'react';
import '../styles/about.css';

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
    <section 
      ref={sectionRef}
      className={`section_about background-color-cream is-20 ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="padding-bottom padding-xlarge"></div>
            <div className="home-about_component is-home">
              {/* About Content */}
              <div className="home-about_content">
                <div className="margin-bottom margin-small">
                  <p className="text-size-xxlarge">
                    Easton Urban Kapital is a property development company based in Jakarta 
                    that creates projects with good design aesthetics to enhance the urban 
                    fabric of the city. We mainly focus our development in Jabodetabek Area 
                    and Palembang.
                  </p>
                </div>
                <div className="margin-top margin-large"></div>
              </div>

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

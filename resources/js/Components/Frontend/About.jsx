import React, { useEffect, useRef, useState } from 'react';
import { Heading, Text } from '@/Components/Frontend/atoms';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
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

    return () => observer.disconnect();
  }, []);

  // Counting animation effect
  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const targetCount1 = 22;
      const targetCount2 = 7;
      const steps = 60;
      const increment1 = targetCount1 / steps;
      const increment2 = targetCount2 / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setCount1(Math.min(Math.round(increment1 * currentStep), targetCount1));
        setCount2(Math.min(Math.round(increment2 * currentStep), targetCount2));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <>
      <section 
        ref={sectionRef}
        className={`section_about background-color-cream is-20 ${isVisible ? 'is-visible' : ''}`}
      >
        <div>
          <div>
            <div className="flex flex-col lg:flex-row gap-0">
              {/* Stats Numbers */}
              <div className="flex flex-col gap-8 lg:w-1/3 py-12 px-6 bg-white/90 backdrop-blur-sm lg:rounded-tr-3xl lg:rounded-br-3xl">
                <div className="flex flex-col gap-3">
                  <Heading as="h3" variant="display" color="charcoal">{count1}</Heading>
                  <Text size="base" color="charcoal">Residential projects filled with happy eastonfam</Text>
                </div>
                <div className="flex flex-col gap-3">
                  <Heading as="h3" variant="display" color="charcoal">{count2}</Heading>
                  <Text size="base" color="charcoal">Sold out shophouses in Greater Jakarta</Text>
                </div>
              </div>

              {/* About Content */}
              <div className="lg:w-2/3 relative overflow-hidden h-full min-h-[500px] lg:min-h-[600px]">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&q=80"
                  alt="Modern Buildings"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>
                <div className="relative z-10 p-12 flex flex-col justify-end h-full">
                  <Heading as="h3" variant="section" color="white" className="mb-6">
                    Skyhouse is a <span className="font-bodoni italic">property</span> company based in <span className="font-bodoni italic">Jakarta</span>
                  </Heading>
                  <div className="w-20 h-1 bg-white mb-6"></div>
                  <Text size="lg" color="white" className="max-w-xl"> 
                    We creates projects with good design aesthetics to enhance the urban 
                    fabric of the city, mainly focus our development in Jabodetabek Area 
                    and Palembang.
                  </Text>
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

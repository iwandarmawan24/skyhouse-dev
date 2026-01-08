import React, { useRef, useEffect } from 'react';
import { Button, Heading, Text } from '@/Components/Frontend/atoms';

// Quiz Component
const Quiz = () => {
  const quizBgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (quizBgRef.current) {
        const scrollY = window.scrollY;
        const rect = quizBgRef.current.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const offset = scrollY - elementTop;
        
        // Apply parallax effect (move slower than scroll)
        quizBgRef.current.style.transform = `translateY(${offset * 0.6}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="section_quiz is-bottom-rounded">
      <div ref={quizBgRef} className="quiz_bg"></div>
      <div className="quiz_overlay"></div>
      <div className="padding-global">
        <div className="padding-section-medium">
          <div className="text-align-center">
            <Heading as="h2" variant="section" color="ocean" className="text-center m-0">Discover your <span className="font-bodoni italic">Dream</span> Home</Heading>
            <Text size="lg" color="ocean" className="text-center">
              Let Skyhouse turn your dream home wish into a wonderful reality!
            </Text>
            <div className="margin-top margin-medium">
              <Button 
                href="https://quiz.eastonurbankapital.com/landing"
                target="_blank"
                rel="noopener noreferrer"
                variant="terracota"
              >
                Start now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;

import React from 'react';
import { Button, Heading, Text } from '@/Components/Frontend/atoms';

// Benefits Component
const Benefits = () => {
  return (
    <section className="section_benefit background-color-yellow is-20">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-medium">
            <div className="benefit_component">
              <div className="benefit_wrapper">
                <div className="benefit_content">
                  <Heading as="h2" variant="section">Skyhouse Alam Sutera, Makes Everything Better</Heading>
                  <Text>A convenient application to support all your household needs</Text>
                  <Button href="/easton-home" variant="primary">
                    Explore more
                  </Button>
                </div>
                <div className="benefit_image">
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
                    alt="Skyhouse Home App"
                  />
                </div>
              </div>
              <div className="benefit_wrapper">
                <div className="benefit_image">
                  <img
                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop"
                    alt="Skyhouse Facilities"
                  />
                </div>
                <div className="benefit_content">
                  <Heading as="h2" variant="section">Great Environment, Superb Public Facilities</Heading>
                  <Text>You are welcome to utilize our general amenities at any time, at your convenience.</Text>
                  <Button href="/easton-facilities" variant="primary">
                    Discover more
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;

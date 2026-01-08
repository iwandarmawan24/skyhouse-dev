import React from 'react';
import { Button, Heading, Text } from '@/Components/Frontend/atoms';

// Characters Component
const Characters = () => {
  return (
    <section className="section_character background-color-yellow is-bottom-rounded">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="character_component">
              <Heading as="h2" variant="section">Meet the Characters in Every Skyhouse Projects</Heading>
              <Text size="lg">
                They're simply adorable, loads of fun, and guaranteed to bring a big smile to your day!
              </Text>
              <Button href="/easton-characters" variant="primary">
                Let's say hi!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Characters;

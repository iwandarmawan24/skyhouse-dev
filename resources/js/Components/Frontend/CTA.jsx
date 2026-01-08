import React from 'react';
import { Button, Heading, Text } from '@/Components/Frontend/atoms';

// CTA Component
const CTA = () => {
  const instagramImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=400&fit=crop'
  ];

  return (
    <section className="section_cta background-color-brown is-bottom-rounded is-20">
      <div className="padding-global">
        <div className="py-24">
          <div className="cta_component">
            <div className="cta_left">
              <div className="cta_card">
                <Heading as="h2" variant="section">Get in touch with us to discover more about Skyhouse!</Heading>
                <Text>Ask anything, we will answer it immediately.</Text>
                <Button href="/contact-us" variant="primary">
                  Contact us
                </Button>
              </div>
            </div>
            <div className="cta_right">
              <div className="instagram_grid">
                {instagramImages.map((image, index) => (
                  <div key={index} className="instagram_grid-item">
                    <img src={image} alt={`Instagram post ${index + 1}`} />
                  </div>
                ))}
              </div>
              <a
                href="https://www.instagram.com/eastonurbankapital/"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram_button"
              >
                <Text as="span">See our instagram</Text>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

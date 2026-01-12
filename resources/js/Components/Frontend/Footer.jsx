import React from 'react';
import { Heading, Text } from '@/Components/Frontend/atoms';

// Footer Component
const Footer = () => {
  return (
    <footer 
      className="footer_component"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(30, 58, 138, 0.15) 1px, transparent 2px)',
        backgroundSize: '20px 20px'
      }}
    >
      <div className="padding-global">
        <div className="container-large">
          <div className="footer_content">
            <div className="footer_logo">
              <img
                src="https://www.skyhousealamsutera.id/wp-content/uploads/2020/12/logo.png"
                alt="Skyhouse Alamsutera"
                className="invert-60"
              />
            </div>

            <div className="footer_section">
              <Heading as="h4" variant="subsection">Address</Heading>
              <Text>
                Jl. Alamsutera Boulevard No.88, Pakulonan Barat, Kelapa Dua,
                Tangerang, Banten 15810
              </Text>
            </div>

            <div className="footer_section">
              <Heading as="h4" variant="subsection">Contact</Heading>
              <a href="tel:+622150889900">+62 21 5088 9900</a>
              <a href="mailto:info@skyhousealamsutera.com">info@skyhousealamsutera.com</a>
            </div>

            <div className="footer_section">
              <Heading as="h4" variant="subsection">Company</Heading>
              <a href="/about">About</a>
              <a href="/csr">CSR</a>
              <a href="/career">Careers</a>
              <a href="/news">News</a>
              <a href="/agent-portal">Agent Portal</a>
            </div>

            <div className="footer_section">
              <Heading as="h4" variant="subsection">Follow us</Heading>
              <div className="footer_social">
                <a href="https://www.tiktok.com/@skyhousealamsutera" target="_blank" rel="noopener noreferrer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                  <Text as="span">TikTok</Text>
                </a>
                <a href="https://www.instagram.com/skyhousealamsutera" target="_blank" rel="noopener noreferrer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.061 5.877.01 6.944 0 7.284 0 10s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.05-1.066.061-1.407.061-4.123s-.012-3.056-.06-4.122C19.773 2.249 17.76.228 14.124.06 13.057.01 12.716 0 10 0zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/>
                  </svg>
                  <Text as="span">Instagram</Text>
                </a>
                <a href="https://www.linkedin.com/company/skyhousealamsutera" target="_blank" rel="noopener noreferrer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M18.72 0H1.28C.57 0 0 .57 0 1.28v17.44C0 19.43.57 20 1.28 20h17.44c.71 0 1.28-.57 1.28-1.28V1.28C20 .57 19.43 0 18.72 0zM5.92 17.04H2.96V7.5h2.96v9.54zM4.44 6.2c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72zm12.6 10.84h-2.96v-4.64c0-1.11-.02-2.53-1.54-2.53-1.54 0-1.78 1.2-1.78 2.45v4.72H8.8V7.5h2.84v1.3h.04c.4-.75 1.36-1.54 2.8-1.54 2.99 0 3.54 1.97 3.54 4.53v5.25z"/>
                  </svg>
                  <Text as="span">LinkedIn</Text>
                </a>
                <a href="https://www.youtube.com/@skyhousealamsutera" target="_blank" rel="noopener noreferrer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M19.615 3.184c-.228-.83-.9-1.482-1.745-1.706-1.54-.41-7.72-.41-7.72-.41s-6.18 0-7.72.41c-.845.224-1.517.876-1.745 1.706C0 4.673 0 7.818 0 7.818s0 3.145.685 4.634c.228.83.9 1.482 1.745 1.706 1.54.41 7.72.41 7.72.41s6.18 0 7.72-.41c.845-.224 1.517-.876 1.745-1.706.685-1.489.685-4.634.685-4.634s0-3.145-.685-4.634zM7.954 10.93V4.706l5.155 3.112-5.155 3.112z"/>
                  </svg>
                  <Text as="span">Youtube</Text>
                </a>
              </div>
            </div>
          </div>

          <div className="footer_bottom">
            <Text>© 2026 Skyhouse Alamsutera. All rights reserved.</Text>
            <div className="footer_bottom-links">
              <a href="/terms">Terms and Conditions</a>
              <a href="/privacy">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

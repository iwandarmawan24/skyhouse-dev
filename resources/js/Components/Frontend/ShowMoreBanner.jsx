import React from 'react';
import { Heading } from '@/Components/Frontend/atoms';

// ShowMoreBanner Component
const ShowMoreBanner = () => {
  return (
    <section className="section_show-more background-color-cream">
      <div className="padding-global pb-24">
        <div className="container-large">
          <div className="show-more-wrapper">
            <a href="/project" className="banner_component">
              <div className="project_button-text">
                <Heading as="h3" variant="subsection">Show More Projects</Heading>
              </div>
              <div className="project_arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="29.541" height="22.323" viewBox="0 0 29.541 22.323">
                  <g transform="translate(0 1.014)">
                    <path d="M115.445,20.633l9.311-10.148L115.445.338" transform="translate(-97.25 -0.338)" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3"/>
                    <line x1="27.506" transform="translate(0 10.148)" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3"/>
                  </g>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowMoreBanner;

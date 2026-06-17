import React from 'react';

const DEFAULT_IMAGE = '/images/360/360 feature.png';
const DEFAULT_URL = 'https://epic.spindonesia.com/skyhousealsut/index.html';

const VirtualTourBanner = ({ virtualTour }) => {
  const image = virtualTour?.image || DEFAULT_IMAGE;
  const url = virtualTour?.url || DEFAULT_URL;

  return (
    <section className="w-full" data-section="virtual-tour-banner">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        <img
          src={image}
          alt="360 Virtual Tour"
          className="w-full h-auto block"
        />
      </a>
    </section>
  );
};

export default VirtualTourBanner;

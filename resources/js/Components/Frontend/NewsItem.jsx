import React from 'react';

const NewsItem = ({
  image,
  title,
  date,
  mediaSource,
  mediaLogo,
  link
}) => {
  return (
    <a href={link} className="news-item shadow-md bg-white/80 backdrop-blur-md hover:bg-white/90 transition-all duration-300" target="_blank" rel="noopener noreferrer">
      <div className="news-item-image">
        <img src={image} alt={title} />
      </div>
      <div className="news-item-content">
        <h3 className="news-item-title">{title}</h3>
        <div className="news-item-meta">
          <span className="news-item-date">{date}</span>
          {mediaLogo && (
            <>
              <span className="news-item-separator">|</span>
              <img src={mediaLogo} alt={mediaSource} className="news-item-media-logo" />
            </>
          )}
        </div>
      </div>
      <div className="news-item-arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </a>
  );
};

export default NewsItem;

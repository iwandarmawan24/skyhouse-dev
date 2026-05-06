import React from 'react';

const ProjectCard = ({
  image,
  location,
  units,
  title,
  short_description,
  description,
  status,
  href
}) => {
  const CardWrapper = href ? 'a' : 'div';
  const isUnavailable = status === 'sold-out';

  // Strip HTML tags and create excerpt
  const getPlainTextExcerpt = (html, maxLength = 120) => {
    const text = html.replace(/<[^>]*>/g, '');
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  // Use short_description if available, otherwise fallback to description excerpt
  const displayText = short_description || getPlainTextExcerpt(description);

  return (
    <CardWrapper href={href} className="project-card">
      <div className="project-card-image" style={{ position: 'relative' }}>
        <img src={image} alt={title} />
        {isUnavailable && (
          <span style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: '600',
            padding: '4px 10px',
            borderRadius: '4px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            Unavailable
          </span>
        )}
      </div>
      <div className="project-card-content">
        <div className="project-card-meta">
        </div>
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">{displayText}</p>
      </div>
    </CardWrapper>
  );
};

export default ProjectCard;

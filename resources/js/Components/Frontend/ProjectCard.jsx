import React from 'react';

const ProjectCard = ({
  image,
  location,
  units,
  title,
  description,
  href
}) => {
  const CardWrapper = href ? 'a' : 'div';

  // Strip HTML tags and create excerpt
  const getPlainTextExcerpt = (html, maxLength = 120) => {
    const text = html.replace(/<[^>]*>/g, '');
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <CardWrapper href={href} className="project-card">
      <div className="project-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="project-card-content">
        <div className="project-card-meta">
          <span className="project-card-location">{location}</span>
          <span className="project-card-units">{units} Units</span>
        </div>
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">{getPlainTextExcerpt(description)}</p>
      </div>
    </CardWrapper>
  );
};

export default ProjectCard;

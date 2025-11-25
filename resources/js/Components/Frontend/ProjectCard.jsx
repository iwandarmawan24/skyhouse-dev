import React from 'react';

const ProjectCard = ({
  image,
  location,
  units,
  title,
  description
}) => {
  return (
    <div className="project-card">
      <div className="project-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="project-card-content">
        <div className="project-card-meta">
          <span className="project-card-location">{location}</span>
          <span className="project-card-units">{units} Units</span>
        </div>
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;

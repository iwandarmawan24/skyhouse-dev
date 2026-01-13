import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/Components/Frontend/atoms';
import ProjectCard from '@/Components/Frontend/ProjectCard';
import PageLayout from '@/Components/Frontend/PageLayout';
import '@css/frontend.css';
import '@css/frontend/project-page.css';

export default function Project({ projects = [], featuredProject = null }) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Use projects data from backend
  const projectsData = projects;

  // Strip HTML tags from text
  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  // Filter projects based on selected filters
  const filteredProjects = selectedFilters.length === 0
    ? projectsData
    : projectsData.filter(project => selectedFilters.includes(project.type));

  return (
    <PageLayout>
        {/* Top Banner Section */}
        <section className="project-top-banner">
          <div className="project-banner-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=600&fit=crop" 
              alt="Projects Banner" 
              className="project-banner-image"
            />
            <div className="project-banner-overlay">
              <div className="padding-global">
                <div className="container-large">
                  <h1 className="project-banner-title">Our Projects</h1>
                  <p className="project-banner-subtitle">Discover our portfolio of exceptional residential developments</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Project Section */}
        {featuredProject && (
          <section className="project-hero">
            <div className="project-hero-image">
              <img src={featuredProject.image} alt={featuredProject.title} />
            </div>
            <div className="project-hero-content">
              <span className="project-hero-category">
                {featuredProject.category} - {featuredProject.status}
              </span>
              <h1 className="project-hero-title">{featuredProject.title}</h1>
              <p className="project-hero-description">{stripHtml(featuredProject.description)}</p>
              <div className="project-hero-meta">
                <div className="project-hero-meta-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{featuredProject.location}</span>
                </div>
                <div className="project-hero-meta-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{featuredProject.units} Units</span>
                </div>
              </div>
              <Link href={`/project/${featuredProject.id}`}>
                <Button>View project details</Button>
              </Link>
            </div>
          </section>
        )}

        {/* Projects List Section with Filters */}
        <section className="project-listing-section background-color-cream">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="project-listing-wrapper">
                  {/* Sidebar Filters */}
                  <aside className="project-filters">
                    <div className="filter-header">
                      <div>
                        <h3 className="filter-title">Showing</h3>
                        <p className="filter-count">{filteredProjects.length}/{projectsData.length} Results</p>
                      </div>
                      <button className="filter-clear" onClick={clearFilters}>Clear all</button>
                    </div>

                    {/* Residential Filters */}
                    <div className="filter-group">
                      <h4 className="filter-group-title">Residential</h4>
                      <div className="filter-options">
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedFilters.includes('available')}
                            onChange={() => toggleFilter('available')}
                          />
                          <span className="filter-radio"></span>
                          <span className="filter-label">Available</span>
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedFilters.includes('coming-soon')}
                            onChange={() => toggleFilter('coming-soon')}
                          />
                          <span className="filter-radio"></span>
                          <span className="filter-label">Coming Soon</span>
                        </label>
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedFilters.includes('built-project')}
                            onChange={() => toggleFilter('built-project')}
                          />
                          <span className="filter-radio"></span>
                          <span className="filter-label">Built Project</span>
                        </label>
                      </div>
                    </div>

                    {/* Commercial Filters */}
                    <div className="filter-group">
                      <h4 className="filter-group-title">Commercial</h4>
                      <div className="filter-options">
                        <label className="filter-option">
                          <input
                            type="checkbox"
                            checked={selectedFilters.includes('shophouse')}
                            onChange={() => toggleFilter('shophouse')}
                          />
                          <span className="filter-radio"></span>
                          <span className="filter-label">Shophouse</span>
                        </label>
                      </div>
                    </div>
                  </aside>

                  {/* Projects Grid */}
                  <div className="project-grid-container">
                    <div className="project-grid">
                      {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                          <ProjectCard
                            key={project.id}
                            image={project.image}
                            location={project.location}
                            units={project.units}
                            title={project.title}
                            description={project.description}
                            href={`/project/${project.id}`}
                          />
                        ))
                      ) : (
                        <div className="project-empty-state">
                          <div className="project-empty-state-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <h3>No Projects Available</h3>
                          <p>There are currently no projects matching your filters.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </PageLayout>
  );
}

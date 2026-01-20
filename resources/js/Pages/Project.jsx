import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Button, Heading, Text } from '@/Components/Frontend/atoms';
import PageLayout from '@/Components/Frontend/PageLayout';
import '@css/frontend.css';
import '@css/frontend/project-page.css';

export default function Project({ projects = [], featuredProject = null }) {
  const [visibleCount, setVisibleCount] = useState(3);
  
  // Strip HTML tags from text
  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  // Truncate text to maximum characters
  const truncateText = (text, maxLength = 300) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Load more projects
  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

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

        {/* Content Section */}
        <div className="flex flex-col gap-6 md:gap-12 px-4 md:px-12 mx-auto my-8 md:my-16">
          {projects && projects.length > 0 && projects.slice(0, visibleCount).map((project, index) => {
            const isEven = index % 2 === 1;
            
            return (
              <section key={project.id} className="flex flex-col md:flex-row rounded-lg overflow-hidden items-stretch">
                {/* Image - Order changes based on even/odd for desktop, always first on mobile */}
                <div className={`flex-1 relative min-h-[300px] md:min-h-0 ${isEven ? 'order-1 md:order-2' : ''}`}>
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                
                {/* Content - Order changes based on even/odd for desktop, always second on mobile */}
                <div 
                  className={`flex-1 p-6 md:p-18 flex flex-col justify-center relative ${isEven ? 'order-2 md:order-1' : ''}`}
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: 'scaleX(-1)',
                  }}
                >
                  <div 
                    className="absolute inset-0 backdrop-blur-sm"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }}
                  ></div>
                  <div className="relative" style={{ transform: 'scaleX(-1)' }}>
                    <div className="max-w-2xl">
                      <span className="project-hero-category">
                        {project.category} - {project.status}
                      </span>
                      <Heading as="h2">{project.title}</Heading>
                      <Text className="!mt-4 !mb-8 !text-lg">{truncateText(project.short_description || stripHtml(project.description))}</Text>
                      <div className="project-hero-meta !mb-4">
                        <div className="project-hero-meta-item">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>{project.location}</span>
                        </div>
                        <div className="project-hero-meta-item">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>{project.units} Units</span>
                        </div>
                      </div>
                      <Link href={`/project/${project.id}`}>
                        <Button>View project details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
          
          {/* Load More Button */}
          {visibleCount < projects.length && (
            <div className="flex justify-center mt-8">
              <Button onClick={loadMore}>Load More</Button>
            </div>
          )}
        </div>
    </PageLayout>
  );
}

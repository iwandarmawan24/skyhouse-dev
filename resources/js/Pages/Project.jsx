import React from 'react';
import { Link } from '@inertiajs/react';
import { Button, Heading, Text } from '@/Components/Frontend/atoms';
import PageLayout from '@/Components/Frontend/PageLayout';
import '@css/frontend.css';
import '@css/frontend/project-page.css';

export default function Project({ projects = [], featuredProject = null }) {
  // Strip HTML tags from text
  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
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

        <div className="flex flex-col gap-12 px-12 mx-auto my-16 px-4">
          {featuredProject && (
            <section className="flex rounded-lg overflow-hidden">
              <div className="flex-1">
                <img src={featuredProject.image} alt={featuredProject.title} />
              </div>
              <div 
                className="flex-1 p-18 flex flex-col justify-center relative"
                style={{
                  backgroundImage: `url(${featuredProject.image})`,
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
                      {featuredProject.category} - {featuredProject.status}
                    </span>
                    <Heading as="h2">{featuredProject.title}</Heading>
                    <Text className="!mt-4 !mb-8 !text-lg">{featuredProject.short_description || stripHtml(featuredProject.description)}</Text>
                    <div className="project-hero-meta !mb-4">
                      <div className="project-hero-meta-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{featuredProject.location}</span>
                      </div>
                    </div>
                    <Link href={`/project/${featuredProject.id}`}>
                      <Button>View project details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
    </PageLayout>
  );
}

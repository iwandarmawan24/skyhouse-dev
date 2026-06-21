import React, { useState, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button, Heading, Text } from '@/Components/Frontend/atoms';
import PageLayout from '@/Components/Frontend/PageLayout';
import '@css/frontend.css';
import '@css/frontend/project-page.css';

function ProjectCarousel({ images = [], title }) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prev = useCallback((e) => {
    e.stopPropagation();
    setCurrent(i => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback((e) => {
    e.stopPropagation();
    setCurrent(i => (i + 1) % total);
  }, [total]);

  if (total === 0) return null;

  return (
    <div className="relative w-full h-full select-none">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${title} — ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
      ))}

      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-skyhouse-ocean rounded-full w-9 h-9 flex items-center justify-center shadow transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-skyhouse-ocean rounded-full w-9 h-9 flex items-center justify-center shadow transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                aria-label={`Image ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'bg-white w-5 h-2' : 'bg-white/50 w-2 h-2 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          <span className="absolute top-3 right-3 z-10 bg-black/40 text-white text-xs font-medium px-2 py-1 rounded-full">
            {current + 1} / {total}
          </span>
        </>
      )}
    </div>
  );
}

export default function Project({ projects = [], pageInfo = null }) {
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
    <>
      <Head>
        <title>Units Type - Sky House Alam Sutera</title>
        <meta name="description" content="Discover the unit types available at Sky House Alam Sutera — thoughtfully designed residences built for modern living." />
      </Head>
      <PageLayout>
        {/* Top Banner Section */}
        <section className="project-top-banner" data-section="project-page-info">
          <div className="project-banner-image-wrapper">
            <img
              src={pageInfo?.banner_image || '/images/banner/Project-Banner.webp'}
              alt="Projects Banner"
              className="project-banner-image"
            />
            <div className="project-banner-overlay">
              <div className="padding-global">
                <div className="container-large">
                  <h1 className="project-banner-title">{pageInfo?.title || 'Our Projects'}</h1>
                  <p className="project-banner-subtitle">{pageInfo?.subtitle || 'Discover our portfolio of exceptional residential developments'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="flex flex-col gap-6 md:gap-12 px-4 md:px-12 mx-auto my-8 md:my-16" data-section="products">
          {projects && projects.length > 0 && projects.slice(0, visibleCount).map((project, index) => {
            const isEven = index % 2 === 1;
            
            return (
              <section key={project.id} className="flex flex-col md:flex-row rounded-lg overflow-hidden shadow-sm">
                {/* Image carousel */}
                <div className={`relative h-64 md:h-auto md:flex-1 ${isEven ? 'md:order-2' : ''}`}>
                  <ProjectCarousel
                    images={project.gallery?.length ? project.gallery : [project.image]}
                    title={project.title}
                  />
                </div>

                {/* Content */}
                <div
                  className={`md:flex-1 p-6 md:p-12 flex flex-col justify-center relative ${isEven ? 'md:order-1' : ''}`}
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-white md:bg-white/80 md:backdrop-blur-sm"></div>
                  <div className="relative z-10">
                    <span className="project-hero-category">
                      {project.category} - {project.status}
                    </span>
                    <Heading as="h2" className="text-skyhouse-ocean">{project.title}</Heading>
                    <Text className="!mt-4 !mb-8 text-black/90">{project.short_description || truncateText(stripHtml(project.description))}</Text>
                    <Link href={`/project/${project.id}`}>
                      <Button>Unit Details</Button>
                    </Link>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
    </PageLayout>
    </>
  );
}

//comment for changes

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Text, Heading } from '@/Components/Frontend/atoms';
import ProjectCard from './ProjectCard';
import 'swiper/css';
import 'swiper/css/navigation';

// Projects Component
const Projects = ({ projects: backendProjects = [] }) => {
  const swiperRef = useRef(null);

  // Fallback data if no backend data is available
  const defaultProjectsData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      location: 'South Tangerang',
      units: 39,
      title: 'Evertree House',
      description: 'Are you a sunshine and garden enthusiast? Evertree House by KARA Architecture offers a Semi-Outdoor Kitchen & Dining Area that will definitely steal your heart.',
      status: 'built'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      location: 'South Tangerang',
      units: 68,
      title: 'Wellspring House',
      description: 'Embrace the sun on your Sunny Patio in Wellspring House by dhaniesal, a dream spot for outdoor lovers seeking serene moments and extra privacy.',
      status: 'built'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      location: 'South Tangerang',
      units: 62,
      title: 'Favoury House',
      description: 'KARA Architecture has created a compact yet wonderfully cozy design that\'s perfect for young families. It\'s the kind of home that captures your heart the moment you see it!',
      status: 'built'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
      location: 'South Tangerang',
      units: 45,
      title: 'Aurora House',
      description: 'The latest residential project in South Tangerang. Perfect for those seeking modern living with excellent facilities.',
      status: 'built'
    }
  ];

  // Use backend data if available, otherwise use default data
  const projectsData = backendProjects.length > 0 ? backendProjects : defaultProjectsData;

  return (
    <section className="relative min-h-[600px] py-16 md:py-20 px-[5%]" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="w-full max-w-[80rem] mx-auto">
        <div>
          {/* Header with Tabs */}
          <div className="flex flex-between flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <div className="flex flex-col w-full md:flex-row items-start md:items-center gap-6 md:gap-12">
              <Heading as="h2" variant="section" className="flex-1 w-full">Room <span className="font-bodoni !italic">Type</span></Heading>
            </div>
          </div>

          {/* Swiper Carousel or Empty State */}
          <div className="relative mt-8">
            {projectsData.length > 0 ? (
              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
              >
                {projectsData.map((project) => (
                  <SwiperSlide key={project.id}>
                    <ProjectCard
                      image={project.image}
                      location={project.location}
                      units={project.units}
                      title={project.title}
                      description={project.description}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-8 text-center min-h-[300px]">
                <div className="w-20 h-20 bg-skyhouse-ocean/10 rounded-full flex items-center justify-center mb-6">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-skyhouse-ocean opacity-50">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <Heading as="h3" variant="subsection">No Projects Available</Heading>
                <Text>There are currently no projects to display.</Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

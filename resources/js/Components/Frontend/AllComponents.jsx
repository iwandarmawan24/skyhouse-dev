// ==================================
// REMAINING COMPONENTS
// ==================================

import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Button, Heading, Text } from '@/Components/Frontend/atoms';
import ProjectCard from './ProjectCard';
import NewsItem from './NewsItem';
import 'swiper/css';
import 'swiper/css/navigation';

// LaunchProjects Component - Visit Kinary House
export const LaunchProjects = () => {
  return (
    <section className="visit-kinary-section">
      <div className="visit-kinary-container">
        {/* Left Content */}
        <div className="visit-kinary-content">
          <Heading as="h3" bodoni className="italic mb-0 leading-none"><i>Visit</i></Heading>
          <Heading as="h2" variant="section">
            Kinary House
          </Heading>
          <div className="visit-divider" style={{ width: "80px", height: "4px", backgroundColor: '#1E3A8A', marginBottom: "24px" }}></div>
          <Text>
            Hi, skyhousefam! We're excited to share that Kinary House finally has its own show unit.
            Make sure to book an appointment with our skyhouseteam before stopping by.
          </Text>
        </div>

        {/* Right Image Card */}
        <div className="visit-kinary-card">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
            alt="Kinary House"
            className="visit-kinary-image"
          />
          <div className="visit-kinary-overlay">
            <Text as="span" size="sm" className="visit-kinary-location">South Tangerang</Text>
            <Heading as="h3" variant="card" className="visit-kinary-title">Kinary House</Heading>
          </div>
          <a href="#" className="visit-kinary-button">
            Make appointment
          </a>
        </div>
      </div>
    </section>
  );
};

// Benefits Component
export const Benefits = () => {
  return (
    <section className="section_benefit background-color-yellow is-20">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-medium">
            <div className="benefit_component">
              <div className="benefit_wrapper">
                <div className="benefit_content">
                  <Heading as="h2" variant="section">Skyhouse Alam Sutera, Makes Everything Better</Heading>
                  <Text>A convenient application to support all your household needs</Text>
                  <Button href="/easton-home" variant="primary">
                    Explore more
                  </Button>
                </div>
                <div className="benefit_image">
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
                    alt="Skyhouse Home App"
                  />
                </div>
              </div>
              <div className="benefit_wrapper">
                <div className="benefit_image">
                  <img
                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop"
                    alt="Skyhouse Facilities"
                  />
                </div>
                <div className="benefit_content">
                  <Heading as="h2" variant="section">Great Environment, Superb Public Facilities</Heading>
                  <Text>You are welcome to utilize our general amenities at any time, at your convenience.</Text>
                  <Button href="/easton-facilities" variant="primary">
                    Discover more
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Component
export const Projects = () => {
  const [activeTab, setActiveTab] = useState('built');
  const swiperRef = useRef(null);

  const projectsData = [
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

  const filteredProjects = projectsData.filter(project => project.status === activeTab);

  return (
    <section className="section_project background-color-cream is-20">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-medium">
            {/* Header with Tabs and Navigation */}
            <div className="project-header">
              <div className="project-header-left">
                <Heading as="h2" variant="section">Residential</Heading>
                <div className="project-tabs">
                  <button
                    className={`project-tab ${activeTab === 'available' ? 'active' : ''}`}
                    onClick={() => setActiveTab('available')}
                  >
                    Available
                  </button>
                  <button
                    className={`project-tab ${activeTab === 'built' ? 'active' : ''}`}
                    onClick={() => setActiveTab('built')}
                  >
                    Built Project
                  </button>
                </div>
              </div>
              <div className="project-navigation">
                <button
                  className="swiper-button-prev-custom"
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  className="swiper-button-next-custom"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Swiper Carousel or Empty State */}
            <div className="project-carousel">
              {filteredProjects.length > 0 ? (
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
                  {filteredProjects.map((project) => (
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
                <div className="project-empty-state">
                  <div className="project-empty-state-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <Heading as="h3" variant="subsection">No Projects Available</Heading>
                  <Text>There are currently no {activeTab === 'available' ? 'available' : 'built'} projects to display.</Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ShowMoreBanner Component
export const ShowMoreBanner = () => {
  return (
    <section className="section_show-more background-color-cream">
      <div className="padding-global">
        <div className="container-large">
          <div className="show-more-wrapper">
            <a href="/project" className="banner_component">
              <div className="project_button-text">
                <Heading as="h3" variant="subsection">Show More Projects</Heading>
              </div>
              <div className="project_arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="29.541" height="22.323" viewBox="0 0 29.541 22.323">
                  <g transform="translate(0 1.014)">
                    <path d="M115.445,20.633l9.311-10.148L115.445.338" transform="translate(-97.25 -0.338)" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3"/>
                    <line x1="27.506" transform="translate(0 10.148)" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3"/>
                  </g>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Quiz Component
export const Quiz = () => {
  const quizBgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (quizBgRef.current) {
        const scrollY = window.scrollY;
        const rect = quizBgRef.current.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const offset = scrollY - elementTop;
        
        // Apply parallax effect (move slower than scroll)
        quizBgRef.current.style.transform = `translateY(${offset * 0.6}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="section_quiz is-bottom-rounded">
      <div ref={quizBgRef} className="quiz_bg"></div>
      <div className="quiz_overlay"></div>
      <div className="padding-global">
        <div className="padding-section-medium">
          <div className="text-align-center">
            <Heading as="h2" variant="section" color="ocean" style={{ margin: 0 }}>Discover Your Dream Home</Heading>
            <Text size="lg" color="ocean">
              Let Skyhouse turn your dream home wish into a wonderful reality!
            </Text>
            <div className="margin-top margin-medium">
              <Button 
                href="https://quiz.eastonurbankapital.com/landing"
                target="_blank"
                rel="noopener noreferrer"
                variant="terracota"
              >
                Start now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Characters Component
export const Characters = () => {
  return (
    <section className="section_character background-color-yellow is-bottom-rounded">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="character_component">
              <Heading as="h2" variant="section">Meet the Characters in Every Skyhouse Projects</Heading>
              <Text size="lg">
                They're simply adorable, loads of fun, and guaranteed to bring a big smile to your day!
              </Text>
              <Button href="/easton-characters" variant="primary">
                Let's say hi!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// News Component
export const News = () => {
  const newsData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      title: 'Kolaborasi dengan Anabuki Group, Skyhouse Alamsutera Bangun Hunian Terbaru di Serpong, Tangerang Selatan',
      date: 'September 18, 2024',
      mediaSource: 'Kompas',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      link: '#'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      title: 'Skyhouse Alamsutera Bakal Luncurkan Hunian Dekat Stasiun LRT Ciracas',
      date: 'October 2, 2023',
      mediaSource: 'Kompas',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      link: '#'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&h=600&fit=crop',
      title: 'Skyhouse Alamsutera Hadirkan Konsep Rumah Ramah Lingkungan di Jakarta',
      date: 'August 15, 2023',
      mediaSource: 'Kompas',
      mediaLogo: 'https://placehold.co/120x40/1E3A8A/white?text=NEWS',
      link: '#'
    }
  ];

  return (
    <section className="section_news background-color-cream is-20">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large news-layout">
            <div className="news-header">
              <div className="news-header-content">
                <Heading as="h2" variant="section">News</Heading>
                <Text size="lg">Don't miss our latest media update!</Text>
                <Button href="/news" variant="primary">
                  View more
                </Button>
              </div>
            </div>
            <div className="news-items">
              {newsData.map((news) => (
                <NewsItem
                  key={news.id}
                  image={news.image}
                  title={news.title}
                  date={news.date}
                  mediaSource={news.mediaSource}
                  mediaLogo={news.mediaLogo}
                  link={news.link}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Component
export const CTA = () => {
  const instagramImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=400&fit=crop'
  ];

  return (
    <section className="section_cta background-color-brown is-bottom-rounded is-20">
      <div className="padding-global">
        <div className="container-large">
          <div className="cta_component">
            <div className="cta_left">
              <div className="cta_card">
                <Heading as="h2" variant="section">Get in touch with us to discover more about Skyhouse!</Heading>
                <Text>Ask anything, we will answer it immediately.</Text>
                <Button href="/contact-us" variant="primary">
                  Contact us
                </Button>
              </div>
            </div>
            <div className="cta_right">
              <div className="instagram_grid">
                {instagramImages.map((image, index) => (
                  <div key={index} className="instagram_grid-item">
                    <img src={image} alt={`Instagram post ${index + 1}`} />
                  </div>
                ))}
              </div>
              <a
                href="https://www.instagram.com/eastonurbankapital/"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram_button"
              >
                <Text as="span">See our instagram</Text>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="footer_component">
      <div className="padding-global">
        <div className="container-large">
          <div className="footer_content">
            <div className="footer_logo">
              <img
                src="https://www.skyhousealamsutera.id/wp-content/uploads/2020/12/logo.png"
                alt="Skyhouse Alamsutera"
              />
            </div>

            <div className="footer_section">
              <Heading as="h4" variant="subsection">Address</Heading>
              <Text>
                Jl. Alamsutera Boulevard No.88, Pakulonan Barat, Kelapa Dua,
                Tangerang, Banten 15810
              </Text>
            </div>

            <div className="footer_section">
              <Heading as="h4" variant="subsection">Contact</Heading>
              <a href="tel:+622150889900">+62 21 5088 9900</a>
              <a href="mailto:info@skyhousealamsutera.com">info@skyhousealamsutera.com</a>
            </div>

            <div className="footer_section">
              <Heading as="h4" variant="subsection">Company</Heading>
              <a href="/about">About</a>
              <a href="/csr">CSR</a>
              <a href="/career">Careers</a>
              <a href="/news">News</a>
              <a href="/agent-portal">Agent Portal</a>
            </div>

            <div className="footer_section">
              <Heading as="h4" variant="subsection">House</Heading>
              <a href="/project">Skyhouse Projects</a>
              <a href="/easton-home">Skyhouse Home App</a>
              <a href="https://quiz.eastonurbankapital.com/landing" target="_blank" rel="noopener noreferrer">Skyhouse Quiz</a>
              <a href="/easton-facilities">Skyhouse Facilities</a>
              <a href="/easton-characters">Skyhouse Characters</a>
            </div>

            <div className="footer_section">
              <Heading as="h4" variant="subsection">Follow us</Heading>
              <div className="footer_social">
                <a href="https://www.tiktok.com/@skyhousealamsutera" target="_blank" rel="noopener noreferrer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                  <Text as="span">TikTok</Text>
                </a>
                <a href="https://www.instagram.com/skyhousealamsutera" target="_blank" rel="noopener noreferrer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.061 5.877.01 6.944 0 7.284 0 10s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.05-1.066.061-1.407.061-4.123s-.012-3.056-.06-4.122C19.773 2.249 17.76.228 14.124.06 13.057.01 12.716 0 10 0zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/>
                  </svg>
                  <Text as="span">Instagram</Text>
                </a>
                <a href="https://www.linkedin.com/company/skyhousealamsutera" target="_blank" rel="noopener noreferrer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M18.72 0H1.28C.57 0 0 .57 0 1.28v17.44C0 19.43.57 20 1.28 20h17.44c.71 0 1.28-.57 1.28-1.28V1.28C20 .57 19.43 0 18.72 0zM5.92 17.04H2.96V7.5h2.96v9.54zM4.44 6.2c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72zm12.6 10.84h-2.96v-4.64c0-1.11-.02-2.53-1.54-2.53-1.54 0-1.78 1.2-1.78 2.45v4.72H8.8V7.5h2.84v1.3h.04c.4-.75 1.36-1.54 2.8-1.54 2.99 0 3.54 1.97 3.54 4.53v5.25z"/>
                  </svg>
                  <Text as="span">LinkedIn</Text>
                </a>
                <a href="https://www.youtube.com/@skyhousealamsutera" target="_blank" rel="noopener noreferrer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M19.615 3.184c-.228-.83-.9-1.482-1.745-1.706-1.54-.41-7.72-.41-7.72-.41s-6.18 0-7.72.41c-.845.224-1.517.876-1.745 1.706C0 4.673 0 7.818 0 7.818s0 3.145.685 4.634c.228.83.9 1.482 1.745 1.706 1.54.41 7.72.41 7.72.41s6.18 0 7.72-.41c.845-.224 1.517-.876 1.745-1.706.685-1.489.685-4.634.685-4.634s0-3.145-.685-4.634zM7.954 10.93V4.706l5.155 3.112-5.155 3.112z"/>
                  </svg>
                  <Text as="span">Youtube</Text>
                </a>
              </div>
            </div>
          </div>

          <div className="footer_bottom">
            <Text>© 2025 Skyhouse Alamsutera. All rights reserved.</Text>
            <div className="footer_bottom-links">
              <a href="/terms">Terms and Conditions</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="https://www.dianadia.com" target="_blank" rel="noopener noreferrer">
                Website by dianadia
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

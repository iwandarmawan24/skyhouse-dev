import React, { useEffect, useState } from 'react';
import Navigation from '@/Components/Frontend/Navigation';
import PageLayout from '@/Components/Frontend/PageLayout';
import { Heading, Text } from '@/Components/Frontend/atoms';
import Footer from '@/Components/Frontend/Footer';
import CTA from '@/Components/Frontend/CTA';
import '@css/frontend.css';
import '@css/frontend/about-page.css';

export default function About() {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const mapRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsMapVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
      }
    };
  }, []);

  const historyData = [
    {
      year: '2015',
      title: 'Foundation',
      description: 'Skyhouse Alamsutera was founded with a vision to create sustainable and innovative residential communities in Indonesia.'
    },
    {
      year: '2017',
      title: 'First Project Launch',
      description: 'Successfully launched our first residential project, setting new standards for quality living spaces in Tangerang Selatan.'
    },
    {
      year: '2019',
      title: 'Expansion',
      description: 'Expanded operations and introduced smart home technology across all our developments, enhancing resident living experience.'
    },
    {
      year: '2021',
      title: 'Sustainability Initiative',
      description: 'Launched green building initiative, incorporating eco-friendly materials and energy-efficient designs in all projects.'
    },
    {
      year: '2023',
      title: 'Award Recognition',
      description: 'Received multiple industry awards for excellence in design, construction quality, and customer satisfaction.'
    },
    {
      year: '2024',
      title: 'International Partnership',
      description: 'Formed strategic partnership with Anabuki Group to bring world-class residential solutions to Indonesian market.'
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'We strive for excellence in every project, from design to construction to after-sales service.'
    },
    {
      icon: '🤝',
      title: 'Integrity',
      description: 'We conduct our business with honesty, transparency, and ethical practices in all our dealings.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We embrace innovation and technology to create smarter, more efficient living spaces.'
    },
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'We are committed to environmentally responsible development and sustainable practices.'
    }
  ];

  const achievements = [
    {
      number: '50+',
      label: 'Projects Completed'
    },
    {
      number: '5,000+',
      label: 'Happy Families'
    },
    {
      number: '15+',
      label: 'Industry Awards'
    },
    {
      number: '99%',
      label: 'Customer Satisfaction'
    }
  ];

  const team = [
    {
      name: 'John Anderson',
      position: 'Chief Executive Officer',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop'
    },
    {
      name: 'Sarah Williams',
      position: 'Chief Operations Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'
    },
    {
      name: 'Michael Chen',
      position: 'Chief Financial Officer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
    },
    {
      name: 'Emma Thompson',
      position: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop'
    }
  ];

  return (
    <PageLayout showBackgroundDefault={true}>
      <main className="main-wrapper">
        {/* About Section */}
        <section className="py-16 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10 mb-12" ref={mapRef}>
            {/* World Map Container */}
            <div className="relative w-full max-w-6xl mx-auto hidden md:block">
              {/* Map SVG */}
              <div className={`relative rounded-2xl overflow-hidden transition-all duration-1000 ${
                isMapVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}>
                <img 
                  src="/images/hero/map-curved.png" 
                  alt="World Map"
                  className="w-full h-auto opacity-30"
                />
                
                {/* City Pins */}
                <div className={`absolute top-[20%] left-[20%] group transition-all duration-500 ${
                  isMapVisible 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-0'
                }`} style={{ transitionDelay: '400ms' }}>
                  <div className="relative">
                    <svg 
                      width="60" 
                      height="60" 
                      viewBox="0 0 24 24" 
                      className="cursor-pointer hover:scale-125 transition-transform drop-shadow-lg"
                    >
                      <path 
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                        fill="#F5D87F"
                        stroke="#FFFFFF"
                        strokeWidth="1"
                      />
                    </svg>
                    <div className="absolute top-1/2 -translate-y-1/2 left-full mr-1 opacity-100 pointer-events-none">
                      <div className="relative bg-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-3">
                        <Text size="sm" weight="semibold" color="charcoal">USA</Text>
                        <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* India */}
                <div className={`absolute top-[26%] left-[70%] group transition-all duration-500 ${
                  isMapVisible 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-0'
                }`} style={{ transitionDelay: '600ms' }}>
                  <div className="relative">
                    <svg 
                      width="60" 
                      height="60" 
                      viewBox="0 0 24 24" 
                      className="cursor-pointer hover:scale-125 transition-transform drop-shadow-lg"
                    >
                      <path 
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                        fill="#F5D87F"
                        stroke="#FFFFFF"
                        strokeWidth="1"
                      />
                    </svg>
                    <div className="absolute top-1/2 -translate-y-1/2 right-full mr-1 opacity-100 pointer-events-none">
                      <div className="relative bg-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-3">
                        <Text size="sm" weight="semibold" color="charcoal">India</Text>
                        <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Thailand */}
                <div className={`absolute top-[32%] left-[77%] group transition-all duration-500 ${
                  isMapVisible 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-0'
                }`} style={{ transitionDelay: '800ms' }}>
                  <div className="relative">
                    <svg 
                      width="60" 
                      height="60" 
                      viewBox="0 0 24 24" 
                      className="cursor-pointer hover:scale-125 transition-transform drop-shadow-lg"
                    >
                      <path 
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                        fill="#F5D87F"
                        stroke="#FFFFFF"
                        strokeWidth="1"
                      />
                    </svg>
                    <div className="absolute top-1/2 -translate-y-1/2 left-full mr-1 opacity-100 pointer-events-none">
                      <div className="relative bg-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-3">
                        <Text size="sm" weight="semibold" color="charcoal">Thailand</Text>
                        <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Indonesia */}
                <div className={`absolute top-[46%] left-[78%] group transition-all duration-500 ${
                  isMapVisible 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-0'
                }`} style={{ transitionDelay: '1000ms' }}>
                  <div className="relative">
                    <svg 
                      width="60" 
                      height="60" 
                      viewBox="0 0 24 24" 
                      className="cursor-pointer hover:scale-125 transition-transform drop-shadow-lg"
                    >
                      <path 
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                        fill="#F5D87F"
                        stroke="#FFFFFF"
                        strokeWidth="1"
                      />
                    </svg>
                    <div className="absolute top-1/2 -translate-y-1/2 left-full mr-1 opacity-100 pointer-events-none">
                      <div className="relative bg-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-3">
                        <Text size="sm" weight="semibold" color="charcoal">Indonesia</Text>
                        <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* New Zealand */}
                <div className={`absolute top-[85%] left-[88%] group transition-all duration-500 ${
                  isMapVisible 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-0'
                }`} style={{ transitionDelay: '1200ms' }}>
                  <div className="relative">
                    <svg 
                      width="60" 
                      height="60" 
                      viewBox="0 0 24 24" 
                      className="cursor-pointer hover:scale-125 transition-transform drop-shadow-lg"
                    >
                      <path 
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
                        fill="#F5D87F"
                        stroke="#FFFFFF"
                        strokeWidth="1"
                      />
                    </svg>
                    <div className="absolute top-1/2 -translate-y-1/2 right-full mr-1 opacity-100 pointer-events-none">
                      <div className="relative bg-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-3">
                        <Text size="sm" weight="semibold" color="charcoal">New Zealand</Text>
                        <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <img src="/images/hero/risland-logo.jpeg" alt="Risland Logo" className="w-64 h-64 md:w-48 md:h-48 pointer-events-none rounded-full mx-auto md:mx-0 md:absolute md:bottom-0 md:left-0" />
          </div>

          <div className="container sm:px-4 md:px-12 lg:px-24 mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/3 order-1 lg:order-2">
                <div className="block rounded-3xl p-0 md:p-8 flex flex-col">
                  <Heading as="h2" variant="card" className="mb-3">About</Heading>
                  <Heading as="h2" variant="card" bodoni className="mb-3 italic">Company</Heading>
                  <div className="block bg-blue-300 h-1 w-16 my-4"></div>
                </div>
              </div>
              <div className="w-full lg:w-2/3 px-0 md:px-14 order-2 lg:order-1">
                <Text
                  as="span"
                  size="lg"
                  className="block"
                  style={{ textAlign: 'justify' }}
                >
                  <b>Risland Holdings</b> is a Hong Kong–based multinational real estate company engaged in residential development, commercial real estate, property management, and infrastructure construction and operation. By 2018, it had developed projects across multiple countries, including the United States, New Zealand, Thailand, India, and Indonesia.
                  In Indonesia, Risland combines its leading design concepts with local market needs through its premium apartment line, Sky House, which has been present in the market for two years. Sky House Alam Sutera+ is the second Sky House project in Indonesia.
                </Text>
              </div>
            </div>
          </div>
        </section>
        {/* Hero/About Section */}
        <section className="about-hero background-color-yellow">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="about-hero-content">
                  <h1 className="about-hero-title">Building Dreams, Creating Communities</h1>
                  <p className="about-hero-subtitle">
                    At Skyhouse Alamsutera, we believe that a home is more than just a place to live—it's where life's most precious moments unfold.
                    Since our inception, we have been dedicated to creating residential communities that inspire, comfort, and endure.
                  </p>
                  <p className="about-hero-description">
                    Our commitment goes beyond constructing buildings; we craft living experiences that enhance the quality of life for every resident.
                    With innovative designs, sustainable practices, and a customer-centric approach, we have established ourselves as a trusted name
                    in Indonesia's real estate industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* History Timeline Section */}
        <section className="about-history background-color-cream">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="section-header">
                  <h2>Our Journey</h2>
                  <p>A timeline of milestones that shaped Skyhouse Alamsutera</p>
                </div>
                <div className="history-timeline">
                  {historyData.map((item, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-content">
                        <div className="timeline-year">{item.year}</div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values & Mission Section */}
        <section className="about-values background-color-yellow">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="section-header">
                  <h2>Our Core Values</h2>
                  <p>The principles that guide everything we do</p>
                </div>
                <div className="values-grid">
                  {values.map((value, index) => (
                    <div key={index} className="value-card">
                      <div className="value-icon">{value.icon}</div>
                      <h3 className="value-title">{value.title}</h3>
                      <p className="value-description">{value.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mission-statement">
                  <h3>Our Mission</h3>
                  <p>
                    To be Indonesia's premier residential developer by creating exceptional living environments that combine innovative design,
                    quality construction, and sustainable practices, while fostering vibrant communities where families thrive and create lasting memories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="about-achievements background-color-brown">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-medium">
                <div className="achievements-grid">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="achievement-item">
                      <div className="achievement-number">{achievement.number}</div>
                      <div className="achievement-label">{achievement.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="about-team background-color-cream">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="section-header">
                  <h2>Leadership Team</h2>
                  <p>Meet the people behind our success</p>
                </div>
                <div className="team-grid">
                  {team.map((member, index) => (
                    <div key={index} className="team-card">
                      <div className="team-image">
                        <img src={member.image} alt={member.name} />
                      </div>
                      <div className="team-info">
                        <h3 className="team-name">{member.name}</h3>
                        <p className="team-position">{member.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}

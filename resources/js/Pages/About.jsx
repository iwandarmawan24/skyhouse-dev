import React from 'react';
import Navigation from '@/Components/Frontend/Navigation';
import Footer from '@/Components/Frontend/Footer';
import { CTA } from '@/Components/Frontend/AllComponents';
import '@css/frontend.css';
import '@css/frontend/about-page.css';

export default function About() {
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
    <div className="page-wrapper">
      <Navigation />
      <main className="main-wrapper">
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
      <CTA />
      <Footer />
    </div>
  );
}

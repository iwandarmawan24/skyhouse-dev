import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import LaunchProjects from './components/LaunchProjects';
import Benefits from './components/Benefits';
import Projects from './components/Projects';
import ShowMoreBanner from './components/ShowMoreBanner';
import Quiz from './components/Quiz';
import Characters from './components/Characters';
import News from './components/News';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { initSmoothScroll } from './utils/smoothScroll';
import './styles/globals.css';

function App() {
  useEffect(() => {
    // Initialize smooth scroll
    const lenis = initSmoothScroll();

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="page-wrapper">
      <Navigation />
      <main className="main-wrapper">
        <Hero />
        <About />
        <LaunchProjects />
        <Benefits />
        <Projects />
        <ShowMoreBanner />
        <div className="stack_section">
          <Quiz />
          <Characters />
        </div>
        <News />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import Navigation from '@/Components/Frontend/Navigation';
import Hero from '@/Components/Frontend/Hero';
import About from '@/Components/Frontend/About';
import Location from '@/Components/Frontend/Location';
import LaunchProjects from '@/Components/Frontend/LaunchProjects';
import Benefits from '@/Components/Frontend/Benefits';
import Projects from '@/Components/Frontend/Projects';
import Quiz from '@/Components/Frontend/Quiz';
import Employee from '@/Components/Frontend/Employee';
import Characters from '@/Components/Frontend/Characters';
import Awards from '@/Components/Frontend/Awards';
import VirtualTourBanner from '@/Components/Frontend/VirtualTourBanner';
import ConstructionProgress from '@/Components/Frontend/ConstructionProgress';
import News from '@/Components/Frontend/News';
import CTA from '@/Components/Frontend/CTA';
import Footer from '@/Components/Frontend/Footer';
import PageLayout from '@/Components/Frontend/PageLayout';
import { initSmoothScroll } from '@/utils/smoothScroll';
import '@css/frontend.css';

export default function Home({ newsItems = [], facilities = [], projects = [], topSales = [], virtualTour = null, experience = {}, experienceCards = [] }) {
  // Smooth scroll disabled for now
  // useEffect(() => {
  //   const lenis = initSmoothScroll();
  //   return () => {
  //     if (lenis && lenis.destroy) {
  //       lenis.destroy();
  //     }
  //   };
  // }, []);

  return (
    <PageLayout>
      <Hero />
      <About experience={experience} experienceCards={experienceCards} />
      <Location />
      <LaunchProjects facilities={facilities} />
      <Projects projects={projects} />
      <VirtualTourBanner virtualTour={virtualTour} />
      <News newsItems={newsItems} />
      <Awards />
      <ConstructionProgress />
      <Employee members={topSales} />
      <CTA />
    </PageLayout>
  )
}

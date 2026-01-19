import React, { useEffect } from 'react';
import Navigation from '@/Components/Frontend/Navigation';
import Hero from '@/Components/Frontend/Hero';
import About from '@/Components/Frontend/About';
import Location from '@/Components/Frontend/Location';
import LaunchProjects from '@/Components/Frontend/LaunchProjects';
import Benefits from '@/Components/Frontend/Benefits';
import Projects from '@/Components/Frontend/Projects';
import ShowMoreBanner from '@/Components/Frontend/ShowMoreBanner';
import Quiz from '@/Components/Frontend/Quiz';
import Employee from '@/Components/Frontend/Employee';
import Characters from '@/Components/Frontend/Characters';
import News from '@/Components/Frontend/News';
import CTA from '@/Components/Frontend/CTA';
import Footer from '@/Components/Frontend/Footer';
import PageLayout from '@/Components/Frontend/PageLayout';
import { initSmoothScroll } from '@/utils/smoothScroll';
import '@css/frontend.css';

export default function Home() {
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
    <PageLayout hideLogoOnTop={true}>
      <Hero />
      <About />
      <Location />
      <LaunchProjects />
      {/* <Benefits /> */}
      <Projects />
      <ShowMoreBanner />
      {/* <Quiz /> */}
      <Employee />
      {/* <Characters /> */}
      <News />
    </PageLayout>
  )
}

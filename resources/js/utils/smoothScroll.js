// Smooth scroll implementation using Lenis
export const initSmoothScroll = () => {
  // Check if Lenis is available
  if (typeof window.Lenis === 'undefined') {
    console.warn('Lenis not loaded, using fallback smooth scroll');
    return { destroy: () => {} };
  }

  const lenis = new window.Lenis({
    lerp: 0.05,
    duration: 1.5,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
};

// Scroll to element helper
export const scrollToElement = (selector, offset = 0) => {
  const element = document.querySelector(selector);
  if (element) {
    const top = element.offsetTop - offset;
    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }
};

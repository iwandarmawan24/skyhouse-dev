import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Heading Component - Typography component for headings
 * 
 * @param {Object} props
 * @param {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} props.as - HTML heading tag
 * @param {'display' | 'hero' | 'section' | 'subsection' | 'card'} props.variant - Heading style variant
 * @param {'ocean' | 'sunshine' | 'terracota' | 'forest' | 'slate' | 'charcoal' | 'white'} props.color - Text color
 * @param {boolean} props.bodoni - Use Bodoni Moda font
 * @param {'left' | 'center' | 'right'} props.align - Text alignment
 * @param {React.ReactNode} props.children - Content
 * @param {string} props.className - Additional CSS classes
 */
const Heading = React.forwardRef(({
  as: Tag = 'h2',
  variant = 'section',
  color = 'ocean',
  bodoni = false,
  align = 'left',
  children,
  className,
  ...props
}, ref) => {
  
  // Base styles
  const baseStyles = cn(
    'font-bold leading-tight',
    bodoni && 'font-bodoni'
  );

  // Variant styles based on existing CSS - using proper Tailwind classes
  const variantStyles = {
    display: 'text-5xl md:text-6xl lg:text-7xl tracking-tighter', // h1 clamp equivalent
    hero: 'text-4xl md:text-5xl lg:text-6xl tracking-tight', // h2 clamp equivalent
    section: 'text-3xl md:text-4xl lg:text-5xl', // h3 clamp equivalent
    subsection: 'text-2xl md:text-3xl lg:text-4xl', // h4 clamp equivalent
    card: 'text-xl md:text-2xl lg:text-3xl', // h5 equivalent
  };

  // Color styles
  const colorStyles = {
    ocean: 'text-skyhouse-ocean',
    sunshine: 'text-skyhouse-sunshine',
    terracota: 'text-skyhouse-terracota',
    forest: 'text-skyhouse-forest',
    slate: 'text-skyhouse-slate',
    charcoal: 'text-skyhouse-charcoal',
    white: 'text-white',
  };

  // Alignment styles
  const alignmentStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    colorStyles[color],
    alignmentStyles[align],
    className
  );

  return (
    <Tag ref={ref} className={classes} {...props}>
      {children}
    </Tag>
  );
});

Heading.displayName = 'Heading';

export default Heading;

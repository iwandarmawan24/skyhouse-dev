import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Text Component - Typography component for body text
 * 
 * @param {Object} props
 * @param {'p' | 'span' | 'div' | 'label' | 'small'} props.as - HTML tag
 * @param {'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'} props.size - Text size
 * @param {'light' | 'normal' | 'medium' | 'semibold' | 'bold'} props.weight - Font weight
 * @param {'ocean' | 'sunshine' | 'terracota' | 'forest' | 'slate' | 'charcoal' | 'silver' | 'white'} props.color - Text color
 * @param {'left' | 'center' | 'right' | 'justify'} props.align - Text alignment
 * @param {boolean} props.bodoni - Use Bodoni Moda font
 * @param {boolean} props.muted - Apply muted color
 * @param {React.ReactNode} props.children - Content
 * @param {string} props.className - Additional CSS classes
 */
const Text = React.forwardRef(({
  as: Tag = 'p',
  size = 'base',
  weight = 'normal',
  color,
  align = 'left',
  bodoni = false,
  muted = false,
  children,
  className,
  ...props
}, ref) => {
  
  // Base styles
  const baseStyles = cn(
    'leading-relaxed',
    bodoni && 'font-bodoni'
  );

  // Size styles based on existing CSS
  const sizeStyles = {
    xs: 'text-xs',      // 0.75rem - text-size-tiny
    sm: 'text-sm',      // 0.875rem - text-size-small
    base: 'text-base',  // 1rem - text-size-regular
    lg: 'text-lg',      // 1.125rem - text-size-medium
    xl: 'text-xl',      // 1.25rem - text-size-large
    '2xl': 'text-2xl',  // 1.5rem - text-size-xlarge
    '3xl': 'text-3xl',  // 1.75rem - text-size-xxlarge
  };

  // Weight styles based on existing CSS
  const weightStyles = {
    light: 'font-light',       // 300 - text-weight-light
    normal: 'font-normal',     // 400 - text-weight-regular
    medium: 'font-medium',     // 500
    semibold: 'font-semibold', // 600 - text-weight-semibold
    bold: 'font-bold',         // 700 - text-weight-bold
  };

  // Color styles
  const colorStyles = {
    ocean: 'text-skyhouse-ocean',
    sunshine: 'text-skyhouse-sunshine',
    terracota: 'text-skyhouse-terracota',
    forest: 'text-skyhouse-forest',
    slate: 'text-skyhouse-slate',
    charcoal: 'text-skyhouse-charcoal',
    silver: 'text-skyhouse-silver',
    white: 'text-white',
  };

  // Alignment styles
  const alignmentStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  // Determine final color
  const finalColor = muted ? 'silver' : color;

  const classes = cn(
    baseStyles,
    sizeStyles[size],
    weightStyles[weight],
    finalColor && colorStyles[finalColor],
    alignmentStyles[align],
    className
  );

  return (
    <Tag ref={ref} className={classes} {...props}>
      {children}
    </Tag>
  );
});

Text.displayName = 'Text';

export default Text;

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Button Component - Fully styled with Tailwind CSS
 * 
 * @param {Object} props
 * @param {'primary' | 'sunshine' | 'terracota' | 'forest' | 'slate' | 'outline' | 'ghost' | 'pill-ocean' | 'pill-sunshine' | 'pill-terracota' | 'pill-forest' | 'pill-slate' | 'pill-charcoal' | 'pill-light-ocean' | 'pill-light-sunshine' | 'pill-light-terracota' | 'pill-light-forest' | 'pill-light-slate' | 'pill-light-charcoal'} props.variant - Button style variant
 * @param {'sm' | 'md' | 'lg' | 'xl'} props.size - Button size
 * @param {boolean} props.squash - Enable squash hover effect
 * @param {boolean} props.icon - Enable icon styling
 * @param {boolean} props.fullWidth - Make button full width
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Disable button
 * @param {string} props.href - If provided, renders as anchor tag
 * @param {Function} props.onClick - Click handler
 */
const Button = React.forwardRef(({
  variant = 'primary',
  size = 'md',
  squash = false,
  icon = false,
  fullWidth = false,
  children,
  className,
  disabled = false,
  href,
  onClick,
  target,
  rel,
  ...props
}, ref) => {
  // Base button styles
  const baseStyles = cn(
    // Display & Layout
    'inline-flex items-center justify-center',
    'gap-2',
    'rounded-full',
    'font-semibold',
    'transition-all duration-300 ease-in-out',
    'cursor-pointer',
    'text-center',
    'border-2',
    // Focus states
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    // Disabled states
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    // Full width
    fullWidth && 'w-full'
  );

  // Variant styles
  const variantStyles = {
    primary: 'bg-skyhouse-ocean text-white border-skyhouse-ocean hover:bg-transparent hover:text-skyhouse-ocean hover:scale-105 focus:ring-skyhouse-ocean',
    sunshine: 'bg-skyhouse-sunshine text-skyhouse-ocean border-skyhouse-sunshine hover:bg-transparent hover:text-skyhouse-sunshine hover:border-skyhouse-sunshine hover:scale-105 focus:ring-skyhouse-sunshine',
    terracota: 'bg-skyhouse-terracota text-white border-skyhouse-terracota hover:bg-transparent hover:text-skyhouse-terracota hover:scale-105 focus:ring-skyhouse-terracota',
    forest: 'bg-skyhouse-forest text-white border-skyhouse-forest hover:bg-transparent hover:text-skyhouse-forest hover:scale-105 focus:ring-skyhouse-forest',
    slate: 'bg-skyhouse-slate text-white border-skyhouse-slate hover:bg-transparent hover:text-skyhouse-slate hover:scale-105 focus:ring-skyhouse-slate',
    outline: 'bg-transparent text-skyhouse-ocean border-skyhouse-ocean hover:bg-skyhouse-ocean hover:text-white hover:scale-105 focus:ring-skyhouse-ocean',
    ghost: 'bg-transparent text-skyhouse-ocean border-transparent hover:bg-skyhouse-ocean/10 hover:border-skyhouse-ocean focus:ring-skyhouse-ocean',
    'pill-ocean': 'bg-black text-white border-black hover:bg-transparent hover:text-black hover:scale-105 focus:ring-black relative overflow-hidden group',
    'pill-sunshine': 'bg-black text-skyhouse-sunshine border-black hover:bg-skyhouse-sunshine hover:text-black hover:border-skyhouse-sunshine hover:scale-105 focus:ring-skyhouse-sunshine relative overflow-hidden group',
    'pill-terracota': 'bg-black text-skyhouse-terracota border-black hover:bg-skyhouse-terracota hover:text-white hover:border-skyhouse-terracota hover:scale-105 focus:ring-skyhouse-terracota relative overflow-hidden group',
    'pill-forest': 'bg-black text-skyhouse-forest border-black hover:bg-skyhouse-forest hover:text-white hover:border-skyhouse-forest hover:scale-105 focus:ring-skyhouse-forest relative overflow-hidden group',
    'pill-slate': 'bg-black text-skyhouse-slate border-black hover:bg-skyhouse-slate hover:text-white hover:border-skyhouse-slate hover:scale-105 focus:ring-skyhouse-slate relative overflow-hidden group',
    'pill-charcoal': 'bg-black text-skyhouse-charcoal border-black hover:bg-skyhouse-charcoal hover:text-white hover:border-skyhouse-charcoal hover:scale-105 focus:ring-skyhouse-charcoal relative overflow-hidden group',
    'pill-light-ocean': 'bg-white text-black border-white hover:bg-transparent hover:text-white hover:border-white hover:scale-105 focus:ring-white relative overflow-hidden group',
    'pill-light-sunshine': 'bg-white text-black border-white hover:bg-skyhouse-sunshine hover:text-black hover:border-skyhouse-sunshine hover:scale-105 focus:ring-skyhouse-sunshine relative overflow-hidden group',
    'pill-light-terracota': 'bg-white text-black border-white hover:bg-skyhouse-terracota hover:text-white hover:border-skyhouse-terracota hover:scale-105 focus:ring-skyhouse-terracota relative overflow-hidden group',
    'pill-light-forest': 'bg-white text-black border-white hover:bg-skyhouse-forest hover:text-white hover:border-skyhouse-forest hover:scale-105 focus:ring-skyhouse-forest relative overflow-hidden group',
    'pill-light-slate': 'bg-white text-black border-white hover:bg-skyhouse-slate hover:text-white hover:border-skyhouse-slate hover:scale-105 focus:ring-skyhouse-slate relative overflow-hidden group',
    'pill-light-charcoal': 'bg-white text-black border-white hover:bg-skyhouse-charcoal hover:text-white hover:border-skyhouse-charcoal hover:scale-105 focus:ring-skyhouse-charcoal relative overflow-hidden group'
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
    xl: 'px-12 py-6 text-xl'
  };

  // Pill button specific size adjustments (more compact)
  const pillSizeStyles = {
    sm: 'pl-4 pr-2 py-1.5 text-sm',
    md: 'pl-6 pr-2 py-2 text-base',
    lg: 'pl-8 pr-2.5 py-2.5 text-lg',
    xl: 'pl-10 pr-3 py-3 text-xl'
  };

  // Icon button adjustment
  const iconStyles = icon ? 'gap-2' : '';

  // Squash effect wrapper
  const squashWrapperClass = squash ? cn(
    'inline-block',
    'transition-transform duration-300 ease-in-out',
    'hover:scale-95',
    'active:scale-90'
  ) : '';

  // Check if this is a pill variant
  const isPillVariant = variant.startsWith('pill-');

  // Combined classes
  const buttonClasses = cn(
    baseStyles,
    variantStyles[variant],
    isPillVariant ? pillSizeStyles[size] : sizeStyles[size],
    iconStyles,
    className
  );
  
  // Get pill color from variant
  const pillColorMap = {
    'pill-ocean': 'bg-skyhouse-ocean',
    'pill-sunshine': 'bg-skyhouse-sunshine',
    'pill-terracota': 'bg-skyhouse-terracota',
    'pill-forest': 'bg-skyhouse-forest',
    'pill-slate': 'bg-skyhouse-slate',
    'pill-charcoal': 'bg-skyhouse-charcoal',
    'pill-light-ocean': 'bg-skyhouse-ocean',
    'pill-light-sunshine': 'bg-skyhouse-sunshine',
    'pill-light-terracota': 'bg-skyhouse-terracota',
    'pill-light-forest': 'bg-skyhouse-forest',
    'pill-light-slate': 'bg-skyhouse-slate',
    'pill-light-charcoal': 'bg-skyhouse-charcoal'
  };

  // Get icon color for pill buttons
  const pillIconColorMap = {
    'pill-ocean': 'text-black',
    'pill-sunshine': 'text-black',
    'pill-terracota': 'text-black',
    'pill-forest': 'text-black',
    'pill-slate': 'text-black',
    'pill-charcoal': 'text-black',
    'pill-light-ocean': 'text-white',
    'pill-light-sunshine': 'text-black',
    'pill-light-terracota': 'text-white',
    'pill-light-forest': 'text-white',
    'pill-light-slate': 'text-white',
    'pill-light-charcoal': 'text-white'
  };

  // Render pill button content
  const renderPillContent = (content) => (
    <>
      <span className="relative z-10">{content}</span>
      <span className={cn(
        'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300',
        pillColorMap[variant],
        'group-hover:scale-110'
      )}>
        <svg className={cn(
          'w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5',
          pillIconColorMap[variant]
        )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </>
  );

  // Render as anchor if href is provided
  if (href) {
    const anchorElement = (
      <a
        ref={ref}
        href={href}
        className={buttonClasses}
        onClick={onClick}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        {...props}
      >
        {isPillVariant ? renderPillContent(children) : children}
      </a>
    );

    return squash ? (
      <span className={squashWrapperClass}>
        {anchorElement}
      </span>
    ) : anchorElement;
  }

  // Render as button
  const buttonElement = (
    <button
      ref={ref}
      type="button"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {isPillVariant ? renderPillContent(children) : children}
    </button>
  );

  return squash ? (
    <span className={squashWrapperClass}>
      {buttonElement}
    </span>
  ) : buttonElement;
});

Button.displayName = 'Button';

export default Button;

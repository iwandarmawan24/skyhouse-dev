import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Button Component - Fully styled with Tailwind CSS
 * 
 * @param {Object} props
 * @param {'primary' | 'sunshine' | 'terracota' | 'forest' | 'slate' | 'outline' | 'ghost'} props.variant - Button style variant
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
    primary: cn(
      'bg-skyhouse-ocean text-white border-skyhouse-ocean',
      'hover:bg-transparent hover:text-skyhouse-ocean hover:scale-105',
      'focus:ring-skyhouse-ocean'
    ),
    sunshine: cn(
      'bg-skyhouse-sunshine text-skyhouse-ocean border-skyhouse-sunshine',
      'hover:bg-transparent hover:text-skyhouse-sunshine hover:border-skyhouse-sunshine hover:scale-105',
      'focus:ring-skyhouse-sunshine'
    ),
    terracota: cn(
      'bg-skyhouse-terracota text-white border-skyhouse-terracota',
      'hover:bg-transparent hover:text-skyhouse-terracota hover:scale-105',
      'focus:ring-skyhouse-terracota'
    ),
    forest: cn(
      'bg-skyhouse-forest text-white border-skyhouse-forest',
      'hover:bg-transparent hover:text-skyhouse-forest hover:scale-105',
      'focus:ring-skyhouse-forest'
    ),
    slate: cn(
      'bg-skyhouse-slate text-white border-skyhouse-slate',
      'hover:bg-transparent hover:text-skyhouse-slate hover:scale-105',
      'focus:ring-skyhouse-slate'
    ),
    outline: cn(
      'bg-transparent text-skyhouse-ocean border-skyhouse-ocean',
      'hover:bg-skyhouse-ocean hover:text-white hover:scale-105',
      'focus:ring-skyhouse-ocean'
    ),
    ghost: cn(
      'bg-transparent text-skyhouse-ocean border-transparent',
      'hover:bg-skyhouse-ocean/10 hover:border-skyhouse-ocean',
      'focus:ring-skyhouse-ocean'
    )
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
    xl: 'px-12 py-6 text-xl'
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

  // Combined classes
  const buttonClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    iconStyles,
    className
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
        {children}
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
      {children}
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

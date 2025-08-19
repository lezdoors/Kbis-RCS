import React from 'react';
import { cn } from '@/lib/utils';

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  ariaLabel?: string;
}

export const AccessibleButton = React.forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    children, 
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    ariaLabel,
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = [
      'inline-flex items-center justify-center font-medium rounded-lg',
      'transition-all duration-200 ease-in-out',
      'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'touch-target', // Ensures minimum 44px touch target
    ];

    const variants = {
      primary: [
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5',
        'active:translate-y-0 active:shadow-md',
      ],
      secondary: [
        'bg-secondary text-secondary-foreground',
        'hover:bg-secondary/80 hover:shadow-md',
      ],
      outline: [
        'border-2 border-primary text-primary bg-transparent',
        'hover:bg-primary hover:text-primary-foreground',
      ],
      ghost: [
        'text-foreground bg-transparent',
        'hover:bg-accent hover:text-accent-foreground',
      ],
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm min-h-[40px]',
      md: 'px-6 py-3 text-base min-h-[44px]',
      lg: 'px-8 py-4 text-lg min-h-[56px]',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          isLoading && 'cursor-not-allowed',
          className
        )}
        disabled={disabled || isLoading}
        aria-label={ariaLabel}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && (
          <svg 
            className="animate-spin -ml-1 mr-3 h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';
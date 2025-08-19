import React from 'react';
import { cn } from '@/lib/utils';

interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const AccessibleInput = React.forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ 
    label,
    error,
    helperText,
    required = false,
    className,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    
    return (
      <div className="space-y-2">
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
          {required && (
            <span className="text-destructive ml-1" aria-label="requis">
              *
            </span>
          )}
        </label>
        
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'flex h-12 w-full rounded-lg border border-input bg-background px-4 py-3 text-base',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'touch-target', // Ensures minimum 44px touch target
            error && 'border-destructive focus-visible:ring-destructive/20',
            className
          )}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(
            errorId && errorId,
            helperId && helperId
          )}
          {...props}
        />
        
        {helperText && (
          <p 
            id={helperId}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
        
        {error && (
          <p 
            id={errorId}
            className="text-sm text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = 'AccessibleInput';
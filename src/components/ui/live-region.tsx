import React from 'react';
import { cn } from '@/lib/utils';

interface LiveRegionProps {
  children: React.ReactNode;
  priority?: 'polite' | 'assertive';
  atomic?: boolean;
  className?: string;
}

export const LiveRegion = ({ 
  children, 
  priority = 'polite', 
  atomic = false,
  className 
}: LiveRegionProps) => {
  return (
    <div
      aria-live={priority}
      aria-atomic={atomic}
      className={cn('sr-only', className)}
    >
      {children}
    </div>
  );
};
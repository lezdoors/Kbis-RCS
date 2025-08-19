import React from 'react';
import { cn } from '@/lib/utils';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export const SkipLink = ({ href, children }: SkipLinkProps) => {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4',
        'bg-primary text-primary-foreground px-4 py-2 rounded-lg',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20',
        'z-50 font-medium text-sm'
      )}
    >
      {children}
    </a>
  );
};
// ==========================================
// OWNER: Zyad, Othman
// PURPOSE: Global Shared Layout - Page Container
// ==========================================
import { type ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`container mx-auto px-4 pb-8 md:pb-12 lg:pb-16 ${className}`}>{children}</div>
  );
}

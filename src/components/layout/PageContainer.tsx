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
  return <div className={`container mx-auto px-4 ${className}`}>{children}</div>;
}

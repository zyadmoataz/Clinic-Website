// ==========================================
// OWNER: Omar, Helda
// ==========================================
import React from 'react';

export function Badge({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-surface-2 border-border text-text inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

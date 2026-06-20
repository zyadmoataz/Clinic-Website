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
      className={`inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

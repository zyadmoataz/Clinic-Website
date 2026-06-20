// ==========================================
// OWNER: Omar, Helda
// PURPOSE: Shared UI Component - Empty State
// ==========================================
import React from 'react';

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="bg-surface border-border-strong flex flex-col items-center justify-center rounded-xl border border-dashed px-4 py-12 text-center">
      <div className="bg-surface-2 text-muted mb-4 flex h-12 w-12 items-center justify-center rounded-full">
        {icon}
      </div>
      <h3 className="text-text mb-2 text-lg font-bold">{title}</h3>
      <p className="text-muted mb-6 max-w-sm text-sm">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

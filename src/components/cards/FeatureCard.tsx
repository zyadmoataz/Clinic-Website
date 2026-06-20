// ==========================================
// OWNER: Othman
// PURPOSE: Landing Page - Feature Card
// ACTION: Replace this static layout with your own!
// ==========================================

import React from 'react';

interface FeatureCardProps {
  title: string;
  desc: string;
  icon?: React.ReactNode;
}

export function FeatureCard({ title, desc, icon }: FeatureCardProps) {
  return (
    <div className="bg-surface border-border flex flex-col items-start rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="bg-primary-soft text-primary mb-4 rounded-xl p-3">
        {icon || <div className="bg-primary h-6 w-6 rounded-full"></div>}
      </div>
      <h3 className="text-text mb-2 text-lg font-bold">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

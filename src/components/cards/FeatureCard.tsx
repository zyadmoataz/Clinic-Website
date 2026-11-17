import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  actionLabel?: string;
}

export function FeatureCard({ title, desc, icon, actionLabel }: FeatureCardProps) {
  return (
    <div className="spotlight-card group bg-surface border-border hover:border-primary/40 flex h-full flex-col items-start rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="bg-primary-soft text-primary group-hover:bg-primary group-hover:text-on-primary mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105">
        {icon}
      </div>
      <h3 className="text-text group-hover:text-primary mb-2 text-lg font-bold transition-colors">
        {title}
      </h3>
      <p className="text-muted text-sm leading-relaxed">{desc}</p>
      {actionLabel && (
        <span className="text-primary mt-4 inline-flex items-center gap-1.5 text-xs font-bold opacity-80 transition-opacity group-hover:opacity-100">
          {actionLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
        </span>
      )}
    </div>
  );
}

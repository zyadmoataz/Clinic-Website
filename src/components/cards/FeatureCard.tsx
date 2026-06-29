import React from 'react';

interface FeatureCardProps {
  title: string;
  desc: string;
  icon?: React.ReactNode;
}

export function FeatureCard({ title, desc, icon }: FeatureCardProps) {
  return (
    <div className="group bg-surface border-border/50 flex flex-col items-start rounded-[2rem] border p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 mb-6 w-fit rounded-full p-4 transition-transform duration-300 group-hover:scale-110">
        {icon || <div className="bg-primary h-6 w-6 rounded-full"></div>}
      </div>
      <h3 className="text-text mb-3 text-xl font-bold">{title}</h3>
      <p className="text-muted text-base leading-relaxed">{desc}</p>
    </div>
  );
}

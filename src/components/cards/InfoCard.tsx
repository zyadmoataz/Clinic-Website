import type { ReactNode } from 'react';

interface whyUSCard {
  icon: ReactNode;
  title: string;
  text: string;
  variant: string;
  className?: string;
}

const InfoCard = ({ icon, title, text, variant, className }: whyUSCard) => {
  return (
    <div
      className={`group bg-surface border-border/50 flex flex-col gap-4 rounded-[2rem] border p-8 shadow-sm transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-md ${className}`}
    >
      <div
        className={`bg-${variant}/10 group-hover:bg-${variant}/20 w-fit rounded-full p-4 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted leading-relaxed">{text}</p>
    </div>
  );
};

export default InfoCard;

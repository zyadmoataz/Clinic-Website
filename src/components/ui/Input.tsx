// ==========================================
// OWNER: Zyad, Othman, Doaa
// ==========================================
import React from 'react';

export function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`bg-surface-2 text-text placeholder-faint focus:bg-surface w-full rounded-2xl border-none px-5 py-3.5 text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.15)] focus:outline-none disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

// ==========================================
// OWNER: Zyad, Othman, Omar, Doaa, Helda
// ==========================================
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: 'bg-primary text-white shadow-md hover:shadow-glow hover:-translate-y-0.5',
    secondary: 'bg-primary-soft text-primary hover:bg-primary/20',
    ghost: 'text-text hover:bg-surface-2'
  };

  return (
    <button
      disabled={disabled}
      className={`inline-flex cursor-pointer items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

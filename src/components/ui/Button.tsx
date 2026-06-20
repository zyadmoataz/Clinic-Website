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
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm',
    secondary: 'bg-primary-soft text-primary hover:bg-primary/10',
    ghost: 'text-text hover:bg-surface-2'
  };

  return (
    <button
      disabled={disabled}
      className={`focus:ring-primary-ring inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:outline-none disabled:opacity-50 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

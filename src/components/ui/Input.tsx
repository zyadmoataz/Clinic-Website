import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function Input({
  className = '',
  type,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        className={`bg-surface-2 text-text placeholder-faint focus:bg-surface focus:ring-primary-ring w-full rounded-2xl border-none px-5 py-3.5 text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:ring-4 focus:outline-none disabled:opacity-50 ${isPassword ? 'pe-12' : ''} ${className}`}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-faint hover:text-text absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}

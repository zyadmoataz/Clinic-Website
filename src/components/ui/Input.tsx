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
        className={`bg-surface-2 border-border focus:border-primary text-text placeholder:text-faint focus:bg-surface focus:ring-primary/15 w-full rounded-xl border px-4 py-3 text-sm shadow-xs transition-all duration-200 outline-none focus:ring-4 focus:outline-none focus-visible:outline-none disabled:opacity-50 ${isPassword ? 'pe-12' : ''} ${className}`}
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

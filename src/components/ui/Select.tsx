import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
}

export function Select({ options, placeholder, className = '', ...props }: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        className={`bg-surface border-border hover:border-border-strong text-text focus:border-primary focus:ring-primary/15 w-full cursor-pointer appearance-none rounded-xl border py-2.5 ps-4 pe-10 text-sm font-medium shadow-xs transition-all outline-none focus:ring-4 focus:outline-none focus-visible:outline-none disabled:opacity-50 ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="text-faint pointer-events-none absolute end-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
    </div>
  );
}

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
        className={`bg-surface border-border text-text focus:border-primary focus:ring-primary-ring w-full cursor-pointer appearance-none rounded-xl border py-3 ps-4 pe-10 text-sm font-medium shadow-sm transition-all focus:ring-2 focus:outline-none disabled:opacity-50 ${className}`}
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

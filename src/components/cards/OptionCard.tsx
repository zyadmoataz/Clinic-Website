import React from 'react';

export interface OptionCard<T extends string> {
  value: T;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface OptionCardProps<T extends string> {
  options: OptionCard<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function OptionCard<T extends string>({
  options,
  value,
  onChange,
  className = ''
}: OptionCardProps<T>) {
  return (
    <div className={`flex justify-center gap-4 ${className}`}>
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`w-50 rounded-2xl border p-5 transition-all ${
              selected
                ? 'border-primary bg-primary/10 ring-primary ring-2'
                : 'border-border bg-surface hover:border-primary/50'
            }`}
          >
            {option.icon && <div className="text-primary mb-3">{option.icon}</div>}

            <h3 className="text-text font-semibold">{option.title}</h3>

            {option.description && <p className="text-muted mt-1 text-sm">{option.description}</p>}
          </button>
        );
      })}
    </div>
  );
}

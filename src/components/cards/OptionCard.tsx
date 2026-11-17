import React from 'react';

export interface OptionCardItem<T extends string> {
  value: T;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface OptionCardProps<T extends string> {
  options: OptionCardItem<T>[];
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
    <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${className}`}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={`flex cursor-pointer flex-col items-start rounded-2xl border p-4 text-start transition-all duration-200 active:scale-[0.98] ${
              selected
                ? 'border-primary bg-primary-soft ring-primary-ring shadow-sm ring-2'
                : 'border-border bg-surface hover:border-primary/40 hover:-translate-y-0.5'
            }`}
          >
            {option.icon && (
              <span
                className={`mb-2.5 inline-flex rounded-xl p-2 ${selected ? 'bg-primary text-on-primary' : 'bg-surface-2 text-primary'}`}
              >
                {option.icon}
              </span>
            )}
            <span className="text-text text-sm font-bold">{option.title}</span>
            {option.description && (
              <span className="text-muted mt-1 text-xs">{option.description}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

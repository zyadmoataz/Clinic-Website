import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1">
        {label && <label className="text-text text-sm font-semibold">{label}</label>}
        <textarea
          ref={ref}
          className={`bg-surface-2 border-border focus:border-primary text-text placeholder:text-faint focus:bg-surface w-full rounded-xl border px-4 py-3 text-sm shadow-xs transition-all duration-200 outline-none focus:ring-4 focus:outline-none focus-visible:outline-none disabled:opacity-50 ${
            error
              ? 'border-danger focus:border-danger focus:ring-danger/20'
              : 'focus:ring-primary/15'
          } ${className}`}
          rows={4}
          {...props}
        />
        {error && <span className="text-danger text-xs">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

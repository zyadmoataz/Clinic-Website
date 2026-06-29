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
          className={`bg-surface-2 text-text placeholder-faint focus:bg-surface w-full rounded-2xl border-none px-5 py-4 text-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none disabled:opacity-50 ${
            error ? 'focus:ring-danger/30 focus:ring-4' : 'focus:ring-primary-ring focus:ring-4'
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

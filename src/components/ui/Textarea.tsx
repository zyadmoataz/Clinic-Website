// ==========================================
// OWNER: Othman, Doaa
// PURPOSE: Textarea component for forms
// ==========================================
import React, { forwardRef, type TextareaHTMLAttributes } from 'react';

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
          className={`bg-surface text-text focus:ring-primary-ring w-full rounded border px-3 py-2 text-sm transition-colors focus:ring-2 focus:outline-none ${
            error ? 'border-danger focus:ring-danger/20' : 'border-border focus:border-primary'
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

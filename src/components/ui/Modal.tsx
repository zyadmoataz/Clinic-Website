import { useEffect, useId, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className = '' }: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prevActive = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      prevActive?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
    >
      <div className="pointer-events-none fixed inset-0 bg-black/55 backdrop-blur-xs" />
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`bg-surface border-border text-text relative z-50 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border p-6 shadow-lg outline-none ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-border mb-4 flex items-center justify-between gap-4 border-b pb-3">
          {title && (
            <h2 id={titleId} className="text-lg font-bold">
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="hover:bg-surface-2 text-muted hover:text-text ms-auto cursor-pointer rounded-full p-2 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

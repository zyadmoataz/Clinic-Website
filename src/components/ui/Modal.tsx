// ==========================================
// OWNER: Doaa
// ==========================================
import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className = '' }: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-[1rem]"
      onClick={onClose}
    >
      <div className="pointer-events-none fixed inset-0 bg-black/50" />
      <div
        className={`bg-surface text-text relative z-50 w-full max-w-lg rounded-xl p-6 shadow-lg ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="hover:bg-surface-2 text-muted hover:text-text cursor-pointer rounded-full p-[.5rem]"
          >
            X
          </button>
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

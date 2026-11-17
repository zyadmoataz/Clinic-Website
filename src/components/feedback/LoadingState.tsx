import { DoctorCardSkeleton, TicketCardSkeleton } from '../ui/Skeleton';

interface LoadingStateProps {
  message?: string;
  variant?: 'doctors' | 'tickets' | 'cards';
  count?: number;
}

export function LoadingState({ message, variant = 'cards', count = 3 }: LoadingStateProps) {
  const items = Array.from({ length: count }, (_, idx) => idx);

  return (
    <div aria-busy="true" aria-label={message || 'Loading content'}>
      {message && <p className="sr-only">{message}</p>}
      {variant === 'doctors' ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((idx) => (
            <DoctorCardSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((idx) => (
            <TicketCardSkeleton key={idx} />
          ))}
        </div>
      )}
    </div>
  );
}

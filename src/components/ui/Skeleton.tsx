interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div aria-hidden="true" className={`bg-surface-2 animate-pulse rounded-xl ${className}`} />
  );
}

export function DoctorCardSkeleton() {
  return (
    <div className="bg-surface border-border rounded-2xl border p-5 shadow-sm">
      <div className="mb-4 flex items-start gap-4">
        <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
      <div className="border-border flex items-center justify-between border-t pt-4">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-9 w-24 rounded-full" />
      </div>
    </div>
  );
}

export function TicketCardSkeleton() {
  return (
    <div className="bg-surface border-border rounded-2xl border p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2.5">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>
    </div>
  );
}

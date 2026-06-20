// ==========================================
// OWNER: Othman
// PURPOSE: Renders profile card with stats/details
// ==========================================
import React from 'react';

interface ProfileCardProps {
  displayName: string;
  email: string;
  avatarUrl?: string;
  onEditClick?: () => void;
}

export function ProfileCard({ displayName, email, avatarUrl, onEditClick }: ProfileCardProps) {
  return (
    <div className="card border-border bg-surface flex flex-col items-center border p-6 text-center shadow-sm">
      <div className="bg-primary-soft text-primary border-primary/20 mb-4 flex h-20 w-20 items-center justify-center rounded-full border text-2xl font-bold">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          displayName.charAt(0).toUpperCase()
        )}
      </div>
      <h3 className="text-text mb-1 text-lg font-bold">{displayName}</h3>
      <p className="text-muted mb-4 text-sm">{email}</p>
      {onEditClick && (
        <button
          onClick={onEditClick}
          className="text-primary text-sm font-semibold hover:underline"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}

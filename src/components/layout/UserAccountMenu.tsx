import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, LogOut, Ticket, User as UserIcon } from 'lucide-react';
import type { User } from '@/types';
import { sanitizeExternalUrl } from '@/utils/safeRedirect';

interface UserAccountMenuProps {
  user: User | null;
  onLogout: () => void;
}

export function UserAccountMenu({ user, onLogout }: UserAccountMenuProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const safeAvatar = sanitizeExternalUrl(user?.avatarUrl);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="bg-surface-2 hover:bg-primary-soft text-text border-border flex cursor-pointer items-center gap-2 rounded-full border py-1.5 ps-1.5 pe-3 text-sm font-semibold transition-colors"
      >
        <span className="bg-primary-soft text-primary flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
          {safeAvatar ? (
            <img
              src={safeAvatar}
              alt={user?.name || 'Patient'}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserIcon className="h-4 w-4" />
          )}
        </span>
        <span className="hidden max-w-[120px] truncate lg:inline">
          {user?.name || t('common.my_account')}
        </span>
        <ChevronDown
          className={`text-muted h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            role="menu"
            className="border-border bg-surface absolute end-0 top-full z-50 mt-2 flex w-56 flex-col rounded-2xl border p-2 shadow-lg"
          >
            <div className="border-border mb-1 border-b px-3 py-2">
              <p className="text-text truncate text-sm font-bold">
                {user?.name || t('common.my_account')}
              </p>
              <p className="text-muted truncate text-xs">{user?.email}</p>
            </div>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                navigate('/my-appointments');
              }}
              className="text-text hover:bg-surface-2 hover:text-primary flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-start text-sm font-medium transition-colors"
            >
              <Ticket className="h-4 w-4" />
              {t('navbar.appointments')}
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                navigate('/profile');
              }}
              className="text-text hover:bg-surface-2 hover:text-primary flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-start text-sm font-medium transition-colors"
            >
              <UserIcon className="h-4 w-4" />
              {t('navbar.profile')}
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="text-danger hover:bg-danger-soft mt-1 flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-start text-sm font-semibold transition-colors"
            >
              <LogOut className="h-4 w-4" />
              {t('navbar.sign_out')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

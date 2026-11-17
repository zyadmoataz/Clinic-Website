import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User as UserIcon } from 'lucide-react';
import { useAuthMeQuery } from '@/api/queries/authMe.query';
import { useChangePasswordMutation } from '@/api/queries/changePassword.query';
import { useUpdateProfileMutation } from '@/api/queries/updateProfile.mutation';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui';
import { ChangePasswordModal } from '@/features/profile/ChangePasswordModal';
import { EditProfileModal } from '@/features/profile/EditProfileModal';
import { ProfileQuickStats } from '@/features/profile/ProfileQuickStats';
import { showToast } from '@/lib/toast';
import { sanitizeExternalUrl } from '@/utils/safeRedirect';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { data: user, isLoading, isError, refetch } = useAuthMeQuery();
  const { mutate: updateProfile, isPending } = useUpdateProfileMutation();
  const { mutate: changePassword, isPending: isPasswordPending } = useChangePasswordMutation();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPassOpen, setIsPassOpen] = useState(false);

  if (isLoading) {
    return (
      <PageContainer className="mx-auto max-w-xl py-12">
        <LoadingState count={2} />
      </PageContainer>
    );
  }

  if (isError || !user) {
    return (
      <PageContainer className="mx-auto max-w-xl py-12">
        <ErrorState onRetry={() => refetch()} />
      </PageContainer>
    );
  }

  const safeAvatar = sanitizeExternalUrl(user.avatarUrl);

  return (
    <PageContainer className="mx-auto max-w-4xl py-10 md:py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="border-primary-soft bg-surface-2 relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-sm">
            {safeAvatar ? (
              <img
                src={safeAvatar}
                width={80}
                height={80}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserIcon size={34} className="text-primary" />
            )}
          </div>
          <div>
            <span className="bg-primary-soft text-primary mb-1 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold">
              Verified Patient Account
            </span>
            <h1 className="text-text text-xl font-extrabold sm:text-2xl">{user.name}</h1>
            <p className="text-muted text-sm">{user.email}</p>
          </div>
        </div>
        <Button variant="secondary" onClick={() => setIsEditOpen(true)}>
          {t('profile.edit')}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <section className="spotlight-card bg-surface border-border divide-border divide-y rounded-2xl border shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 text-sm">
              <span className="text-muted">{t('profile.name')}</span>
              <span className="text-text font-semibold">{user.name}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4 text-sm">
              <span className="text-muted">{t('profile.email')}</span>
              <span className="text-text font-semibold">{user.email}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4 text-sm">
              <span className="text-muted">{t('profile.phone')}</span>
              <span className="text-text font-semibold tabular-nums">{user.phone}</span>
            </div>
          </section>

          <section className="bg-surface border-border rounded-2xl border p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-text text-base font-bold">{t('profile.security')}</h2>
                <p className="text-muted mt-0.5 text-sm">{t('profile.security_desc')}</p>
              </div>
              <Button variant="secondary" onClick={() => setIsPassOpen(true)}>
                {t('profile.change_password')}
              </Button>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-5">
          <ProfileQuickStats />
        </aside>
      </div>

      <EditProfileModal
        isOpen={isEditOpen}
        user={user}
        isPending={isPending}
        onClose={() => setIsEditOpen(false)}
        onSubmit={(data) =>
          updateProfile(data, {
            onSuccess: () => {
              setIsEditOpen(false);
              showToast.success(t('profile.update_success'));
            },
            onError: () => showToast.error(t('profile.update_error'))
          })
        }
      />

      <ChangePasswordModal
        isOpen={isPassOpen}
        isPending={isPasswordPending}
        onClose={() => setIsPassOpen(false)}
        onSubmit={(data) => changePassword(data, { onSuccess: () => setIsPassOpen(false) })}
      />
    </PageContainer>
  );
}

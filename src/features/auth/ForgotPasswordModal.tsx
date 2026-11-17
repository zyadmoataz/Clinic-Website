import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MailCheck } from 'lucide-react';
import { apiClient } from '@/api/apiClient';
import { Button, Input, Modal } from '@/components/ui';
import { showToast } from '@/lib/toast';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    try {
      await apiClient.post('/auth/forgot-password', { email: email.trim() });
      setSent(true);
      showToast.success(
        t('login.reset_sent', 'Password reset instructions sent if the account exists.')
      );
    } catch {
      showToast.error(t('common.error_occurred'));
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    setSent(false);
    setEmail('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={t('login.reset_title', 'Reset Password')}>
      {sent ? (
        <div className="space-y-4 py-2 text-center">
          <div className="bg-success-soft text-success mx-auto flex h-12 w-12 items-center justify-center rounded-full">
            <MailCheck className="h-6 w-6" />
          </div>
          <p className="text-muted text-sm">
            {t(
              'login.reset_sent_desc',
              'Check your inbox for a recovery link. In demo mode, use Password123.'
            )}
          </p>
          <Button type="button" onClick={handleClose} className="w-full">
            {t('common.go_back', 'Back to Login')}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleReset} className="space-y-4">
          <p className="text-muted text-sm">
            {t(
              'login.reset_subtitle',
              'Enter your account email and we will send password reset steps.'
            )}
          </p>
          <div>
            <label htmlFor="reset-email" className="text-text mb-1.5 block text-sm font-semibold">
              {t('login.email')}
            </label>
            <Input
              id="reset-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('login.email_placeholder')}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={handleClose}>
              {t('common.cancel', 'Cancel')}
            </Button>
            <Button type="submit" disabled={sending}>
              {sending
                ? t('login.sending', 'Sending...')
                : t('login.send_reset', 'Send Reset Link')}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

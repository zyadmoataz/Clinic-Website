import { useTranslation } from 'react-i18next';
import { Button, Modal } from '@/components/ui';

interface CancelTicketModalProps {
  ticketId: number | null;
  isPending: boolean;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

export function CancelTicketModal({
  ticketId,
  isPending,
  onClose,
  onConfirm
}: CancelTicketModalProps) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={!!ticketId} onClose={onClose} title={t('appointments.cancel_btn')}>
      <div className="space-y-4">
        <p className="text-muted text-sm leading-relaxed">{t('appointments.cancel_confirm')}</p>
        <p className="bg-surface-2 text-muted rounded-xl p-3 text-xs">
          {t('appointments.cancel_policy')}
        </p>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            {t('common.cancel', 'Keep Ticket')}
          </Button>
          <Button
            type="button"
            disabled={isPending}
            onClick={() => ticketId && onConfirm(ticketId)}
            className="bg-danger text-on-primary hover:opacity-90"
          >
            {t('appointments.cancel_btn')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

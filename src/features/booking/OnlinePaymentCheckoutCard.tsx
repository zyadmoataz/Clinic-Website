import { CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button, Spinner } from '@/components/ui';

interface OnlinePaymentCheckoutCardProps {
  amount: number;
  isPending: boolean;
  onPay: () => void;
  onCancel: () => void;
}

export function OnlinePaymentCheckoutCard({
  amount,
  isPending,
  onPay,
  onCancel
}: OnlinePaymentCheckoutCardProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-surface border-border rounded-3xl border p-8 text-center shadow-sm">
      <CreditCard className="text-primary mx-auto mb-4 h-12 w-12" />
      <h1 className="text-text text-2xl font-bold">{t('booking.complete_payment')}</h1>
      <p className="text-muted mt-1 text-sm">{t('booking.secure_checkout')}</p>
      <div className="bg-surface-2 mt-6 rounded-2xl p-5">
        <p className="text-muted text-xs font-semibold uppercase">{t('booking.amount_due')}</p>
        <p className="text-primary font-display mt-1 text-3xl font-extrabold tabular-nums">
          {amount} EGP
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <Button onClick={onPay} disabled={isPending}>
          {isPending ? (
            <span className="flex items-center gap-2">
              <Spinner className="h-4 w-4" />
              {t('booking.processing_payment')}
            </span>
          ) : (
            t('booking.pay_amount', { amount })
          )}
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          {t('booking.cancel_payment')}
        </Button>
      </div>
    </div>
  );
}

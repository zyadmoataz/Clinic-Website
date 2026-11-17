import { CreditCard, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui';

export function MockCardFields() {
  const { t } = useTranslation();

  return (
    <div className="bg-surface-2 border-border mt-4 space-y-3 rounded-2xl border p-4 text-start">
      <div className="text-muted flex items-center justify-between text-xs font-semibold">
        <span className="inline-flex items-center gap-1.5">
          <CreditCard className="text-primary h-4 w-4" />
          {t('booking.demo_card_title', 'Test Card Checkout (Simulated)')}
        </span>
        <span className="text-accent inline-flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5" />
          TLS Mock
        </span>
      </div>
      <div>
        <label htmlFor="card-holder" className="text-muted mb-1 block text-xs font-medium">
          {t('booking.card_holder', 'Cardholder Name')}
        </label>
        <Input id="card-holder" defaultValue="Nour El-Din Hassan" className="bg-surface py-2.5" />
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        <div className="col-span-3 sm:col-span-2">
          <label htmlFor="card-number" className="text-muted mb-1 block text-xs font-medium">
            {t('booking.card_number', 'Card Number')}
          </label>
          <Input
            id="card-number"
            defaultValue="4242 •••• •••• 4242"
            className="bg-surface py-2.5 tabular-nums"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="card-exp" className="text-muted mb-1 block text-xs font-medium">
            {t('booking.card_expiry', 'Exp / CVC')}
          </label>
          <Input
            id="card-exp"
            defaultValue="12/28 · 424"
            className="bg-surface py-2.5 tabular-nums"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

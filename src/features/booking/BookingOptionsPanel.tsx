import { Banknote, Building2, CreditCard, Monitor } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { OptionCard } from '@/components/cards/OptionCard';
import { Textarea } from '@/components/ui';
import { MockCardFields } from '@/features/booking/MockCardFields';
import type { AppointmentMode, PaymentMethod } from '@/types';

interface BookingOptionsPanelProps {
  supportsOnline: boolean;
  mode: AppointmentMode;
  paymentMethod: PaymentMethod;
  notes: string;
  onModeChange: (mode: AppointmentMode) => void;
  onPaymentChange: (method: PaymentMethod) => void;
  onNotesChange: (notes: string) => void;
}

export function BookingOptionsPanel({
  supportsOnline,
  mode,
  paymentMethod,
  notes,
  onModeChange,
  onPaymentChange,
  onNotesChange
}: BookingOptionsPanelProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="bg-surface border-border rounded-2xl border p-6 shadow-sm">
        <h2 className="text-text mb-4 text-base font-bold">{t('booking.mode')}</h2>
        <OptionCard<AppointmentMode>
          value={mode}
          onChange={onModeChange}
          options={[
            {
              value: 'InClinic',
              title: t('booking.in_clinic'),
              icon: <Building2 className="h-5 w-5" />
            },
            ...(supportsOnline
              ? [
                  {
                    value: 'Online' as AppointmentMode,
                    title: t('booking.online'),
                    icon: <Monitor className="h-5 w-5" />
                  }
                ]
              : [])
          ]}
        />
      </div>

      <div className="bg-surface border-border rounded-2xl border p-6 shadow-sm">
        <label htmlFor="visit-notes" className="text-text mb-2 block text-base font-bold">
          {t('booking.visit_notes')}
        </label>
        <Textarea
          id="visit-notes"
          rows={3}
          maxLength={400}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder={t('booking.notes_placeholder')}
        />
      </div>

      <div className="bg-surface border-border rounded-2xl border p-6 shadow-sm">
        <h2 className="text-text mb-4 text-base font-bold">{t('booking.payment_method')}</h2>
        <OptionCard<PaymentMethod>
          value={paymentMethod}
          onChange={onPaymentChange}
          options={[
            { value: 'Cash', title: t('booking.cash'), icon: <Banknote className="h-5 w-5" /> },
            {
              value: 'Online',
              title: t('booking.pay_online'),
              icon: <CreditCard className="h-5 w-5" />
            }
          ]}
        />
        {paymentMethod === 'Online' && <MockCardFields />}
      </div>
    </div>
  );
}

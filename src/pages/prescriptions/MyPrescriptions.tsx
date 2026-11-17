import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Printer, ShieldCheck } from 'lucide-react';
import { usePrescriptions } from '@/api/queries/prescriptions.query';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui';
import {
  PrescriptionSummaryBar,
  PrescriptionVerificationFooter
} from '@/features/tickets/PrescriptionSummaryBar';
import { formatDate } from '@/utils/formatDate';
import { toLocalizedNumbers } from '@/utils/localization';

export default function MyPrescriptions() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const { data: visits, isLoading, isError, refetch } = usePrescriptions();

  const filteredVisits = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!visits) return [];
    if (!q) return visits;
    return visits.filter((v) => {
      const medsText = (v.prescription ?? []).map((m) => `${m.drug} ${m.dosage}`).join(' ');
      return `${v.diagnosis} ${v.doctorName ?? ''} ${v.ticketCode ?? ''} ${medsText}`
        .toLowerCase()
        .includes(q);
    });
  }, [visits, search]);

  return (
    <PageContainer className="py-10">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-text text-3xl font-extrabold tracking-tight">
            {t('prescriptions.title')}
          </h1>
          <p className="text-muted mt-1 text-sm">
            {t(
              'prescriptions.subtitle',
              'Verified digital visit summaries and medication schedules from your doctors.'
            )}
          </p>
        </div>
        {visits && visits.length > 0 && (
          <Button variant="secondary" onClick={() => window.print()} className="gap-2">
            <Printer className="h-4 w-4" />
            {t('prescriptions.print_all', 'Print E-Prescriptions')}
          </Button>
        )}
      </div>

      {!isLoading && !isError && visits && visits.length > 0 && (
        <PrescriptionSummaryBar visits={visits} search={search} onSearchChange={setSearch} />
      )}

      {isLoading && (
        <LoadingState variant="tickets" count={2} message={t('prescriptions.loading')} />
      )}
      {isError && <ErrorState message={t('prescriptions.error')} onRetry={refetch} />}

      {!isLoading && !isError && filteredVisits.length === 0 && (
        <EmptyState
          icon={<FileText className="h-7 w-7" />}
          title={t('prescriptions.no_data')}
          description={t('prescriptions.no_data_desc')}
        />
      )}

      {!isLoading && !isError && filteredVisits.length > 0 && (
        <div className="flex flex-col gap-6">
          {filteredVisits.map((visit) => (
            <article
              key={visit.id}
              className="print-area spotlight-card bg-surface border-border rounded-2xl border p-6 shadow-sm sm:p-8"
            >
              <div className="border-border mb-4 flex flex-wrap items-start justify-between gap-3 border-b pb-4">
                <div>
                  <h2 className="text-text text-lg font-bold">
                    {t('prescriptions.visit_on')} {formatDate(visit.createdAt)}
                  </h2>
                  {visit.doctorName && (
                    <p className="text-primary mt-0.5 text-sm font-semibold">
                      {visit.doctorName} {visit.serviceName ? `· ${visit.serviceName}` : ''}
                    </p>
                  )}
                </div>
                <span className="bg-accent-soft text-accent inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {visit.ticketCode || `RX-${visit.id}`}
                </span>
              </div>

              <div className="mb-5 space-y-1.5">
                <p className="text-text text-sm">
                  <strong className="font-bold">{t('prescriptions.diagnosis')}: </strong>
                  <span>{visit.diagnosis}</span>
                </p>
                {visit.notes && <p className="text-muted text-sm">{visit.notes}</p>}
              </div>

              {visit.prescription && visit.prescription.length > 0 && (
                <div className="border-border overflow-x-auto rounded-xl border">
                  <table className="w-full border-collapse text-start text-sm">
                    <thead>
                      <tr className="bg-surface-2 text-muted border-border border-b text-xs font-bold uppercase">
                        <th className="px-4 py-3 text-start">{t('prescriptions.medication')}</th>
                        <th className="px-4 py-3 text-start">{t('prescriptions.dosage')}</th>
                        <th className="px-4 py-3 text-start">{t('prescriptions.duration')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visit.prescription.map((item, idx) => (
                        <tr key={idx} className="border-border text-text border-b last:border-none">
                          <td className="px-4 py-3 font-semibold">{item.drug}</td>
                          <td className="px-4 py-3">{toLocalizedNumbers(item.dosage)}</td>
                          <td className="px-4 py-3">{toLocalizedNumbers(item.duration)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      <PrescriptionVerificationFooter />
    </PageContainer>
  );
}

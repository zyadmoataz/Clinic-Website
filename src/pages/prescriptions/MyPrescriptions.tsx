import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/feedback/LoadingState';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { PageContainer } from '@/components/layout/PageContainer';
import { usePrescriptions } from '@/api/queries/prescriptions.query';
import { formatDate } from '@/utils/formatDate';
import { toLocalizedNumbers } from '@/utils/localization';

export default function MyPrescriptions() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const { data: visits, isLoading, isError, refetch } = usePrescriptions();

  return (
    <PageContainer>
      <div className="w-full px-4 py-10 sm:px-8" dir={isRtl ? 'rtl' : 'ltr'}>
        <h1 className="text-text mb-8 text-3xl font-bold">{t('prescriptions.title')}</h1>

        {isLoading && <LoadingState message={t('prescriptions.loading')} />}

        {isError && <ErrorState message={t('prescriptions.error')} onRetry={refetch} />}

        {!isLoading && !isError && visits?.length === 0 && (
          <EmptyState
            icon={
              <svg className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            }
            title={t('prescriptions.no_data')}
            description={t('prescriptions.no_data_desc')}
          />
        )}

        {!isLoading && !isError && visits && visits.length > 0 && (
          <div className="flex flex-col gap-6">
            {visits.map((visit) => (
              <div
                key={visit.id}
                className="bg-surface border-border rounded-2xl border p-6 shadow-sm sm:p-8"
              >
                <div className="border-border mb-4 border-b pb-4">
                  <h2 className="text-text flex gap-1 text-lg font-bold">
                    <span>{t('prescriptions.visit_on')}</span>
                    <span>{formatDate(visit.createdAt)}</span>
                  </h2>
                </div>

                <div className="mb-6 space-y-1">
                  <p className="text-text text-sm">
                    <strong className="font-bold">{t('prescriptions.diagnosis')}: </strong>
                    <span className="opacity-80">{visit.diagnosis}</span>
                  </p>
                  {visit.notes && <p className="text-text text-sm opacity-60">{visit.notes}</p>}
                </div>

                {visit.prescription && visit.prescription.length > 0 && (
                  <div className="border-border overflow-hidden rounded-xl border">
                    <table className="w-full border-collapse text-start text-sm">
                      <thead>
                        <tr className="bg-border/40 text-text border-border border-b font-semibold opacity-70">
                          <th className="px-4 py-3 text-start">{t('prescriptions.medication')}</th>
                          <th className="px-4 py-3 text-start">{t('prescriptions.dosage')}</th>
                          <th className="px-4 py-3 text-start">{t('prescriptions.duration')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visit.prescription.map((item, idx) => (
                          <tr
                            key={idx}
                            className="border-border text-text border-b last:border-none"
                          >
                            <td className="px-4 py-3.5 font-medium">{item.drug}</td>
                            <td className="px-4 py-3.5 opacity-80">
                              {toLocalizedNumbers(item.dosage)}
                            </td>
                            <td className="px-4 py-3.5 opacity-80">
                              {toLocalizedNumbers(item.duration)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}

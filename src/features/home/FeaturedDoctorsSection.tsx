import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useDoctorsQuery } from '@/api/queries/doctors.query';
import { DoctorCard } from '@/components/cards/DoctorCard';
import { DoctorCardSkeleton } from '@/components/ui/Skeleton';
import { PageContainer } from '@/components/layout/PageContainer';
import { buildBookingUrl } from '@/utils/safeRedirect';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function FeaturedDoctorsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);
  const { data: doctors, isLoading } = useDoctorsQuery();
  const featured = (doctors ?? []).slice(0, 3);

  return (
    <PageContainer className="py-14 md:py-18">
      <div
        ref={ref}
        className={`reveal mb-8 flex flex-wrap items-end justify-between gap-4 ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        <div>
          <p className="text-accent mb-1.5 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
            <span className="bg-accent h-1.5 w-1.5 animate-pulse rounded-full" />
            {t('home.featured.eyebrow', 'Live Clinic Availability')}
          </p>
          <h2 className="text-text text-2xl font-extrabold tracking-tight sm:text-3xl">
            {t('home.featured.title', 'Book Top Specialists Right Now')}
          </h2>
        </div>
        <Link
          to="/doctors"
          className="text-primary hover:text-primary-hover group inline-flex items-center gap-1.5 text-sm font-bold"
        >
          {t('home.featured.view_all', 'View all specialists')}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <DoctorCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((doc, idx) => (
            <div
              key={doc.id}
              className={`reveal ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <DoctorCard
                doctor={doc}
                bookLabel={t('doctors.book_now')}
                onBook={() => navigate(`/doctors/${doc.id}`)}
                onQuickBook={
                  doc.nextAvailableDate && doc.nextAvailableSlot && doc.services[0]
                    ? () =>
                        navigate(
                          buildBookingUrl({
                            doctorId: doc.id,
                            serviceId: doc.services[0].id,
                            date: doc.nextAvailableDate!,
                            timeSlot: doc.nextAvailableSlot!
                          })
                        )
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

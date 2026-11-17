import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/layout/PageContainer';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { HomeHeroSection } from '@/features/home/HomeHeroSection';
import { MetricsStripSection } from '@/features/home/MetricsStripSection';
import { FeaturedDoctorsSection } from '@/features/home/FeaturedDoctorsSection';
import { TicketingStepsSection } from '@/features/home/TicketingStepsSection';
import { WhyChooseUsSection } from '@/features/home/WhyChooseUsSection';
import { SpecialtiesGridSection } from '@/features/home/SpecialtiesGridSection';
import { FaqSection } from '@/features/home/FaqSection';
import { HomeCtaSection } from '@/features/home/HomeCtaSection';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Home() {
  const { t } = useTranslation();
  const { ref: reviewsRef, isVisible: reviewsVisible } = useScrollReveal<HTMLDivElement>(0.1);

  const reviews = [
    {
      name: t('home.testimonial.testimonial-card1-title'),
      comment: t('home.testimonial.testimonial-card1-text')
    },
    {
      name: t('home.testimonial.testimonial-card2-title'),
      comment: t('home.testimonial.testimonial-card2-text')
    },
    {
      name: t('home.testimonial.testimonial-card3-title'),
      comment: t('home.testimonial.testimonial-card3-text')
    }
  ];

  return (
    <>
      <HomeHeroSection />
      <MetricsStripSection />
      <FeaturedDoctorsSection />
      <TicketingStepsSection />
      <WhyChooseUsSection />
      <SpecialtiesGridSection />

      <PageContainer className="py-14 md:py-18">
        <div
          ref={reviewsRef}
          className={`reveal mb-10 text-center ${reviewsVisible ? 'is-visible' : ''}`}
        >
          <h2 className="text-text mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {t('home.testimonial.testimonial-title')}
          </h2>
          <p className="text-muted text-sm sm:text-base">
            {t('home.testimonial.testimonial-subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((rev, idx) => (
            <div
              key={rev.name}
              style={{ transitionDelay: `${idx * 80}ms` }}
              className={`reveal h-full ${reviewsVisible ? 'is-visible' : ''}`}
            >
              <TestimonialCard name={rev.name} comment={rev.comment} rating={5} />
            </div>
          ))}
        </div>
      </PageContainer>

      <FaqSection />

      <div className="pt-14 md:pt-18">
        <HomeCtaSection />
      </div>
    </>
  );
}

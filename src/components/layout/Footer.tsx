import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../ui';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-surface-2 border-border no-print border-t pt-14 pb-8 transition-colors">
      <div className="container mx-auto px-4">
        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Link to="/" className="w-fit transition-opacity hover:opacity-85">
              <BrandLogo size="sm" />
            </Link>
            <p className="text-muted max-w-xs text-sm leading-relaxed">
              {t('footer.brandDescription')}
            </p>
            <div className="text-accent bg-accent-soft inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t('footer.verified_clinic', 'Verified Digital Ticketing')}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-text text-xs font-bold tracking-wider uppercase">
              {t('footer.quickLinks')}
            </h3>
            <Link
              to="/"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              {t('navbar.home')}
            </Link>
            <Link
              to="/doctors"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              {t('navbar.find_doctor')}
            </Link>
            <Link
              to="/doctors?mode=online"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              {t('footer.telehealth', 'Telehealth Visits')}
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-text text-xs font-bold tracking-wider uppercase">
              {t('footer.patientPortal')}
            </h3>
            <Link
              to="/my-appointments"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              {t('navbar.appointments')}
            </Link>
            <Link
              to="/my-prescriptions"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              {t('navbar.prescriptions')}
            </Link>
            <Link
              to="/profile"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              {t('navbar.profile')}
            </Link>
            <Link
              to="/login"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              {t('footer.loginToPortal')}
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-text text-xs font-bold tracking-wider uppercase">
              {t('footer.contactUs')}
            </h3>
            <div className="flex items-start gap-2.5 text-sm">
              <MapPin className="text-primary mt-0.5 h-4 w-4 shrink-0" />
              <span className="text-muted leading-relaxed">
                {t('footer.address1')}
                <br />
                {t('footer.address2')}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Phone className="text-primary h-4 w-4 shrink-0" />
              <span className="text-muted tabular-nums">+20 100 123 4567</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Mail className="text-primary h-4 w-4 shrink-0" />
              <span className="text-muted">care@medoraclinics.com</span>
            </div>
          </div>
        </div>

        <div className="border-border flex flex-col items-center justify-between gap-3 border-t pt-6 md:flex-row">
          <p className="text-muted text-center text-xs md:text-start">
            &copy; {new Date().getFullYear()} {t('common.appName', 'Medora Clinics')}.{' '}
            {t('footer.allRightsReserved', 'All rights reserved.')}
          </p>
          <p className="text-faint text-xs">
            {t('footer.support_hours', 'Clinic Desk Open Sat–Thu · 09:00 AM – 05:00 PM')}
          </p>
        </div>
      </div>
    </footer>
  );
}

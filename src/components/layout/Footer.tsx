// ==========================================
// OWNER: Zyad, Othman
// PURPOSE: Footer Component (Shared layout)
// ==========================================
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Share2, MessageCircle, Globe, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-surface-2 border-border border-t pt-16 pb-8 transition-colors">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="text-text flex items-center gap-2 font-bold">
              <span className="text-primary">✦</span>
              <span className="text-xl">{t('common.appName', 'Clarity Clinic')}</span>
            </div>
            <p className="text-muted max-w-xs text-sm leading-relaxed">
              {t('footer.brandDescription')}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <a
                href="#"
                className="bg-surface text-muted hover:text-primary hover:shadow-glow border-border/50 flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all hover:-translate-y-1"
              >
                <Globe size={18} />
              </a>
              <a
                href="#"
                className="bg-surface text-muted hover:text-primary hover:shadow-glow border-border/50 flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all hover:-translate-y-1"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="#"
                className="bg-surface text-muted hover:text-primary hover:shadow-glow border-border/50 flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all hover:-translate-y-1"
              >
                <Share2 size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-text mb-1 text-sm font-bold tracking-wider uppercase">
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
              to="/booking"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              {t('footer.bookAppointment')}
            </Link>
            <Link
              to="#"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              {t('footer.aboutUs')}
            </Link>
          </div>

          {/* Patient Portal */}
          <div className="flex flex-col gap-4">
            <h3 className="text-text mb-1 text-sm font-bold tracking-wider uppercase">
              {t('footer.patientPortal')}
            </h3>
            <Link
              to="/login"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              {t('footer.loginToPortal')}
            </Link>
            <Link
              to="/register"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              {t('navbar.create_account')}
            </Link>
            <Link
              to="/my-prescriptions"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              {t('navbar.prescriptions')}
            </Link>
            <Link
              to="/my-appointments"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              {t('navbar.appointments')}
            </Link>
            <Link
              to="/profile"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              {t('navbar.profile')}
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-text mb-1 text-sm font-bold tracking-wider uppercase">
              {t('footer.contactUs')}
            </h3>
            <div className="flex items-start gap-3">
              <MapPin className="text-primary mt-0.5 shrink-0" size={18} />
              <span className="text-muted text-sm leading-relaxed">
                {t('footer.address1')}
                <br />
                {t('footer.address2')}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <Phone className="text-primary shrink-0" size={18} />
              <span className="text-muted text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <Mail className="text-primary shrink-0" size={18} />
              <span className="text-muted text-sm">support@clarityclinic.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-border/50 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-muted text-center text-sm md:text-left">
            &copy; {new Date().getFullYear()} {t('common.appName', 'Clarity Clinic')}.{' '}
            {t('footer.allRightsReserved', 'All rights reserved.')}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted hover:text-primary text-xs font-medium transition-colors"
            >
              {t('footer.privacyPolicy')}
            </a>
            <span className="text-border text-xs">•</span>
            <a
              href="#"
              className="text-muted hover:text-primary text-xs font-medium transition-colors"
            >
              {t('footer.termsOfService')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

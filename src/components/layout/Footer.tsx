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
              Experience world-class healthcare tailored to your needs. Dedicated to your
              well-being, providing personalized attention every step of the way.
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
              Quick Links
            </h3>
            <Link
              to="/"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/doctors"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              Find a Doctor
            </Link>
            <Link
              to="/booking"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              Book Appointment
            </Link>
            <Link
              to="#"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              About Us
            </Link>
          </div>

          {/* Patient Portal */}
          <div className="flex flex-col gap-4">
            <h3 className="text-text mb-1 text-sm font-bold tracking-wider uppercase">
              Patient Portal
            </h3>
            <Link
              to="/login"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              Login to Portal
            </Link>
            <Link
              to="/register"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              Register Account
            </Link>
            <Link
              to="/my-prescriptions"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              My Prescriptions
            </Link>
            <Link
              to="/my-appointments"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              My Appointments
            </Link>
            <Link
              to="/profile"
              className="text-muted hover:text-primary w-fit text-sm font-medium transition-colors"
            >
              My Profile
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-text mb-1 text-sm font-bold tracking-wider uppercase">
              Contact Us
            </h3>
            <div className="flex items-start gap-3">
              <MapPin className="text-primary mt-0.5 shrink-0" size={18} />
              <span className="text-muted text-sm leading-relaxed">
                123 Health Avenue, Medical District
                <br />
                New York, NY 10001
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
              Privacy Policy
            </a>
            <span className="text-border text-xs">•</span>
            <a
              href="#"
              className="text-muted hover:text-primary text-xs font-medium transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

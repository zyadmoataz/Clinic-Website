import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, TicketPlus, X } from 'lucide-react';
import { useLogoutQuery } from '@/api/queries/logout.query';
import { useAuthStore } from '@/store/authStore';
import { BrandLogo, LanguageToggle, ThemeToggle } from '../ui';
import { MobileMenu } from './MobileMenu';
import { UserAccountMenu } from './UserAccountMenu';

export function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mutate: logoutUser } = useLogoutQuery();
  const { isAuthenticated, user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.doctors'), path: '/doctors' },
    { name: t('navbar.appointments'), path: '/my-appointments' },
    { name: t('navbar.prescriptions'), path: '/my-prescriptions' }
  ];

  return (
    <header className="bg-surface/85 border-border no-print sticky top-0 z-40 w-full border-b shadow-sm backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link to="/" className="transition-opacity hover:opacity-85">
          <BrandLogo size="md" />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-primary-soft text-primary'
                    : 'text-muted hover:bg-surface-2 hover:text-text'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 md:gap-4">
          <div className="hidden items-center gap-1.5 sm:flex">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          <Link
            to="/doctors"
            className="bg-primary-soft text-primary hover:bg-primary hover:text-on-primary hidden items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition-colors lg:inline-flex"
          >
            <TicketPlus className="h-3.5 w-3.5" />
            {t('navbar.book_ticket', 'Book Ticket')}
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {isAuthenticated ? (
              <UserAccountMenu user={user} onLogout={() => logoutUser()} />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-text hover:bg-surface-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                >
                  {t('navbar.sign_in')}
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-on-primary hover:bg-primary-hover rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-colors"
                >
                  {t('navbar.register')}
                </Link>
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? t('common.close_menu') : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            className="text-text hover:bg-surface-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors md:hidden"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        pathname={pathname}
        isAuthenticated={isAuthenticated}
        navLinks={navLinks}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={(path) => navigate(path)}
        onLogout={() => logoutUser()}
      />
    </header>
  );
}

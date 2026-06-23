// ==========================================
// OWNER: Zyad, Othman
// PURPOSE: Global Shared Layout - Navbar
// ==========================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle, LanguageToggle } from '../ui';
import { useTranslation } from 'react-i18next';
import { useLogoutQuery } from '../../services/api/queries/logout.query';
import { User, Menu, X } from 'lucide-react';

export function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: logoutUser } = useLogoutQuery();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem('auth_token');

  const navLinks = [
    { href: '/', label: t('navbar.home') },
    { href: '/doctors', label: t('navbar.doctors') },
    { href: '/my-prescriptions', label: t('navbar.prescriptions') },
    { href: '/my-appointments', label: t('navbar.appointments') }
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-surface/80 border-border sticky top-0 z-40 w-full border-b shadow-[0_4px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div
          className="text-text flex cursor-pointer items-center gap-2 font-bold transition-opacity hover:opacity-80"
          onClick={() => navigate('/')}
        >
          <span className="text-primary">✦</span>
          <span className="text-xl">{t('common.appName', 'Clarity Clinic')}</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-muted hover:text-primary text-sm font-medium transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop Right Controls */}
        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <div className="group relative">
                <button
                  className="bg-surface-2 text-primary hover:bg-primary/10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 active:scale-[0.92]"
                  onClick={() => navigate('/profile')}
                >
                  <User size={22} />
                </button>
                {/* Dropdown Menu */}
                <div className="border-border bg-surface/95 invisible absolute top-full right-0 z-50 mt-3 flex w-56 origin-top-right scale-95 flex-col rounded-3xl border p-2.5 opacity-0 shadow-[0_16px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                  <div className="border-border mb-2 border-b px-3 pt-2 pb-3">
                    <p className="text-text text-sm font-bold">My Account</p>
                  </div>
                  <button
                    className="text-text hover:bg-surface-2 hover:text-primary flex w-full items-center rounded-2xl px-4 py-2.5 text-left text-sm font-semibold transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97]"
                    onClick={() => navigate('/profile')}
                  >
                    {t('navbar.profile')}
                  </button>
                  <button
                    className="text-danger hover:bg-danger/10 mt-1 flex w-full items-center rounded-2xl px-4 py-2.5 text-left text-sm font-semibold transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97]"
                    onClick={() => logoutUser()}
                  >
                    {t('navbar.sign_out')}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  className="text-primary cursor-pointer text-sm font-medium"
                  onClick={() => navigate('/login')}
                >
                  {t('navbar.sign_in')}
                </button>
                <div className="bg-border mx-2 h-6 w-px" />
                <button
                  className="text-primary cursor-pointer text-sm font-medium"
                  onClick={() => navigate('/register')}
                >
                  {t('navbar.register')}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile: Toggles + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <LanguageToggle />
          <button
            className="bg-surface-2 text-primary hover:bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.92]"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`border-border bg-surface/95 overflow-hidden backdrop-blur-xl transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          mobileMenuOpen ? 'max-h-[500px] border-t opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={closeMobileMenu}
              className="text-text hover:bg-surface-2 hover:text-primary rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-[250ms]"
            >
              {label}
            </a>
          ))}

          {/* Divider */}
          <div className="bg-border my-2 h-px w-full" />

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <>
              <button
                className="text-text hover:bg-surface-2 hover:text-primary flex items-center rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all duration-[250ms]"
                onClick={() => {
                  navigate('/profile');
                  closeMobileMenu();
                }}
              >
                <User size={16} className="mr-2" />
                {t('navbar.profile')}
              </button>
              <button
                className="text-danger hover:bg-danger/10 flex items-center rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all duration-[250ms]"
                onClick={() => {
                  logoutUser();
                  closeMobileMenu();
                }}
              >
                {t('navbar.sign_out')}
              </button>
            </>
          ) : (
            <div className="flex gap-3 px-4 py-2">
              <button
                className="text-primary border-primary flex-1 rounded-2xl border py-2.5 text-sm font-semibold transition-all duration-[250ms] hover:opacity-80 active:scale-[0.97]"
                onClick={() => {
                  navigate('/login');
                  closeMobileMenu();
                }}
              >
                {t('navbar.sign_in')}
              </button>
              <button
                className="bg-primary flex-1 rounded-2xl py-2.5 text-sm font-semibold text-white transition-all duration-[250ms] hover:opacity-90 active:scale-[0.97]"
                onClick={() => {
                  navigate('/register');
                  closeMobileMenu();
                }}
              >
                {t('navbar.register')}
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

// ==========================================
// OWNER: Zyad, Othman
// PURPOSE: Global Shared Layout - Navbar
// ==========================================

import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ThemeToggle, LanguageToggle } from '../ui';
import { useTranslation } from 'react-i18next';
import { useLogoutQuery } from '@/api/queries/logout.query';
import { User, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mutate: logoutUser } = useLogoutQuery();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.doctors'), path: '/doctors' },
    { name: t('navbar.prescriptions'), path: '/my-prescriptions' },
    { name: t('navbar.appointments'), path: '/my-appointments' }
  ];

  const { isAuthenticated, user } = useAuthStore();

  return (
    <header className="bg-surface/80 border-border sticky top-0 z-40 w-full border-b shadow-[0_4px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div
          className="text-text flex cursor-pointer items-center gap-2 font-bold transition-opacity hover:opacity-80"
          onClick={() => navigate('/')}
        >
          <span className="text-primary">✦</span>
          <span className="text-xl">{t('common.appName', 'Clarity Clinic')}</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                pathname === link.path ? 'text-primary' : 'text-muted hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          <div className="hidden items-center gap-2 sm:flex">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {isAuthenticated ? (
              <div className="group relative">
                <button
                  className="bg-surface-2 text-primary hover:bg-primary/10 flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-full transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 active:scale-[0.92]"
                  onClick={() => navigate('/profile')}
                >
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt="User Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src="/default-avatar.png"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('fallback-icon');
                      }}
                    />
                  )}
                  {!user?.avatarUrl && <User size={22} className="pointer-events-none absolute" />}
                </button>

                {/* Dropdown Menu */}
                <div className="border-border bg-surface/95 invisible absolute end-0 top-full z-50 mt-3 flex w-56 origin-top-right scale-95 flex-col rounded-3xl border p-2.5 opacity-0 shadow-[0_16px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:visible group-hover:scale-100 group-hover:opacity-100 rtl:origin-top-left">
                  <div className="border-border mb-2 border-b px-3 pt-2 pb-3">
                    <p className="text-text text-sm font-bold">{t('common.my_account')}</p>
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
              <div className="flex items-center">
                <button
                  className="text-primary cursor-pointer text-sm font-medium transition-opacity hover:opacity-80"
                  onClick={() => navigate('/login')}
                >
                  {t('navbar.sign_in')}
                </button>
                <div className="bg-border mx-4 h-5 w-px"></div>
                <button
                  className="text-primary cursor-pointer text-sm font-medium transition-opacity hover:opacity-80"
                  onClick={() => navigate('/register')}
                >
                  {t('navbar.register')}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="text-text hover:bg-surface-2 -mr-2 flex items-center justify-center rounded-full p-2 transition-colors md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      <div
        className={`overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          isMobileMenuOpen
            ? 'border-border max-h-[400px] border-b opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-surface/95 flex flex-col space-y-2 px-4 py-4 backdrop-blur-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`rounded-2xl p-3 text-base font-semibold transition-colors ${
                pathname === link.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-text hover:bg-surface-2'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="bg-border my-2 h-px w-full"></div>

          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <button
                    className="text-text bg-surface-2 rounded-full px-4 py-2 text-sm font-bold"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/profile');
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="bg-danger rounded-full px-4 py-2 text-sm font-bold text-white"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      logoutUser();
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-text bg-surface-2 rounded-full px-4 py-2 text-sm font-bold"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/login');
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="bg-primary rounded-full px-4 py-2 text-sm font-bold text-white"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/register');
                    }}
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

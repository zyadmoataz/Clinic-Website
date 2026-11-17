import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ThemeToggle, LanguageToggle } from '../ui';

interface MobileMenuProps {
  isOpen: boolean;
  pathname: string;
  isAuthenticated: boolean;
  navLinks: { name: string; path: string }[];
  onClose: () => void;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export function MobileMenu({
  isOpen,
  pathname,
  isAuthenticated,
  navLinks,
  onClose,
  onNavigate,
  onLogout
}: MobileMenuProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`overflow-hidden transition-all duration-[350ms] md:hidden ${
        isOpen ? 'border-border max-h-[420px] border-b opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <nav
        aria-label="Mobile navigation"
        className="bg-surface/95 flex flex-col gap-1.5 px-4 py-4 backdrop-blur-xl"
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={onClose}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              pathname === link.path
                ? 'bg-primary-soft text-primary'
                : 'text-text hover:bg-surface-2'
            }`}
          >
            {link.name}
          </Link>
        ))}

        <div className="bg-border my-2 h-px w-full" />

        <div className="flex items-center justify-between px-1 py-1">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <button
                  type="button"
                  className="text-text bg-surface-2 cursor-pointer rounded-full px-4 py-2 text-xs font-bold"
                  onClick={() => {
                    onClose();
                    onNavigate('/profile');
                  }}
                >
                  {t('navbar.profile')}
                </button>
                <button
                  type="button"
                  className="bg-danger text-on-primary cursor-pointer rounded-full px-4 py-2 text-xs font-bold"
                  onClick={() => {
                    onClose();
                    onLogout();
                  }}
                >
                  {t('navbar.sign_out')}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="text-text bg-surface-2 cursor-pointer rounded-full px-4 py-2 text-xs font-bold"
                  onClick={() => {
                    onClose();
                    onNavigate('/login');
                  }}
                >
                  {t('navbar.sign_in')}
                </button>
                <button
                  type="button"
                  className="bg-primary text-on-primary cursor-pointer rounded-full px-4 py-2 text-xs font-bold"
                  onClick={() => {
                    onClose();
                    onNavigate('/register');
                  }}
                >
                  {t('navbar.register')}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

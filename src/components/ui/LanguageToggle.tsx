import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useEffect } from 'react';

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(nextLang);
  };

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <button
      className="text-text hover:bg-surface-2 flex h-10 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-semibold transition-all duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.92]"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <Globe className="mx-1 h-4 w-4" />
      {i18n.language === 'en' ? 'AR' : 'EN'}
    </button>
  );
}

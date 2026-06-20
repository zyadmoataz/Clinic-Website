// ==========================================
// OWNER: Zyad, Othman
// ==========================================
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from './Button';
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
    <Button
      className="h-8 px-3 text-xs text-gray-800 hover:bg-gray-100"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <Globe className="mr-1 h-4 w-4" />
      {i18n.language === 'en' ? 'AR' : 'EN'}
    </Button>
  );
}

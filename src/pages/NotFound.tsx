import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Compass, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui';

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="bg-primary-soft text-primary mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
        <Compass className="h-8 w-8" />
      </div>
      <p className="text-primary mb-2 text-sm font-bold tracking-wider uppercase">404</p>
      <h1 className="text-text mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {t('common.not_found_title', 'Page Not Found')}
      </h1>
      <p className="text-muted mb-8 max-w-md text-base">
        {t('common.not_found', 'The page you are looking for does not exist or may have moved.')}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => navigate('/')} className="gap-2">
          <Home className="h-4 w-4" />
          {t('common.go_home')}
        </Button>
        <Button variant="secondary" onClick={() => navigate('/doctors')} className="gap-2">
          <Search className="h-4 w-4" />
          {t('navbar.find_doctor', 'Find a Doctor')}
        </Button>
      </div>
    </div>
  );
}

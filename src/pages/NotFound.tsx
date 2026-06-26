import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold">{t('common.not_found_title')}</h1>
        <p className="text-lg">{t('common.not_found')}</p>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" onClick={() => navigate('/')}>
          {t('common.go_home')}
        </Button>
        <Button variant="primary" onClick={() => window.history.back()}>
          {t('common.go_back')}
        </Button>
      </div>
    </div>
  );
}

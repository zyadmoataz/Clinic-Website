import { useTranslation } from 'react-i18next';
interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const { t } = useTranslation();
  return (
    <div className="bg-surface text-text fixed inset-0 z-50 flex p-4">
      <div className="flex w-full flex-col">
        <button onClick={onClose}>{t('common.close_menu')}</button>
      </div>
    </div>
  );
}

import { useTranslation } from 'react-i18next';
// ==========================================
// OWNER: Zyad, Othman
// PURPOSE: Global Shared Layout - Mobile Menu
// ==========================================
interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex bg-white p-4">
      <div className="flex w-full flex-col">
        <button onClick={onClose}>{t('common.close_menu')}</button>
      </div>
    </div>
  );
}

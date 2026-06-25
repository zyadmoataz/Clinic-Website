import { useTranslation } from 'react-i18next';
// ==========================================
// OWNER: Doaa
// ==========================================
export default function Page() {
  const { t } = useTranslation();
  return <div>{t('common.page_shell')}</div>;
}

import i18n from '@/i18n';

export function formatTimeLabel(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const lang = i18n.language || 'en';
  const locale = lang === 'ar' ? 'ar-EG' : 'en-US';

  const date = new Date();
  date.setHours(h, m, 0, 0);

  return date.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

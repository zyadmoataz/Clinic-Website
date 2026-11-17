import i18n from '@/i18n';
import { addDaysIso, parseLocalDate, toIsoDate } from './dateCore';

export { addDaysIso, parseLocalDate, toIsoDate };

export const formatDate = (dateStr: string | Date): string => {
  try {
    const dateObj = parseLocalDate(dateStr);
    if (isNaN(dateObj.getTime())) return String(dateStr);

    const lang = i18n.language || 'en';
    const localeWithCalendar = lang === 'ar' ? 'ar-u-nu-arab' : 'en-US';

    return new Intl.DateTimeFormat(localeWithCalendar, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj);
  } catch {
    return String(dateStr);
  }
};

export function shortDateParts(date: string): { weekday: string; day: string; month: string } {
  const d = parseLocalDate(date);
  const lang = i18n.language || 'en';
  const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
  return {
    weekday: d.toLocaleDateString(locale, { weekday: 'short' }),
    day: d.toLocaleDateString(locale, { day: 'numeric' }),
    month: d.toLocaleDateString(locale, { month: 'short' })
  };
}

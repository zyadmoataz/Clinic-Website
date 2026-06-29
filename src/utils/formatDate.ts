import i18n from '@/i18n';

// Shared utility functions for Patient Website
export const formatDate = (dateStr: string | Date): string => {
  try {
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return String(dateStr);

    const lang = i18n.language || 'en';
    const localeWithCalendar = lang === 'ar' ? 'ar-u-nu-arab' : lang;

    return new Intl.DateTimeFormat(localeWithCalendar, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj);
  } catch {
    return String(dateStr);
  }
};

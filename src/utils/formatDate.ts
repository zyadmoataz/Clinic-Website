import i18n from '@/i18n';

// Shared utility functions for Patient Website
export const formatDate = (date: string | Date): string => {
  const lang = i18n.language || 'en';
  const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

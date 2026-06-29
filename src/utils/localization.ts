import i18n from '@/i18n';

export const translateTag = (tag: string | undefined): string => {
  if (!tag) return '';
  if (i18n.language !== 'ar') return tag;

  const translations: Record<string, string> = {
    cash: 'نقدي',
    clinic: 'في العيادة',
    inclinic: 'في العيادة',
    online: 'أونلاين',
    paid: 'تم الدفع',
    pending: 'قيد الانتظار'
  };

  return translations[tag.toLowerCase().replace(/\s+/g, '')] || tag;
};

export const toLocalizedNumbers = (input: string | number) => {
  if (input == null) return '';
  const str = input.toString();
  if (i18n.language !== 'ar') return str;

  const formatter = new Intl.NumberFormat('ar-u-nu-arab', { useGrouping: false });
  return str.replace(/\d+/g, (match) => formatter.format(Number(match)));
};

import { Language } from './translations';

export interface FormattedDates {
  gregorian: string;
  hijri: string;
}

export function getFormattedDates(date: Date = new Date(), lang: Language = 'en'): FormattedDates {
  const locale = lang === 'ur' ? 'ur-PK' : 'en-US';

  // Gregorian format
  const gregorianFormatter = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const gregorian = gregorianFormatter.format(date);

  // Hijri format using Intl islamic-umalqura calendar
  let hijri = '';
  try {
    const hijriFormatter = new Intl.DateTimeFormat(`${locale}-u-ca-islamic-umalqura`, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    hijri = hijriFormatter.format(date);
  } catch {
    // Fallback if islamic-umalqura is not supported in environment
    try {
      const hijriFormatter = new Intl.DateTimeFormat(`${locale}-u-ca-islamic`, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      hijri = hijriFormatter.format(date);
    } catch {
      hijri = lang === 'ur' ? '١٤٤٦ هـ' : '1446 AH';
    }
  }

  return { gregorian, hijri };
}

export type Language = 'en' | 'ur';

export interface FormattedDates {
  gregorian: string;
  hijri: string;
}

export function getFormattedDates(
  date: Date = new Date(),
  lang: Language = 'en',
  hijriData?: { day: string; month: { en: string; ar: string }; year: string }
): FormattedDates {
  const locale = lang === 'ur' ? 'ur-PK' : 'en-US';

  // Gregorian format
  const gregorianFormatter = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const gregorian = gregorianFormatter.format(date);

  // Hijri format
  let hijri = '';
  if (hijriData) {
    if (lang === 'ur') {
      const monthName = hijriData.month.ar || hijriData.month.en;
      hijri = `${hijriData.day} ${monthName} ${hijriData.year} هـ`;
    } else {
      hijri = `${hijriData.day} ${hijriData.month.en} ${hijriData.year} AH`;
    }
  } else {
    try {
      const hijriFormatter = new Intl.DateTimeFormat(`${locale}-u-ca-islamic-umalqura`, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      hijri = hijriFormatter.format(date);
    } catch {
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
  }

  return { gregorian, hijri };
}

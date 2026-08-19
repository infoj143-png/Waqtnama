export type Language = 'en' | 'ur';

export interface TranslationDictionary {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  searchBtn: string;
  detectBtn: string;
  detectingMsg: string;
  locationError: string;
  locationDenied: string;
  locationNotFound: string;
  currentTime: string;
  nextPrayer: string;
  timeRemaining: string;
  hours: string;
  minutes: string;
  seconds: string;
  todayDate: string;
  gregorianDate: string;
  hijriDate: string;
  prayers: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  prayerStatus: {
    current: string;
    next: string;
  };
  footerText: string;
  dir: 'ltr' | 'rtl';
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    title: 'WaqtNama',
    subtitle: 'Global Islamic Prayer Times Worldwide',
    searchPlaceholder: 'Enter City, Country (e.g., Lahore, Pakistan or London, UK)',
    searchBtn: 'Search',
    detectBtn: 'Detect My Location',
    detectingMsg: 'Detecting location...',
    locationError: 'Unable to detect location. Please search manually.',
    locationDenied: 'Location access was denied. Please allow location access or search manually.',
    locationNotFound: 'Location found, displaying prayer times.',
    currentTime: 'Current Time',
    nextPrayer: 'Next Prayer',
    timeRemaining: 'Time Remaining',
    hours: 'Hours',
    minutes: 'Mins',
    seconds: 'Secs',
    todayDate: "Today's Date",
    gregorianDate: 'Gregorian Date',
    hijriDate: 'Hijri Date',
    prayers: {
      fajr: 'Fajr',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha',
    },
    prayerStatus: {
      current: 'Current',
      next: 'Next',
    },
    footerText: 'WaqtNama - Accurate prayer times for Muslims around the world.',
    dir: 'ltr',
  },
  ur: {
    title: 'وقت نامہ',
    subtitle: 'پوری دنیا کے لیے اسلامی اوقاتِ نماز',
    searchPlaceholder: 'شہر، ملک درج کریں (مثلاً لاہور، پاکستان یا لندن، برطانیہ)',
    searchBtn: 'تلاش کریں',
    detectBtn: 'میری لوکیشن معلوم کریں',
    detectingMsg: 'لوکیشن تلاش کی جا رہی ہے...',
    locationError: 'لوکیشن معلوم نہیں ہو سکی۔ براہ کرم دستی طور پر تلاش کریں۔',
    locationDenied: 'لوکیشن کی اجازت نہیں ملی۔ براہ کرم اجازت دیں یا دستی طور پر تلاش کریں۔',
    locationNotFound: 'لوکیشن مل گئی، اوقات دکھائے جا رہے ہیں۔',
    currentTime: 'موجودہ وقت',
    nextPrayer: 'اگلی نماز',
    timeRemaining: 'باقی وقت',
    hours: 'گھنٹے',
    minutes: 'منٹ',
    seconds: 'سیکنڈ',
    todayDate: 'آج کی تاریخ',
    gregorianDate: 'عیسوی تاریخ',
    hijriDate: 'ہجری تاریخ',
    prayers: {
      fajr: 'فجر',
      dhuhr: 'ظہر',
      asr: 'عصر',
      maghrib: 'مغرب',
      isha: 'عشاء',
    },
    prayerStatus: {
      current: 'جاری',
      next: 'اگلی',
    },
    footerText: 'وقت نامہ - دنیا بھر کے مسلمانوں کے لیے بالکل درست اوقاتِ نماز۔',
    dir: 'rtl',
  },
};

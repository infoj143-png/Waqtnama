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
  qibla: {
    title: string;
    subtitle: string;
    findBtn: string;
    locating: string;
    qiblaBearing: string;
    distanceToKaaba: string;
    heading: string;
    facingQibla: string;
    compassSensorUnavailable: string;
    deviceCalibrationTip: string;
    permissionDenied: string;
    km: string;
    degrees: string;
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
    qibla: {
      title: 'Qibla Direction Compass',
      subtitle: 'Find direction to Kaaba, Makkah from anywhere',
      findBtn: 'Find Qibla',
      locating: 'Locating & Calibrating...',
      qiblaBearing: 'Qibla Angle',
      distanceToKaaba: 'Distance to Makkah',
      heading: 'Device Heading',
      facingQibla: 'You are facing Qibla!',
      compassSensorUnavailable: 'Magnetic sensor orientation not active on this device/browser. Rotate device or refer to angle from North.',
      deviceCalibrationTip: 'Rotate your phone in a figure-8 motion for better compass accuracy.',
      permissionDenied: 'Location permission denied. Please allow location access to find Qibla direction.',
      km: 'km',
      degrees: 'deg',
    },
    footerText: 'WaqtNama - Islamic prayer times for Muslims around the world.',
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
    qibla: {
      title: 'قبلہ رخ کمپاس',
      subtitle: 'دنیا میں کہیں سے بھی مکہ مکرمہ میں خانہ کعبہ کی سمت معلوم کریں',
      findBtn: 'قبلہ معلوم کریں',
      locating: 'لوکیشن اور سینسر جاری ہے...',
      qiblaBearing: 'قبلہ کا زاویہ',
      distanceToKaaba: 'خانہ کعبہ سے فاصلہ',
      heading: 'ڈیوائس کی سمت',
      facingQibla: 'آپ کا رخ قبلہ کی طرف ہے!',
      compassSensorUnavailable: 'اس ڈیوائس/براؤزر پر مقناطیسی سینسر فعال نہیں ہے۔ برائے مہربانی شمال سے دیے گئے زاویہ پر توجہ دیں۔',
      deviceCalibrationTip: 'بہتر کمپاس کے لیے اپنے فون کو 8 کے ہندسے کی شکل میں گھمائیں۔',
      permissionDenied: 'لوکیشن کی اجازت نہیں ملی۔ قبلہ کی سمت معلوم کرنے کے لیے لوکیشن کی اجازت دیں۔',
      km: 'کلومیٹر',
      degrees: 'درجے',
    },
    footerText: 'وقت نامہ - دنیا بھر کے مسلمانوں کے لیے اوقاتِ نماز۔',
    dir: 'rtl',
  },
};

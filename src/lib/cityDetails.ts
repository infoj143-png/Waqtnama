import { slugToLocationName } from './citySlug';

export interface CityDetails {
  slug: string;
  name: string;
  country: string;
  timezone: string;
  method: string;
  introParagraph: string;
}

const CITY_DETAILS_MAP: Record<string, Partial<CityDetails>> = {
  karachi: {
    name: 'Karachi',
    country: 'Pakistan',
    timezone: 'PKT (UTC+5)',
    method: 'University of Islamic Sciences, Karachi',
    introParagraph:
      'Daily Islamic prayer times for Karachi, Pakistan are calculated using the University of Islamic Sciences, Karachi method, adhering to the Pakistan Standard Time (PKT, UTC+5) zone. Residents and visitors in Karachi can track real-time Fajr, Dhuhr, Asr, Maghrib, and Isha schedules along with accurate Qibla direction and daily Hijri dates.',
  },
  lahore: {
    name: 'Lahore',
    country: 'Pakistan',
    timezone: 'PKT (UTC+5)',
    method: 'University of Islamic Sciences, Karachi',
    introParagraph:
      'Find exact prayer times in Lahore, Pakistan computed via the University of Islamic Sciences, Karachi standard in the PKT (UTC+5) timezone. Stay connected with today\'s Fajr, Dhuhr, Asr, Maghrib, and Isha timings alongside local Hijri calendar updates and Qibla bearings.',
  },
  islamabad: {
    name: 'Islamabad',
    country: 'Pakistan',
    timezone: 'PKT (UTC+5)',
    method: 'University of Islamic Sciences, Karachi',
    introParagraph:
      'Accurate daily prayer times for Islamabad, Pakistan are calculated under the University of Islamic Sciences, Karachi convention operating in Pakistan Standard Time (PKT, UTC+5). View real-time countdowns for Fajr, Dhuhr, Asr, Maghrib, and Isha prayers tailored for Pakistan\'s capital city.',
  },
  faisalabad: {
    name: 'Faisalabad',
    country: 'Pakistan',
    timezone: 'PKT (UTC+5)',
    method: 'University of Islamic Sciences, Karachi',
    introParagraph:
      'Get precise prayer schedules for Faisalabad, Pakistan adhering to the University of Islamic Sciences, Karachi calculation guidelines in PKT (UTC+5). Access today\'s Fajr, Dhuhr, Asr, Maghrib, and Isha timings with live countdowns and Qibla compass directions.',
  },
  rawalpindi: {
    name: 'Rawalpindi',
    country: 'Pakistan',
    timezone: 'PKT (UTC+5)',
    method: 'University of Islamic Sciences, Karachi',
    introParagraph:
      'Prayer times in Rawalpindi, Pakistan are calculated using the University of Islamic Sciences, Karachi methodology within the PKT (UTC+5) time zone. Check up-to-date Fajr, Dhuhr, Asr, Maghrib, and Isha prayer schedules alongside current Hijri calendar details.',
  },
  multan: {
    name: 'Multan',
    country: 'Pakistan',
    timezone: 'PKT (UTC+5)',
    method: 'University of Islamic Sciences, Karachi',
    introParagraph:
      'Explore exact Islamic prayer times for Multan, Pakistan calculated via the University of Islamic Sciences, Karachi standard in PKT (UTC+5). Stay informed on daily Fajr, Dhuhr, Asr, Maghrib, and Isha prayer timings with live countdown tracking.',
  },
  peshawar: {
    name: 'Peshawar',
    country: 'Pakistan',
    timezone: 'PKT (UTC+5)',
    method: 'University of Islamic Sciences, Karachi',
    introParagraph:
      'Daily prayer schedules for Peshawar, Pakistan are computed based on the University of Islamic Sciences, Karachi parameters under PKT (UTC+5). Monitor accurate Fajr, Dhuhr, Asr, Maghrib, and Isha timings, Qibla compass bearings, and Hijri dates.',
  },
  quetta: {
    name: 'Quetta',
    country: 'Pakistan',
    timezone: 'PKT (UTC+5)',
    method: 'University of Islamic Sciences, Karachi',
    introParagraph:
      'Accurate daily prayer times for Quetta, Pakistan follow the University of Islamic Sciences, Karachi convention in Pakistan Standard Time (PKT, UTC+5). Access reliable Fajr, Dhuhr, Asr, Maghrib, and Isha prayer schedules and local Hijri date details.',
  },
  london: {
    name: 'London',
    country: 'United Kingdom',
    timezone: 'GMT / BST (UTC+0 / UTC+1)',
    method: 'Muslim World League (MWL)',
    introParagraph:
      'Get accurate daily prayer times for London, United Kingdom based on the Muslim World League (MWL) calculation method in the GMT/BST timezone. Access reliable Fajr, Dhuhr, Asr, Maghrib, and Isha schedules tailored for London\'s unique twilight conditions throughout the year.',
  },
  'new-york': {
    name: 'New York',
    country: 'United States',
    timezone: 'EST / EDT (UTC-5 / UTC-4)',
    method: 'Islamic Society of North America (ISNA)',
    introParagraph:
      'Prayer times for New York, United States are calculated according to the Islamic Society of North America (ISNA) guidelines in Eastern Time (EST/EDT). Access precise daily Fajr, Dhuhr, Asr, Maghrib, and Isha times along with live countdowns and Qibla direction.',
  },
  dubai: {
    name: 'Dubai',
    country: 'United Arab Emirates',
    timezone: 'GST (UTC+4)',
    method: 'Muslim World League / UAE General Authority',
    introParagraph:
      'Daily prayer times for Dubai, United Arab Emirates follow the Gulf Standard Time (GST, UTC+4) and verified astronomical conventions. Stay updated with accurate Fajr, Dhuhr, Asr, Maghrib, and Isha timings, current Hijri dates, and precise Qibla direction.',
  },
  mecca: {
    name: 'Mecca',
    country: 'Saudi Arabia',
    timezone: 'AST (UTC+3)',
    method: 'Umm al-Qura University, Makkah',
    introParagraph:
      'Prayer times for Mecca, Saudi Arabia are determined using the official Umm al-Qura University method in Arabian Standard Time (AST, UTC+3). Track precise Fajr, Dhuhr, Asr, Maghrib, and Isha schedules for the holiest city in Islam.',
  },
  medina: {
    name: 'Medina',
    country: 'Saudi Arabia',
    timezone: 'AST (UTC+3)',
    method: 'Umm al-Qura University, Makkah',
    introParagraph:
      'Find daily prayer schedules for Medina, Saudi Arabia calculated according to the Umm al-Qura University standard under AST (UTC+3) timezone. Monitor live Fajr, Dhuhr, Asr, Maghrib, and Isha timings together with local Hijri calendar info.',
  },
  istanbul: {
    name: 'Istanbul',
    country: 'Turkey',
    timezone: 'TRT (UTC+3)',
    method: 'Diyanet / Muslim World League',
    introParagraph:
      'Islamic prayer times in Istanbul, Turkey are calculated in Turkey Time (TRT, UTC+3) using official astronomical parameters. View exact Fajr, Dhuhr, Asr, Maghrib, and Isha times with live countdowns and Qibla bearings.',
  },
  jakarta: {
    name: 'Jakarta',
    country: 'Indonesia',
    timezone: 'WIB (UTC+7)',
    method: 'KEMENAG (Ministry of Religious Affairs)',
    introParagraph:
      'Daily prayer times for Jakarta, Indonesia are calculated based on Western Indonesia Time (WIB, UTC+7) and Ministry of Religious Affairs (KEMENAG) standards. Stay informed with accurate Fajr, Dhuhr, Asr, Maghrib, and Isha schedules for Jakarta.',
  },
  'kuala-lumpur': {
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    timezone: 'MYT (UTC+8)',
    method: 'JAKIM (Department of Islamic Development)',
    introParagraph:
      'Prayer times in Kuala Lumpur, Malaysia are computed in Malaysia Time (MYT, UTC+8) following the Department of Islamic Development Malaysia (JAKIM) calculation system. Monitor Fajr, Dhuhr, Asr, Maghrib, and Isha timings alongside Hijri dates.',
  },
  toronto: {
    name: 'Toronto',
    country: 'Canada',
    timezone: 'EST / EDT (UTC-5 / UTC-4)',
    method: 'Islamic Society of North America (ISNA)',
    introParagraph:
      'Get reliable prayer times for Toronto, Canada calculated using the Islamic Society of North America (ISNA) parameters in Eastern Time (EST/EDT). Track exact Fajr, Dhuhr, Asr, Maghrib, and Isha schedules with live countdowns.',
  },
  sydney: {
    name: 'Sydney',
    country: 'Australia',
    timezone: 'AEST / AEDT (UTC+10 / UTC+11)',
    method: 'Muslim World League (MWL)',
    introParagraph:
      'Islamic prayer times for Sydney, Australia are calculated in Australian Eastern Time (AEST/AEDT) following Muslim World League principles. Check daily Fajr, Dhuhr, Asr, Maghrib, and Isha timings with accurate Qibla direction.',
  },
  riyadh: {
    name: 'Riyadh',
    country: 'Saudi Arabia',
    timezone: 'AST (UTC+3)',
    method: 'Umm al-Qura University, Makkah',
    introParagraph:
      'Prayer times for Riyadh, Saudi Arabia follow the Umm al-Qura University calculation method in Arabian Standard Time (AST, UTC+3). View exact daily Fajr, Dhuhr, Asr, Maghrib, and Isha timings with live countdowns and Hijri calendar dates.',
  },
  cairo: {
    name: 'Cairo',
    country: 'Egypt',
    timezone: 'EET / EEST (UTC+2 / UTC+3)',
    method: 'Egyptian General Authority of Survey',
    introParagraph:
      'Daily prayer schedules for Cairo, Egypt are calculated using the Egyptian General Authority of Survey standard in Eastern European Time. Access accurate Fajr, Dhuhr, Asr, Maghrib, and Isha timings for Cairo with Hijri dates.',
  },
};

export function getCityDetails(slug: string): CityDetails {
  const normalizedSlug = slug.toLowerCase().trim();
  const locationName = slugToLocationName(slug);
  const parts = locationName.split(',').map((p) => p.trim());
  const cityName = parts[0] || 'Location';
  const countryName = parts[1] || 'Worldwide';

  const baseKey = normalizedSlug.replace(/-(pakistan|uk|usa|saudi-arabia|uae|turkey|indonesia|malaysia|canada|australia|qatar|kuwait|oman|bahrain|bangladesh|egypt|morocco)$/, '');

  const known = CITY_DETAILS_MAP[normalizedSlug] || CITY_DETAILS_MAP[baseKey];

  if (known) {
    return {
      slug,
      name: known.name || cityName,
      country: known.country || countryName,
      timezone: known.timezone || 'Local Time',
      method: known.method || 'Standard Islamic Calculation',
      introParagraph:
        known.introParagraph ||
        `Get accurate daily Islamic prayer times for ${locationName}. View Fajr, Dhuhr, Asr, Maghrib, and Isha timings along with live countdown, Qibla compass, calculation method details, and Hijri calendar dates.`,
    };
  }

  return {
    slug,
    name: cityName,
    country: countryName,
    timezone: 'Local Time Zone',
    method: 'Standard Astronomical Calculation Method',
    introParagraph: `Find reliable daily Islamic prayer schedules for ${locationName}. Track Fajr, Dhuhr, Asr, Maghrib, and Isha prayer timings in real time with local timezone support, Qibla direction, and Hijri calendar dates.`,
  };
}

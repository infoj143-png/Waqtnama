export type PrayerKey = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface PrayerItem {
  key: PrayerKey;
  time24: string; // HH:mm format e.g. "05:15"
  time12: string; // 12hr formatted e.g. "05:15 AM"
  dateObj: Date;
}

export interface CityPrayerData {
  city: string;
  country: string;
  formattedLocation: string;
  prayers: PrayerItem[];
  nextPrayerKey: PrayerKey;
  currentPrayerKey: PrayerKey;
  timeRemaining: {
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
  };
}

const PRESET_CITIES: Record<string, { fajr: string; dhuhr: string; asr: string; maghrib: string; isha: string }> = {
  'lahore, pakistan': { fajr: '05:05', dhuhr: '12:15', asr: '15:45', maghrib: '18:10', isha: '19:30' },
  'karachi, pakistan': { fajr: '05:25', dhuhr: '12:30', asr: '15:55', maghrib: '18:25', isha: '19:45' },
  'islamabad, pakistan': { fajr: '05:00', dhuhr: '12:15', asr: '15:40', maghrib: '18:12', isha: '19:35' },
  'london, uk': { fajr: '04:45', dhuhr: '12:05', asr: '15:10', maghrib: '18:20', isha: '19:50' },
  'london, united kingdom': { fajr: '04:45', dhuhr: '12:05', asr: '15:10', maghrib: '18:20', isha: '19:50' },
  'new york, usa': { fajr: '05:10', dhuhr: '12:00', asr: '15:20', maghrib: '18:15', isha: '19:35' },
  'new york, united states': { fajr: '05:10', dhuhr: '12:00', asr: '15:20', maghrib: '18:15', isha: '19:35' },
  'makkah, saudi arabia': { fajr: '05:00', dhuhr: '12:20', asr: '15:40', maghrib: '18:25', isha: '19:55' },
  'mecca, saudi arabia': { fajr: '05:00', dhuhr: '12:20', asr: '15:40', maghrib: '18:25', isha: '19:55' },
  'dubai, uae': { fajr: '05:08', dhuhr: '12:22', asr: '15:45', maghrib: '18:18', isha: '19:38' },
  'dubai, united arab emirates': { fajr: '05:08', dhuhr: '12:22', asr: '15:45', maghrib: '18:18', isha: '19:38' },
  'istanbul, turkey': { fajr: '05:15', dhuhr: '12:25', asr: '15:35', maghrib: '18:15', isha: '19:40' },
  'tokyo, japan': { fajr: '03:50', dhuhr: '11:45', asr: '15:25', maghrib: '17:50', isha: '19:15' },
};

function format12Hour(time24: string): string {
  const [hoursStr, minutesStr] = time24.split(':');
  let hours = parseInt(hoursStr, 10);
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const paddedHours = hours < 10 ? `0${hours}` : `${hours}`;
  return `${paddedHours}:${minutesStr} ${period}`;
}

function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Generates plausible times for any given city string
function generateTimesForQuery(query: string) {
  const normalized = query.trim().toLowerCase();
  if (PRESET_CITIES[normalized]) {
    return PRESET_CITIES[normalized];
  }

  const hash = stringHash(normalized);
  const fajrMin = (hash % 40) + 10; // 04:10 - 04:50
  const dhuhrMin = ((hash >> 2) % 30) + 5; // 12:05 - 12:35
  const asrMin = ((hash >> 4) % 30) + 20; // 15:20 - 15:50
  const maghribMin = ((hash >> 6) % 30) + 5; // 18:05 - 18:35
  const ishaMin = ((hash >> 8) % 30) + 15; // 19:15 - 19:45

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  return {
    fajr: `04:${pad(fajrMin)}`,
    dhuhr: `12:${pad(dhuhrMin)}`,
    asr: `15:${pad(asrMin)}`,
    maghrib: `18:${pad(maghribMin)}`,
    isha: `19:${pad(ishaMin)}`,
  };
}

export function parseLocationQuery(query: string): { city: string; country: string } {
  const parts = query.split(',').map((p) => p.trim());
  if (parts.length >= 2) {
    const city = parts[0].replace(/\b\w/g, (l) => l.toUpperCase());
    const country = parts.slice(1).join(', ').replace(/\b\w/g, (l) => l.toUpperCase());
    return { city, country };
  }
  const city = query.trim().replace(/\b\w/g, (l) => l.toUpperCase()) || 'Lahore';
  return { city, country: 'Worldwide' };
}

export function calculatePrayerTimes(cityQuery: string, now: Date = new Date()): CityPrayerData {
  const { city, country } = parseLocationQuery(cityQuery);
  const timesMap = generateTimesForQuery(cityQuery);

  const keys: PrayerKey[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

  const prayers: PrayerItem[] = keys.map((key) => {
    const time24 = timesMap[key];
    const [h, m] = time24.split(':').map(Number);
    const dateObj = new Date(now);
    dateObj.setHours(h, m, 0, 0);

    return {
      key,
      time24,
      time12: format12Hour(time24),
      dateObj,
    };
  });

  // Determine current prayer and next prayer
  let currentPrayerKey: PrayerKey = 'isha';
  let nextPrayerKey: PrayerKey = 'fajr';
  let nextPrayerDate: Date = new Date(prayers[0].dateObj);
  nextPrayerDate.setDate(nextPrayerDate.getDate() + 1); // Fajr of tomorrow by default

  for (let i = 0; i < prayers.length; i++) {
    const prayer = prayers[i];

    if (now < prayer.dateObj) {
      nextPrayerKey = prayer.key;
      nextPrayerDate = prayer.dateObj;
      currentPrayerKey = keys[(i - 1 + keys.length) % keys.length];
      break;
    }
  }

  // If current time is after Isha
  if (now >= prayers[prayers.length - 1].dateObj) {
    currentPrayerKey = 'isha';
    nextPrayerKey = 'fajr';
    const tomorrowFajr = new Date(prayers[0].dateObj);
    tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
    nextPrayerDate = tomorrowFajr;
  }

  const totalSecondsRemaining = Math.max(0, Math.floor((nextPrayerDate.getTime() - now.getTime()) / 1000));
  const hours = Math.floor(totalSecondsRemaining / 3600);
  const minutes = Math.floor((totalSecondsRemaining % 3600) / 60);
  const seconds = totalSecondsRemaining % 60;

  return {
    city,
    country,
    formattedLocation: country !== 'Worldwide' ? `${city}, ${country}` : city,
    prayers,
    nextPrayerKey,
    currentPrayerKey,
    timeRemaining: {
      hours,
      minutes,
      seconds,
      totalSeconds: totalSecondsRemaining,
    },
  };
}

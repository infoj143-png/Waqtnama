export type PrayerKey = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface PrayerItem {
  key: PrayerKey;
  time24: string; // HH:mm format e.g. "05:15"
  time12: string; // 12hr formatted e.g. "05:15 AM"
  dateObj: Date;
}

export interface AladhanApiResponseData {
  timings?: Record<string, string>;
  date?: {
    readable?: string;
    timestamp?: string;
    hijri?: {
      date?: string;
      day?: string;
      month?: {
        number?: number;
        en?: string;
        ar?: string;
      };
      year?: string;
    };
  };
  meta?: {
    latitude?: number;
    longitude?: number;
    timezone?: string;
    method?: {
      id?: number;
      name?: string;
    };
  };
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
  hijriDateApi?: {
    day: string;
    month: { en: string; ar: string };
    year: string;
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
  return { city, country: 'Pakistan' };
}

function format12Hour(time24: string): string {
  const cleanTime = time24.split(' ')[0];
  const [hoursStr, minutesStr] = cleanTime.split(':');
  let hours = parseInt(hoursStr, 10);
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const paddedHours = hours < 10 ? `0${hours}` : `${hours}`;
  return `${paddedHours}:${minutesStr} ${period}`;
}

function cleanTime24(timeStr: string): string {
  return timeStr.split(' ')[0];
}

export function processAladhanApiResponse(
  apiData: AladhanApiResponseData,
  cityQuery: string,
  now: Date = new Date()
): CityPrayerData {
  const parsedLoc = parseLocationQuery(cityQuery);
  const timings = apiData.timings || {};

  const city = parsedLoc.city;
  const country = parsedLoc.country;

  const keys: PrayerKey[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
  const apiKeys: Record<PrayerKey, string> = {
    fajr: 'Fajr',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
  };

  const prayers: PrayerItem[] = keys.map((key) => {
    const rawTime = timings[apiKeys[key]] || '00:00';
    const time24 = cleanTime24(rawTime);
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
  nextPrayerDate.setDate(nextPrayerDate.getDate() + 1);

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

  const hijriInfo = apiData.date?.hijri;
  const hijriDateApi = hijriInfo && hijriInfo.day && hijriInfo.year
    ? {
        day: hijriInfo.day,
        month: {
          en: hijriInfo.month?.en || '',
          ar: hijriInfo.month?.ar || '',
        },
        year: hijriInfo.year,
      }
    : undefined;

  return {
    city,
    country,
    formattedLocation: country ? `${city}, ${country}` : city,
    prayers,
    nextPrayerKey,
    currentPrayerKey,
    timeRemaining: {
      hours,
      minutes,
      seconds,
      totalSeconds: totalSecondsRemaining,
    },
    hijriDateApi,
  };
}

export function getDefaultFallbackApiData(): AladhanApiResponseData {
  return {
    timings: {
      Fajr: '05:15',
      Sunrise: '06:35',
      Dhuhr: '12:15',
      Asr: '15:30',
      Sunset: '17:55',
      Maghrib: '17:55',
      Isha: '19:15',
      Imsak: '05:05',
      Midnight: '00:15',
    },
    date: {
      readable: '01 Jan 2025',
      timestamp: '1735689600',
      hijri: {
        date: '01-07-1446',
        day: '1',
        month: {
          number: 7,
          en: 'Rajab',
          ar: 'رجب',
        },
        year: '1446',
      },
    },
    meta: {
      latitude: 0,
      longitude: 0,
      timezone: 'UTC',
      method: {
        id: 2,
        name: 'Islamic Society of North America (ISNA)',
      },
    },
  };
}

'use client';

import React from 'react';
import { Language, translations } from '@/lib/translations';
import { CityPrayerData, PrayerKey } from '@/lib/prayerTimes';
import { Sun, Sunset, Sunrise, Moon, CloudSun } from 'lucide-react';

interface PrayerGridProps {
  language: Language;
  data: CityPrayerData;
}

const PRAYER_ICONS: Record<PrayerKey, React.ReactNode> = {
  fajr: <Sunrise className="w-6 h-6 text-emerald-600" />,
  dhuhr: <Sun className="w-6 h-6 text-amber-500" />,
  asr: <CloudSun className="w-6 h-6 text-amber-600" />,
  maghrib: <Sunset className="w-6 h-6 text-orange-600" />,
  isha: <Moon className="w-6 h-6 text-indigo-600" />,
};

export const PrayerGrid: React.FC<PrayerGridProps> = ({ language, data }) => {
  const t = translations[language];

  return (
    <div className="w-full my-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
        {t.dir === 'rtl' ? 'آج کے اوقاتِ نماز' : 'Today\'s Prayer Schedule'}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {data.prayers.map((prayer) => {
          const isNext = prayer.key === data.nextPrayerKey;
          const isCurrent = prayer.key === data.currentPrayerKey;
          const name = t.prayers[prayer.key];

          return (
            <div
              key={prayer.key}
              className={`relative rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between ${
                isNext
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-lg shadow-emerald-600/20 ring-2 ring-emerald-500 scale-[1.01] sm:scale-[1.02]'
                  : isCurrent
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-300 shadow-md'
                  : 'bg-white text-gray-800 border-emerald-100 shadow-sm hover:border-emerald-200 hover:shadow-md'
              }`}
            >
              {/* Top Tag Badges */}
              <div className="flex justify-between items-center mb-3">
                <div
                  className={`p-2.5 rounded-xl ${
                    isNext ? 'bg-white/20 border border-white/20' : 'bg-emerald-50 border border-emerald-100'
                  }`}
                >
                  {React.cloneElement(PRAYER_ICONS[prayer.key] as React.ReactElement, {
                    className: isNext ? 'w-6 h-6 text-white' : (PRAYER_ICONS[prayer.key] as React.ReactElement).props.className,
                  })}
                </div>

                {isNext && (
                  <span className="text-[11px] font-bold px-2.5 py-1 bg-white text-emerald-800 rounded-full shadow-sm tracking-wide uppercase">
                    {t.prayerStatus.next}
                  </span>
                )}
                {!isNext && isCurrent && (
                  <span className="text-[11px] font-bold px-2.5 py-1 bg-emerald-600 text-white rounded-full shadow-sm tracking-wide uppercase">
                    {t.prayerStatus.current}
                  </span>
                )}
              </div>

              {/* Prayer Name */}
              <div>
                <span
                  className={`text-xs sm:text-sm font-semibold tracking-wide block ${
                    isNext ? 'text-emerald-100' : 'text-gray-500'
                  }`}
                >
                  {name}
                </span>
                <div
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-mono my-1 ${
                    isNext ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {prayer.time12}
                </div>
              </div>

              {/* 24 hour subtext */}
              <div
                className={`mt-3 pt-2.5 border-t text-xs font-mono flex justify-between items-center ${
                  isNext ? 'border-white/20 text-emerald-100/80' : 'border-gray-100 text-gray-400'
                }`}
              >
                <span>24h</span>
                <span>{prayer.time24}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

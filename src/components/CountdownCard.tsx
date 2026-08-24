'use client';

import React from 'react';
import { Language, translations } from '@/lib/translations';
import { CityPrayerData } from '@/lib/prayerTimes';
import { FormattedDates } from '@/lib/dates';
import { Clock, Calendar, MapPin, Sparkles } from 'lucide-react';

interface CountdownCardProps {
  language: Language;
  data: CityPrayerData;
  dates: FormattedDates;
  currentTimeStr: string;
  mounted?: boolean;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({
  language,
  data,
  dates,
  currentTimeStr,
  mounted = true,
}) => {
  const t = translations[language];

  const pad = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  const nextPrayerName = t.prayers[data.nextPrayerKey];
  const daysRemaining = (data.timeRemaining as { days?: number }).days;
  const daysLabel = language === 'ur' ? 'دن' : 'Days';

  return (
    <div className="w-full bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-3xl text-white p-6 sm:p-8 shadow-xl relative overflow-hidden mb-8 border border-emerald-500/30">
      {/* Subtle Background Pattern Accent */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-12 -top-12 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Bar: Location & Dates */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/15">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
            <MapPin className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              {data.formattedLocation}
            </h2>
            <p className="text-xs text-emerald-100/80 font-medium">
              {t.title} - {t.subtitle}
            </p>
          </div>
        </div>

        {/* Dates Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-emerald-900/40 px-4 py-2.5 rounded-2xl border border-white/10 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 text-emerald-100 font-medium">
            <Calendar className="w-4 h-4 text-emerald-300" />
            <span suppressHydrationWarning>{dates.gregorian}</span>
          </div>
          <span className="hidden sm:inline text-white/30">•</span>
          <div className="text-emerald-200 font-semibold bg-emerald-800/80 px-2.5 py-0.5 rounded-lg border border-emerald-600/30" suppressHydrationWarning>
            {dates.hijri}
          </div>
        </div>
      </div>

      {/* Main Grid: Current Time & Next Prayer Countdown */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 items-center">
        {/* Left Box: Current Time */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>{t.currentTime}</span>
          </div>
          <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono my-1" suppressHydrationWarning>
            {currentTimeStr || '--:--:--'}
          </div>
          <span className="text-xs text-emerald-100/70">
            {t.todayDate}: {dates.gregorian}
          </span>
        </div>

        {/* Right Box: Countdown to Next Prayer */}
        <div className="flex flex-col items-center lg:items-end text-center lg:text-right bg-emerald-900/40 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>{t.nextPrayer}: <strong className="text-white text-sm underline underline-offset-4 decoration-emerald-400">{nextPrayerName}</strong></span>
          </div>

          {/* Countdown Digit Boxes */}
          <div className="flex items-center gap-2 sm:gap-3 my-1">
            {daysRemaining !== undefined && daysRemaining > 0 && (
              <>
                <div className="flex flex-col items-center">
                  <div className="bg-white/15 border border-white/20 text-white font-mono font-bold text-2xl sm:text-3xl px-3 py-1.5 rounded-xl min-w-[52px] text-center shadow-inner" suppressHydrationWarning>
                    {mounted ? pad(daysRemaining) : '--'}
                  </div>
                  <span className="text-[10px] text-emerald-200 font-medium uppercase mt-1">{daysLabel}</span>
                </div>
                <span className="text-2xl font-bold text-emerald-300 -mt-4">:</span>
              </>
            )}
            <div className="flex flex-col items-center">
              <div className="bg-white/15 border border-white/20 text-white font-mono font-bold text-2xl sm:text-3xl px-3 py-1.5 rounded-xl min-w-[52px] text-center shadow-inner" suppressHydrationWarning>
                {mounted ? pad(data.timeRemaining.hours) : '--'}
              </div>
              <span className="text-[10px] text-emerald-200 font-medium uppercase mt-1">{t.hours}</span>
            </div>
            <span className="text-2xl font-bold text-emerald-300 -mt-4">:</span>
            <div className="flex flex-col items-center">
              <div className="bg-white/15 border border-white/20 text-white font-mono font-bold text-2xl sm:text-3xl px-3 py-1.5 rounded-xl min-w-[52px] text-center shadow-inner" suppressHydrationWarning>
                {mounted ? pad(data.timeRemaining.minutes) : '--'}
              </div>
              <span className="text-[10px] text-emerald-200 font-medium uppercase mt-1">{t.minutes}</span>
            </div>
            <span className="text-2xl font-bold text-emerald-300 -mt-4">:</span>
            <div className="flex flex-col items-center">
              <div className="bg-white/15 border border-white/20 text-white font-mono font-bold text-2xl sm:text-3xl px-3 py-1.5 rounded-xl min-w-[52px] text-center shadow-inner" suppressHydrationWarning>
                {mounted ? pad(data.timeRemaining.seconds) : '--'}
              </div>
              <span className="text-[10px] text-emerald-200 font-medium uppercase mt-1">{t.seconds}</span>
            </div>
          </div>
          <span className="text-xs text-emerald-200/80 mt-1">{t.timeRemaining}</span>
        </div>
      </div>
    </div>
  );
};

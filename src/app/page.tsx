'use client';

import React, { useState, useEffect } from 'react';
import { Language, translations } from '@/lib/translations';
import { calculatePrayerTimes, CityPrayerData } from '@/lib/prayerTimes';
import { getFormattedDates, FormattedDates } from '@/lib/dates';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { CountdownCard } from '@/components/CountdownCard';
import { PrayerGrid } from '@/components/PrayerGrid';
import { Heart, Compass, ShieldCheck } from 'lucide-react';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [cityQuery, setCityQuery] = useState<string>('Lahore, Pakistan');
  const [now, setNow] = useState<Date>(new Date());
  const [prayerData, setPrayerData] = useState<CityPrayerData | null>(null);
  const [dates, setDates] = useState<FormattedDates>({ gregorian: '', hijri: '' });

  // Update live clock and recalculated countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update prayer data and date strings when cityQuery, language, or now updates
  useEffect(() => {
    const data = calculatePrayerTimes(cityQuery, now);
    setPrayerData(data);

    const formattedDates = getFormattedDates(now, language);
    setDates(formattedDates);
  }, [cityQuery, language, now]);

  // Handle HTML dir attribute for RTL/LTR font alignment
  useEffect(() => {
    const t = translations[language];
    document.documentElement.dir = t.dir;
    document.documentElement.lang = language;
  }, [language]);

  if (!prayerData) return null;

  const t = translations[language];

  // Format current live time string (HH:MM:SS AM/PM)
  const currentTimeStr = now.toLocaleTimeString(language === 'ur' ? 'ur-PK' : 'en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <div>
        {/* Navigation Header */}
        <Header language={language} onLanguageChange={setLanguage} />

        {/* Main Content Container */}
        <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
          {/* City Search Bar */}
          <SearchBar
            language={language}
            onSearch={(query) => setCityQuery(query)}
          />

          {/* Countdown & Live Clock Banner */}
          <CountdownCard
            language={language}
            data={prayerData}
            dates={dates}
            currentTimeStr={currentTimeStr}
          />

          {/* 5 Daily Prayer Cards Grid */}
          <PrayerGrid language={language} data={prayerData} />

          {/* Feature Highlights Banner */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-start gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  {language === 'ur' ? 'عالمی رسائی' : 'Global Coverage'}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {language === 'ur'
                    ? 'دنیا کے کسی بھی شہر کے لیے وقت دیکھیں۔'
                    : 'Search & find prayer times for any city worldwide.'}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-start gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  {language === 'ur' ? 'خودکار لوکیشن' : 'Auto Location'}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {language === 'ur'
                    ? 'ایک کلک سے اپنے موجودہ شہر کا جائزہ لیں۔'
                    : 'One-click automatic detection for your city.'}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-start gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <Heart className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  {language === 'ur' ? 'ہجری و عیسوی کیش' : 'Hijri & Gregorian'}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {language === 'ur'
                    ? 'آج کی قمری اور شمسی تاریخ باہم یکجا۔'
                    : 'Accurate today Hijri calendar date display.'}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-emerald-100 py-6 text-center text-xs text-gray-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-medium text-gray-600">{t.footerText}</p>
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
            <span>for Muslims Worldwide</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

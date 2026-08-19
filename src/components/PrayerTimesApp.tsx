'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Language, translations } from '@/lib/translations';
import {
  processAladhanApiResponse,
  parseLocationQuery,
  CityPrayerData,
  AladhanApiResponseData,
} from '@/lib/prayerTimes';
import { getFormattedDates, FormattedDates } from '@/lib/dates';
import { getPrayerTimes, getPrayerTimesByCoords } from '@/../lib/Api';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { CountdownCard } from '@/components/CountdownCard';
import { PrayerGrid } from '@/components/PrayerGrid';
import { QiblaCompass } from '@/components/QiblaCompass';
import { Compass, ShieldCheck, AlertCircle, Loader2, Heart } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { locationNameToSlug } from '@/lib/citySlug';

interface PrayerTimesAppProps {
  initialCity?: string;
  initialLanguage?: Language;
}

export function PrayerTimesApp({ initialCity = 'Lahore, Pakistan', initialLanguage = 'en' }: PrayerTimesAppProps) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [cityQuery, setCityQuery] = useState<string>(initialCity);
  const [now, setNow] = useState<Date>(new Date());

  const [rawApiData, setRawApiData] = useState<AladhanApiResponseData | null>(null);
  const [prayerData, setPrayerData] = useState<CityPrayerData | null>(null);
  const [dates, setDates] = useState<FormattedDates>({ gregorian: '', hijri: '' });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Update live clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch prayer times for city and country
  const fetchPrayerTimes = useCallback(async (query: string, updateUrl = true) => {
    setLoading(true);
    setError(null);
    const { city, country } = parseLocationQuery(query);

    try {
      const data = await getPrayerTimes(city, country);
      setRawApiData(data);
      setCityQuery(query);

      if (updateUrl && typeof window !== 'undefined') {
        const slug = locationNameToSlug(query);
        window.history.pushState({}, '', `/${slug}`);
      }
    } catch (err: unknown) {
      console.error('Error fetching prayer times:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch prayer times. Please try another city.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch prayer times by geolocation coordinates
  const fetchPrayerTimesByLocation = useCallback(
    async (latitude: number, longitude: number, locationName?: string) => {
      setLoading(true);
      setError(null);

      try {
        const data = await getPrayerTimesByCoords(latitude, longitude);
        setRawApiData(data);
        if (locationName) {
          setCityQuery(locationName);
          if (typeof window !== 'undefined') {
            const slug = locationNameToSlug(locationName);
            window.history.pushState({}, '', `/${slug}`);
          }
        } else {
          const detectedCity = data.meta?.timezone ? data.meta.timezone.split('/')[1]?.replace(/_/g, ' ') : 'Your Location';
          const locQuery = `${detectedCity}, Auto Detected`;
          setCityQuery(locQuery);
        }
      } catch (err: unknown) {
        console.error('Error fetching prayer times by location:', err);
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch prayer times for your location.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Initial load
  useEffect(() => {
    fetchPrayerTimes(initialCity, false);
  }, [fetchPrayerTimes, initialCity]);

  // Recalculate prayer timings/countdown when rawApiData, language, or now updates
  useEffect(() => {
    if (!rawApiData) return;

    const data = processAladhanApiResponse(rawApiData, cityQuery, now);
    setPrayerData(data);

    const formattedDates = getFormattedDates(now, language, data.hijriDateApi);
    setDates(formattedDates);
  }, [rawApiData, cityQuery, language, now]);

  // Handle HTML dir attribute for RTL/LTR font alignment
  useEffect(() => {
    const t = translations[language];
    document.documentElement.dir = t.dir;
    document.documentElement.lang = language;
  }, [language]);

  // Format current live time string (HH:MM:SS AM/PM)
  const currentTimeStr = now.toLocaleTimeString(language === 'ur' ? 'ur-PK' : 'en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const prayerTimesScheduleJsonLd = prayerData
    ? {
        '@context': 'https://schema.org',
        '@type': 'Schedule',
        name: `Islamic Prayer Times Schedule for ${prayerData.formattedLocation}`,
        description: `Daily prayer timings (Fajr, Dhuhr, Asr, Maghrib, Isha) for ${prayerData.formattedLocation}`,
        eventSchedule: prayerData.prayers.map((p) => ({
          '@type': 'Event',
          name: p.key.toUpperCase(),
          startTime: p.time24,
          location: prayerData.formattedLocation,
        })),
      }
    : null;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      {prayerTimesScheduleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(prayerTimesScheduleJsonLd) }}
        />
      )}
      <div>
        {/* Navigation Header */}
        <Header language={language} onLanguageChange={setLanguage} />

        {/* Main Content Container */}
        <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
          {/* City Search Bar */}
          <SearchBar
            language={language}
            onSearch={(query) => fetchPrayerTimes(query, true)}
            onDetectLocation={(lat, lng, name) => fetchPrayerTimesByLocation(lat, lng, name)}
            isLoading={loading}
          />

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold">{language === 'ur' ? 'خرابی:' : 'Error:'}</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Loading Skeleton or Main Content */}
          {loading && !prayerData ? (
            <div className="w-full bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm flex flex-col items-center justify-center min-h-[300px] gap-4">
              <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
              <p className="text-sm text-gray-600 font-medium">
                {language === 'ur' ? 'نماز کے اوقات لوڈ ہو رہے ہیں...' : 'Loading prayer times...'}
              </p>
            </div>
          ) : prayerData ? (
            <>
              {/* Countdown & Live Clock Banner */}
              <CountdownCard
                language={language}
                data={prayerData}
                dates={dates}
                currentTimeStr={currentTimeStr}
              />

              {/* 5 Daily Prayer Cards Grid */}
              <PrayerGrid language={language} data={prayerData} />

              {/* Qibla Direction Compass Section */}
              <QiblaCompass language={language} />
            </>
          ) : null}

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

      {/* Shared Footer Component */}
      <Footer />
    </div>
  );
}

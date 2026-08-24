'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
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
import { Compass, ShieldCheck, AlertCircle, Loader2, Heart, BookOpen, Clock, Globe, MapPin, Sparkles } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { locationNameToSlug } from '@/lib/citySlug';
import { getCityDetails, CityDetails } from '@/lib/cityDetails';

interface PrayerTimesAppProps {
  initialCity?: string;
  initialLanguage?: Language;
  initialApiData?: AladhanApiResponseData | null;
  cityDetails?: CityDetails | null;
}

export function PrayerTimesApp({
  initialCity = 'Lahore, Pakistan',
  initialLanguage = 'en',
  initialApiData = null,
  cityDetails = null,
}: PrayerTimesAppProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [cityQuery, setCityQuery] = useState<string>(initialCity);
  const [now, setNow] = useState<Date>(() => new Date());
  const [currentCityDetails, setCurrentCityDetails] = useState<CityDetails | null>(
    cityDetails || getCityDetails(locationNameToSlug(initialCity))
  );

  const [rawApiData, setRawApiData] = useState<AladhanApiResponseData | null>(initialApiData);
  const [prayerData, setPrayerData] = useState<CityPrayerData | null>(() => {
    if (initialApiData) {
      return processAladhanApiResponse(initialApiData, initialCity, new Date());
    }
    return null;
  });
  const [dates, setDates] = useState<FormattedDates>(() => {
    if (initialApiData) {
      const processed = processAladhanApiResponse(initialApiData, initialCity, new Date());
      return getFormattedDates(new Date(), initialLanguage, processed.hijriDateApi);
    }
    return { gregorian: '', hijri: '' };
  });

  const [loading, setLoading] = useState<boolean>(!initialApiData);
  const [error, setError] = useState<string | null>(null);

  // Set mounted and update live clock every second
  useEffect(() => {
    setMounted(true);
    setNow(new Date());

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
    const slug = locationNameToSlug(query);
    const details = getCityDetails(slug);
    setCurrentCityDetails(details);

    try {
      const data = await getPrayerTimes(city, country, details.methodId);
      setRawApiData(data);
      setCityQuery(query);

      if (updateUrl && typeof window !== 'undefined') {
        window.history.pushState({}, '', `/prayer-times/${slug}`);
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

      const details = locationName ? getCityDetails(locationNameToSlug(locationName)) : null;
      if (details) {
        setCurrentCityDetails(details);
      }
      const methodId = details?.methodId || 3;

      try {
        const data = await getPrayerTimesByCoords(latitude, longitude, methodId);
        setRawApiData(data);
        if (locationName) {
          setCityQuery(locationName);
          if (typeof window !== 'undefined') {
            const slug = locationNameToSlug(locationName);
            window.history.pushState({}, '', `/prayer-times/${slug}`);
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

  // Initial load if no initialApiData was supplied
  useEffect(() => {
    if (!initialApiData) {
      fetchPrayerTimes(initialCity, false);
    }
  }, [fetchPrayerTimes, initialCity, initialApiData]);

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
  const currentTimeStr = mounted
    ? now.toLocaleTimeString(language === 'ur' ? 'ur-PK' : 'en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : '--:--:--';

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <div>
        {/* Navigation Header */}
        <Header language={language} onLanguageChange={setLanguage} />

        {/* Main Content Container */}
        <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
          {/* Top Event Alert Banner for 12 Rabi ul Awwal 2026 */}
          <div className="mb-6 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-2xl p-4 sm:p-5 text-white shadow-md border border-emerald-600/40 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3 z-10">
              <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 flex-shrink-0">
                <Sparkles className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-emerald-500/30 text-emerald-100 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                    {language === 'ur' ? 'خصوصی اپڈیٹ' : 'SPECIAL EVENT'}
                  </span>
                  <span className="text-emerald-200 text-xs font-medium">Pakistan Calendar 1448 AH</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  {language === 'ur'
                    ? '12 ربیع الاول 2026 عید میلاد النبی - پاکستان میں تاریخ و اوقات'
                    : '12 Rabi ul Awwal 2026 Date & Timings in Pakistan'}
                </h2>
                <p className="text-xs text-emerald-100/90 mt-0.5 max-w-2xl">
                  {language === 'ur'
                    ? 'پاکستان میں چاند کی رویت، 12 ربیع الاول کی تاریخ، شبِ میلاد کے نوافل کے اوقات اور درود شریف کے وظائف کا مکمل گائیڈ۔'
                    : 'Check expected moon sighting, Eid Milad un Nabi holiday date, Shab-e-Milad nawafil schedule & Darood Shareef azkar.'}
                </p>
              </div>
            </div>

            <Link
              href="/12-rabi-ul-awwal-2026-date-pakistan"
              className="z-10 inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md flex-shrink-0 w-full md:w-auto"
            >
              <span>{language === 'ur' ? 'تفصیلات دیکھیں' : 'View Date & Timings'}</span>
              <BookOpen className="w-4 h-4" />
            </Link>
          </div>

          {/* City Search Bar */}
          <SearchBar
            language={language}
            onSearch={(query) => fetchPrayerTimes(query, true)}
            onDetectLocation={(lat, lng, name) => fetchPrayerTimesByLocation(lat, lng, name)}
            isLoading={loading}
          />

          {/* City Unique Introductory Paragraph & Badges */}
          {currentCityDetails && (
            <div className="mb-6 bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  {currentCityDetails.name}, {currentCityDetails.country}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {currentCityDetails.timezone}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/60 px-3 py-1 rounded-full">
                  <Globe className="w-3.5 h-3.5 text-amber-600" />
                  {currentCityDetails.method}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-normal">
                {currentCityDetails.introParagraph}
              </p>
            </div>
          )}

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
                mounted={mounted}
              />

              {/* 5 Daily Prayer Cards Grid */}
              <PrayerGrid language={language} data={prayerData} />

              {/* Qibla Direction Compass Section */}
              <QiblaCompass language={language} />
            </>
          ) : null}

          {/* Internal Links to Guides Section for SEO Equity */}
          <div className="mt-8 bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              {language === 'ur' ? 'اسلامی رہنما اور ذرائع' : 'Islamic Guides & Prayer Resources'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              {language === 'ur'
                ? 'نماز کے اوقات، رمضان کے روزے اور قبلہ کے رخ سے متعلق تفصیلی مضامین پڑھیں:'
                : 'Explore detailed guides on prayer time calculations, Ramadan fasting schedules, and finding the Qibla direction:'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/how-prayer-times-calculated"
                className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 hover:bg-emerald-100/70 transition-all block group"
              >
                <h4 className="font-bold text-emerald-900 text-sm mb-1 group-hover:text-emerald-700">
                  {language === 'ur' ? 'نماز کے اوقات کا حساب' : 'Prayer Time Calculations'}
                </h4>
                <p className="text-xs text-gray-600">
                  {language === 'ur'
                    ? 'سورج کے زاوئیے اور فلکیاتی طریقہ کار سمجھیں۔'
                    : 'Learn how solar angles, shadow ratios, and calculation standards work.'}
                </p>
              </Link>

              <Link
                href="/ramadan-timing-guide"
                className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 hover:bg-emerald-100/70 transition-all block group"
              >
                <h4 className="font-bold text-emerald-900 text-sm mb-1 group-hover:text-emerald-700">
                  {language === 'ur' ? 'رمضان کے اوقات کی رہنمائی' : 'Ramadan Timing Guide'}
                </h4>
                <p className="text-xs text-gray-600">
                  {language === 'ur'
                    ? 'سحری اور افطاری کے اوقات اور روزے کے قواعد۔'
                    : 'Suhoor and Iftar scheduling rules, fasting tips, and Ramadan calendar info.'}
                </p>
              </Link>

              <Link
                href="/qibla-direction-guide"
                className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 hover:bg-emerald-100/70 transition-all block group"
              >
                <h4 className="font-bold text-emerald-900 text-sm mb-1 group-hover:text-emerald-700">
                  {language === 'ur' ? 'قبلہ رخ معلوم کرنے کی گائیڈ' : 'Qibla Direction Guide'}
                </h4>
                <p className="text-xs text-gray-600">
                  {language === 'ur'
                    ? 'دنیا کے کسی بھی مقام سے کعبہ کا رخ دریافت کریں۔'
                    : 'How to accurately locate the direction of the Kaaba from anywhere.'}
                </p>
              </Link>
            </div>
          </div>

          {/* Feature Highlights Banner */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
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

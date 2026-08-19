'use client';

import React, { useState } from 'react';
import { Language, translations } from '@/lib/translations';
import { Search, MapPin, Loader2, Navigation } from 'lucide-react';

interface SearchBarProps {
  language: Language;
  onSearch: (cityQuery: string) => void;
  onDetectLocation: (lat: number, lng: number, locationName?: string) => void;
  isLoading?: boolean;
}

const QUICK_CITIES = [
  'Karachi, Pakistan',
  'Lahore, Pakistan',
  'London, UK',
  'New York, USA',
  'Mecca, Saudi Arabia',
  'Dubai, UAE',
];

export const SearchBar: React.FC<SearchBarProps> = ({
  language,
  onSearch,
  onDetectLocation,
  isLoading = false,
}) => {
  const t = translations[language];
  const [inputVal, setInputVal] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
      setStatusMsg(null);
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setStatusMsg(t.locationError);
      return;
    }

    setIsDetecting(true);
    setStatusMsg(t.detectingMsg);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (res.ok) {
            const geocodeData = await res.json();
            const city = geocodeData.city || geocodeData.locality || geocodeData.principalSubdivision;
            const country = geocodeData.countryName;
            const locationName = city && country ? `${city}, ${country}` : city || country || undefined;

            onDetectLocation(latitude, longitude, locationName);
            setStatusMsg(t.locationNotFound);
          } else {
            onDetectLocation(latitude, longitude);
            setStatusMsg(t.locationNotFound);
          }
        } catch {
          onDetectLocation(latitude, longitude);
          setStatusMsg(t.locationNotFound);
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        setIsDetecting(false);
        if (error.code === error.PERMISSION_DENIED) {
          setStatusMsg(t.locationDenied);
        } else {
          setStatusMsg(t.locationError);
        }
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-emerald-100 p-4 sm:p-6 mb-6">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pr-3.5 rtl:pl-0 flex items-center pointer-events-none text-emerald-600">
            <MapPin className="w-5 h-5 text-emerald-600" />
          </div>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchPlaceholder}
            className="w-full min-h-[44px] pl-11 rtl:pl-3 rtl:pr-11 pr-4 py-3 bg-emerald-50/40 border border-emerald-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm sm:text-base transition-all"
          />
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-2">
          <button
            type="submit"
            disabled={isLoading}
            aria-label={t.searchBtn}
            className="flex-1 md:flex-none min-h-[44px] px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-60"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>{t.searchBtn}</span>
          </button>

          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isDetecting || isLoading}
            aria-label={t.detectBtn}
            className="flex-1 md:flex-none min-h-[44px] px-4 py-3 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-700 font-semibold rounded-xl border border-emerald-200 transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-60 whitespace-nowrap"
          >
            {isDetecting ? (
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
            ) : (
              <Navigation className="w-4 h-4 text-emerald-600" />
            )}
            <span>{t.detectBtn}</span>
          </button>
        </div>
      </form>

      {statusMsg && (
        <div className="mt-3 text-xs sm:text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 p-2.5 sm:p-3 rounded-lg flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
          {statusMsg}
        </div>
      )}

      {/* Quick city tags */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
        <span className="font-medium text-gray-600">{t.dir === 'rtl' ? 'مقبول شہر:' : 'Popular:'}</span>
        {QUICK_CITIES.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => {
              setInputVal(city);
              onSearch(city);
              setStatusMsg(null);
            }}
            aria-label={`Select city ${city}`}
            className="min-h-[36px] px-3 py-1.5 bg-emerald-50/80 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-800 font-medium rounded-md border border-emerald-100 transition-colors flex items-center justify-center"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

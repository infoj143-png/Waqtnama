'use client';

import React from 'react';
import { Language, translations } from '@/lib/translations';
import { Compass, Globe } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const t = translations[language];

  return (
    <header className="bg-emerald-700 text-white shadow-md border-b border-emerald-800">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="bg-white/10 p-2.5 rounded-full backdrop-blur-sm border border-white/20">
            <Compass className="w-8 h-8 text-emerald-100 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              {t.title}
            </h1>
            <p className="text-xs text-emerald-100/90 font-medium">{t.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-800/60 p-1.5 rounded-xl border border-emerald-600/40 backdrop-blur-sm">
          <Globe className="w-4 h-4 text-emerald-200 ml-2 rtl:mr-2 rtl:ml-0" />
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              language === 'en'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-emerald-100 hover:text-white hover:bg-emerald-700/50'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onLanguageChange('ur')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              language === 'ur'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-emerald-100 hover:text-white hover:bg-emerald-700/50'
            }`}
          >
            اردو
          </button>
        </div>
      </div>
    </header>
  );
};

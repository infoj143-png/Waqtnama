'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MessageSquare, X, Calendar, Clock, Compass, HelpCircle, ArrowRight, Bot } from 'lucide-react';

export function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleAction = (url: string, selector?: string) => {
    if (selector && typeof document !== 'undefined') {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsOpen(false);
        return;
      }
    }
    setIsOpen(false);
    if (pathname !== url) {
      router.push(url);
    }
  };

  return (
    <aside aria-label="Navigation Assistant Widget" className="fixed bottom-5 right-5 z-[9999]">
      {/* Navigation Assistant Modal (Popup) */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-white rounded-2xl border border-emerald-100 shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
          style={{ zIndex: 9999 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                <Bot className="w-4 h-4 text-emerald-200" />
              </div>
              <h3 className="font-bold text-sm tracking-wide">WaqtNama Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3.5 bg-slate-50/50">
            <p className="text-xs text-gray-700 leading-relaxed bg-emerald-50/70 border border-emerald-100 p-3 rounded-xl font-medium">
              Assalam-o-Alaikum! Welcome to WaqtNama. How can I help you navigate today?
            </p>

            {/* Quick Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => handleAction('/12-rabi-ul-awwal-2026-date-pakistan')}
                className="w-full text-left flex items-center justify-between p-2.5 bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-xl transition-all shadow-sm group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-amber-100 text-amber-700 rounded-lg group-hover:bg-amber-200 transition-colors">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-800 group-hover:text-emerald-900">
                    12 Rabi ul Awwal Schedule
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => handleAction('/prayer-times')}
                className="w-full text-left flex items-center justify-between p-2.5 bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-xl transition-all shadow-sm group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-800 group-hover:text-emerald-900">
                    City Prayer Timings
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => handleAction('/qibla-direction-guide')}
                className="w-full text-left flex items-center justify-between p-2.5 bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-xl transition-all shadow-sm group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-teal-100 text-teal-700 rounded-lg group-hover:bg-teal-200 transition-colors">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-800 group-hover:text-emerald-900">
                    Qibla & Azkar Guide
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => handleAction('/contact-us')}
                className="w-full text-left flex items-center justify-between p-2.5 bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-xl transition-all shadow-sm group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-800 group-hover:text-emerald-900">
                    Contact Support
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300/50"
        aria-label={isOpen ? 'Close Assistant' : 'Open Assistant'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>
    </aside>
  );
}

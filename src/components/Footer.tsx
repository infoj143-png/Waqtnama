import React from 'react';
import Link from 'next/link';
import { Compass, Heart, Mail, Shield, Info, Calculator, Moon, Navigation } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-emerald-100 text-gray-600 text-sm py-8 mt-12">
      <div className="max-w-5xl mx-auto px-4 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-emerald-50">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="bg-emerald-100 p-2 rounded-full text-emerald-700">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-gray-900 text-base block">WaqtNama</span>
              <p className="text-xs text-gray-500">
                Accurate Islamic Prayer Times & Qibla Direction Worldwide
              </p>
            </div>
          </div>

          <nav aria-label="Guides Navigation" className="flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm font-medium">
            <Link
              href="/how-prayer-times-calculated"
              className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors py-1 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-100/60"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              Prayer Calculations
            </Link>
            <Link
              href="/ramadan-timing-guide"
              className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors py-1 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-100/60"
            >
              <Moon className="w-3.5 h-3.5 text-emerald-600" />
              Ramadan Guide
            </Link>
            <Link
              href="/qibla-direction-guide"
              className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors py-1 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-100/60"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-600" />
              Qibla Guide
            </Link>
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <nav aria-label="Footer Main Navigation" className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className="hover:text-emerald-700 transition-colors py-1"
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors py-1"
            >
              <Info className="w-4 h-4 text-emerald-600" />
              About Us
            </Link>
            <Link
              href="/privacy-policy"
              className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors py-1"
            >
              <Shield className="w-4 h-4 text-emerald-600" />
              Privacy Policy
            </Link>
            <Link
              href="/contact-us"
              className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors py-1"
            >
              <Mail className="w-4 h-4 text-emerald-600" />
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center gap-1.5 text-emerald-700 font-medium text-xs">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
            <span>for Muslims Worldwide</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-6 pt-4 border-t border-emerald-50 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} WaqtNama. All rights reserved.</p>
      </div>
    </footer>
  );
};

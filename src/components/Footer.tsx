import React from 'react';
import Link from 'next/link';
import { Compass, Heart, Mail, Shield, Info, Calculator, Moon, Navigation, FileText } from 'lucide-react';

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
              href="/12-rabi-ul-awwal-2026-date-pakistan"
              className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors py-1 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-100/60"
            >
              <Moon className="w-3.5 h-3.5 text-emerald-600" />
              12 Rabi ul Awwal 2026
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
              href="/terms-and-conditions"
              className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors py-1"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              Terms & Conditions
            </Link>
            <Link
              href="/contact-us"
              className="flex items-center gap-1.5 hover:text-emerald-700 transition-colors py-1"
            >
              <Mail className="w-4 h-4 text-emerald-600" />
              Contact Us
            </Link>
            <a
              href="https://wa.me/923446110659"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-medium transition-colors py-1"
            >
              <svg className="w-4 h-4 fill-emerald-600" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.758.459 3.474 1.33 4.982L2 22l5.133-1.343a9.96 9.96 0 004.877 1.272h.004c5.505 0 9.989-4.478 9.99-9.985.001-2.667-1.034-5.174-2.921-7.06A9.916 9.916 0 0012.012 2zm5.836 14.341c-.244.686-1.42 1.309-1.959 1.393-.502.078-1.156.111-1.852-.112-.423-.136-.967-.312-1.666-.615-2.946-1.274-4.863-4.254-5.011-4.45-.147-.197-1.202-1.599-1.202-3.05 0-1.45.76-2.164 1.032-2.457.272-.294.598-.367.797-.367.199 0 .399.002.571.01.183.008.43-.069.673.513.244.582.83 2.025.903 2.172.073.147.122.318.024.515-.098.197-.147.318-.293.49-.147.172-.309.385-.441.517-.147.147-.301.307-.129.602.172.295.764 1.262 1.637 2.04 1.122.999 2.068 1.309 2.363 1.456.295.147.467.123.639-.073.172-.197.737-.858.934-1.152.197-.294.393-.245.663-.147.27.098 1.719.81 2.013.957.294.147.49.22.564.343.073.123.073.71-.171 1.396z"/>
              </svg>
              <span>WhatsApp: +92 344 6110659</span>
            </a>
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

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Language, translations } from '@/lib/translations';
import {
  calculateQiblaBearing,
  calculateDistanceToKaaba,
  getCardinalDirection,
} from '@/lib/qibla';
import {
  Compass,
  Navigation,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
} from 'lucide-react';

interface QiblaCompassProps {
  language: Language;
}

export const QiblaCompass: React.FC<QiblaCompassProps> = ({ language }) => {
  const t = translations[language].qibla;

  const [qiblaBearing, setQiblaBearing] = useState<number | null>(null);
  const [distanceToKaaba, setDistanceToKaaba] = useState<number | null>(null);

  // Device orientation / heading from compass sensor
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [hasCompassSensor, setHasCompassSensor] = useState<boolean>(false);
  const [sensorActive, setSensorActive] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle Device Orientation events
  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    let heading: number | null = null;

    // iOS WebkitCompassHeading
    if ('webkitCompassHeading' in event && typeof (event as unknown as { webkitCompassHeading: number }).webkitCompassHeading === 'number') {
      heading = (event as unknown as { webkitCompassHeading: number }).webkitCompassHeading;
    } else if (event.alpha !== null && event.alpha !== undefined) {
      // Standard DeviceOrientation: alpha is angle around Z axis (0 to 360deg)
      heading = (360 - event.alpha) % 360;
    }

    if (heading !== null && !isNaN(heading)) {
      setDeviceHeading(Math.round(heading * 10) / 10);
      setHasCompassSensor(true);
    }
  }, []);

  // Request permission and start listening to device orientation
  const startOrientationListener = useCallback(async () => {
    if (typeof window === 'undefined') return;

    // Check iOS permission requirement
    const DeviceOrientationEventTyped = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };

    if (typeof DeviceOrientationEventTyped.requestPermission === 'function') {
      try {
        const response = await DeviceOrientationEventTyped.requestPermission();
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true);
          setSensorActive(true);
        } else {
          setHasCompassSensor(false);
        }
      } catch (err) {
        console.error('Orientation permission error:', err);
        setHasCompassSensor(false);
      }
    } else if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation, true);
      setSensorActive(true);
    } else {
      setHasCompassSensor(false);
    }
  }, [handleOrientation]);

  // Cleanup orientation listener on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, [handleOrientation]);

  // Function triggered by "Find Qibla" button
  const handleFindQibla = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError(translations[language].locationError);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const bearing = calculateQiblaBearing(lat, lng);
        const dist = calculateDistanceToKaaba(lat, lng);

        setQiblaBearing(bearing);
        setDistanceToKaaba(dist);
        setLoading(false);

        // Start magnetic sensor if available
        startOrientationListener();
      },
      (err) => {
        console.error('Geolocation error in Qibla compass:', err);
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError(t.permissionDenied);
        } else {
          setError(translations[language].locationError);
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  // Rotation calculations for compass display
  // Compass Dial rotates opposite to device heading (-deviceHeading) so North stays at top
  const compassDialRotation = deviceHeading !== null ? -deviceHeading : 0;
  // Qibla Arrow rotates towards qiblaBearing relative to North (or relative to current device heading if compass active)
  const qiblaArrowRotation =
    qiblaBearing !== null
      ? deviceHeading !== null
        ? qiblaBearing - deviceHeading
        : qiblaBearing
      : 0;

  // Check if user is facing Qibla (within +- 5 degrees)
  const isFacingQibla =
    qiblaBearing !== null &&
    deviceHeading !== null &&
    Math.abs(((qiblaBearing - deviceHeading + 540) % 360) - 180) <= 5;

  return (
    <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 my-8">
      {/* Header Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-sm">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t.title}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{t.subtitle}</p>
          </div>
        </div>

        {/* Find Qibla Action Button */}
        <button
          onClick={handleFindQibla}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-emerald-200 disabled:opacity-70 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{t.locating}</span>
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4" />
              <span>{t.findBtn}</span>
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Facing Qibla Toast Banner */}
      {isFacingQibla && (
        <div className="mb-6 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-center justify-center gap-2 font-bold text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span>{t.facingQibla}</span>
        </div>
      )}

      {/* Main Compass UI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left / Top: Interactive Visual Compass */}
        <div className="flex flex-col items-center justify-center relative py-4">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Outer Decorative Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-emerald-100 bg-gradient-to-b from-emerald-50/50 to-white shadow-inner flex items-center justify-center" />

            {/* Rotating Compass Dial (Cardinal points: N, E, S, W) */}
            <div
              className="absolute inset-2 rounded-full transition-transform duration-300 ease-out flex items-center justify-center"
              style={{ transform: `rotate(${compassDialRotation}deg)` }}
            >
              {/* Compass Ticks & Labels */}
              <div className="absolute top-3 text-emerald-800 font-bold text-base tracking-wider">N</div>
              <div className="absolute right-4 text-emerald-600 font-bold text-base tracking-wider">E</div>
              <div className="absolute bottom-3 text-emerald-600 font-bold text-base tracking-wider">S</div>
              <div className="absolute left-4 text-emerald-600 font-bold text-base tracking-wider">W</div>

              {/* Degrees mark ticks around dial */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-full h-full flex justify-center py-1"
                  style={{ transform: `rotate(${deg}deg)` }}
                >
                  <div
                    className={`w-0.5 ${
                      deg % 90 === 0 ? 'h-3 bg-emerald-600' : 'h-1.5 bg-emerald-300'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Qibla Direction Pointer (Arrow pointing towards Kaaba) */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out z-10 pointer-events-none"
              style={{ transform: `rotate(${qiblaArrowRotation}deg)` }}
            >
              {/* Top Qibla Needle (Gold / Emerald Indicator) */}
              <div className="relative flex flex-col items-center -translate-y-16">
                {/* Kaaba Icon / Badge at arrow tip */}
                <div className="w-9 h-9 bg-emerald-700 text-amber-300 rounded-full border-2 border-amber-400 shadow-lg flex items-center justify-center font-bold text-xs">
                  🕋
                </div>
                {/* Arrow Head */}
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-emerald-700 -mt-1" />
                {/* Needle Shaft */}
                <div className="w-1.5 h-12 bg-gradient-to-b from-emerald-700 to-emerald-500 rounded-full" />
              </div>
            </div>

            {/* Center Pivot Pin */}
            <div className="absolute w-6 h-6 rounded-full bg-emerald-800 border-2 border-amber-300 shadow-md z-20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-amber-300" />
            </div>
          </div>

          {/* Magnetic Heading Readout below compass */}
          {deviceHeading !== null && (
            <div className="mt-3 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {t.heading}: {deviceHeading}° ({getCardinalDirection(deviceHeading, language)})
            </div>
          )}
        </div>

        {/* Right / Bottom: Qibla Details & Stats */}
        <div className="space-y-4">
          {/* Angle / Bearing Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{t.qiblaBearing}</p>
                <p className="text-xl font-extrabold text-gray-900">
                  {qiblaBearing !== null ? `${qiblaBearing}°` : '---'}
                </p>
              </div>
            </div>
            {qiblaBearing !== null && (
              <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
                {getCardinalDirection(qiblaBearing, language)}
              </span>
            )}
          </div>

          {/* Distance to Makkah Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{t.distanceToKaaba}</p>
                <p className="text-xl font-extrabold text-gray-900">
                  {distanceToKaaba !== null
                    ? `${distanceToKaaba.toLocaleString()} ${t.km}`
                    : '---'}
                </p>
              </div>
            </div>
          </div>

          {/* Instruction & Sensor Status Notice */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-emerald-800">
              <Info className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{t.deviceCalibrationTip}</span>
            </div>
            {qiblaBearing !== null && !hasCompassSensor && sensorActive && (
              <p className="text-gray-600 leading-relaxed pt-1">
                {t.compassSensorUnavailable}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

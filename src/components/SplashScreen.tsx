import React, { useEffect, useState } from 'react';

const APP_ICON_SRC = '/src/assets/images/windows11_mobile_icon_1795565335877.jpg';
const SESSION_KEY = 'dominawin11_splash_seen';

export const SplashScreen: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) !== '1';
    } catch {
      return false;
    }
  });
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const fadeTimer = window.setTimeout(() => setFading(true), prefersReduced ? 600 : 1400);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // Ignore storage restrictions
      }
    }, prefersReduced ? 800 : 1850);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [visible]);

  const dismiss = () => {
    setFading(true);
    window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // Ignore storage restrictions
      }
    }, 180);
  };

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      role="presentation"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#041E5C] via-[#021338] to-[#010B22] text-white px-6 transition-opacity duration-400 cursor-pointer ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-5 max-w-xs">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[26%] overflow-hidden shadow-2xl shadow-sky-500/25 ring-1 ring-white/20">
          <img
            src={APP_ICON_SRC}
            alt="Icono oficial de presentación DominaWin 11"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-1.5">
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            DominaWin 11
          </h1>
          <p className="text-sm text-sky-200/85">
            Aprende Windows 11 paso a paso
          </p>
        </div>

        <div className="w-36 h-1 rounded-full bg-white/15 overflow-hidden">
          <div className="h-full w-2/3 bg-sky-400 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

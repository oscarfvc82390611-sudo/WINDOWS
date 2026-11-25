import React, { useState } from 'react';
import { Download, Share, Smartphone, WifiOff, X } from 'lucide-react';
import { useOnlineStatus, usePWAInstall } from '../hooks/usePWAInstall';

const ICON_PREVIEW_SRC = '/src/assets/images/windows11_mobile_icon_1795565335877.jpg';

export const PWAInstallCard: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);

  if (isInstalled) {
    return null;
  }

  return (
    <>
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* App Icon Preview styled like a mobile home screen squircle */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <img
              src={ICON_PREVIEW_SRC}
              alt="Icono de Windows 11 para pantalla de inicio móvil"
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-[22%] shadow-md border border-slate-200/70 dark:border-slate-700 object-cover"
            />
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
              DominaWin 11
            </span>
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Instala DominaWin 11 en tu celular
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Al instalarla aparecerá con este icono de Windows 11 en la pantalla del teléfono, con presentación a pantalla completa y modo sin conexión.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          {isInstallable ? (
            <button
              type="button"
              onClick={install}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0067C0] text-white text-xs font-semibold hover:bg-[#0056A3] active:scale-[0.98] transition-all min-h-[44px] whitespace-nowrap"
            >
              <Download className="w-4 h-4 shrink-0" />
              Instalar app
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowGuideModal(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0067C0] text-white text-xs font-semibold hover:bg-[#0056A3] active:scale-[0.98] transition-all min-h-[44px] whitespace-nowrap"
            >
              <Smartphone className="w-4 h-4 shrink-0" />
              {isIOS ? 'Cómo instalar en iPhone' : 'Cómo instalar en celular'}
            </button>
          )}
        </div>
      </div>

      {showGuideModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-guide-title"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={ICON_PREVIEW_SRC}
                  alt="Icono móvil Windows 11 DominaWin 11"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-[22%] shadow-sm border border-slate-200 dark:border-slate-700 shrink-0"
                />
                <div>
                  <h3 id="pwa-guide-title" className="text-base font-bold text-slate-900 dark:text-white">
                    Instalar DominaWin 11
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Así se verá el icono de Windows 11 en el celular
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                aria-label="Cerrar guía"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="rounded-xl bg-[#F4F7FB] dark:bg-slate-800/70 p-4 space-y-1.5">
                <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#0067C0] dark:text-sky-400" />
                  En Android (Google Chrome o Edge)
                </p>
                <ol className="list-decimal list-inside text-xs space-y-1 leading-relaxed">
                  <li>Abre el enlace compartido de la app en Chrome.</li>
                  <li>Toca el menú de los tres puntos (⋮) arriba a la derecha.</li>
                  <li>Selecciona <strong>"Instalar aplicación"</strong> o <strong>"Agregar a la pantalla principal"</strong>.</li>
                </ol>
              </div>

              <div className="rounded-xl bg-[#F4F7FB] dark:bg-slate-800/70 p-4 space-y-1.5">
                <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Share className="w-4 h-4 text-[#0067C0] dark:text-sky-400" />
                  En iPhone o iPad (Safari)
                </p>
                <ol className="list-decimal list-inside text-xs space-y-1 leading-relaxed">
                  <li>Abre el enlace en el navegador <strong>Safari</strong>.</li>
                  <li>Toca el botón <strong>Compartir</strong> en la barra inferior.</li>
                  <li>Baja y toca <strong>"Agregar a inicio"</strong> y luego <strong>Agregar</strong>.</li>
                </ol>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="w-full py-3 rounded-xl bg-[#0067C0] text-white text-sm font-semibold hover:bg-[#0056A3] min-h-[44px]"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-20 lg:bottom-5 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-lg"
    >
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>Sin conexión — Estás usando el modo offline</span>
    </div>
  );
};

import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  BatteryMedium,
  CheckCircle2,
  CloudSun,
  Compass,
  Folder,
  Layers,
  Power,
  Search,
  Trash2,
  Trophy,
  Volume2,
  Wifi,
} from 'lucide-react';
import { DESKTOP_HOTSPOTS } from '../data/anatomy';

interface WindowsDesktopInspectorProps {
  inspectedIds: string[];
  onInspect: (hotspotId: string) => void;
  onChallengeComplete: () => void;
  challengeCompleted: boolean;
}

const WALLPAPER_SRC = '/src/assets/images/win11_bloom_wallpaper_1795558532423.jpg';

export const WindowsDesktopInspector: React.FC<WindowsDesktopInspectorProps> = ({
  inspectedIds,
  onInspect,
  onChallengeComplete,
  challengeCompleted,
}) => {
  const [mode, setMode] = useState<'explore' | 'challenge'>('explore');
  const [selectedId, setSelectedId] = useState<string>(DESKTOP_HOTSPOTS[0].id);
  const [showStartPreview, setShowStartPreview] = useState(false);
  const [imgError, setImgError] = useState(false);

  const challengeOrder = useMemo(() => DESKTOP_HOTSPOTS, []);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [challengeFeedback, setChallengeFeedback] = useState<{
    type: 'correct' | 'wrong';
    message: string;
  } | null>(null);
  const [challengeFinished, setChallengeFinished] = useState(false);

  const selectedHotspot = DESKTOP_HOTSPOTS.find((h) => h.id === selectedId) ?? DESKTOP_HOTSPOTS[0];
  const currentTarget = challengeOrder[challengeIdx];

  const handleSelectZone = (zoneId: string) => {
    if (zoneId === 'desk-start' && mode === 'explore') {
      setShowStartPreview((prev) => !prev);
    } else if (mode === 'explore') {
      setShowStartPreview(false);
    }

    if (mode === 'explore') {
      setSelectedId(zoneId);
      onInspect(zoneId);
      return;
    }

    if (challengeFinished) return;

    if (zoneId === currentTarget.id) {
      setChallengeFeedback({
        type: 'correct',
        message: `Correcto: encontraste "${currentTarget.name}".`,
      });
      onInspect(zoneId);
      window.setTimeout(() => {
        if (challengeIdx + 1 < challengeOrder.length) {
          setChallengeIdx((prev) => prev + 1);
          setChallengeFeedback(null);
        } else {
          setChallengeFinished(true);
          onChallengeComplete();
        }
      }, 850);
    } else {
      const clicked = DESKTOP_HOTSPOTS.find((h) => h.id === zoneId);
      setChallengeFeedback({
        type: 'wrong',
        message: `Tocaste "${clicked?.shortName ?? 'otra parte'}". Busca: ${currentTarget.shortName}.`,
      });
    }
  };

  const renderBadge = (num: number, zoneId: string) => {
    if (mode === 'challenge') return null;
    const active = selectedId === zoneId;
    const done = inspectedIds.includes(zoneId);
    return (
      <span
        className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold font-mono tabular-nums shadow-sm ${
          active
            ? 'bg-[#0067C0] text-white ring-2 ring-white'
            : done
            ? 'bg-emerald-600 text-white'
            : 'bg-slate-900/90 text-white'
        }`}
      >
        {num}
      </span>
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Mapa Interactivo del Escritorio de Windows 11
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5 tabular-nums">
            9 elementos principales · {inspectedIds.length} de {DESKTOP_HOTSPOTS.length} explorados
            {challengeCompleted ? ' · Reto superado' : ''}
          </p>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 self-start">
          <button
            type="button"
            onClick={() => setMode('explore')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[40px] ${
              mode === 'explore'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Explorar escritorio
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('challenge');
              setShowStartPreview(false);
              if (challengeFinished) {
                setChallengeIdx(0);
                setChallengeFinished(false);
                setChallengeFeedback(null);
              }
            }}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[40px] ${
              mode === 'challenge'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Reto táctil ({challengeIdx + 1}/{challengeOrder.length})
          </button>
        </div>
      </div>

      {mode === 'challenge' && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
          {challengeFinished ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Reto del Escritorio completado
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Reconoces todas las partes del Escritorio y la Barra de Tareas de Windows 11.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setChallengeIdx(0);
                  setChallengeFinished(false);
                  setChallengeFeedback(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#0067C0] text-white text-xs font-semibold min-h-[40px]"
              >
                Repetir reto
              </button>
            </div>
          ) : (
            <div className="space-y-1.5">
              <p className="text-base font-semibold text-slate-900 dark:text-white">
                Toca en el escritorio: <span className="text-[#0067C0] dark:text-sky-400">{currentTarget.name}</span>
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">{currentTarget.description}</p>
              {challengeFeedback && (
                <div
                  className={`flex items-center gap-2 text-xs font-medium pt-1 ${
                    challengeFeedback.type === 'correct'
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-amber-700 dark:text-amber-400'
                  }`}
                >
                  {challengeFeedback.type === 'correct' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{challengeFeedback.message}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Simulated Windows 11 Screen */}
        <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-900">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full flex flex-col justify-between overflow-hidden select-none">
            {/* Background Wallpaper */}
            {!imgError ? (
              <img
                src={WALLPAPER_SRC}
                alt="Fondo de pantalla estilo Windows 11"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-blue-400 to-indigo-700" />
            )}

            {/* Wallpaper clickable layer (1) */}
            <button
              type="button"
              onClick={() => handleSelectZone('desk-wallpaper')}
              aria-label="Fondo de pantalla del escritorio"
              className="absolute inset-0 w-full h-full z-0"
            />

            {/* Top Desktop Area */}
            <div className="relative z-10 p-3 sm:p-4 flex items-start justify-between pointer-events-none">
              {/* Left Desktop Icons Column */}
              <div className="flex flex-col gap-3 pointer-events-auto">
                {/* 2. Recycle Bin */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectZone('desk-recycle');
                  }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl bg-white/75 backdrop-blur-sm text-slate-900 transition-transform hover:scale-105 min-w-[74px] ${
                    selectedId === 'desk-recycle' && mode === 'explore'
                      ? 'ring-2 ring-[#0067C0]'
                      : ''
                  }`}
                >
                  <div className="relative">
                    <Trash2 className="w-6 h-6 text-slate-700" />
                    <span className="absolute -top-2 -right-3">{renderBadge(2, 'desk-recycle')}</span>
                  </div>
                  <span className="text-[10px] font-semibold leading-tight text-center">Papelera</span>
                </button>

                {/* 3. Desktop Folder Icon */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectZone('desk-icons');
                  }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl bg-white/75 backdrop-blur-sm text-slate-900 transition-transform hover:scale-105 min-w-[74px] ${
                    selectedId === 'desk-icons' && mode === 'explore'
                      ? 'ring-2 ring-[#0067C0]'
                      : ''
                  }`}
                >
                  <div className="relative">
                    <Folder className="w-6 h-6 text-amber-500 fill-amber-400/50" />
                    <span className="absolute -top-2 -right-3">{renderBadge(3, 'desk-icons')}</span>
                  </div>
                  <span className="text-[10px] font-semibold leading-tight text-center">Mis Estudios</span>
                </button>
              </div>

              {/* 1. Wallpaper badge indicator */}
              <div className="pointer-events-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectZone('desk-wallpaper');
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/80 backdrop-blur-sm text-xs font-semibold text-slate-800 shadow-xs"
                >
                  {renderBadge(1, 'desk-wallpaper')}
                  <span>Escritorio</span>
                </button>
              </div>
            </div>

            {/* Optional Start Menu Mini Preview when user clicks Start in explore mode */}
            {showStartPreview && mode === 'explore' && (
              <div className="relative z-20 mx-auto mb-2 w-[260px] sm:w-[300px] rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-3.5 shadow-xl text-left">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  <span>Menú Inicio · Anclados</span>
                  <span className="text-[#0067C0] dark:text-sky-400">Todas &gt;</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {['Explorador', 'Configuración', 'Notas'].map((app) => (
                    <div
                      key={app}
                      className="rounded-lg bg-slate-100 dark:bg-slate-800 p-2 text-center text-[10px] font-medium text-slate-700 dark:text-slate-200"
                    >
                      {app}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                  <span>Estudiante</span>
                  <span className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-200">
                    <Power className="w-3.5 h-3.5" /> Apagar
                  </span>
                </div>
              </div>
            )}

            {/* Windows 11 Taskbar */}
            <div className="relative z-20 bg-white/90 dark:bg-slate-900/92 backdrop-blur-md border-t border-white/60 dark:border-slate-700/80 px-2 sm:px-3 py-1.5 flex items-center justify-between gap-1">
              {/* 4. Widgets (Left) */}
              <button
                type="button"
                onClick={() => handleSelectZone('desk-widgets')}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-slate-800 dark:text-slate-100 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-all min-h-[40px] ${
                  selectedId === 'desk-widgets' && mode === 'explore' ? 'ring-2 ring-[#0067C0]' : ''
                }`}
              >
                {renderBadge(4, 'desk-widgets')}
                <CloudSun className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-[11px] font-semibold hidden sm:inline tabular-nums">22°C</span>
              </button>

              {/* Center Taskbar Icons: 5 Start, 6 Search, 7 Task View, 8 Pinned */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {/* 5. Start Button */}
                <button
                  type="button"
                  onClick={() => handleSelectZone('desk-start')}
                  aria-label="Botón Inicio"
                  className={`relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-all ${
                    selectedId === 'desk-start' && mode === 'explore' ? 'ring-2 ring-[#0067C0]' : ''
                  }`}
                >
                  <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                    <span className="bg-[#0078D4] rounded-[1px]" />
                    <span className="bg-[#0078D4] rounded-[1px]" />
                    <span className="bg-[#0067C0] rounded-[1px]" />
                    <span className="bg-[#0067C0] rounded-[1px]" />
                  </div>
                  <span className="absolute -top-2 -right-1">{renderBadge(5, 'desk-start')}</span>
                </button>

                {/* 6. Search */}
                <button
                  type="button"
                  onClick={() => handleSelectZone('desk-search')}
                  className={`relative flex items-center gap-1.5 px-2.5 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs transition-all ${
                    selectedId === 'desk-search' && mode === 'explore' ? 'ring-2 ring-[#0067C0]' : ''
                  }`}
                >
                  <Search className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden md:inline text-[11px]">Buscar</span>
                  <span className="absolute -top-2 -right-1">{renderBadge(6, 'desk-search')}</span>
                </button>

                {/* 7. Task View */}
                <button
                  type="button"
                  onClick={() => handleSelectZone('desk-taskview')}
                  aria-label="Vista de tareas"
                  className={`relative flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-all ${
                    selectedId === 'desk-taskview' && mode === 'explore' ? 'ring-2 ring-[#0067C0]' : ''
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span className="absolute -top-2 -right-1">{renderBadge(7, 'desk-taskview')}</span>
                </button>

                {/* 8. Pinned Apps */}
                <button
                  type="button"
                  onClick={() => handleSelectZone('desk-pinned')}
                  aria-label="Aplicaciones ancladas"
                  className={`relative flex items-center gap-2 px-2.5 h-10 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-all ${
                    selectedId === 'desk-pinned' && mode === 'explore' ? 'ring-2 ring-[#0067C0]' : ''
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <Folder className="w-4 h-4 text-amber-500 fill-amber-400/50" />
                    <span className="w-3 h-0.5 rounded-full bg-[#0067C0] mt-0.5" />
                  </div>
                  <Compass className="w-4 h-4 text-[#0078D4] hidden xs:inline" />
                  <span className="absolute -top-2 -right-1">{renderBadge(8, 'desk-pinned')}</span>
                </button>
              </div>

              {/* 9. System Tray & Clock */}
              <button
                type="button"
                onClick={() => handleSelectZone('desk-tray')}
                className={`relative flex items-center gap-1.5 px-2 py-1 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-all min-h-[40px] ${
                  selectedId === 'desk-tray' && mode === 'explore' ? 'ring-2 ring-[#0067C0]' : ''
                }`}
              >
                <Wifi className="w-3.5 h-3.5" />
                <Volume2 className="w-3.5 h-3.5 hidden sm:inline" />
                <BatteryMedium className="w-3.5 h-3.5 hidden sm:inline" />
                <div className="text-right leading-tight text-[10px] font-mono tabular-nums pl-1">
                  <div className="font-semibold">14:15</div>
                  <div className="text-slate-500 dark:text-slate-400 hidden sm:block">24/11/2026</div>
                </div>
                <span className="absolute -top-2 -left-1">{renderBadge(9, 'desk-tray')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Detail Panel */}
        <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="tabular-nums">
              Elemento {selectedHotspot.number} de {DESKTOP_HOTSPOTS.length} · {selectedHotspot.category}
            </span>
            {inspectedIds.includes(selectedHotspot.id) && (
              <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Revisado
              </span>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {selectedHotspot.number}. {selectedHotspot.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
              {selectedHotspot.description}
            </p>
          </div>

          <div className="rounded-xl bg-[#F4F7FB] dark:bg-slate-800/70 p-3.5 space-y-1">
            <p className="text-xs font-semibold text-[#0067C0] dark:text-sky-400">Consejo práctico</p>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedHotspot.beginnerTip}
            </p>
          </div>

          {selectedHotspot.shortcut && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400">Atajo de teclado</span>
              <kbd className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
                {selectedHotspot.shortcut}
              </kbd>
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-5 gap-1.5">
              {DESKTOP_HOTSPOTS.map((h) => {
                const active = selectedId === h.id && mode === 'explore';
                const done = inspectedIds.includes(h.id);
                return (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => {
                      setMode('explore');
                      setSelectedId(h.id);
                      onInspect(h.id);
                    }}
                    className={`min-h-[40px] rounded-lg text-xs font-mono font-semibold tabular-nums transition-colors ${
                      active
                        ? 'bg-[#0067C0] text-white'
                        : done
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {h.number}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

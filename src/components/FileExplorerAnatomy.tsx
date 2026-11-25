import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Copy,
  FileText,
  Folder,
  HardDrive,
  Home,
  Image as ImageIcon,
  LayoutGrid,
  List,
  Minus,
  MoreHorizontal,
  Pencil,
  Plus,
  RotateCw,
  Scissors,
  Search,
  Share2,
  Square,
  Trash2,
  Trophy,
  X,
  AlertCircle,
  Download,
  Monitor,
  Clock,
} from 'lucide-react';
import { EXPLORER_HOTSPOTS } from '../data/anatomy';

interface FileExplorerAnatomyProps {
  inspectedIds: string[];
  onInspect: (hotspotId: string) => void;
  onChallengeComplete: () => void;
  challengeCompleted: boolean;
}

export const FileExplorerAnatomy: React.FC<FileExplorerAnatomyProps> = ({
  inspectedIds,
  onInspect,
  onChallengeComplete,
  challengeCompleted,
}) => {
  const [mode, setMode] = useState<'explore' | 'challenge'>('explore');
  const [selectedId, setSelectedId] = useState<string>(EXPLORER_HOTSPOTS[0].id);

  // Challenge state
  const challengeOrder = useMemo(() => EXPLORER_HOTSPOTS, []);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challengeFeedback, setChallengeFeedback] = useState<{
    type: 'correct' | 'wrong';
    message: string;
  } | null>(null);
  const [challengeFinished, setChallengeFinished] = useState(false);

  const selectedHotspot =
    EXPLORER_HOTSPOTS.find((h) => h.id === selectedId) ?? EXPLORER_HOTSPOTS[0];
  const currentTarget = challengeOrder[challengeIndex];

  const handleSelectZone = (zoneId: string) => {
    if (mode === 'explore') {
      setSelectedId(zoneId);
      onInspect(zoneId);
      return;
    }

    if (challengeFinished) return;

    if (zoneId === currentTarget.id) {
      setChallengeFeedback({
        type: 'correct',
        message: `Correcto: identificaste "${currentTarget.name}".`,
      });
      onInspect(zoneId);

      window.setTimeout(() => {
        if (challengeIndex + 1 < challengeOrder.length) {
          setChallengeIndex((prev) => prev + 1);
          setChallengeFeedback(null);
        } else {
          setChallengeFinished(true);
          onChallengeComplete();
        }
      }, 900);
    } else {
      const clicked = EXPLORER_HOTSPOTS.find((h) => h.id === zoneId);
      setChallengeFeedback({
        type: 'wrong',
        message: `Esa zona es "${clicked?.shortName ?? 'otra parte'}". Intenta tocar: ${currentTarget.shortName}.`,
      });
    }
  };

  const resetChallenge = () => {
    setChallengeIndex(0);
    setChallengeFeedback(null);
    setChallengeFinished(false);
  };

  const getZoneRing = (zoneId: string) => {
    const isActive = mode === 'explore' && selectedId === zoneId;
    const isInspected = inspectedIds.includes(zoneId);
    if (isActive) {
      return 'ring-2 ring-[#0067C0] dark:ring-sky-400 bg-[#EBF4FC]/90 dark:bg-sky-950/60';
    }
    if (mode === 'challenge') {
      return 'hover:ring-2 hover:ring-[#0067C0]/70 dark:hover:ring-sky-400/70 cursor-pointer';
    }
    return isInspected
      ? 'hover:ring-2 hover:ring-[#0067C0]/60 cursor-pointer'
      : 'hover:ring-2 hover:ring-amber-500/70 cursor-pointer';
  };

  const renderNumberBadge = (num: number, zoneId: string) => {
    if (mode === 'challenge') return null;
    const active = selectedId === zoneId;
    const inspected = inspectedIds.includes(zoneId);
    return (
      <span
        className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold font-mono tabular-nums shrink-0 transition-colors ${
          active
            ? 'bg-[#0067C0] text-white'
            : inspected
            ? 'bg-emerald-600 text-white'
            : 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
        }`}
      >
        {num}
      </span>
    );
  };

  return (
    <div className="space-y-5">
      {/* Header + Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Partes de la ventana del Explorador de archivos
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5 tabular-nums">
            10 zonas interactivas · {inspectedIds.length} de {EXPLORER_HOTSPOTS.length} exploradas
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
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Explorar partes
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('challenge');
              if (challengeFinished) resetChallenge();
            }}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[40px] ${
              mode === 'challenge'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Reto táctil ({challengeIndex + 1}/{challengeOrder.length})
          </button>
        </div>
      </div>

      {/* Challenge Prompt Banner */}
      {mode === 'challenge' && (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
          {challengeFinished ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Reto del Explorador completado
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Identificaste correctamente las 10 partes de la ventana del Explorador de archivos de Windows 11.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={resetChallenge}
                className="px-4 py-2.5 rounded-xl bg-[#0067C0] text-white text-sm font-semibold hover:bg-[#0056A3] transition-colors whitespace-nowrap min-h-[44px]"
              >
                Practicar de nuevo
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                <span>Pregunta {challengeIndex + 1} de {challengeOrder.length}</span>
                <span>Toca directamente la zona en la ventana</span>
              </div>
              <p className="text-base font-semibold text-slate-900 dark:text-white">
                Toca en la ventana: <span className="text-[#0067C0] dark:text-sky-400">{currentTarget.name}</span>
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Pista: {currentTarget.description}
              </p>
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

      {/* Main Split Stage: Simulated Windows 11 File Explorer + Inspector Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Interactive Windows 11 File Explorer Window */}
        <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Row 1: Tabs (1) + Window Controls (2) */}
          <div className="flex items-center justify-between bg-[#E9EEF5] dark:bg-slate-950 px-2 pt-2 gap-2 border-b border-slate-200/80 dark:border-slate-800">
            <button
              type="button"
              onClick={() => handleSelectZone('exp-tabs')}
              className={`flex items-center gap-2 px-3 py-2 rounded-t-xl bg-white dark:bg-slate-900 text-left transition-all min-h-[40px] ${getZoneRing(
                'exp-tabs'
              )}`}
            >
              {renderNumberBadge(1, 'exp-tabs')}
              <Folder className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                Estudios
              </span>
              <X className="w-3.5 h-3.5 text-slate-400 ml-1" />
              <span className="w-px h-3.5 bg-slate-200 dark:bg-slate-700 mx-1" />
              <Plus className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            </button>

            <button
              type="button"
              onClick={() => handleSelectZone('exp-controls')}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all min-h-[40px] ${getZoneRing(
                'exp-controls'
              )}`}
              aria-label="Botones de control de ventana"
            >
              {renderNumberBadge(2, 'exp-controls')}
              <span className="p-1 text-slate-600 dark:text-slate-300">
                <Minus className="w-3.5 h-3.5" />
              </span>
              <span className="p-1 text-slate-600 dark:text-slate-300">
                <Square className="w-3 h-3" />
              </span>
              <span className="p-1 text-slate-700 dark:text-slate-200">
                <X className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* Row 2: Navigation (3) + Address Bar (4) + Search Box (5) */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 p-2.5 bg-[#F7F9FC] dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => handleSelectZone('exp-nav-buttons')}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all min-h-[40px] shrink-0 ${getZoneRing(
                'exp-nav-buttons'
              )}`}
            >
              {renderNumberBadge(3, 'exp-nav-buttons')}
              <ArrowLeft className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <ArrowUp className="w-3.5 h-3.5 text-slate-700 dark:text-slate-200" />
              <RotateCw className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            </button>

            <button
              type="button"
              onClick={() => handleSelectZone('exp-address')}
              className={`flex-1 min-w-[160px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 text-left transition-all min-h-[40px] overflow-hidden ${getZoneRing(
                'exp-address'
              )}`}
            >
              {renderNumberBadge(4, 'exp-address')}
              <Monitor className="w-3.5 h-3.5 text-slate-500 shrink-0 hidden sm:inline" />
              <span className="truncate">Este equipo</span>
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">Documentos</span>
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="font-semibold text-slate-900 dark:text-white truncate">Estudios</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectZone('exp-search')}
              className={`w-full sm:w-44 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 text-left transition-all min-h-[40px] shrink-0 ${getZoneRing(
                'exp-search'
              )}`}
            >
              {renderNumberBadge(5, 'exp-search')}
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Buscar en Estudios</span>
            </button>
          </div>

          {/* Row 3: Command Bar (6) */}
          <div className="p-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => handleSelectZone('exp-commandbar')}
              className={`w-full flex flex-wrap items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-xs text-slate-700 dark:text-slate-200 transition-all min-h-[44px] ${getZoneRing(
                'exp-commandbar'
              )}`}
            >
              <div className="flex flex-wrap items-center gap-2.5">
                {renderNumberBadge(6, 'exp-commandbar')}
                <span className="inline-flex items-center gap-1 font-semibold text-[#0067C0] dark:text-sky-400">
                  <Plus className="w-3.5 h-3.5" /> Nuevo
                </span>
                <span className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
                <Scissors className="w-3.5 h-3.5 text-slate-500" />
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <Pencil className="w-3.5 h-3.5 text-slate-500" />
                <Share2 className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
                <Trash2 className="w-3.5 h-3.5 text-slate-500" />
                <span className="w-px h-4 bg-slate-200 dark:bg-slate-700 hidden sm:inline" />
                <span className="hidden sm:inline-flex items-center gap-1 text-slate-600 dark:text-slate-300">
                  Ordenar <ChevronDown className="w-3 h-3" />
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-slate-600 dark:text-slate-300">
                  Ver <ChevronDown className="w-3 h-3" />
                </span>
                <MoreHorizontal className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Detalles
              </span>
            </button>
          </div>

          {/* Row 4: Body — Nav Pane (7) + Content Area (8) + Details Pane (9) */}
          <div className="grid grid-cols-12 min-h-[250px] divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800">
            {/* 7. Left Navigation Pane */}
            <button
              type="button"
              onClick={() => handleSelectZone('exp-navpane')}
              className={`col-span-12 sm:col-span-3 p-3 text-left align-top transition-all flex flex-col gap-1.5 ${getZoneRing(
                'exp-navpane'
              )}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Panel izquierdo
                </span>
                {renderNumberBadge(7, 'exp-navpane')}
              </div>
              {[
                { icon: Home, label: 'Inicio', active: false },
                { icon: Download, label: 'Descargas', active: false },
                { icon: FileText, label: 'Documentos', active: true },
                { icon: ImageIcon, label: 'Imágenes', active: false },
                { icon: HardDrive, label: 'Este equipo', active: false },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2 px-2 py-1 rounded-md text-xs ${
                      item.active
                        ? 'bg-[#EBF4FC] dark:bg-sky-950/60 text-[#0067C0] dark:text-sky-300 font-semibold'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                );
              })}
            </button>

            {/* 8. Content Area */}
            <button
              type="button"
              onClick={() => handleSelectZone('exp-content')}
              className={`col-span-12 sm:col-span-6 p-3 text-left align-top transition-all flex flex-col ${getZoneRing(
                'exp-content'
              )}`}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 text-[11px] font-medium text-slate-500 dark:text-slate-400 w-full">
                <span className="flex items-center gap-1.5">
                  {renderNumberBadge(8, 'exp-content')}
                  Nombre
                </span>
                <span className="hidden xs:inline">Tipo</span>
                <span>Tamaño</span>
              </div>
              <div className="space-y-1.5 w-full">
                <div className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-2 font-medium truncate">
                    <Folder className="w-4 h-4 text-amber-500 fill-amber-400/40 shrink-0" />
                    Matemáticas
                  </span>
                  <span className="text-slate-400 text-[11px] tabular-nums">Carpeta</span>
                </div>
                <div className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-2 font-medium truncate">
                    <Folder className="w-4 h-4 text-amber-500 fill-amber-400/40 shrink-0" />
                    Historia
                  </span>
                  <span className="text-slate-400 text-[11px] tabular-nums">Carpeta</span>
                </div>
                <div className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs bg-[#EBF4FC] dark:bg-sky-950/60 text-slate-900 dark:text-white">
                  <span className="flex items-center gap-2 font-medium truncate">
                    <FileText className="w-4 h-4 text-[#0067C0] dark:text-sky-400 shrink-0" />
                    Resumen_Win11.docx
                  </span>
                  <span className="text-slate-500 dark:text-slate-300 text-[11px] tabular-nums">
                    248 KB
                  </span>
                </div>
              </div>
            </button>

            {/* 9. Details Pane */}
            <button
              type="button"
              onClick={() => handleSelectZone('exp-details')}
              className={`col-span-12 sm:col-span-3 p-3 text-left align-top transition-all flex flex-col gap-2 bg-slate-50/70 dark:bg-slate-950/40 ${getZoneRing(
                'exp-details'
              )}`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Detalles
                </span>
                {renderNumberBadge(9, 'exp-details')}
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#EBF4FC] dark:bg-sky-950/70 text-[#0067C0] dark:text-sky-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 break-words">
                  Resumen_Win11.docx
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                  Tamaño: 248 KB
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 shrink-0" /> Hoy, 14:10
                </p>
              </div>
            </button>
          </div>

          {/* Row 5: Status Bar (10) */}
          <button
            type="button"
            onClick={() => handleSelectZone('exp-statusbar')}
            className={`w-full flex items-center justify-between px-3 py-2 bg-[#F7F9FC] dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 transition-all min-h-[40px] ${getZoneRing(
              'exp-statusbar'
            )}`}
          >
            <span className="flex items-center gap-2 tabular-nums">
              {renderNumberBadge(10, 'exp-statusbar')}
              <span>3 elementos · 1 elemento seleccionado (248 KB)</span>
            </span>
            <span className="flex items-center gap-2 text-slate-500">
              <List className="w-3.5 h-3.5 text-[#0067C0] dark:text-sky-400" />
              <LayoutGrid className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

        {/* Right / Bottom Inspector Explanation Deck */}
        <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="tabular-nums">
              Parte {selectedHotspot.number} de {EXPLORER_HOTSPOTS.length} · {selectedHotspot.category}
            </span>
            {inspectedIds.includes(selectedHotspot.id) && (
              <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Revisada
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
            <p className="text-xs font-semibold text-[#0067C0] dark:text-sky-400">
              Consejo práctico
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedHotspot.beginnerTip}
            </p>
          </div>

          {selectedHotspot.shortcut && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400">Atajo rápido</span>
              <kbd className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
                {selectedHotspot.shortcut}
              </kbd>
            </div>
          )}

          {/* Quick Number Selector for thumb accessibility */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Ir a otra parte numerada:
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {EXPLORER_HOTSPOTS.map((h) => {
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

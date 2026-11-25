import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Folder,
  FileText,
  Trophy,
  X,
} from 'lucide-react';
import { DIALOG_HOTSPOTS } from '../data/anatomy';

interface DialogWindowAnatomyProps {
  inspectedIds: string[];
  onInspect: (hotspotId: string) => void;
  onChallengeComplete: () => void;
  challengeCompleted: boolean;
}

export const DialogWindowAnatomy: React.FC<DialogWindowAnatomyProps> = ({
  inspectedIds,
  onInspect,
  onChallengeComplete,
  challengeCompleted,
}) => {
  const [mode, setMode] = useState<'explore' | 'challenge'>('explore');
  const [selectedId, setSelectedId] = useState<string>(DIALOG_HOTSPOTS[0].id);

  // Interactive simulated dialog state so beginners experience real dialog controls!
  const [activeDialogTab, setActiveDialogTab] = useState<'General' | 'Compartir' | 'Personalizar'>('General');
  const [folderNameInput, setFolderNameInput] = useState('Estudios_2026');
  const [optimizeType, setOptimizeType] = useState('Elementos generales');
  const [attrReadOnly, setAttrReadOnly] = useState(true);
  const [attrHidden, setAttrHidden] = useState(false);
  const [applyScope, setApplyScope] = useState<'folderOnly' | 'withSubfolders'>('withSubfolders');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [dialogStatusMsg, setDialogStatusMsg] = useState<string | null>(null);

  // Challenge state
  const challengeOrder = useMemo(() => DIALOG_HOTSPOTS, []);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challengeFeedback, setChallengeFeedback] = useState<{
    type: 'correct' | 'wrong';
    message: string;
  } | null>(null);
  const [challengeFinished, setChallengeFinished] = useState(false);

  const selectedHotspot = DIALOG_HOTSPOTS.find((h) => h.id === selectedId) ?? DIALOG_HOTSPOTS[0];
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
        message: `Excelente: tocaste "${currentTarget.name}".`,
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
      const clicked = DIALOG_HOTSPOTS.find((h) => h.id === zoneId);
      setChallengeFeedback({
        type: 'wrong',
        message: `Esa zona es "${clicked?.shortName ?? 'otra'}". Busca: ${currentTarget.shortName}.`,
      });
    }
  };

  const getZoneClass = (zoneId: string) => {
    const active = mode === 'explore' && selectedId === zoneId;
    if (active) {
      return 'ring-2 ring-[#0067C0] dark:ring-sky-400 bg-[#EBF4FC]/70 dark:bg-sky-950/50 rounded-xl';
    }
    return 'hover:ring-2 hover:ring-[#0067C0]/50 dark:hover:ring-sky-400/50 rounded-xl cursor-pointer transition-all';
  };

  const renderBadge = (num: number, zoneId: string) => {
    if (mode === 'challenge') return null;
    const active = selectedId === zoneId;
    const inspected = inspectedIds.includes(zoneId);
    return (
      <span
        className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold font-mono tabular-nums shrink-0 ${
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Anatomía de una Ventana de Diálogo
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5 tabular-nums">
            9 controles esenciales · {inspectedIds.length} de {DIALOG_HOTSPOTS.length} explorados
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
            Explorar controles
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('challenge');
              if (challengeFinished) {
                setChallengeIndex(0);
                setChallengeFinished(false);
                setChallengeFeedback(null);
              }
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
                    Reto de Ventana de Diálogo completado
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Ya reconoces todos los controles de un cuadro de diálogo en Windows 11.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setChallengeIndex(0);
                  setChallengeFinished(false);
                  setChallengeFeedback(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#0067C0] text-white text-sm font-semibold hover:bg-[#0056A3] transition-colors whitespace-nowrap min-h-[44px]"
              >
                Repetir reto
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                <span>Control {challengeIndex + 1} de {challengeOrder.length}</span>
                <span>Toca el elemento correcto en el cuadro</span>
              </div>
              <p className="text-base font-semibold text-slate-900 dark:text-white">
                Encuentra: <span className="text-[#0067C0] dark:text-sky-400">{currentTarget.name}</span>
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

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Realistic Windows 11 Dialog Box */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            {/* 1. Title Bar */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleSelectZone('dlg-titlebar')}
              onKeyDown={(e) => e.key === 'Enter' && handleSelectZone('dlg-titlebar')}
              className={`flex items-center justify-between px-4 py-3 bg-[#F3F6FA] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 ${getZoneClass(
                'dlg-titlebar'
              )}`}
            >
              <div className="flex items-center gap-2">
                {renderBadge(1, 'dlg-titlebar')}
                <Folder className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Propiedades de: {folderNameInput || 'Carpeta'}
                </span>
              </div>
              <span className="p-1.5 text-slate-500 dark:text-slate-400">
                <X className="w-4 h-4" />
              </span>
            </div>

            <div className="p-4 space-y-4">
              {/* 2. Tabs */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleSelectZone('dlg-tabs')}
                onKeyDown={(e) => e.key === 'Enter' && handleSelectZone('dlg-tabs')}
                className={`p-1.5 ${getZoneClass('dlg-tabs')}`}
              >
                <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-2">
                  {renderBadge(2, 'dlg-tabs')}
                  {(['General', 'Compartir', 'Personalizar'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDialogTab(tab);
                        handleSelectZone('dlg-tabs');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors min-h-[36px] ${
                        activeDialogTab === tab
                          ? 'bg-[#0067C0] text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Textbox + 3. Info Summary */}
              <div className="space-y-3">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectZone('dlg-textbox')}
                  onKeyDown={(e) => e.key === 'Enter' && handleSelectZone('dlg-textbox')}
                  className={`p-2.5 ${getZoneClass('dlg-textbox')}`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {renderBadge(4, 'dlg-textbox')}
                    <label
                      htmlFor="dlg-folder-input"
                      className="text-xs font-medium text-slate-600 dark:text-slate-300"
                    >
                      Nombre de la carpeta (Cuadro de texto editable)
                    </label>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Folder className="w-7 h-7 text-amber-500 fill-amber-400/40 shrink-0" />
                    <input
                      id="dlg-folder-input"
                      type="text"
                      value={folderNameInput}
                      onFocus={() => handleSelectZone('dlg-textbox')}
                      onChange={(e) => {
                        setFolderNameInput(e.target.value);
                        setHasUnsavedChanges(true);
                        setDialogStatusMsg(null);
                      }}
                      className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0067C0]"
                    />
                  </div>
                </div>

                {/* 3. Read-only metadata */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectZone('dlg-summary')}
                  onKeyDown={(e) => e.key === 'Enter' && handleSelectZone('dlg-summary')}
                  className={`p-3 bg-slate-50/80 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs ${getZoneClass(
                    'dlg-summary'
                  )}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                      {renderBadge(3, 'dlg-summary')}
                      Información general
                    </span>
                    <span className="text-slate-400 font-mono">Solo lectura</span>
                  </div>
                  <div className="grid grid-cols-3 gap-y-1 text-slate-600 dark:text-slate-400 pt-1">
                    <span>Tipo:</span>
                    <span className="col-span-2 text-slate-900 dark:text-slate-200">Carpeta de archivos</span>
                    <span>Ubicación:</span>
                    <span className="col-span-2 font-mono text-[11px] text-slate-900 dark:text-slate-200 break-all">
                      C:\Usuarios\Estudiante\Documentos
                    </span>
                    <span>Contiene:</span>
                    <span className="col-span-2 text-slate-900 dark:text-slate-200 tabular-nums">
                      14 archivos, 3 subcarpetas (4.2 MB)
                    </span>
                  </div>
                </div>

                {/* 5. Dropdown list */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectZone('dlg-dropdown')}
                  onKeyDown={(e) => e.key === 'Enter' && handleSelectZone('dlg-dropdown')}
                  className={`p-2.5 ${getZoneClass('dlg-dropdown')}`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {renderBadge(5, 'dlg-dropdown')}
                    <label
                      htmlFor="dlg-opt-select"
                      className="text-xs font-medium text-slate-600 dark:text-slate-300"
                    >
                      Optimizar esta carpeta para (Lista desplegable):
                    </label>
                  </div>
                  <div className="relative">
                    <select
                      id="dlg-opt-select"
                      value={optimizeType}
                      onFocus={() => handleSelectZone('dlg-dropdown')}
                      onChange={(e) => {
                        setOptimizeType(e.target.value);
                        setHasUnsavedChanges(true);
                        setDialogStatusMsg(null);
                      }}
                      className="w-full appearance-none px-3 py-2.5 pr-9 text-sm rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0067C0]"
                    >
                      <option>Elementos generales</option>
                      <option>Documentos</option>
                      <option>Imágenes</option>
                      <option>Videos</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 6. Checkboxes + 7. Radio Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 6. Checkboxes */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelectZone('dlg-checkboxes')}
                    onKeyDown={(e) => e.key === 'Enter' && handleSelectZone('dlg-checkboxes')}
                    className={`p-3 border border-slate-200 dark:border-slate-800 space-y-2 ${getZoneClass(
                      'dlg-checkboxes'
                    )}`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                      {renderBadge(6, 'dlg-checkboxes')}
                      <span>Atributos (Casillas)</span>
                    </div>
                    <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer min-h-[32px]">
                      <input
                        type="checkbox"
                        checked={attrReadOnly}
                        onChange={(e) => {
                          e.stopPropagation();
                          setAttrReadOnly(e.target.checked);
                          setHasUnsavedChanges(true);
                          setDialogStatusMsg(null);
                          handleSelectZone('dlg-checkboxes');
                        }}
                        className="w-4 h-4 rounded accent-[#0067C0]"
                      />
                      Solo lectura
                    </label>
                    <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer min-h-[32px]">
                      <input
                        type="checkbox"
                        checked={attrHidden}
                        onChange={(e) => {
                          e.stopPropagation();
                          setAttrHidden(e.target.checked);
                          setHasUnsavedChanges(true);
                          setDialogStatusMsg(null);
                          handleSelectZone('dlg-checkboxes');
                        }}
                        className="w-4 h-4 rounded accent-[#0067C0]"
                      />
                      Carpeta oculta
                    </label>
                  </div>

                  {/* 7. Radio buttons */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelectZone('dlg-radios')}
                    onKeyDown={(e) => e.key === 'Enter' && handleSelectZone('dlg-radios')}
                    className={`p-3 border border-slate-200 dark:border-slate-800 space-y-2 ${getZoneClass(
                      'dlg-radios'
                    )}`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                      {renderBadge(7, 'dlg-radios')}
                      <span>Alcance (Opción única)</span>
                    </div>
                    <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer min-h-[32px]">
                      <input
                        type="radio"
                        name="dialog-scope"
                        checked={applyScope === 'folderOnly'}
                        onChange={() => {
                          setApplyScope('folderOnly');
                          setHasUnsavedChanges(true);
                          setDialogStatusMsg(null);
                          handleSelectZone('dlg-radios');
                        }}
                        className="w-4 h-4 accent-[#0067C0]"
                      />
                      Solo a esta carpeta
                    </label>
                    <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer min-h-[32px]">
                      <input
                        type="radio"
                        name="dialog-scope"
                        checked={applyScope === 'withSubfolders'}
                        onChange={() => {
                          setApplyScope('withSubfolders');
                          setHasUnsavedChanges(true);
                          setDialogStatusMsg(null);
                          handleSelectZone('dlg-radios');
                        }}
                        className="w-4 h-4 accent-[#0067C0]"
                      />
                      Carpeta y subcarpetas
                    </label>
                  </div>
                </div>
              </div>

              {dialogStatusMsg && (
                <div className="flex items-center gap-2 text-xs font-medium text-[#0067C0] dark:text-sky-400 bg-[#EBF4FC] dark:bg-sky-950/50 px-3 py-2 rounded-lg">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>{dialogStatusMsg}</span>
                </div>
              )}
            </div>

            {/* Footer Action Buttons: 8. Accept + 9. Cancel & Apply */}
            <div className="flex flex-wrap items-center justify-end gap-2 px-4 py-3 bg-[#F3F6FA] dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
              <div
                className={`p-1 ${getZoneClass('dlg-accept')}`}
                onClick={() => handleSelectZone('dlg-accept')}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectZone('dlg-accept');
                    if (mode === 'explore') {
                      setHasUnsavedChanges(false);
                      setDialogStatusMsg('Pulsaste Aceptar: en Windows real esto guarda todo y cierra el diálogo.');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0067C0] text-white text-xs font-semibold hover:bg-[#0056A3] transition-colors min-h-[40px]"
                >
                  {renderBadge(8, 'dlg-accept')}
                  Aceptar
                </button>
              </div>

              <div
                className={`flex items-center gap-2 p-1 ${getZoneClass('dlg-cancel-apply')}`}
                onClick={() => handleSelectZone('dlg-cancel-apply')}
              >
                {renderBadge(9, 'dlg-cancel-apply')}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectZone('dlg-cancel-apply');
                    if (mode === 'explore') {
                      setFolderNameInput('Estudios_2026');
                      setOptimizeType('Elementos generales');
                      setHasUnsavedChanges(false);
                      setDialogStatusMsg('Pulsaste Cancelar: se descartaron los cambios sin guardar.');
                    }
                  }}
                  className="px-3.5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors min-h-[40px]"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectZone('dlg-cancel-apply');
                    if (mode === 'explore') {
                      setHasUnsavedChanges(false);
                      setDialogStatusMsg(
                        'Pulsaste Aplicar: cambios guardados mientras el diálogo permanece abierto.'
                      );
                    }
                  }}
                  className={`px-3.5 py-2 rounded-lg border text-xs font-medium transition-colors min-h-[40px] ${
                    hasUnsavedChanges
                      ? 'bg-white dark:bg-slate-800 border-[#0067C0] text-[#0067C0] dark:text-sky-400 font-semibold'
                      : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Concept & Control Deck */}
        <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="tabular-nums">
              Parte {selectedHotspot.number} de {DIALOG_HOTSPOTS.length} · {selectedHotspot.category}
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
              Regla de oro para principiantes
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedHotspot.beginnerTip}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 space-y-1.5">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              Prueba real dentro del cuadro
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Modifica el nombre, marca las casillas cuadradas o cambia los círculos de opción y observa cómo se ilumina el botón <span className="font-semibold text-slate-800 dark:text-slate-200">Aplicar</span>.
            </p>
          </div>

          {/* Quick Number Selector */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Explorar control por número:
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {DIALOG_HOTSPOTS.map((h) => {
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

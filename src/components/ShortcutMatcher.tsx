import React, { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, Keyboard, RotateCcw, Trophy } from 'lucide-react';
import { SHORTCUT_CHALLENGE_PAIRS } from '../data/anatomy';

interface ShortcutMatcherProps {
  completed: boolean;
  onComplete: () => void;
}

export const ShortcutMatcher: React.FC<ShortcutMatcherProps> = ({ completed, onComplete }) => {
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongMessage, setWrongMessage] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);

  // Stable shuffled order for the right column actions
  const shuffledActions = useMemo(() => {
    const copy = [...SHORTCUT_CHALLENGE_PAIRS];
    return [copy[2], copy[0], copy[5], copy[1], copy[4], copy[3]];
  }, []);

  const allMatched = matchedIds.length === SHORTCUT_CHALLENGE_PAIRS.length;

  const handleSelectAction = (actionId: string) => {
    if (!selectedKeyId || matchedIds.includes(actionId)) return;

    if (selectedKeyId === actionId) {
      const next = [...matchedIds, actionId];
      setMatchedIds(next);
      setSelectedKeyId(null);
      setWrongMessage(null);
      if (next.length === SHORTCUT_CHALLENGE_PAIRS.length) {
        onComplete();
      }
    } else {
      setMistakes((prev) => prev + 1);
      const chosenKey = SHORTCUT_CHALLENGE_PAIRS.find((p) => p.id === selectedKeyId);
      setWrongMessage(
        `No coincide: intenta pensar qué acción ejecuta ${chosenKey?.keys ?? 'ese atajo'}.`
      );
    }
  };

  const resetGame = () => {
    setSelectedKeyId(null);
    setMatchedIds([]);
    setWrongMessage(null);
    setMistakes(0);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Reto de Atajos de Teclado de Windows 11
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5 tabular-nums">
            Toca un atajo a la izquierda y luego su función a la derecha · {matchedIds.length} de{' '}
            {SHORTCUT_CHALLENGE_PAIRS.length} parejas
            {completed ? ' · Completado' : ''}
          </p>
        </div>

        <button
          type="button"
          onClick={resetGame}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 self-start min-h-[40px]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reiniciar reto
        </button>
      </div>

      {allMatched ? (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Dominas los atajos esenciales de Windows 11
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 tabular-nums">
                Emparejaste los 6 atajos con {mistakes} {mistakes === 1 ? 'intento fallido' : 'intentos fallidos'}.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetGame}
            className="px-4 py-2.5 rounded-xl bg-[#0067C0] text-white text-sm font-semibold hover:bg-[#0056A3] min-h-[44px]"
          >
            Jugar otra vez
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {wrongMessage && (
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 px-4 py-3 flex items-center gap-2 text-xs font-medium text-amber-800 dark:text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{wrongMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left column: Keys */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-2.5">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Keyboard className="w-4 h-4" />
                1. Selecciona un atajo
              </p>
              {SHORTCUT_CHALLENGE_PAIRS.map((pair) => {
                const isMatched = matchedIds.includes(pair.id);
                const isSelected = selectedKeyId === pair.id;
                return (
                  <button
                    key={pair.id}
                    type="button"
                    disabled={isMatched}
                    onClick={() => {
                      setSelectedKeyId(pair.id);
                      setWrongMessage(null);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all min-h-[52px] ${
                      isMatched
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                        : isSelected
                        ? 'bg-[#EBF4FC] dark:bg-sky-950/60 border-[#0067C0] dark:border-sky-400 text-[#0067C0] dark:text-sky-300'
                        : 'bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <kbd className="font-mono text-sm font-semibold">{pair.keys}</kbd>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {isMatched ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                          <CheckCircle2 className="w-4 h-4" /> Listo
                        </span>
                      ) : (
                        pair.category
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right column: Actions */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-2.5">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                2. Toca la función correspondiente
              </p>
              {shuffledActions.map((pair) => {
                const isMatched = matchedIds.includes(pair.id);
                return (
                  <button
                    key={pair.id}
                    type="button"
                    disabled={isMatched || !selectedKeyId}
                    onClick={() => handleSelectAction(pair.id)}
                    className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border text-left text-sm transition-all min-h-[52px] ${
                      isMatched
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-medium'
                        : selectedKeyId
                        ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-[#0067C0] hover:bg-[#EBF4FC]/40 dark:hover:bg-sky-950/30'
                        : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <span>{pair.action}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

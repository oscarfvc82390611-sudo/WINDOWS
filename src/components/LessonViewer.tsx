import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Keyboard,
  Lightbulb,
} from 'lucide-react';
import { Lesson, ModuleInfo, PracticeToolId } from '../types';

interface LessonViewerProps {
  module: ModuleInfo;
  lesson: Lesson;
  isCompleted: boolean;
  onBack: () => void;
  onComplete: (lessonId: string, xpReward: number) => void;
  onOpenLab: (tool: PracticeToolId) => void;
  onNextLesson?: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  module,
  lesson,
  isCompleted,
  onBack,
  onComplete,
  onOpenLab,
  onNextLesson,
}) => {
  const totalScreens = lesson.steps.length + 1; // steps + final mini-check
  const [screenIndex, setScreenIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const isCheckScreen = screenIndex === lesson.steps.length;
  const currentStep = !isCheckScreen ? lesson.steps[screenIndex] : null;
  const isCorrect = selectedOption === lesson.miniCheck.correctIndex;
  const progressPercent = Math.round(((screenIndex + 1) / totalScreens) * 100);

  const handleVerifyAnswer = () => {
    if (selectedOption === null) return;
    setChecked(true);
    if (selectedOption === lesson.miniCheck.correctIndex) {
      onComplete(lesson.id, lesson.xpReward);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white min-h-[44px] px-2 -ml-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a lecciones
        </button>
        <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
          Módulo {module.number} · Paso {screenIndex + 1} de {totalScreens}
        </span>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-[#0067C0] dark:bg-sky-500 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight text-balance">
            {lesson.title}
          </h1>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tabular-nums">
            {lesson.durationMin} min · +{lesson.xpReward} XP
            {isCompleted ? ' · Completada' : ''}
          </span>
        </div>
      </div>

      {/* Lesson Content Screen */}
      {currentStep ? (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-7 space-y-5 shadow-xs">
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {currentStep.title}
            </h2>
            <p className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentStep.body}
            </p>
          </div>

          <ul className="space-y-3 pt-1">
            {currentStep.keyPoints.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm sm:text-[15px] text-slate-700 dark:text-slate-200 leading-relaxed"
              >
                <span className="w-6 h-6 rounded-full bg-[#EBF4FC] dark:bg-sky-950/70 text-[#0067C0] dark:text-sky-400 text-xs font-bold font-mono tabular-nums flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {currentStep.visualExample && (
            <div className="rounded-xl bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 space-y-2 border border-slate-800">
              <p className="text-xs font-semibold text-sky-300">{currentStep.visualExample.label}</p>
              <pre className="font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-slate-100">
                {currentStep.visualExample.pathOrSnippet}
              </pre>
              <p className="text-xs text-slate-400 pt-1">{currentStep.visualExample.caption}</p>
            </div>
          )}

          {currentStep.shortcut && (
            <div className="rounded-xl bg-[#F4F7FB] dark:bg-slate-800/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Keyboard className="w-4 h-4 text-[#0067C0] dark:text-sky-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white">Atajo útil: </span>
                  {currentStep.shortcut.action}
                </div>
              </div>
              <kbd className="font-mono text-xs font-bold px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white self-start sm:self-auto whitespace-nowrap">
                {currentStep.shortcut.keys}
              </kbd>
            </div>
          )}

          {currentStep.tip && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <span className="font-semibold text-slate-900 dark:text-white">Consejo práctico: </span>
                {currentStep.tip}
              </p>
            </div>
          )}

          {lesson.linkedLab && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ¿Prefieres verlo y tocarlo en el simulador interactivo?
              </p>
              <button
                type="button"
                onClick={() => onOpenLab(lesson.linkedLab!)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-[#0067C0] dark:text-sky-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors self-start min-h-[40px]"
              >
                <FlaskConical className="w-4 h-4" />
                Abrir simulador relacionado
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Final Mini-Check Screen */
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-7 space-y-5 shadow-xs">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#0067C0] dark:text-sky-400">
              Comprobación rápida · +{lesson.xpReward} XP
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {lesson.miniCheck.question}
            </h2>
          </div>

          <div className="space-y-2.5">
            {lesson.miniCheck.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isRightChoice = idx === lesson.miniCheck.correctIndex;
              let styleClass =
                'bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#0067C0]';

              if (checked) {
                if (isRightChoice) {
                  styleClass =
                    'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-medium';
                } else if (isSelected && !isRightChoice) {
                  styleClass =
                    'bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-900 dark:text-rose-200';
                }
              } else if (isSelected) {
                styleClass =
                  'bg-[#EBF4FC] dark:bg-sky-950/60 border-[#0067C0] dark:border-sky-400 text-slate-900 dark:text-white font-medium';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (checked && isCorrect) return;
                    setSelectedOption(idx);
                    setChecked(false);
                  }}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all flex items-center justify-between gap-3 min-h-[52px] ${styleClass}`}
                >
                  <span>{option}</span>
                  {checked && isRightChoice && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {checked && isSelected && !isRightChoice && (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {checked && (
            <div
              className={`rounded-xl p-4 text-sm space-y-1 ${
                isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
              }`}
            >
              <p className="font-semibold flex items-center gap-1.5">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Correcto · Lección completada
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4" /> Casi lo tienes, inténtalo otra vez
                  </>
                )}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                {lesson.miniCheck.explanation}
              </p>
            </div>
          )}

          {(!checked || !isCorrect) && (
            <button
              type="button"
              disabled={selectedOption === null}
              onClick={handleVerifyAnswer}
              className="w-full py-3 rounded-xl bg-[#0067C0] text-white text-sm font-semibold hover:bg-[#0056A3] disabled:opacity-40 transition-colors min-h-[48px]"
            >
              Comprobar respuesta
            </button>
          )}
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setScreenIndex((prev) => Math.max(0, prev - 1))}
          disabled={screenIndex === 0}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-200 disabled:opacity-40 min-h-[44px]"
        >
          Anterior
        </button>

        {!isCheckScreen ? (
          <button
            type="button"
            onClick={() => setScreenIndex((prev) => prev + 1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0067C0] text-white text-sm font-semibold hover:bg-[#0056A3] transition-colors min-h-[44px]"
          >
            {screenIndex === lesson.steps.length - 1 ? 'Ir a la comprobación' : 'Siguiente paso'}
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (checked && isCorrect) || isCompleted ? (
          <div className="flex items-center gap-2">
            {onNextLesson ? (
              <button
                type="button"
                onClick={onNextLesson}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors min-h-[44px]"
              >
                Siguiente lección
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onBack}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors min-h-[44px]"
              >
                Finalizar módulo
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

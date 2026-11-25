import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Flame,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import { QuizDefinition } from '../types';

interface QuizViewProps {
  quiz: QuizDefinition;
  previousBest?: number;
  onBack: () => void;
  onFinish: (quizId: string, percentScore: number, earnedXp: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  quiz,
  previousBest,
  onBack,
  onFinish,
}) => {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = quiz.questions[questionIdx];
  const progressPercent = Math.round(((questionIdx + (answered ? 1 : 0)) / quiz.questions.length) * 100);

  const handleConfirm = () => {
    if (selectedIdx === null || answered) return;
    setAnswered(true);
    if (selectedIdx === currentQuestion.correctIndex) {
      setCorrectCount((c) => c + 1);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setBestStreak((b) => Math.max(b, nextStreak));
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (questionIdx + 1 < quiz.questions.length) {
      setQuestionIdx((i) => i + 1);
      setSelectedIdx(null);
      setAnswered(false);
    } else {
      const percent = Math.round((correctCount / quiz.questions.length) * 100);
      const earnedXp = correctCount * quiz.xpPerCorrect;
      setFinished(true);
      onFinish(quiz.id, percent, earnedXp);
    }
  };

  const handleRestart = () => {
    setQuestionIdx(0);
    setSelectedIdx(null);
    setAnswered(false);
    setCorrectCount(0);
    setStreak(0);
    setBestStreak(0);
    setFinished(false);
  };

  if (finished) {
    const percent = Math.round((correctCount / quiz.questions.length) * 100);
    const earnedXp = correctCount * quiz.xpPerCorrect;
    const passed = percent >= 75;

    return (
      <div className="max-w-2xl mx-auto py-4 space-y-6">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-center space-y-5 shadow-xs">
          <div
            className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
              passed
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
            }`}
          >
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#0067C0] dark:text-sky-400">
              {passed ? 'Cuestionario aprobado' : 'Buen intento — sigue practicando'}
            </p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{quiz.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Respondiste correctamente {correctCount} de {quiz.questions.length} preguntas.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="rounded-2xl bg-[#F4F7FB] dark:bg-slate-800/70 p-3.5">
              <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {percent}%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Precisión</p>
            </div>
            <div className="rounded-2xl bg-[#F4F7FB] dark:bg-slate-800/70 p-3.5">
              <p className="text-2xl font-bold text-[#0067C0] dark:text-sky-400 tabular-nums">
                +{earnedXp}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">XP ganado</p>
            </div>
            <div className="rounded-2xl bg-[#F4F7FB] dark:bg-slate-800/70 p-3.5">
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                {bestStreak}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Mejor racha</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 min-h-[48px]"
            >
              <RotateCcw className="w-4 h-4" />
              Intentar de nuevo
            </button>
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0067C0] text-white text-sm font-semibold hover:bg-[#0056A3] min-h-[48px]"
            >
              Volver al curso
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCorrect = selectedIdx === currentQuestion.correctIndex;

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-8">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white min-h-[44px] px-2 -ml-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Salir
        </button>

        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
          {streak >= 2 && (
            <span className="inline-flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
              <Flame className="w-4 h-4" /> Racha x{streak}
            </span>
          )}
          <span>
            Pregunta {questionIdx + 1} de {quiz.questions.length}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-[#0067C0] dark:bg-sky-500 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{quiz.title}</span>
          {previousBest !== undefined && (
            <span className="tabular-nums">Mejor marca: {previousBest}%</span>
          )}
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
          {currentQuestion.question}
        </h2>

        <div className="space-y-2.5">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedIdx === idx;
            const isRight = idx === currentQuestion.correctIndex;
            let style =
              'bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#0067C0]';

            if (answered) {
              if (isRight) {
                style =
                  'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-medium';
              } else if (isSelected && !isRight) {
                style =
                  'bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-900 dark:text-rose-200';
              } else {
                style =
                  'bg-slate-50/50 dark:bg-slate-950/30 border-slate-100 dark:border-slate-800/70 text-slate-400 dark:text-slate-500';
              }
            } else if (isSelected) {
              style =
                'bg-[#EBF4FC] dark:bg-sky-950/60 border-[#0067C0] dark:border-sky-400 text-slate-900 dark:text-white font-medium';
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={answered}
                onClick={() => setSelectedIdx(idx)}
                className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all flex items-center justify-between gap-3 min-h-[52px] ${style}`}
              >
                <span className="flex items-start gap-3">
                  <span className="font-mono text-xs font-semibold opacity-70 mt-0.5">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span>{opt}</span>
                </span>
                {answered && isRight && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                {answered && isSelected && !isRight && (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {answered && (
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
                  <CheckCircle2 className="w-4 h-4" /> Respuesta correcta (+{quiz.xpPerCorrect} XP)
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4" /> Explicación para recordar
                </>
              )}
            </p>
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        <div className="pt-1">
          {!answered ? (
            <button
              type="button"
              disabled={selectedIdx === null}
              onClick={handleConfirm}
              className="w-full py-3 rounded-xl bg-[#0067C0] text-white text-sm font-semibold hover:bg-[#0056A3] disabled:opacity-40 transition-colors min-h-[48px]"
            >
              Confirmar respuesta
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0067C0] text-white text-sm font-semibold hover:bg-[#0056A3] transition-colors min-h-[48px]"
            >
              {questionIdx + 1 < quiz.questions.length ? 'Siguiente pregunta' : 'Ver resultados'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

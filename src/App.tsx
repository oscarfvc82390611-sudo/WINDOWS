import React, { useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Compass,
  Flame,
  FlaskConical,
  FolderOpen,
  FolderTree,
  GitBranch,
  Home,
  Keyboard,
  Layers,
  LayoutGrid,
  Monitor,
  Moon,
  Play,
  RotateCcw,
  Sliders,
  Sun,
  Trophy,
} from 'lucide-react';
import { ACHIEVEMENTS, ALL_LESSONS, MODULES } from './data/curriculum';
import { DESKTOP_HOTSPOTS, DIALOG_HOTSPOTS, EXPLORER_HOTSPOTS, FOLDER_MISSIONS } from './data/anatomy';
import { FINAL_CERTIFICATION_QUIZ, MODULE_QUIZZES } from './data/quizzes';
import { useProgress } from './hooks/useProgress';
import { PracticeToolId, QuizDefinition, TabId } from './types';
import { FileExplorerAnatomy } from './components/FileExplorerAnatomy';
import { DialogWindowAnatomy } from './components/DialogWindowAnatomy';
import { FolderSandbox } from './components/FolderSandbox';
import { WindowsDesktopInspector } from './components/WindowsDesktopInspector';
import { ShortcutMatcher } from './components/ShortcutMatcher';
import { LessonViewer } from './components/LessonViewer';
import { QuizView } from './components/QuizView';
import { OfflineIndicator, PWAInstallCard } from './components/PWAInstallCard';
import { SplashScreen } from './components/SplashScreen';

const HERO_IMG = '/src/assets/images/hero_learning_workspace_1795558532905.jpg';
const MEDALLION_IMG = '/src/assets/images/trophy_mastery_badge_1795558532352.jpg';
const APP_ICON_IMG = '/src/assets/images/windows11_mobile_icon_1795565335877.jpg';

export default function App() {
  const {
    progress,
    totalXp,
    levelState,
    unlockedAchievementIds,
    overallPercent,
    recentXpToast,
    toggleDarkMode,
    completeLesson,
    recordQuizScore,
    completeMission,
    markInspected,
    completeChallenge,
    resetProgress,
  } = useProgress();

  const [activeTab, setActiveTab] = useState<TabId>('inicio');
  const [practiceTool, setPracticeTool] = useState<PracticeToolId>('carpetas');
  const [lessonFilter, setLessonFilter] = useState<'todos' | 'pendientes' | 'completados'>('todos');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<QuizDefinition | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);
  const [medalImgError, setMedalImgError] = useState(false);

  const nextRecommendedLesson = useMemo(() => {
    return (
      ALL_LESSONS.find((l) => !progress.completedLessonIds.includes(l.id)) ?? ALL_LESSONS[0]
    );
  }, [progress.completedLessonIds]);

  const activeLessonContext = useMemo(() => {
    if (!activeLessonId) return null;
    for (const mod of MODULES) {
      const idx = mod.lessons.findIndex((l) => l.id === activeLessonId);
      if (idx >= 0) {
        const nextInMod = mod.lessons[idx + 1];
        return {
          module: mod,
          lesson: mod.lessons[idx],
          nextLessonId: nextInMod?.id,
        };
      }
    }
    return null;
  }, [activeLessonId]);

  const openPracticeLab = (tool: PracticeToolId) => {
    setActiveLessonId(null);
    setActiveQuiz(null);
    setPracticeTool(tool);
    setActiveTab('practica');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTab = (tab: TabId) => {
    setActiveLessonId(null);
    setActiveQuiz(null);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderModuleIcon = (name: string) => {
    const cls = 'w-5 h-5';
    switch (name) {
      case 'monitor':
        return <Monitor className={cls} />;
      case 'folder-open':
        return <FolderOpen className={cls} />;
      case 'sliders':
        return <Sliders className={cls} />;
      case 'git-branch':
        return <GitBranch className={cls} />;
      case 'keyboard':
        return <Keyboard className={cls} />;
      default:
        return <LayoutGrid className={cls} />;
    }
  };

  const renderAchievementIcon = (name: string) => {
    const cls = 'w-5 h-5';
    switch (name) {
      case 'folder-tree':
        return <FolderTree className={cls} />;
      case 'compass':
        return <Compass className={cls} />;
      case 'check-circle':
        return <CheckCircle2 className={cls} />;
      case 'flame':
        return <Flame className={cls} />;
      case 'keyboard':
        return <Keyboard className={cls} />;
      case 'layers':
        return <Layers className={cls} />;
      case 'trophy':
        return <Trophy className={cls} />;
      default:
        return <Award className={cls} />;
    }
  };

  const filteredModules = useMemo(() => {
    if (lessonFilter === 'todos') return MODULES;
    return MODULES.filter((mod) => {
      const doneCount = mod.lessons.filter((l) =>
        progress.completedLessonIds.includes(l.id)
      ).length;
      if (lessonFilter === 'completados') return doneCount === mod.lessons.length;
      return doneCount < mod.lessons.length;
    });
  }, [lessonFilter, progress.completedLessonIds]);

  const quizValues = Object.values(progress.quizBestScores);
  const avgQuizScore =
    quizValues.length > 0
      ? Math.round(quizValues.reduce((a, b) => a + b, 0) / quizValues.length)
      : 0;

  return (
    <div className="min-h-screen bg-[#F4F7FB] dark:bg-[#0B1220] text-slate-900 dark:text-slate-100 transition-colors">
      <SplashScreen />
      {/* Top Bar: Clean 3-Zone Desktop Contract + Compact Mobile Top App Bar (56px) */}
      <header className="sticky top-0 z-30 h-14 lg:h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark with crisp app icon */}
          <button
            type="button"
            onClick={() => navigateTab('inicio')}
            className="inline-flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0067C0] rounded-md"
          >
            <img
              src={APP_ICON_IMG}
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-[22%] shadow-xs object-cover shrink-0"
            />
            <span>DominaWin 11</span>
          </button>

          {/* Zone 2: Desktop 4 clean single-line text links */}
          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-7 text-sm font-medium"
          >
            {(
              [
                { id: 'inicio', label: 'Inicio' },
                { id: 'aprender', label: 'Lecciones' },
                { id: 'practica', label: 'Laboratorio' },
                { id: 'progreso', label: 'Progreso' },
              ] as const
            ).map((item) => {
              const active = activeTab === item.id && !activeLessonId && !activeQuiz;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTab(item.id)}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    active
                      ? 'border-[#0067C0] text-[#0067C0] dark:border-sky-400 dark:text-sky-400 font-semibold'
                      : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => {
                setActiveQuiz(null);
                setActiveLessonId(nextRecommendedLesson.id);
              }}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0067C0] text-white text-xs font-semibold hover:bg-[#0056A3] transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
            >
              Continuar curso
            </button>

            {/* Mobile right contextual single button: Theme switch */}
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={progress.darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="lg:hidden w-11 h-11 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {progress.darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* XP Reward Toast */}
      {recentXpToast && (
        <div
          role="status"
          className="fixed top-16 lg:top-20 right-4 z-50 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 shadow-lg flex items-center gap-3 text-xs font-semibold"
        >
          <Trophy className="w-4 h-4 text-amber-400 dark:text-amber-600 shrink-0" />
          <span className="tabular-nums">
            +{recentXpToast.amount} XP · {recentXpToast.label}
          </span>
        </div>
      )}

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-24 lg:pb-12">
        {/* Active Full-Screen Lesson or Quiz Overlay View */}
        {activeLessonContext ? (
          <LessonViewer
            key={activeLessonContext.lesson.id}
            module={activeLessonContext.module}
            lesson={activeLessonContext.lesson}
            isCompleted={progress.completedLessonIds.includes(activeLessonContext.lesson.id)}
            onBack={() => setActiveLessonId(null)}
            onComplete={completeLesson}
            onOpenLab={openPracticeLab}
            onNextLesson={
              activeLessonContext.nextLessonId
                ? () => setActiveLessonId(activeLessonContext.nextLessonId!)
                : undefined
            }
          />
        ) : activeQuiz ? (
          <QuizView
            key={activeQuiz.id}
            quiz={activeQuiz}
            previousBest={progress.quizBestScores[activeQuiz.id]}
            onBack={() => setActiveQuiz(null)}
            onFinish={recordQuizScore}
          />
        ) : (
          <>
            {/* ================= TAB 1: INICIO ================= */}
            {activeTab === 'inicio' && (
              <div className="space-y-8">
                {/* Hero Split Section */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between gap-6">
                    <div className="space-y-3">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 tabular-nums">
                        Nivel {levelState.current.level}: {levelState.current.title} · {totalXp} XP · Racha de{' '}
                        {progress.streakDays} {progress.streakDays === 1 ? 'día' : 'días'}
                      </p>
                      <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight text-balance">
                        Domina Windows 11 desde cero practicando de verdad
                      </h1>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                        Aprende cada parte del escritorio, la ventana del Explorador de archivos, los cuadros de diálogo y cómo crear carpetas y subcarpetas con simuladores interactivos.
                      </p>
                    </div>

                    {/* Level Progress Bar + Focal CTA */}
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                          <span>Progreso general del curso</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {overallPercent}% completado
                          </span>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-[#0067C0] dark:bg-sky-500 rounded-full transition-all duration-300"
                            style={{ width: `${Math.max(4, overallPercent)}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveLessonId(nextRecommendedLesson.id)}
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0067C0] text-white text-sm font-semibold hover:bg-[#0056A3] active:scale-[0.98] transition-all min-h-[48px]"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          {progress.completedLessonIds.length === 0
                            ? 'Empezar primera lección'
                            : 'Continuar lección'}
                        </button>
                        <button
                          type="button"
                          onClick={() => openPracticeLab('carpetas')}
                          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors min-h-[48px]"
                        >
                          <FolderTree className="w-4 h-4 text-[#0067C0] dark:text-sky-400" />
                          Ir al taller de carpetas
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hero Visual Card */}
                  <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 relative min-h-[220px]">
                    {!heroImgError ? (
                      <img
                        src={HERO_IMG}
                        alt="Espacio de estudio moderno para aprender Windows 11"
                        referrerPolicy="no-referrer"
                        onError={() => setHeroImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0067C0] via-sky-700 to-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent flex flex-col justify-end p-6">
                      <p className="text-xs font-medium text-sky-300">Siguiente paso sugerido</p>
                      <p className="text-base sm:text-lg font-bold text-white leading-snug mt-1">
                        {nextRecommendedLesson.title}
                      </p>
                      <p className="text-xs text-slate-300 mt-1 tabular-nums">
                        {nextRecommendedLesson.durationMin} min · +{nextRecommendedLesson.xpReward} XP
                      </p>
                    </div>
                  </div>
                </section>

                {/* 4-Column Quick Stats Row */}
                <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Lecciones</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
                      {progress.completedLessonIds.length}
                      <span className="text-sm font-normal text-slate-400">/{ALL_LESSONS.length}</span>
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Misiones carpetas</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
                      {progress.completedMissionIds.length}
                      <span className="text-sm font-normal text-slate-400">/{FOLDER_MISSIONS.length}</span>
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Partes exploradas</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
                      {progress.inspectedExplorerIds.length +
                        progress.inspectedDialogIds.length +
                        progress.inspectedDesktopIds.length}
                      <span className="text-sm font-normal text-slate-400">
                        /{EXPLORER_HOTSPOTS.length + DIALOG_HOTSPOTS.length + DESKTOP_HOTSPOTS.length}
                      </span>
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Insignias</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
                      {unlockedAchievementIds.length}
                      <span className="text-sm font-normal text-slate-400">/{ACHIEVEMENTS.length}</span>
                    </p>
                  </div>
                </section>

                {/* Install App CTA Card with Windows 11 Icon Preview */}
                <PWAInstallCard />

                {/* 3 Flagship Interactive Simulators */}
                <section className="space-y-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Simuladores interactivos esenciales
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                        Toca cualquier parte para descubrir su nombre, uso y atajo real en Windows 11.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateTab('practica')}
                      className="text-xs font-semibold text-[#0067C0] dark:text-sky-400 hover:underline whitespace-nowrap"
                    >
                      Ver los 5 laboratorios
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        tool: 'explorador' as PracticeToolId,
                        title: 'Anatomía del Explorador de archivos',
                        meta: `${progress.inspectedExplorerIds.length}/10 partes exploradas`,
                        desc: 'Inspecciona pestañas, barra de comandos, navegación, ruta, panel izquierdo, detalles y barra de estado.',
                        icon: FolderOpen,
                      },
                      {
                        tool: 'dialogo' as PracticeToolId,
                        title: 'Partes de una Ventana de Diálogo',
                        meta: `${progress.inspectedDialogIds.length}/9 controles explorados`,
                        desc: 'Prueba casillas cuadradas, botones circulares, listas desplegables y la diferencia entre Aceptar, Aplicar y Cancelar.',
                        icon: Sliders,
                      },
                      {
                        tool: 'carpetas' as PracticeToolId,
                        title: 'Taller de Carpetas y Subcarpetas',
                        meta: `${progress.completedMissionIds.length}/5 misiones superadas`,
                        desc: 'Crea carpetas, entra en ellas para anidar subcarpetas en árbol, renombra archivos y valida nombres.',
                        icon: FolderTree,
                      },
                    ].map((card) => {
                      const Icon = card.icon;
                      return (
                        <button
                          key={card.tool}
                          type="button"
                          onClick={() => openPracticeLab(card.tool)}
                          className="group text-left rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 hover:border-[#0067C0] dark:hover:border-sky-500 transition-all flex flex-col justify-between gap-4"
                        >
                          <div className="space-y-3">
                            <div className="w-11 h-11 rounded-xl bg-[#EBF4FC] dark:bg-sky-950/70 text-[#0067C0] dark:text-sky-400 flex items-center justify-center">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                                {card.meta}
                              </p>
                              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0067C0] dark:group-hover:text-sky-400 transition-colors">
                                {card.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {card.desc}
                              </p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0067C0] dark:text-sky-400">
                            Abrir simulador <ChevronRight className="w-4 h-4" />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Route Preview: 6 Modules */}
                <section className="space-y-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Ruta de aprendizaje paso a paso
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                        6 módulos diseñados en español claro para avanzar de principiante a experto.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateTab('aprender')}
                      className="text-xs font-semibold text-[#0067C0] dark:text-sky-400 hover:underline whitespace-nowrap"
                    >
                      Ver plan completo
                    </button>
                  </div>

                  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
                    {MODULES.map((mod) => {
                      const doneLessons = mod.lessons.filter((l) =>
                        progress.completedLessonIds.includes(l.id)
                      ).length;
                      const pct = Math.round((doneLessons / mod.lessons.length) * 100);
                      const firstOpen =
                        mod.lessons.find((l) => !progress.completedLessonIds.includes(l.id)) ??
                        mod.lessons[0];

                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => setActiveLessonId(firstOpen.id)}
                          className="w-full text-left px-4 sm:px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between gap-4 min-h-[68px]"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                pct === 100
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                                  : 'bg-[#EBF4FC] dark:bg-sky-950/60 text-[#0067C0] dark:text-sky-400'
                              }`}
                            >
                              {pct === 100 ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                renderModuleIcon(mod.iconName)
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                                Módulo {mod.number} · {mod.lessons.length} lecciones · {mod.estimatedMinutes} min
                              </p>
                              <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white truncate">
                                {mod.title}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
                              {pct}%
                            </span>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>
            )}

            {/* ================= TAB 2: APRENDER (LECCIONES Y CUESTIONARIOS) ================= */}
            {activeTab === 'aprender' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Lecciones y Cuestionarios
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 tabular-nums">
                      {progress.completedLessonIds.length} de {ALL_LESSONS.length} lecciones completadas · 6 cuestionarios de módulo
                    </p>
                  </div>

                  {/* Interactive Filter Control */}
                  <div className="inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 self-start">
                    {(
                      [
                        { id: 'todos', label: 'Todos' },
                        { id: 'pendientes', label: 'Pendientes' },
                        { id: 'completados', label: 'Completados' },
                      ] as const
                    ).map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setLessonFilter(f.id)}
                        className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap min-h-[40px] ${
                          lessonFilter === f.id
                            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredModules.length === 0 ? (
                  <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 text-center space-y-2">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      No hay módulos en esta categoría
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Cambia el filtro a "Todos" para ver el temario completo de Windows 11.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {filteredModules.map((mod) => {
                      const doneCount = mod.lessons.filter((l) =>
                        progress.completedLessonIds.includes(l.id)
                      ).length;
                      const quiz = MODULE_QUIZZES[mod.id];
                      const bestQuizScore = quiz ? progress.quizBestScores[quiz.id] : undefined;

                      return (
                        <section
                          key={mod.id}
                          className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between gap-4"
                        >
                          <div className="space-y-4">
                            <div className="flex items-start gap-3.5">
                              <div className="w-11 h-11 rounded-xl bg-[#EBF4FC] dark:bg-sky-950/70 text-[#0067C0] dark:text-sky-400 flex items-center justify-center shrink-0">
                                {renderModuleIcon(mod.iconName)}
                              </div>
                              <div className="space-y-1 min-w-0">
                                <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                                  Módulo {mod.number} · {mod.category} · {doneCount}/{mod.lessons.length} completadas
                                </p>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                                  {mod.title}
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                  {mod.subtitle}
                                </p>
                              </div>
                            </div>

                            {/* Lesson Rows */}
                            <div className="divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800">
                              {mod.lessons.map((lesson) => {
                                const done = progress.completedLessonIds.includes(lesson.id);
                                return (
                                  <button
                                    key={lesson.id}
                                    type="button"
                                    onClick={() => setActiveLessonId(lesson.id)}
                                    className="w-full py-3 flex items-center justify-between gap-3 text-left hover:bg-slate-50/80 dark:hover:bg-slate-800/40 rounded-lg px-2 -mx-2 transition-colors min-h-[52px]"
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      {done ? (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                      ) : (
                                        <span className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 text-[10px] font-mono font-bold text-slate-500 flex items-center justify-center shrink-0">
                                          {lesson.order}
                                        </span>
                                      )}
                                      <div className="min-w-0">
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                                          {lesson.title}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                                          {lesson.durationMin} min · +{lesson.xpReward} XP
                                        </p>
                                      </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Module Quiz CTA */}
                          {quiz && (
                            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                              <div className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                                {bestQuizScore !== undefined ? (
                                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                                    Cuestionario: {bestQuizScore}% mejor nota
                                  </span>
                                ) : (
                                  <span>Cuestionario · {quiz.questions.length} preguntas</span>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => setActiveQuiz(quiz)}
                                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-[#0067C0] dark:text-sky-400 hover:bg-[#0067C0] hover:text-white transition-colors min-h-[40px] whitespace-nowrap"
                              >
                                {bestQuizScore !== undefined ? 'Repetir quiz' : 'Hacer cuestionario'}
                              </button>
                            </div>
                          )}
                        </section>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ================= TAB 3: PRÁCTICA (LABORATORIO INTERACTIVO) ================= */}
            {activeTab === 'practica' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Laboratorio Interactivo Windows 11
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Practica sin miedo a dañar nada: crea carpetas, explora ventanas y supera retos táctiles.
                  </p>
                </div>

                {/* Segmented Tool Selector */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {(
                    [
                      { id: 'carpetas', label: 'Carpetas y Subcarpetas', icon: FolderTree },
                      { id: 'explorador', label: 'Explorador de Archivos', icon: FolderOpen },
                      { id: 'dialogo', label: 'Ventana de Diálogo', icon: Sliders },
                      { id: 'escritorio', label: 'Escritorio Win 11', icon: Monitor },
                      { id: 'atajos', label: 'Reto de Atajos', icon: Keyboard },
                    ] as const
                  ).map((tool) => {
                    const Icon = tool.icon;
                    const active = practiceTool === tool.id;
                    return (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => setPracticeTool(tool.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 min-h-[44px] ${
                          active
                            ? 'bg-[#0067C0] text-white'
                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#0067C0]'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        {tool.label}
                      </button>
                    );
                  })}
                </div>

                {/* Active Interactive Lab */}
                <div>
                  {practiceTool === 'carpetas' && (
                    <FolderSandbox
                      completedMissionIds={progress.completedMissionIds}
                      onMissionComplete={completeMission}
                    />
                  )}
                  {practiceTool === 'explorador' && (
                    <FileExplorerAnatomy
                      inspectedIds={progress.inspectedExplorerIds}
                      onInspect={(id) => markInspected('explorer', id)}
                      challengeCompleted={progress.completedChallenges.includes('explorer-challenge')}
                      onChallengeComplete={() =>
                        completeChallenge('explorer-challenge', 100, 'Reto del Explorador superado')
                      }
                    />
                  )}
                  {practiceTool === 'dialogo' && (
                    <DialogWindowAnatomy
                      inspectedIds={progress.inspectedDialogIds}
                      onInspect={(id) => markInspected('dialog', id)}
                      challengeCompleted={progress.completedChallenges.includes('dialog-challenge')}
                      onChallengeComplete={() =>
                        completeChallenge('dialog-challenge', 100, 'Reto de Ventana de Diálogo superado')
                      }
                    />
                  )}
                  {practiceTool === 'escritorio' && (
                    <WindowsDesktopInspector
                      inspectedIds={progress.inspectedDesktopIds}
                      onInspect={(id) => markInspected('desktop', id)}
                      challengeCompleted={progress.completedChallenges.includes('desktop-challenge')}
                      onChallengeComplete={() =>
                        completeChallenge('desktop-challenge', 90, 'Reto del Escritorio superado')
                      }
                    />
                  )}
                  {practiceTool === 'atajos' && (
                    <ShortcutMatcher
                      completed={progress.completedChallenges.includes('shortcuts-match')}
                      onComplete={() =>
                        completeChallenge('shortcuts-match', 90, 'Reto de Atajos superado')
                      }
                    />
                  )}
                </div>
              </div>
            )}

            {/* ================= TAB 4: PROGRESO Y GAMIFICACIÓN ================= */}
            {activeTab === 'progreso' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Tu Progreso y Logros
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Cada lección, misión práctica y cuestionario suma puntos de experiencia hacia tu certificación.
                    </p>
                  </div>

                  {/* Theme & Reset Controls */}
                  <div className="flex items-center gap-2 self-start">
                    <button
                      type="button"
                      onClick={toggleDarkMode}
                      className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 min-h-[44px] whitespace-nowrap"
                    >
                      {progress.darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      {progress.darkMode ? 'Modo claro' : 'Modo oscuro'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-rose-600 min-h-[44px] whitespace-nowrap"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reiniciar
                    </button>
                  </div>
                </div>

                {/* Level & Final Certification Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                  <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between gap-5">
                    <div className="space-y-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                        Nivel actual · {totalXp} XP acumulados
                      </p>
                      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        Nivel {levelState.current.level}: {levelState.current.title}
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 tabular-nums">
                        {levelState.next
                          ? `Te faltan ${levelState.xpToNext} XP para alcanzar el Nivel ${levelState.next.level} (${levelState.next.title}).`
                          : 'Has alcanzado el rango máximo de maestría en DominaWin 11.'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-[#0067C0] dark:bg-sky-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(5, levelState.progressPercent)}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3 pt-2">
                        <div>
                          <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
                            {progress.streakDays}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Días de racha</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
                            {avgQuizScore}%
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Promedio quizzes</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
                            {overallPercent}%
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Avance total</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Final Certification Exam Card */}
                  <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800">
                        {!medalImgError ? (
                          <img
                            src={MEDALLION_IMG}
                            alt="Medalla de certificación Windows 11"
                            referrerPolicy="no-referrer"
                            onError={() => setMedalImgError(true)}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#0067C0]">
                            <Trophy className="w-7 h-7" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-[#0067C0] dark:text-sky-400">
                          Evaluación integradora · 10 preguntas
                        </p>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          Examen Final Windows 11
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          Aprueba con 80% o más para desbloquear la insignia de Certificación (+250 XP).
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                        {progress.quizBestScores[FINAL_CERTIFICATION_QUIZ.id] !== undefined
                          ? `Mejor calificación: ${progress.quizBestScores[FINAL_CERTIFICATION_QUIZ.id]}%`
                          : 'Aún no realizado'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveQuiz(FINAL_CERTIFICATION_QUIZ)}
                        className="px-4 py-2.5 rounded-xl bg-[#0067C0] text-white text-xs font-semibold hover:bg-[#0056A3] transition-colors min-h-[44px] whitespace-nowrap"
                      >
                        Iniciar examen
                      </button>
                    </div>
                  </div>
                </div>

                {/* Install App CTA Card */}
                <PWAInstallCard />

                {/* Achievements Grid */}
                <section className="space-y-3">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Insignias y logros ({unlockedAchievementIds.length}/{ACHIEVEMENTS.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {ACHIEVEMENTS.map((ach) => {
                      const unlocked = unlockedAchievementIds.includes(ach.id);
                      return (
                        <div
                          key={ach.id}
                          className={`rounded-2xl border p-4 space-y-2.5 transition-colors ${
                            unlocked
                              ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800'
                              : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-75'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                unlocked
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                                  : 'bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                              }`}
                            >
                              {renderAchievementIcon(ach.iconName)}
                            </div>
                            <span className="text-xs font-semibold tabular-nums text-slate-500 dark:text-slate-400">
                              +{ach.xpBonus} XP
                            </span>
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                              {ach.title}
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                              {ach.description}
                            </p>
                          </div>
                          <p
                            className={`text-[11px] font-semibold ${
                              unlocked
                                ? 'text-emerald-700 dark:text-emerald-400'
                                : 'text-slate-400 dark:text-slate-500'
                            }`}
                          >
                            {unlocked ? 'Desbloqueada' : 'Pendiente'}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            )}
          </>
        )}
      </main>

      {/* In-App Confirmation Modal for Reset Progress (no window.confirm) */}
      {showResetConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-dialog-title"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xl">
            <h2 id="reset-dialog-title" className="text-lg font-bold text-slate-900 dark:text-white">
              ¿Reiniciar todo tu progreso?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Se borrarán tus puntos XP, lecciones completadas, misiones y calificaciones de cuestionarios para empezar desde cero.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 min-h-[44px]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 min-h-[44px]"
              >
                Sí, reiniciar
              </button>
            </div>
          </div>
        </div>
      )}

      <OfflineIndicator />

      {/* Mobile Fixed Bottom Navigation Bar (Natural Thumb Zone, 64px height) */}
      <nav
        aria-label="Navegación inferior móvil"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe"
      >
        <div className="grid grid-cols-4 h-16 max-w-md mx-auto">
          {(
            [
              { id: 'inicio', label: 'Inicio', icon: Home },
              { id: 'aprender', label: 'Aprender', icon: BookOpen },
              { id: 'practica', label: 'Práctica', icon: FlaskConical },
              { id: 'progreso', label: 'Progreso', icon: Trophy },
            ] as const
          ).map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTab(item.id)}
                className={`flex flex-col items-center justify-center min-h-[48px] transition-colors ${
                  active
                    ? 'text-[#0067C0] dark:text-sky-400'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'stroke-[2.4]' : 'stroke-[1.9]'}`} />
                <span className="text-[11px] font-medium tracking-tight mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ACHIEVEMENTS, ALL_LESSONS, LEVELS } from '../data/curriculum';
import { DESKTOP_HOTSPOTS, DIALOG_HOTSPOTS, EXPLORER_HOTSPOTS, FOLDER_MISSIONS } from '../data/anatomy';
import { FINAL_CERTIFICATION_QUIZ } from '../data/quizzes';
import { UserProgress } from '../types';

const STORAGE_KEY = 'dominawin11_progress_v1';

const getTodayIso = () => new Date().toISOString().slice(0, 10);

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  completedLessonIds: [],
  quizBestScores: {},
  completedMissionIds: [],
  inspectedExplorerIds: [],
  inspectedDialogIds: [],
  inspectedDesktopIds: [],
  completedChallenges: [],
  streakDays: 1,
  lastActiveDate: getTodayIso(),
  darkMode: false,
};

function loadInitialProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    const today = getTodayIso();
    let streak = parsed.streakDays ?? 1;
    const lastDate = parsed.lastActiveDate ?? today;

    if (lastDate !== today) {
      const prev = new Date(lastDate);
      const curr = new Date(today);
      const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak += 1;
      } else if (diffDays > 1) {
        streak = 1;
      }
    }

    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      streakDays: streak,
      lastActiveDate: today,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(loadInitialProgress);
  const [recentXpToast, setRecentXpToast] = useState<{ id: number; amount: number; label: string } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota issues gracefully
    }
  }, [progress]);

  useEffect(() => {
    const root = document.documentElement;
    if (progress.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [progress.darkMode]);

  const showToast = useCallback((amount: number, label: string) => {
    setRecentXpToast({ id: Date.now(), amount, label });
  }, []);

  useEffect(() => {
    if (!recentXpToast) return;
    const timer = window.setTimeout(() => setRecentXpToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [recentXpToast]);

  const toggleDarkMode = useCallback(() => {
    setProgress((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  }, []);

  const completeLesson = useCallback(
    (lessonId: string, xpReward: number) => {
      setProgress((prev) => {
        if (prev.completedLessonIds.includes(lessonId)) return prev;
        showToast(xpReward, 'Lección completada');
        return {
          ...prev,
          xp: prev.xp + xpReward,
          completedLessonIds: [...prev.completedLessonIds, lessonId],
        };
      });
    },
    [showToast]
  );

  const recordQuizScore = useCallback(
    (quizId: string, percentScore: number, earnedXp: number) => {
      setProgress((prev) => {
        const previousBest = prev.quizBestScores[quizId] ?? -1;
        const shouldAwardXp = previousBest < 0 ? earnedXp : percentScore > previousBest ? Math.round(earnedXp * 0.5) : 0;
        if (shouldAwardXp > 0) {
          showToast(shouldAwardXp, 'Cuestionario completado');
        }
        return {
          ...prev,
          xp: prev.xp + shouldAwardXp,
          quizBestScores: {
            ...prev.quizBestScores,
            [quizId]: Math.max(previousBest, percentScore),
          },
        };
      });
    },
    [showToast]
  );

  const completeMission = useCallback(
    (missionId: string, xpReward: number) => {
      setProgress((prev) => {
        if (prev.completedMissionIds.includes(missionId)) return prev;
        showToast(xpReward, 'Misión de carpetas superada');
        return {
          ...prev,
          xp: prev.xp + xpReward,
          completedMissionIds: [...prev.completedMissionIds, missionId],
        };
      });
    },
    [showToast]
  );

  const markInspected = useCallback(
    (area: 'explorer' | 'dialog' | 'desktop', hotspotId: string) => {
      setProgress((prev) => {
        const field =
          area === 'explorer'
            ? 'inspectedExplorerIds'
            : area === 'dialog'
            ? 'inspectedDialogIds'
            : 'inspectedDesktopIds';

        if (prev[field].includes(hotspotId)) return prev;
        const nextList = [...prev[field], hotspotId];
        const totalForArea =
          area === 'explorer'
            ? EXPLORER_HOTSPOTS.length
            : area === 'dialog'
            ? DIALOG_HOTSPOTS.length
            : DESKTOP_HOTSPOTS.length;

        const bonus = nextList.length === totalForArea ? 60 : 10;
        if (nextList.length === totalForArea) {
          showToast(bonus, 'Anatomía completada al 100%');
        }

        return {
          ...prev,
          xp: prev.xp + bonus,
          [field]: nextList,
        };
      });
    },
    [showToast]
  );

  const completeChallenge = useCallback(
    (challengeId: string, xpReward: number, label: string) => {
      setProgress((prev) => {
        if (prev.completedChallenges.includes(challengeId)) return prev;
        showToast(xpReward, label);
        return {
          ...prev,
          xp: prev.xp + xpReward,
          completedChallenges: [...prev.completedChallenges, challengeId],
        };
      });
    },
    [showToast]
  );

  const resetProgress = useCallback(() => {
    setProgress((prev) => ({
      ...DEFAULT_PROGRESS,
      darkMode: prev.darkMode,
      lastActiveDate: getTodayIso(),
    }));
  }, []);

  const unlockedAchievementIds = useMemo(() => {
    const unlocked: string[] = [];
    if (progress.completedLessonIds.length >= 1) unlocked.push('first-lesson');
    if (progress.inspectedDesktopIds.length >= 6) unlocked.push('desktop-mapper');
    if (progress.inspectedExplorerIds.length >= EXPLORER_HOTSPOTS.length) unlocked.push('explorer-inspector');
    if (progress.inspectedDialogIds.length >= DIALOG_HOTSPOTS.length) unlocked.push('dialog-master');
    if (progress.completedMissionIds.length >= 3) unlocked.push('folder-architect');
    if (progress.completedChallenges.includes('shortcuts-match')) unlocked.push('shortcut-sprinter');
    if (Object.values(progress.quizBestScores).some((score) => score === 100)) unlocked.push('perfect-quiz');
    if ((progress.quizBestScores[FINAL_CERTIFICATION_QUIZ.id] ?? 0) >= 80) unlocked.push('win11-certified');
    return unlocked;
  }, [progress]);

  const totalXpWithBadges = useMemo(() => {
    const badgeXp = ACHIEVEMENTS.filter((a) => unlockedAchievementIds.includes(a.id)).reduce(
      (sum, a) => sum + a.xpBonus,
      0
    );
    return progress.xp + badgeXp;
  }, [progress.xp, unlockedAchievementIds]);

  const levelState = useMemo(() => {
    let current = LEVELS[0];
    let next = LEVELS[1] ?? null;
    for (let i = 0; i < LEVELS.length; i++) {
      if (totalXpWithBadges >= LEVELS[i].minXp) {
        current = LEVELS[i];
        next = LEVELS[i + 1] ?? null;
      }
    }
    const progressPercent = next
      ? Math.min(100, Math.round(((totalXpWithBadges - current.minXp) / (next.minXp - current.minXp)) * 100))
      : 100;

    return {
      current,
      next,
      progressPercent,
      xpToNext: next ? Math.max(0, next.minXp - totalXpWithBadges) : 0,
    };
  }, [totalXpWithBadges]);

  const overallPercent = useMemo(() => {
    const totalUnits = ALL_LESSONS.length + FOLDER_MISSIONS.length + 6;
    const doneUnits =
      progress.completedLessonIds.length +
      progress.completedMissionIds.length +
      Object.keys(progress.quizBestScores).filter((id) => id !== FINAL_CERTIFICATION_QUIZ.id).length;
    return Math.min(100, Math.round((doneUnits / totalUnits) * 100));
  }, [progress]);

  return {
    progress,
    totalXp: totalXpWithBadges,
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
  };
}

export type TabId = 'inicio' | 'aprender' | 'practica' | 'progreso';

export type PracticeToolId = 'carpetas' | 'explorador' | 'dialogo' | 'escritorio' | 'atajos';

export interface LessonStep {
  title: string;
  body: string;
  keyPoints: string[];
  tip?: string;
  shortcut?: {
    keys: string;
    action: string;
  };
  visualExample?: {
    label: string;
    pathOrSnippet: string;
    caption: string;
  };
}

export interface MiniCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  order: number;
  title: string;
  durationMin: number;
  xpReward: number;
  summary: string;
  steps: LessonStep[];
  miniCheck: MiniCheck;
  linkedLab?: PracticeToolId;
}

export interface ModuleInfo {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  category: string;
  iconName: 'monitor' | 'folder-open' | 'sliders' | 'git-branch' | 'keyboard' | 'layout-grid';
  estimatedMinutes: number;
  lessons: Lesson[];
}

export interface AnatomyHotspot {
  id: string;
  number: number;
  name: string;
  shortName: string;
  category: string;
  description: string;
  beginnerTip: string;
  shortcut?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  context?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizDefinition {
  id: string;
  moduleId?: string;
  title: string;
  subtitle: string;
  xpPerCorrect: number;
  questions: QuizQuestion[];
}

export interface VirtualNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  extension?: string;
  sizeLabel?: string;
  modifiedDate: string;
  parentId: string | null;
  isSystem?: boolean;
}

export interface FolderMission {
  id: string;
  number: number;
  title: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  xpReward: number;
  description: string;
  goalSummary: string;
  hint: string;
  targetPathPreview: string;
  checkCompleted: (nodes: VirtualNode[]) => boolean;
}

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  xpBonus: number;
  iconName: 'award' | 'folder-tree' | 'compass' | 'check-circle' | 'flame' | 'keyboard' | 'layers' | 'trophy';
}

export interface UserProgress {
  xp: number;
  completedLessonIds: string[];
  quizBestScores: Record<string, number>;
  completedMissionIds: string[];
  inspectedExplorerIds: string[];
  inspectedDialogIds: string[];
  inspectedDesktopIds: string[];
  completedChallenges: string[];
  streakDays: number;
  lastActiveDate: string;
  darkMode: boolean;
}

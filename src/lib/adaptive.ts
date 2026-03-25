// Adaptive difficulty engine — persists in localStorage
// Tracks accuracy per activity and adjusts level (1-3)

export type ActivityType = "words" | "repeat" | "games" | "animals" | "fruits" | "colors" | "emotions" | "bodyparts" | "rural" | "stories" | "phrases";
export type DifficultyLevel = 1 | 2 | 3;

interface PerformanceData {
  correct: number;
  total: number;
  level: DifficultyLevel;
  streak: number;
}

const STORAGE_KEY = "hablatito_performance";

const defaultPerf = (): PerformanceData => ({ correct: 0, total: 0, level: 1, streak: 0 });

const load = (): Record<string, PerformanceData> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
};

const save = (data: Record<string, PerformanceData>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getLevel = (activity: ActivityType): DifficultyLevel => {
  return load()[activity]?.level ?? 1;
};

export const recordResult = (activity: ActivityType, correct: boolean): DifficultyLevel => {
  const data = load();
  const perf = data[activity] ?? defaultPerf();

  perf.total += 1;
  if (correct) {
    perf.correct += 1;
    perf.streak += 1;
  } else {
    perf.streak = 0;
  }

  // Level up: 3+ streak or accuracy > 80% after 5+ attempts
  if (perf.streak >= 3 && perf.level < 3) {
    perf.level = Math.min(3, perf.level + 1) as DifficultyLevel;
    perf.streak = 0;
  }

  // Level down: accuracy < 40% after 5+ attempts
  if (perf.total >= 5 && perf.correct / perf.total < 0.4 && perf.level > 1) {
    perf.level = Math.max(1, perf.level - 1) as DifficultyLevel;
    perf.correct = 0;
    perf.total = 0;
  }

  data[activity] = perf;
  save(data);
  return perf.level;
};

export const getLevelLabel = (level: DifficultyLevel): string => {
  return ["", "🌱 Fácil", "🌿 Medio", "🌳 Difícil"][level];
};

export const resetPerformance = () => {
  localStorage.removeItem(STORAGE_KEY);
};

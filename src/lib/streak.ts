// Daily streak tracking — persists in localStorage

const STREAK_KEY = "hablatito_streak";

interface StreakData {
  current: number;
  lastDate: string; // YYYY-MM-DD
}

const today = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const load = (): StreakData => {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { current: 0, lastDate: "" };
};

const save = (data: StreakData) => {
  localStorage.setItem(STREAK_KEY, JSON.stringify(data));
};

/** Call on app open / activity start to update streak */
export const updateStreak = (): number => {
  const data = load();
  const t = today();

  if (data.lastDate === t) return data.current; // already counted today

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

  if (data.lastDate === yStr) {
    data.current += 1;
  } else {
    data.current = 1;
  }
  data.lastDate = t;
  save(data);
  return data.current;
};

export const getStreak = (): number => {
  const data = load();
  const t = today();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

  if (data.lastDate === t || data.lastDate === yStr) return data.current;
  return 0;
};

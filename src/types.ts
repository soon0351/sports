export type ScreenType = 'dashboard' | 'activity' | 'profile' | 'sleep' | 'data_archive';

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  height: number;
  weight: number;
  stepsGoal: number;
  sleepGoalMinutes: number;
  calorieGoal: number;
}

export interface ActivityData {
  steps: number;
  distanceMiles: number;
  activeMinutes: number;
  floors: number;
  caloriesKcal: number;
  activityIntensity: number[]; // Hourly data for chart: 24h
}

export interface SleepData {
  qualityScore: number; // 0-100
  durationMinutes: number;
  deepSleepMinutes: number;
  lightSleepMinutes: number;
  remSleepMinutes: number;
  awakeMinutes: number;
  weeklyDuration: number[]; // 7 elements (Mon-Sun)
}

export interface DailyLog {
  date: string; // "OCT 24", "OCT 23", etc.
  type: string; // "Active Thursday", "Rest Day", etc.
  steps: number;
  calories: number;
  sleep: string;
  intensityArr: number[];
}

export interface AppState {
  currentScreen: ScreenType;
  transitionDirection: 'push' | 'push_back' | 'slide_up' | 'none';
  profile: UserProfile;
}

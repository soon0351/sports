import React, { createContext, useContext, useState, useEffect } from 'react';
import { ScreenType, UserProfile, ActivityData, SleepData, DailyLog } from '../types';

interface AppContextType {
  currentScreen: ScreenType;
  transitionDirection: 'push' | 'push_back' | 'slide_up' | 'none';
  navigate: (screen: ScreenType, direction: 'push' | 'push_back' | 'slide_up' | 'none') => void;
  profile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
  activity: ActivityData;
  updateActivity: (activity: Partial<ActivityData>) => void;
  sleep: SleepData;
  updateSleep: (sleep: Partial<SleepData>) => void;
  dailyLogs: DailyLog[];
  addDailyLog: (log: DailyLog) => void;
  notificationCount: number;
  clearNotifications: () => void;
}

const defaultProfile: UserProfile = {
  name: "stephanos",
  email: "stephanos0351@gmail.com",
  age: 28,
  height: 176,
  weight: 72,
  stepsGoal: 10000,
  sleepGoalMinutes: 480, // 8 hours
  calorieGoal: 2000,
};

const defaultActivity: ActivityData = {
  steps: 8432,
  distanceMiles: 5.2,
  activeMinutes: 45,
  floors: 12,
  caloriesKcal: 1840,
  activityIntensity: [15, 30, 20, 80, 50, 40, 65, 35, 18, 25, 60, 30], // intervals
};

const defaultSleep: SleepData = {
  qualityScore: 85,
  durationMinutes: 440, // 7h 20m
  deepSleepMinutes: 105, // 1h 45m (20%)
  lightSleepMinutes: 210, // 3h 30m (40%)
  remSleepMinutes: 135, // 2h 15m (25%)
  awakeMinutes: 80, // 1h 20m (15%)
  weeklyDuration: [420, 460, 400, 450, 480, 495, 410], // Mon..Sun
};

const defaultLogs: DailyLog[] = [
  {
    date: "OCT 24",
    type: "Active Thursday",
    steps: 10240,
    calories: 450,
    sleep: "7h 45m",
    intensityArr: [10, 40, 20, 70, 40, 50, 80, 30]
  },
  {
    date: "OCT 23",
    type: "Rest Day",
    steps: 4120,
    calories: 120,
    sleep: "8h 15m",
    intensityArr: [5, 15, 10, 20, 10, 15, 25, 10]
  },
  {
    date: "OCT 22",
    type: "High Intensity",
    steps: 15800,
    calories: 680,
    sleep: "6h 50m",
    intensityArr: [30, 60, 90, 80, 40, 60, 75, 45]
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [transitionDirection, setTransitionDirection] = useState<'push' | 'push_back' | 'slide_up' | 'none'>('none');
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('vitalstep_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.name === "민수님") {
        parsed.name = "stephanos";
        parsed.email = "stephanos0351@gmail.com";
      }
      return parsed;
    }
    return defaultProfile;
  });
  const [activity, setActivity] = useState<ActivityData>(() => {
    const saved = localStorage.getItem('vitalstep_activity');
    return saved ? JSON.parse(saved) : defaultActivity;
  });
  const [sleep, setSleep] = useState<SleepData>(() => {
    const saved = localStorage.getItem('vitalstep_sleep');
    return saved ? JSON.parse(saved) : defaultSleep;
  });
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>(() => {
    const saved = localStorage.getItem('vitalstep_logs');
    return saved ? JSON.parse(saved) : defaultLogs;
  });
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    localStorage.setItem('vitalstep_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('vitalstep_activity', JSON.stringify(activity));
  }, [activity]);

  useEffect(() => {
    localStorage.setItem('vitalstep_sleep', JSON.stringify(sleep));
  }, [sleep]);

  useEffect(() => {
    localStorage.setItem('vitalstep_logs', JSON.stringify(dailyLogs));
  }, [dailyLogs]);

  const navigate = (screen: ScreenType, direction: 'push' | 'push_back' | 'slide_up' | 'none') => {
    setTransitionDirection(direction);
    setCurrentScreen(screen);
  };

  const updateProfile = (fields: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...fields }));
  };

  const updateActivity = (fields: Partial<ActivityData>) => {
    setActivity(prev => ({ ...prev, ...fields }));
  };

  const updateSleep = (fields: Partial<SleepData>) => {
    setSleep(prev => ({ ...prev, ...fields }));
  };

  const addDailyLog = (log: DailyLog) => {
    setDailyLogs(prev => [log, ...prev]);
  };

  const clearNotifications = () => {
    setNotificationCount(0);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        transitionDirection,
        navigate,
        profile,
        updateProfile,
        activity,
        updateActivity,
        sleep,
        updateSleep,
        dailyLogs,
        addDailyLog,
        notificationCount,
        clearNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};

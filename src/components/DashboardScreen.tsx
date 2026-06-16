import React from 'react';
import { useAppState } from './AppContext';
import { Footprints, Moon, Flame, ChevronRight, Sparkles, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export const DashboardScreen: React.FC = () => {
  const { profile, activity, sleep, navigate, updateActivity } = useAppState();

  const handleStepsCardClick = () => {
    navigate('activity', 'push');
  };

  const handleSleepCardClick = () => {
    navigate('sleep', 'push');
  };

  const handleViewAllClick = () => {
    navigate('data_archive', 'push');
  };

  // Helper calculation for circular progress
  const stepPercentage = Math.round((activity.steps / profile.stepsGoal) * 100);
  const strokeDashoffset = 188 - (188 * Math.min(stepPercentage, 100)) / 100;

  // Interactively add steps (very rewarding feedback)
  const handleQuickWalkLog = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card click navigation
    const stepsToAdd = 1200;
    const addedDist = 0.6;
    const addedCal = 70;
    
    updateActivity({
      steps: activity.steps + stepsToAdd,
      distanceMiles: Math.round((activity.distanceMiles + addedDist) * 10) / 10,
      caloriesKcal: activity.caloriesKcal + addedCal,
      activeMinutes: activity.activeMinutes + 10,
    });
  };

  return (
    <div className="flex flex-col gap-6 px-5 pb-28 pt-4">
      {/* Welcome Heading */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1.5"
      >
        <div className="flex items-center gap-2">
          <h2 className="text-[28px] font-bold tracking-tight text-white sm:text-3xl">
            안녕하세요, {profile.name}!
          </h2>
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
          >
            <Sparkles size={24} className="text-brand-primary" />
          </motion.div>
        </div>
        <p className="text-[15px] text-gray-400">
          오늘도 활기차게 시작해볼까요?
        </p>
      </motion.div>

      {/* Main Steps Card - Big Kinetic Center */}
      <motion.article 
        id="dashboard-steps-card"
        onClick={handleStepsCardClick}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#1c1b1b] p-6 shadow-xl transition duration-300 hover:border-brand-primary/40 hover:shadow-brand-primary/5"
      >
        {/* Soft glowing ambient light */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-primary/10 blur-2xl" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
              <Footprints size={24} className="stroke-[2]" />
            </div>
            <span className="text-[17px] font-semibold text-brand-primary uppercase tracking-wide">
              Steps
            </span>
          </div>

          <button 
            onClick={handleQuickWalkLog}
            title="quick log 1,200 steps"
            className="flex h-8 items-center gap-1.5 rounded-full bg-brand-primary/20 px-3 text-xs font-semibold text-brand-primary hover:bg-brand-primary hover:text-[#002e6a] transition-all duration-200"
          >
            <Plus size={14} className="stroke-[2.5]" />
            <span>1.2K 보행 추가</span>
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {activity.steps.toLocaleString()}
            </span>
            <div className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-400 inline-block">
              목표: {profile.stepsGoal.toLocaleString()}
            </div>
          </div>

          {/* Dynamic Circular Progress Ring */}
          <div className="relative flex items-center justify-center h-20 w-20">
            <svg className="h-full w-full rotate-[-90deg]">
              <circle
                cx="40"
                cy="40"
                r="30"
                className="stroke-white/10 fill-none"
                strokeWidth="6"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="30"
                className="stroke-brand-primary fill-none transition-all duration-500"
                strokeWidth="6"
                strokeDasharray="188"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-sm font-bold text-white">{stepPercentage}%</span>
              <span className="text-[9px] text-gray-500 font-medium">달성</span>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Two Grid Cards: Sleep & Calories */}
      <div className="grid grid-cols-2 gap-4">
        {/* Sleep Card */}
        <motion.article
          id="dashboard-sleep-card"
          onClick={handleSleepCardClick}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#1c1b1b] p-5 shadow-lg transition duration-300 hover:border-brand-tertiary/40 hover:shadow-brand-tertiary/5"
        >
          <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-brand-tertiary/10 blur-2xl" />
          <div className="flex items-center gap-2.5">
            <Moon size={20} className="text-brand-tertiary" />
            <span className="text-[14px] font-bold text-brand-tertiary uppercase tracking-wider">
              SLEEP
            </span>
          </div>
          <div className="mt-5 space-y-2">
            <div className="text-[22px] font-bold leading-tight text-white sm:text-2xl">
              {Math.floor(sleep.durationMinutes / 60)}h {sleep.durationMinutes % 60}m
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-tertiary font-medium">
              <span className="h-2 w-2 rounded-full bg-brand-tertiary animate-pulse" />
              <span>좋음</span>
            </div>
          </div>
        </motion.article>

        {/* Calories Card */}
        <motion.article
          onClick={handleStepsCardClick}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#1c1b1b] p-5 shadow-lg transition duration-300 hover:border-brand-secondary/40 hover:shadow-brand-secondary/5"
        >
          <div className="absolute -right-10 -bottom-10 h-24 w-24 rounded-full bg-brand-secondary/10 blur-2xl" />
          <div className="flex items-center gap-2.5">
            <Flame size={20} className="text-brand-secondary fill-brand-secondary/10" />
            <span className="text-[14px] font-bold text-brand-secondary uppercase tracking-wider">
              CALORIES
            </span>
          </div>
          <div className="mt-5 space-y-2">
            <div className="text-[22px] font-bold leading-tight text-white sm:text-2xl">
              {activity.caloriesKcal.toLocaleString()} kcal
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-secondary font-medium">
              <span className="h-2 w-2 rounded-full bg-brand-secondary animate-pulse" />
              <span>목표 달성 중</span>
            </div>
          </div>
        </motion.article>
      </div>

      {/* Recent History Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white select-none">
            최근 활동
          </h3>
          <span 
            onClick={handleViewAllClick}
            id="all-view-btn"
            className="cursor-pointer text-xs font-bold text-brand-primary active:scale-95 transition-all py-1 px-2 hover:bg-white/5 rounded-md"
          >
            모두 보기
          </span>
        </div>

        <div className="space-y-2.5">
          {/* Active Jogging */}
          <div 
            onClick={handleStepsCardClick}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-[#1c1b1b]/60 p-4 cursor-pointer hover:bg-white/5 group transition"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                <Footprints size={20} className="stroke-[2.25]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white group-hover:text-brand-primary transition">
                  아침 조깅 - {activity.distanceMiles}km
                </h4>
                <p className="text-xs text-gray-500">
                  오늘 오전 7:30
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-600 group-hover:text-white transition duration-200" />
          </div>

          {/* Restorative Sleep */}
          <div 
            onClick={handleSleepCardClick}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-[#1c1b1b]/60 p-4 cursor-pointer hover:bg-white/5 group transition"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tertiary/10 text-brand-tertiary">
                <Moon size={20} className="stroke-[2.25]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white group-hover:text-brand-tertiary transition">
                  회복적인 수면 - 7시간 20분
                </h4>
                <p className="text-xs text-gray-500">
                  어제 밤 10:30 - 오늘 오전 6:45
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-600 group-hover:text-white transition duration-200" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

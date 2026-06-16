import React, { useState } from 'react';
import { useAppState } from './AppContext';
import { Compass, Clock, Flame, Milestone, Footprints, Moon, User, ArrowUp, Activity, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export const ActivityScreen: React.FC = () => {
  const { activity, navigate, updateActivity } = useAppState();
  const [activeTab, setActiveTab] = useState<'day' | 'week'>('day');

  // Multipliers for responsive interactions
  const handleQuickWorkout = (type: 'run' | 'cycle' | 'stairs') => {
    if (type === 'run') {
      updateActivity({
        distanceMiles: Math.round((activity.distanceMiles + 3.2) * 10) / 10,
        activeMinutes: activity.activeMinutes + 32,
        caloriesKcal: activity.caloriesKcal + 310,
        steps: activity.steps + 6400,
      });
    } else if (type === 'cycle') {
      updateActivity({
        distanceMiles: Math.round((activity.distanceMiles + 12.5) * 10) / 10,
        activeMinutes: activity.activeMinutes + 45,
        caloriesKcal: activity.caloriesKcal + 420,
      });
    } else {
      updateActivity({
        floors: activity.floors + 12,
        activeMinutes: activity.activeMinutes + 15,
        caloriesKcal: activity.caloriesKcal + 110,
        steps: activity.steps + 1500,
      });
    }
  };

  // Hourly intensity visual height percentage
  const intensityData = [
    { hour: '6 AM', intensity: 25, active: false },
    { hour: '8 AM', intensity: 45, active: false },
    { hour: '10 AM', intensity: 35, active: false },
    { hour: '12 PM', intensity: 85, active: true }, // high peak!
    { hour: '2 PM', intensity: 60, active: false },
    { hour: '4 PM', intensity: 55, active: false },
    { hour: '6 PM', intensity: 75, active: false },
    { hour: '8 PM', intensity: 40, active: false },
    { hour: '10 PM', intensity: 30, active: false },
    { hour: '12 AM', intensity: 70, active: true }, // late walk!
  ];

  return (
    <div className="min-h-screen w-full bg-[#131313] text-white">
      {/* Sidebar for Desktop navigation (aside element) */}
      <aside 
        id="activity-sidebar"
        className="hidden"
      >
        <div className="hidden items-center gap-2.5 px-2">
          <Activity className="h-6 w-6 text-brand-primary animate-pulse" />
          <span className="text-xl font-bold tracking-tight text-white">VitalStep Menu</span>
        </div>

        <nav className="flex items-center gap-1">
          {/* Dashboard connection (none transition) */}
          <a
            id="aside-nav-home"
            onClick={() => navigate('dashboard', 'none')}
            className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            <span className="hidden">home</span>
            <span className="text-sm font-semibold">Home Dashboard</span>
          </a>

          {/* Sleep connection (none transition) */}
          <a
            id="aside-nav-sleep"
            onClick={() => navigate('sleep', 'none')}
            className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            <span className="hidden">bedtime</span>
            <span className="text-sm font-semibold">Sleep Analysis</span>
          </a>

          {/* Profile connection (none transition) */}
          <a
            id="aside-nav-profile"
            onClick={() => navigate('profile', 'none')}
            className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            <span className="hidden">person</span>
            <span className="text-sm font-semibold">My Profile</span>
          </a>
        </nav>
      </aside>

      {/* Main active content */}
      <div className="px-5 pb-28 pt-4">
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1.5">
            Activity Overview
          </h2>
          <p className="text-sm text-gray-400">
            Today's performance and recent trends.
          </p>
        </motion.div>

        {/* 4 Metric Cards Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Card 1: DISTANCE */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1c1b1b] p-5 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                DISTANCE
              </span>
              <Milestone size={18} className="text-brand-primary" />
            </div>
            <div className="mt-4">
              <span className="font-mono text-3xl font-bold text-white tracking-tight">
                {activity.distanceMiles}
              </span>
              <p className="mt-1 text-xs text-gray-500 font-medium">Miles</p>
            </div>
          </motion.div>

          {/* Card 2: ACTIVE MINS */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1c1b1b] p-5 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider">
                ACTIVE MINS
              </span>
              <Clock size={18} className="text-brand-secondary" />
            </div>
            <div className="mt-4">
              <span className="font-mono text-3xl font-bold text-white tracking-tight">
                {activity.activeMinutes}
              </span>
              <p className="mt-1 text-xs text-gray-500 font-medium">Minutes</p>
            </div>
          </motion.div>

          {/* Card 3: FLOORS */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1c1b1b] p-5 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                FLOORS
              </span>
              <ArrowUp size={18} className="text-orange-400" />
            </div>
            <div className="mt-4">
              <span className="font-mono text-3xl font-bold text-white tracking-tight">
                {activity.floors}
              </span>
              <p className="mt-1 text-xs text-gray-500 font-medium">Floors</p>
            </div>
          </motion.div>

          {/* Card 4: CALORIES */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1c1b1b] p-5 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider">
                CALORIES
              </span>
              <Flame size={18} className="text-brand-secondary" />
            </div>
            <div className="mt-4">
              <span className="font-mono text-3xl font-bold text-white tracking-tight">
                450
              </span>
              <p className="mt-1 text-xs text-gray-500 font-medium">Kcal</p>
            </div>
          </motion.div>
        </div>

        {/* Activity Intensity Chart Area */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="rounded-2xl border border-white/10 bg-[#1c1b1b] p-6 shadow-xl mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-md font-bold tracking-tight text-white uppercase sm:text-lg">
              Activity Intensity
            </h3>

            {/* Toggle Chips with XPath for WEEK */}
            <div className="flex items-center gap-1.5 rounded-lg bg-white/5 p-1">
              <button
                onClick={() => setActiveTab('day')}
                className={`rounded-md px-3.5 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                  activeTab === 'day' 
                    ? 'bg-brand-primary text-[#002e6a] shadow-xs' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                DAY
              </button>
              
              {/* WEEK Selector triggers VitalStep 데이터 보관함 (push transition) */}
              <button
                id="intensity-week-toggle"
                onClick={() => {
                  setActiveTab('week');
                  navigate('data_archive', 'push');
                }}
                className={`rounded-md px-3.5 py-1 text-xs font-semibold uppercase tracking-wide transition hover:bg-white/10`}
              >
                <span className="text-xs font-semibold text-gray-100 hover:text-white">WEEK</span>
              </button>
            </div>
          </div>

          {/* Graphical Bars Chart representing hourly slots */}
          <div className="flex h-36 items-end justify-between gap-1 border-b border-white/5 pb-2 pt-4 px-1">
            {intensityData.map((slot, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="relative w-full max-w-[14px]">
                  {/* Glowing active animation */}
                  {slot.active && (
                    <div className="absolute -inset-1 rounded-full bg-brand-primary/20 blur-xs" />
                  )}
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${slot.intensity}%` }}
                    transition={{ duration: 0.6, delay: index * 0.03 }}
                    className={`w-full rounded-t-sm transition-all duration-300 ${
                      slot.active 
                        ? 'bg-brand-primary shadow-xs' 
                        : 'bg-white/15 hover:bg-white/30'
                    }`}
                  />
                </div>
                <span className="text-[10px] text-gray-500 font-mono select-none">
                  {slot.hour}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Workouts list with simulation trigger */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              Recent Workouts
            </h3>
            <span className="text-xs text-gray-500">운동을 클릭해 기록을 추가하세요</span>
          </div>

          <div className="space-y-3">
            {/* Run Workout */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleQuickWorkout('run')}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1c1b1b] p-4.5 cursor-pointer hover:border-brand-primary/35 transition"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Footprints size={20} className="stroke-[2]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[15px] font-bold text-white">Morning Run</h4>
                  <p className="text-xs text-gray-500">Today, 6:30 AM</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="font-mono text-sm font-bold text-white">3.2 mi</div>
                <div className="font-mono text-xs text-brand-secondary font-medium">32:15</div>
              </div>
            </motion.div>

            {/* Cycle Workout */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleQuickWorkout('cycle')}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1c1b1b] p-4.5 cursor-pointer hover:border-brand-secondary/35 transition"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-secondary/10 text-brand-secondary">
                  <Milestone size={20} className="stroke-[2]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[15px] font-bold text-white">Evening Cycle</h4>
                  <p className="text-xs text-gray-500">Yesterday, 5:45 PM</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="font-mono text-sm font-bold text-white">12.5 mi</div>
                <div className="font-mono text-xs text-brand-secondary font-medium">45:20</div>
              </div>
            </motion.div>

            {/* Stairs climb Workout */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleQuickWorkout('stairs')}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1c1b1b] p-4.5 cursor-pointer hover:border-orange-400/35 transition"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-400/10 text-orange-400">
                  <ArrowUp size={20} className="stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[15px] font-bold text-white">Laps</h4>
                  <p className="text-xs text-gray-500">Mon, 7:00 AM</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="font-mono text-sm font-bold text-white">1.0 mi</div>
                <div className="font-mono text-xs text-brand-secondary font-medium">40:00</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

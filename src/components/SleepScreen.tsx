import React, { useState } from 'react';
import { useAppState } from './AppContext';
import { Moon, Star, Clock, Home, Compass, Sparkles, ChevronRight, Bed } from 'lucide-react';
import { motion } from 'motion/react';

export const SleepScreen: React.FC = () => {
  const { sleep, profile, navigate, updateSleep } = useAppState();
  const [selectedDay, setSelectedDay] = useState<number>(5); // Default Sat is active (index 5)

  // Sleep time values map corresponds to Mon..Sun
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const durations = ['7.0h', '7.6h', '6.6h', '7.5h', '8.0h', '8.25h', '6.8h'];

  // Calculate duration strings
  const hours = Math.floor(sleep.durationMinutes / 60);
  const minutes = sleep.durationMinutes % 60;

  // Let's add an interactive sleep logging widget
  const handleLogExtraNap = () => {
    updateSleep({
      durationMinutes: sleep.durationMinutes + 60, // Add 1 hour sleep
      qualityScore: Math.min(sleep.qualityScore + 4, 100),
      deepSleepMinutes: sleep.deepSleepMinutes + 15,
      lightSleepMinutes: sleep.lightSleepMinutes + 35,
      remSleepMinutes: sleep.remSleepMinutes + 10,
    });
  };

  return (
    <div className="flex flex-col gap-6 px-5 pb-28 pt-4">
      {/* Target header for Sleep page containing sub-navigation widgets */}
      <header className="flex items-center justify-between border-b border-white/5 bg-[#131313]/50 pb-3">
        <div className="flex items-center gap-2">
          <Moon size={22} className="text-brand-tertiary" />
          <h1 className="text-xl font-bold tracking-tight text-white select-none">
            VitalStep
          </h1>
        </div>

        {/* Navigation block inside header that satisfies the requested XPaths */}
        <nav className="flex items-center gap-3">
          {/* Dashboard shortcut */}
          <a
            id="sleep-header-nav-home"
            onClick={() => navigate('dashboard', 'none')}
            title="Home"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-250 cursor-pointer"
          >
            <span className="hidden">home</span>
            <Home size={18} className="stroke-[2]" />
          </a>

          {/* Activity statistics shortcut */}
          <a
            id="sleep-header-nav-run"
            onClick={() => navigate('activity', 'none')}
            title="Activity Statistics"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-250 cursor-pointer"
          >
            <span className="hidden">directions_run</span>
            <Compass size={18} className="stroke-[2]" />
          </a>
        </nav>
      </header>

      {/* Screen Title Block */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1"
      >
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Sleep Analysis
        </h2>
        <p className="text-sm text-gray-400">
          Last night • 10:30 PM - 6:45 AM
        </p>
      </motion.div>

      {/* Card 1: Sleep Quality Score & Ring */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1c1b1b] p-6 shadow-xl"
      >
        {/* Soft violet backdrop glow */}
        <div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-brand-tertiary/10 blur-2xl animate-pulse" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-brand-tertiary font-bold text-xs uppercase tracking-wider">
            <Star size={16} className="fill-brand-tertiary/20" />
            <span>SLEEP QUALITY</span>
          </div>
          <span className="rounded-full bg-brand-tertiary/15 px-3 py-1 text-[11px] font-bold tracking-wider text-brand-tertiary uppercase">
            OPTIMAL
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="space-y-2">
            <div>
              <span className="font-mono text-5xl font-extrabold text-white tracking-tight">
                {sleep.qualityScore}
              </span>
              <span className="text-lg text-gray-500 font-semibold"> /100</span>
            </div>
            <p className="text-sm text-gray-400 font-medium">
              Your restorative sleep is improving.
            </p>
          </div>

          {/* Interactive crescent moon visual inside glowing ring */}
          <div 
            onClick={handleLogExtraNap}
            className="group relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full transition active:scale-95"
            title="Log extra sleep hours"
          >
            {/* outer radial ripple */}
            <div className="absolute inset-0 rounded-full bg-brand-tertiary/5 scale-110 opacity-50 group-hover:bg-brand-tertiary/10 transition-all" />
            <svg className="absolute inset-0 h-full w-full rotate-[-90deg]">
              <circle
                cx="40"
                cy="40"
                r="32"
                className="stroke-white/10 fill-none"
                strokeWidth="5"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                className="stroke-brand-tertiary fill-none transition-all duration-500"
                strokeWidth="5"
                strokeDasharray="201"
                strokeDashoffset={201 - (201 * sleep.qualityScore) / 100}
                strokeLinecap="round"
              />
            </svg>
            <Moon size={22} className="relative text-brand-tertiary fill-brand-tertiary/10 group-hover:scale-110 transition duration-300" />
          </div>
        </div>
      </motion.div>

      {/* Card 2: Total Duration Week Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl border border-white/10 bg-[#1c1b1b] p-6 shadow-xl"
      >
        <div className="flex items-center gap-2.5 text-gray-400 font-bold text-xs uppercase tracking-wider mb-6">
          <Clock size={16} />
          <span>TOTAL DURATION</span>
        </div>

        <div className="space-y-6">
          <div className="font-mono text-4xl font-bold text-white tracking-tight">
            {hours}h <span className="text-3xl text-gray-400 font-semibold">{minutes}m</span>
          </div>

          {/* Graphical Sleep Bars */}
          <div className="flex h-24 items-end justify-between gap-1 px-1">
            {sleep.weeklyDuration.map((value, index) => {
              const isActive = index === selectedDay;
              const heightPct = Math.min(((value - 300) / 300) * 100 + 40, 100);

              return (
                <div 
                  key={index} 
                  onClick={() => setSelectedDay(index)}
                  className="flex flex-1 flex-col items-center gap-2 cursor-pointer group"
                >
                  <div className="relative w-full max-w-[20px] h-14 flex items-end">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPct}%` }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        isActive 
                          ? 'bg-brand-tertiary shadow-xs shadow-brand-tertiary/30' 
                          : 'bg-white/10 group-hover:bg-white/20'
                      }`}
                    />
                  </div>
                  <span className={`text-xs font-mono font-semibold transition ${
                    isActive ? 'text-brand-tertiary scale-110' : 'text-gray-500 hover:text-gray-300'
                  }`}>
                    {days[index]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Section 3: Sleep Stages proportion segment */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-bold text-white tracking-tight">
          Sleep Stages
        </h3>

        <div className="rounded-2xl border border-white/5 bg-[#1c1b1b]/80 p-5 space-y-5">
          {/* Stacked Horizon Bar */}
          <div className="flex h-4 overflow-hidden rounded-full bg-white/5 shadow-inner">
            <div className="bg-brand-tertiary" style={{ width: '20%' }} title="Deep Sleep 20%" />
            <div className="bg-[#b395ff]" style={{ width: '40%' }} title="Light Sleep 40%" />
            <div className="bg-[#8e66ff]" style={{ width: '25%' }} title="REM Sleep 25%" />
            <div className="bg-white/15" style={{ width: '15%' }} title="Awake 15%" />
          </div>

          <div className="flex justify-between text-[11px] text-gray-500 font-mono">
            <span>10:30 PM</span>
            <span>6:45 AM</span>
          </div>

          {/* Detailed Lists */}
          <div className="space-y-3.5 pt-2 border-t border-white/5">
            {/* Deep Sleep */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-4 w-1.5 rounded-full bg-brand-tertiary" />
                <span className="text-[14px] font-semibold text-white">DEEP SLEEP</span>
              </div>
              <div className="flex items-center gap-4 text-right">
                <span className="font-mono text-sm text-gray-400">1h 45m</span>
                <span className="font-mono text-xs text-gray-500 w-10 font-bold">20%</span>
              </div>
            </div>

            {/* Light Sleep */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-4 w-1.5 rounded-full bg-[#b395ff]" />
                <span className="text-[14px] font-semibold text-white">LIGHT SLEEP</span>
              </div>
              <div className="flex items-center gap-4 text-right">
                <span className="font-mono text-sm text-gray-400">3h 30m</span>
                <span className="font-mono text-xs text-gray-500 w-10 font-bold">40%</span>
              </div>
            </div>

            {/* REM Sleep */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-4 w-1.5 rounded-full bg-[#8e66ff]" />
                <span className="text-[14px] font-semibold text-white">REM SLEEP</span>
              </div>
              <div className="flex items-center gap-4 text-right">
                <span className="font-mono text-sm text-gray-400">2h 15m</span>
                <span className="font-mono text-xs text-gray-500 w-10 font-bold">25%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAppState } from './AppContext';
import { User, Shield, Radio, Key, RefreshCw, CheckCircle, Save, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProfileScreen: React.FC = () => {
  const { profile, updateProfile, navigate } = useAppState();
  const [userName, setUserName] = useState(profile.name);
  const [userAge, setUserAge] = useState(profile.age);
  const [userWeight, setUserWeight] = useState(profile.weight);
  const [userHeight, setUserHeight] = useState(profile.height);
  
  const [stepsGoal, setStepsGoal] = useState(profile.stepsGoal);
  const [sleepGoal, setSleepGoal] = useState(profile.sleepGoalMinutes / 60); // in hours
  const [calorieGoal, setCalorieGoal] = useState(profile.calorieGoal);

  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: userName,
      age: Number(userAge),
      weight: Number(userWeight),
      height: Number(userHeight),
      stepsGoal: Number(stepsGoal),
      sleepGoalMinutes: Number(sleepGoal) * 60,
      calorieGoal: Number(calorieGoal)
    });
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 px-5 pb-28 pt-4">
      {/* Header element to click: parent of h1 text matches xpath */}
      <header className="flex items-center justify-between border-b border-white/5 bg-[#131313]/40 pb-3">
        {/* Parent container on click navigates back to dashboard with a push_back transition */}
        <div 
          onClick={() => navigate('dashboard', 'push_back')}
          className="cursor-pointer flex items-center gap-2 text-white hover:text-brand-primary transition"
        >
          <h1 className="text-xl font-bold">VitalStep</h1>
        </div>
        <div className="rounded-full bg-white/5 p-1.5 text-gray-500">
          <Settings size={18} />
        </div>
      </header>

      {/* Profile Overview Title */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1.5"
      >
        <h2 className="text-3xl font-bold tracking-tight text-white">
          My Profile
        </h2>
        <p className="text-sm text-gray-400">
          Manage your goals, biological measurements, and connected active metrics.
        </p>
      </motion.div>

      {/* Success feedback toast */}
      <AnimatePresence>
        {savedFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2.5 rounded-xl bg-[#00a572]/20 border border-[#00a572]/50 p-4 text-xs font-semibold text-[#4edea3]"
          >
            <CheckCircle size={16} />
            <span>생체 상태 및 목표 데이터가 성공적으로 동기화되었습니다!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card User Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-[#1c1b1b] p-6 shadow-xl space-y-4"
        >
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary opacity-70 blur-xs" />
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&fit=crop"
                alt="Account portrait"
                referrerPolicy="no-referrer"
                className="relative h-16 w-16 rounded-full border border-white/20 object-cover"
              />
            </div>
            
            <div className="space-y-1.5 flex-1">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-transparent text-xl font-bold text-white border-b border-transparent focus:border-brand-primary outline-none py-0.5 w-full transition"
                placeholder="Name"
              />
              <p className="text-xs text-gray-400">{profile.email}</p>
            </div>
          </div>

          {/* Quick biological values inputs */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5 text-center">
            {/* Age */}
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Age</span>
              <div className="flex items-center justify-center gap-1">
                <input
                  type="number"
                  value={userAge}
                  onChange={(e) => setUserAge(Number(e.target.value))}
                  className="bg-zinc-800 rounded-md py-1 px-1.5 w-12 font-mono text-sm font-bold text-center text-white outline-none focus:ring-1 focus:ring-brand-primary"
                />
                <span className="text-xs text-gray-500 font-medium">세</span>
              </div>
            </div>

            {/* Height */}
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Height</span>
              <div className="flex items-center justify-center gap-1">
                <input
                  type="number"
                  value={userHeight}
                  onChange={(e) => setUserHeight(Number(e.target.value))}
                  className="bg-zinc-800 rounded-md py-1 px-1.5 w-14 font-mono text-sm font-bold text-center text-white outline-none focus:ring-1 focus:ring-brand-primary"
                />
                <span className="text-xs text-gray-500 font-medium">cm</span>
              </div>
            </div>

            {/* Weight */}
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Weight</span>
              <div className="flex items-center justify-center gap-1">
                <input
                  type="number"
                  value={userWeight}
                  onChange={(e) => setUserWeight(Number(e.target.value))}
                  className="bg-zinc-800 rounded-md py-1 px-1.5 w-14 font-mono text-sm font-bold text-center text-white outline-none focus:ring-1 focus:ring-brand-primary"
                />
                <span className="text-xs text-gray-500 font-medium">kg</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Biometric Slider Goals Setting */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl border border-white/10 bg-[#1c1b1b] p-6 shadow-xl space-y-6"
        >
          <h3 className="text-md font-bold tracking-tight text-white uppercase text-xs text-gray-500 border-b border-white/5 pb-2.5">
            YOUR TARGET MARKS
          </h3>

          {/* Goal 1: Steps */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-bold text-white">
              <span>Steps Goal</span>
              <span className="font-mono text-brand-primary">{stepsGoal.toLocaleString()} steps</span>
            </div>
            <input 
              type="range" 
              min="3000" 
              max="20000" 
              step="5000"
              value={stepsGoal}
              onChange={(e) => setStepsGoal(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />
          </div>

          {/* Goal 2: Sleep Duration */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-bold text-white">
              <span>Sleep Goal</span>
              <span className="font-mono text-brand-tertiary">{sleepGoal} hours</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="10" 
              step="0.5"
              value={sleepGoal}
              onChange={(e) => setSleepGoal(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-tertiary"
            />
          </div>

          {/* Goal 3: Calories Burn */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-bold text-white">
              <span>Calories Goal</span>
              <span className="font-mono text-brand-secondary">{calorieGoal.toLocaleString()} kcal</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="4000" 
              step="200"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-secondary"
            />
          </div>
        </motion.div>

        {/* Section 4: Connected devices */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-[#1c1b1b]/80 p-5 space-y-4"
        >
          <div className="flex items-center gap-2.5 text-xs font-bold text-gray-500 uppercase tracking-wider pb-1.5 border-b border-white/5">
            <Radio size={14} className="text-brand-secondary animate-pulse" />
            <span>Connected Biometric Hardware</span>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span className="h-2 w-2 rounded-full bg-brand-secondary fill-brand-secondary" />
              <span>Apple Watch Series 9</span>
            </div>
            <span className="font-mono text-brand-secondary font-bold">CONNECTED</span>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span className="h-2 w-2 rounded-full bg-brand-secondary" />
              <span>Smart Scale Analyzer</span>
            </div>
            <span className="font-mono text-brand-secondary font-bold">CONNECTED</span>
          </div>
        </motion.div>

        {/* Form CTA action button */}
        <button
          type="submit"
          className="w-full py-4.5 bg-gradient-to-r from-brand-primary to-[#4edea3] hover:from-[#adc6ff]/90 hover:to-[#4edea3]/90 text-[#002e6a] text-sm font-bold uppercase tracking-wider rounded-xl transition duration-300 flex items-center justify-center gap-2 shadow-lg"
        >
          <Save size={18} />
          <span>Save Profile Changes</span>
        </button>
      </form>
    </div>
  );
};

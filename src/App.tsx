import React from 'react';
import { AppProvider, useAppState } from './components/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DashboardScreen } from './components/DashboardScreen';
import { ActivityScreen } from './components/ActivityScreen';
import { SleepScreen } from './components/SleepScreen';
import { DataHistoryScreen } from './components/DataHistoryScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AnimatePresence, motion } from 'motion/react';

const ScreenRenderer: React.FC = () => {
  const { currentScreen, transitionDirection } = useAppState();

  // Animation Variant definitions
  const getVariants = () => {
    switch (transitionDirection) {
      case 'push':
        return {
          initial: { x: '100%', opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '-100%', opacity: 0 },
          transition: { type: 'spring', damping: 26, stiffness: 220 },
        };
      case 'push_back':
        return {
          initial: { x: '-100%', opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '100%', opacity: 0 },
          transition: { type: 'spring', damping: 26, stiffness: 220 },
        };
      case 'slide_up':
        return {
          initial: { y: '100%', opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: '100%', opacity: 0 },
          transition: { type: 'spring', damping: 25, stiffness: 180 },
        };
      case 'none':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.15 },
        };
    }
  };

  const currentVariants = getVariants();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'activity':
        return <ActivityScreen />;
      case 'sleep':
        return <SleepScreen />;
      case 'data_archive':
        return <DataHistoryScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  // Determine standard title values according to active windows for consistent header styling
  const getHeaderTitle = () => {
    switch (currentScreen) {
      case 'dashboard':
        return 'VitalStep';
      case 'activity':
        return 'Activity';
      case 'sleep':
        return 'Sleep';
      case 'data_archive':
        return 'Data History';
      case 'profile':
        return 'My Profile';
      default:
        return 'VitalStep';
    }
  };

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col overflow-x-hidden bg-[#131313] pb-safe text-white shadow-2xl">
      {/* Top Header Section. Hidden on Profile and Sleep screens to use their custom robust headers */}
      {currentScreen !== 'profile' && currentScreen !== 'sleep' && (
        <Header title={getHeaderTitle()} showProfile={currentScreen !== 'profile'} />
      )}

      {/* Screen container with transition elements */}
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentScreen}
            initial={currentVariants.initial}
            animate={currentVariants.animate}
            exit={currentVariants.exit}
            transition={currentVariants.transition}
            className="w-full h-full"
          >
            {renderActiveScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Panel */}
      <Navigation />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div id="vitalstep-app-root" className="min-h-screen w-full bg-black/40 flex items-center justify-center py-0 sm:py-6 md:py-12 px-0 sm:px-4">
        <ScreenRenderer />
      </div>
    </AppProvider>
  );
}

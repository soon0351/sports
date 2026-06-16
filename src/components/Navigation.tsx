import React from 'react';
import { useAppState } from './AppContext';
import { Home, Compass, Moon, User } from 'lucide-react';
import { ScreenType } from '../types';

export const Navigation: React.FC = () => {
  const { currentScreen, navigate } = useAppState();

  const navItems = [
    { id: 'dashboard' as ScreenType, label: 'Home', icon: Home },
    { id: 'activity' as ScreenType, label: 'Activity', icon: Compass },
    { id: 'sleep' as ScreenType, label: 'Sleep', icon: Moon },
    { id: 'profile' as ScreenType, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-white/10 bg-[#131313]/90 py-3 pb-safe backdrop-blur-xl md:py-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id || 
          (item.id === 'dashboard' && currentScreen === 'data_archive'); // home is loosely active for data archive too

        return (
          <button
            key={item.id}
            id={`nav-btn-${item.id}`}
            onClick={() => navigate(item.id, 'none')}
            className={`group flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
              isActive 
                ? 'text-brand-primary' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <div className={`relative rounded-full p-1 transition-all duration-300 ${
              isActive ? 'scale-110 text-brand-primary' : 'group-hover:scale-105'
            }`}>
              <Icon size={22} className="stroke-[1.75]" />
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-primary" />
              )}
            </div>
            <span className="text-[11px] font-medium tracking-wide uppercase sm:text-xs">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

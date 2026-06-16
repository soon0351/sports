import React from 'react';
import { useAppState } from './AppContext';
import { Bell } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showProfile?: boolean;
  profileTransition?: 'none' | 'slide_up' | 'push';
}

export const Header: React.FC<HeaderProps> = ({ 
  title = "VitalStep", 
  showProfile = true,
  profileTransition = 'slide_up'
}) => {
  const { profile, notificationCount, clearNotifications, navigate } = useAppState();

  const handleProfileClick = () => {
    navigate('profile', profileTransition);
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/5 bg-[#131313]/80 px-5 py-4 backdrop-blur-md">
      {showProfile ? (
        <div 
          onClick={handleProfileClick}
          className="group relative cursor-pointer"
        >
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary opacity-70 blur-xs transition group-hover:opacity-100" />
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&fit=crop"
            alt="Profile"
            id="header-profile-img"
            referrerPolicy="no-referrer"
            className="relative h-10 w-10 rounded-full border border-white/20 object-cover"
          />
        </div>
      ) : (
        <div className="w-10 h-10" />
      )}

      <h1 
        id="header-app-title"
        className="text-[20px] font-bold tracking-tight text-white select-none cursor-pointer"
        onClick={() => navigate('dashboard', 'push_back')}
      >
        {title}
      </h1>

      <button 
        id="header-notif-btn"
        className="relative rounded-full p-2 text-gray-400 hover:bg-white/5 hover:text-white transition duration-200"
        onClick={() => {
          if (notificationCount > 0) {
            clearNotifications();
          }
        }}
      >
        <Bell size={22} className="stroke-[1.75]" />
        {notificationCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-secondary text-[9px] font-bold text-[#002e6a]">
            {notificationCount}
          </span>
        )}
      </button>
    </header>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Bell, 
  Sun,
  Moon,
  LogOut, 
  Sparkles,
  Menu
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentUser, 
    activityLogs, 
    theme,
    toggleTheme,
    currentTab,
    sidebarOpen,
    setSidebarOpen
  } = useApp();
  const { logout, user: authUser } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);

  const getTabTitle = () => {
    switch (currentTab) {
      case 'overview': return { title: 'Overview & Analytics', desc: 'Real-time telemetry and KPI metrics for Dhara Divine Awards 2026' };
      case 'nominations': return { title: 'Award Nominations Vetting', desc: 'Manage submissions, assign jury review, and shortlist candidates' };
      case 'donations': return { title: 'Donations & Sponsors Ledger', desc: 'Track financial offerings, CSR pledges, and generate Tax 80G Seva Patr receipts' };
      case 'delegates': return { title: 'Event Registration & Gate Control', desc: 'Verify ticket passes, scan barcodes, and monitor hall check-in capacity' };
      case 'volunteers': return { title: 'Volunteer Seva Roster', desc: 'Coordinate skill matrices, shifts, and venue logistics assignments' };
      case 'youtube-highlights': return { title: 'YouTube Video Highlights', desc: 'Manage event video highlights, speeches, and devotional recordings on the home page' };
      case 'gallery': return { title: 'Gallery Management Panel', desc: 'Add new photographs, manage categories, and update promotional gallery' };
      case 'events': return { title: 'Events & News Organizer', desc: 'Manage event highlights, add new YouTube coverage videos, and log spiritual/community seva' };
      case 'event-config': return { title: 'Passes & Tickets Pricing', desc: 'Configure delegate pass pricing, corporate sponsorship tiers, and ticketing limits' };
      case 'settings': return { title: 'Site Settings', desc: 'Configure global settings for the promotional website' };
      default: return { title: 'Dhara Divine Awards Dashboard', desc: 'Admin Portal' };
    }
  };

  const headerInfo = getTabTitle() || { title: 'Dashboard', desc: '' };

  return (
    <header className="sticky top-0 z-20 bg-[#FDFBF8]/90 dark:bg-[#121310]/90 backdrop-blur-md border-b border-[#EAE8E3] dark:border-[#2E302A] px-3 sm:px-8 py-3.5 sm:py-5 shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between gap-2 sm:gap-6">
        {/* Left: Hamburger & Page Title & Context */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          {/* Hamburger Menu Toggle for Mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-[#F5F3EE] dark:bg-[#1B1C19] text-[#534436] dark:text-[#D1D5DB] hover:text-[#401C0C] dark:hover:text-[#FFD27F] lg:hidden cursor-pointer shrink-0"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          
          <div className="min-w-0">
            <h1 className="text-[14px] sm:text-xl font-bold font-serif text-[#1B1C19] dark:text-[#F3F4F6] tracking-tight flex items-center gap-2 leading-tight">
              {headerInfo.title}
            </h1>
            <p className="hidden sm:block text-[10px] sm:text-xs text-[#867463] dark:text-[#9CA3AF] font-medium mt-0.5 leading-normal max-w-xl">
              {headerInfo.desc}
            </p>
          </div>
        </div>

        {/* Right: Notifications, Theme Switcher & User */}
        <div className="flex items-center gap-2.5 sm:gap-5">


          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-[#F5F3EE] dark:bg-[#1B1C19] text-[#534436] dark:text-[#D1D5DB] hover:text-[#401C0C] dark:hover:text-[#FFD27F] hover:bg-[#EAE8E3] dark:hover:bg-[#2E302A] transition-all relative cursor-pointer"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D9762E] ring-2 ring-white dark:ring-[#121310] animate-pulse"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="fixed sm:absolute inset-x-4 sm:inset-x-auto sm:right-0 mt-2 sm:w-80 bg-white dark:bg-[#1B1C19] rounded-2xl shadow-xl border border-[#EAE8E3] dark:border-[#30312E] py-2 z-50 animate-fade-in">
                <div className="px-4 py-2 border-b border-[#F5F3EE] dark:border-[#2E302A] flex items-center justify-between">
                  <span className="font-serif font-bold text-xs text-[#1B1C19] dark:text-[#F3F4F6]">Real-time Telemetry Feed</span>
                  <span className="text-[10px] bg-[#401C0C] text-white px-2 py-0.5 rounded-full font-mono">Live</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-[#F5F3EE] dark:divide-[#2E302A]">
                  {activityLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="p-3 hover:bg-[#FDFBF8] dark:hover:bg-[#242622] transition-colors">
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 p-1 rounded bg-[#401C0C]/10 dark:bg-[#FFD27F]/10 text-[#401C0C] dark:text-[#FFD27F]">
                          <Sparkles size={12} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-xs text-[#1B1C19] dark:text-[#E5E7EB] leading-snug">{log.message}</p>
                          <span className="text-[10px] text-[#867463] dark:text-[#6B7280] font-mono mt-1 block">{log.timestamp} by {log.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 sm:gap-4 pl-2.5 sm:pl-4 border-l border-[#EAE8E3] dark:border-[#2E302A]">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#C9A646]/40 shadow-sm"
            />
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-[#1B1C19] dark:text-[#F3F4F6] truncate max-w-[130px]">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-[#867463] dark:text-[#9CA3AF] truncate max-w-[130px]">
                {currentUser.email}
              </div>
            </div>

            <button
              onClick={logout}
              title={`Sign out (${authUser?.username || 'admin'})`}
              className="p-2 rounded-xl text-[#867463] hover:text-[#D9762E] hover:bg-[#F5F3EE] dark:hover:bg-[#242622] transition-colors cursor-pointer ml-0 sm:ml-1"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

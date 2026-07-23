import React from 'react';
import { useApp, TabType } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Award, 
  IndianRupee, 
  QrCode, 
  Users, 
  ChevronRight,
  Image as ImageIcon,
  Calendar,
  X,
  Settings,
  Ticket,
  Building2
} from 'lucide-react';

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
}

export const Sidebar: React.FC = () => {
  const { currentTab, setCurrentTab, nominations, sidebarOpen, setSidebarOpen } = useApp();

  const pendingNominations = nominations.filter(n => n.vetting_status === 'pending').length;

  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { 
      id: 'nominations', 
      label: 'Award Nominations', 
      icon: <Award size={20} />,
      badge: pendingNominations > 0 ? pendingNominations : undefined 
    },
    { id: 'donations', label: 'Donations & Sponsors', icon: <IndianRupee size={20} /> },
    { id: 'delegates', label: 'Event Registration', icon: <QrCode size={20} /> },
    { id: 'volunteers', label: 'Volunteer Seva', icon: <Users size={20} /> },
    { 
      id: 'youtube-highlights', 
      label: 'YouTube Video', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}>
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.482 20.5 12 20.5 12 20.5s7.518 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={20} /> },
    { id: 'event-config', label: 'Passes & Tickets', icon: <Ticket size={20} /> },
    { id: 'subdomains', label: 'Subdomains Control', icon: <Building2 size={20} /> },
    { id: 'settings', label: 'Site Settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile Sidebar Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-[#281006]/45 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      <aside 
        style={{ height: 'calc(100dvh / 1.1)' }}
        className={`bg-[#FBF9F4] dark:bg-[#151613] border-r border-[#EAE8E3] dark:border-[#2E302A] flex flex-col transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.02)] fixed inset-y-0 left-0 z-50 w-72 lg:sticky lg:top-0 lg:z-30 lg:w-72 lg:translate-x-0 ${
          sidebarOpen 
            ? 'translate-x-0' 
            : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-3 lg:p-6 border-b border-[#EAE8E3] dark:border-[#2E302A] bg-[#401C0C] shadow-inner relative">
          <div className="flex flex-col gap-2 items-center text-center">
            {/* Desktop / Expanded Logo */}
            <img 
              src="/logo.png" 
              alt="Dhara Foundations" 
              width={160}
              height={80}
              className={`h-20 w-auto object-contain transition-transform duration-300 hover:scale-105 ${
                sidebarOpen ? 'block' : 'hidden lg:block'
              }`}
              style={{ filter: 'drop-shadow(0 2px 10px rgba(201, 166, 70, 0.5))' }}
            />
            {/* Mobile / Collapsed Logo */}
            <img 
              src="/logo.png" 
              alt="Dhara Foundations" 
              width={40}
              height={40}
              className={`h-10 w-10 object-contain transition-transform duration-300 hover:scale-105 ${
                sidebarOpen ? 'hidden' : 'block lg:hidden'
              }`}
              style={{ filter: 'drop-shadow(0 2px 8px rgba(201, 166, 70, 0.5))' }}
            />
            <p className={`text-[9px] font-bold tracking-widest uppercase text-[#FFD27F] mt-1 ${
              sidebarOpen ? 'block' : 'hidden lg:block'
            }`}>
              Divine Awards 2026 • Admin
            </p>
          </div>
          
          {/* Close button for mobile menu */}
          {sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 lg:hidden cursor-pointer"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <div className="p-2 lg:p-4 pb-12 space-y-1.5 overflow-y-auto flex-1 custom-scrollbar">
          <div className={`px-3 py-2 text-[11px] font-semibold tracking-wider text-[#867463] dark:text-[#6B7280] uppercase ${
            sidebarOpen ? 'block' : 'hidden lg:block'
          }`}>
            Workspaces & Operations
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setSidebarOpen(false); // Collapse sidebar drawer on selection
                  }}
                  className={`w-full flex items-center px-2.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group ${
                    sidebarOpen ? 'justify-between' : 'justify-center lg:justify-between'
                  } ${
                    isActive
                      ? 'bg-[#401C0C] dark:bg-[#5C2913] text-white shadow-md shadow-[#401C0C]/15 font-semibold'
                      : 'text-[#534436] dark:text-[#D1D5DB] hover:bg-[#F5F3EE] dark:hover:bg-[#242622] hover:text-[#401C0C] dark:hover:text-[#FFD27F]'
                  }`}
                >
                  <div className="flex items-center gap-3 relative">
                    <span className={`transition-colors duration-200 ${
                      isActive ? 'text-[#FFD27F]' : 'text-[#867463] dark:text-[#9CA3AF] group-hover:text-[#401C0C] dark:group-hover:text-[#FFD27F]'
                    }`}>
                      {item.icon}
                    </span>
                    {item.badge && !sidebarOpen && (
                      <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-[#D9762E] lg:hidden animate-pulse"></span>
                    )}
                    <span className={`truncate ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>{item.label}</span>
                  </div>
                  
                  <div className={`${sidebarOpen ? 'flex' : 'hidden lg:flex'} items-center gap-1.5`}>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        isActive 
                          ? 'bg-[#D9762E] text-white' 
                          : 'bg-[#FFD27F]/40 dark:bg-[#D9762E]/30 text-[#8A5000] dark:text-[#FFD27F]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight size={16} className="text-[#FFD27F]" />}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

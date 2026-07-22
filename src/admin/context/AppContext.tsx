import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Nomination, Donation, Delegate, Volunteer, Enquiry, ActivityLog, 
  AdminRole, VettingStatus, VolunteerStatus, EnquiryStatus, StaffMember 
} from '../types';
import { 
  mockStaff
} from '../data/mockData';

export type TabType = 'overview' | 'nominations' | 'donations' | 'delegates' | 'volunteers' | 'youtube-highlights' | 'gallery' | 'events' | 'event-config' | 'settings';

interface AppContextType {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentRole: AdminRole;
  setCurrentRole: (role: AdminRole) => void;
  currentUser: StaffMember;
  
  // Data lists
  nominations: Nomination[];
  donations: Donation[];
  delegates: Delegate[];
  volunteers: Volunteer[];
  enquiries: Enquiry[];
  activityLogs: ActivityLog[];
  staff: StaffMember[];
  gallery: any[];
  events: any[];
  news: any[];
  siteConfig: any;
  
  // Actions
  updateNominationStatus: (id: string, status: VettingStatus, jury?: string) => Promise<void>;
  deleteNomination: (id: string) => Promise<void>;
  checkInDelegate: (passCodeOrPhone: string) => Promise<{ success: boolean; message: string; delegate?: Delegate }>;
  sendDonationReceipt: (id: string) => Promise<void>;
  updateVolunteerStatus: (id: string, status: VolunteerStatus) => Promise<void>;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => Promise<void>;
  logActivity: (type: ActivityLog['type'], message: string) => Promise<void>;
  deleteActivityLog: (id: string) => Promise<void>;
  
  // Gallery & Events & News Actions
  addGalleryImage: (img: { src: string; category: string; caption: string; priority?: number; featured?: boolean }) => Promise<void>;
  updateGalleryImage: (id: string, img: { src: string; category: string; caption: string; priority?: number; featured?: boolean }) => Promise<void>;
  deleteGalleryImage: (id: string) => Promise<void>;
  addEvent: (ev: { type: string; category: string; title: string; image: string; description: string; youtubeId?: string; duration?: string }) => Promise<void>;
  updateEvent: (id: string, ev: any) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  addNews: (item: { title: string; date?: string; image?: string; link?: string; summary?: string }) => Promise<void>;
  updateNews: (id: string, item: any) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  updateSiteConfig: (config: any) => Promise<void>;
  
  // Search
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  
  // Mobile Sidebar State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentRole, setCurrentRole] = useState<AdminRole>('Super Admin');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [staff] = useState<StaffMember[]>(mockStaff);
  const [gallery, setGallery] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [siteConfig, setSiteConfig] = useState<any>({ heroVideoUrl: '', heroVideoPoster: '' });

  const currentUser = staff.find(s => s.role === currentRole) || staff[0];

  // Fetch all database lists on mount
  useEffect(() => {
    const fetchDb = async () => {
      try {
        const res = await fetch('/api/db');
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        const db = await res.json();
        setNominations(db.nominations || []);
        setDonations(db.donations || []);
        setDelegates(db.delegates || []);
        setVolunteers(db.volunteers || []);
        setEnquiries(db.enquiries || []);
        setActivityLogs(db.activityLogs || []);
        setGallery(db.gallery || []);
        setEvents(db.events || []);
        
        try {
          const savedLocal = localStorage.getItem('dhara_dynamic_news');
          const serverNews = db.news || [];
          if (savedLocal) {
            const parsed = JSON.parse(savedLocal);
            const existingIds = new Set(parsed.map((n: any) => n.id));
            const missing = serverNews.filter((n: any) => !existingIds.has(n.id));
            const merged = [...parsed, ...missing];
            setNews(merged);
            try { localStorage.setItem('dhara_dynamic_news', JSON.stringify(merged)); } catch (e) {}
          } else {
            setNews(serverNews);
            try { localStorage.setItem('dhara_dynamic_news', JSON.stringify(serverNews)); } catch (e) {}
          }
        } catch(e) {
          setNews(db.news || []);
        }
        
        // Also fetch config
        try {
          const configRes = await fetch('/api/config');
          if (configRes.ok) {
            const configData = await configRes.json();
            setSiteConfig(configData);
          }
        } catch(e) {}
      } catch (err) {
        console.error("Failed to load backend DB:", err);
        setNominations([]);
        setDonations([]);
        setDelegates([]);
        setVolunteers([]);
        setEnquiries([]);
        setActivityLogs([]);
      }
    };
    fetchDb();
  }, []);

  // Apply theme class to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const logActivity = async (type: ActivityLog['type'], message: string) => {
    try {
      const res = await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'logActivity',
          payload: { type, message, user: currentUser.name }
        })
      });
      const data = await res.json();
      if (data.success) {
        setActivityLogs(data.db.activityLogs || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteActivityLog = async (id: string) => {
    try {
      const res = await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'deleteActivityLog',
          payload: { id }
        })
      });
      const data = await res.json();
      if (data.success) {
        setActivityLogs(data.db.activityLogs || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateNominationStatus = async (id: string, status: VettingStatus, jury?: string) => {
    try {
      const res = await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateNominationStatus',
          payload: { id, status, jury: jury || currentUser.name }
        })
      });
      const data = await res.json();
      if (data.success) {
        setNominations(data.db.nominations || []);
        setActivityLogs(data.db.activityLogs || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNomination = async (id: string) => {
    try {
      const res = await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'deleteNomination',
          payload: { id, user: currentUser.name }
        })
      });
      const data = await res.json();
      if (data.success) {
        setNominations(data.db.nominations || []);
        setActivityLogs(data.db.activityLogs || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkInDelegate = async (query: string): Promise<{ success: boolean; message: string; delegate?: Delegate }> => {
    try {
      const res = await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'checkInDelegate',
          payload: { query, user: currentUser.name }
        })
      });
      const data = await res.json();
      if (data.success) {
        setDelegates(data.db.delegates || []);
        setActivityLogs(data.db.activityLogs || []);
      }
      return {
        success: data.success,
        message: data.message,
        delegate: data.result?.delegate
      };
    } catch (err) {
      console.error(err);
      return { success: false, message: 'Server error checkin in delegate' };
    }
  };

  const sendDonationReceipt = async (id: string) => {
    try {
      const res = await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendDonationReceipt',
          payload: { id, user: currentUser.name }
        })
      });
      const data = await res.json();
      if (data.success) {
        setDonations(data.db.donations || []);
        setActivityLogs(data.db.activityLogs || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateVolunteerStatus = async (id: string, status: VolunteerStatus) => {
    try {
      const res = await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateVolunteerStatus',
          payload: { id, status, user: currentUser.name }
        })
      });
      const data = await res.json();
      if (data.success) {
        setVolunteers(data.db.volunteers || []);
        setActivityLogs(data.db.activityLogs || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateEnquiryStatus = async (id: string, status: EnquiryStatus) => {
    try {
      const res = await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateEnquiryStatus',
          payload: { id, status, user: currentUser.name }
        })
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.db.enquiries || []);
        setActivityLogs(data.db.activityLogs || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Gallery actions
  const addGalleryImage = async (imgData: { src: string; category: string; caption: string }) => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...imgData, user: currentUser.name })
      });
      const data = await res.json();
      if (data.success) {
        setGallery(data.gallery || []);
        const dbRes = await fetch('/api/db');
        const db = await dbRes.json();
        setActivityLogs(db.activityLogs || []);
      }
    } catch (err) {
      console.error("Failed to add gallery image:", err);
    }
  };

  const updateGalleryImage = async (id: string, imgData: any) => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...imgData, user: currentUser.name })
      });
      const data = await res.json();
      if (data.success) {
        setGallery(data.gallery || []);
        const dbRes = await fetch('/api/db');
        const db = await dbRes.json();
        setActivityLogs(db.activityLogs || []);
      }
    } catch (err) {
      console.error("Failed to update gallery image:", err);
    }
  };

  const deleteGalleryImage = async (id: string) => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, user: currentUser.name })
      });
      const data = await res.json();
      if (data.success) {
        setGallery(data.gallery || []);
        const dbRes = await fetch('/api/db');
        const db = await dbRes.json();
        setActivityLogs(db.activityLogs || []);
      }
    } catch (err) {
      console.error("Failed to delete gallery image:", err);
    }
  };

  // Events actions
  const addEvent = async (eventData: { type: string; category: string; title: string; image: string; description: string; youtubeId?: string; duration?: string }) => {
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...eventData, user: currentUser.name })
      });
      const data = await res.json();
      if (data.success) {
        setEvents(data.events || []);
        const dbRes = await fetch('/api/db');
        const db = await dbRes.json();
        setActivityLogs(db.activityLogs || []);
      }
    } catch (err) {
      console.error("Failed to add event:", err);
    }
  };

  const updateEvent = async (id: string, eventData: any) => {
    try {
      const res = await fetch('/api/events', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...eventData, user: currentUser.name })
      });
      const data = await res.json();
      if (data.success) {
        setEvents(data.events || []);
        const dbRes = await fetch('/api/db');
        const db = await dbRes.json();
        setActivityLogs(db.activityLogs || []);
      }
    } catch (err) {
      console.error("Failed to update event:", err);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const res = await fetch('/api/events', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, user: currentUser.name })
      });
      const data = await res.json();
      if (data.success) {
        setEvents(data.events || []);
        const dbRes = await fetch('/api/db');
        const db = await dbRes.json();
        setActivityLogs(db.activityLogs || []);
      }
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  const addNews = async (item: { title: string; date?: string; image?: string; link?: string; summary?: string }) => {
    const newItem = {
      id: `news-${Date.now()}`,
      title: item.title || 'Untitled News',
      date: item.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      image: item.image || '/images/News/DHARA Divine Awards Ceremony.jpg',
      link: item.link || '',
      summary: item.summary || ''
    };
    
    setNews(prev => {
      const updated = [newItem, ...prev];
      try { localStorage.setItem('dhara_dynamic_news', JSON.stringify(updated)); } catch(e){}
      return updated;
    });

    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, user: currentUser.name })
      });
      const data = await res.json();
      if (data.success && data.news) {
        setNews(data.news);
        try { localStorage.setItem('dhara_dynamic_news', JSON.stringify(data.news)); } catch(e){}
      }
    } catch (err) {
      console.error("Failed to add news server-side:", err);
    }
  };

  const updateNews = async (id: string, item: any) => {
    setNews(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, ...item } : n);
      try { localStorage.setItem('dhara_dynamic_news', JSON.stringify(updated)); } catch(e){}
      return updated;
    });

    try {
      const res = await fetch('/api/news', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...item, user: currentUser.name })
      });
      const data = await res.json();
      if (data.success && data.news) {
        setNews(data.news);
        try { localStorage.setItem('dhara_dynamic_news', JSON.stringify(data.news)); } catch(e){}
      }
    } catch (err) {
      console.error("Failed to update news server-side:", err);
    }
  };

  const deleteNews = async (id: string) => {
    setNews(prev => {
      const updated = prev.filter(n => n.id !== id);
      try { localStorage.setItem('dhara_dynamic_news', JSON.stringify(updated)); } catch(e){}
      return updated;
    });

    try {
      const res = await fetch('/api/news', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, user: currentUser.name })
      });
      const data = await res.json();
      if (data.success && data.news) {
        setNews(data.news);
        try { localStorage.setItem('dhara_dynamic_news', JSON.stringify(data.news)); } catch(e){}
      }
    } catch (err) {
      console.error("Failed to delete news server-side:", err);
    }
  };

  const updateSiteConfig = async (configData: any) => {
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...configData, user: currentUser.name })
      });
      const data = await res.json();
      if (data.success) {
        setSiteConfig(data.config);
        const dbRes = await fetch('/api/db');
        const db = await dbRes.json();
        setActivityLogs(db.activityLogs || []);
      }
    } catch (err) {
      console.error("Failed to update site config:", err);
    }
  };

  return (
    <AppContext.Provider value={{
      currentTab,
      setCurrentTab,
      theme,
      toggleTheme,
      currentRole,
      setCurrentRole,
      currentUser,
      nominations,
      donations,
      delegates,
      volunteers,
      enquiries,
      activityLogs,
      staff,
      gallery,
      events,
      news,
      siteConfig,
      updateNominationStatus,
      deleteNomination,
      checkInDelegate,
      sendDonationReceipt,
      updateVolunteerStatus,
      updateEnquiryStatus,
      logActivity,
      deleteActivityLog,
      addGalleryImage,
      updateGalleryImage,
      deleteGalleryImage,
      addEvent,
      updateEvent,
      deleteEvent,
      addNews,
      updateNews,
      deleteNews,
      updateSiteConfig,
      globalSearchQuery,
      setGlobalSearchQuery,
      sidebarOpen,
      setSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

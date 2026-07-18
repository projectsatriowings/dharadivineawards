"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { AppProvider, useApp } from '@/context/AppContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { OverviewWorkspace } from '@/components/workspaces/OverviewWorkspace';
import { NominationsWorkspace } from '@/components/workspaces/NominationsWorkspace';
import { DonationsWorkspace } from '@/components/workspaces/DonationsWorkspace';
import { DelegatesWorkspace } from '@/components/workspaces/DelegatesWorkspace';
import { VolunteersWorkspace } from '@/components/workspaces/VolunteersWorkspace';
import { EnquiriesWorkspace } from '@/components/workspaces/EnquiriesWorkspace';
import { GalleryWorkspace } from '@/components/workspaces/GalleryWorkspace';
import { EventsWorkspace } from '@/components/workspaces/EventsWorkspace';
import { EventConfigWorkspace } from '@/components/workspaces/EventConfigWorkspace';
import { SettingsWorkspace } from '@/components/workspaces/SettingsWorkspace';
import LoginPage from './login/page';

const DashboardContent: React.FC = () => {
  const { currentTab } = useApp();

  return (
    <main className="flex-1 bg-[#FDFBF8] dark:bg-[#121310] min-h-screen transition-colors duration-300">
      <Header />
      <div className="p-4 sm:p-8 max-w-[1600px] mx-auto">
        {currentTab === 'overview' && <OverviewWorkspace />}
        {currentTab === 'nominations' && <NominationsWorkspace />}
        {currentTab === 'donations' && <DonationsWorkspace />}
        {currentTab === 'delegates' && <DelegatesWorkspace />}
        {currentTab === 'volunteers' && <VolunteersWorkspace />}
        {currentTab === 'enquiries' && <EnquiriesWorkspace />}
        {currentTab === 'gallery' && <GalleryWorkspace />}
        {currentTab === 'events' && <EventsWorkspace />}
        {currentTab === 'event-config' && <EventConfigWorkspace />}
        {currentTab === 'settings' && <SettingsWorkspace />}
      </div>
    </main>
  );
};

const AdminPortalInner: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <AppProvider>
      <div className="flex items-start min-h-screen bg-[#FDFBF8] dark:bg-[#121310] text-[#1B1C19] dark:text-[#E5E7EB] selection:bg-[#401C0C] selection:text-[#FFD27F]">
        <Sidebar />
        <DashboardContent />
      </div>
    </AppProvider>
  );
};

export default function AdminPortalPage() {
  return (
    <AdminPortalInner />
  );
}

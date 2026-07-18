"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save, Video } from 'lucide-react';

export const SettingsWorkspace: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useApp();
  
  const [heroVideoUrl, setHeroVideoUrl] = useState('');
  const [heroVideoPoster, setHeroVideoPoster] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (siteConfig) {
      setHeroVideoUrl(siteConfig.heroVideoUrl || '');
      setHeroVideoPoster(siteConfig.heroVideoPoster || '');
    }
  }, [siteConfig]);

  const handleSave = async () => {
    setSaving(true);
    await updateSiteConfig({
      ...siteConfig,
      heroVideoUrl,
      heroVideoPoster
    });
    setSaving(false);
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Panel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
          <Settings className="text-[#D9762E]" /> Site Settings
        </h2>
        <p className="text-xs text-[#867463] dark:text-[#9CA3AF] mt-1">
          Configure global settings for the promotional website.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-6">
          <h3 className="font-serif text-xl font-bold flex items-center gap-2">
            <Video className="text-[#C9A646]" size={20} /> Home Page Banner Video
          </h3>
          
          <div>
            <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5">
              Hero Video URL (MP4)
            </label>
            <input
              type="text"
              value={heroVideoUrl}
              onChange={(e) => setHeroVideoUrl(e.target.value)}
              placeholder="e.g. /videos/Dhara award final promo.mp4 OR https://..."
              className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-sm focus:outline-none focus:border-[#401C0C]"
            />
            <p className="text-[10px] text-[#867463] mt-1">
              Provide a direct link to an MP4 video file. This plays on the home page hero section.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5">
              Video Poster Image URL (Optional)
            </label>
            <input
              type="text"
              value={heroVideoPoster}
              onChange={(e) => setHeroVideoPoster(e.target.value)}
              placeholder="e.g. /images/poster.jpg OR https://..."
              className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-sm focus:outline-none focus:border-[#401C0C]"
            />
            <p className="text-[10px] text-[#867463] mt-1">
              Image shown while the video is loading.
            </p>
          </div>
          
          <div className="pt-4 border-t border-[#EAE8E3] dark:border-[#30312E]">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#401C0C] hover:bg-[#5C2913] text-white rounded-xl text-xs font-semibold px-6 py-3 flex items-center gap-2 cursor-pointer shadow-sm transition-all"
            >
              <Save size={16} /> {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

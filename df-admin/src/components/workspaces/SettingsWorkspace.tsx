"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save, Video, BarChart2, ShieldCheck, Plus, Trash2 } from 'lucide-react';

export const SettingsWorkspace: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useApp();
  
  const [heroVideoUrl, setHeroVideoUrl] = useState('');
  const [heroVideoPoster, setHeroVideoPoster] = useState('');
  
  const [homeStats, setHomeStats] = useState<{ number: string, label: string }[]>([
    { number: '3', label: 'Founding Trustees' },
    { number: '40+', label: 'Community Programs' },
    { number: '80G', label: 'Tax Exemption' }
  ]);
  
  const [homeCredentials, setHomeCredentials] = useState<{ prefix: string, highlight: string }[]>([
    { prefix: 'Indian Trust Act, 1882 — ', highlight: 'Registered' },
    { prefix: '80G & 12A — ', highlight: 'Tax Exempt' },
    { prefix: 'MCA — ', highlight: 'CSR Approved' },
    { prefix: 'NGO Darpan — ', highlight: 'TN/2024/0473120' }
  ]);
  
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (siteConfig) {
      setHeroVideoUrl(siteConfig.heroVideoUrl || '');
      setHeroVideoPoster(siteConfig.heroVideoPoster || '');
      if (siteConfig.homeStats && siteConfig.homeStats.length > 0) {
        setHomeStats(siteConfig.homeStats);
      }
      if (siteConfig.homeCredentials && siteConfig.homeCredentials.length > 0) {
        setHomeCredentials(siteConfig.homeCredentials);
      }
    }
  }, [siteConfig]);

  const handleStatChange = (index: number, field: 'number'|'label', value: string) => {
    const newStats = [...homeStats];
    newStats[index][field] = value;
    setHomeStats(newStats);
  };
  const addStat = () => setHomeStats([...homeStats, { number: '', label: '' }]);
  const removeStat = (index: number) => setHomeStats(homeStats.filter((_, i) => i !== index));

  const handleCredChange = (index: number, field: 'prefix'|'highlight', value: string) => {
    const newCreds = [...homeCredentials];
    newCreds[index][field] = value;
    setHomeCredentials(newCreds);
  };
  const addCred = () => setHomeCredentials([...homeCredentials, { prefix: '', highlight: '' }]);
  const removeCred = (index: number) => setHomeCredentials(homeCredentials.filter((_, i) => i !== index));

  const handleSave = async () => {
    setSaving(true);
    await updateSiteConfig({
      ...siteConfig,
      heroVideoUrl,
      heroVideoPoster,
      homeStats,
      homeCredentials
    });
    setSaving(false);
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Panel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
              <Settings className="text-[#D9762E]" /> Site Settings
            </h2>
            <p className="text-xs text-[#867463] dark:text-[#9CA3AF] mt-1">
              Configure global settings for the promotional website.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#401C0C] hover:bg-[#5C2913] text-white rounded-xl text-sm font-semibold px-8 py-3 flex items-center gap-2 cursor-pointer shadow-sm transition-all"
          >
            <Save size={18} /> {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
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
        </div>
        
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold flex items-center gap-2">
              <BarChart2 className="text-[#C9A646]" size={20} /> Home Page Stats
            </h3>
            <button onClick={addStat} className="text-[#D9762E] hover:text-[#C9A646] p-1 bg-[#F5F3EE] dark:bg-[#242622] rounded-lg border border-[#EAE8E3] dark:border-[#30312E]">
              <Plus size={16} />
            </button>
          </div>
          
          <div className="space-y-3">
            {homeStats.map((stat, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="w-20">
                  <input
                    type="text"
                    value={stat.number}
                    onChange={(e) => handleStatChange(index, 'number', e.target.value)}
                    placeholder="Num"
                    className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-lg p-2 text-xs focus:outline-none focus:border-[#401C0C]"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                    placeholder="Label (e.g. Founding Trustees)"
                    className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-lg p-2 text-xs focus:outline-none focus:border-[#401C0C]"
                  />
                </div>
                <button onClick={() => removeStat(index)} className="p-2 text-red-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#867463]">
            These statistics are displayed in large bold text on the home page below the hero text.
          </p>
        </div>
        
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-6 lg:col-span-2">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="text-[#C9A646]" size={20} /> Credentials Strip
            </h3>
            <button onClick={addCred} className="text-[#D9762E] hover:text-[#C9A646] p-1 bg-[#F5F3EE] dark:bg-[#242622] rounded-lg border border-[#EAE8E3] dark:border-[#30312E]">
              <Plus size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {homeCredentials.map((cred, index) => (
              <div key={index} className="flex gap-2 items-start p-3 bg-[#F9F8F6] dark:bg-[#242622] border border-[#EAE8E3] dark:border-[#30312E] rounded-xl">
                <div className="flex-1 space-y-2">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#867463] mb-1">Prefix Text</label>
                    <input
                      type="text"
                      value={cred.prefix}
                      onChange={(e) => handleCredChange(index, 'prefix', e.target.value)}
                      placeholder="e.g. Indian Trust Act, 1882 —"
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2 py-1 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#867463] mb-1">Highlighted Text</label>
                    <input
                      type="text"
                      value={cred.highlight}
                      onChange={(e) => handleCredChange(index, 'highlight', e.target.value)}
                      placeholder="e.g. Registered"
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2 py-1 text-xs font-bold"
                    />
                  </div>
                </div>
                <button onClick={() => removeCred(index)} className="p-2 mt-4 text-red-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#867463]">
            This controls the floating glassmorphic banner containing the trust registration details across the home page.
          </p>
        </div>
      </div>
    </div>
  );
};

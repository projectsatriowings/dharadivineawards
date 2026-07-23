import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Plus, Trash2, X, Edit3, Play, Star, Save, Award, Filter } from 'lucide-react';

const Youtube: React.FC<React.SVGProps<SVGSVGElement> & { size?: number | string }> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" />
  </svg>
);

const normalizeCategory = (cat: string): string => {
  const c = (cat || '').trim();
  if (['Spiritual Pillars', 'Sivacharyas', 'Bhattacharyas', 'Odhuvars', 'Sivachariyar Seva', 'Sai Bhakti Seva', 'Siddhar Tradition', 'Guardian Deity Seva', 'Uzhavarappani Seva', 'Gramadevatha Seva'].includes(c)) {
    return 'Spiritual Pillars';
  }
  if (['Institutions and Organisations', 'Institutions', 'Organisations', 'Traditional Craft', 'Traditional Art', 'Education Seva', 'Medical Seva', 'Hospitality Seva', 'Higher Education', 'Annadhanam Seva', 'Corporate CSR Seva', 'Social Welfare'].includes(c)) {
    return 'Institutions and Organisations';
  }
  if (['Individuals and Professionals', 'Individuals', 'Professionals', 'Madras HC Judge', 'Spiritual Music', 'Financial Seva'].includes(c)) {
    return 'Individuals and Professionals';
  }
  if (['Grass Route Eminents', 'Grassroots', 'Grassroots Volunteers', 'Grassroot', 'Temple Seva', 'Heritage Sports', 'Vedic Pathashala', 'Temple Priest Seva', 'Temple Architecture', 'Metal Iconography', 'Temple Carpentry', 'Sacred Art', 'Madapalli Seva', 'Pushpa Alankaram', 'Mahout Seva', 'Folk Theater Art'].includes(c)) {
    return 'Grass Route Eminents';
  }
  return 'Recent Updates & Events';
};

export const YoutubeWorkspace: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent, globalSearchQuery, siteConfig, updateSiteConfig } = useApp();
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Statistics editor states
  const [eventStats, setEventStats] = useState([
    { value: '63+', label: 'Divine Awardees Honored', desc: 'Grassroots leaders, philanthropists, and silent seva sadhaks honored for Sanatana Dharma service.', icon: 'Award' },
    { value: '2,500+', label: 'Dignitaries & Attendees', desc: 'Gathering of Madras High Court Judge Justice GR Swaminathan, Adheenams, and eminent personalities.', icon: 'Users' },
    { value: 'Jan 2025', label: 'Flagship Assembly Date', desc: 'A grand devotional assembly hosted at the Chinmaya Heritage Centre in Chennai.', icon: 'Calendar' },
    { value: '100% Seva', label: 'Pure Selfless Platform', desc: 'Organized fully by volunteers to recognize quiet champions of socio-cultural revival.', icon: 'Trees' }
  ]);
  const [savingStats, setSavingStats] = useState(false);

  React.useEffect(() => {
    if (siteConfig && siteConfig.eventStats && siteConfig.eventStats.length === 4) {
      setEventStats(siteConfig.eventStats);
    }
  }, [siteConfig]);

  const handleSaveStats = async () => {
    setSavingStats(true);
    try {
      await updateSiteConfig({
        ...siteConfig,
        eventStats
      });
      alert('Event highlights statistics saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save statistics.');
    } finally {
      setSavingStats(false);
    }
  };

  // Form states
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Recent Updates & Events');
  const [description, setDescription] = useState<string>('');
  const [youtubeId, setYoutubeId] = useState<string>('');
  const [featured, setFeatured] = useState<boolean>(true);

  // Filter dynamic events of type 'video'
  const youtubeVideos = events.filter(ev => ev.type === 'video');

  const filteredVideos = youtubeVideos.filter(vid => {
    const searchStr = (globalSearchQuery || '').toLowerCase();
    return !searchStr || 
      (vid.title || '').toLowerCase().includes(searchStr) ||
      (vid.description || '').toLowerCase().includes(searchStr) ||
      (vid.category || '').toLowerCase().includes(searchStr) ||
      (vid.youtubeId || '').toLowerCase().includes(searchStr);
  });

  const getThumbnailUrl = (yId: string) => {
    return `https://img.youtube.com/vi/${yId}/hqdefault.jpg`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !youtubeId) {
      alert('Please fill in both Title and YouTube Video ID.');
      return;
    }

    const payload = {
      type: 'video',
      title,
      category,
      description,
      youtubeId,
      image: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      featured
    };

    try {
      if (editingId) {
        await updateEvent(editingId, payload);
      } else {
        await addEvent(payload);
      }
      resetForm();
      setShowAddModal(false);
    } catch (err) {
      console.error('Error saving video highlight:', err);
      alert('Failed to save video highlight.');
    }
  };

  const handleEditClick = (vid: any) => {
    setEditingId(vid.id);
    setTitle(vid.title || '');
    setCategory(vid.category || 'YouTube Videos');
    setDescription(vid.description || '');
    setYoutubeId(vid.youtubeId || '');
    setFeatured(vid.featured !== false);
    setShowAddModal(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Recent Updates & Events');
    setDescription('');
    setYoutubeId('');
    setFeatured(true);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Panel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#FF0000] shrink-0">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.482 20.5 12 20.5 12 20.5s7.518 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg> YouTube Video
          </h2>
          <p className="text-xs text-[#867463] dark:text-[#9CA3AF] mt-1">
            Publish and manage video broadcasts, speeches, and devotional recordings on the home page.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-[#D9762E] hover:bg-[#b85e1b] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer shrink-0 self-start md:self-auto"
        >
          <Plus size={16} /> Add YouTube Video
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mr-2 flex items-center gap-1">
          <Filter size={14} /> Filter Category:
        </span>
        {['All', 'Recent Updates & Events', 'Spiritual Pillars', 'Institutions and Organisations', 'Individuals and Professionals', 'Grass Route Eminents'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#401C0C] dark:bg-[#FFD27F] text-white dark:text-[#401C0C] font-bold shadow-sm'
                : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Categorized Video List */}
      <div className="space-y-10">
        {(selectedCategory === 'All'
          ? [
              'Recent Updates & Events',
              'Spiritual Pillars',
              'Institutions and Organisations',
              'Individuals and Professionals',
              'Grass Route Eminents'
            ]
          : [selectedCategory]
        ).map(cat => {
          const catVideos = filteredVideos.filter(vid => normalizeCategory(vid.category) === cat);

          if (catVideos.length === 0) return null;

          return (
            <div key={cat} className="space-y-4">
              <div className="border-b border-[#EAE8E3] dark:border-[#30312E] pb-2">
                <h3 className="font-serif text-base font-bold text-[#401C0C] dark:text-[#FFD27F]">{cat}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catVideos.map(vid => (
                  <div
                    key={vid.id}
                    className="bg-white dark:bg-[#1B1C19] rounded-3xl border border-[#EAE8E3] dark:border-[#30312E] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 bg-[#121310] overflow-hidden flex items-center justify-center">
                        <img
                          src={getThumbnailUrl(vid.youtubeId)}
                          alt={vid.title}
                          className="w-full h-full object-cover"
                          onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="text-white w-10 h-10 drop-shadow-lg opacity-85 hover:scale-110 transition-transform cursor-pointer" />
                        </div>
                        {vid.featured && (
                          <div className="absolute top-3 left-3 bg-[#FFD27F]/90 backdrop-blur-sm text-[#401C0C] text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                            <Star size={10} fill="#401C0C" /> Featured
                          </div>
                        )}
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-[#FFD27F] text-[10px] font-mono px-2.5 py-1 rounded-lg border border-white/20">
                          ID: {vid.youtubeId}
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <h3 className="font-serif text-sm font-bold text-[#1B1C19] dark:text-[#F3F4F6] line-clamp-2 leading-snug">
                          {vid.title}
                        </h3>
                        <p className="text-[11px] text-[#867463] dark:text-[#9CA3AF] line-clamp-3 leading-relaxed">
                          {vid.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-[#F5F3EE] dark:border-[#2E302A] flex justify-end gap-2 bg-[#FDFBF8]/50 dark:bg-[#1C1D1A]/50">
                      <button
                        onClick={() => handleEditClick(vid)}
                        className="p-2 rounded-xl text-[#867463] hover:text-[#C9A646] hover:bg-[#F5F3EE] dark:hover:bg-[#242622] transition-colors cursor-pointer"
                        title="Edit Video Highlight"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Are you sure you want to delete video "${vid.title}"?`)) {
                            await deleteEvent(vid.id);
                          }
                        }}
                        className="p-2 rounded-xl text-[#867463] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Delete Video Highlight"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredVideos.length === 0 && (
          <div className="py-16 text-center bg-white dark:bg-[#1B1C19] rounded-3xl border border-dashed border-[#E4E2DD] dark:border-[#30312E] text-xs text-[#867463] italic">
            No YouTube videos found. Click "Add YouTube Video" to add one.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-scale-up my-8">
            <div className="flex items-center justify-between border-b border-[#F5F3EE] dark:border-[#2E302A] pb-4">
              <h3 className="font-serif text-xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#FF0000] shrink-0">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.555A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.482 20.5 12 20.5 12 20.5s7.518 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg> {editingId ? 'Edit YouTube Video' : 'Add YouTube Video'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl text-[#867463] hover:text-[#1B1C19] hover:bg-[#F5F3EE] dark:hover:bg-[#242622] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#534436] dark:text-[#D1D5DB] mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Divine Awards Ceremony Highlights..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E4E2DD] dark:border-[#30312E] bg-[#FBF9F4] dark:bg-[#242622] text-sm text-[#1B1C19] dark:text-white focus:outline-none focus:border-[#D9762E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#534436] dark:text-[#D1D5DB] mb-1">
                    YouTube Video ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={youtubeId}
                    onChange={(e) => setYoutubeId(e.target.value)}
                    placeholder="e.g. Rqa2xKbkxU8"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E4E2DD] dark:border-[#30312E] bg-[#FBF9F4] dark:bg-[#242622] text-sm text-[#1B1C19] dark:text-white focus:outline-none focus:border-[#D9762E]"
                  />
                  <p className="text-[10px] text-[#867463] mt-1 font-mono">
                    The code after v= in the URL.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#534436] dark:text-[#D1D5DB] mb-1">
                    Video Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E4E2DD] dark:border-[#30312E] bg-[#FBF9F4] dark:bg-[#242622] text-sm text-[#1B1C19] dark:text-white focus:outline-none focus:border-[#D9762E]"
                  >
                    <option value="Recent Updates & Events">Recent Updates & Events</option>
                    <option value="Spiritual Pillars">Spiritual Pillars</option>
                    <option value="Institutions and Organisations">Institutions and Organisations</option>
                    <option value="Individuals and Professionals">Individuals and Professionals</option>
                    <option value="Grass Route Eminents">Grass Route Eminents</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#534436] dark:text-[#D1D5DB] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a brief description of the video highlights..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E4E2DD] dark:border-[#30312E] bg-[#FBF9F4] dark:bg-[#242622] text-sm text-[#1B1C19] dark:text-white focus:outline-none focus:border-[#D9762E]"
                />
              </div>

              <div className="flex items-center gap-2 py-2">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="text-[#D9762E] rounded border-[#E4E2DD] focus:ring-[#D9762E]"
                />
                <label htmlFor="featured-checkbox" className="text-xs font-bold text-[#534436] dark:text-[#D1D5DB] cursor-pointer">
                  Feature this video on the home page (YouTube Broadcast)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F5F3EE] dark:border-[#2E302A]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] text-xs font-bold hover:bg-[#EAE8E3] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#401C0C] text-white text-xs font-bold hover:bg-[#5C2913] cursor-pointer shadow-md"
                >
                  {editingId ? 'Update Video' : 'Add Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Dynamic Event Statistics Panel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-4 mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#D9762E]" /> Event Video Statistics & Metrics
            </h3>
            <p className="text-xs text-[#867463] dark:text-[#9CA3AF] mt-1">
              Configure the 4 statistics cards shown at the top of the event video page.
            </p>
          </div>
          <button
            onClick={handleSaveStats}
            disabled={savingStats}
            className="bg-[#401C0C] hover:bg-[#5C2913] text-white rounded-xl text-xs font-semibold px-6 py-2.5 flex items-center gap-2 cursor-pointer shadow-sm transition-all shrink-0 self-start sm:self-auto"
          >
            <Save size={16} /> {savingStats ? 'Saving...' : 'Save Statistics'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {eventStats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] space-y-3">
              <span className="text-xs font-bold text-[#401C0C] dark:text-[#FFD27F] block">Card #{idx + 1} ({stat.icon})</span>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#867463] mb-1">Value</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => {
                    const newStats = [...eventStats];
                    newStats[idx] = { ...newStats[idx], value: e.target.value };
                    setEventStats(newStats);
                  }}
                  className="w-full bg-white dark:bg-[#1B1C19] border border-[#E4E2DD] dark:border-[#30312E] rounded-lg p-2 text-xs focus:outline-none focus:border-[#401C0C] font-semibold text-[#1B1C19] dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#867463] mb-1">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const newStats = [...eventStats];
                    newStats[idx] = { ...newStats[idx], label: e.target.value };
                    setEventStats(newStats);
                  }}
                  className="w-full bg-white dark:bg-[#1B1C19] border border-[#E4E2DD] dark:border-[#30312E] rounded-lg p-2 text-xs focus:outline-none focus:border-[#401C0C] font-semibold text-[#1B1C19] dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#867463] mb-1">Description</label>
                <textarea
                  value={stat.desc}
                  onChange={(e) => {
                    const newStats = [...eventStats];
                    newStats[idx] = { ...newStats[idx], desc: e.target.value };
                    setEventStats(newStats);
                  }}
                  rows={3}
                  className="w-full bg-white dark:bg-[#1B1C19] border border-[#E4E2DD] dark:border-[#30312E] rounded-lg p-2 text-xs focus:outline-none focus:border-[#401C0C] resize-none text-[#534436] dark:text-[#D1D5DB]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

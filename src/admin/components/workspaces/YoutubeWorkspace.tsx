import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Plus, Trash2, X, Edit3, Youtube, Play, Star } from 'lucide-react';

export const YoutubeWorkspace: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent, globalSearchQuery } = useApp();
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('YouTube Videos');
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
    setCategory('YouTube Videos');
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
            <Youtube className="text-[#FF0000]" /> YouTube Video Highlights
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
          <Plus size={16} /> Add Video Highlight
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white dark:bg-[#1B1C19] rounded-3xl border border-dashed border-[#E4E2DD] dark:border-[#30312E] text-xs text-[#867463] italic">
            No video highlights found. Click "Add Video Highlight" to add one.
          </div>
        ) : (
          filteredVideos.map(vid => (
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
                      e.target.src = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80";
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
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#401C0C]/10 dark:bg-[#FFD27F]/10 text-[#401C0C] dark:text-[#FFD27F] text-[10px] font-bold uppercase tracking-wider">
                      {vid.category || 'Highlight'}
                    </span>
                  </div>
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
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-scale-up my-8">
            <div className="flex items-center justify-between border-b border-[#F5F3EE] dark:border-[#2E302A] pb-4">
              <h3 className="font-serif text-xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
                <Youtube className="text-[#FF0000]" /> {editingId ? 'Edit YouTube Highlight' : 'Add YouTube Highlight'}
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
                    Video Category / Duration
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Traditional Craft or 12:45"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E4E2DD] dark:border-[#30312E] bg-[#FBF9F4] dark:bg-[#242622] text-sm text-[#1B1C19] dark:text-white focus:outline-none focus:border-[#D9762E]"
                  />
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
                  {editingId ? 'Update Highlight' : 'Add Highlight'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

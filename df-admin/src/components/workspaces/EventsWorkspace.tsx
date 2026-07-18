"use client";

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Search, Plus, Trash2, X, Filter, Upload, Play, Image as ImageIcon } from 'lucide-react';

export const EventsWorkspace: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent, globalSearchQuery } = useApp();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  // Form states
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Spiritual Seva');
  const [type, setType] = useState<'image' | 'video'>('image');
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [youtubeId, setYoutubeId] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [featured, setFeatured] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const types = ['All', 'image', 'video'];
  const standardEventCategories = ['Spiritual Seva', 'Community Seva', 'Traditional Art', 'Traditional Craft', 'News & Press', 'YouTube Videos'];
  const uniqueCategories = Array.from(new Set([...standardEventCategories, ...events.map(ev => ev.category).filter(Boolean)]));
  
  const categoriesList = uniqueCategories;

  const filteredEvents = events.filter(ev => {
    const matchesType = selectedType === 'All' || ev.type === selectedType;
    const searchStr = (globalSearchQuery || '').toLowerCase();
    const matchesSearch = !searchStr || 
      (ev.title || '').toLowerCase().includes(searchStr) ||
      (ev.description || '').toLowerCase().includes(searchStr) ||
      (ev.category || '').toLowerCase().includes(searchStr);
    return matchesType && matchesSearch;
  });

  const getImageUrl = (ev: any) => {
    if (ev.type === 'video' && ev.youtubeId) {
      return `https://img.youtube.com/vi/${ev.youtubeId}/hqdefault.jpg`;
    }
    const src = ev.image;
    if (!src) return 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
    if (src.startsWith('http') || src.startsWith('/uploads') || src.startsWith('data:')) {
      return src;
    }
    if (src.startsWith('/images/')) {
      return `http://localhost:5173${src}`;
    }
    return `http://localhost:5173/images/Devine Awards images/${src}`;
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('Please enter a title.');
      return;
    }
    if (type === 'video' && !youtubeId) {
      alert('Please enter a YouTube video ID.');
      return;
    }
    if (type === 'image' && !imageUrl) {
      alert('Please upload an image or enter a URL.');
      return;
    }

    const payload = {
      title,
      type,
      category,
      description,
      image: type === 'image' ? (imageUrl || '') : '',
      youtubeId: type === 'video' ? youtubeId : undefined,
      duration,
      featured
    };

    if (editingId) {
      await updateEvent(editingId, payload);
    } else {
      await addEvent(payload);
    }

    // Reset and close
    setTitle('');
    setDescription('');
    setImageUrl('');
    setYoutubeId('');
    setDuration('');
    setFeatured(false);
    setCategory('Spiritual Seva');
    setType('image');
    setEditingId(null);
    setShowAddModal(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      // Fallback: use local object URL
      setImageUrl(URL.createObjectURL(file));
    } finally {
      setUploading(false);
    }
  };

  const handleEditClick = (ev: any) => {
    setEditingId(ev.id);
    setTitle(ev.title);
    setCategory(ev.category);
    setType(ev.type);
    setDescription(ev.description || '');
    setImageUrl(ev.image || '');
    setYoutubeId(ev.youtubeId || '');
    setDuration(ev.duration || '');
    setFeatured(ev.featured || false);
    setShowAddModal(true);
  };
  const handleDelete = async (id: string, titleStr: string) => {
    if (window.confirm(`Are you sure you want to delete event: "${titleStr}"?`)) {
      await deleteEvent(id);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Panel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
            <Calendar className="text-[#D9762E]" /> Events &amp; Activities Organizer
          </h2>
          <p className="text-xs text-[#867463] dark:text-[#9CA3AF] mt-1">
            Log community programs, sacred restorations, traditional crafts, and YouTube coverage.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setTitle('');
            setDescription('');
            setImageUrl('');
            setYoutubeId('');
            setDuration('');
            setFeatured(false);
            setCategory('Spiritual Seva');
            setType('image');
            setShowAddModal(true);
          }}
          className="bg-[#401C0C] hover:bg-[#5C2913] dark:bg-[#5C2913] dark:hover:bg-[#5C2913] text-white rounded-xl text-xs font-semibold px-4 py-2.5 flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-center shadow-sm"
        >
          <Plus size={16} /> Add Event/Video
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mr-2 flex items-center gap-1">
          <Filter size={14} /> Filter Type:
        </span>
        {types.map(t => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize ${
              selectedType === t
                ? 'bg-[#401C0C] dark:bg-[#FFD27F] text-white dark:text-[#401C0C] shadow-sm'
                : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
            }`}
          >
            {t === 'All' ? 'All Types' : t + 's'}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white dark:bg-[#1B1C19] rounded-3xl border border-dashed border-[#E4E2DD] dark:border-[#30312E] text-xs text-[#867463] italic">
            No events found matching the criteria.
          </div>
        ) : (
          filteredEvents.map(ev => (
            <div
              key={ev.id}
              className="bg-white dark:bg-[#1B1C19] rounded-3xl border border-[#EAE8E3] dark:border-[#30312E] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group relative"
            >
              {/* Media Preview */}
              <div className="relative aspect-video bg-[#F5F3EE] dark:bg-[#242622] overflow-hidden shrink-0">
                <img
                  src={getImageUrl(ev)}
                  alt={ev.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
                  }}
                />
                
                {ev.type === 'video' && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                <span className="absolute top-3 left-3 bg-[#401C0C] text-[#FFD27F] text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                  {ev.category}
                </span>
                
                {ev.featured && (
                  <span className="absolute top-3 right-3 bg-[#FFD27F] text-[#401C0C] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                    On Home Page
                  </span>
                )}

                {ev.duration && (
                  <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[9px] font-mono px-2 py-0.5 rounded shadow">
                    {ev.duration}
                  </span>
                )}

                {/* Delete/Edit button overlay */}
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditClick(ev)}
                    className="p-2 bg-white/90 hover:bg-white text-[#401C0C] rounded-xl shadow-md transition-all cursor-pointer"
                    title="Edit event"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ev.id, ev.title)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition-all cursor-pointer"
                    title="Delete event"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h4 className="font-bold font-serif text-base text-[#1B1C19] dark:text-[#F3F4F6] line-clamp-2 leading-snug group-hover:text-[#401C0C] transition-colors">
                    {ev.title}
                  </h4>
                  <p className="text-[11px] text-[#534436] dark:text-[#A1A1AA] leading-relaxed line-clamp-3">
                    {ev.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F5F3EE] dark:border-[#2E302A] flex justify-between items-center text-[10px] text-[#867463] font-mono">
                  <span>Type: {ev.type.toUpperCase()}</span>
                  <span>ID: {ev.id}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] rounded-3xl p-6 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto animate-fade-in">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-[#867463] hover:text-[#1B1C19] dark:hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] mb-6 flex items-center gap-2">
              <Calendar className="text-[#D9762E]" size={20} /> {editingId ? 'Edit' : 'Add'} Event/Activity
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5">
                  Activity Type *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs font-semibold text-[#534436] dark:text-[#D1D5DB] cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={type === 'image'}
                      onChange={() => setType('image')}
                      className="accent-[#401C0C]"
                    />
                    <span className="flex items-center gap-1"><ImageIcon size={14} /> Image Feature</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-[#534436] dark:text-[#D1D5DB] cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={type === 'video'}
                      onChange={() => setType('video')}
                      className="accent-[#401C0C]"
                    />
                    <span className="flex items-center gap-1"><Play size={14} /> YouTube Video</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5">
                  Title/Heading *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="E.g., Consecration Ceremony"
                  className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-xs focus:outline-none focus:border-[#401C0C] dark:focus:border-[#FFD27F] transition-all"
                />
              </div>

              {type === 'image' && (
                <div>
                  <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-sm focus:outline-none focus:border-[#401C0C] dark:focus:border-[#FFD27F] transition-all cursor-pointer"
                  >
                    {categoriesList.filter(c => c !== 'YouTube Videos').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details about this activity..."
                  className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-xs focus:outline-none focus:border-[#401C0C] dark:focus:border-[#FFD27F] transition-all resize-none"
                />
              </div>

              {type === 'video' ? (
                <div>
                  <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5">
                    YouTube Video ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={youtubeId}
                    onChange={(e) => setYoutubeId(e.target.value)}
                    placeholder="E.g. J6BvffQ1ZKQ"
                    className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-xs focus:outline-none focus:border-[#401C0C] dark:focus:border-[#FFD27F] transition-all"
                  />
                  <span className="text-[10px] text-[#867463] mt-1 block">
                    The code after `v=` in the YouTube URL (e.g. youtube.com/watch?v=<b>J6BvffQ1ZKQ</b>).
                  </span>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5">
                    Image Source *
                  </label>
                  <div className="flex items-center gap-3 mb-2">
                    <label className="flex-1 flex items-center justify-center gap-2 border border-dashed border-[#C9A646]/50 hover:border-[#401C0C] bg-[#F5F3EE]/50 dark:bg-[#242622]/50 hover:bg-[#F5F3EE] rounded-xl p-3 text-xs cursor-pointer text-[#534436] dark:text-[#D1D5DB] transition-all">
                      <Upload size={14} className="text-[#C9A646]" />
                      <span>{uploading ? 'Uploading...' : 'Upload Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  <div className="text-center text-[10px] text-[#867463] mb-2 font-mono">— OR —</div>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or uploaded path"
                    className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-xs focus:outline-none focus:border-[#401C0C] dark:focus:border-[#FFD27F] transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5">
                  Label/Duration (Optional)
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="E.g., 2 Hours, Temple Seva, or Youth Plenary"
                  className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-xs focus:outline-none focus:border-[#401C0C] dark:focus:border-[#FFD27F] transition-all"
                />
              </div>

              <div className="flex items-center gap-2 pt-2 pb-1">
                <input
                  type="checkbox"
                  id="featuredCheckbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#401C0C] bg-[#F5F3EE] dark:bg-[#242622] border-[#C9A646] rounded focus:ring-[#D9762E] focus:ring-2 cursor-pointer"
                />
                <label htmlFor="featuredCheckbox" className="text-xs font-semibold text-[#1B1C19] dark:text-[#F3F4F6] cursor-pointer">
                  Show on Home Page
                </label>
              </div>
              <p className="text-[10px] text-[#867463] dark:text-[#9CA3AF] ml-6 mt-[-8px]">
                Checking this will feature the video prominently on the main website's homepage.
              </p>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#F5F3EE] dark:border-[#2E302A]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-[#F5F3EE] hover:bg-[#EAE8E3] dark:bg-[#242622] dark:hover:bg-[#2E302A] text-[#534436] dark:text-[#D1D5DB] rounded-xl text-xs font-semibold px-4 py-2.5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-[#401C0C] hover:bg-[#5C2913] dark:bg-[#5C2913] text-white rounded-xl text-xs font-semibold px-5 py-2.5 cursor-pointer flex items-center gap-1 shadow-sm disabled:opacity-50"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

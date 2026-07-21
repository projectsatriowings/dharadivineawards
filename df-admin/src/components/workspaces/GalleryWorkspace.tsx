"use client";

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Image as ImageIcon, Search, Plus, Trash2, X, Filter, Upload } from 'lucide-react';

export const GalleryWorkspace: React.FC = () => {
  const { gallery, addGalleryImage, updateGalleryImage, deleteGalleryImage, globalSearchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  // Form states
  const [category, setCategory] = useState<string>('Award Ceremony');
  const [caption, setCaption] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [priority, setPriority] = useState<number>(0);
  const [featured, setFeatured] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const standardCategories = ['Highlights', '1. Spiritual Piller', '2. Institution/Organizations', '3. Individuals/Professionals', '4. Grass Route Eminents', '5. Community Seva'];
  const uniqueCategories = Array.from(new Set([...standardCategories, ...gallery.map(img => img.category).filter(Boolean)]));
  
  const categories = ['All', ...uniqueCategories];
  const modalCategories = uniqueCategories;

  const filteredGallery = gallery.filter(img => {
    const matchesCategory = selectedCategory === 'All' || img.category === selectedCategory;
    const searchStr = (globalSearchQuery || '').toLowerCase();
    const matchesSearch = !searchStr || 
      (img.caption || '').toLowerCase().includes(searchStr) ||
      (img.category || '').toLowerCase().includes(searchStr);
    return matchesCategory && matchesSearch;
  });

  const getImageUrl = (src: string) => {
    if (!src) return 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80';
    if (src.startsWith('http') || src.startsWith('/uploads') || src.startsWith('data:')) {
      return src;
    }
    if (src.startsWith('/images/')) {
      return src;
    }
    return `/images/Devine Awards images/${src}`;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImageUrl(data.url);
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Please upload an image or provide a URL.');
      return;
    }
    if (!caption) {
      alert('Please enter a caption.');
      return;
    }

    if (editingId) {
      // Assuming AppContext has updateGalleryImage
      // (will implement if not)
      await updateGalleryImage(editingId, {
        src: imageUrl,
        category,
        caption,
        priority,
        featured
      });
    } else {
      await addGalleryImage({
        src: imageUrl,
        category,
        caption,
        priority,
        featured
      });
    }

    // Reset and close
    setCaption('');
    setImageUrl('');
    setCategory('Award Ceremony');
    setPriority(0);
    setFeatured(false);
    setEditingId(null);
    setShowAddModal(false);
  };

  const handleEditClick = (img: any) => {
    setEditingId(img.id);
    setImageUrl(img.src);
    setCategory(img.category);
    setCaption(img.caption);
    setPriority(img.priority || 0);
    setFeatured(img.featured || false);
    setShowAddModal(true);
  };

  const handleDelete = async (id: string, captionStr: string) => {
    if (window.confirm(`Are you sure you want to delete the image: "${captionStr}"?`)) {
      await deleteGalleryImage(id);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Panel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
            <ImageIcon className="text-[#D9762E]" /> Photo Gallery Management
          </h2>
          <p className="text-xs text-[#867463] dark:text-[#9CA3AF] mt-1">
            Publish and manage photos for the promotional site gallery.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setCaption('');
            setImageUrl('');
            setCategory('Award Ceremony');
            setPriority(0);
            setFeatured(false);
            setShowAddModal(true);
          }}
          className="bg-[#401C0C] hover:bg-[#5C2913] dark:bg-[#5C2913] dark:hover:bg-[#5C2913] text-white rounded-xl text-xs font-semibold px-4 py-2.5 flex items-center gap-1.5 cursor-pointer transition-all self-start sm:self-center shadow-sm"
        >
          <Plus size={16} /> Add Gallery Image
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mr-2 flex items-center gap-1">
          <Filter size={14} /> Filter Category:
        </span>
        {categories.map(cat => (
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

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGallery.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white dark:bg-[#1B1C19] rounded-3xl border border-dashed border-[#E4E2DD] dark:border-[#30312E] text-xs text-[#867463] italic">
            No gallery images found matching the criteria.
          </div>
        ) : (
          filteredGallery.map(img => (
            <div
              key={img.id}
              className="bg-white dark:bg-[#1B1C19] rounded-3xl border border-[#EAE8E3] dark:border-[#30312E] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group relative"
            >
              {/* Image Preview Container */}
              <div className="h-48 relative overflow-hidden bg-[#F5F3EE] dark:bg-[#242622] shrink-0">
                <img
                  src={getImageUrl(img.src)}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80';
                  }}
                />
                
                <span className="absolute top-3 left-3 bg-[#401C0C] text-[#FFD27F] text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                  {img.category}
                </span>

                {/* Delete overlay button */}
                <button
                  onClick={() => handleDelete(img.id, img.caption)}
                  className="absolute bottom-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                  title="Delete image"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Caption */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs font-semibold text-[#1B1C19] dark:text-[#F3F4F6] line-clamp-3 leading-relaxed">
                  {img.caption}
                </p>
                <div className="pt-2 flex justify-between items-center text-[10px] text-[#867463] font-mono">
                  <span>Priority: {img.priority || 0}</span>
                  {img.featured && <span className="text-[#D9762E] font-bold">★ On Home Page</span>}
                </div>
                <button
                  onClick={() => handleEditClick(img)}
                  className="mt-2 w-full py-1.5 text-xs text-center border border-[#EAE8E3] rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Gallery Image Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] rounded-3xl p-6 w-full max-w-md shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-[#867463] hover:text-[#1B1C19] dark:hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] mb-6 flex items-center gap-2">
              <ImageIcon className="text-[#D9762E]" size={20} /> Add Image to Gallery
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-sm focus:outline-none focus:border-[#401C0C] dark:focus:border-[#FFD27F] transition-all cursor-pointer"
                >
                  {modalCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5">
                  Caption *
                </label>
                <textarea
                  required
                  rows={3}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="E.g., Presentation of Divine Awards to grassroots volunteers."
                  className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-xs focus:outline-none focus:border-[#401C0C] dark:focus:border-[#FFD27F] transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5">
                  Image URL (Google Drive or External) *
                </label>
                


                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or uploaded path"
                  className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-xs focus:outline-none focus:border-[#401C0C] dark:focus:border-[#FFD27F] transition-all"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5">
                    Priority (Lower is first)
                  </label>
                  <input
                    type="number"
                    value={priority}
                    onChange={(e) => setPriority(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-xs focus:outline-none focus:border-[#401C0C] transition-all"
                  />
                </div>
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
                Checking this will feature the image prominently on the main website's homepage.
              </p>

              {imageUrl && (
                <div className="pt-2">
                  <div className="text-[10px] font-semibold text-[#867463] mb-1">Preview:</div>
                  <div className="h-28 rounded-xl overflow-hidden bg-neutral-100 border border-[#EAE8E3]">
                    <img
                      src={getImageUrl(imageUrl)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

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
                  Save Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Enquiry, EnquiryStatus, EnquiryType } from '../../types';
import { 
  MessageSquare, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Mail, 
  Phone, 
  Building2, 
  Send, 
  Check, 
  Sparkles,
  ExternalLink,
  Newspaper,
  Plus,
  Trash2,
  Edit3,
  X,
  Upload,
  Image as ImageIcon,
  Calendar
} from 'lucide-react';

export const EnquiriesWorkspace: React.FC = () => {
  const { enquiries, updateEnquiryStatus, globalSearchQuery, news, addNews, updateNews, deleteNews } = useApp();
  const [activeTab, setActiveTab] = useState<'enquiries' | 'news'>('enquiries');

  // Enquiries filtering
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // News management state
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState<string>('');
  const [newsDate, setNewsDate] = useState<string>('');
  const [newsType, setNewsType] = useState<'image' | 'video'>('image');
  const [newsMediaUrl, setNewsMediaUrl] = useState<string>('');
  const [newsImage, setNewsImage] = useState<string>('');
  const [newsLink, setNewsLink] = useState<string>('');
  const [newsSummary, setNewsSummary] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  const types: { id: string; label: string }[] = [
    { id: 'all', label: 'All Inquiries' },
    { id: 'media', label: 'Media & Press Accreditation' },
    { id: 'sponsorship_enquiry', label: 'CSR Sponsorship Requests' },
    { id: 'general', label: 'General Devotee Questions' }
  ];

  const statuses: string[] = ['all', 'new', 'in_progress', 'resolved'];

  const filteredEnquiries = enquiries.filter(enq => {
    const matchesType = selectedType === 'all' || enq.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || enq.status === selectedStatus;
    const matchesSearch = !globalSearchQuery || 
      enq.sender_name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      enq.subject.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      enq.message.toLowerCase().includes(globalSearchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const filteredNews = news.filter(n => {
    if (!globalSearchQuery) return true;
    const q = globalSearchQuery.toLowerCase();
    return (n.title || '').toLowerCase().includes(q) || (n.summary || '').toLowerCase().includes(q);
  });

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'new': return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#D9762E]/15 text-[#D9762E] border border-[#D9762E]/30 animate-pulse"><Clock size={12} /> New Request</span>;
      case 'in_progress': return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#C9A646]/20 text-[#8A5000] dark:text-[#FFD27F] border border-[#C9A646]/30"><Sparkles size={12} /> In Progress</span>;
      case 'resolved': return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#401C0C]/15 dark:bg-[#401C0C]/30 text-[#401C0C] dark:text-[#FFD27F] border border-[#401C0C]/30"><CheckCircle2 size={12} /> Resolved</span>;
    }
  };

  const getTypeBadge = (type: EnquiryType) => {
    switch (type) {
      case 'media': return <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 font-bold text-[10px] uppercase tracking-wider">Press & Media</span>;
      case 'sponsorship_enquiry': return <span className="px-2 py-0.5 rounded bg-[#C9A646]/20 text-[#8A5000] dark:text-[#FFD27F] font-bold text-[10px] uppercase tracking-wider">CSR Sponsor</span>;
      case 'general': return <span className="px-2 py-0.5 rounded bg-[#401C0C]/10 text-[#401C0C] dark:text-[#FFD27F] font-bold text-[10px] uppercase tracking-wider">General Query</span>;
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        setNewsImage(data.url);
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle) {
      alert('Please enter article title.');
      return;
    }

    const payload = {
      title: newsTitle,
      date: newsDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      type: newsType,
      mediaUrl: newsType === 'video' ? newsMediaUrl : undefined,
      image: newsImage || '/images/News/DHARA Divine Awards Ceremony.jpg',
      link: newsLink,
      summary: newsSummary
    };

    if (editingId) {
      await updateNews(editingId, payload);
    } else {
      await addNews(payload);
    }

    setNewsTitle('');
    setNewsDate('');
    setNewsType('image');
    setNewsMediaUrl('');
    setNewsImage('');
    setNewsLink('');
    setNewsSummary('');
    setEditingId(null);
    setShowAddModal(false);
  };

  const handleEditClick = (n: any) => {
    setEditingId(n.id);
    setNewsTitle(n.title || '');
    setNewsDate(n.date || '');
    setNewsType(n.type || (n.mediaUrl ? 'video' : 'image'));
    setNewsMediaUrl(n.mediaUrl || '');
    setNewsImage(n.image || '');
    setNewsLink(n.link || '');
    setNewsSummary(n.summary || '');
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Workspace Switcher Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm flex flex-col justify-between gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
              <MessageSquare className="text-[#D9762E]" /> Enquiries & Media Control Center
            </h2>
            <p className="text-xs text-[#867463] dark:text-[#9CA3AF] mt-1">
              Manage press pass accreditations, devotee inquiries, and publish dynamic news articles
            </p>
          </div>
          
          {/* Main Tab Toggle */}
          <div className="flex items-center gap-2 bg-[#F5F3EE] dark:bg-[#242622] p-1.5 rounded-2xl border border-[#E4E2DD] dark:border-[#30312E]">
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'enquiries'
                  ? 'bg-[#401C0C] text-white shadow-md'
                  : 'text-[#534436] dark:text-[#D1D5DB] hover:text-[#401C0C]'
              }`}
            >
              <MessageSquare size={14} /> Devotee Inquiries ({enquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'news'
                  ? 'bg-[#401C0C] text-white shadow-md'
                  : 'text-[#534436] dark:text-[#D1D5DB] hover:text-[#401C0C]'
              }`}
            >
              <Newspaper size={14} /> Dynamic News Articles ({news.length})
            </button>
          </div>
        </div>

        {/* Tab 1 Filters */}
        {activeTab === 'enquiries' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#F5F3EE] dark:border-[#2E302A]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mr-2 flex items-center gap-1">
                <Filter size={14} /> Category:
              </span>
              {types.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedType(t.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selectedType === t.id
                      ? 'bg-[#401C0C] dark:bg-[#FFD27F] text-white dark:text-[#401C0C] font-bold shadow-sm'
                      : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-[#F5F3EE] dark:bg-[#242622] p-1 rounded-xl border border-[#E4E2DD] dark:border-[#30312E]">
              {statuses.map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1 text-xs rounded-lg uppercase font-bold transition-all cursor-pointer ${
                    selectedStatus === st ? 'bg-white dark:bg-[#1B1C19] text-[#401C0C] dark:text-[#FFD27F] shadow-sm' : 'text-[#867463]'
                  }`}
                >
                  {st === 'all' ? 'All Status' : st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2 Header Controls */}
        {activeTab === 'news' && (
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#F5F3EE] dark:border-[#2E302A]">
            <p className="text-xs text-[#867463]">
              Articles added here will immediately appear dynamically in the News & Media section of the promotional website.
            </p>
            <button
              onClick={() => {
                setEditingId(null);
                setNewsTitle('');
                setNewsDate('');
                setNewsImage('');
                setNewsLink('');
                setNewsSummary('');
                setShowAddModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#D9762E] hover:bg-[#b85e1b] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer shrink-0"
            >
              <Plus size={16} /> Publish New Article
            </button>
          </div>
        )}
      </div>

      {/* ENQUIRIES TAB */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          {filteredEnquiries.length === 0 ? (
            <div className="py-16 text-center bg-white dark:bg-[#1B1C19] rounded-3xl border border-dashed border-[#E4E2DD] dark:border-[#30312E] text-xs text-[#867463] italic">
              No inquiries matching the selected filters.
            </div>
          ) : (
            filteredEnquiries.map(enq => (
              <div 
                key={enq.id}
                className={`p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border transition-all ${
                  enq.status === 'new' 
                    ? 'border-[#D9762E]/60 shadow-md bg-gradient-to-r from-white via-[#FDFBF8] to-[#FFF9F2] dark:from-[#1B1C19] dark:to-[#221F1A]' 
                    : 'border-[#EAE8E3] dark:border-[#30312E] shadow-sm'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#F5F3EE] dark:border-[#2E302A]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      {getTypeBadge(enq.type)}
                      <span className="text-[11px] text-[#867463] font-mono">Received: {enq.created_at.slice(0, 10)}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1B1C19] dark:text-[#F3F4F6] mt-1">
                      {enq.subject}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-[#534436] dark:text-[#D1D5DB] pt-1">
                      <span className="font-semibold">{enq.sender_name}</span>
                      {enq.organization && (
                        <span className="flex items-center gap-1 text-[#867463]"><Building2 size={12} /> {enq.organization}</span>
                      )}
                      <span className="flex items-center gap-1 text-[#867463] font-mono"><Mail size={12} /> {enq.email}</span>
                      {enq.phone && <span className="flex items-center gap-1 text-[#867463] font-mono"><Phone size={12} /> {enq.phone}</span>}
                    </div>
                  </div>
                  <div>{getStatusBadge(enq.status)}</div>
                </div>

                <div className="py-4">
                  <p className="text-sm text-[#1B1C19] dark:text-[#E5E7EB] leading-relaxed bg-[#F5F3EE]/60 dark:bg-[#242622]/60 p-4 rounded-2xl border border-[#E4E2DD] dark:border-[#30312E]">
                    {enq.message}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="text-[11px] text-[#867463]">
                    ID: <strong className="font-mono">{enq.id}</strong> • Assigned Desk: <strong className="text-[#401C0C] dark:text-[#FFD27F]">Media & Public Relations</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Simulated Reply: Opening email composer to ${enq.email} with Dhara Foundations letterhead template.`)}
                      className="px-4 py-2 rounded-xl bg-[#F5F3EE] dark:bg-[#242622] text-[#401C0C] dark:text-[#FFD27F] font-semibold text-xs hover:bg-[#EAE8E3] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send size={13} /> Reply via Email
                    </button>

                    {enq.status !== 'in_progress' && enq.status !== 'resolved' && (
                      <button
                        onClick={() => updateEnquiryStatus(enq.id, 'in_progress')}
                        className="px-3.5 py-2 rounded-xl bg-[#C9A646]/20 text-[#8A5000] dark:text-[#FFD27F] font-semibold text-xs hover:bg-[#C9A646] hover:text-white transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Sparkles size={13} /> Mark In Progress
                      </button>
                    )}
                    {enq.status !== 'resolved' && (
                      <button
                        onClick={() => updateEnquiryStatus(enq.id, 'resolved')}
                        className="px-4 py-2 rounded-xl bg-[#401C0C] text-white font-semibold text-xs hover:bg-[#5C2913] transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        <Check size={13} /> Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* DYNAMIC NEWS MANAGEMENT TAB */}
      {activeTab === 'news' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white dark:bg-[#1B1C19] rounded-3xl border border-dashed border-[#E4E2DD] dark:border-[#30312E] text-xs text-[#867463] italic">
              No news articles found. Click "Publish New Article" to add one.
            </div>
          ) : (
            filteredNews.map(n => (
              <div 
                key={n.id}
                className="bg-white dark:bg-[#1B1C19] rounded-3xl border border-[#EAE8E3] dark:border-[#30312E] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-[#121310] overflow-hidden flex items-center justify-center p-1">
                    <img 
                      src={n.image || '/images/News/DHARA Divine Awards Ceremony.jpg'} 
                      alt={n.title}
                      className="w-full h-full object-contain"
                      onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-[#FFD27F] text-[10px] font-mono px-2.5 py-1 rounded-lg border border-white/20">
                      {n.date}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-serif font-bold text-base text-[#1B1C19] dark:text-[#F3F4F6] line-clamp-2 leading-snug">
                      {n.title}
                    </h3>
                    <p className="text-xs text-[#867463] dark:text-[#9CA3AF] line-clamp-3 leading-relaxed">
                      {n.summary}
                    </p>
                    {n.link && (
                      <a 
                        href={n.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#D9762E] hover:underline font-mono pt-1"
                      >
                        <ExternalLink size={12} /> View Source Link
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-4 border-t border-[#F5F3EE] dark:border-[#2E302A] bg-[#FAF8F5] dark:bg-[#151613] flex items-center justify-between">
                  <span className="text-[10px] text-[#867463] font-mono">{n.id}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditClick(n)}
                      className="p-2 rounded-xl bg-white dark:bg-[#242622] text-[#401C0C] dark:text-[#FFD27F] border border-[#E4E2DD] dark:border-[#30312E] hover:bg-[#F5F3EE] transition-all cursor-pointer"
                      title="Edit Article"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete article "${n.title}"?`)) {
                          deleteNews(n.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                      title="Delete Article"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ADD / EDIT NEWS MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-scale-up my-8">
            <div className="flex items-center justify-between border-b border-[#F5F3EE] dark:border-[#2E302A] pb-4">
              <h3 className="font-serif text-xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
                <Newspaper className="text-[#D9762E]" /> {editingId ? 'Edit News Article' : 'Publish Dynamic News Article'}
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl text-[#867463] hover:text-[#1B1C19] hover:bg-[#F5F3EE] dark:hover:bg-[#242622] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleNewsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#534436] dark:text-[#D1D5DB] mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  placeholder="e.g. Dhara Divine Awards Honored by Union Minister..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E4E2DD] dark:border-[#30312E] bg-[#FBF9F4] dark:bg-[#242622] text-sm text-[#1B1C19] dark:text-white focus:outline-none focus:border-[#D9762E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#534436] dark:text-[#D1D5DB] mb-1.5">
                  Media Coverage Format Type
                </label>
                <div className="flex items-center gap-6 bg-[#F5F3EE] dark:bg-[#242622] p-3 rounded-xl border border-[#E4E2DD] dark:border-[#30312E]">
                  <label className="flex items-center gap-2 text-xs font-bold text-[#1B1C19] dark:text-white cursor-pointer">
                    <input
                      type="radio"
                      name="enqNewsType"
                      value="image"
                      checked={newsType === 'image'}
                      onChange={() => setNewsType('image')}
                      className="text-[#D9762E]"
                    />
                    📷 Photo Article / Press Image
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-[#1B1C19] dark:text-white cursor-pointer">
                    <input
                      type="radio"
                      name="enqNewsType"
                      value="video"
                      checked={newsType === 'video'}
                      onChange={() => setNewsType('video')}
                      className="text-[#D9762E]"
                    />
                    🎥 Video Coverage / Reel MP4
                  </label>
                </div>
              </div>

              {newsType === 'video' && (
                <div>
                  <label className="block text-xs font-bold text-[#534436] dark:text-[#D1D5DB] mb-1">
                    Video MP4 File Path / URL *
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      required
                      value={newsMediaUrl}
                      onChange={(e) => setNewsMediaUrl(e.target.value)}
                      placeholder="e.g. /images/News/WhatsApp Video 2026-07-20 at 3.32.09 PM.mp4"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[#E4E2DD] dark:border-[#30312E] bg-[#FBF9F4] dark:bg-[#242622] text-sm text-[#1B1C19] dark:text-white focus:outline-none focus:border-[#D9762E]"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#534436] dark:text-[#D1D5DB] mb-1">
                    Publication Date
                  </label>
                  <input
                    type="text"
                    value={newsDate}
                    onChange={(e) => setNewsDate(e.target.value)}
                    placeholder="e.g. 24 Jan, 2025"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E4E2DD] dark:border-[#30312E] bg-[#FBF9F4] dark:bg-[#242622] text-sm text-[#1B1C19] dark:text-white focus:outline-none focus:border-[#D9762E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#534436] dark:text-[#D1D5DB] mb-1">
                    Source Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={newsLink}
                    onChange={(e) => setNewsLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E4E2DD] dark:border-[#30312E] bg-[#FBF9F4] dark:bg-[#242622] text-sm text-[#1B1C19] dark:text-white focus:outline-none focus:border-[#D9762E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#534436] dark:text-[#D1D5DB] mb-1">
                  Article Image (Cover Photo)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newsImage}
                    onChange={(e) => setNewsImage(e.target.value)}
                    placeholder="/images/News/... or http://..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#E4E2DD] dark:border-[#30312E] bg-[#FBF9F4] dark:bg-[#242622] text-sm text-[#1B1C19] dark:text-white focus:outline-none focus:border-[#D9762E]"
                  />
                  <label className="px-3.5 py-2.5 rounded-xl bg-[#F5F3EE] dark:bg-[#242622] text-[#401C0C] dark:text-[#FFD27F] font-bold text-xs hover:bg-[#EAE8E3] cursor-pointer flex items-center gap-1.5 shrink-0 border border-[#E4E2DD] dark:border-[#30312E]">
                    <Upload size={14} /> {uploading ? 'Uploading...' : 'Upload'}
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#534436] dark:text-[#D1D5DB] mb-1">
                  Summary / Excerpt
                </label>
                <textarea
                  rows={4}
                  value={newsSummary}
                  onChange={(e) => setNewsSummary(e.target.value)}
                  placeholder="Provide a short description of the news article..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E4E2DD] dark:border-[#30312E] bg-[#FBF9F4] dark:bg-[#242622] text-sm text-[#1B1C19] dark:text-white focus:outline-none focus:border-[#D9762E]"
                />
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
                  {editingId ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, Save, Video, BarChart2, ShieldCheck, Plus, Trash2, 
  Image as ImageIcon, Users, ArrowUpDown, Home, Info, Building2, 
  CheckCircle2, Newspaper, Edit3, ExternalLink, X, Upload, Calendar
} from 'lucide-react';

export const SettingsWorkspace: React.FC = () => {
  const { siteConfig, updateSiteConfig, news, addNews, updateNews, deleteNews, globalSearchQuery } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'home' | 'about' | 'subdomains' | 'news' | 'trustees' | 'registrations'>('home');
  
  // Home Section
  const [heroVideoUrl, setHeroVideoUrl] = useState('');
  const [heroVideoPoster, setHeroVideoPoster] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [heroMediaOrder, setHeroMediaOrder] = useState<'video-first' | 'image-first'>('video-first');
  
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

  // About Us Section
  const [aboutStats, setAboutStats] = useState<{ number: string, label: string }[]>([
    { number: '25+', label: 'Completed Projects' },
    { number: '10k+', label: 'Lives Touched' },
    { number: '80G', label: 'Tax Exemption' }
  ]);

  // Subdomains & Dynamic Forms Config
  const [donorPresets, setDonorPresets] = useState<{ amount: string; label: string; impact: string; desc: string }[]>([
    { amount: '501', label: '₹501', impact: 'Meal Seva', desc: 'Sponsor pure Sattvic meals and sacred prasad for a student delegate.' },
    { amount: '1008', label: '₹1,008', impact: 'Sevak Support', desc: 'Sponsor event souvenir kit, green handbook, and transport support.' },
    { amount: '5001', label: '₹5,001', impact: 'Kala Seva', desc: 'Sponsor travel and honorarium for traditional musician/folk artist.' },
    { amount: '10008', label: '₹10,008', impact: 'Nominee Seva', desc: 'Sponsor a grassroots social worker nominee round-trip travel.' }
  ]);

  const [bankDetails, setBankDetails] = useState({
    bankName: 'HDFC Bank',
    accountName: 'Dhara Foundations',
    accountNumber: '50200012345678',
    ifsc: 'HDFC0001234',
    branch: 'Chennai Main Branch',
    upiId: 'dharafoundations@hdfcbank'
  });

  const [taxExemptText, setTaxExemptText] = useState('All donations made to Dhara Foundations are eligible for 50% Tax Deduction under Section 80G of the Income Tax Act.');

  const [registrationTickets, setRegistrationTickets] = useState<{ id: string; name: string; price: string; description: string; features: string }[]>([
    {
      id: 'delegate',
      name: 'Delegate Pass',
      price: '₹1,500',
      description: 'Access to main awards ceremony and youth plenary sessions.',
      features: 'Seva Pass Entry, Satvik Dinner, Preferred Seating, Delegate Kit'
    },
    {
      id: 'premium',
      name: 'Premium Delegate',
      price: '₹3,000',
      description: 'Full delegate access to awards, exhibitions, and networking lounge.',
      features: 'Premium Row Seating, Satvik Dinner, Souvenir Kit, Priority Registration'
    },
    {
      id: 'patron',
      name: 'Patron Pass',
      price: '₹5,000',
      description: 'Exclusive access to VIP networking, front-row seating, and private dinner.',
      features: 'Reserved VIP Seating, Satvik Dinner, Meet & Greet with Dignitaries'
    }
  ]);

  const [contactInfo, setContactInfo] = useState({
    email: 'info@dharafoundations.in',
    phone: '+91 94440 12345',
    address: 'Dhara Foundations Trust Office, Chennai, Tamil Nadu',
    timings: 'Monday - Saturday: 9:00 AM - 6:00 PM IST'
  });

  const [registrations, setRegistrations] = useState<{ title: string, detail: string, description: string }[]>([
    {
      title: "Indian Trust Act, 1882",
      detail: "Registered Public Non-profit Organization",
      description: "Formed on 20.11.2024 under the Indian Trust Act 1882 and Indian Income Tax Act 1961 as a public charitable non-profit organization."
    },
    {
      title: "12A Income Tax Exemption",
      detail: "Reg. No: AAETD8857AE20241",
      description: "Granted permanent tax-exempt status for legacy charitable and spiritual activities."
    },
    {
      title: "80G Tax Deductions",
      detail: "Reg. No: AAETD8857AF20241",
      description: "All individual and corporate donations are eligible for a 50% tax deduction under Section 80G."
    },
    {
      title: "MCA CSR Approved",
      detail: "Reg. No: CSR00086947",
      description: "Registered with the Ministry of Corporate Affairs to undertake Section 135 Corporate Social Responsibility programs."
    },
    {
      title: "NGO DARPAN",
      detail: "ID: TN/2024/0473120",
      description: "Registered under NITI Aayog's NGO Darpan database for centralized accountability."
    }
  ]);

  // Founders Section
  const [founders, setFounders] = useState<{ name: string, role: string, bio: string, image: string, useDefaultIcon: boolean, order: number }[]>([
    {
      name: "S. Vinoth Ragavendran",
      role: "Founder President & Trustee",
      bio: "With over two decades of leadership in engineering and construction, Vinoth is actively involved in temple heritage protection, traditional restoration, and legal advocacy for public heritage rights across Tamil Nadu.",
      image: "/images/S. Vinoth Ragavendran.jpg",
      useDefaultIcon: true,
      order: 1
    },
    {
      name: "P. Ezhumalai",
      role: "Agriculturist, Social Worker & Trustee",
      bio: "A dedicated agriculturist and progressive dairy farmer, Ezhumalai has spent his life working in public welfare, guiding local community initiatives, and fostering traditional moral values at the grassroot levels.",
      image: "/logo/photo_6195100629672333271_y.jpg",
      useDefaultIcon: true,
      order: 2
    },
    {
      name: "S. Srividhya",
      role: "Chartered Accountant, CS & Trustee",
      bio: "A dual-qualified professional (CA and CS) with extensive experience in corporate governance, Srividhya oversees the administrative precision, compliance, and strict financial transparency of the non-profit organization's initiatives.",
      image: "/logo/photo_6195100629672333269_y.jpg",
      useDefaultIcon: true,
      order: 3
    }
  ]);

  // News Modal State inside Site Settings
  const [showNewsModal, setShowNewsModal] = useState<boolean>(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState<string>('');
  const [newsDate, setNewsDate] = useState<string>('');
  const [newsType, setNewsType] = useState<'image' | 'video'>('image');
  const [newsMediaUrl, setNewsMediaUrl] = useState<string>('');
  const [newsImage, setNewsImage] = useState<string>('');
  const [newsLink, setNewsLink] = useState<string>('');
  const [newsSummary, setNewsSummary] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (siteConfig) {
      setHeroVideoUrl(siteConfig.heroVideoUrl || '');
      setHeroVideoPoster(siteConfig.heroVideoPoster || '');
      setHeroImageUrl(siteConfig.heroImageUrl || '');
      setHeroMediaOrder(siteConfig.heroMediaOrder || 'video-first');

      if (siteConfig.homeStats && siteConfig.homeStats.length > 0) {
        setHomeStats(siteConfig.homeStats);
      }
      if (siteConfig.aboutStats && siteConfig.aboutStats.length > 0) {
        setAboutStats(siteConfig.aboutStats);
      }
      if (siteConfig.founders && siteConfig.founders.length > 0) {
        setFounders(siteConfig.founders);
      }
      if (siteConfig.homeCredentials && siteConfig.homeCredentials.length > 0) {
        setHomeCredentials(siteConfig.homeCredentials);
      }
      if (siteConfig.registrations && siteConfig.registrations.length > 0) {
        setRegistrations(siteConfig.registrations);
      }

      if (siteConfig.donorConfig) {
        if (siteConfig.donorConfig.presets) setDonorPresets(siteConfig.donorConfig.presets);
        if (siteConfig.donorConfig.bankDetails) setBankDetails(siteConfig.donorConfig.bankDetails);
        if (siteConfig.donorConfig.taxExemptText) setTaxExemptText(siteConfig.donorConfig.taxExemptText);
      }

      if (siteConfig.eventRegConfig && siteConfig.eventRegConfig.tickets) {
        setRegistrationTickets(siteConfig.eventRegConfig.tickets.map((t: any) => ({
          ...t,
          features: Array.isArray(t.features) ? t.features.join(', ') : t.features || ''
        })));
      } else if (siteConfig.registrationTickets && siteConfig.registrationTickets.length > 0) {
        setRegistrationTickets(siteConfig.registrationTickets.map((t: any) => ({
          ...t,
          features: Array.isArray(t.features) ? t.features.join(', ') : t.features || ''
        })));
      }

      if (siteConfig.generalEnquiriesConfig) {
        setContactInfo(prev => ({ ...prev, ...siteConfig.generalEnquiriesConfig }));
      }
    }
  }, [siteConfig]);

  // Filtering news search
  const filteredNews = news.filter(n => {
    if (!globalSearchQuery) return true;
    const q = globalSearchQuery.toLowerCase();
    return (n.title || '').toLowerCase().includes(q) || (n.summary || '').toLowerCase().includes(q);
  });

  // Handlers
  const handleHomeStatChange = (index: number, field: 'number'|'label', value: string) => {
    const newStats = [...homeStats];
    newStats[index][field] = value;
    setHomeStats(newStats);
  };
  const addHomeStat = () => setHomeStats([...homeStats, { number: '', label: '' }]);
  const removeHomeStat = (index: number) => setHomeStats(homeStats.filter((_, i) => i !== index));

  const handleAboutStatChange = (index: number, field: 'number'|'label', value: string) => {
    const newStats = [...aboutStats];
    newStats[index][field] = value;
    setAboutStats(newStats);
  };
  const addAboutStat = () => setAboutStats([...aboutStats, { number: '', label: '' }]);
  const removeAboutStat = (index: number) => setAboutStats(aboutStats.filter((_, i) => i !== index));

  const handleFounderChange = (index: number, field: string, value: any) => {
    const newFounders = [...founders];
    newFounders[index] = { ...newFounders[index], [field]: value };
    setFounders(newFounders);
  };
  const addFounder = () => setFounders([...founders, { name: '', role: '', bio: '', image: '', useDefaultIcon: true, order: founders.length + 1 }]);
  const removeFounder = (index: number) => setFounders(founders.filter((_, i) => i !== index));

  const handleCredChange = (index: number, field: 'prefix'|'highlight', value: string) => {
    const newCreds = [...homeCredentials];
    newCreds[index][field] = value;
    setHomeCredentials(newCreds);
  };
  const addCred = () => setHomeCredentials([...homeCredentials, { prefix: '', highlight: '' }]);
  const removeCred = (index: number) => setHomeCredentials(homeCredentials.filter((_, i) => i !== index));

  const handleRegChange = (index: number, field: 'title'|'detail'|'description', value: string) => {
    const newRegs = [...registrations];
    newRegs[index][field] = value;
    setRegistrations(newRegs);
  };
  const addReg = () => setRegistrations([...registrations, { title: '', detail: '', description: '' }]);
  const removeReg = (index: number) => setRegistrations(registrations.filter((_, i) => i !== index));

  const handleDonorPresetChange = (index: number, field: string, value: string) => {
    const updated = [...donorPresets];
    updated[index] = { ...updated[index], [field]: value };
    setDonorPresets(updated);
  };
  const addDonorPreset = () => setDonorPresets([...donorPresets, { amount: '2001', label: '₹2,001', impact: 'General Seva', desc: 'Sponsor essential event logistics.' }]);
  const removeDonorPreset = (index: number) => setDonorPresets(donorPresets.filter((_, i) => i !== index));

  const handleTicketChange = (index: number, field: string, value: string) => {
    const updated = [...registrationTickets];
    updated[index] = { ...updated[index], [field]: value };
    setRegistrationTickets(updated);
  };

  // News Handlers
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);

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
      setUploadingImage(false);
    }
  };

  const handleNewsFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle) {
      alert('Please enter an article title.');
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

    if (editingNewsId) {
      await updateNews(editingNewsId, payload);
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
    setEditingNewsId(null);
    setShowNewsModal(false);
  };

  const openNewsEdit = (item: any) => {
    setEditingNewsId(item.id);
    setNewsTitle(item.title || '');
    setNewsDate(item.date || '');
    setNewsType(item.type || (item.mediaUrl ? 'video' : 'image'));
    setNewsMediaUrl(item.mediaUrl || '');
    setNewsImage(item.image || '');
    setNewsLink(item.link || '');
    setNewsSummary(item.summary || '');
    setShowNewsModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const parsedTickets = registrationTickets.map(t => ({
      ...t,
      features: typeof t.features === 'string' ? t.features.split(',').map(f => f.trim()).filter(Boolean) : t.features
    }));

    await updateSiteConfig({
      ...siteConfig,
      heroVideoUrl,
      heroVideoPoster,
      heroImageUrl,
      heroMediaOrder,
      homeStats,
      aboutStats,
      founders,
      homeCredentials,
      registrations,
      registrationTickets: parsedTickets,
      donorConfig: {
        presets: donorPresets,
        bankDetails,
        taxExemptText
      },
      eventRegConfig: {
        eventYear: siteConfig?.eventYear || '2026',
        tickets: parsedTickets
      },
      generalEnquiriesConfig: contactInfo
    });
    setSaving(false);
    alert('Site settings & subdomain configurations updated successfully!');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Panel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
              <Settings className="text-[#D9762E]" /> Site Settings & Content Control
            </h2>
            <p className="text-xs text-[#867463] dark:text-[#9CA3AF] mt-1">
              Configure dynamic media, impact statistics, news articles, founder trustees, and legal registrations.
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

        {/* Section Navigation Sub-Tabs */}
        <div className="flex items-center gap-2 pt-6 border-t border-[#F5F3EE] dark:border-[#2E302A] mt-6 flex-wrap">
          <button
            onClick={() => setActiveSubTab('home')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'home'
                ? 'bg-[#401C0C] text-white shadow-md'
                : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
            }`}
          >
            <Home size={16} /> Home Section Settings
          </button>

          <button
            onClick={() => setActiveSubTab('about')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'about'
                ? 'bg-[#401C0C] text-white shadow-md'
                : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
            }`}
          >
            <Info size={16} /> About Us Section Settings
          </button>

          <button
            onClick={() => setActiveSubTab('subdomains')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'subdomains'
                ? 'bg-[#401C0C] text-white shadow-md'
                : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
            }`}
          >
            <Building2 size={16} /> Subdomains & Dynamic Forms Control
          </button>

          <button
            onClick={() => setActiveSubTab('news')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'news'
                ? 'bg-[#401C0C] text-white shadow-md'
                : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
            }`}
          >
            <Newspaper size={16} /> News Section Settings ({news.length})
          </button>

          <button
            onClick={() => setActiveSubTab('trustees')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'trustees'
                ? 'bg-[#401C0C] text-white shadow-md'
                : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
            }`}
          >
            <Users size={16} /> Trustees & Founders ({founders.length})
          </button>

          <button
            onClick={() => setActiveSubTab('registrations')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'registrations'
                ? 'bg-[#401C0C] text-white shadow-md'
                : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
            }`}
          >
            <ShieldCheck size={16} /> Trust Registrations ({registrations.length})
          </button>
        </div>
      </div>

      {/* SUB TAB 1: HOME SECTION */}
      {activeSubTab === 'home' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hero Media Controls */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-5">
            <h3 className="font-serif text-xl font-bold flex items-center gap-2 text-[#401C0C] dark:text-[#F3F4F6]">
              <Video className="text-[#C9A646]" size={20} /> Hero Section Media & Display Order
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5 flex items-center gap-1.5">
                <ArrowUpDown size={14} className="text-[#D9762E]" /> Media Order (Which comes 1st?)
              </label>
              <select
                value={heroMediaOrder}
                onChange={(e) => setHeroMediaOrder(e.target.value as any)}
                className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-sm focus:outline-none focus:border-[#401C0C]"
              >
                <option value="video-first">Video 1st (Banner Video plays first, Image secondary)</option>
                <option value="image-first">Image 1st (Hero Banner Image shown first, Video secondary)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5">
                Hero Video URL (MP4 / WebM / Link)
              </label>
              <input
                type="text"
                value={heroVideoUrl}
                onChange={(e) => setHeroVideoUrl(e.target.value)}
                placeholder="e.g. /video/hero section video.mp4"
                className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-sm focus:outline-none focus:border-[#401C0C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5 flex items-center gap-1.5">
                <ImageIcon size={14} className="text-[#D9762E]" /> Hero Banner Image URL
              </label>
              <input
                type="text"
                value={heroImageUrl}
                onChange={(e) => setHeroImageUrl(e.target.value)}
                placeholder="e.g. /images/News/DHARA Divine Awards Ceremony.jpg"
                className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-sm focus:outline-none focus:border-[#401C0C]"
              />
            </div>
          </div>

          {/* Home Stats */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold flex items-center gap-2 text-[#401C0C] dark:text-[#F3F4F6]">
                <BarChart2 className="text-[#C9A646]" size={20} /> Home Page Stats & Impact Highlights
              </h3>
              <button onClick={addHomeStat} className="text-[#D9762E] hover:text-[#C9A646] p-1.5 bg-[#F5F3EE] dark:bg-[#242622] rounded-lg border border-[#EAE8E3] dark:border-[#30312E] flex items-center gap-1 text-xs font-semibold">
                <Plus size={14} /> Add Stat
              </button>
            </div>
            
            <div className="space-y-3">
              {homeStats.map((stat, index) => (
                <div key={index} className="flex gap-2 items-center p-2.5 bg-[#F9F8F6] dark:bg-[#242622] border border-[#EAE8E3] dark:border-[#30312E] rounded-xl">
                  <div className="w-28">
                    <input
                      type="text"
                      value={stat.number}
                      onChange={(e) => handleHomeStatChange(index, 'number', e.target.value)}
                      placeholder="e.g. 3"
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded-lg p-2 text-xs font-bold text-center"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleHomeStatChange(index, 'label', e.target.value)}
                      placeholder="e.g. Founding Trustees"
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded-lg p-2 text-xs"
                    />
                  </div>
                  <button onClick={() => removeHomeStat(index)} className="p-2 text-red-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials Strip */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-5 lg:col-span-2">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold flex items-center gap-2 text-[#401C0C] dark:text-[#F3F4F6]">
                <ShieldCheck className="text-[#C9A646]" size={20} /> Home Glassmorphic Trust Credentials Banner
              </h3>
              <button onClick={addCred} className="text-[#D9762E] hover:text-[#C9A646] p-1.5 bg-[#F5F3EE] dark:bg-[#242622] rounded-lg border border-[#EAE8E3] dark:border-[#30312E] flex items-center gap-1 text-xs font-semibold">
                <Plus size={14} /> Add Credential Item
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
                      <label className="block text-[10px] uppercase tracking-wider text-[#867463] mb-1">Highlighted Badge</label>
                      <input
                        type="text"
                        value={cred.highlight}
                        onChange={(e) => handleCredChange(index, 'highlight', e.target.value)}
                        placeholder="e.g. Registered"
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2 py-1 text-xs font-bold text-[#D9762E]"
                      />
                    </div>
                  </div>
                  <button onClick={() => removeCred(index)} className="p-2 mt-4 text-red-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 2: ABOUT US SECTION */}
      {activeSubTab === 'about' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold flex items-center gap-2 text-[#401C0C] dark:text-[#F3F4F6]">
                <BarChart2 className="text-[#C9A646]" size={20} /> About Us Milestone Values & Impact Statistics
              </h3>
              <button onClick={addAboutStat} className="text-[#D9762E] hover:text-[#C9A646] p-1.5 bg-[#F5F3EE] dark:bg-[#242622] rounded-lg border border-[#EAE8E3] dark:border-[#30312E] flex items-center gap-1 text-xs font-semibold">
                <Plus size={14} /> Add Stat
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aboutStats.map((stat, index) => (
                <div key={index} className="flex gap-2 items-center p-3 bg-[#F9F8F6] dark:bg-[#242622] border border-[#EAE8E3] dark:border-[#30312E] rounded-xl">
                  <div className="w-24">
                    <input
                      type="text"
                      value={stat.number}
                      onChange={(e) => handleAboutStatChange(index, 'number', e.target.value)}
                      placeholder="e.g. 25+"
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded-lg p-2 text-xs font-bold text-center"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleAboutStatChange(index, 'label', e.target.value)}
                      placeholder="e.g. COMPLETED PROJECTS"
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded-lg p-2 text-xs"
                    />
                  </div>
                  <button onClick={() => removeAboutStat(index)} className="p-2 text-red-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB: SUBDOMAINS & DYNAMIC FORMS CONTROL */}
      {activeSubTab === 'subdomains' && (
        <div className="space-y-6">
          {/* Donate Page Settings */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl font-bold flex items-center gap-2 text-[#401C0C] dark:text-[#F3F4F6]">
                <Building2 className="text-[#C9A646]" size={20} /> Donate Subdomain — Giving Gateway & Presets
              </h3>
              <button onClick={addDonorPreset} className="text-[#D9762E] hover:text-[#C9A646] p-1.5 bg-[#F5F3EE] dark:bg-[#242622] rounded-lg border border-[#EAE8E3] dark:border-[#30312E] flex items-center gap-1 text-xs font-semibold">
                <Plus size={14} /> Add Preset Tier
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {donorPresets.map((preset, index) => (
                <div key={index} className="p-4 bg-[#F9F8F6] dark:bg-[#242622] border border-[#EAE8E3] dark:border-[#30312E] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={preset.label}
                      onChange={(e) => handleDonorPresetChange(index, 'label', e.target.value)}
                      placeholder="Label (e.g. ₹501)"
                      className="bg-white dark:bg-[#1B1C19] border border-[#E4E2DD] dark:border-[#404040] rounded-lg p-2 text-xs font-bold text-[#401C0C] dark:text-[#FFD27F]"
                    />
                    <input
                      type="text"
                      value={preset.amount}
                      onChange={(e) => handleDonorPresetChange(index, 'amount', e.target.value)}
                      placeholder="Numeric Amount (501)"
                      className="bg-white dark:bg-[#1B1C19] border border-[#E4E2DD] dark:border-[#404040] rounded-lg p-2 text-xs font-bold"
                    />
                    <button onClick={() => removeDonorPreset(index)} className="p-1.5 text-red-400 hover:text-red-500 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={preset.impact}
                    onChange={(e) => handleDonorPresetChange(index, 'impact', e.target.value)}
                    placeholder="Impact Category (e.g. Meal Seva)"
                    className="w-full bg-white dark:bg-[#1B1C19] border border-[#E4E2DD] dark:border-[#404040] rounded-lg p-2 text-xs font-semibold"
                  />
                  <textarea
                    rows={2}
                    value={preset.desc}
                    onChange={(e) => handleDonorPresetChange(index, 'desc', e.target.value)}
                    placeholder="Impact Description..."
                    className="w-full bg-white dark:bg-[#1B1C19] border border-[#E4E2DD] dark:border-[#404040] rounded-lg p-2 text-xs"
                  />
                </div>
              ))}
            </div>

            {/* Bank Details */}
            <div className="pt-4 border-t border-[#F5F3EE] dark:border-[#2E302A] space-y-4">
              <h4 className="font-semibold text-sm text-[#401C0C] dark:text-[#F3F4F6]">Direct Bank Transfer & UPI Settings</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-[#867463] mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={bankDetails.bankName}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, bankName: e.target.value }))}
                    className="w-full bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#867463] mb-1">Account Holder Name</label>
                  <input
                    type="text"
                    value={bankDetails.accountName}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, accountName: e.target.value }))}
                    className="w-full bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#867463] mb-1">Account Number</label>
                  <input
                    type="text"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                    className="w-full bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#867463] mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={bankDetails.ifsc}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, ifsc: e.target.value }))}
                    className="w-full bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#867463] mb-1">Branch</label>
                  <input
                    type="text"
                    value={bankDetails.branch}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, branch: e.target.value }))}
                    className="w-full bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#867463] mb-1">UPI ID</label>
                  <input
                    type="text"
                    value={bankDetails.upiId}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, upiId: e.target.value }))}
                    className="w-full bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Event Registration Ticket Passes Settings */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-5">
            <h3 className="font-serif text-xl font-bold flex items-center gap-2 text-[#401C0C] dark:text-[#F3F4F6]">
              <Calendar className="text-[#C9A646]" size={20} /> Event Registration — Ticket Tiers & Pricing Pass Config
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {registrationTickets.map((ticket, index) => (
                <div key={ticket.id || index} className="p-4 bg-[#F9F8F6] dark:bg-[#242622] border border-[#EAE8E3] dark:border-[#30312E] rounded-2xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D9762E]">{ticket.id}</span>
                    <input
                      type="text"
                      value={ticket.price}
                      onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                      placeholder="₹1,500"
                      className="w-24 bg-white dark:bg-[#1B1C19] border border-[#E4E2DD] dark:border-[#404040] rounded-lg p-1.5 text-xs font-bold text-center"
                    />
                  </div>
                  <input
                    type="text"
                    value={ticket.name}
                    onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                    placeholder="Tier Name (e.g. Premium Delegate)"
                    className="w-full bg-white dark:bg-[#1B1C19] border border-[#E4E2DD] dark:border-[#404040] rounded-lg p-2 text-xs font-bold"
                  />
                  <textarea
                    rows={2}
                    value={ticket.description}
                    onChange={(e) => handleTicketChange(index, 'description', e.target.value)}
                    placeholder="Short description..."
                    className="w-full bg-white dark:bg-[#1B1C19] border border-[#E4E2DD] dark:border-[#404040] rounded-lg p-2 text-xs"
                  />
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#867463] mb-1">Included Features (Comma Separated)</label>
                    <textarea
                      rows={2}
                      value={ticket.features}
                      onChange={(e) => handleTicketChange(index, 'features', e.target.value)}
                      placeholder="Feature 1, Feature 2..."
                      className="w-full bg-white dark:bg-[#1B1C19] border border-[#E4E2DD] dark:border-[#404040] rounded-lg p-2 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* General Contact Info */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold flex items-center gap-2 text-[#401C0C] dark:text-[#F3F4F6]">
              <Edit3 className="text-[#C9A646]" size={20} /> Contact & General Enquiries Info
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#867463] mb-1">Official Contact Email</label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs text-[#867463] mb-1">Helpdesk Phone Number</label>
                <input
                  type="text"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-medium"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-[#867463] mb-1">Office Address</label>
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 3: NEWS SECTION SETTINGS */}
      {activeSubTab === 'news' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#401C0C] dark:text-[#F3F4F6] flex items-center gap-2">
                <Newspaper className="text-[#D9762E]" size={20} /> Dynamic News Articles Management
              </h3>
              <p className="text-xs text-[#867463] dark:text-[#9CA3AF] mt-1">
                Articles published here update dynamically in real-time on the promotional website news section.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingNewsId(null);
                setNewsTitle('');
                setNewsDate('');
                setNewsImage('');
                setNewsLink('');
                setNewsSummary('');
                setShowNewsModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#D9762E] hover:bg-[#b85e1b] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer shrink-0"
            >
              <Plus size={16} /> Publish New Article
            </button>
          </div>

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
                        onClick={() => openNewsEdit(n)}
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
        </div>
      )}

      {/* SUB TAB 4: TRUSTEES & FOUNDERS */}
      {activeSubTab === 'trustees' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold flex items-center gap-2 text-[#401C0C] dark:text-[#F3F4F6]">
              <Users className="text-[#C9A646]" size={20} /> Founders & Board of Trustees Profiles
            </h3>
            <button onClick={addFounder} className="text-[#D9762E] hover:text-[#C9A646] p-1.5 bg-[#F5F3EE] dark:bg-[#242622] rounded-lg border border-[#EAE8E3] dark:border-[#30312E] flex items-center gap-1 text-xs font-semibold">
              <Plus size={14} /> Add Trustee Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {founders.map((founder, index) => (
              <div key={index} className="p-5 bg-[#F9F8F6] dark:bg-[#242622] border border-[#EAE8E3] dark:border-[#30312E] rounded-2xl space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-[#EAE8E3] dark:border-[#30312E] pb-2">
                    <span className="text-xs font-bold font-mono text-[#D9762E]">Trustee #{index + 1}</span>
                    <button onClick={() => removeFounder(index)} className="p-1 text-red-400 hover:text-red-500 rounded">
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#867463] mb-1">Name</label>
                    <input
                      type="text"
                      value={founder.name}
                      onChange={(e) => handleFounderChange(index, 'name', e.target.value)}
                      placeholder="e.g. S. Vinoth Ragavendran"
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2.5 py-1.5 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#867463] mb-1">Role / Designation</label>
                    <input
                      type="text"
                      value={founder.role}
                      onChange={(e) => handleFounderChange(index, 'role', e.target.value)}
                      placeholder="e.g. Founder President & Trustee"
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2.5 py-1.5 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#867463] mb-1">Photo Image Path / URL</label>
                    <input
                      type="text"
                      value={founder.image}
                      onChange={(e) => handleFounderChange(index, 'image', e.target.value)}
                      placeholder="e.g. /images/S. Vinoth Ragavendran.jpg"
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2.5 py-1.5 text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id={`useDefaultIcon-${index}`}
                      checked={founder.useDefaultIcon}
                      onChange={(e) => handleFounderChange(index, 'useDefaultIcon', e.target.checked)}
                      className="rounded border-[#D9CBB0] text-[#401C0C]"
                    />
                    <label htmlFor={`useDefaultIcon-${index}`} className="text-xs text-[#867463] cursor-pointer">
                      Use Default Avatar Fallback
                    </label>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#867463] mb-1">Bio Summary</label>
                    <textarea
                      value={founder.bio}
                      onChange={(e) => handleFounderChange(index, 'bio', e.target.value)}
                      rows={3}
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2.5 py-1.5 text-xs resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB TAB 5: TRUST REGISTRATIONS */}
      {activeSubTab === 'registrations' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold flex items-center gap-2 text-[#401C0C] dark:text-[#F3F4F6]">
              <ShieldCheck className="text-[#C9A646]" size={20} /> Legal Registrations & Non-Profit Certifications
            </h3>
            <button onClick={addReg} className="text-[#D9762E] hover:text-[#C9A646] p-1.5 bg-[#F5F3EE] dark:bg-[#242622] rounded-lg border border-[#EAE8E3] dark:border-[#30312E] flex items-center gap-1 text-xs font-semibold">
              <Plus size={14} /> Add Certification
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {registrations.map((reg, index) => (
              <div key={index} className="p-4 bg-[#F9F8F6] dark:bg-[#242622] border border-[#EAE8E3] dark:border-[#30312E] rounded-2xl space-y-3">
                <div className="flex justify-between items-center border-b border-[#EAE8E3] dark:border-[#30312E] pb-2">
                  <span className="text-xs font-bold font-mono text-[#D9762E]">Certification #{index + 1}</span>
                  <button onClick={() => removeReg(index)} className="p-1 text-red-400 hover:text-red-500 rounded">
                    <Trash2 size={14} />
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#867463] mb-1">Act / Authority Title</label>
                  <input
                    type="text"
                    value={reg.title}
                    onChange={(e) => handleRegChange(index, 'title', e.target.value)}
                    placeholder="e.g. 12A Income Tax Exemption"
                    className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2.5 py-1.5 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#867463] mb-1">Registration Number / Detail Badge</label>
                  <input
                    type="text"
                    value={reg.detail}
                    onChange={(e) => handleRegChange(index, 'detail', e.target.value)}
                    placeholder="e.g. Reg. No: AAETD8857AE20241"
                    className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2.5 py-1.5 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-[#867463] mb-1">Description / Benefit</label>
                  <textarea
                    value={reg.description}
                    onChange={(e) => handleRegChange(index, 'description', e.target.value)}
                    rows={2}
                    className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2.5 py-1.5 text-xs resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD / EDIT NEWS MODAL */}
      {showNewsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-scale-up my-8">
            <div className="flex items-center justify-between border-b border-[#F5F3EE] dark:border-[#2E302A] pb-4">
              <h3 className="font-serif text-xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
                <Newspaper className="text-[#D9762E]" /> {editingNewsId ? 'Edit News Article' : 'Publish Dynamic News Article'}
              </h3>
              <button 
                onClick={() => setShowNewsModal(false)}
                className="p-1.5 rounded-xl text-[#867463] hover:text-[#1B1C19] hover:bg-[#F5F3EE] dark:hover:bg-[#242622] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleNewsFormSubmit} className="space-y-4">
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
                      name="newsType"
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
                      name="newsType"
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
                    <label className="px-3.5 py-2.5 rounded-xl bg-[#F5F3EE] dark:bg-[#242622] text-[#401C0C] dark:text-[#FFD27F] font-bold text-xs hover:bg-[#EAE8E3] cursor-pointer flex items-center gap-1.5 shrink-0 border border-[#E4E2DD] dark:border-[#30312E]">
                      <Upload size={14} /> Upload Video
                      <input 
                        type="file" 
                        accept="video/*,.mp4,.mov,.webm" 
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadingImage(true);
                          try {
                            const formData = new FormData();
                            formData.append('file', file);
                            const res = await fetch('/api/upload', { method: 'POST', body: formData });
                            const data = await res.json();
                            if (data.success && data.url) setNewsMediaUrl(data.url);
                          } catch(err) { alert('Upload failed'); }
                          finally { setUploadingImage(false); }
                        }} 
                        className="hidden" 
                      />
                    </label>
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
                  Article Cover Image
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
                    <Upload size={14} /> {uploadingImage ? 'Uploading...' : 'Upload'}
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
                  placeholder="Provide a short summary of the news article..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E4E2DD] dark:border-[#30312E] bg-[#FBF9F4] dark:bg-[#242622] text-sm text-[#1B1C19] dark:text-white focus:outline-none focus:border-[#D9762E]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F5F3EE] dark:border-[#2E302A]">
                <button
                  type="button"
                  onClick={() => setShowNewsModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] text-xs font-bold hover:bg-[#EAE8E3] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#401C0C] text-white text-xs font-bold hover:bg-[#5C2913] cursor-pointer shadow-md"
                >
                  {editingNewsId ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

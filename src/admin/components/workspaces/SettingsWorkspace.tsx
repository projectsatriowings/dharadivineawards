import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, Save, Video, BarChart2, ShieldCheck, Plus, Trash2, 
  Image as ImageIcon, Users, ArrowUpDown, Home, Info, Building2, 
  CheckCircle2, Newspaper, Edit3, ExternalLink, X, Upload, Calendar, Trophy, HelpCircle, Award, Briefcase
} from 'lucide-react';

export const SettingsWorkspace: React.FC = () => {
  const { siteConfig, updateSiteConfig, news, addNews, updateNews, deleteNews, globalSearchQuery } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'home' | 'about' | 'subdomains' | 'news' | 'trustees' | 'registrations' | 'sponsors' | 'csr'>('home');
  
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
    { amount: '510', label: '₹510', impact: 'Meal Seva', desc: 'Sponsor pure Sattvic meals and sacred prasad for a student delegate.' },
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

  const [razorpayKeyId, setRazorpayKeyId] = useState('');

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

  // Sponsorship Settings States
  const [sponsorshipBenefits, setSponsorshipBenefits] = useState<any[]>([
    {
      title: "Brand Visibility",
      desc: "Gain widespread presence across standard, digital, and stage materials.",
      items: ["Logo on event banners & backdrops", "Website and social media promotions", "Recognition during the award ceremony", "Branding on event print materials"]
    },
    {
      title: "Networking Opportunities",
      desc: "Build strategic relations with social ecosystem leaders and delegates.",
      items: ["Meet industry & corporate leaders", "Connect with NGOs & social organizations", "Build long-term strategic partnerships", "Interact with government officials & influencers"]
    },
    {
      title: "Corporate Recognition",
      desc: "Cement corporate social responsibility prestige on a public platform.",
      items: ["Sponsor appreciation certificates", "Media and press coverage opportunities", "Stage recognition and vocal mentions", "Featured as a social impact partner"]
    }
  ]);

  const [sponsorshipOpportunities, setSponsorshipOpportunities] = useState<any[]>([
    { title: "Event Sponsorship", desc: "Support the Divine Awards event directly and gain extensive corporate brand exposure on stage and screens." },
    { title: "Program Sponsorship", desc: "Sponsor specific rural welfare and educational development projects that align with your organizational goals." },
    { title: "CSR Collaboration", desc: "Establish long-term structured MoUs for multi-year community upliftment initiatives." },
    { title: "In-Kind Sponsorship", desc: "Provide essential venue support, refreshments, technology aids, hospitality, printing materials, or gifts for honorees." }
  ]);

  const [previousSponsors, setPreviousSponsors] = useState<any[]>([
    { name: "ABC Corporation", role: "Title Sponsor 2025" },
    { name: "XYZ Foundations", role: "Platinum Sponsor 2025" },
    { name: "Zenith Tech", role: "Gold Partner 2024" },
    { name: "Indus Seva Co", role: "Silver Patron 2024" }
  ]);

  const [testimonial, setTestimonial] = useState({
    quote: "Partnering with Dhara Foundations allowed us to route section 135 CSR funds into verified grassroots projects that delivered measurable impact. The accountability and transparency was exemplary.",
    author: "Shri. R. Ramanathan",
    designation: "VP Corporate Relations, ABC Corp"
  });

  const [sponsorshipFaqs, setSponsorshipFaqs] = useState<any[]>([
    {
      q: "Can sponsorship packages be customized?",
      a: "Yes. We can tailor sponsorship packages and benefits specifically according to your organization's business objectives, budget, and geographic preferences."
    },
    {
      q: "Will sponsors receive branding benefits?",
      a: "Yes. Every sponsor level receives corresponding visual and stage recognition, including logo placement, social media mentions, and souvenir advertisement pages."
    },
    {
      q: "Can we sponsor a specific award category?",
      a: "Absolutely. Category sponsorships (e.g. sponsoring the 'Women Leader' or 'Educator' award) are available. Please note your choice in the inquiry form."
    },
    {
      q: "Do you provide sponsorship agreements and invoices?",
      a: "Yes. All formal corporate relationships are documented with signed MoUs, legal sponsorship agreements, and standard GST invoices."
    }
  ]);

  const [sponsorshipPackages, setSponsorshipPackages] = useState<any[]>([
    {
      id: 'title',
      name: 'Title Sponsor',
      amount: '₹5,00,000+',
      description: 'Exclusive title branding, keynote speech recognition, and maximum media visibility.',
      benefits: ["Exclusive naming rights", "Main backdrop prominence", "Keynote address slot", "10 VIP Event passes"]
    },
    {
      id: 'platinum',
      name: 'Platinum Sponsor',
      amount: '₹2,50,000+',
      description: 'Main stage panel branding, extensive social promotions, and prominent logo spots.',
      benefits: ["Main stage branding", "AV profile clip slot", "5 VIP Event passes", "Souvenir full-page ad"]
    },
    {
      id: 'gold',
      name: 'Gold Sponsor',
      amount: '₹1,00,000+',
      description: 'Logo placement on branding collaterals, event recognition, and delegate passes.',
      benefits: ["Logo on standard flyers", "Reception standee slot", "3 VIP Event passes", "Social media mentions"]
    },
    {
      id: 'silver',
      name: 'Silver Sponsor',
      amount: '₹50,000+',
      description: 'Branding placement on previous sponsor walls, digital brochures, and websites.',
      benefits: ["Logo on website scroll", "Event souvenir mention", "2 Delegate passes", "Appreciation certificate"]
    },
    {
      id: 'community',
      name: 'Community Sponsor',
      amount: '₹25,000+',
      description: 'Showcase grassroots community support with appreciation certificate and mention.',
      benefits: ["Brochure listing logo", "Appreciation certificate", "1 Delegate pass", "Group mention on stage"]
    }
  ]);

  const addPartner = () => {
    setPreviousSponsors(prev => [...prev, { name: '', role: '' }]);
  };
  const removePartner = (index: number) => {
    setPreviousSponsors(prev => prev.filter((_, i) => i !== index));
  };
  const handlePartnerChange = (index: number, field: string, value: string) => {
    setPreviousSponsors(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const addSponsorFaq = () => {
    setSponsorshipFaqs(prev => [...prev, { q: '', a: '' }]);
  };
  const removeSponsorFaq = (index: number) => {
    setSponsorshipFaqs(prev => prev.filter((_, i) => i !== index));
  };
  const handleSponsorFaqChange = (index: number, field: string, value: string) => {
    setSponsorshipFaqs(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleOpportunityChange = (index: number, field: string, value: string) => {
    setSponsorshipOpportunities(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleBenefitChange = (index: number, field: string, value: any) => {
    setSponsorshipBenefits(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handlePackageChange = (index: number, field: string, value: any) => {
    setSponsorshipPackages(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  // CSR Settings States
  const [csrWhyPartner, setCsrWhyPartner] = useState<any[]>([
    { title: "Trusted Implementation Partner", desc: "Proven track record of executing grassroot social welfare drives with end-to-end management." },
    { title: "Transparent Fund Utilization", desc: "Rigorous accounting audits, clear visual dashboards, and quarterly progress disclosures." },
    { title: "Compliance with CSR Regulations", desc: "100% compliant with Section 135 rules, holding CSR-1, 12A, and 80G registrations." },
    { title: "Experienced Project Management", desc: "Professional implementation team executing, monitoring, and scaling project milestones." },
    { title: "Measurable Social Impact", desc: "Data-driven results and impact certificates showing clear improvement in community welfare." },
    { title: "Regular Progress Reports", desc: "Timely delivery of compliance utilization certificates, field audit sheets, and media packages." }
  ]);

  const [csrProcess, setCsrProcess] = useState<string[]>([
    "Consultation",
    "Requirement Analysis",
    "Project Planning",
    "Implementation",
    "Monitoring & Evaluation",
    "Impact Reporting"
  ]);

  const [csrPartnershipModels, setCsrPartnershipModels] = useState<any[]>([
    { title: "Project-Based Partnership", desc: "Fund a specific social initiative or infrastructure development project matching your geographical goals." },
    { title: "Long-Term Strategic Partnership", desc: "Form multi-year CSR collaborations to adopt schools, care facilities, or villages for continuous upliftment." },
    { title: "Employee Engagement Programs", desc: "Coordinate hands-on volunteer activities, tree plantation campaigns, and community service days for staff." },
    { title: "Sponsorship Partnership", desc: "Directly sponsor existing educational kits, clean energy packs, and emergency healthcare drives." }
  ]);

  const [csrComplianceDocs, setCsrComplianceDocs] = useState<string[]>([
    "CSR-1 Registration Number",
    "12A Certificate",
    "80G Certificate",
    "PAN Card",
    "Annual Reports",
    "Audited Financial Statements"
  ]);

  const [csrComplianceDownloads, setCsrComplianceDownloads] = useState<any[]>([
    { name: "CSR Brochure (PDF)", size: "4.2 MB" },
    { name: "Annual Report 2024-25", size: "6.8 MB" },
    { name: "Financial Audit Statements", size: "3.1 MB" },
    { name: "Impact Statistics summary", size: "1.9 MB" }
  ]);

  const [csrCaseStudies, setCsrCaseStudies] = useState<any[]>([
    {
      title: "Vidya: Digital Classrooms in Javadhu Hills",
      problem: "Over 85% of tribal students in Javadhu hills lacked access to basic computer literacy and internet connectivity, leading to high school dropout rates.",
      solution: "Established 5 fully-equipped digital learning centers with solar power backups, hardware systems, and local coordinators.",
      results: "94% drop in school dropouts, and over 1,200 tribal children trained in basic computer skills.",
      beneficiaries: "1,200+ Students",
      quote: "This center has opened a new world for our children. They now look forward to school every single day.",
      author: "M. Raman, Village Head"
    },
    {
      title: "Prakriti: Water Conservation in Salem District",
      problem: "Severe seasonal water scarcity in agricultural villages caused crop failures and community migration during dry summer months.",
      solution: "Constructed 3 check dams and desilted 5 community temple tanks to recharge the local groundwater table.",
      results: "40% increase in seasonal crop yield and reliable groundwater access for 4 adjacent villages.",
      beneficiaries: "3,500+ Villagers",
      quote: "We did not have water to drink in May. Now our wells are full, and we are harvesting double crops.",
      author: "K. Sidhan, Farmer Union Lead"
    }
  ]);

  const [csrCorporatePartners, setCsrCorporatePartners] = useState<any[]>([
    { name: "ABC Company", duration: "Partner since 2024", collab: "Vidya School digitisation" },
    { name: "XYZ Corporation", duration: "Partner since 2025", collab: "Prakriti Tree Planting" },
    { name: "Dhara Tech Solutions", duration: "Partner since 2023", collab: "Rural Healthcare Drives" },
    { name: "Southern Enterprises", duration: "Partner since 2025", collab: "Community Water Desilting" }
  ]);

  const [csrTestimonial, setCsrTestimonial] = useState({
    quote: "Dhara Foundations has been an excellent CSR implementation partner, delivering measurable impact and maintaining complete transparency.",
    author: "CSR Head, ABC Company"
  });

  const handleCsrWhyPartnerChange = (index: number, field: string, value: string) => {
    setCsrWhyPartner(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleCsrProcessChange = (index: number, value: string) => {
    setCsrProcess(prev => prev.map((step, i) => i === index ? value : step));
  };
  const addCsrProcessStep = () => {
    setCsrProcess(prev => [...prev, '']);
  };
  const removeCsrProcessStep = (index: number) => {
    setCsrProcess(prev => prev.filter((_, i) => i !== index));
  };

  const handleCsrPartnershipModelChange = (index: number, field: string, value: string) => {
    setCsrPartnershipModels(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleCsrComplianceDocChange = (index: number, value: string) => {
    setCsrComplianceDocs(prev => prev.map((doc, i) => i === index ? value : doc));
  };
  const addCsrComplianceDoc = () => {
    setCsrComplianceDocs(prev => [...prev, '']);
  };
  const removeCsrComplianceDoc = (index: number) => {
    setCsrComplianceDocs(prev => prev.filter((_, i) => i !== index));
  };

  const handleCsrComplianceDownloadChange = (index: number, field: string, value: string) => {
    setCsrComplianceDownloads(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };
  const addCsrComplianceDownload = () => {
    setCsrComplianceDownloads(prev => [...prev, { name: '', size: '' }]);
  };
  const removeCsrComplianceDownload = (index: number) => {
    setCsrComplianceDownloads(prev => prev.filter((_, i) => i !== index));
  };

  const handleCsrCaseStudyChange = (index: number, field: string, value: string) => {
    setCsrCaseStudies(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleCsrCorporatePartnerChange = (index: number, field: string, value: string) => {
    setCsrCorporatePartners(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };
  const addCsrCorporatePartner = () => {
    setCsrCorporatePartners(prev => [...prev, { name: '', duration: '', collab: '' }]);
  };
  const removeCsrCorporatePartner = (index: number) => {
    setCsrCorporatePartners(prev => prev.filter((_, i) => i !== index));
  };

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

      if (siteConfig.razorpayConfig && siteConfig.razorpayConfig.keyId) {
        setRazorpayKeyId(siteConfig.razorpayConfig.keyId);
      } else if (siteConfig.donorConfig && siteConfig.donorConfig.razorpayKeyId) {
        setRazorpayKeyId(siteConfig.donorConfig.razorpayKeyId);
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

      if (siteConfig.sponsorshipConfig) {
        const sc = siteConfig.sponsorshipConfig;
        if (sc.benefits && sc.benefits.length > 0) setSponsorshipBenefits(sc.benefits);
        if (sc.opportunities && sc.opportunities.length > 0) setSponsorshipOpportunities(sc.opportunities);
        if (sc.previousSponsors && sc.previousSponsors.length > 0) setPreviousSponsors(sc.previousSponsors);
        if (sc.testimonial) setTestimonial(sc.testimonial);
        if (sc.faqs && sc.faqs.length > 0) setSponsorshipFaqs(sc.faqs);
        if (sc.packages && sc.packages.length > 0) setSponsorshipPackages(sc.packages);
      }

      if (siteConfig.csrConfig) {
        const cc = siteConfig.csrConfig;
        if (cc.whyPartner && cc.whyPartner.length > 0) setCsrWhyPartner(cc.whyPartner);
        if (cc.csrProcess && cc.csrProcess.length > 0) setCsrProcess(cc.csrProcess);
        if (cc.partnershipModels && cc.partnershipModels.length > 0) setCsrPartnershipModels(cc.partnershipModels);
        if (cc.complianceHub) {
          if (cc.complianceHub.docs) setCsrComplianceDocs(cc.complianceHub.docs);
          if (cc.complianceHub.downloads) setCsrComplianceDownloads(cc.complianceHub.downloads);
        }
        if (cc.caseStudies && cc.caseStudies.length > 0) setCsrCaseStudies(cc.caseStudies);
        if (cc.corporatePartners && cc.corporatePartners.length > 0) setCsrCorporatePartners(cc.corporatePartners);
        if (cc.testimonial) setCsrTestimonial(cc.testimonial);
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
      razorpayConfig: {
        keyId: razorpayKeyId
      },
      donorConfig: {
        presets: donorPresets,
        bankDetails,
        taxExemptText,
        razorpayKeyId
      },
      eventRegConfig: {
        eventYear: siteConfig?.eventYear || '2026',
        tickets: parsedTickets
      },
      generalEnquiriesConfig: contactInfo,
      sponsorshipConfig: {
        benefits: sponsorshipBenefits,
        opportunities: sponsorshipOpportunities,
        previousSponsors,
        testimonial,
        faqs: sponsorshipFaqs,
        packages: sponsorshipPackages
      },
      csrConfig: {
        whyPartner: csrWhyPartner,
        csrProcess: csrProcess,
        partnershipModels: csrPartnershipModels,
        complianceHub: {
          docs: csrComplianceDocs,
          downloads: csrComplianceDownloads
        },
        caseStudies: csrCaseStudies,
        corporatePartners: csrCorporatePartners,
        testimonial: csrTestimonial
      }
    });
    setSaving(false);
    alert('Site settings & subdomain configurations updated successfully!');
  };

  return (
    <div className="pb-12 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side: Navigation Sidebar */}
        <div className="w-full lg:w-72 shrink-0 bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] p-5 rounded-3xl shadow-sm space-y-6 lg:sticky lg:top-24">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
              <Settings className="text-[#D9762E]" size={20} /> Settings Control
            </h2>
            <p className="text-[10px] text-[#867463] dark:text-[#9CA3AF] mt-1 leading-relaxed">
              Configure dynamic media, impact counters, news, trustees, sponsorships, and CSR credentials.
            </p>
          </div>

          {/* Section Navigation Sub-Tabs */}
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-3 lg:pb-0 scrollbar-none border-b lg:border-b-0 border-[#F5F3EE] dark:border-[#2E302A]">
            <button
              onClick={() => setActiveSubTab('home')}
              className={`px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 lg:w-full ${
                activeSubTab === 'home'
                  ? 'bg-[#401C0C] text-white shadow-md'
                  : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
              }`}
            >
              <Home size={15} /> Home Page Settings
            </button>

            <button
              onClick={() => setActiveSubTab('about')}
              className={`px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 lg:w-full ${
                activeSubTab === 'about'
                  ? 'bg-[#401C0C] text-white shadow-md'
                  : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
              }`}
            >
              <Info size={15} /> About Us Settings
            </button>

            <button
              onClick={() => setActiveSubTab('subdomains')}
              className={`px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 lg:w-full ${
                activeSubTab === 'subdomains'
                  ? 'bg-[#401C0C] text-white shadow-md'
                  : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
              }`}
            >
              <Building2 size={15} /> Subdomains Control
            </button>

            <button
              onClick={() => setActiveSubTab('news')}
              className={`px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 lg:w-full ${
                activeSubTab === 'news'
                  ? 'bg-[#401C0C] text-white shadow-md'
                  : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
              }`}
            >
              <Newspaper size={15} /> News & Press ({news.length})
            </button>

            <button
              onClick={() => setActiveSubTab('trustees')}
              className={`px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 lg:w-full ${
                activeSubTab === 'trustees'
                  ? 'bg-[#401C0C] text-white shadow-md'
                  : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
              }`}
            >
              <Users size={15} /> Trustees/Founders ({founders.length})
            </button>

            <button
              onClick={() => setActiveSubTab('registrations')}
              className={`px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 lg:w-full ${
                activeSubTab === 'registrations'
                  ? 'bg-[#401C0C] text-white shadow-md'
                  : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
              }`}
            >
              <ShieldCheck size={15} /> Legal Certificates ({registrations.length})
            </button>

            <button
              onClick={() => setActiveSubTab('sponsors')}
              className={`px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 lg:w-full ${
                activeSubTab === 'sponsors'
                  ? 'bg-[#401C0C] text-white shadow-md'
                  : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
              }`}
            >
              <Trophy size={15} /> Sponsors Control
            </button>

            <button
              onClick={() => setActiveSubTab('csr')}
              className={`px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 lg:w-full ${
                activeSubTab === 'csr'
                  ? 'bg-[#401C0C] text-white shadow-md'
                  : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
              }`}
            >
              <Briefcase size={15} /> CSR Partnerships
            </button>
          </div>

          {/* Desktop Left Sidebar Save Button */}
          <div className="hidden lg:block pt-4 border-t border-[#F5F3EE] dark:border-[#2E302A]">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-[#401C0C] hover:bg-[#5C2913] text-white rounded-xl text-xs font-semibold py-3 flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
            >
              <Save size={14} /> {saving ? 'Saving...' : 'Save All Settings'}
            </button>
          </div>
        </div>

        {/* Right Side: Active Workspace Form Panel */}
        <div className="flex-1 w-full space-y-6">
          {/* Header Action Panel (shows active tab title, desc and Mobile Save button!) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm flex justify-between items-center flex-wrap gap-4">
            <div>
              <span className="text-[9px] font-bold font-mono text-[#D9762E] uppercase tracking-wider">Active Workspace Control</span>
              <h3 className="font-serif text-lg font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2 mt-0.5">
                {activeSubTab === 'home' && <><Home className="text-[#C9A646]" size={18} /> Home Page Settings</>}
                {activeSubTab === 'about' && <><Info className="text-[#C9A646]" size={18} /> About Us Settings</>}
                {activeSubTab === 'subdomains' && <><Building2 className="text-[#C9A646]" size={18} /> Subdomains & Registration Control</>}
                {activeSubTab === 'news' && <><Newspaper className="text-[#C9A646]" size={18} /> News & Press Articles</>}
                {activeSubTab === 'trustees' && <><Users className="text-[#C9A646]" size={18} /> Trustees & Founders Directory</>}
                {activeSubTab === 'registrations' && <><ShieldCheck className="text-[#C9A646]" size={18} /> Legal Certificates & Registrations</>}
                {activeSubTab === 'sponsors' && <><Trophy className="text-[#C9A646]" size={18} /> Corporate Sponsors Page Settings</>}
                {activeSubTab === 'csr' && <><Briefcase className="text-[#C9A646]" size={18} /> CSR Partnerships Page Settings</>}
              </h3>
            </div>
            
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#401C0C] hover:bg-[#5C2913] text-white rounded-xl text-xs font-semibold px-6 py-2.5 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Save size={14} /> {saving ? 'Saving...' : 'Save Settings'}
            </button>
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
          {/* Razorpay Gateway Settings */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-serif text-xl font-bold flex items-center gap-2 text-[#401C0C] dark:text-[#F3F4F6]">
                <ShieldCheck className="text-[#D9762E]" size={20} /> Razorpay Payment Gateway Configuration
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                razorpayKeyId.startsWith('rzp_')
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
              }`}>
                {razorpayKeyId.startsWith('rzp_live') ? '● Live Gateway Active' : razorpayKeyId.startsWith('rzp_test') ? '● Test Key Active' : '● Action Required'}
              </span>
            </div>
            
            <p className="text-xs text-[#867463] dark:text-[#9CA3AF]">
              Enter your official Razorpay Key ID from your Razorpay Dashboard (API Keys &amp; Webhooks). This key powers payments on the Donate page and Event Registration pass booking.
            </p>

            <div>
              <label className="block text-xs font-bold text-[#401C0C] dark:text-[#F3F4F6] mb-1">
                Razorpay Key ID (e.g. rzp_test_XXXXXXXXXXXXXX or rzp_live_XXXXXXXXXXXXXX)
              </label>
              <input
                type="text"
                value={razorpayKeyId}
                onChange={(e) => setRazorpayKeyId(e.target.value)}
                placeholder="rzp_test_1234567890abcdef"
                className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-sm font-mono focus:outline-none focus:border-[#401C0C]"
              />
            </div>
          </div>

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
                      placeholder="Label (e.g. ₹510)"
                      className="flex-1 min-w-0 bg-white dark:bg-[#1B1C19] border border-[#E4E2DD] dark:border-[#404040] rounded-lg p-2 text-xs font-bold text-[#401C0C] dark:text-[#FFD27F]"
                    />
                    <input
                      type="text"
                      value={preset.amount}
                      onChange={(e) => handleDonorPresetChange(index, 'amount', e.target.value)}
                      placeholder="Numeric Amount (510)"
                      className="flex-1 min-w-0 bg-white dark:bg-[#1B1C19] border border-[#E4E2DD] dark:border-[#404040] rounded-lg p-2 text-xs font-bold"
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

      {/* SUB TAB 6: SPONSORSHIP CONFIGURATION */}
      {activeSubTab === 'sponsors' && (
        <div className="space-y-6">
          {/* Testimonial Quote */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#401C0C] dark:text-[#F3F4F6] flex items-center gap-2">
              <Trophy size={18} className="text-[#D9762E]" /> Sponsor Testimonial Quote
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <label className="block text-[10px] uppercase font-semibold text-[#867463] mb-1">Quote Text</label>
                <textarea
                  value={testimonial.quote}
                  onChange={(e) => setTestimonial(prev => ({ ...prev, quote: e.target.value }))}
                  rows={3}
                  className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-xs resize-none focus:outline-none focus:border-[#D9762E]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-semibold text-[#867463] mb-1">Author Name</label>
                <input
                  type="text"
                  value={testimonial.author}
                  onChange={(e) => setTestimonial(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-[#D9762E]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase font-semibold text-[#867463] mb-1">Author Designation & Company</label>
                <input
                  type="text"
                  value={testimonial.designation}
                  onChange={(e) => setTestimonial(prev => ({ ...prev, designation: e.target.value }))}
                  className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#D9762E]"
                />
              </div>
            </div>
          </div>

          {/* Previous Partners & Sponsors */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-[#401C0C] dark:text-[#F3F4F6] flex items-center gap-2">
                <Users size={18} className="text-[#D9762E]" /> Previous Partners & Sponsors
              </h3>
              <button
                type="button"
                onClick={addPartner}
                className="text-[#D9762E] hover:text-[#C9A646] p-1.5 bg-[#F5F3EE] dark:bg-[#242622] rounded-lg border border-[#EAE8E3] dark:border-[#30312E] flex items-center gap-1 text-xs font-semibold"
              >
                <Plus size={14} /> Add Partner
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {previousSponsors.map((partner, index) => (
                <div key={index} className="p-4 bg-[#F9F8F6] dark:bg-[#242622] border border-[#EAE8E3] dark:border-[#30312E] rounded-2xl space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => removePartner(index)}
                    className="absolute top-3 right-3 p-1 text-red-400 hover:text-red-500 rounded"
                    title="Remove Partner"
                  >
                    <Trash2 size={14} />
                  </button>
                  <span className="text-[10px] font-bold font-mono text-[#D9762E]">Sponsor #{index + 1}</span>
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Company / Brand Name</label>
                      <input
                        type="text"
                        value={partner.name}
                        onChange={(e) => handlePartnerChange(index, 'name', e.target.value)}
                        placeholder="e.g. ABC Corporation"
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2.5 py-1.5 text-xs font-bold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Sponsorship Role / Tag</label>
                      <input
                        type="text"
                        value={partner.role}
                        onChange={(e) => handlePartnerChange(index, 'role', e.target.value)}
                        placeholder="e.g. Title Sponsor 2025"
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2.5 py-1.5 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-[#401C0C] dark:text-[#F3F4F6] flex items-center gap-2">
                <HelpCircle className="text-[#D9762E]" size={18} /> Frequently Asked Questions
              </h3>
              <button
                type="button"
                onClick={addSponsorFaq}
                className="text-[#D9762E] hover:text-[#C9A646] p-1.5 bg-[#F5F3EE] dark:bg-[#242622] rounded-lg border border-[#EAE8E3] dark:border-[#30312E] flex items-center gap-1 text-xs font-semibold"
              >
                <Plus size={14} /> Add Question
              </button>
            </div>
            
            <div className="space-y-4">
              {sponsorshipFaqs.map((faq, index) => (
                <div key={index} className="p-4 bg-[#F9F8F6] dark:bg-[#242622] border border-[#EAE8E3] dark:border-[#30312E] rounded-2xl space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => removeSponsorFaq(index)}
                    className="absolute top-3 right-3 p-1 text-red-400 hover:text-red-500 rounded"
                    title="Remove FAQ"
                  >
                    <Trash2 size={14} />
                  </button>
                  <span className="text-[10px] font-bold font-mono text-[#D9762E]">FAQ #{index + 1}</span>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Question</label>
                      <input
                        type="text"
                        value={faq.q}
                        onChange={(e) => handleSponsorFaqChange(index, 'q', e.target.value)}
                        placeholder="e.g. Can sponsorship packages be customized?"
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2.5 py-1.5 text-xs font-bold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Answer</label>
                      <textarea
                        value={faq.a}
                        onChange={(e) => handleSponsorFaqChange(index, 'a', e.target.value)}
                        rows={2}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2.5 py-1.5 text-xs resize-none focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sponsorship Benefits */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#401C0C] dark:text-[#F3F4F6] flex items-center gap-2">
              <Award size={18} className="text-[#D9762E]" /> Sponsorship Benefits (3 Sections)
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {sponsorshipBenefits.map((benefit, index) => (
                <div key={index} className="p-5 border border-[#EAE8E3] dark:border-[#30312E] rounded-2xl space-y-3 bg-[#FDFDFD] dark:bg-[#1D1E1B]">
                  <span className="text-[10px] font-bold font-mono text-[#D9762E]">Benefit Group #{index + 1}</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Benefit Group Title</label>
                      <input
                        type="text"
                        value={benefit.title}
                        onChange={(e) => handleBenefitChange(index, 'title', e.target.value)}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-bold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Benefit Group Subtitle / Short Description</label>
                      <input
                        type="text"
                        value={benefit.desc}
                        onChange={(e) => handleBenefitChange(index, 'desc', e.target.value)}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Detailed Benefits Bullet List (One per line)</label>
                      <textarea
                        value={Array.isArray(benefit.items) ? benefit.items.join('\n') : benefit.items || ''}
                        onChange={(e) => handleBenefitChange(index, 'items', e.target.value.split('\n'))}
                        rows={4}
                        placeholder="e.g. Logo on standard flyers&#10;Reception standee slot"
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-xs resize-none focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Opportunities */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#401C0C] dark:text-[#F3F4F6] flex items-center gap-2">
              <Settings size={18} className="text-[#D9762E]" /> Partnership Opportunities (4 Models)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sponsorshipOpportunities.map((opp, index) => (
                <div key={index} className="p-4 bg-[#F9F8F6] dark:bg-[#242622] border border-[#EAE8E3] dark:border-[#30312E] rounded-2xl space-y-3">
                  <span className="text-[10px] font-bold font-mono text-[#D9762E]">Opportunity Model #{index + 1}</span>
                  <div>
                    <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Opportunity Title</label>
                    <input
                      type="text"
                      value={opp.title}
                      onChange={(e) => handleOpportunityChange(index, 'title', e.target.value)}
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Description</label>
                    <textarea
                      value={opp.desc}
                      onChange={(e) => handleOpportunityChange(index, 'desc', e.target.value)}
                      rows={3}
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-xs resize-none focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sponsorship Packages */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#401C0C] dark:text-[#F3F4F6] flex items-center gap-2">
              <Save size={18} className="text-[#D9762E]" /> Sponsorship Package Tiers (5 Packages)
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {sponsorshipPackages.map((pkg, index) => (
                <div key={index} className="p-5 border border-[#EAE8E3] dark:border-[#30312E] rounded-2xl space-y-3 bg-[#FDFDFD] dark:bg-[#1D1E1B]">
                  <span className="text-[10px] font-bold font-mono text-[#D9762E]">{pkg.name} Settings</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Price / Amount Bracket</label>
                      <input
                        type="text"
                        value={pkg.amount}
                        onChange={(e) => handlePackageChange(index, 'amount', e.target.value)}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-bold focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Package Tagline / Description</label>
                      <input
                        type="text"
                        value={pkg.description}
                        onChange={(e) => handlePackageChange(index, 'description', e.target.value)}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Tier Benefits Bullet List (One per line)</label>
                      <textarea
                        value={Array.isArray(pkg.benefits) ? pkg.benefits.join('\n') : pkg.benefits || ''}
                        onChange={(e) => handlePackageChange(index, 'benefits', e.target.value.split('\n'))}
                        rows={4}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-xs resize-none focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 7: CSR CONFIGURATION */}
      {activeSubTab === 'csr' && (
        <div className="space-y-6">
          {/* Why Partner With Us */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#401C0C] dark:text-[#F3F4F6] flex items-center gap-2">
              <Briefcase size={18} className="text-[#D9762E]" /> Why Partner With Us (6 Cards)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {csrWhyPartner.map((card, index) => (
                <div key={index} className="p-4 bg-[#F9F8F6] dark:bg-[#242622] border border-[#EAE8E3] dark:border-[#30312E] rounded-2xl space-y-3">
                  <span className="text-[10px] font-bold font-mono text-[#D9762E]">Card #{index + 1}</span>
                  <div>
                    <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => handleCsrWhyPartnerChange(index, 'title', e.target.value)}
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2 text-xs font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Description</label>
                    <textarea
                      value={card.desc}
                      onChange={(e) => handleCsrWhyPartnerChange(index, 'desc', e.target.value)}
                      rows={2}
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2 text-xs resize-none focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our CSR Process Timeline */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-[#401C0C] dark:text-[#F3F4F6] flex items-center gap-2">
                <ArrowUpDown size={18} className="text-[#D9762E]" /> Our CSR Process Steps
              </h3>
              <button
                type="button"
                onClick={addCsrProcessStep}
                className="text-[#D9762E] hover:text-[#C9A646] p-1.5 bg-[#F5F3EE] dark:bg-[#242622] rounded-lg border border-[#EAE8E3] dark:border-[#30312E] flex items-center gap-1 text-xs font-semibold"
              >
                <Plus size={14} /> Add Step
              </button>
            </div>
            <div className="space-y-3">
              {csrProcess.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#D9762E] w-12">Step 0{index + 1}</span>
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => handleCsrProcessChange(index, e.target.value)}
                    className="flex-1 bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeCsrProcessStep(index)}
                    className="p-2 text-red-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Models */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#401C0C] dark:text-[#F3F4F6] flex items-center gap-2">
              <Building2 size={18} className="text-[#D9762E]" /> Partnership Models (4 Pathways)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {csrPartnershipModels.map((model, index) => (
                <div key={index} className="p-4 bg-[#F9F8F6] dark:bg-[#242622] border border-[#EAE8E3] dark:border-[#30312E] rounded-2xl space-y-3">
                  <span className="text-[10px] font-bold font-mono text-[#D9762E]">Model #{index + 1}</span>
                  <div>
                    <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Model Name</label>
                    <input
                      type="text"
                      value={model.title}
                      onChange={(e) => handleCsrPartnershipModelChange(index, 'title', e.target.value)}
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2 text-xs font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Description</label>
                    <textarea
                      value={model.desc}
                      onChange={(e) => handleCsrPartnershipModelChange(index, 'desc', e.target.value)}
                      rows={2}
                      className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2 text-xs resize-none focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Documentation Hub */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#401C0C] dark:text-[#F3F4F6] flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#D9762E]" /> Compliance & Documentation Hub
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Docs checklist */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] uppercase font-bold text-[#867463]">Compliance Checklist</label>
                  <button
                    type="button"
                    onClick={addCsrComplianceDoc}
                    className="text-[#D9762E] hover:text-[#C9A646] p-1.5 bg-[#F5F3EE] dark:bg-[#242622] rounded-lg border border-[#EAE8E3] dark:border-[#30312E] flex items-center gap-1 text-[10px] font-semibold"
                  >
                    <Plus size={12} /> Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  {csrComplianceDocs.map((doc, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={doc}
                        onChange={(e) => handleCsrComplianceDocChange(index, e.target.value)}
                        className="flex-1 bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2 text-xs focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeCsrComplianceDoc(index)}
                        className="p-1 text-red-400 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Downloads list */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] uppercase font-bold text-[#867463]">Download Files Section</label>
                  <button
                    type="button"
                    onClick={addCsrComplianceDownload}
                    className="text-[#D9762E] hover:text-[#C9A646] p-1.5 bg-[#F5F3EE] dark:bg-[#242622] rounded-lg border border-[#EAE8E3] dark:border-[#30312E] flex items-center gap-1 text-[10px] font-semibold"
                  >
                    <Plus size={12} /> Add File
                  </button>
                </div>
                <div className="space-y-2">
                  {csrComplianceDownloads.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 bg-[#F9F8F6] dark:bg-[#242622] p-2 border border-[#EAE8E3] dark:border-[#30312E] rounded-2xl">
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={file.name}
                          onChange={(e) => handleCsrComplianceDownloadChange(index, 'name', e.target.value)}
                          placeholder="File Name"
                          className="bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2 text-[11px] focus:outline-none"
                        />
                        <input
                          type="text"
                          value={file.size}
                          onChange={(e) => handleCsrComplianceDownloadChange(index, 'size', e.target.value)}
                          placeholder="e.g. 4.2 MB"
                          className="bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2 text-[11px] focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCsrComplianceDownload(index)}
                        className="p-1 text-red-400 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories & Case Studies */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#401C0C] dark:text-[#F3F4F6] flex items-center gap-2">
              <Newspaper size={18} className="text-[#D9762E]" /> Success Stories & Case Studies (2 Cases)
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {csrCaseStudies.map((caseStudy, index) => (
                <div key={index} className="p-5 border border-[#EAE8E3] dark:border-[#30312E] rounded-2xl space-y-3 bg-[#FDFDFD] dark:bg-[#1D1E1B]">
                  <span className="text-[10px] font-bold font-mono text-[#D9762E]">Case Study #{index + 1}</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Title</label>
                      <input
                        type="text"
                        value={caseStudy.title}
                        onChange={(e) => handleCsrCaseStudyChange(index, 'title', e.target.value)}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#D9762E] rounded-xl p-2.5 text-xs font-bold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Problem Statement</label>
                      <textarea
                        value={caseStudy.problem}
                        onChange={(e) => handleCsrCaseStudyChange(index, 'problem', e.target.value)}
                        rows={3}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs resize-none focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Solution Implemented</label>
                      <textarea
                        value={caseStudy.solution}
                        onChange={(e) => handleCsrCaseStudyChange(index, 'solution', e.target.value)}
                        rows={3}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs resize-none focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Results Achieved</label>
                      <textarea
                        value={caseStudy.results}
                        onChange={(e) => handleCsrCaseStudyChange(index, 'results', e.target.value)}
                        rows={3}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs resize-none focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Testimonial Quote</label>
                      <textarea
                        value={caseStudy.quote}
                        onChange={(e) => handleCsrCaseStudyChange(index, 'quote', e.target.value)}
                        rows={3}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs resize-none focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Testimonial Author</label>
                      <input
                        type="text"
                        value={caseStudy.author}
                        onChange={(e) => handleCsrCaseStudyChange(index, 'author', e.target.value)}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Beneficiary Impact Tag</label>
                      <input
                        type="text"
                        value={caseStudy.beneficiaries}
                        onChange={(e) => handleCsrCaseStudyChange(index, 'beneficiaries', e.target.value)}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our Corporate Partners & Testimonial */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-[#401C0C] dark:text-[#F3F4F6] flex items-center gap-2">
                <Users size={18} className="text-[#D9762E]" /> Our Corporate Partners Logos
              </h3>
              <button
                type="button"
                onClick={addCsrCorporatePartner}
                className="text-[#D9762E] hover:text-[#C9A646] p-1.5 bg-[#F5F3EE] dark:bg-[#242622] rounded-lg border border-[#EAE8E3] dark:border-[#30312E] flex items-center gap-1 text-xs font-semibold"
              >
                <Plus size={14} /> Add Partner
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {csrCorporatePartners.map((partner, index) => (
                <div key={index} className="p-4 bg-[#F9F8F6] dark:bg-[#242622] border border-[#EAE8E3] dark:border-[#30312E] rounded-2xl space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => removeCsrCorporatePartner(index)}
                    className="absolute top-3 right-3 p-1 text-red-400 hover:text-red-500 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                  <span className="text-[10px] font-bold font-mono text-[#D9762E]">Partner #{index + 1}</span>
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Company Name</label>
                      <input
                        type="text"
                        value={partner.name}
                        onChange={(e) => handleCsrCorporatePartnerChange(index, 'name', e.target.value)}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2.5 py-1.5 text-xs font-bold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Partnership Since</label>
                      <input
                        type="text"
                        value={partner.duration}
                        onChange={(e) => handleCsrCorporatePartnerChange(index, 'duration', e.target.value)}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2.5 py-1.5 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-semibold text-[#867463] mb-1">Collaboration Details</label>
                      <input
                        type="text"
                        value={partner.collab}
                        onChange={(e) => handleCsrCorporatePartnerChange(index, 'collab', e.target.value)}
                        className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#404040] rounded px-2.5 py-1.5 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Quote */}
            <div className="border-t border-[#EAE8E3] dark:border-[#30312E] pt-6 space-y-4">
              <h4 className="font-serif text-md font-bold text-[#401C0C] dark:text-[#F3F4F6]">CSR Testimonial Quote</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <label className="block text-[10px] uppercase font-semibold text-[#867463] mb-1">Quote Text</label>
                  <textarea
                    value={csrTestimonial.quote}
                    onChange={(e) => setCsrTestimonial(prev => ({ ...prev, quote: e.target.value }))}
                    rows={3}
                    className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-xs resize-none focus:outline-none focus:border-[#D9762E]"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-[10px] uppercase font-semibold text-[#867463] mb-1">Author Name & Role</label>
                  <input
                    type="text"
                    value={csrTestimonial.author}
                    onChange={(e) => setCsrTestimonial(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-[#D9762E]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Save Changes Panel */}
      <div className="p-4 bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] rounded-3xl flex justify-end shadow-sm mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#401C0C] hover:bg-[#5C2913] text-white rounded-xl text-sm font-semibold px-8 py-3.5 flex items-center gap-2 cursor-pointer shadow-sm transition-all w-full sm:w-auto justify-center"
        >
          <Save size={18} /> {saving ? 'Saving...' : 'Save Settings Changes'}
        </button>
      </div>
    </div> {/* End of Right Side: Active Workspace Form Panel */}
  </div> {/* End of flex flex-col lg:flex-row gap-8 items-start */}

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

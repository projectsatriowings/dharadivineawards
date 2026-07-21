import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  X, Award, Ticket, Handshake, Heart, Gift, 
  Briefcase, Newspaper, Image as ImageIcon, MessageSquare, ExternalLink, 
  CheckCircle, Share2, ArrowRight, Sparkles, Volume2, VolumeX, User,
  Users, Landmark, Flame
} from 'lucide-react';

import AboutUs from './components/AboutUs';
import VisionMission from './components/VisionMission';
import FounderMessage from './components/FounderMessage';
import EventsActivities from './components/EventsActivities';
import GalleryPage from './components/GalleryPage';
import MediaCoverage from './components/MediaCoverage';
import GeneralEnquiries from './components/GeneralEnquiries';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Subdomain components
import EventRegistration from './components/EventRegistration';
import Sponsorship from './components/Sponsorship';
import Volunteer from './components/Volunteer';
import DonorSupport from './components/DonorSupport';
import CorporateCSR from './components/CorporateCSR';
import AwardNominations from './components/AwardNominations';
import ThankYouPage from './components/ThankYouPage';
import { fetchSiteConfig, fetchGallery, fetchEvents, getGoogleDriveDirectLink, API_BASE, staticData } from './utils/api';

const dashboardCategories = [
  { id: 'seva', label: 'Participation & Seva' },
  { id: 'giving', label: 'Partnerships & Giving' },
  { id: 'recognition', label: 'Recognition & Press' }
];

const dashboardItems = [
  {
    id: 'registration',
    category: 'seva',
    label: 'Event Booking',
    description: 'Secure delegate or VIP tickets, choose dietary options, and get instant entry passes.',
    icon: Ticket,
    actionLabel: 'Book Tickets',
    accentColor: 'var(--color-primary-accent)'
  },
  {
    id: 'volunteer',
    category: 'seva',
    label: 'Volunteer Seva',
    description: 'Register your availability, coordinate skills, and join local execution cells.',
    icon: Heart,
    actionLabel: 'Join Seva',
    accentColor: 'var(--color-primary-accent)'
  },
  {
    id: 'contact',
    category: 'seva',
    label: 'General Enquiries',
    description: 'Submit questions and get quick guidance or direct support from our helpdesk.',
    icon: MessageSquare,
    actionLabel: 'Send Enquiry',
    accentColor: 'var(--color-primary-accent)'
  },
  {
    id: 'sponsorship',
    category: 'giving',
    label: 'Sponsorship Options',
    description: 'View corporate tiers (Platinum, Gold, Silver) and explore flagship deliverables.',
    icon: Handshake,
    actionLabel: 'View Tiers',
    accentColor: 'var(--color-saffron-glow)'
  },
  {
    id: 'donor',
    category: 'giving',
    label: 'Giving Gateway',
    description: 'Pre-set tax-exempt micro-donations and claim instant 80G tax benefit receipts.',
    icon: Gift,
    actionLabel: 'Donate Now',
    accentColor: 'var(--color-saffron-glow)'
  },
  {
    id: 'csr',
    category: 'giving',
    label: 'Corporate CSR',
    description: 'Register institutional budgets, CIN number, and check Section 135 compliance targets.',
    icon: Briefcase,
    actionLabel: 'Partner Up',
    accentColor: 'var(--color-saffron-glow)'
  },
  {
    id: 'nominations',
    category: 'recognition',
    label: 'Award Nominations',
    description: 'Submit multi-step physical nominations to recognize unsung grassroots heroes.',
    icon: Award,
    actionLabel: 'Submit Nomination',
    accentColor: 'var(--color-saffron-glow-dark)'
  },
  {
    id: 'media',
    category: 'recognition',
    label: 'Press & Media Kit',
    description: 'Request official press passes, download logos, and access coverage archives.',
    icon: Newspaper,
    actionLabel: 'Media Panel',
    accentColor: 'var(--color-saffron-glow-dark)'
  },
  {
    id: 'highlights',
    category: 'recognition',
    label: 'Event Videos',
    description: 'View event metrics, filtered gallery listings, and past Divine Awards statistics.',
    icon: ImageIcon,
    actionLabel: 'View Archive',
    accentColor: 'var(--color-saffron-glow-dark)'
  }
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const changeTab = (tab) => {
    if (tab === 'home') {
      navigate('/');
    } else {
      navigate(`/${tab}`);
    }
  };

  const setActiveTab = changeTab;

  // Derive activeTab state from current location pathname
  const activeTab = (() => {
    const path = location.pathname.replace('/', '').toLowerCase();
    if (['about', 'vision', 'founder', 'events', 'gallery', 'news', 'contact', 'register', 'sponsor', 'volunteer', 'donate', 'csr', 'nomination', 'media', 'highlights', 'enquiry', 'thankyou'].includes(path)) {
      return path;
    }
    return 'home';
  })();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardCategory, setDashboardCategory] = useState('seva');
  const [subdomain, setSubdomain] = useState('');
  const [homeActiveVideoId, setHomeActiveVideoId] = useState(null);
  const [heroVideoMuted, setHeroVideoMuted] = useState(true);
  const heroVideoRef = React.useRef(null);
  const heroObserverRef = React.useRef(null);
  
  // Initialize state synchronously with static bundled data to prevent loading flash (FOUC)
  const [siteConfig, setSiteConfig] = useState(
    (staticData.siteConfig && staticData.siteConfig.length > 0) ? staticData.siteConfig[0] : null
  );
  const [homeGallery, setHomeGallery] = useState(
    (staticData.gallery || []).filter(img => img.featured).sort((a, b) => (b.priority || 0) - (a.priority || 0))
  );
  const [homeEvents, setHomeEvents] = useState(
    (staticData.events || []).filter(ev => ev.featured && ev.type === 'video').sort((a, b) => (b.priority || 0) - (a.priority || 0))
  );

  useEffect(() => {
    fetchSiteConfig().then(config => {
      if (config) setSiteConfig(config);
    });
    fetchGallery().then(galleryData => {
      if (galleryData && galleryData.length) {
        setHomeGallery(galleryData.filter(img => img.featured).sort((a, b) => (b.priority || 0) - (a.priority || 0)));
      }
    });
    fetchEvents().then(eventsData => {
      if (eventsData && eventsData.length) {
        setHomeEvents(eventsData.filter(ev => ev.featured && ev.type === 'video').sort((a, b) => (b.priority || 0) - (a.priority || 0)));
      }
    });
  }, []);

  const getImageUrl = (src) => {
    if (!src) return '';
    const processedSrc = getGoogleDriveDirectLink(src);
    if (processedSrc.startsWith('http://') || processedSrc.startsWith('https://') || processedSrc.startsWith('/uploads') || processedSrc.startsWith('data:') || processedSrc.startsWith('/images/')) {
      if (processedSrc.startsWith('/uploads')) {
        return `${API_BASE}${processedSrc}`;
      }
      return processedSrc;
    }
    return `/images/Devine Awards images/${processedSrc}`;
  };

  // Effect 1: Forcibly pause/mute video whenever route changes away from home
  useEffect(() => {
    const isHome = location.pathname === '/' || location.pathname === '/home';
    const video = heroVideoRef.current;
    if (!isHome && video) {
      video.pause();
      video.muted = true;
    }
  }, [location.pathname]);

  // Effect 2: IntersectionObserver for scroll-based play/pause (only on home)
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    // Disconnect any previous observer
    if (heroObserverRef.current) {
      heroObserverRef.current.disconnect();
    }

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const vid = heroVideoRef.current;
      if (!vid) return;

      if (entry.isIntersecting) {
        vid.muted = heroVideoMuted;
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn("Autoplay blocked, ensuring video is muted to play:", error);
            if (!vid.muted) {
              vid.muted = true;
              vid.play().catch(e => console.error("Muted fallback failed:", e));
            }
          });
        }
      } else {
        vid.pause();
      }
    }, { threshold: 0.05 });

    observer.observe(video);
    heroObserverRef.current = observer;

    return () => {
      observer.disconnect();
      heroObserverRef.current = null;
    };
  }, [heroVideoMuted, location.pathname]);


  // Thank You State
  const [successData, setSuccessData] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

  // Brand preloader seen flag (runs on every reload)
  const [showPreloader, setShowPreloader] = useState(true);

  // PWA Install States & Logics
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    if (location.pathname === '/admin' || location.pathname.startsWith('/admin/') || location.pathname === '/login') {
      window.location.href = 'https://dhara-admin-bice.vercel.app';
    }
  }, [location.pathname]);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('Service Worker registered successfully:', reg.scope))
        .catch((err) => console.error('Service Worker registration failed:', err));
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
      const isDismissed = sessionStorage.getItem('pwa-banner-dismissed');
      if (!isDismissed) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowInstallBtn(false);
      setShowInstallBanner(false);
      console.log('App was successfully installed');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA installation outcome: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallBtn(false);
    setShowInstallBanner(false);
  };

  const dismissInstallBanner = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem('pwa-banner-dismissed', 'true');
  };

  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        setShowPreloader(false);
        document.body.style.overflow = '';
      }, 3500);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [showPreloader]);

  // Subdomain detection logic
  useEffect(() => {
    const host = window.location.hostname;
    const parts = host.split('.');
    if (parts.length > 1) {
       const sub = parts[0].toLowerCase();
       if (['register', 'sponsor', 'volunteer', 'donate', 'csr', 'nomination', 'media', 'highlights', 'enquiry', 'thankyou', 'events'].includes(sub)) {
         setSubdomain(sub);
       }
    }
  }, []);

  // Sync route changes to scroll & mobile menu states
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Scroll Reveal Observer
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
    
    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  const handleFormSuccess = (data) => {
    navigate('/thankyou', { state: data });
  };

  const handleNavClick = (sectionId) => {
    navigate('/');
    setMobileMenuOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const devotionalQuotes = [
    {
      quote: "Yat karoṣi yad aśnāsi yaj juhoṣi dadāsi yat, yat tapasyasi kaunteya tat kuruṣva mad-arpaṇam.",
      translation: "Whatever you do, whatever you eat, whatever you offer or give away, and whatever austerities you perform—do that, O son of Kunti, as an offering unto Me. (Bhagavad Gita 9.27)"
    },
    {
      quote: "Dharmo rakshati rakshitah.",
      translation: "Dharma (righteousness/duty) protects those who protect it."
    },
    {
      quote: "Samanvaya eva sādhu.",
      translation: "Harmony and coordination in noble actions lead to ultimate wellness."
    }
  ];

  const randomQuote = devotionalQuotes[0]; 
  const shareText = encodeURIComponent("I just participated in the Dhara Foundations Divine Awards 2025 registration! Join this celebration of selfless service.");
  const shareUrl = encodeURIComponent("https://dharafoundations.in");

  const getHomeElement = () => {
    switch (subdomain) {
      case 'nomination':
        return <div className="animate-fade-in"><AwardNominations onSubmitSuccess={handleFormSuccess} /></div>;
      case 'enquiry':
        return <div className="animate-fade-in"><GeneralEnquiries onSubmitSuccess={handleFormSuccess} /></div>;
      case 'thankyou':
        return <div className="animate-fade-in"><ThankYouPage /></div>;
      case 'register':
        return <div className="animate-fade-in"><EventRegistration onSubmitSuccess={handleFormSuccess} siteConfig={siteConfig} /></div>;
      case 'sponsor':
        return <div className="animate-fade-in"><Sponsorship onSubmitSuccess={handleFormSuccess} /></div>;
      case 'volunteer':
        return <div className="animate-fade-in"><Volunteer onSubmitSuccess={handleFormSuccess} /></div>;
      case 'donate':
        return <div className="animate-fade-in"><DonorSupport onSubmitSuccess={handleFormSuccess} /></div>;
      case 'csr':
        return <div className="animate-fade-in"><CorporateCSR onSubmitSuccess={handleFormSuccess} /></div>;
      case 'media':
        return <div className="animate-fade-in"><MediaCoverage onSubmitSuccess={handleFormSuccess} /></div>;
      case 'highlights':
      case 'events':
        return <div className="animate-fade-in"><EventsActivities /></div>;
      default:
        return renderHomeView();
    }
  };

  const renderHomeView = () => (
    <div className="animate-fade-in">
      {/* Hero Section Split Layout */}
      <section className="hero relative w-full flex items-center justify-center" id="home-section" style={{ minHeight: '85vh', padding: '80px 5%', background: 'var(--color-warm-cream)' }}>
        <div className="divine-glow" style={{ zIndex: 1, opacity: 0.5 }}></div>
        <div className="ember-particles" style={{ zIndex: 2 }}>
          <span style={{"left":"6%","animationDuration":"11s","animationDelay":"0s"}}></span>
          <span style={{"left":"14%","animationDuration":"9s","animationDelay":"2s"}}></span>
          <span style={{"left":"24%","animationDuration":"13s","animationDelay":"4s"}}></span>
          <span style={{"left":"33%","animationDuration":"10s","animationDelay":"1s"}}></span>
          <span style={{"left":"45%","animationDuration":"14s","animationDelay":"6s"}}></span>
          <span style={{"left":"58%","animationDuration":"8s","animationDelay":"3s"}}></span>
          <span style={{"left":"67%","animationDuration":"12s","animationDelay":"7s"}}></span>
          <span style={{"left":"76%","animationDuration":"10s","animationDelay":"2.5s"}}></span>
          <span style={{"left":"85%","animationDuration":"15s","animationDelay":"5s"}}></span>
          <span style={{"left":"93%","animationDuration":"9s","animationDelay":"1.5s"}}></span>
        </div>
        
        <div className="wrap relative z-10 w-full max-w-[1400px] flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
          
          {/* Left Text Content */}
          <div className="hero-copy flex-1 flex flex-col items-start text-left w-full">
            <div className="eyebrow uppercase" style={{ color: 'var(--color-primary-accent)', fontFamily: 'var(--font-mono)', justifyContent: 'flex-start' }}>
              <svg className="sprout" viewBox="0 0 16 22" fill="none"><path d="M8 0c3.5 4.5 5.2 7.4 5.2 10.4a5.2 5.2 0 1 1-10.4 0C2.8 7.4 4.5 4.5 8 0z" fill="var(--color-saffron-glow)"/></svg>
              REGISTERED PUBLIC NON-PROFIT ORGANIZATION · EST. 2024
            </div>
            <h1 style={{ color: 'var(--color-deep-forest-dark)', fontFamily: 'var(--font-serif)', fontWeight: '800', textAlign: 'left', marginTop: '16px', marginBottom: '24px' }}>
              Dhara <em style={{ fontStyle: 'italic', fontWeight: '500', background: 'linear-gradient(120deg, var(--color-saffron-glow), var(--color-primary-accent))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', display: 'inline-block', paddingRight: '0.15em', marginRight: '-0.15em' }}>Divine</em> Awards
            </h1>
            <ul className="hero-highlights font-serif" style={{ listStyle: 'none', padding: 0, margin: '0 0 36px 0', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '1.25rem', lineHeight: '1.5', color: 'var(--ink-soft)' }}>
                <span style={{ color: 'var(--color-saffron-glow)', fontSize: '1.25rem', marginTop: '2px' }}>✦</span>
                <span className="text-left">An annual celebration honouring selfless individuals in the path of spiritual and social service</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '1.25rem', lineHeight: '1.5', color: 'var(--ink-soft)' }}>
                <span style={{ color: 'var(--color-saffron-glow)', fontSize: '1.25rem', marginTop: '2px' }}>✦</span>
                <span className="text-left">Recognizing excellence from grassroots volunteers to thought leaders</span>
              </li>
            </ul>
            <div className="hero-actions" style={{ flexWrap: 'wrap', gap: '16px', justifyContent: 'flex-start', width: '100%' }}>
              <button onClick={() => setActiveTab('donate')} className="btn btn-primary sparkle-shimmer-btn">Donate Now</button>
              <button onClick={(e) => { e.preventDefault(); setActiveTab('gallery'); }} className="btn btn-ghost-dark">Explore Divine Awards →</button>
            </div>
            <div className="hero-stats flex-wrap" style={{ justifyContent: 'flex-start', marginTop: '48px', gap: '40px', width: '100%' }}>
              {(siteConfig.homeStats && siteConfig.homeStats.length > 0 ? siteConfig.homeStats : [
                { number: '3', label: 'Founding Trustees' },
                { number: '40+', label: 'Community Programs' },
                { number: '80G', label: 'Tax Exemption' }
              ]).map((stat, index) => (
                <div key={index} className="hero-stat" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                  <div className="num" style={{ color: 'var(--color-saffron-glow-dark)', fontFamily: 'var(--font-serif)' }}>{stat.number}</div>
                  <div className="label" style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px', color: 'var(--ink-soft)', marginTop: '4px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Video / Media Content */}
          {siteConfig?.heroMediaOrder === 'image-first' ? (
            <div className="hero-video-container flex-1 relative w-full lg:max-w-[50%] rounded-[2rem] overflow-hidden border-2 border-[var(--color-saffron-glow)]/30" style={{ boxShadow: '0 25px 50px -12px rgba(64, 28, 12, 0.4), 0 0 40px rgba(243, 167, 18, 0.2)' }}>
              <img 
                src={getImageUrl(siteConfig?.heroImageUrl || "/images/News/DHARA Divine Awards Ceremony.jpg")} 
                alt="Hero Banner" 
                className="w-full h-full object-cover" 
                style={{ aspectRatio: '16/9', display: 'block' }}
              />
            </div>
          ) : (
            <div className="hero-video-container flex-1 relative w-full lg:max-w-[50%] rounded-[2rem] overflow-hidden border-2 border-[var(--color-saffron-glow)]/30" style={{ boxShadow: '0 25px 50px -12px rgba(64, 28, 12, 0.4), 0 0 40px rgba(243, 167, 18, 0.2)' }}>
              <video 
                ref={heroVideoRef}
                src={siteConfig?.heroVideoUrl || "/video/hero section video.mp4"} 
                poster={getImageUrl(siteConfig?.heroVideoPoster || siteConfig?.heroImageUrl || "/images/News/DHARA Divine Awards Ceremony.jpg")} 
                autoPlay
                loop 
                muted={heroVideoMuted}
                playsInline 
                preload="auto"
                className="w-full h-full object-cover" 
                style={{ aspectRatio: '16/9', display: 'block' }}
              />
              
              {/* Mute Toggle Bottom Right */}
              <button 
                onClick={() => setHeroVideoMuted(!heroVideoMuted)}
                className="absolute bottom-5 right-5 z-20 w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/70 hover:scale-105 transition-all cursor-pointer"
                title={heroVideoMuted ? "Unmute Video" : "Mute Video"}
                aria-label={heroVideoMuted ? "Unmute Video" : "Mute Video"}
              >
                {heroVideoMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          )}
          
        </div>
      </section>

{/* Redesigned floating glassmorphic trust banner */}
<div className="trust-strip-wrapper">
  <div className="trust-strip">
    {(siteConfig.homeCredentials && siteConfig.homeCredentials.length > 0 ? siteConfig.homeCredentials : [
      { prefix: 'Indian Trust Act, 1882 — ', highlight: 'Registered' },
      { prefix: '80G & 12A — ', highlight: 'Tax Exempt' },
      { prefix: 'MCA — ', highlight: 'CSR Approved' },
      { prefix: 'NGO Darpan — ', highlight: 'TN/2024/0473120' }
    ]).map((cred, index, arr) => (
      <React.Fragment key={index}>
        <div className="trust-item">
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-saffron-glow)]" />
          <span>{cred.prefix}<b>{cred.highlight}</b></span>
        </div>
        {index < arr.length - 1 && (
          <span className="hidden md:inline" style={{ color: 'var(--color-card-border)' }}>|</span>
        )}
      </React.Fragment>
    ))}
  </div>
</div>

{/* Gallery teaser - Moved below Hero & Trust Banner */}
<section style={{"background":"var(--color-card-cream)"}} className="reveal">
  <div className="wrap">
    <div className="section-head">
      <div className="eyebrow" style={{ color: 'var(--color-primary-accent)', fontFamily: 'var(--font-mono)' }}>
        <svg className="sprout" viewBox="0 0 16 22" fill="none"><path d="M8 22V11M8 11C8 6 4 4 1 4c0 5 3 7 7 7zM8 11c0-5 4-7 7-7 0 5-3 7-7 7z" stroke="var(--color-saffron-glow)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Moments
      </div>
      <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)' }}>From our photo gallery</h2>
    </div>
    <div className="gallery-grid">
      {homeGallery.length > 0 ? (
        homeGallery.slice(0, 7).map((img, idx) => (
          <div key={img.id || idx} className={`g-item ${idx === 0 ? 'banner ' : ''}overflow-hidden rounded-3xl border border-[var(--color-card-border)]/50 shadow-premium relative group bg-[#281006]`}>
            <img src={getImageUrl(img.src)} alt={img.caption || img.category} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            <div className="tag px-3 py-1.5 bg-deep-forest text-saffron-glow text-[11px] font-sans font-medium tracking-normal rounded-xl max-w-[90%] leading-tight text-center shadow-lg" style={{ background: 'var(--color-deep-forest)' }}>{img.caption || img.category}</div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 text-[#867463]">No featured gallery images available.</div>
      )}
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
      <button 
        onClick={() => setActiveTab('gallery')} 
        className="btn btn-primary sparkle-shimmer-btn"
      >
        Load More Moments
      </button>
    </div>
  </div>
</section>

{/* Flagship YouTube Video Broadcast Section */}
<section className="reveal" style={{ padding: '60px 0', borderTop: '1px solid rgba(217, 203, 176, 0.35)', borderBottom: '1px solid rgba(217, 203, 176, 0.35)' }}>
  <div className="wrap">
    <div className="section-head">
      <div className="eyebrow" style={{ color: 'var(--color-primary-accent)', fontFamily: 'var(--font-mono)' }}>
        <svg className="sprout" viewBox="0 0 16 22" fill="none"><path d="M8 22V11M8 11C8 6 4 4 1 4c0 5 3 7 7 7zM8 11c0-5 4-7 7-7 0 5-3 7-7 7z" stroke="var(--color-saffron-glow)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Broadcast
      </div>
      <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)' }}>YouTube Video Coverage</h2>
    </div>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
      gap: '28px', 
      marginTop: '44px' 
    }}>
      {homeEvents.length > 0 ? (
        homeEvents.slice(0, 6).map((vid, idx) => (
          <div 
            key={vid.id || idx} 
            className="glassmorphism-card group" 
            style={{ 
              borderRadius: '24px', 
              overflow: 'hidden', 
              border: '1px solid rgba(217, 203, 176, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}
          >
            <div>
              <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#000' }}>
                <img 
                  src={getGoogleDriveDirectLink(vid.image) || `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`} 
                  alt={vid.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, transition: 'all 0.4s ease' }} 
                  className="group-hover:scale-105 group-hover:opacity-100"
                />
                <button 
                  onClick={() => setHomeActiveVideoId(vid.youtubeId)}
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    margin: 'auto', 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    background: 'var(--color-primary-accent)', 
                    border: '2px solid var(--color-saffron-glow)', 
                    color: '#fff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  className="play-hover-btn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '22px', height: '22px', marginLeft: '3px' }}>
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <div style={{ 
                  position: 'absolute', 
                  bottom: '12px', 
                  right: '12px', 
                  background: 'rgba(5, 46, 42, 0.85)', 
                  color: 'var(--color-saffron-glow)', 
                  padding: '4px 8px', 
                  borderRadius: '6px', 
                  fontSize: '10px', 
                  fontWeight: 'bold', 
                  fontFamily: 'var(--font-mono)' 
                }}>
                  {vid.category || "Video"}
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <h4 style={{ 
                  fontFamily: 'var(--font-serif)', 
                  color: 'var(--color-deep-forest-dark)', 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  lineHeight: '1.4', 
                  marginBottom: '10px' 
                }}>
                  {vid.title}
                </h4>
                <p style={{ color: 'var(--ink-soft)', fontSize: '13px', lineHeight: '1.5' }}>
                  {vid.description}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 text-[#867463] col-span-full">No featured videos available.</div>
      )}
    </div>
    
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
      <button 
        onClick={() => setActiveTab('events')} 
        className="btn btn-primary sparkle-shimmer-btn"
      >
        Load More Events
      </button>
    </div>
  </div>
</section>

{/* Kindness / Helping the Poor */}
<section className="kindness-section reveal">
  <div className="wrap">
    <div className="kindness-grid">
      <div className="kindness-copy">
        <div className="eyebrow" style={{ color: 'var(--color-primary-accent)', fontFamily: 'var(--font-mono)' }}>
          <svg className="sprout" viewBox="0 0 16 22" fill="none"><path d="M8 0c3.5 4.5 5.2 7.4 5.2 10.4a5.2 5.2 0 1 1-10.4 0C2.8 7.4 4.5 4.5 8 0z" fill="var(--color-saffron-glow)"/></svg>
          Dhara Divine Awards
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '32px' }}>Dhara Divine Awards</h2>
        <p style={{ color: 'var(--ink-soft)' }}>The Dhara Divine Awards honour exceptional individuals, institutions, and organizations for their outstanding contributions to spirituality, culture, heritage, social service, education, and the preservation of India's timeless traditions.</p>
      </div>
      <div className="impact-grid">
        <div className="impact-card glassmorphism-card" style={{ borderRadius: '24px', border: '1px solid rgba(217, 203, 176, 0.5)' }}>
          <div className="impact-icon" style={{ background: 'var(--color-card-cream)' }}><svg viewBox="0 0 24 24" fill="none"><path d="M4 11h16M6 11V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4M4 11l1 8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l1-8" stroke="var(--color-saffron-glow-dark)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)' }}>Spiritual Pillars</h4>
          <p style={{ color: 'var(--ink-soft)', fontSize: '13px' }}>The Spiritual Pillars represent the diverse traditions, spiritual leaders, devotees, and temple communities dedicated to preserving India's sacred heritage through faith, service, and cultural values.</p>
        </div>
        <div className="impact-card glassmorphism-card" style={{ borderRadius: '24px', border: '1px solid rgba(217, 203, 176, 0.5)' }}>
          <div className="impact-icon" style={{ background: 'var(--color-card-cream)' }}><svg viewBox="0 0 24 24" fill="none"><path d="M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6" stroke="var(--color-saffron-glow-dark)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)' }}>Institutions &amp; Organisations</h4>
          <p style={{ color: 'var(--ink-soft)', fontSize: '13px' }}>Institutions and Organisations are dedicated entities that promote spiritual, educational, healthcare, cultural, and social development while preserving traditions and serving the community with excellence and compassion.</p>
        </div>
        <div className="impact-card glassmorphism-card" style={{ borderRadius: '24px', border: '1px solid rgba(217, 203, 176, 0.5)' }}>
          <div className="impact-icon" style={{ background: 'var(--color-card-cream)' }}><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="var(--color-saffron-glow-dark)" strokeWidth="1.6"/><path d="M5 20c0-3.8 3.2-6.5 7-6.5s7 2.7 7 6.5" stroke="var(--color-saffron-glow-dark)" strokeWidth="1.6"/></svg></div>
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)' }}>Individuals &amp; Professionals</h4>
          <p style={{ color: 'var(--ink-soft)', fontSize: '13px' }}>Individuals and Professionals are distinguished contributors from diverse fields who inspire society through their expertise, leadership, innovation, service, and commitment to preserving spiritual, cultural, educational, and social values.</p>
        </div>
        <div className="impact-card glassmorphism-card" style={{ borderRadius: '24px', border: '1px solid rgba(217, 203, 176, 0.5)' }}>
          <div className="impact-icon" style={{ background: 'var(--color-card-cream)' }}><svg viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.5-9-9c-1.4-3 .5-6.5 4-6.5 2 0 3.6 1.2 5 3 1.4-1.8 3-3 5-3 3.5 0 5.4 3.5 4 6.5-2 4.5-9 9-9 9z" stroke="var(--color-saffron-glow-dark)" strokeWidth="1.6"/></svg></div>
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)' }}>Grass Route Eminents</h4>
          <p style={{ color: 'var(--ink-soft)', fontSize: '13px' }}>Grass Route Eminents are dedicated individuals and traditional institutions who preserve India's spiritual heritage, temple arts, ancient craftsmanship, and cultural traditions through selfless service, devotion, and generations of skilled practice.</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Mission Pillars */}
<section className="pillars-section reveal" id="programs">
  <div className="wrap">
    <div className="section-head">
      <div className="eyebrow" style={{ color: 'var(--color-primary-accent)', fontFamily: 'var(--font-mono)' }}>
        <svg className="sprout" viewBox="0 0 16 22" fill="none"><path d="M8 22V11M8 11C8 6 4 4 1 4c0 5 3 7 7 7zM8 11c0-5 4-7 7-7 0 5-3 7-7 7z" stroke="var(--color-saffron-glow)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        What We Stand For
      </div>
      <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)' }}>Three pillars, one purpose</h2>
      <p style={{ color: 'var(--ink-soft)' }}>Every program we run traces back to one of these commitments — culture, spirit, and people.</p>
    </div>
    <div className="pillars-grid">
      <div className="pillar-card glassmorphism-card" style={{ borderRadius: '28px', border: '1px solid rgba(217, 203, 176, 0.5)' }}>
        <div className="pillar-icon" style={{ background: 'var(--color-deep-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Landmark color="var(--color-saffron-glow)" size={22} strokeWidth={1.6} /></div>
        <div className="num" style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-primary-accent)', fontSize: '11px', fontWeight: 'bold' }}>01 — Desiyam</div>
        <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontWeight: 'bold', fontSize: '20px' }}>National Culture</h3>
        <p style={{ color: 'var(--ink-soft)', fontSize: '14px' }}>We promote and preserve India's rich cultural identity — from temple traditions to heritage arts that risk being forgotten.</p>
      </div>
      <div className="pillar-card glassmorphism-card" style={{ borderRadius: '28px', border: '1px solid rgba(217, 203, 176, 0.5)' }}>
        <div className="pillar-icon" style={{ background: 'var(--color-deep-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Flame color="var(--color-saffron-glow)" size={22} strokeWidth={1.6} /></div>
        <div className="num" style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-primary-accent)', fontSize: '11px', fontWeight: 'bold' }}>02 — Spiritualism</div>
        <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontWeight: 'bold', fontSize: '20px' }}>Sacred Restoration</h3>
        <p style={{ color: 'var(--ink-soft)', fontSize: '14px' }}>We support spiritual education, temple renovation, and rituals that connect communities with timeless wisdom.</p>
      </div>
      <div className="pillar-card glassmorphism-card" style={{ borderRadius: '28px', border: '1px solid rgba(217, 203, 176, 0.5)' }}>
        <div className="pillar-icon" style={{ background: 'var(--color-deep-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-saffron-glow)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H11a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M18 3.13a4 4 0 0 1 0 7.75" /><path d="M1 21v-2a4 4 0 0 1 3-3.87" /><path d="M6 3.13a4 4 0 0 0 0 7.75" /></svg></div>
        <div className="num" style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-primary-accent)', fontSize: '11px', fontWeight: 'bold' }}>03 — Welfare</div>
        <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontWeight: 'bold', fontSize: '20px' }}>Community Care</h3>
        <p style={{ color: 'var(--ink-soft)', fontSize: '14px' }}>Through rehabilitation, medical care, and outreach, we empower vulnerable people to live with purpose and pride.</p>
      </div>
    </div>
  </div>
</section>

{/* About / Founder message */}
<section id="about" className="reveal">
  <div className="wrap">
    <div className="about-grid">
      <div className="about-visual">
        <div className="about-photo" style={{ borderRadius: '28px', border: '2px solid var(--color-card-border)', boxShadow: '0 20px 40px rgba(64, 28, 12,0.12)' }}></div>
        <div className="quote-card glassmorphism-card" style={{ background: 'var(--color-card-cream)', borderLeft: '4px solid var(--color-saffron-glow)', color: 'var(--color-deep-forest-dark)', borderRadius: '18px', padding: '22px 24px', boxShadow: '0 12px 28px rgba(64, 28, 12,0.08)' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '15px', lineHeight: '1.5' }}>"Service to people is service to the divine."</p>
        </div>
      </div>
      <div className="about-copy">
        <div className="eyebrow" style={{ color: 'var(--color-primary-accent)', fontFamily: 'var(--font-mono)' }}>
          <svg className="sprout" viewBox="0 0 16 22" fill="none"><path d="M8 22V11M8 11C8 6 4 4 1 4c0 5 3 7 7 7zM8 11c0-5 4-7 7-7 0 5-3 7-7 7z" stroke="var(--color-saffron-glow)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          A Message From Our Founders
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '34px' }}>Built on two decades of quiet, consistent service</h2>
        <p style={{ color: 'var(--ink-soft)' }}>Dhara Foundations was born from years of grassroots work — temple protection, legal advocacy for spiritual heritage, and direct support for tribal and rural communities across Tamil Nadu.</p>
        <p style={{ color: 'var(--ink-soft)' }}>What began as individual conviction has grown into a registered public non-profit organization working at the intersection of culture, faith, and welfare — one renovation, one ration kit, one scholarship at a time.</p>
        <ul className="about-list">
          <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: 'var(--ink-soft)' }}>
            <svg className="check" viewBox="0 0 24 24" fill="none" style={{ marginTop: '2px' }}><circle cx="12" cy="12" r="11" fill="var(--color-card-cream)"/><path d="M8 12.5l2.5 2.5L16 9" stroke="var(--color-saffron-glow)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Two decades of construction &amp; community leadership</span>
          </li>
          <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: 'var(--ink-soft)' }}>
            <svg className="check" viewBox="0 0 24 24" fill="none" style={{ marginTop: '2px' }}><circle cx="12" cy="12" r="11" fill="var(--color-card-cream)"/><path d="M8 12.5l2.5 2.5L16 9" stroke="var(--color-saffron-glow)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Legal advocacy for temple &amp; heritage protection</span>
          </li>
          <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: 'var(--ink-soft)' }}>
            <svg className="check" viewBox="0 0 24 24" fill="none" style={{ marginTop: '2px' }}><circle cx="12" cy="12" r="11" fill="var(--color-card-cream)"/><path d="M8 12.5l2.5 2.5L16 9" stroke="var(--color-saffron-glow)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Chartered governance — financial transparency by design</span>
          </li>
        </ul>
        <a 
          href="/about" 
          onClick={(e) => { 
            e.preventDefault(); 
            setActiveTab('about'); 
          }} 
          className="btn btn-primary sparkle-shimmer-btn" 
          style={{ marginTop: '30px' }}
        >
          Read Our Full Story
        </a>
      </div>
    </div>
  </div>
</section>

{/* Founders / Trustees */}
<section style={{"background":"var(--color-card-cream)"}} className="reveal">
  <div className="wrap">
    <div className="section-head">
      <div className="eyebrow" style={{ color: 'var(--color-primary-accent)', fontFamily: 'var(--font-mono)' }}>
        <svg className="sprout" viewBox="0 0 16 22" fill="none"><path d="M8 22V11M8 11C8 6 4 4 1 4c0 5 3 7 7 7zM8 11c0-5 4-7 7-7 0 5-3 7-7 7z" stroke="var(--color-saffron-glow)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Our Trustees
      </div>
      <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)' }}>The people behind the purpose</h2>
    </div>
    <div className="founders-grid">
      <div className="founder-card glassmorphism-card" style={{ padding: '36px 24px', borderRadius: '24px', border: '1px solid rgba(217, 203, 176, 0.4)' }}>
        <div className="founder-photo flex items-center justify-center bg-gradient-to-b from-[#F9F6F0] to-[#EAE2D2]" style={{ 
          border: '3px solid var(--color-card-border)', 
          outline: '1px solid var(--color-saffron-glow)', 
          outlineOffset: '4px',
          boxShadow: '0 8px 24px rgba(64, 28, 12,0.1)'
        }}>
          <User className="w-16 h-16 text-[var(--color-deep-forest-dark)]/70" />
        </div>
        <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '18px', fontWeight: 'bold' }}>S. Vinoth Ragavendran</h4>
        <div className="role" style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '12px', color: 'var(--color-primary-accent)', fontWeight: 'bold', margin: '8px 0 12px' }}>Founder President &amp; Trustee</div>
        <p style={{ color: 'var(--ink-soft)', fontSize: '14px' }}>Two decades in construction; active in temple protection and legal advocacy for heritage preservation.</p>
      </div>
      <div className="founder-card glassmorphism-card" style={{ padding: '36px 24px', borderRadius: '24px', border: '1px solid rgba(217, 203, 176, 0.4)' }}>
        <div className="founder-photo flex items-center justify-center bg-gradient-to-b from-[#F9F6F0] to-[#EAE2D2]" style={{ 
          border: '3px solid var(--color-card-border)', 
          outline: '1px solid var(--color-saffron-glow)', 
          outlineOffset: '4px',
          boxShadow: '0 8px 24px rgba(64, 28, 12,0.1)'
        }}>
          <User className="w-16 h-16 text-[var(--color-deep-forest-dark)]/70" />
        </div>
        <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '18px', fontWeight: 'bold' }}>P. Ezhumalai</h4>
        <div className="role" style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '12px', color: 'var(--color-primary-accent)', fontWeight: 'bold', margin: '8px 0 12px' }}>Agriculturist &amp; Social Worker</div>
        <p style={{ color: 'var(--ink-soft)', fontSize: '14px' }}>A dedicated dairy farmer in public life since childhood, guided by deep devotion to Hindu values.</p>
      </div>
      <div className="founder-card glassmorphism-card" style={{ padding: '36px 24px', borderRadius: '24px', border: '1px solid rgba(217, 203, 176, 0.4)' }}>
        <div className="founder-photo flex items-center justify-center bg-gradient-to-b from-[#F9F6F0] to-[#EAE2D2]" style={{ 
          border: '3px solid var(--color-card-border)', 
          outline: '1px solid var(--color-saffron-glow)', 
          outlineOffset: '4px',
          boxShadow: '0 8px 24px rgba(64, 28, 12,0.1)'
        }}>
          <User className="w-16 h-16 text-[var(--color-deep-forest-dark)]/70" />
        </div>
        <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '18px', fontWeight: 'bold' }}>S. Srividhya</h4>
        <div className="role" style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '12px', color: 'var(--color-primary-accent)', fontWeight: 'bold', margin: '8px 0 12px' }}>Chartered Accountant &amp; CS</div>
        <p style={{ color: 'var(--ink-soft)', fontSize: '14px' }}>Dual-qualified professional bringing ethics and precision to the trust's governance.</p>
      </div>
    </div>
  </div>
</section>

{/* Divine Awards 2025 */}
<section id="awards" className="reveal">
  <div className="awards-band" style={{ background: 'linear-gradient(135deg, var(--color-deep-forest) 0%, var(--color-deep-forest-dark) 100%)', border: '1.5px solid rgba(217,203,176,0.3)', borderRadius: '36px', overflow: 'hidden' }}>
    <div className="awards-inner">
      <div>
        <div className="awards-eyebrow" style={{ color: 'var(--color-saffron-glow)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="15" height="18" viewBox="0 0 16 22" fill="none"><path d="M8 22V11M8 11C8 6 4 4 1 4c0 5 3 7 7 7zM8 11c0-5 4-7 7-7 0 5-3 7-7 7z" stroke="var(--color-saffron-glow)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Flagship Event
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: '#fff', fontSize: '36px', fontWeight: 'bold', marginTop: '12px', marginBottom: '16px' }}>Dhara Divine Awards 2025</h2>
        <p style={{ color: '#D5E5CD', fontSize: '15.5px', maxWidth: '460px', marginBottom: '30px' }}>A prestigious convergence of spiritual leaders, selfless changemakers, and corporate CSR visionaries. Join us in cultivating harmony, empowering community growth, and acknowledging the quiet souls who serve humanity.</p>
        <div className="awards-meta" style={{ display: 'flex', gap: '28px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#F3E9D4', fontWeight: '500' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="var(--color-saffron-glow)" strokeWidth="1.6"/><path d="M3 9h18M8 3v4M16 3v4" stroke="var(--color-saffron-glow)" strokeWidth="1.6"/></svg>
            <span style={{ fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>January 24, 2025</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#F3E9D4', fontWeight: '500' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 22s7-7.5 7-12.5A7 7 0 0 0 5 9.5C5 14.5 12 22 12 22z" stroke="var(--color-saffron-glow)" strokeWidth="1.6"/><circle cx="12" cy="9.5" r="2.4" stroke="var(--color-saffron-glow)" strokeWidth="1.6"/></svg>
            <span>Chinmaya Heritage Centre, Chennai</span>
          </div>
        </div>
        <div className="awards-actions" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '30px' }}>
          <button onClick={() => setActiveTab('events')} className="btn btn-primary sparkle-shimmer-btn">Explore Events</button>
          <button onClick={() => setActiveTab('csr')} className="btn btn-light">CSR Partnership</button>
        </div>
      </div>
      <div className="awards-visual" style={{ position: 'relative', overflow: 'hidden', height: '100%', minHeight: '320px', borderRadius: '26px' }}>
        <img 
          src="/images/Divine Awards 2026.jpg" 
          alt="Dhara Divine Awards 2025" 
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
          style={{ position: 'absolute', inset: 0 }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1531058020387-3be344559be6?auto=format&fit=crop&w=800&q=80";
          }}
        />
      </div>
    </div>
  </div>
</section>

{/* Events */}

{/* Operations Portal / Seva Dashboard */}
<section id="seva-dashboard" className="reveal">
  <div className="wrap">
    <div className="section-head" style={{ textAlign: 'center', marginBottom: '40px' }}>
      <div className="eyebrow" style={{ color: 'var(--color-primary-accent)', fontFamily: 'var(--font-mono)', justifyContent: 'center' }}>
        <svg className="sprout" viewBox="0 0 16 22" fill="none">
          <path d="M8 22V11M8 11C8 6 4 4 1 4c0 5 3 7 7 7zM8 11c0-5 4-7 7-7 0 5-3 7-7 7z" stroke="var(--color-saffron-glow)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Seva Portal
      </div>
      <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '38px', marginTop: '12px' }}>Operations Dashboard</h2>
      <p style={{ color: 'var(--ink-soft)', maxWidth: '600px', margin: '10px auto 0' }}>Explore dedicated tools, register availability for social activities, or check corporate alignment portals below.</p>
    </div>

    {/* Modern Categories Selector Tab List */}
    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '44px', flexWrap: 'wrap' }}>
      {dashboardCategories.map((cat) => {
        const isSelected = dashboardCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => setDashboardCategory(cat.id)}
            style={{
              padding: '12px 24px',
              borderRadius: '999px',
              border: '1.5px solid',
              borderColor: isSelected ? 'var(--color-primary-accent)' : 'rgba(217, 203, 176, 0.45)',
              background: isSelected ? 'var(--color-deep-forest)' : 'rgba(255, 255, 255, 0.6)',
              color: isSelected ? '#fff' : 'var(--color-deep-forest-dark)',
              fontSize: '14.5px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: isSelected ? '0 10px 20px -8px rgba(64, 28, 12, 0.3)' : 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className={isSelected ? 'sparkle-shimmer-btn' : ''}
          >
            {cat.label}
          </button>
        );
      })}
    </div>

    {/* Dynamic Cards Grid */}
    <div className="dashboard-category-grid">
      {dashboardItems.filter(item => item.category === dashboardCategory).map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            onClick={() => {
              if (item.id === 'registration') {
                setActiveTab('register');
              } else if (item.id === 'highlights') {
                setActiveTab('events');
              } else if (item.id === 'volunteer') {
                setActiveTab('volunteer');
              } else if (item.id === 'sponsorship') {
                setActiveTab('sponsor');
              } else if (item.id === 'donor') {
                setActiveTab('donate');
              } else if (item.id === 'csr') {
                setActiveTab('csr');
              } else if (item.id === 'nominations') {
                setActiveTab('nomination');
              } else if (item.id === 'contact') {
                setActiveTab('contact');
              } else if (item.id === 'media') {
                setActiveTab('news');
              }
            }}
            className="impact-card glassmorphism-card cursor-pointer group dashboard-panel-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              borderRadius: '24px',
              border: '1.5px solid rgba(217, 203, 176, 0.4)',
              padding: '32px',
              background: 'rgba(255, 255, 255, 0.65)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 20px -10px rgba(0,0,0,0.05)',
              minHeight: '260px'
            }}
          >
            {/* Top Hover Glow Accent */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, var(--color-saffron-glow) 0%, var(--color-primary-accent) 100%)',
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 0.4s ease'
            }} className="card-top-glow" />

            <div>
              <div
                className="impact-icon"
                style={{
                  background: 'rgba(64, 28, 12, 0.05)',
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary-accent)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h4 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'var(--color-deep-forest-dark)',
                margin: '20px 0 10px',
                transition: 'color 0.3s ease'
              }} className="group-hover:text-forest-green">
                {item.label}
              </h4>
              <p style={{
                color: 'var(--ink-soft)',
                fontSize: '14px',
                lineHeight: '1.55',
                margin: 0
              }}>
                {item.description}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'var(--color-primary-accent)',
              marginTop: '28px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              <span>{item.actionLabel}</span>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

{/* CTA band */}
<section className="reveal">
  <div className="cta-band">
    <div className="cta-band-inner">
      <h2>Join hands with us</h2>
      <p>Whether through volunteering, sponsorship, or a one-time gift — every contribution carries our mission forward.</p>
      <div className="cta-actions">
        <button onClick={() => setActiveTab('volunteer')} className="btn btn-light">Become a Volunteer</button>
        <button onClick={() => setActiveTab('donate')} className="btn btn-white">Donate Now</button>
      </div>
    </div>
  </div>
</section>

{/* Footer */}
            </div>
          );



  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Brand Entrance Preloader Overlay */}
      <div className={`preloader-overlay ${showPreloader ? 'active' : 'fade-out'}`}>
        <div className="preloader-content">
          <div className="preloader-logo-wrapper">
            <img src="/logo/New logo.png" alt="Dhara Foundations" className="preloader-logo" />
          </div>
          <h2 className="preloader-text">
            Celebrating the Unspoken Celebrities
          </h2>
          <div className="preloader-divine-loader">
            <svg className="divine-loader-svg" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="var(--color-saffron-glow)" strokeWidth="1.5" strokeDasharray="3 6" fill="none" opacity="0.6" className="divine-ring-rotate" />
              <path d="M50 15 C55 35, 45 35, 50 15 Z" fill="var(--color-saffron-glow)" opacity="0.8" transform="rotate(0 50 50)" />
              <path d="M50 15 C55 35, 45 35, 50 15 Z" fill="var(--color-saffron-glow)" opacity="0.8" transform="rotate(45 50 50)" />
              <path d="M50 15 C55 35, 45 35, 50 15 Z" fill="var(--color-saffron-glow)" opacity="0.8" transform="rotate(90 50 50)" />
              <path d="M50 15 C55 35, 45 35, 50 15 Z" fill="var(--color-saffron-glow)" opacity="0.8" transform="rotate(135 50 50)" />
              <path d="M50 15 C55 35, 45 35, 50 15 Z" fill="var(--color-saffron-glow)" opacity="0.8" transform="rotate(180 50 50)" />
              <path d="M50 15 C55 35, 45 35, 50 15 Z" fill="var(--color-saffron-glow)" opacity="0.8" transform="rotate(225 50 50)" />
              <path d="M50 15 C55 35, 45 35, 50 15 Z" fill="var(--color-saffron-glow)" opacity="0.8" transform="rotate(270 50 50)" />
              <path d="M50 15 C55 35, 45 35, 50 15 Z" fill="var(--color-saffron-glow)" opacity="0.8" transform="rotate(315 50 50)" />
              <circle cx="50" cy="50" r="8" fill="var(--color-saffron-glow-dark)" />
            </svg>
          </div>
        </div>
      </div>

      <Navbar 
        activeTab={activeTab} 
        setActiveTab={changeTab} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        showInstallBtn={showInstallBtn}
        onInstall={handleInstallClick}
      />
      {/* Main Content Area */}
      <main style={{ flex: '1 0 auto' }}>
        <Routes>
          <Route path="/" element={getHomeElement()} />
          <Route path="/home" element={getHomeElement()} />
          
          <Route path="/about" element={<div className="animate-fade-in"><AboutUs siteConfig={siteConfig} /></div>} />
          <Route path="/vision" element={<div className="animate-fade-in"><VisionMission siteConfig={siteConfig} /></div>} />
          <Route path="/founder" element={<div className="animate-fade-in"><FounderMessage siteConfig={siteConfig} /></div>} />
          <Route path="/events" element={<div className="animate-fade-in"><EventsActivities siteConfig={siteConfig} /></div>} />
          <Route path="/gallery" element={<div className="animate-fade-in"><GalleryPage siteConfig={siteConfig} /></div>} />
          <Route path="/news" element={<div className="animate-fade-in"><MediaCoverage onSubmitSuccess={handleFormSuccess} siteConfig={siteConfig} /></div>} />
          <Route path="/contact" element={<div className="animate-fade-in"><GeneralEnquiries onSubmitSuccess={handleFormSuccess} siteConfig={siteConfig} /></div>} />
          
          {/* Subdomain Pages */}
          <Route path="/register" element={<div className="animate-fade-in"><EventRegistration onSubmitSuccess={handleFormSuccess} siteConfig={siteConfig} /></div>} />
          <Route path="/sponsor" element={<div className="animate-fade-in"><Sponsorship onSubmitSuccess={handleFormSuccess} siteConfig={siteConfig} /></div>} />
          <Route path="/volunteer" element={<div className="animate-fade-in"><Volunteer onSubmitSuccess={handleFormSuccess} siteConfig={siteConfig} /></div>} />
          <Route path="/donate" element={<div className="animate-fade-in"><DonorSupport onSubmitSuccess={handleFormSuccess} siteConfig={siteConfig} /></div>} />
          <Route path="/csr" element={<div className="animate-fade-in"><CorporateCSR onSubmitSuccess={handleFormSuccess} siteConfig={siteConfig} /></div>} />
          <Route path="/nomination" element={<div className="animate-fade-in"><AwardNominations onSubmitSuccess={handleFormSuccess} siteConfig={siteConfig} /></div>} />
          <Route path="/media" element={<div className="animate-fade-in"><MediaCoverage onSubmitSuccess={handleFormSuccess} siteConfig={siteConfig} /></div>} />
          <Route path="/highlights" element={<div className="animate-fade-in"><EventsActivities siteConfig={siteConfig} /></div>} />
          <Route path="/enquiry" element={<div className="animate-fade-in"><GeneralEnquiries onSubmitSuccess={handleFormSuccess} siteConfig={siteConfig} /></div>} />
          <Route path="/thankyou" element={<div className="animate-fade-in"><ThankYouPage /></div>} />

          <Route path="*" element={getHomeElement()} />
        </Routes>
      </main>

      <Footer setActiveTab={changeTab} handleNavClick={handleNavClick} />

      {/* 11. Thank You Confirmation Overlay State */}
      {showThankYou && successData && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(5, 46, 42, 0.6)', backdropFilter: 'blur(8px)', zIndex: 55, display: 'flex', itemsAlign: 'center', justifyContent: 'center', padding: '16px' }} className="items-center">
          <div className="bg-[#FFFEFB] rounded-3xl border-2 border-[#C9A646] p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto" style={{ margin: 'auto' }}>
            <div className="absolute right-0 top-0 w-36 h-36 bg-amber-100 rounded-full filter blur-3xl opacity-40 -z-10"></div>
            
            {/* Close Button */}
            <button
              onClick={() => {
                setShowThankYou(false);
                setSuccessData(null);
                setActiveTab('home');
              }}
              style={{ position: 'absolute', right: '16px', top: '16px', color: 'var(--ink-soft)', padding: '8px' }}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6" style={{ marginTop: '12px' }}>
              <div className="flex justify-center mb-5">
                <div className="bg-[#401C0C] px-5 py-2.5 rounded-2xl shadow-sm inline-flex items-center justify-center">
                  <img 
                    src="/logo/New logo.png" 
                    alt="Dhara Foundations" 
                    className="h-10 w-auto object-contain" 
                  />
                </div>
              </div>
              
              <div className="w-12 h-12 rounded-full bg-[#401C0C]/10 border border-[#401C0C]/20 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-7 h-7 text-[#401C0C]" />
              </div>
              
              <span className="text-xs text-[#D9762E] font-bold uppercase tracking-wider font-sans block mb-1">Submission Complete</span>
              <h3 className="text-2xl font-serif text-[#1F2318] font-bold" style={{ fontFamily: 'var(--display)' }}>{successData.title}</h3>
            </div>

            {/* Devotional confirmation message */}
            <div className="bg-white rounded-2xl p-5 border border-sage-accent/30 mb-6 text-sm text-neutral-700 leading-relaxed font-sans shadow-sm text-center">
              {successData.message}
            </div>

            {/* Submission specific details */}
            {successData.details && successData.details.length > 0 && (
              <div className="bg-[#F3EDDC] rounded-2xl p-4 border border-sage-accent/20 mb-6 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-forest-teal font-sans border-b border-sage-accent/30 pb-2 mb-2" style={{ color: 'var(--leaf-deep)' }}>Details Summary</h4>
                {successData.details.map((detail, idx) => (
                  <div key={idx} className="flex justify-between text-xs font-sans" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="text-neutral-500">{detail.label}:</span>
                    <span className="font-bold text-forest-teal-dark" style={{ color: 'var(--ink)' }}>{detail.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Devotional scripture card */}
            <div className="border-y border-neutral-100 py-4 mb-6 text-center" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
              <span className="text-[10px] text-[#C9A646] font-semibold uppercase tracking-wider font-sans block mb-2">Gita Seva Sankalpa</span>
              <p className="text-xs text-neutral-600 font-serif italic max-w-lg mx-auto leading-relaxed">
                "{randomQuote.quote}"
              </p>
              <p className="text-[10px] text-neutral-400 font-sans mt-1.5">
                {randomQuote.translation}
              </p>
            </div>

            {/* Social Share & Close CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-start" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="text-xs font-semibold text-neutral-500 font-sans flex items-center">
                  <Share2 className="w-4 h-4 mr-1.5 text-forest-teal-light" style={{ marginRight: '6px' }} />
                  Share Seva:
                </span>
                
                <a 
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white border border-neutral-200 hover:border-blue-400 text-neutral-600 hover:text-blue-400 transition-all duration-200 shadow-sm flex items-center justify-center"
                  aria-label="Share on X"
                  style={{ display: 'inline-flex', padding: '6px', border: '1px solid var(--line)', borderRadius: '8px' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px' }}>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white border border-neutral-200 hover:border-blue-700 text-neutral-600 hover:text-blue-700 transition-all duration-200 shadow-sm flex items-center justify-center"
                  aria-label="Share on Facebook"
                  style={{ display: 'inline-flex', padding: '6px', border: '1px solid var(--line)', borderRadius: '8px' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px' }}>
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                  </svg>
                </a>

                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white border border-neutral-200 hover:border-blue-600 text-neutral-600 hover:text-blue-600 transition-all duration-200 shadow-sm flex items-center justify-center"
                  aria-label="Share on LinkedIn"
                  style={{ display: 'inline-flex', padding: '6px', border: '1px solid var(--line)', borderRadius: '8px' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px' }}>
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>

              <button
                onClick={() => {
                  setShowThankYou(false);
                  setSuccessData(null);
                  setActiveTab('home');
                }}
                className="btn btn-primary"
                style={{ padding: '10px 20px', fontSize: '13px' }}
              >
                Close & Return Home
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Home YouTube Video Player Modal */}
      {homeActiveVideoId && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            backgroundColor: 'rgba(5, 46, 42, 0.85)', 
            backdropFilter: 'blur(8px)', 
            zIndex: 60, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '16px' 
          }} 
          onClick={() => setHomeActiveVideoId(null)}
        >
          <div 
            style={{ 
              position: 'relative', 
              width: '100%', 
              maxWidth: '800px', 
              aspectRatio: '16/9', 
              background: '#000', 
              borderRadius: '24px', 
              overflow: 'hidden', 
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              border: '2px solid var(--color-saffron-glow)'
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setHomeActiveVideoId(null)}
              style={{ 
                position: 'absolute', 
                top: '16px', 
                right: '16px', 
                background: 'rgba(0,0,0,0.5)', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '50%', 
                width: '36px', 
                height: '36px', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <X className="w-5 h-5" />
            </button>
            <iframe 
              src={`https://www.youtube.com/embed/${homeActiveVideoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ width: '100%', height: '100%' }}
            ></iframe>
          </div>
        </div>
      )}

      {/* Floating PWA Install Banner */}
      {showInstallBanner && (
        <div className="pwa-install-banner">
          <div className="pwa-install-inner">
            <div className="pwa-info">
              <div className="pwa-icon-container">
                <img src="/logo/New logo.png" alt="App Icon" className="pwa-app-icon" />
              </div>
              <div>
                <h4 className="pwa-title">Dhara Divine Awards</h4>
                <p className="pwa-desc">Install our app for offline support and seamless access.</p>
              </div>
            </div>
            <div className="pwa-actions">
              <button onClick={handleInstallClick} className="btn btn-gold btn-sm sparkle-shimmer-btn" style={{ padding: '8px 16px', fontSize: '12px', borderRadius: '999px' }}>
                Install
              </button>
              <button onClick={dismissInstallBanner} className="pwa-close-btn" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

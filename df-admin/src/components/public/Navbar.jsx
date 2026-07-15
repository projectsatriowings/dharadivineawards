import React, { useState } from 'react';
import { Phone, Mail, ChevronDown } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen, showInstallBtn, onInstall }) {
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  const [aboutOpen, setAboutOpen] = useState(false);
  const [portalsOpen, setPortalsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobilePortalsOpen, setMobilePortalsOpen] = useState(false);

  return (
    <>
      {/* Top utility bar */}
      <div className="topbar-container">
        <div className="topbar-pill" style={{ justifyContent: 'center' }}>
          <div className="topbar-left" style={{ gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="tel:04422236641" className="topbar-link" style={{ gap: '6px' }}>
              <Phone className="w-3.5 h-3.5" style={{ color: '#3F8C4A' }} />
              <span className="label-helpline">Helpline</span>
              <span className="value-phone">044-22236641</span>
            </a>
            <span className="separator" style={{ color: 'rgba(64, 28, 12, 0.15)' }}>|</span>
            <a href="mailto:info@dharafoundations.in" className="topbar-link" style={{ gap: '6px' }}>
              <Mail className="w-3.5 h-3.5" style={{ color: '#3F8C4A' }} />
              <span className="label-email">Email</span>
              <span className="value-email">info@dharafoundations.in</span>
            </a>
          </div>
        </div>
      </div>

      {/* Nav */}
      <header className="nav">
        <div className="nav-inner animate-fade-in">
          <a href="#" className="logo-link" onClick={(e) => { e.preventDefault(); setActiveTab('home'); setMobileMenuOpen(false); }}>
            <img src="/logo/New logo.png" alt="Dhara Foundations" className="nav-logo-img" />
          </a>
          
          <nav className="links">
            <a href="#" className={activeTab === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>Home</a>
            
            <div 
              className="nav-dropdown-container"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <a href="#" className={activeTab === 'about' || activeTab === 'vision' || activeTab === 'founder' ? 'active nav-dropdown-trigger' : 'nav-dropdown-trigger'} onClick={(e) => { e.preventDefault(); setActiveTab('about'); setAboutOpen(false); }}>
                About Us <ChevronDown className="w-3.5 h-3.5 dropdown-arrow" />
              </a>
              {aboutOpen && (
                <div className="nav-dropdown-menu" style={{ display: 'block' }}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('about'); setAboutOpen(false); }}>About Organization</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('vision'); setAboutOpen(false); }}>Vision &amp; Mission</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('founder'); setAboutOpen(false); }}>Founder Message</a>
                </div>
              )}
            </div>

            <div 
              className="nav-dropdown-container"
              onMouseEnter={() => setPortalsOpen(true)}
              onMouseLeave={() => setPortalsOpen(false)}
            >
              <a href="#" className="nav-dropdown-trigger" onClick={(e) => { e.preventDefault(); setPortalsOpen(!portalsOpen); }}>
                Event Portals <ChevronDown className="w-3.5 h-3.5 dropdown-arrow" />
              </a>
              {portalsOpen && (
                <div className="nav-dropdown-menu" style={{ display: 'block', minWidth: '220px' }}>
                  <a href="/register" onClick={(e) => { e.preventDefault(); setActiveTab('register'); setPortalsOpen(false); }}>Event Registration</a>
                  <a href="/nomination" onClick={(e) => { e.preventDefault(); setActiveTab('nomination'); setPortalsOpen(false); }}>Award Nominations</a>
                  <a href="/sponsor" onClick={(e) => { e.preventDefault(); setActiveTab('sponsor'); setPortalsOpen(false); }}>Corporate Sponsors</a>
                  <a href="/csr" onClick={(e) => { e.preventDefault(); setActiveTab('csr'); setPortalsOpen(false); }}>CSR Partnership</a>
                  <a href="/volunteer" onClick={(e) => { e.preventDefault(); setActiveTab('volunteer'); setPortalsOpen(false); }}>Volunteer Seva</a>
                  <a href="https://dhara-foundation.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={() => setPortalsOpen(false)}>Other Events</a>
                </div>
              )}
            </div>

            <a href="#" className={activeTab === 'highlights' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('highlights'); }}>Event Videos</a>
            <a href="#" className={activeTab === 'gallery' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('gallery'); }}>Gallery</a>
            <a href="#" className={activeTab === 'news' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('news'); }}>News</a>
            <a href="#" className={activeTab === 'contact' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('contact'); }}>Contact</a>
          </nav>

          <div className="nav-cta">
            <button onClick={() => setActiveTab('donate')} className="btn btn-gold sparkle-shimmer-btn">Donate Now</button>
          </div>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className={`menu-toggle ${mobileMenuOpen ? 'open' : ''}`} 
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile nav dropdown overlay */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown-menu">
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('home'); setMobileMenuOpen(false); }}>Home</a>
            
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'between' }} onClick={(e) => { e.preventDefault(); setMobileAboutOpen(!mobileAboutOpen); }}>
              About Us <ChevronDown className="w-3.5 h-3.5 ml-1.5" style={{ transform: mobileAboutOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', marginLeft: '6px' }} />
            </a>
            {mobileAboutOpen && (
              <div className="mobile-sub-links">
                <a href="#" className={activeTab === 'about' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('about'); setMobileMenuOpen(false); }}>About Organization</a>
                <a href="#" className={activeTab === 'vision' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('vision'); setMobileMenuOpen(false); }}>Vision &amp; Mission</a>
                <a href="#" className={activeTab === 'founder' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('founder'); setMobileMenuOpen(false); }}>Founder Message</a>
              </div>
            )}

            <div className="mobile-dropdown-divider" style={{ opacity: 0.3 }} />

            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'between' }} onClick={(e) => { e.preventDefault(); setMobilePortalsOpen(!mobilePortalsOpen); }}>
              Event Portals <ChevronDown className="w-3.5 h-3.5 ml-1.5" style={{ transform: mobilePortalsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', marginLeft: '6px' }} />
            </a>
            {mobilePortalsOpen && (
              <div className="mobile-sub-links">
                <a href="/register" onClick={(e) => { e.preventDefault(); setActiveTab('register'); setMobileMenuOpen(false); }}>Event Registration</a>
                <a href="/nomination" onClick={(e) => { e.preventDefault(); setActiveTab('nomination'); setMobileMenuOpen(false); }}>Award Nominations</a>
                <a href="/sponsor" onClick={(e) => { e.preventDefault(); setActiveTab('sponsor'); setMobileMenuOpen(false); }}>Corporate Sponsors</a>
                <a href="/csr" onClick={(e) => { e.preventDefault(); setActiveTab('csr'); setMobileMenuOpen(false); }}>CSR Partnership</a>
                <a href="/volunteer" onClick={(e) => { e.preventDefault(); setActiveTab('volunteer'); setMobileMenuOpen(false); }}>Volunteer Seva</a>
                <a href="https://dhara-foundation.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>Other Events</a>
              </div>
            )}

            <div className="mobile-dropdown-divider" style={{ opacity: 0.3 }} />

            <a href="#" className={activeTab === 'highlights' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('highlights'); setMobileMenuOpen(false); }}>Event Videos</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('gallery'); setMobileMenuOpen(false); }}>Gallery</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('news'); setMobileMenuOpen(false); }}>News</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('contact'); setMobileMenuOpen(false); }}>Contact</a>
            
            <div className="mobile-dropdown-divider" />
            
            <button onClick={() => { setActiveTab('donate'); setMobileMenuOpen(false); }} className="btn btn-gold w-full justify-center">Donate Now</button>
          </div>
        )}
      </header>
    </>
  );
}

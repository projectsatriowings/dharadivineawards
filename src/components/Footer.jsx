import React from 'react';

export default function Footer({ setActiveTab, handleNavClick }) {
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  return (
    <footer id="contact-section">
      <div className="footer-top-section">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="footer-logo-floating">
                <div className="footer-logo-glow">
                  <img src="/logo/New logo.png" alt="Dhara Foundations emblem" />
                </div>
              </div>
              <p className="footer-about">
                A registered non-profit organization dedicated to transforming lives and protecting traditions — across culture, spirituality, and community welfare.
              </p>
              <div className="footer-social-new">
                <a href="#" className="social-fb" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M14 9h2.5V6H14c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v6H14v-6h2.2l.5-3H14V9.6c0-.4.3-.6.6-.6z" />
                  </svg>
                </a>
                <a href="#" className="social-ig" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="4" width="16" height="16" rx="5" stroke="#FFFFFF" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="3.4" stroke="#FFFFFF" strokeWidth="1.5"/>
                    <circle cx="16.6" cy="7.4" r="1" fill="#FFFFFF"/>
                  </svg>
                </a>
                 <a href="https://www.youtube.com/live/qOAbFfB22uI" target="_blank" rel="noopener noreferrer" className="social-yt" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.467 5.861c-.262-.983-1.034-1.758-2.013-2.022C18.685 3.5 12 3.5 12 3.5s-6.685 0-8.454.339c-.979.264-1.751 1.039-2.013 2.022C1.2 7.625 1.2 12 1.2 12s0 4.375.333 6.139c.262.983 1.034 1.758 2.013 2.022C5.315 20.5 12 20.5 12 20.5s6.685 0 8.454-.339c.979-.264 1.751-1.039 2.013-2.022C22.8 16.375 22.8 12 22.8 12s0-4.375-.333-6.139zM9.75 15.02V8.98L15 12l-5.25 3.02z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="footer-col">
              <h5>Explore</h5>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('about'); }}>About Us</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('vision'); }}>Vision &amp; Mission</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('founder'); }}>Founder Message</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('highlights'); }}>Event Videos</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('gallery'); }}>Gallery</a></li>
                <li><a href="/csr" onClick={(e) => { e.preventDefault(); setActiveTab('csr'); }}>CSR Partnership</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('news'); }}>News</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('contact'); }}>Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h5>Get Involved</h5>
              <ul>
                <li><a href="/register" onClick={(e) => { e.preventDefault(); setActiveTab('register'); }}>Event Registration</a></li>
                <li><a href="/nomination" onClick={(e) => { e.preventDefault(); setActiveTab('nomination'); }}>Award Nominations</a></li>
                <li><a href="/sponsor" onClick={(e) => { e.preventDefault(); setActiveTab('sponsor'); }}>Corporate Sponsors</a></li>
                <li><a href="/volunteer" onClick={(e) => { e.preventDefault(); setActiveTab('volunteer'); }}>Volunteer Seva</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h5>Contact</h5>
              <ul className="footer-contact-new">
                <li>
                  <span className="contact-icon contact-icon-location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 22s7-7.5 7-12.5A7 7 0 0 0 5 9.5C5 14.5 12 22 12 22z" strokeWidth="1.8"/>
                    </svg>
                  </span>
                  <span className="contact-text"># 44A, 3rd Street, Judge Colony, Tambaram Sanatorium, Chennai – 600047</span>
                </li>
                <li>
                  <a href="mailto:info@dharafoundations.in" className="flex items-center gap-3 text-white/80 hover:text-[var(--color-saffron-glow)] transition-colors cursor-pointer w-full no-underline">
                    <span className="contact-icon contact-icon-email flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="1.8"/>
                        <path d="M3 6l9 7 9-7" strokeWidth="1.8"/>
                      </svg>
                    </span>
                    <span className="contact-text hover:underline cursor-pointer">info@dharafoundations.in</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:president@dharafoundations.in" className="flex items-center gap-3 text-white/80 hover:text-[var(--color-saffron-glow)] transition-colors cursor-pointer w-full no-underline">
                    <span className="contact-icon contact-icon-email flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="1.8"/>
                        <path d="M3 6l9 7 9-7" strokeWidth="1.8"/>
                      </svg>
                    </span>
                    <span className="contact-text hover:underline cursor-pointer">president@dharafoundations.in</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:trustee@dharafoundations.in" className="flex items-center gap-3 text-white/80 hover:text-[var(--color-saffron-glow)] transition-colors cursor-pointer w-full no-underline">
                    <span className="contact-icon contact-icon-email flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="1.8"/>
                        <path d="M3 6l9 7 9-7" strokeWidth="1.8"/>
                      </svg>
                    </span>
                    <span className="contact-text hover:underline cursor-pointer">trustee@dharafoundations.in</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:dharafoundationsindia@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-[var(--color-saffron-glow)] transition-colors cursor-pointer w-full no-underline">
                    <span className="contact-icon contact-icon-email flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="1.8"/>
                        <path d="M3 6l9 7 9-7" strokeWidth="1.8"/>
                      </svg>
                    </span>
                    <span className="contact-text hover:underline cursor-pointer">dharafoundationsindia@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a href="tel:04422236641" className="flex items-center gap-3 text-white/80 hover:text-[var(--color-saffron-glow)] transition-colors cursor-pointer w-full no-underline">
                    <span className="contact-icon contact-icon-phone flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.2 3.2 2 2 0 0 1 4.2 1h2a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L7.1 8.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" strokeWidth="1.8"/>
                      </svg>
                    </span>
                    <span className="contact-text hover:underline cursor-pointer">044-22236641</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom-section">
        <div className="wrap">
          <div className="footer-bottom-divider"></div>
          <div className="footer-bottom-content">
            <span className="copyright">© 2026 Dhara Foundations. All rights reserved.</span>
            <span className="trust-details">Registered as a non-profit organization under Indian Trust Act 1882 · 12A: AAETD8857AE20241 · 80G: AAETD8857AF20241 · CSR00086947 · NGO DARPAN: TN/2024/0473120</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

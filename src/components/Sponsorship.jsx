import React, { useState, useEffect } from 'react';
import { 
  Award, Shield, Sparkles, Star, CheckCircle, Mail, Phone, User, 
  Building, Send, Download, Calendar, MapPin, Users, HelpCircle, 
  ChevronDown, ChevronUp, FileText, ArrowRight, Check, Trophy
} from 'lucide-react';
import { submitForm, fetchSiteConfig } from '../utils/api';

export default function Sponsorship({ onSubmitSuccess, siteConfig }) {
  const eventYear = siteConfig?.eventYear || siteConfig?.eventRegConfig?.eventYear || '2026';
  const [selectedTier, setSelectedTier] = useState('title');
  const [openFaq, setOpenFaq] = useState(null);
  const [config, setConfig] = useState(null);
  
  useEffect(() => {
    fetchSiteConfig().then(data => {
      if (data && data.sponsorshipConfig) {
        setConfig(data.sponsorshipConfig);
      }
    });
  }, []);

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const defaultBenefits = [
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
  ];

  const defaultOpportunities = [
    { title: "Event Sponsorship", desc: "Support the Divine Awards event directly and gain extensive corporate brand exposure on stage and screens." },
    { title: "Program Sponsorship", desc: "Sponsor specific rural welfare and educational development projects that align with your organizational goals." },
    { title: "CSR Collaboration", desc: "Establish long-term structured MoUs for multi-year community upliftment initiatives." },
    { title: "In-Kind Sponsorship", desc: "Provide essential venue support, refreshments, technology aids, hospitality, printing materials, or gifts for honorees." }
  ];

  const defaultPreviousSponsors = [
    { name: "ABC Corporation", role: "Title Sponsor 2025" },
    { name: "XYZ Foundations", role: "Platinum Sponsor 2025" },
    { name: "Zenith Tech", role: "Gold Partner 2024" },
    { name: "Indus Seva Co", role: "Silver Patron 2024" }
  ];

  const defaultTestimonial = {
    quote: "Partnering with Dhara Foundations allowed us to route section 135 CSR funds into verified grassroots projects that delivered measurable impact. The accountability and transparency was exemplary.",
    author: "Shri. R. Ramanathan",
    designation: "VP Corporate Relations, ABC Corp"
  };

  const defaultFaqs = [
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
  ];

  const defaultPackages = [
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
  ];

  const packageStyles = {
    title: { icon: Award, color: 'from-[#D9762E] to-[#F3A712]', borderColor: 'border-[#F3A712]', glowColor: 'rgba(243, 167, 18, 0.2)', bgStyle: 'bg-gradient-to-br from-[#123E36] to-[#052622] text-white', textColor: 'text-white', descColor: 'text-[#D5E5CD]', bulletColor: 'text-[#F3A712]', tag: 'Exclusive Priority' },
    platinum: { icon: Sparkles, color: 'from-[#401C0C] to-[#5C2913]', borderColor: 'border-[#401C0C]', glowColor: 'rgba(16, 185, 129, 0.15)', bgStyle: 'bg-white text-[#1F2318]', textColor: 'text-[#1F2318]', descColor: 'text-neutral-500', bulletColor: 'text-[#401C0C]', tag: 'Premium tier' },
    gold: { icon: Star, color: 'from-yellow-400 to-amber-500', borderColor: 'border-amber-400', glowColor: 'rgba(245, 158, 11, 0.15)', bgStyle: 'bg-white text-[#1F2318]', textColor: 'text-[#1F2318]', descColor: 'text-neutral-500', bulletColor: 'text-amber-500', tag: 'Highly Popular' },
    silver: { icon: Shield, color: 'from-neutral-300 to-neutral-400', borderColor: 'border-neutral-300', glowColor: 'rgba(156, 163, 175, 0.1)', bgStyle: 'bg-white text-[#1F2318]', textColor: 'text-[#1F2318]', descColor: 'text-neutral-500', bulletColor: 'text-neutral-500', tag: 'Core Partner' },
    community: { icon: Users, color: 'from-blue-400 to-indigo-500', borderColor: 'border-blue-200', glowColor: 'rgba(59, 130, 246, 0.08)', bgStyle: 'bg-white text-[#1F2318]', textColor: 'text-[#1F2318]', descColor: 'text-neutral-500', bulletColor: 'text-blue-500', tag: 'Grassroots Supporter' }
  };

  const activeBenefits = config?.benefits || defaultBenefits;
  const activeOpportunities = config?.opportunities || defaultOpportunities;
  const activePreviousSponsors = config?.previousSponsors || defaultPreviousSponsors;
  const activeTestimonial = config?.testimonial || defaultTestimonial;
  const activeFaqs = config?.faqs || defaultFaqs;

  const rawPackages = config?.packages || defaultPackages;
  const packages = rawPackages.map(pkg => ({
    ...pkg,
    ...(packageStyles[pkg.id] || { icon: Award, color: 'from-[#401C0C] to-[#5C2913]', borderColor: 'border-[#401C0C]', glowColor: 'rgba(0,0,0,0.05)', bgStyle: 'bg-white text-[#1F2318]', textColor: 'text-[#1F2318]', descColor: 'text-neutral-500', bulletColor: 'text-[#401C0C]', tag: pkg.tag || 'Sponsor' })
  }));

  const faqs = activeFaqs;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = (resName) => {
    alert(`Downloading ${resName}... (This simulates downloading the event asset)`);
  };

  const handleScrollToForm = () => {
    const element = document.getElementById('sponsorship-inquiry-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactEmail = () => {
    window.location.href = "mailto:partnerships@dharafoundations.org?subject=Inquiry%20Regarding%20Divine%20Awards%20Sponsorship&body=Namaste%20Partnerships%20Team,%0A%0AWe%20are%20interested%20in%20sponsoring%20the%20Divine%20Awards%202025.%20Please%20send%20us%20additional%20branding%20collateral%20and%20availabilities.%0A%0ACompany%20Name:%20%0APreferred%20Package:%20";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    const packageDetails = packages.find(p => p.id === selectedTier);
    const packageName = packageDetails ? `${packageDetails.name} (${packageDetails.amount})` : selectedTier;

    const submission = {
      name: formData.companyName,
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      amount: packageDetails ? parseFloat(packageDetails.amount.replace(/[^0-9]/g, '')) : 50000,
      sponsorshipTier: packageDetails ? packageDetails.name : 'Patron',
      sevaDomain: 'Awards Support',
      isAnonymous: false
    };

    submitForm('Sponsorship', submission);

    onSubmitSuccess({
      title: 'Sponsorship Proposal Received',
      message: `Namaste. Dhara Foundations acknowledges your corporate sponsorship interest for the Divine Awards ${eventYear}. We have logged your request from ${formData.companyName} for the ${packageName}. Our partnerships coordination lead will reach out to Mr./Ms. ${formData.contactPerson} at ${formData.email} to discuss branding integrations and draft the MOU.`,
      details: [
        { label: 'Corporate Entity', value: formData.companyName },
        { label: 'Contact Representative', value: formData.contactPerson },
        { label: 'Sponsorship Level', value: packageName }
      ]
    });
  };

  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* 1. Hero Section with Luxury Overlay */}
      <section style={{ 
        position: 'relative', 
        padding: '80px 20px 40px',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--color-primary-accent-bg, rgba(217, 166, 70, 0.1))',
            border: '2px solid var(--color-saffron-glow)',
            borderRadius: '999px',
            padding: '8px 24px',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(217, 166, 70, 0.15)',
            transform: 'scale(1.05)'
          }}>
            <Trophy className="w-4 h-4 text-[var(--color-primary-accent)]" />
            <span style={{ 
              color: 'var(--color-deep-forest-dark)', 
              fontFamily: 'var(--font-mono)', 
              letterSpacing: '1.5px', 
              fontSize: '13px',
              textTransform: 'uppercase',
              fontWeight: '800'
            }}>
              Divine Awards {eventYear} Partnership
            </span>
          </div>
          
          <h1 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(36px, 5.5vw, 56px)', 
            lineHeight: '1.15', 
            maxWidth: '920px',
            margin: '0 auto 24px',
            fontWeight: 'bold',
            color: '#401C0C'
          }}>
            Partner With Purpose. <br />Sponsor the Divine Awards {eventYear}.
          </h1>
          
          <p style={{ 
            color: 'var(--ink-soft)', 
            fontSize: '18px', 
            maxWidth: '720px', 
            margin: '0 auto 36px',
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
            Align your corporate values with social responsibility and become a catalyst for positive change by partnering with Dhara Foundations.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleScrollToForm} className="btn btn-primary sparkle-shimmer-btn" style={{ padding: '16px 36px', fontSize: '15px' }}>
              Become a Sponsor
            </button>
            <button onClick={handleContactEmail} className="btn btn-secondary" style={{ padding: '16px 30px', background: 'white', border: '1px solid rgba(64, 28, 12, 0.25)', color: '#401C0C' }}>
              Contact Our Team
            </button>
          </div>
        </div>
      </section>

      {/* 2. Why Partner With Us & About Grid */}
      <section className="wrap" style={{ marginTop: '100px' }}>
        <div style={{ display: 'grid', gap: '36px', alignItems: 'start' }} className="grid grid-cols-1 lg:grid-cols-3">
          
          {/* Why Partner */}
          <div>
            <span style={{ color: '#D9762E', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold' }}>Strategic Value</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '36px', marginBottom: '24px', fontWeight: 'bold', marginTop: '6px' }}>
              Why Partner With Us?
            </h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '16px', lineHeight: '1.7', marginBottom: '32px' }}>
              Partnering with Dhara Foundations offers your organization unique opportunities to demonstrate leadership and connect with changemakers:
            </p>
            <ul style={{ display: 'grid', gap: '20px', padding: 0, margin: 0, listStyle: 'none' }}>
              {[
                "Brand visibility among social leaders and changemakers.",
                "Recognition as a socially responsible organization.",
                "Networking opportunities with business leaders, NGOs, and government representatives.",
                "Employee engagement in meaningful initiatives.",
                "Enhanced corporate reputation and community goodwill."
              ].map((benefit, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'start', gap: '14px', fontSize: '14.5px', color: 'var(--ink)' }}>
                  <div style={{ background: '#E6F4EA', padding: '4px', borderRadius: '50%' }}>
                    <Check className="w-4 h-4 text-[#401C0C]" />
                  </div>
                  <span style={{ lineHeight: '1.4' }}>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate Sponsor Image Column */}
          <div className="img-zoom-container hover-lift" style={{ 
            background: '#ffffff', 
            border: '1px solid rgba(217, 203, 176, 0.4)', 
            borderRadius: '32px',
            overflow: 'hidden'
          }}>
            <div style={{ overflow: 'hidden' }}>
              <img 
                src="/images/corporate_sponsors.png" 
                alt="Corporate Sponsors Collaboration" 
                className="w-full h-auto object-cover"
                style={{ display: 'block' }}
              />
            </div>
            <div style={{ padding: '28px' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                Join an Elite Network
              </h4>
              <p style={{ color: 'var(--ink-soft)', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
                Align your brand with local and global leaders at the prestigious Divine Awards {eventYear}.
              </p>
            </div>
          </div>

          {/* About Divine Awards */}
          <div style={{ 
            background: '#ffffff', 
            border: '1px solid rgba(217, 166, 70, 0.25)', 
            boxShadow: '0 20px 40px -15px rgba(64, 28, 12, 0.05)',
            borderRadius: '32px', 
            padding: '40px',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: 0, left: '50px', transform: 'translateY(-50%)', background: '#401C0C', color: '#fff', padding: '6px 20px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold', border: '1px solid rgba(217, 166, 70, 0.3)' }}>
              Honoring Excellence
            </div>
            
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '24px', marginBottom: '16px', fontWeight: 'bold', marginTop: '10px' }}>
              About Divine Awards {eventYear}
            </h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '14.5px', lineHeight: '1.6', marginBottom: '24px' }}>
              The Divine Awards recognize and celebrate outstanding social changemakers making profound impact:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {[
                "Social Change Makers",
                "Educators",
                "Environmental Champions",
                "Women Leaders",
                "Youth Achievers",
                "NGOs & Communities",
                "Healthcare Heroes",
                "Social Impact Entrepreneurs"
              ].map((category, idx) => (
                <div key={idx} style={{ 
                  background: '#FDFBF7', 
                  border: '1px solid rgba(217, 203, 176, 0.35)',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  fontSize: '13.5px',
                  fontWeight: '600',
                  color: '#401C0C',
                  textAlign: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.01)'
                }}>
                  {category}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Sponsorship Benefits Section */}
      <section className="wrap" style={{ marginTop: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: '#D9762E', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold' }}>Branding &amp; Reach</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '36px', marginTop: '6px', fontWeight: 'bold' }}>
            Sponsorship Benefits
          </h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '600px', margin: '12px auto 0', fontSize: '16px', lineHeight: '1.6' }}>
            Maximize corporate returns through focused brand exposure, networking, and stage recognition.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {activeBenefits.map((benefitGroup, idx) => (
            <div key={idx} className="premium-interactive-card" style={{ 
              padding: '36px', 
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ 
                position: 'absolute', top: 0, left: 0, width: '100%', height: '6px', 
                background: idx === 0 ? 'var(--color-saffron-glow)' : idx === 1 ? '#401C0C' : '#D9762E'
              }} />
              
              <h3 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '21px', fontWeight: 'bold', marginBottom: '8px' }}>
                {benefitGroup.title}
              </h3>
              <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', marginBottom: '24px', fontStyle: 'italic', lineHeight: '1.5' }}>
                {benefitGroup.desc}
              </p>
              <ul style={{ display: 'grid', gap: '12px', padding: 0, margin: 0, listStyle: 'none' }}>
                {benefitGroup.items.map((bullet, bIdx) => (
                  <li key={bIdx} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--ink-soft)' }}>
                    <span style={{ color: 'var(--color-saffron-glow-dark)', fontWeight: 'bold' }}>•</span>
                    <span style={{ lineHeight: '1.4' }}>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Sponsorship Packages Premium Grid */}
      <section className="wrap" style={{ marginTop: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: '#D9762E', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold' }}>Pricing Brackets</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '36px', marginTop: '6px', fontWeight: 'bold' }}>
            Sponsorship Packages
          </h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '600px', margin: '12px auto 0', fontSize: '16px', lineHeight: '1.6' }}>
            Select a custom sponsorship bracket. Click any card to select it for the inquiry form below.
          </p>
        </div>

        <div className="sponsor-packages-container">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            const isSelected = selectedTier === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedTier(pkg.id)}
                className={`sponsor-card-col ${pkg.id === 'silver' ? 'sponsor-card-silver' : pkg.id === 'community' ? 'sponsor-card-community' : ''} hover:scale-102 hover:translate-y-[-6px]`}
                style={{ 
                  cursor: 'pointer', 
                  borderRadius: '28px', 
                  background: isSelected ? 'linear-gradient(135deg, #401C0C 0%, #281006 100%)' : '#ffffff', 
                  color: isSelected ? '#ffffff' : '#1F2318',
                  border: isSelected ? '2px solid #F3A712' : '1px solid rgba(217, 203, 176, 0.45)',
                  padding: '36px 32px',
                  boxShadow: isSelected 
                    ? '0 20px 40px -15px rgba(243, 167, 18, 0.3)' 
                    : '0 10px 25px -10px rgba(64, 28, 12, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                {/* Package Tag */}
                <div style={{
                  position: 'absolute', top: '20px', right: '20px',
                  background: isSelected ? 'rgba(243, 167, 18, 0.2)' : 'rgba(0,0,0,0.03)',
                  border: isSelected ? '1px solid rgba(243, 167, 18, 0.3)' : '1px solid rgba(0,0,0,0.05)',
                  padding: '4px 12px', borderRadius: '999px', fontSize: '9px', fontWeight: 'bold',
                  color: isSelected ? '#F9DCA2' : 'var(--ink-soft)', textTransform: 'uppercase'
                }}>
                  {pkg.tag}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', marginTop: '10px' }}>
                    <div style={{ 
                      width: '44px', height: '44px', borderRadius: '12px', 
                      background: isSelected ? 'rgba(255,255,255,0.08)' : pkg.bgColor, 
                      color: isSelected ? '#F3A712' : pkg.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', fontSize: '20px' }}>
                      {pkg.amount}
                    </span>
                  </div>
                  
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                    {pkg.name}
                  </h4>
                  
                  <p style={{ 
                    color: isSelected ? '#D5E5CD' : 'var(--ink-soft)', 
                    fontSize: '13.5px', 
                    lineHeight: '1.5', 
                    marginBottom: '24px' 
                  }}>
                    {pkg.description}
                  </p>
                </div>

                <div style={{ borderTop: isSelected ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)', paddingTop: '20px' }}>
                  <ul style={{ display: 'grid', gap: '10px', padding: 0, margin: '0 0 24px', listStyle: 'none' }}>
                    {pkg.benefits.map((benefit, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '6px', fontSize: '12.5px' }}>
                        <span style={{ color: isSelected ? '#F3A712' : 'var(--color-saffron-glow-dark)', fontWeight: 'bold' }}>✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div style={{ 
                    padding: '12px', 
                    borderRadius: '12px', 
                    textAlign: 'center', 
                    fontSize: '13px', 
                    fontWeight: 'bold',
                    background: isSelected ? '#F3A712' : 'rgba(64, 28, 12, 0.04)',
                    color: isSelected ? '#052622' : '#401C0C',
                    transition: 'all 0.2s'
                  }}>
                    {isSelected ? 'Selected' : 'Select Package'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Partnership Models & In-Kind Support */}
      <section className="wrap" style={{ marginTop: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: '#D9762E', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold' }}>Collaboration Ways</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '32px', marginTop: '6px', fontWeight: 'bold' }}>
            Partnership & Sponsorship Opportunities
          </h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '580px', margin: '12px auto 0', fontSize: '15px' }}>
            We offer various pathways to align resources, whether through structured event support, long-term programs, or material sponsorships.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {activeOpportunities.map((opp, idx) => (
            <div key={idx} style={{ 
              padding: '30px', 
              borderRadius: '24px', 
              border: '1px solid rgba(217, 203, 176, 0.4)', 
              background: '#ffffff',
              boxShadow: '0 10px 25px -10px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
                  {opp.title}
                </h4>
                <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', lineHeight: '1.5', margin: 0 }}>
                  {opp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Event Highlights Details Row */}
      <section style={{ 
        background: '#401C0C', 
        color: '#fff', 
        padding: '60px 20px', 
        marginTop: '100px',
        borderTop: '1.5px solid var(--color-saffron-glow)',
        borderBottom: '1.5px solid var(--color-saffron-glow)'
      }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
          {[
            { icon: Calendar, title: "Date", info: "January 24, 2025" },
            { icon: MapPin, title: "Venue", info: "Alwarpet, Chennai, TN" },
            { icon: Users, title: "Expected Attendees", info: "500+ Leaders" },
            { icon: Award, title: "Award Categories", info: "20+ Categories" }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ color: '#F3A712', marginBottom: '12px' }}>
                  <Icon className="w-7 h-7" />
                </div>
                <strong style={{ fontSize: '11px', textTransform: 'uppercase', color: '#D5E5CD', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
                  {item.title}
                </strong>
                <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '6px 0 0' }}>
                  {item.info}
                </p>
              </div>
            );
          })}
        </div>
      </section>



      {/* 8. Sponsorship Process Timeline with Chevron Design */}
      <section style={{ background: '#FAF8F4', padding: '80px 20px', marginTop: '100px', borderTop: '1px solid rgba(0,0,0,0.03)' }}>
        <div className="wrap text-center">
          <span style={{ color: '#D9762E', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold' }}>How it works</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '36px', marginBottom: '50px', marginTop: '6px', fontWeight: 'bold' }}>
            Sponsorship Process
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(6, 1fr)', 
            gap: '16px',
          }} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
            {[
              "Submit Inquiry",
              "Discuss Opportunities",
              "Choose Package",
              "Agreement Confirmation",
              "Branding & Event Participation",
              "Post-Event Recognition"
            ].map((step, idx) => (
              <div key={idx} style={{ 
                padding: '24px 20px', 
                borderRadius: '20px', 
                background: '#fff',
                border: '1px solid rgba(217, 203, 176, 0.45)',
                boxShadow: '0 8px 16px -8px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}>
                <div style={{ 
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: '#401C0C', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 'bold', fontFamily: 'var(--font-mono)',
                  marginBottom: '12px'
                }}>
                  0{idx + 1}
                </div>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#052622', lineHeight: '1.3' }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Past Partners & Testimonials */}
      <section style={{ background: '#FAF8F4', padding: '100px 20px', borderTop: '1px solid rgba(0,0,0,0.03)' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: '#D9762E', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold' }}>Our Network</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '36px', marginTop: '6px', fontWeight: 'bold' }}>
              Previous Partners & Sponsors
            </h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '580px', margin: '12px auto 0', fontSize: '15px' }}>
              We are honored to have partnered with leading organizations that make civic progress possible.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.1fr 0.9fr', 
            gap: '48px',
            alignItems: 'center'
          }} className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Logos Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {activePreviousSponsors.map((partner, idx) => (
                <div key={idx} style={{ 
                  background: '#fff', 
                  border: '1px solid rgba(217, 203, 176, 0.35)', 
                  borderRadius: '20px', 
                  padding: '28px',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '17px', color: '#401C0C', marginBottom: '6px' }}>{partner.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-saffron-glow-dark)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{partner.role}</div>
                </div>
              ))}
            </div>

            {/* Testimonial Quote */}
            <div style={{ 
              background: '#fff', 
              border: '1px solid rgba(217, 166, 70, 0.3)', 
              borderRadius: '28px', 
              padding: '40px',
              position: 'relative',
              boxShadow: '0 15px 30px -10px rgba(64, 28, 12,0.05)'
            }}>
              <span style={{ fontSize: '72px', color: 'rgba(217, 166, 70, 0.2)', position: 'absolute', left: '24px', top: '10px', lineHeight: 1 }}>“</span>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <p style={{ fontStyle: 'italic', color: 'var(--ink)', fontSize: '16.5px', lineHeight: '1.65', marginBottom: '24px' }}>
                  "{activeTestimonial.quote}"
                </p>
                <h5 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#401C0C' }}>
                  — {activeTestimonial.author} {activeTestimonial.designation ? `, ${activeTestimonial.designation}` : ''}
                </h5>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Frequently Asked Questions accordion */}
      <section className="wrap" style={{ marginTop: '100px', maxWidth: '800px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '32px', textAlign: 'center', marginBottom: '40px', fontWeight: 'bold' }}>
          Frequently Asked Questions
        </h2>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                style={{ 
                  background: '#fff', 
                  border: isOpen ? '1.5px solid var(--color-saffron-glow)' : '1px solid rgba(217, 203, 176, 0.4)', 
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: isOpen ? '0 10px 20px -10px rgba(64, 28, 12,0.05)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <div 
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{ 
                    padding: '22px 28px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: '#401C0C',
                    fontSize: '16px'
                  }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </div>
                {isOpen && (
                  <div style={{ 
                    padding: '0 28px 24px', 
                    fontSize: '14.5px', 
                    color: 'var(--ink-soft)', 
                    lineHeight: '1.65',
                    borderTop: '1px solid rgba(0,0,0,0.04)'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. B2B Inquiry Form & Contact Info Section */}
      <section id="sponsorship-inquiry-form" className="wrap" style={{ marginTop: '100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: '60px', alignItems: 'start' }} className="grid grid-cols-1 lg:grid-cols-3">
          
          {/* Inquiry Form */}
          <div style={{ 
            background: '#ffffff', 
            borderRadius: '32px', 
            border: '1.5px solid rgba(217, 203, 176, 0.45)', 
            boxShadow: '0 25px 50px -12px rgba(64, 28, 12, 0.05)',
            padding: '48px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '20px', marginBottom: '28px' }}>
              <Building className="text-amber-500 w-6 h-6" />
              <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#401C0C', fontFamily: 'var(--font-serif)' }}>
                Sponsorship Inquiry Form
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" style={{ display: 'grid', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Company Name *</label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                    <input
                      type="text"
                      name="companyName"
                      required
                      placeholder="e.g. ABC Technologies"
                      value={formData.companyName}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contact Person *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                    <input
                      type="text"
                      name="contactPerson"
                      required
                      placeholder="e.g. Ms. Priya Nair"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Designation *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                    <input
                      type="text"
                      name="designation"
                      required
                      placeholder="e.g. CSR & PR Lead"
                      value={formData.designation}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Preferred Package</label>
                  <select
                    name="selectedTier"
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                  >
                    <option value="title">Title Sponsor (₹5,00,000+)</option>
                    <option value="platinum">Platinum Sponsor (₹2,50,000+)</option>
                    <option value="gold">Gold Sponsor (₹1,00,000+)</option>
                    <option value="silver">Silver Sponsor (₹50,000+)</option>
                    <option value="community">Community Sponsor (₹25,000+)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. priya.nair@abctech.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sponsorship Interest / Specific Goals</label>
                <input
                  type="text"
                  name="interest"
                  placeholder="e.g. Interested in Title branding, or category sponsorship for Women Leaders..."
                  value={formData.interest}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Message *</label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="Share details regarding your brand integration preferences, timeline, or requests..."
                  value={formData.message}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px', resize: 'vertical' }}
                ></textarea>
              </div>

              <div style={{ paddingTop: '10px' }}>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-saffron-glow)] to-[var(--color-saffron-glow-dark)] text-[#281006] hover:brightness-105 font-sans font-bold text-base transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 border-2 border-transparent hover:border-[#281006] cursor-pointer group shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', width: '100%', cursor: 'pointer' }}
                >
                  <span>Become a Sponsor</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-6" style={{ display: 'grid', gap: '24px' }}>
            <div style={{ 
              background: '#fff',
              border: '1.5px solid rgba(217, 203, 176, 0.45)',
              borderRadius: '28px',
              padding: '36px',
              boxShadow: '0 15px 30px -10px rgba(0,0,0,0.02)'
            }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>
                Corporate Partnerships Team
              </h3>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" style={{ marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '11px', color: 'var(--ink-soft)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Email Address:</strong>
                    <a href="mailto:partnerships@dharafoundations.org" style={{ display: 'block', fontSize: '14.5px', color: '#401C0C', fontWeight: '600', textDecoration: 'none' }}>
                      partnerships@dharafoundations.org
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" style={{ marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '11px', color: 'var(--ink-soft)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Phone Support:</strong>
                    <a href="tel:+919876543210" style={{ display: 'block', fontSize: '14.5px', color: '#401C0C', fontWeight: '600', textDecoration: 'none' }}>
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <Building className="w-5 h-5 text-amber-500 flex-shrink-0" style={{ marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '11px', color: 'var(--ink-soft)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Registered Office:</strong>
                    <p style={{ margin: '4px 0 0', fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: '1.45' }}>
                      Dhara Foundations,<br />
                      # 44A, 3rd Street, Judge Colony, Tambaram Sanatorium,<br />
                      Chennai, Tamil Nadu - 600047
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 12. Final Call to Action Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #401C0C 0%, #281006 100%)',
        color: '#fff',
        padding: '100px 20px',
        textAlign: 'center',
        marginTop: '100px',
        borderTop: '1.5px solid var(--color-saffron-glow)'
      }}>
        <div className="wrap">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 'bold', marginBottom: '20px', color: '#ffffff' }}>
            Together, We Can Celebrate Excellence and Inspire Change.
          </h2>
          <p style={{ color: '#D5E5CD', fontSize: '18px', maxWidth: '720px', margin: '0 auto 40px', lineHeight: '1.6' }}>
            Join Dhara Foundations as a sponsor of the Divine Awards 2025 and make a lasting impact on communities while showcasing your organization's commitment to social responsibility.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleScrollToForm} className="btn btn-primary sparkle-shimmer-btn" style={{ padding: '16px 36px' }}>
              Become a Sponsor
            </button>
            <button onClick={handleContactEmail} className="btn btn-light" style={{ padding: '16px 30px' }}>
              Contact Us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

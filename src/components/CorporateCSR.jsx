import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Building, ShieldCheck, Mail, Phone, User, Landmark, 
  HelpCircle, ArrowRight, CheckCircle, FileText, Download, Calendar, 
  Check, BookOpen, Sprout, Globe, Activity, Award, Star, ChevronDown, 
  ChevronUp, ShieldAlert, Award as AwardIcon, Users
} from 'lucide-react';
import { submitForm, fetchSiteConfig } from '../utils/api';

export default function CorporateCSR({ onSubmitSuccess, siteConfig }) {
  const eventYear = siteConfig?.eventYear || siteConfig?.eventRegConfig?.eventYear || '2026';
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    primarySector: 'education',
    budgetBracket: '5-10',
    message: ''
  });

  const [openFaq, setOpenFaq] = useState(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [config, setConfig] = useState(null);
  
  useEffect(() => {
    fetchSiteConfig().then(data => {
      if (data && data.csrConfig) {
        setConfig(data.csrConfig);
      }
    });
  }, []);

  const defaultWhyPartner = [
    { title: "Trusted Implementation Partner", desc: "Proven track record of executing grassroot social welfare drives with end-to-end management." },
    { title: "Transparent Fund Utilization", desc: "Rigorous accounting audits, clear visual dashboards, and quarterly progress disclosures." },
    { title: "Compliance with CSR Regulations", desc: "100% compliant with Section 135 rules, holding CSR-1, 12A, and 80G registrations." },
    { title: "Experienced Project Management", desc: "Professional implementation team executing, monitoring, and scaling project milestones." },
    { title: "Measurable Social Impact", desc: "Data-driven results and impact certificates showing clear improvement in community welfare." },
    { title: "Regular Progress Reports", desc: "Timely delivery of compliance utilization certificates, field audit sheets, and media packages." }
  ];

  const defaultCsrProcess = [
    "Consultation",
    "Requirement Analysis",
    "Project Planning",
    "Implementation",
    "Monitoring & Evaluation",
    "Impact Reporting"
  ];

  const defaultPartnershipModels = [
    { title: "Project-Based Partnership", desc: "Fund a specific social initiative or infrastructure development project matching your geographical goals." },
    { title: "Long-Term Strategic Partnership", desc: "Form multi-year CSR collaborations to adopt schools, care facilities, or villages for continuous upliftment." },
    { title: "Employee Engagement Programs", desc: "Coordinate hands-on volunteer activities, tree plantation campaigns, and community service days for staff." },
    { title: "Sponsorship Partnership", desc: "Directly sponsor existing educational kits, clean energy packs, and emergency healthcare drives." }
  ];

  const defaultComplianceHub = {
    docs: [
      "CSR-1 Registration Number",
      "12A Certificate",
      "80G Certificate",
      "PAN Card",
      "Annual Reports",
      "Audited Financial Statements"
    ],
    downloads: [
      { name: "CSR Brochure (PDF)", size: "4.2 MB" },
      { name: "Annual Report 2024-25", size: "6.8 MB" },
      { name: "Financial Audit Statements", size: "3.1 MB" },
      { name: "Impact Statistics summary", size: "1.9 MB" }
    ]
  };

  const defaultCaseStudies = [
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
  ];

  const defaultCorporatePartners = [
    { name: "ABC Company", duration: "Partner since 2024", collab: "Vidya School digitisation" },
    { name: "XYZ Corporation", duration: "Partner since 2025", collab: "Prakriti Tree Planting" },
    { name: "Dhara Tech Solutions", duration: "Partner since 2023", collab: "Rural Healthcare Drives" },
    { name: "Southern Enterprises", duration: "Partner since 2025", collab: "Community Water Desilting" }
  ];

  const defaultTestimonial = {
    quote: "Dhara Foundations has been an excellent CSR implementation partner, delivering measurable impact and maintaining complete transparency.",
    author: "CSR Head, ABC Company"
  };

  const activeWhyPartner = config?.whyPartner || defaultWhyPartner;
  const activeCsrProcess = config?.csrProcess || defaultCsrProcess;
  const activePartnershipModels = config?.partnershipModels || defaultPartnershipModels;
  const activeComplianceHub = config?.complianceHub || defaultComplianceHub;
  const caseStudies = config?.caseStudies || defaultCaseStudies;
  const activeCorporatePartners = config?.corporatePartners || defaultCorporatePartners;
  const activeTestimonial = config?.testimonial || defaultTestimonial;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = (docName) => {
    alert(`Downloading ${docName}... (This simulates downloading the document asset)`);
  };

  const handleScheduleMeeting = () => {
    window.location.href = "mailto:csr@dharafoundations.org?subject=Request%20for%20CSR%20Partnership%20Meeting&body=Namaste%20Dhara%20CSR%20Team,%0A%0AWe%20are%20interested%20in%20exploring%20CSR%20collaboration%20opportunities%20with%20Dhara%20Foundations.%20Please%20suggest%20a%20few%20time%20slots%20for%20an%20introductory%20meeting.%0A%0ACompany%20Name:%20%0AContact%20Person:%20%0APhone:%20";
  };

  const handleScrollToForm = () => {
    const element = document.getElementById('csr-inquiry-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    const budgetText = {
      '5-10': '₹5 Lakhs – ₹10 Lakhs',
      '10-25': '₹10 Lakhs – ₹25 Lakhs',
      '25-50': '₹25 Lakhs – ₹50 Lakhs',
      '50plus': '₹50 Lakhs +'
    }[formData.budgetBracket];

    const submission = {
      name: formData.companyName,
      contactPerson: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      amount: formData.budgetBracket === '5-10' ? 500000 : formData.budgetBracket === '10-25' ? 1000000 : formData.budgetBracket === '25-50' ? 2500000 : 5000000,
      sponsorshipTier: 'Patron',
      sevaDomain: 'Awards Support',
      isAnonymous: false,
      pan: formData.companyPan || '',
      notes: `CIN: ${formData.cinNumber || 'N/A'}. Sector: ${formData.primarySector}. Message: ${formData.message}`
    };

    submitForm('Corporate CSR', submission);

    onSubmitSuccess({
      title: 'CSR Partnership Initiated',
      message: `Namaste. Dhara Foundations acknowledges your corporate CSR inquiry. We have successfully registered your company, ${formData.companyName}, with a primary focus in ${formData.primarySector.toUpperCase()} and budget range of ${budgetText}. Our dedicated CSR officer will contact you at ${formData.email} or ${formData.phone} within 24 hours to schedule a consultation and share detailed compliance reports.`,
      details: [
        { label: 'Company', value: formData.companyName },
        { label: 'Representative', value: formData.contactName },
        { label: 'Priority Domain', value: formData.primarySector.toUpperCase() }
      ]
    });
  };



  const faqs = [
    {
      q: "Is Dhara Foundations eligible for CSR funding?",
      a: "Yes. Dhara Foundations complies with all Ministry of Corporate Affairs regulations. We are registered under MCA with CSR-1 Registration Number CSR00034928 and hold valid 12A & 80G certifications."
    },
    {
      q: "Do you provide utilization certificates?",
      a: "Absolutely. We provide Form 10BD tax receipts, project completion statements, and audited utilization certificates within the designated timelines."
    },
    {
      q: "Can projects be customized?",
      a: "Yes. We work closely with our corporate partners to customize and align project parameters to match your specific CSR guidelines, geography preferences, and impact goals."
    },
    {
      q: "Do you provide impact reports?",
      a: "Yes. We provide complete transparency with quarterly milestone updates, detailed physical monitoring sheets, high-resolution beneficiary testimonials, and third-party audit reports."
    }
  ];

  return (
    <div style={{ background: 'var(--color-warm-cream)', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* 1. Hero Section */}
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
            <Briefcase className="w-4 h-4 text-[var(--color-primary-accent)]" />
            <span style={{ 
              color: 'var(--color-deep-forest-dark)', 
              fontFamily: 'var(--font-mono)', 
              letterSpacing: '1.5px', 
              fontSize: '13px',
              textTransform: 'uppercase',
              fontWeight: '800'
            }}>
              Corporate Social Responsibility
            </span>
          </div>

          <h1 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(32px, 5vw, 52px)', 
            lineHeight: '1.15', 
            maxWidth: '850px',
            margin: '0 auto 12px',
            fontWeight: '600',
            color: 'var(--color-deep-forest-dark)'
          }}>
            Empowering Communities Through Meaningful CSR Partnerships
          </h1>
          <p style={{
            fontStyle: 'italic',
            color: 'var(--color-primary-accent)',
            fontSize: '20px',
            fontWeight: '500',
            margin: '0 auto 24px',
            maxWidth: '680px',
            fontFamily: 'var(--font-serif)'
          }}>
            "Let's Build Sustainable Change Together"
          </p>
          <p style={{ 
            color: 'var(--ink-soft)', 
            fontSize: '18px', 
            maxWidth: '680px', 
            margin: '0 auto 36px',
            lineHeight: '1.6'
          }}>
            Partner with Dhara Foundations to create sustainable impact in education, rural development, environmental conservation, and social welfare.
          </p>
          
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleScrollToForm} className="btn btn-primary sparkle-shimmer-btn">
              Become a CSR Partner
            </button>
            <button onClick={handleScheduleMeeting} className="btn btn-secondary" style={{ background: 'white', border: '1px solid rgba(64, 28, 12, 0.25)', color: '#401C0C', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Calendar className="w-4 h-4" />
              Schedule a Meeting
            </button>
            <button onClick={() => handleDownload('CSR Brochure')} className="btn btn-secondary" style={{ background: 'white', border: '1px solid rgba(64, 28, 12, 0.25)', color: '#401C0C', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Download className="w-4 h-4" />
              Download CSR Brochure
            </button>
          </div>
        </div>
      </section>

      {/* 2. Why Partner With Us & Our Strengths */}
      <section className="wrap" style={{ marginTop: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'start' }} className="grid grid-cols-1 lg:grid-cols-3">
          
          {/* Why Partner Grid */}
          <div className="lg:col-span-2">
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '32px', marginBottom: '32px' }}>
              Why Partner With Us?
            </h2>
            
            <div style={{ display: 'grid', gap: '24px' }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {activeWhyPartner.map((item, idx) => (
                <div key={idx} className="premium-interactive-card" style={{ padding: '24px' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '17px', fontWeight: 'bold', marginBottom: '8px' }}>
                    {item.title}
                  </h4>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', lineHeight: '1.5' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Strengths Sidebar */}
          <div className="glassmorphism-card overflow-hidden hover-lift" style={{ 
            background: 'linear-gradient(135deg, rgba(64, 28, 12, 0.05) 0%, rgba(64, 28, 12, 0.01) 100%)',
            border: '1.5px solid rgba(217, 203, 176, 0.5)',
            borderRadius: '24px',
            padding: '0 0 32px 0'
          }}>
            <div className="img-zoom-container">
              <img 
                src="/images/csr_impact.png" 
                alt="CSR Impact Digital Classroom" 
                className="w-full h-48 object-cover"
                style={{ display: 'block', marginBottom: '24px' }}
              />
            </div>
            <div style={{ padding: '0 32px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '22px', fontWeight: 'bold', marginBottom: '24px' }}>
                Our Strengths
              </h3>
              <ul style={{ display: 'grid', gap: '18px', padding: 0, margin: 0, listStyle: 'none' }}>
                {[
                  "Government-compliant CSR projects",
                  "PAN, 12A, and 80G certifications",
                  "Dedicated project management team",
                  "Impact assessment and reporting",
                  "Sustainable community development approach"
                ].map((strength, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'start', gap: '12px', fontSize: '14.5px', color: 'var(--color-deep-forest-dark)', fontWeight: '500' }}>
                    <CheckCircle className="w-5 h-5 text-[#401C0C] flex-shrink-0" style={{ marginTop: '2px' }} />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>
      </section>

      {/* 3. Visual Stats Counters Row */}
      <section style={{ 
        background: 'var(--color-deep-forest)', 
        color: '#fff', 
        padding: '50px 20px', 
        marginTop: '80px',
        borderTop: '1.5px solid var(--color-saffron-glow)',
        borderBottom: '1.5px solid var(--color-saffron-glow)'
      }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px', textAlign: 'center' }}>
          {[
            { num: "10,000+", label: "Lives Impacted" },
            { num: "50+", label: "Villages Reached" },
            { num: "5,000+", label: "Trees Planted" },
            { num: "1,000+", label: "Students Supported" },
            { num: "30+", label: "CSR Projects Completed" }
          ].map((stat, idx) => (
            <div key={idx}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-saffron-glow)', fontSize: '40px', fontWeight: 'bold', margin: '0 0 6px' }}>
                {stat.num}
              </h3>
              <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: '#D5E5CD', margin: 0 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CSR Focus Areas */}
      <section className="wrap" style={{ marginTop: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '32px' }}>
            CSR Focus Areas
          </h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '580px', margin: '10px auto 0' }}>
            Explore targeted fields where our corporate collaborators can direct compliance funds for sustainable outcomes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '28px' }}>
          {[
            {
              icon: BookOpen,
              title: "Education",
              colorBg: 'rgba(240, 194, 102, 0.1)',
              colorText: 'var(--color-saffron-glow-dark)',
              items: ["Digital classrooms in rural schools", "Scholarships for underprivileged students", "School infrastructure restoration", "Skill development programs", "Computer literacy training"]
            },
            {
              icon: Sprout,
              title: "Environment",
              colorBg: 'rgba(63, 140, 74, 0.1)',
              colorText: '#3F8C4A',
              items: ["Tree plantation & afforestation drives", "Rainwater harvesting & water conservation", "Community waste management sites", "Renewable energy & solar installation", "Climate action campaigns"]
            },
            {
              icon: Globe,
              title: "Rural Development",
              colorBg: 'rgba(64, 28, 12, 0.1)',
              colorText: 'var(--color-primary-accent)',
              items: ["Village road & infrastructure works", "Sanitation & clean hygiene programs", "Women's self-help & tailoring groups", "Livelihood generation programs", "Community health centers & services"]
            },
            {
              icon: Activity,
              title: "Healthcare",
              colorBg: 'rgba(239, 68, 68, 0.1)',
              colorText: '#EF4444',
              items: ["Free rural diagnostic & medical camps", "Health & hygiene awareness drives", "Voluntary blood donation drives", "Child & mother nutrition distribution", "Medical support for government homes"]
            }
          ].map((area, idx) => {
            const Icon = area.icon;
            return (
              <div key={idx} className="glassmorphism-card" style={{ padding: '32px', borderRadius: '24px', background: '#fff', border: '1px solid rgba(217,203,176,0.4)' }}>
                <div style={{ 
                  width: '48px', height: '48px', borderRadius: '12px', 
                  background: area.colorBg, color: area.colorText,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                  {area.title}
                </h3>
                <ul style={{ display: 'grid', gap: '10px', padding: 0, margin: 0, listStyle: 'none' }}>
                  {area.items.map((bullet, bIdx) => (
                    <li key={bIdx} style={{ display: 'flex', gap: '8px', fontSize: '13.5px', color: 'var(--ink-soft)' }}>
                      <span style={{ color: area.colorText, fontWeight: 'bold' }}>•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Our CSR Process Timeline */}
      <section style={{ background: 'rgba(64, 28, 12, 0.03)', padding: '80px 20px', marginTop: '80px' }}>
        <div className="wrap text-center">
          <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '32px', marginBottom: '50px' }}>
            Our CSR Process
          </h2>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '20px',
            position: 'relative'
          }} className="flex-col md:flex-row">
            {activeCsrProcess.map((step, idx, arr) => (
              <React.Fragment key={idx}>
                <div className="glassmorphism-card" style={{ 
                  padding: '20px 30px', 
                  borderRadius: '16px', 
                  background: '#fff',
                  border: '1px solid rgba(217,203,176,0.5)',
                  boxShadow: '0 8px 16px -8px rgba(0,0,0,0.1)',
                  fontWeight: '600',
                  color: 'var(--color-deep-forest-dark)',
                  flex: '1',
                  minWidth: '180px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-saffron-glow-dark)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                    STEP 0{idx + 1}
                  </div>
                  {step}
                </div>
                {idx < arr.length - 1 && (
                  <div style={{ color: 'var(--color-saffron-glow-dark)', fontWeight: 'bold', fontSize: '20px' }} className="hidden md:block">
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Partnership Models */}
      <section className="wrap" style={{ marginTop: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '32px' }}>
            Partnership Models
          </h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '580px', margin: '10px auto 0' }}>
            Choose how your company wishes to align resources to create structural progress.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '24px' }}>
          {activePartnershipModels.map((model, idx) => (
            <div key={idx} className="glassmorphism-card" style={{ padding: '28px', borderRadius: '20px', border: '1px solid rgba(217,203,176,0.35)', background: '#fff' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                {model.title}
              </h4>
              <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', lineHeight: '1.5' }}>
                {model.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Compliance & Documentation Hub */}
      <section className="wrap" style={{ marginTop: '80px' }}>
        <div style={{ 
          background: '#fff', 
          border: '1.5px solid rgba(217,203,176,0.5)', 
          borderRadius: '28px', 
          padding: '40px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '40px',
          alignItems: 'center'
        }} className="grid grid-cols-1 md:grid-cols-2">
          
          <div>
            <span style={{ 
              color: 'var(--color-saffron-glow-dark)', 
              fontFamily: 'var(--font-mono)', 
              letterSpacing: '1px', 
              fontSize: '11px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '8px'
            }}>
              Corporate Compliance
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '28px', marginBottom: '16px', fontWeight: 'bold' }}>
              Compliance & Documentation Hub
            </h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '14.5px', lineHeight: '1.6', marginBottom: '24px' }}>
              We maintain absolute transparency. Access our registration certificates, annual impact reviews, and audited financial statements.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {activeComplianceHub.docs.map((doc, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-deep-forest-dark)' }}>
                  <Check className="w-4 h-4 text-[#401C0C] flex-shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ 
            background: 'var(--color-card-cream)', 
            borderRadius: '20px', 
            padding: '30px', 
            border: '1px solid rgba(217,203,176,0.3)'
          }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '17px', fontWeight: 'bold', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Download className="w-5 h-5 text-amber-600" />
              Download Section
            </h4>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              {activeComplianceHub.downloads.map((file, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleDownload(file.name)}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '14px 18px', 
                    background: '#fff', 
                    borderRadius: '12px', 
                    cursor: 'pointer',
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'all 0.2s'
                  }}
                  className="hover:translate-x-1 hover:border-amber-400"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText className="w-4 h-4 text-neutral-400" />
                    <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--ink)' }}>{file.name}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--ink-soft)', fontFamily: 'var(--font-mono)' }}>{file.size}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. Success Stories / Case Studies */}
      <section className="wrap" style={{ marginTop: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '32px' }}>
            Success Stories & Case Studies
          </h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '580px', margin: '10px auto 0' }}>
            Read detailed reports of our executed projects showing the before-and-after results of corporate funding.
          </p>
        </div>

        <div className="glassmorphism-card grid grid-cols-1 md:grid-cols-2" style={{ 
          background: '#fff', 
          border: '1.5px solid rgba(217,203,176,0.45)', 
          borderRadius: '28px', 
          padding: '40px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '40px'
        }}>
          
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {caseStudies.map((cs, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCaseStudy(idx)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '999px',
                    background: activeCaseStudy === idx ? 'var(--color-deep-forest)' : 'rgba(0,0,0,0.04)',
                    color: activeCaseStudy === idx ? '#fff' : 'var(--ink-soft)',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Case Study {idx + 1}
                </button>
              ))}
            </div>
            
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
              {caseStudies[activeCaseStudy].title}
            </h3>
            
            <div style={{ display: 'grid', gap: '14px' }}>
              <div>
                <strong style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--color-saffron-glow-dark)', fontFamily: 'var(--font-mono)' }}>Problem Statement:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--ink-soft)', lineHeight: '1.5' }}>{caseStudies[activeCaseStudy].problem}</p>
              </div>
              <div>
                <strong style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--color-primary-accent)', fontFamily: 'var(--font-mono)' }}>Solution Implemented:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--ink-soft)', lineHeight: '1.5' }}>{caseStudies[activeCaseStudy].solution}</p>
              </div>
              <div>
                <strong style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--color-deep-forest)', fontFamily: 'var(--font-mono)' }}>Results Achieved:</strong>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--ink-soft)', lineHeight: '1.5' }}>{caseStudies[activeCaseStudy].results}</p>
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'var(--color-card-cream)', 
            borderRadius: '24px', 
            padding: '30px', 
            border: '1px solid rgba(217,203,176,0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-saffron-glow-dark)', marginBottom: '16px' }}>
                <Star className="w-5 h-5 fill-current" />
                <span style={{ fontSize: '11px', fontWeight: 'bold', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px' }}>Impact Testimony</span>
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--ink)', fontSize: '15px', lineHeight: '1.6', margin: '0 0 20px' }}>
                "{caseStudies[activeCaseStudy].quote}"
              </p>
            </div>
            <div>
              <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: 'var(--color-deep-forest-dark)' }}>
                {caseStudies[activeCaseStudy].author}
              </h5>
              <span style={{ fontSize: '11px', color: 'var(--ink-soft)' }}>
                Beneficiaries: {caseStudies[activeCaseStudy].beneficiaries}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 9. Our Corporate Partners & Testimonials */}
      <section style={{ background: 'rgba(64, 28, 12, 0.02)', padding: '80px 20px', marginTop: '80px' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '32px' }}>
              Our Corporate Partners
            </h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '580px', margin: '10px auto 0' }}>
              Join hands with leading companies that trust Dhara Foundations to translate CSR mandates into grassroot realities.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '40px',
            alignItems: 'center'
          }} className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Logos Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {activeCorporatePartners.map((partner, idx) => (
                <div key={idx} style={{ 
                  background: '#fff', 
                  border: '1px solid rgba(0,0,0,0.06)', 
                  borderRadius: '16px', 
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'var(--color-deep-forest)', marginBottom: '6px' }}>{partner.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-saffron-glow-dark)', fontWeight: '600' }}>{partner.duration}</div>
                  <div style={{ fontSize: '10px', color: 'var(--ink-soft)', marginTop: '4px' }}>{partner.collab}</div>
                </div>
              ))}
            </div>

            {/* Testimonial Quote */}
            <div style={{ 
              background: '#fff', 
              border: '1.5px solid rgba(217,203,176,0.45)', 
              borderRadius: '24px', 
              padding: '36px',
              position: 'relative'
            }}>
              <span style={{ fontSize: '60px', color: 'rgba(240, 194, 102, 0.25)', position: 'absolute', left: '20px', top: '10px', lineHeight: 1 }}>“</span>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <p style={{ fontStyle: 'italic', color: 'var(--ink)', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                  "{activeTestimonial.quote}"
                </p>
                <h5 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: 'var(--color-deep-forest-dark)' }}>
                  – {activeTestimonial.author}
                </h5>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Frequently Asked Questions */}
      <section className="wrap" style={{ marginTop: '80px', maxWidth: '800px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '32px', textAlign: 'center', marginBottom: '40px' }}>
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
                  border: '1.5px solid rgba(217,203,176,0.4)', 
                  borderRadius: '16px',
                  overflow: 'hidden'
                }}
              >
                <div 
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{ 
                    padding: '20px 24px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: 'var(--color-deep-forest-dark)',
                    fontSize: '15.5px'
                  }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                </div>
                {isOpen && (
                  <div style={{ 
                    padding: '0 24px 20px', 
                    fontSize: '14.5px', 
                    color: 'var(--ink-soft)', 
                    lineHeight: '1.6',
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

      {/* 11. Intake Form & Contact Info Section */}
      <section id="csr-inquiry-form" className="wrap" style={{ marginTop: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'start' }} className="grid grid-cols-1 lg:grid-cols-3">
          
          {/* Intake Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-neutral-100 shadow-premium p-8">
            <div className="flex items-center space-x-3 mb-6 border-b border-neutral-100 pb-4" style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '16px' }}>
              <Briefcase className="text-amber-500 w-6 h-6" />
              <h3 className="text-xl font-serif text-forest-teal-dark" style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: 'var(--color-deep-forest-dark)' }}>
                CSR Inquiry Form
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" style={{ display: 'grid', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', uppercase: true, color: 'var(--color-deep-forest)', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Company Name *</label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                    <input
                      type="text"
                      name="companyName"
                      required
                      placeholder="e.g. Acme Corp India"
                      value={formData.companyName}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', uppercase: true, color: 'var(--color-deep-forest)', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contact Person *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                    <input
                      type="text"
                      name="contactName"
                      required
                      placeholder="e.g. Mr. Rajesh Kumar"
                      value={formData.contactName}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', uppercase: true, color: 'var(--color-deep-forest)', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. rajesh@acme.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', uppercase: true, color: 'var(--color-deep-forest)', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone Number *</label>
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', uppercase: true, color: 'var(--color-deep-forest)', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CSR Focus Area</label>
                  <select
                    name="primarySector"
                    value={formData.primarySector}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                  >
                    <option value="education">Education & Computer Literacy</option>
                    <option value="environment">Environmental Conservation & Plantation</option>
                    <option value="rural">Rural Sanitation & Livelihood</option>
                    <option value="healthcare">Healthcare Campaigns & Camps</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', uppercase: true, color: 'var(--color-deep-forest)', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Budget Range (Annual)</label>
                  <select
                    name="budgetBracket"
                    value={formData.budgetBracket}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                  >
                    <option value="5-10">₹5 Lakhs – ₹10 Lakhs</option>
                    <option value="10-25">₹10 Lakhs – ₹25 Lakhs</option>
                    <option value="25-50">₹25 Lakhs – ₹50 Lakhs</option>
                    <option value="50plus">₹50 Lakhs +</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', uppercase: true, color: 'var(--color-deep-forest)', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Message *</label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="Tell us about your company's CSR objectives, geographic preferences, or specific inquiries..."
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
                  <span>Partner With Us</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-6" style={{ display: 'grid', gap: '24px' }}>
            <div className="glassmorphism-card" style={{ 
              background: '#fff',
              border: '1.5px solid rgba(217, 203, 176, 0.45)',
              borderRadius: '24px',
              padding: '32px'
            }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-deep-forest-dark)', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
                Corporate CSR Team
              </h3>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" style={{ marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '12px', color: 'var(--ink-soft)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Email Address:</strong>
                    <a href="mailto:csr@dharafoundations.org" style={{ display: 'block', fontSize: '14.5px', color: 'var(--color-deep-forest)', fontWeight: '600', textDecoration: 'none' }}>
                      csr@dharafoundations.org
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" style={{ marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '12px', color: 'var(--ink-soft)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Phone Support:</strong>
                    <a href="tel:+919876543210" style={{ display: 'block', fontSize: '14.5px', color: 'var(--color-deep-forest)', fontWeight: '600', textDecoration: 'none' }}>
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <Building className="w-5 h-5 text-amber-500 flex-shrink-0" style={{ marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '12px', color: 'var(--ink-soft)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Registered Office:</strong>
                    <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: '1.4' }}>
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
        background: 'linear-gradient(135deg, var(--color-deep-forest) 0%, var(--color-deep-forest-dark) 100%)',
        color: '#fff',
        padding: '80px 20px',
        textAlign: 'center',
        marginTop: '80px',
        borderTop: '1.5px solid var(--color-saffron-glow)'
      }}>
        <div className="wrap">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#ffffff' }}>
            Let's Build Sustainable Change Together
          </h2>
          <p style={{ color: '#D5E5CD', fontSize: '16px', maxWidth: '640px', margin: '0 auto 36px', lineHeight: '1.6' }}>
            Partner with Dhara Foundations to create meaningful and measurable social impact through strategic CSR initiatives.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleScrollToForm} className="btn btn-primary sparkle-shimmer-btn">
              Become a CSR Partner
            </button>
            <button onClick={handleScheduleMeeting} className="btn btn-light">
              Contact Us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

import React, { useState } from 'react';
import { 
  Heart, Calendar, Award, CheckCircle, Mail, Phone, User, 
  Building, Check, ArrowRight, HelpCircle, ChevronDown, ChevronUp, 
  Star, Users, Clock, ShieldCheck, Camera, MapPin, Sparkles, BookOpen
} from 'lucide-react';
import { submitForm } from '../utils/api';

export default function Volunteer({ onSubmitSuccess, siteConfig }) {
  const [openFaq, setOpenFaq] = useState(null);
  const eventYear = siteConfig?.eventYear || siteConfig?.eventRegConfig?.eventYear || '2026';
  
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: 'male',
    email: '',
    phone: '',
    address: '',
    cityState: '',
    occupation: '',
    orgName: '',
    preferredRole: 'event_management',
    skillsExperience: '',
    languages: '',
    availabilityDates: '',
    areasInterest: '',
    motivation: '',
    emergencyContact: '',
    medicalNotes: '',
    agreeGuidelines: false,
    consentPhoto: false,
    referredBy: ''
  });

  const opportunities = [
    {
      title: "Event Management",
      icon: Award,
      items: ["Registration desk support", "Guest coordination", "Stage management", "Audience management"]
    },
    {
      title: "Community Outreach",
      icon: Heart,
      items: ["Awareness campaigns", "Public engagement", "Beneficiary support activities"]
    },
    {
      title: "Media & Photography",
      icon: Camera,
      items: ["Photography & videography", "Social media coverage", "Content creation"]
    },
    {
      title: "Technical Support",
      icon: Sparkles,
      items: ["Audio and visual support", "Website & digital assistance", "Live streaming coordination"]
    },
    {
      title: "Hospitality Team",
      icon: Users,
      items: ["Guest assistance", "VIP coordination", "Volunteer management"]
    },
    {
      title: "Creative Team",
      icon: BookOpen,
      items: ["Graphic design", "Event decoration", "Promotional materials"]
    }
  ];

  const faqs = [
    {
      q: "Is there any registration fee?",
      a: "No. Volunteer registration is completely free. We welcome all selfless volunteers dedicated to community service."
    },
    {
      q: "Will I receive a certificate?",
      a: "Yes. All active volunteers will receive an official Certificate of Appreciation and recognition from Dhara Foundations."
    },
    {
      q: "Can students apply?",
      a: "Yes, students are highly encouraged to participate. It provides valuable leadership and community service experience."
    },
    {
      q: "Do I need previous experience?",
      a: "No prior experience is required. We will conduct complete training and orientation sessions for all selected volunteers."
    },
    {
      q: "How much time do I need to commit?",
      a: "The time commitment depends on your assigned role and availability. Typically, it covers orientation hours and full-day event support."
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleScrollToForm = () => {
    const element = document.getElementById('volunteer-registration-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    const element = document.getElementById('volunteer-opportunities');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.dob || !formData.motivation) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!formData.agreeGuidelines) {
      alert('You must agree to follow the volunteer guidelines.');
      return;
    }

    const roleName = {
      'event_management': 'Event Management',
      'community_outreach': 'Community Outreach',
      'media_photography': 'Media & Photography',
      'technical_support': 'Technical Support',
      'hospitality_team': 'Hospitality Team',
      'creative_team': 'Creative Team'
    }[formData.preferredRole];

    const submission = {
      module: 'Volunteer Registration',
      ...formData,
      preferredRoleText: roleName,
      timestamp: new Date().toISOString()
    };

    submitForm('Volunteer Registration', submission);

    onSubmitSuccess({
      title: 'Volunteer Application Received',
      message: `Dhanyavaad, Mr./Ms. ${formData.fullName}. Your offer of self-less service (Seva) for the Divine Awards ${eventYear} has been registered. You have selected preferred role as ${roleName}. Our volunteer coordinator will review your skills and dates of availability to invite you for the upcoming orientation session.`,
      details: [
        { label: 'Volunteer Name', value: formData.fullName },
        { label: 'Preferred Role', value: roleName },
        { label: 'Mobile Number', value: formData.phone }
      ]
    });
  };

  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh', paddingBottom: '100px' }}>
      
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
            <Heart className="w-4 h-4 text-[var(--color-primary-accent)]" />
            <span style={{ 
              color: 'var(--color-deep-forest-dark)', 
              fontFamily: 'var(--font-mono)', 
              letterSpacing: '1.5px', 
              fontSize: '13px',
              textTransform: 'uppercase',
              fontWeight: '800'
            }}>
              Join the Seva Team
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
            Become a Volunteer – Serve with Purpose
          </h1>

          <p style={{ 
            color: 'var(--ink-soft)', 
            fontSize: '18px', 
            maxWidth: '740px', 
            margin: '0 auto 36px',
            lineHeight: '1.6'
          }}>
            "Seva is the highest form of worship." Become the hands that support the celebration of spiritual and humanitarian excellence and help create a meaningful impact in society.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleScrollToForm} className="btn btn-primary sparkle-shimmer-btn" style={{ padding: '16px 36px', fontSize: '15px' }}>
              Register as a Volunteer
            </button>
            <button onClick={handleLearnMore} className="btn btn-secondary" style={{ padding: '16px 30px', background: 'white', border: '1px solid rgba(64, 28, 12, 0.25)', color: '#401C0C' }}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* 2. Why Volunteer With Us & Who Can Apply */}
      <section className="wrap" style={{ marginTop: '100px' }}>
        <div style={{ display: 'grid', gap: '36px', alignItems: 'start' }} className="grid grid-cols-1 lg:grid-cols-3">
          
          {/* Why Volunteer */}
          <div>
            <span style={{ color: '#D9762E', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold' }}>Sankalpa</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '36px', marginBottom: '24px', fontWeight: 'bold', marginTop: '6px' }}>
              Why Volunteer With Us?
            </h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '16px', lineHeight: '1.7', marginBottom: '32px' }}>
              Volunteering with Dhara Foundations gives you the opportunity to align self-less actions with civic and spiritual welfare:
            </p>
            <ul style={{ display: 'grid', gap: '20px', padding: 0, margin: 0, listStyle: 'none' }}>
              {[
                "Serve society and make a positive impact.",
                `Be part of the prestigious Divine Awards ${eventYear}.`,
                "Develop leadership and teamwork skills.",
                "Network with social leaders and changemakers.",
                "Gain event management and community service experience.",
                "Receive a Volunteer Certificate and Recognition."
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

          {/* Volunteer Image Column */}
          <div className="img-zoom-container hover-lift" style={{ 
            background: '#ffffff', 
            border: '1px solid rgba(217, 203, 176, 0.4)', 
            borderRadius: '32px',
            overflow: 'hidden'
          }}>
            <div style={{ overflow: 'hidden' }}>
              <img 
                src="/images/volunteer_seva.png" 
                alt="Volunteer Seva Activities" 
                className="w-full h-auto object-cover"
                style={{ display: 'block' }}
              />
            </div>
            <div style={{ padding: '28px' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                Serve with Dedication
              </h4>
              <p style={{ color: 'var(--ink-soft)', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
                Bring positive, sustainable change to grassroot education and community development.
              </p>
            </div>
          </div>

          {/* Who Can Apply & Eligibility */}
          <div style={{ 
            background: '#ffffff', 
            border: '1px solid rgba(217, 166, 70, 0.25)', 
            boxShadow: '0 20px 40px -15px rgba(64, 28, 12, 0.05)',
            borderRadius: '32px', 
            padding: '40px',
            position: 'relative'
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '24px', marginBottom: '16px', fontWeight: 'bold' }}>
              Who Can Apply?
            </h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '14.5px', lineHeight: '1.6', marginBottom: '20px' }}>
              We welcome applications from individuals of all backgrounds:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
              {["Students", "Professionals", "Social Workers", "NGO Members", "Retired Individuals", "Passionate Changemakers"].map((item, idx) => (
                <span key={idx} style={{ 
                  background: '#FDFBF7', 
                  border: '1px solid rgba(217, 203, 176, 0.35)',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#401C0C',
                }}>
                  {item}
                </span>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#401C0C', marginBottom: '12px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Eligibility Criteria:</h4>
              <ul style={{ display: 'grid', gap: '8px', padding: 0, margin: 0, listStyle: 'none' }}>
                {[
                  "Minimum age: 18 years (or parental consent below 18).",
                  "Willingness to serve and work collaboratively in teams.",
                  "Positive attitude, reliability, and commitment to guidelines."
                ].map((el, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'var(--ink-soft)' }}>
                    <span style={{ color: '#D9762E' }}>•</span>
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Volunteer Opportunities Grid */}
      <section id="volunteer-opportunities" className="wrap" style={{ marginTop: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: '#D9762E', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold' }}>Seva Options</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '36px', marginTop: '6px', fontWeight: 'bold' }}>
            Volunteer Opportunities
          </h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '600px', margin: '12px auto 0', fontSize: '16px', lineHeight: '1.6' }}>
            Explore the active Seva departments where you can direct your energy, skills, and dedication.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {opportunities.map((opp, idx) => {
            const Icon = opp.icon;
            return (
              <div key={idx} className="premium-interactive-card" style={{ 
                padding: '36px'
              }}>
                <div style={{ 
                  width: '44px', height: '44px', borderRadius: '12px', 
                  background: 'rgba(64, 28, 12, 0.05)', color: '#401C0C',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <h3 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                  {opp.title}
                </h3>
                <ul style={{ display: 'grid', gap: '10px', padding: 0, margin: 0, listStyle: 'none' }}>
                  {opp.items.map((bullet, bIdx) => (
                    <li key={bIdx} style={{ display: 'flex', gap: '8px', fontSize: '13.5px', color: 'var(--ink-soft)' }}>
                      <span style={{ color: 'var(--color-saffron-glow-dark)', fontWeight: 'bold' }}>•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Benefits of Volunteering & Responsibilities */}
      <section className="wrap" style={{ marginTop: '100px' }}>
        <div style={{ 
          background: '#fff', 
          border: '1.5px solid rgba(217, 203, 176, 0.45)', 
          borderRadius: '32px', 
          padding: '48px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '48px'
        }} className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Benefits */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '26px', fontWeight: 'bold', marginBottom: '24px' }}>
              Benefits of Volunteering
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid grid-cols-1 sm:grid-cols-2">
              {[
                { title: "Certificate", desc: "Official Certificate of Appreciation." },
                { title: "Networking", desc: "Build connections with social leaders." },
                { title: "Leadership", desc: "Gain hands-on coordinator experience." },
                { title: "Recognition", desc: "Special credits during the ceremony." },
                { title: "Personal Growth", desc: "Refine corporate & soft skills." },
                { title: "Merchandise", desc: "Exclusive Volunteer badge & kits." }
              ].map((item, idx) => (
                <div key={idx} style={{ background: '#FAF8F4', padding: '18px', borderRadius: '16px', border: '1px solid rgba(217,203,176,0.3)' }}>
                  <span style={{ color: '#D9762E', fontWeight: 'bold', fontSize: '16px', display: 'block', marginBottom: '4px' }}>★ {item.title}</span>
                  <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--ink-soft)', lineHeight: '1.4' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Responsibilities */}
          <div style={{ 
            background: '#FDFBF7', 
            borderRadius: '24px', 
            padding: '36px', 
            border: '1px solid rgba(217, 203, 176, 0.35)'
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', itemsAlign: 'center', gap: '8px' }}>
              <ShieldCheck className="w-6 h-6 text-amber-600" />
              Volunteer Responsibilities
            </h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', lineHeight: '1.5', marginBottom: '24px' }}>
              Volunteers are requested to commit to standard event rules to ensure absolute coordination:
            </p>
            <ul style={{ display: 'grid', gap: '16px', padding: 0, margin: 0, listStyle: 'none' }}>
              {[
                "Attend mandatory online orientation & briefings.",
                "Follow event guidelines, structures, and shift schedules.",
                "Maintain absolute professionalism, discipline, and courtesy.",
                "Coordinate effectively with designated team leaders.",
                "Support various venue activities as assigned."
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'start', fontSize: '13.5px', color: '#1F2318' }}>
                  <span style={{ color: '#401C0C', fontWeight: 'bold' }}>✓</span>
                  <span style={{ lineHeight: '1.4' }}>{item}</span>
                </div>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* 5. Volunteer Journey Timeline */}
      <section style={{ background: '#FAF8F4', padding: '80px 20px', marginTop: '100px', borderTop: '1px solid rgba(0,0,0,0.03)' }}>
        <div className="wrap text-center">
          <span style={{ color: '#D9762E', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 'bold' }}>Onboarding Path</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '36px', marginBottom: '50px', marginTop: '6px', fontWeight: 'bold' }}>
            Volunteer Journey
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: '14px',
          }} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7">
            {[
              "Register",
              "Application Review",
              "Confirmation Email",
              "Orientation Training",
              "Volunteer Assignment",
              "Event Participation",
              "Certificate Recognition"
            ].map((step, idx) => (
              <div key={idx} style={{ 
                padding: '24px 16px', 
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
                  width: '30px', height: '30px', borderRadius: '50%',
                  background: '#401C0C', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 'bold', fontFamily: 'var(--font-mono)',
                  marginBottom: '12px'
                }}>
                  0{idx + 1}
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#052622', lineHeight: '1.3' }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials & FAQs Section */}
      <section style={{ background: '#FAF8F4', padding: '100px 20px', borderTop: '1px solid rgba(0,0,0,0.03)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }} className="grid grid-cols-1 md:grid-cols-2">
            
            {/* FAQ Accordion */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: '#401C0C', fontSize: '32px', marginBottom: '32px', fontWeight: 'bold' }}>
                Frequently Asked Questions
              </h2>
              <div style={{ display: 'grid', gap: '14px' }}>
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
                          padding: '20px 24px', 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          color: '#401C0C',
                          fontSize: '15px'
                        }}
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                      </div>
                      {isOpen && (
                        <div style={{ 
                          padding: '0 24px 20px', 
                          fontSize: '13.5px', 
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
                  "Volunteering with Dhara Foundations was an unforgettable experience. I learned teamwork and had the opportunity to contribute to a meaningful cause."
                </p>
                <h5 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#401C0C' }}>
                  — Previous Volunteer
                </h5>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Volunteer Registration Form Fields */}
      <section id="volunteer-registration-form" className="wrap" style={{ marginTop: '80px' }}>
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '32px', 
          border: '1.5px solid rgba(217, 203, 176, 0.45)', 
          boxShadow: '0 25px 50px -12px rgba(64, 28, 12, 0.05)',
          padding: '48px',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '20px', marginBottom: '28px' }}>
            <Heart className="text-amber-500 w-6 h-6" />
            <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#401C0C', fontFamily: 'var(--font-serif)' }}>
              Volunteer Registration Form
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" style={{ display: 'grid', gap: '20px' }}>
            
            {/* Section A: Personal Information */}
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#401C0C', marginBottom: '16px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', borderBottom: '1px dashed rgba(0,0,0,0.06)', paddingBottom: '6px' }}>
                1. Personal Information
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Sevak Kumar"
                      value={formData.fullName}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date of Birth *</label>
                    <input
                      type="date"
                      name="dob"
                      required
                      value={formData.dob}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Gender *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '11.5px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }} className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. sevak@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mobile Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" style={{ position: 'absolute', left: '14px', top: '14px' }} />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 99999 88888"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '20px', marginTop: '20px' }} className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="Street Address, Apartment, Suite"
                    value={formData.address}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>City and State *</label>
                  <input
                    type="text"
                    name="cityState"
                    required
                    placeholder="e.g. Chennai, TN"
                    value={formData.cityState}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                  />
                </div>
              </div>
            </div>

            {/* Section B: Educational & Professional Details */}
            <div style={{ marginTop: '10px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#401C0C', marginBottom: '16px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', borderBottom: '1px dashed rgba(0,0,0,0.06)', paddingBottom: '6px' }}>
                2. Educational &amp; Professional Details
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Occupation *</label>
                  <input
                    type="text"
                    name="occupation"
                    required
                    placeholder="e.g. Student / Software Developer"
                    value={formData.occupation}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Organization / College Name</label>
                  <input
                    type="text"
                    name="orgName"
                    placeholder="Name of Institution or Company"
                    value={formData.orgName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                  />
                </div>
              </div>
            </div>

            {/* Section C: Volunteer Preferences */}
            <div style={{ marginTop: '10px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#401C0C', marginBottom: '16px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', borderBottom: '1px dashed rgba(0,0,0,0.06)', paddingBottom: '6px' }}>
                3. Volunteer Preferences
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Preferred Role *</label>
                  <select
                    name="preferredRole"
                    value={formData.preferredRole}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                  >
                    <option value="event_management">Event Management</option>
                    <option value="community_outreach">Community Outreach</option>
                    <option value="media_photography">Media &amp; Photography</option>
                    <option value="technical_support">Technical Support</option>
                    <option value="hospitality_team">Hospitality Team</option>
                    <option value="creative_team">Creative Team</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Languages Known *</label>
                  <input
                    type="text"
                    name="languages"
                    required
                    placeholder="e.g. Tamil, English, Hindi"
                    value={formData.languages}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }} className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Availability Dates *</label>
                  <input
                    type="text"
                    name="availabilityDates"
                    required
                    placeholder="e.g. Pre-event days, Event day (Jan 24), all shifts"
                    value={formData.availabilityDates}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Areas of Interest *</label>
                  <input
                    type="text"
                    name="areasInterest"
                    required
                    placeholder="e.g. Women empowerment, teaching, event anchoring"
                    value={formData.areasInterest}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Skills and Experience *</label>
                <textarea
                  name="skillsExperience"
                  rows="3"
                  required
                  placeholder="Share details of any prior event coordination, photography, social service, or AV editing skill..."
                  value={formData.skillsExperience}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px', resize: 'vertical' }}
                ></textarea>
              </div>
            </div>

            {/* Section D: Additional Information */}
            <div style={{ marginTop: '10px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#401C0C', marginBottom: '16px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', borderBottom: '1px dashed rgba(0,0,0,0.06)', paddingBottom: '6px' }}>
                4. Additional Information
              </h4>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Why do you want to volunteer? *</label>
                <textarea
                  name="motivation"
                  rows="3"
                  required
                  placeholder="Please write briefly about what drives you to seek volunteer seva..."
                  value={formData.motivation}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px', resize: 'vertical' }}
                ></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '20px', marginTop: '20px' }} className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Emergency Contact Name &amp; Number *</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    required
                    placeholder="e.g. S. Kumar (Father) - 9876543210"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Medical Conditions / Special Requirements (Optional)</label>
                  <input
                    type="text"
                    name="medicalNotes"
                    placeholder="e.g. Back pain, diabetic, requires sitting tasks"
                    value={formData.medicalNotes}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#401C0C', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Who referred you to join as a volunteer? *</label>
                <input
                  type="text"
                  name="referredBy"
                  required
                  placeholder="e.g. Friend Name, Social Media post, NGO partner"
                  value={formData.referredBy}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1.5px solid var(--color-card-border)', background: '#fff', fontSize: '14px' }}
                />
              </div>
            </div>

            {/* Checkboxes & Consents */}
            <div style={{ display: 'grid', gap: '12px', background: '#FDFBF7', padding: '24px', borderRadius: '16px', border: '1px solid rgba(217,203,176,0.3)', marginTop: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#1F2318' }}>
                <input
                  type="checkbox"
                  name="agreeGuidelines"
                  checked={formData.agreeGuidelines}
                  onChange={handleChange}
                  style={{ width: '16px', height: '16px', accentColor: '#401C0C' }}
                />
                <span>I agree to follow the volunteer guidelines. *</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#1F2318' }}>
                <input
                  type="checkbox"
                  name="consentPhoto"
                  checked={formData.consentPhoto}
                  onChange={handleChange}
                  style={{ width: '16px', height: '16px', accentColor: '#401C0C' }}
                />
                <span>I consent to being photographed during the event.</span>
              </label>
            </div>

            <div style={{ paddingTop: '10px' }}>
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-saffron-glow)] to-[var(--color-saffron-glow-dark)] text-[#281006] hover:brightness-105 font-sans font-bold text-base transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 border-2 border-transparent hover:border-[#281006] cursor-pointer group shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', width: '100%', cursor: 'pointer' }}
              >
                <span>Register as a Volunteer</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </form>
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
            Join Hands to Create a Meaningful Impact
          </h2>
          <p style={{ color: '#D5E5CD', fontSize: '18px', maxWidth: '720px', margin: '0 auto 40px', lineHeight: '1.6' }}>
            Your time, skills, and dedication can help us celebrate and promote spiritual and humanitarian excellence. Become a Volunteer. Serve with Purpose. Inspire Change. 🌸🙏
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleScrollToForm} className="btn btn-primary sparkle-shimmer-btn" style={{ padding: '16px 36px' }}>
              Become a Volunteer
            </button>
            <button onClick={handleScrollToForm} className="btn btn-light" style={{ padding: '16px 30px' }}>
              Register Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

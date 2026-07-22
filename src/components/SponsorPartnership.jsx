import React, { useState } from 'react';
import { 
  Handshake, Briefcase, Heart, Gift, ShieldCheck, Check, 
  Award, Sparkles, Star, Shield, Users, Mail, Phone, User, 
  Building, Send, Landmark, Calendar, MapPin, Clock, ArrowRight 
} from 'lucide-react';

export default function SponsorPartnership({ onSubmitSuccess }) {
  const [subTab, setSubTab] = useState('sponsorship');

  // Sponsorship states
  const [selectedTier, setSelectedTier] = useState('title');
  const [sponsorFormData, setSponsorFormData] = useState({
    companyName: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    interest: 'Title',
    message: ''
  });

  // CSR states
  const [csrFormData, setCsrFormData] = useState({
    companyName: '',
    cinNumber: '',
    authorizedPerson: '',
    email: '',
    phone: '',
    allocatedBudget: '₹2,50,000 - ₹5,00,000',
    complianceTarget: 'Education',
    message: ''
  });

  // Volunteer states
  const [volunteerFormData, setVolunteerFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    preferredRole: 'event-management',
    availability: 'both',
    motivation: ''
  });

  // Donor states
  const [donorAmountType, setDonorAmountType] = useState('preset');
  const [selectedDonorPreset, setSelectedDonorPreset] = useState('1008');
  const [customDonorAmount, setCustomDonorAmount] = useState('');
  const [donorFormData, setDonorFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
    anonymous: false
  });

  const sponsorPackages = [
    {
      id: 'title',
      name: 'Title Sponsor',
      amount: '₹5,00,000+',
      description: 'Exclusive title branding, keynote speech recognition, and maximum media visibility.',
      icon: Award,
      color: 'var(--color-saffron-glow)',
      benefits: ["Naming Rights (e.g. 'Dhara Divine Awards powered by [Your Brand]')", "Primary stage backdrop logo", "Keynote address slot", "10 VIP Event passes", "Stall space & Naming rights"]
    },
    {
      id: 'platinum',
      name: 'Platinum Sponsor',
      amount: '₹2,50,000+',
      description: 'Main stage panel branding, extensive social promotions, and prominent logo spots.',
      icon: Sparkles,
      color: 'var(--color-primary-accent)',
      benefits: ["Prominent backdrop logo", "Panel speaker slot", "5 VIP Event passes", "Full-page brochure ad", "Stall space"]
    },
    {
      id: 'gold',
      name: 'Gold Sponsor',
      amount: '₹1,00,000+',
      description: 'Logo placement on branding collaterals, event recognition, and delegate passes.',
      icon: Star,
      color: 'var(--color-saffron-glow)',
      benefits: ["Backdrop logo placement", "Vocal mention on stage", "3 VIP Event passes", "Half-page brochure ad"]
    },
    {
      id: 'silver',
      name: 'Silver Sponsor',
      amount: '₹50,000+',
      description: 'Branding placement on sponsor walls, digital brochures, and websites.',
      icon: Shield,
      color: 'var(--color-primary-accent)',
      benefits: ["Logo on website scroll", "Souvenir advertisement mention", "2 Delegate passes", "Certificate of partnership"]
    }
  ];

  const donorPresets = [
    {
      amount: '510',
      impact: 'Meal Seva',
      desc: 'Sponsor pure Sattvic meals and sacred prasad for a student delegate during the entire event.'
    },
    {
      amount: '1008',
      impact: 'Sevak Support',
      desc: 'Sponsor event souvenir kit, green handbook, and transport support for a dedicated volunteer.'
    },
    {
      amount: '5001',
      impact: 'Kala Seva',
      desc: 'Sponsor travel and honorarium for a traditional musician/folk artist performing at the cultural gala.'
    },
    {
      amount: '10008',
      impact: 'Nominee Seva',
      desc: 'Sponsor a grassroots social worker nominee’s round-trip travel, stay, and reception costs.'
    }
  ];

  // Handlers
  const handleSponsorSubmit = (e) => {
    e.preventDefault();
    if (!sponsorFormData.companyName || !sponsorFormData.contactPerson || !sponsorFormData.email || !sponsorFormData.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    const submission = {
      module: 'Sponsorship Inquiry',
      tier: selectedTier,
      ...sponsorFormData,
      timestamp: new Date().toISOString()
    };
    const current = JSON.parse(localStorage.getItem('dhara_submissions') || '[]');
    current.push(submission);
    localStorage.setItem('dhara_submissions', JSON.stringify(current));

    onSubmitSuccess({
      title: 'Sponsorship Inquiry Registered',
      message: `Namaste, ${sponsorFormData.contactPerson}. Thank you for expressing interest in partnering with us as a ${selectedTier.toUpperCase()} Sponsor for the Dhara Divine Awards 2025. Our Corporate Partnerships desk will call you shortly on ${sponsorFormData.phone} or send collateral documentation to ${sponsorFormData.email}.`,
      details: [
        { label: 'Company', value: sponsorFormData.companyName },
        { label: 'Tier Selection', value: selectedTier.toUpperCase() },
        { label: 'Contact Email', value: sponsorFormData.email }
      ]
    });
  };

  const handleCsrSubmit = (e) => {
    e.preventDefault();
    if (!csrFormData.companyName || !csrFormData.cinNumber || !csrFormData.authorizedPerson || !csrFormData.email || !csrFormData.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    const submission = {
      module: 'Corporate CSR Registration',
      ...csrFormData,
      timestamp: new Date().toISOString()
    };
    const current = JSON.parse(localStorage.getItem('dhara_submissions') || '[]');
    current.push(submission);
    localStorage.setItem('dhara_submissions', JSON.stringify(current));

    onSubmitSuccess({
      title: 'CSR Registration Received',
      message: `Namaste, ${csrFormData.authorizedPerson}. Your institutional CSR registration for "${csrFormData.companyName}" (CIN: ${csrFormData.cinNumber}) has been submitted. Our compliance officer will evaluate your Section 135 targets for "${csrFormData.complianceTarget}" and email tax-benefit certificates to ${csrFormData.email}.`,
      details: [
        { label: 'Institution', value: csrFormData.companyName },
        { label: 'CSR Area Focus', value: csrFormData.complianceTarget },
        { label: 'Budget Range', value: csrFormData.allocatedBudget }
      ]
    });
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    if (!volunteerFormData.fullName || !volunteerFormData.email || !volunteerFormData.phone || !volunteerFormData.location) {
      alert('Please fill in all required fields.');
      return;
    }
    const submission = {
      module: 'Volunteer Seva Registration',
      ...volunteerFormData,
      timestamp: new Date().toISOString()
    };
    const current = JSON.parse(localStorage.getItem('dhara_submissions') || '[]');
    current.push(submission);
    localStorage.setItem('dhara_submissions', JSON.stringify(current));

    onSubmitSuccess({
      title: 'Volunteer Seva Registered',
      message: `Dhanyavaad, ${volunteerFormData.fullName}. Your offer of self-less service (Seva) for the Divine Awards 2025 logistics has been registered. Our volunteer cell coordinator will call you on ${volunteerFormData.phone} to invite you for the upcoming briefing session.`,
      details: [
        { label: 'Sevak Name', value: volunteerFormData.fullName },
        { label: 'Location Base', value: volunteerFormData.location },
        { label: 'Preferred Seva Cell', value: volunteerFormData.preferredRole.replace('-', ' ').toUpperCase() }
      ]
    });
  };

  const handleDonorSubmit = (e) => {
    e.preventDefault();
    const finalAmount = donorAmountType === 'preset' ? selectedDonorPreset : customDonorAmount;
    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      alert('Please select or input a valid donation amount.');
      return;
    }
    if (!donorFormData.name || !donorFormData.email || !donorFormData.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    const submission = {
      module: 'Giving Gateway Support',
      amount: finalAmount,
      isAnonymous: donorFormData.anonymous,
      ...donorFormData,
      timestamp: new Date().toISOString()
    };
    const current = JSON.parse(localStorage.getItem('dhara_submissions') || '[]');
    current.push(submission);
    localStorage.setItem('dhara_submissions', JSON.stringify(current));

    const displayName = donorFormData.anonymous ? 'Anonymous Donor' : donorFormData.name;

    onSubmitSuccess({
      title: 'Contribution Received (Mock)',
      message: `Namaste, ${displayName}. Thank you for your generous offering of ₹${parseFloat(finalAmount).toLocaleString('en-IN')}. Your contribution will directly support "${donorAmountType === 'preset' ? donorPresets.find(p => p.amount === selectedDonorPreset).impact : 'Divine Awards Seva initiatives'}". May the blessings of service follow you always. An 80G tax receipt will be sent to ${donorFormData.email} ${donorFormData.pan ? `for PAN ${donorFormData.pan.toUpperCase()}` : ''}.`,
      details: [
        { label: 'Donor Name', value: displayName },
        { label: 'Contribution Amount', value: `₹${parseFloat(finalAmount).toLocaleString('en-IN')}` },
        { label: 'Tax Benefit Status', value: donorFormData.pan ? '80G Tax-Exempt Eligible' : 'Standard Contribution' }
      ]
    });
  };

  return (
    <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold text-[var(--color-primary-accent)] uppercase tracking-[3px]">
          Join Hands
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-[var(--color-deep-forest-dark)] font-serif leading-tight">
          Sponsor &amp; Partnership Options
        </h2>
        <div className="w-24 h-1 bg-[var(--color-saffron-glow)] mx-auto rounded-full"></div>
      </div>

      {/* Categories Tabs */}
      <div className="flex flex-wrap gap-2.5 justify-center max-w-5xl mx-auto pb-4">
        {[
          { id: 'sponsorship', label: 'Corporate Sponsorships', icon: Handshake },
          { id: 'csr', label: 'CSR budget allocations', icon: Briefcase },
          { id: 'volunteer', label: 'Volunteer Seva Cells', icon: Heart },
          { id: 'donor', label: 'Giving Gateway', icon: Gift }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-sans font-bold flex items-center gap-2 transition-all duration-300 cursor-pointer select-none active:scale-95 ${
                subTab === tab.id
                  ? 'bg-[var(--color-deep-forest)] text-white shadow-md'
                  : 'bg-white border border-[#D9CBB0]/60 text-[var(--color-deep-forest-dark)] hover:border-[var(--color-primary-accent)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Switch Area */}
      <div className="max-w-5xl mx-auto">
        {/* Tab 1: Corporate Sponsorship */}
        {subTab === 'sponsorship' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Packages Description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[var(--color-deep-forest-dark)] font-serif">Sponsorship Packages</h3>
                <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                  Support the grand gathering of unsung heroes. Choose a tier or request a custom brand integration formats.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sponsorPackages.map((pkg) => {
                  const Icon = pkg.icon;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => { setSelectedTier(pkg.id); setSponsorFormData(p => ({ ...p, interest: pkg.name })); }}
                      className={`p-5 rounded-3xl border transition-all duration-300 cursor-pointer ${
                        selectedTier === pkg.id
                          ? 'border-[var(--color-primary-accent)] bg-amber-50/20 shadow-md'
                          : 'border-[#D9CBB0]/60 bg-white hover:border-[var(--color-primary-accent)]'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-[var(--color-primary-accent)]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[var(--color-deep-forest-dark)] font-serif">{pkg.name}</h4>
                          <span className="text-[10px] font-mono text-[var(--color-primary-accent)] font-bold">{pkg.amount}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[var(--ink-soft)] leading-relaxed mb-3">{pkg.description}</p>
                      <div className="space-y-1">
                        {pkg.benefits.slice(0, 2).map((b, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[9px] text-[var(--ink-soft)]">
                            <Check className="w-3 h-3 text-[#401C0C]" />
                            <span className="truncate">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sponsorship Enquiry Form */}
            <form onSubmit={handleSponsorSubmit} className="lg:col-span-5 bg-white rounded-3xl border border-[#D9CBB0]/60 p-6 md:p-8 space-y-4 shadow-sm">
              <h3 className="text-xl font-bold text-[var(--color-deep-forest-dark)] font-serif border-b border-neutral-100 pb-2 mb-2">
                Enquire for {selectedTier.toUpperCase()}
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-neutral-600 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={sponsorFormData.companyName}
                    onChange={(e) => setSponsorFormData(p => ({ ...p, companyName: e.target.value }))}
                    className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-600 mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={sponsorFormData.contactPerson}
                    onChange={(e) => setSponsorFormData(p => ({ ...p, contactPerson: e.target.value }))}
                    className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-600 mb-1">Designation</label>
                  <input
                    type="text"
                    value={sponsorFormData.designation}
                    onChange={(e) => setSponsorFormData(p => ({ ...p, designation: e.target.value }))}
                    className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                    placeholder="Enter corporate designation"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-600 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={sponsorFormData.email}
                      onChange={(e) => setSponsorFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                      placeholder="corporate@domain.com"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-600 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={sponsorFormData.phone}
                      onChange={(e) => setSponsorFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                      placeholder="Enter mobile number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-neutral-600 mb-1">Branding Message / Query</label>
                  <textarea
                    rows="3"
                    value={sponsorFormData.message}
                    onChange={(e) => setSponsorFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none font-sans"
                    placeholder="Describe specific branding requirements..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-saffron-glow)] to-[var(--color-saffron-glow-dark)] text-[#281006] hover:brightness-105 font-sans font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Corporate CSR */}
        {subTab === 'csr' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* CSR value proposition */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[var(--color-deep-forest-dark)] font-serif">Corporate CSR Opportunities</h3>
                <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                  Dhara Foundations is fully registered with the Ministry of Corporate Affairs (Reg. No: CSR00086947) to receive Section 135 compliance funding.
                </p>
              </div>

              <div className="bg-[#F4EFE6] rounded-3xl p-6 border border-[#D9CBB0]/60 space-y-4">
                <h4 className="text-xs font-mono font-bold text-[var(--color-primary-accent)] uppercase tracking-wider">CSR Program Areas</h4>
                <ul className="space-y-2.5 text-xs text-[var(--ink-soft)]">
                  {[
                    "Schedule VII Education & Skill development for Women SHGs",
                    "Tribal welfare healthcare camps & vocational training at Javadhu Hills",
                    "Environmental conservation through traditional forestry",
                    "Infrastructure support to rural government schools and orphanages"
                  ].map((pArea, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[var(--color-deep-forest)] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">{idx + 1}</div>
                      <span>{pArea}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CSR Registry Form */}
            <form onSubmit={handleCsrSubmit} className="lg:col-span-6 bg-white rounded-3xl border border-[#D9CBB0]/60 p-6 md:p-8 space-y-4 shadow-sm">
              <h3 className="text-xl font-bold text-[var(--color-deep-forest-dark)] font-serif border-b border-neutral-100 pb-2 mb-2">
                CSR Budget Registration
              </h3>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-600 mb-1">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={csrFormData.companyName}
                      onChange={(e) => setCsrFormData(p => ({ ...p, companyName: e.target.value }))}
                      className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                      placeholder="Company Pvt Ltd"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-600 mb-1">Corporate CIN *</label>
                    <input
                      type="text"
                      required
                      value={csrFormData.cinNumber}
                      onChange={(e) => setCsrFormData(p => ({ ...p, cinNumber: e.target.value }))}
                      className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                      placeholder="L12345TN2024PTC123456"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-neutral-600 mb-1">Authorized Signatory Name *</label>
                  <input
                    type="text"
                    required
                    value={csrFormData.authorizedPerson}
                    onChange={(e) => setCsrFormData(p => ({ ...p, authorizedPerson: e.target.value }))}
                    className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-600 mb-1">Official Email *</label>
                    <input
                      type="email"
                      required
                      value={csrFormData.email}
                      onChange={(e) => setCsrFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                      placeholder="official@company.com"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-600 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={csrFormData.phone}
                      onChange={(e) => setCsrFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                      placeholder="Enter contact number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-600 mb-1">CSR Focal Area</label>
                    <select
                      value={csrFormData.complianceTarget}
                      onChange={(e) => setCsrFormData(p => ({ ...p, complianceTarget: e.target.value }))}
                      className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                    >
                      <option value="Education">Education &amp; Literacy</option>
                      <option value="Health">Tribal Healthcare</option>
                      <option value="Environment">Environmental Forestry</option>
                      <option value="Heritage">Temple &amp; Heritage Restoration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-600 mb-1">Budget Allocation</label>
                    <select
                      value={csrFormData.allocatedBudget}
                      onChange={(e) => setCsrFormData(p => ({ ...p, allocatedBudget: e.target.value }))}
                      className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                    >
                      <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                      <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000</option>
                      <option value="₹5,00,000+">₹5,00,000+</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-saffron-glow)] to-[var(--color-saffron-glow-dark)] text-[#281006] hover:brightness-105 font-sans font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider"
              >
                Register Corporate Partner
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Volunteer Seva */}
        {subTab === 'volunteer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Volunteer info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[var(--color-deep-forest-dark)] font-serif">Volunteer Seva Registration</h3>
                <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                  Your time, skills, and devotion can transform communities. Join our specialized coordination cells to execute temple cleaning, transport management, medical support, and award hospitality.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { cell: "Event Management", desc: "Coordinates guests, award recipients seating, and venue setup." },
                  { cell: "Medical cell", desc: "Deploys first aid and coordinate emergency health services." },
                  { cell: "Hospitality cell", desc: "Manages pure Sattvic food serving and guest lodging." },
                  { cell: "Media & Press cell", desc: "Access passes, coordinate videography, and social networks." }
                ].map((c, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[#D9CBB0]/60 p-4 space-y-1 shadow-sm">
                    <h4 className="font-bold text-xs text-[var(--color-deep-forest-dark)] font-serif">{c.cell}</h4>
                    <p className="text-[10px] text-[var(--ink-soft)] leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Volunteer registration form */}
            <form onSubmit={handleVolunteerSubmit} className="lg:col-span-6 bg-white rounded-3xl border border-[#D9CBB0]/60 p-6 md:p-8 space-y-4 shadow-sm">
              <h3 className="text-xl font-bold text-[var(--color-deep-forest-dark)] font-serif border-b border-neutral-100 pb-2 mb-2">
                Join Volunteer Seva
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-neutral-600 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={volunteerFormData.fullName}
                    onChange={(e) => setVolunteerFormData(p => ({ ...p, fullName: e.target.value }))}
                    className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-600 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={volunteerFormData.email}
                      onChange={(e) => setVolunteerFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                      placeholder="sevak@domain.com"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-600 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={volunteerFormData.phone}
                      onChange={(e) => setVolunteerFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                      placeholder="Enter mobile number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-600 mb-1">Location Base *</label>
                    <input
                      type="text"
                      required
                      value={volunteerFormData.location}
                      onChange={(e) => setVolunteerFormData(p => ({ ...p, location: e.target.value }))}
                      className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                      placeholder="e.g. Chennai, Cuddalore"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-600 mb-1">Preferred Seva Cell</label>
                    <select
                      value={volunteerFormData.preferredRole}
                      onChange={(e) => setVolunteerFormData(p => ({ ...p, preferredRole: e.target.value }))}
                      className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                    >
                      <option value="event-management">Event &amp; Venue Setup</option>
                      <option value="hospitality">Hospitality &amp; Food Seva</option>
                      <option value="medical">Medical &amp; First Aid</option>
                      <option value="media">Media &amp; Photography Coordination</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-saffron-glow)] to-[var(--color-saffron-glow-dark)] text-[#281006] hover:brightness-105 font-sans font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider"
              >
                Register for Seva
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Giving Gateway / Donor */}
        {subTab === 'donor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* Presets Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[var(--color-deep-forest-dark)] font-serif">Giving Gateway</h3>
                <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                  Select a pre-set seva or input a custom amount. All contributions are 100% transparent and eligible for Section 80G tax-exemption benefit receipts.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {donorPresets.map((preset) => (
                  <div
                    key={preset.amount}
                    onClick={() => { setDonorAmountType('preset'); setSelectedDonorPreset(preset.amount); }}
                    className={`p-5 rounded-3xl border transition-all duration-300 cursor-pointer ${
                      donorAmountType === 'preset' && selectedDonorPreset === preset.amount
                        ? 'border-[var(--color-primary-accent)] bg-amber-50/20 shadow-md'
                        : 'border-[#D9CBB0]/60 bg-white hover:border-[var(--color-primary-accent)]'
                    }`}
                  >
                    <span className="text-2xl font-bold text-[var(--color-deep-forest-dark)] font-serif block mb-1">
                      ₹{parseFloat(preset.amount).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[var(--color-primary-accent)] uppercase tracking-wider block mb-2">
                      {preset.impact}
                    </span>
                    <p className="text-[11px] text-[var(--ink-soft)] leading-relaxed">{preset.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Donation Form */}
            <form onSubmit={handleDonorSubmit} className="lg:col-span-5 bg-white rounded-3xl border border-[#D9CBB0]/60 p-6 md:p-8 space-y-4 shadow-sm">
              <h3 className="text-xl font-bold text-[var(--color-deep-forest-dark)] font-serif border-b border-neutral-100 pb-2 mb-2">
                Complete Offering
              </h3>

              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setDonorAmountType('preset')}
                  className={`flex-1 py-2 text-center text-[10px] font-bold rounded-lg ${
                    donorAmountType === 'preset' ? 'bg-[var(--color-deep-forest)] text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  Presets
                </button>
                <button
                  type="button"
                  onClick={() => setDonorAmountType('custom')}
                  className={`flex-1 py-2 text-center text-[10px] font-bold rounded-lg ${
                    donorAmountType === 'custom' ? 'bg-[var(--color-deep-forest)] text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  Custom Amount
                </button>
              </div>

              {donorAmountType === 'custom' && (
                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 mb-1">Offering Amount (₹) *</label>
                  <input
                    type="number"
                    value={customDonorAmount}
                    onChange={(e) => setCustomDonorAmount(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none text-xs"
                    placeholder="Enter custom amount"
                  />
                </div>
              )}

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-neutral-600 mb-1">Donor Name *</label>
                  <input
                    type="text"
                    required
                    value={donorFormData.name}
                    onChange={(e) => setDonorFormData(p => ({ ...p, name: e.target.value }))}
                    className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                    placeholder="Enter donor name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-600 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={donorFormData.email}
                      onChange={(e) => setDonorFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                      placeholder="email@domain.com"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-neutral-600 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={donorFormData.phone}
                      onChange={(e) => setDonorFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none"
                      placeholder="Enter mobile number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-neutral-600 mb-1">PAN Card (For 80G tax benefit)</label>
                  <input
                    type="text"
                    value={donorFormData.pan}
                    onChange={(e) => setDonorFormData(p => ({ ...p, pan: e.target.value }))}
                    className="w-full p-2.5 bg-neutral-50 border border-[#D9CBB0]/40 rounded-xl focus:outline-none uppercase"
                    placeholder="ABCDE1234F"
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={donorFormData.anonymous}
                    onChange={() => setDonorFormData(p => ({ ...p, anonymous: !p.anonymous }))}
                    className="w-4 h-4 rounded text-[var(--color-primary-accent)]"
                  />
                  <label htmlFor="anonymous" className="font-semibold text-neutral-500 text-[11px] cursor-pointer">
                    Submit contribution anonymously
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-saffron-glow)] to-[var(--color-saffron-glow-dark)] text-[#281006] hover:brightness-105 font-sans font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider"
              >
                Complete Donation
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

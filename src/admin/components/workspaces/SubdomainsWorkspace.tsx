import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Save, ShieldCheck, Plus, Trash2, Calendar, Edit3, Building2
} from 'lucide-react';

export const SubdomainsWorkspace: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useApp();

  const [saving, setSaving] = useState(false);

  // Subdomains & Dynamic Forms Config States
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
  const [eventYear, setEventYear] = useState('2026');

  // Load config on mount or config change
  useEffect(() => {
    if (siteConfig) {
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

      if (siteConfig.eventYear) {
        setEventYear(siteConfig.eventYear);
      } else if (siteConfig.eventRegConfig && siteConfig.eventRegConfig.eventYear) {
        setEventYear(siteConfig.eventRegConfig.eventYear);
      }

      if (siteConfig.generalEnquiriesConfig) {
        setContactInfo(prev => ({ ...prev, ...siteConfig.generalEnquiriesConfig }));
      }
    }
  }, [siteConfig]);

  // Handlers
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

  const handleSave = async () => {
    setSaving(true);
    const parsedTickets = registrationTickets.map(t => ({
      ...t,
      features: typeof t.features === 'string' ? t.features.split(',').map(f => f.trim()).filter(Boolean) : t.features
    }));

    await updateSiteConfig({
      ...siteConfig,
      eventYear,
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
        eventYear,
        tickets: parsedTickets
      },
      generalEnquiriesConfig: contactInfo
    });
    setSaving(false);
    alert('Subdomain configurations updated successfully!');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Panel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
            <Building2 className="text-[#D9762E]" /> Subdomains & Payment Gateway Control
          </h2>
          <p className="text-xs text-[#867463] dark:text-[#9CA3AF] mt-1">
            Configure payment gateways, donate micro-presets, pricing ticket tiers, and contact addresses.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#401C0C] hover:bg-[#5C2913] text-white rounded-xl text-xs font-semibold px-6 py-2.5 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all self-start sm:self-center"
        >
          <Save size={16} /> {saving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Razorpay Gateway Settings */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-serif text-lg font-bold flex items-center gap-2 text-[#401C0C] dark:text-[#F3F4F6]">
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
            Enter your official Razorpay Key ID from your Razorpay Dashboard. This key powers payments on the Donate page and Event Registration pass booking.
          </p>

          <div>
            <label className="block text-xs font-bold text-[#401C0C] dark:text-[#F3F4F6] mb-1">
              Razorpay Key ID
            </label>
            <input
              type="text"
              value={razorpayKeyId}
              onChange={(e) => setRazorpayKeyId(e.target.value)}
              placeholder="rzp_test_1234567890abcdef"
              className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-[#401C0C]"
            />
          </div>
        </div>

        {/* Donate Page Settings */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-lg font-bold flex items-center gap-2 text-[#401C0C] dark:text-[#F3F4F6]">
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
            <h4 className="font-semibold text-xs text-[#401C0C] dark:text-[#F3F4F6]">Direct Bank Transfer & UPI Settings</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#867463] mb-1">Bank Name</label>
                <input
                  type="text"
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails(prev => ({ ...prev, bankName: e.target.value }))}
                  className="w-full bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#867463] mb-1">Account Holder Name</label>
                <input
                  type="text"
                  value={bankDetails.accountName}
                  onChange={(e) => setBankDetails(prev => ({ ...prev, accountName: e.target.value }))}
                  className="w-full bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#867463] mb-1">Account Number</label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                  className="w-full bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#867463] mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={bankDetails.ifsc}
                  onChange={(e) => setBankDetails(prev => ({ ...prev, ifsc: e.target.value }))}
                  className="w-full bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#867463] mb-1">Branch</label>
                <input
                  type="text"
                  value={bankDetails.branch}
                  onChange={(e) => setBankDetails(prev => ({ ...prev, branch: e.target.value }))}
                  className="w-full bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#867463] mb-1">UPI ID</label>
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
          <h3 className="font-serif text-lg font-bold flex items-center gap-2 text-[#401C0C] dark:text-[#F3F4F6]">
            <Calendar className="text-[#C9A646]" size={20} /> Event Registration — Ticket Tiers & Pricing Pass Config
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[#F5F3EE] dark:border-[#2E302A]">
            <div>
              <label className="block text-xs font-bold text-[#401C0C] dark:text-[#F3F4F6] mb-1">
                Event Celebration Year (e.g. 2026)
              </label>
              <input
                type="text"
                value={eventYear}
                onChange={(e) => setEventYear(e.target.value)}
                placeholder="2026"
                className="w-full bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-2.5 text-xs font-semibold"
              />
            </div>
          </div>

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
          <h3 className="font-serif text-lg font-bold flex items-center gap-2 text-[#401C0C] dark:text-[#F3F4F6]">
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
    </div>
  );
};

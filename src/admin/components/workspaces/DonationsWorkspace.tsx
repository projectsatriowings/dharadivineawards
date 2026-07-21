import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Donation, SevaDomain } from '../../types';
import { 
  IndianRupee, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send, 
  Download, 
  Printer, 
  Filter, 
  Building2, 
  User, 
  ShieldCheck,
  Sparkles,
  Eye,
  XCircle
} from 'lucide-react';

export const DonationsWorkspace: React.FC = () => {
  const { donations, sendDonationReceipt, globalSearchQuery } = useApp();
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [previewReceipt, setPreviewReceipt] = useState<Donation | null>(null);

  const domains: string[] = ['all', 'Annadhanam', 'Awards Support', 'General Fund', 'Temple Heritage'];

  const filteredDonations = donations.filter(don => {
    const matchesDomain = selectedDomain === 'all' || don.seva_domain === selectedDomain;
    const matchesType = selectedType === 'all' || don.type === selectedType;
    const matchesSearch = !globalSearchQuery || 
      don.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      don.email.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      don.id.toLowerCase().includes(globalSearchQuery.toLowerCase());
    return matchesDomain && matchesType && matchesSearch;
  });

  const totalRaised = filteredDonations.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* KPI Header & Filter Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 p-6 rounded-3xl bg-gradient-to-br from-[#401C0C] to-[#5C2913] text-white shadow-xl shadow-[#401C0C]/15 flex flex-col justify-between border border-[#C9A646]/30">
          <div>
            <span className="text-xs font-semibold text-[#FFD27F] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} /> Total Ledger Balance
            </span>
            <div className="mt-2 font-serif text-3xl font-bold">
              ₹{totalRaised.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-[#EAE8E3]/80 mt-1">
              Across {filteredDonations.length} verified contributions
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span>80G Tax Exemption Ready</span>
            <span className="text-[#FFD27F]">100% Audited</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="lg:col-span-3 p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm flex flex-col justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mr-2">Seva Domain:</span>
              {domains.map(dom => (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selectedDomain === dom
                      ? 'bg-[#401C0C] dark:bg-[#FFD27F] text-white dark:text-[#401C0C] font-bold shadow-sm'
                      : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
                  }`}
                >
                  {dom === 'all' ? 'All Domains' : dom}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-[#F5F3EE] dark:bg-[#242622] p-1 rounded-xl border border-[#E4E2DD] dark:border-[#30312E]">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1 text-xs rounded-lg transition-all cursor-pointer ${selectedType === 'all' ? 'bg-white dark:bg-[#1B1C19] font-bold shadow-sm text-[#401C0C] dark:text-[#FFD27F]' : 'text-[#867463]'}`}
              >
                All Sources
              </button>
              <button
                onClick={() => setSelectedType('corporate')}
                className={`px-3 py-1 text-xs rounded-lg transition-all cursor-pointer flex items-center gap-1 ${selectedType === 'corporate' ? 'bg-white dark:bg-[#1B1C19] font-bold shadow-sm text-[#401C0C] dark:text-[#FFD27F]' : 'text-[#867463]'}`}
              >
                <Building2 size={12} /> Corporate CSR
              </button>
              <button
                onClick={() => setSelectedType('individual')}
                className={`px-3 py-1 text-xs rounded-lg transition-all cursor-pointer flex items-center gap-1 ${selectedType === 'individual' ? 'bg-white dark:bg-[#1B1C19] font-bold shadow-sm text-[#401C0C] dark:text-[#FFD27F]' : 'text-[#867463]'}`}
              >
                <User size={12} /> Individual
              </button>
            </div>
          </div>

          <div className="text-[11px] text-[#867463] dark:text-[#9CA3AF] flex items-center gap-2 font-mono">
            <ShieldCheck size={14} className="text-[#401C0C] dark:text-[#FFD27F]" />
            All receipts generated are legally compliant under Section 80G of the Income Tax Act, 1961.
          </div>
        </div>
      </div>

      {/* Financial Ledger Table */}
      <div className="rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F3EE] dark:bg-[#242622] border-b border-[#E4E2DD] dark:border-[#30312E] text-[11px] font-bold text-[#867463] dark:text-[#9CA3AF] uppercase tracking-wider">
                <th className="py-4 px-6">Transaction Ref & Date</th>
                <th className="py-4 px-4">Donor / Corporate Sponsor</th>
                <th className="py-4 px-4">Seva Domain</th>
                <th className="py-4 px-4">Sponsorship Tier</th>
                <th className="py-4 px-4">Offering Amount</th>
                <th className="py-4 px-4">80G Seva Patr Receipt</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F3EE] dark:divide-[#2E302A] text-xs">
              {filteredDonations.map(don => (
                <tr key={don.id} className="hover:bg-[#FDFBF8] dark:hover:bg-[#242622]/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-mono font-bold text-[#401C0C] dark:text-[#FFD27F]">{don.id}</div>
                    <div className="text-[10px] text-[#867463]">{don.created_at.slice(0, 10)}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {don.type === 'corporate' ? (
                        <span className="p-1 rounded bg-[#401C0C]/10 text-[#401C0C] dark:text-[#FFD27F]" title="Corporate CSR"><Building2 size={13} /></span>
                      ) : (
                        <span className="p-1 rounded bg-[#D9762E]/10 text-[#D9762E]" title="Individual Devotee"><User size={13} /></span>
                      )}
                      <div>
                        <div className="font-serif font-bold text-sm text-[#1B1C19] dark:text-[#F3F4F6]">{don.name}</div>
                        <div className="text-[11px] text-[#867463] font-mono">{don.is_anonymous ? 'Anonymous Roll' : don.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#534436] dark:text-[#D1D5DB]">{don.seva_domain}</td>
                  <td className="py-4 px-4">
                    {don.sponsorship_tier ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C9A646]/20 text-[#8A5000] dark:text-[#FFD27F] border border-[#C9A646]/30">
                        ★ {don.sponsorship_tier} Sponsor
                      </span>
                    ) : (
                      <span className="text-[#867463] font-mono text-[11px]">General Devotee</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-serif font-bold text-base text-[#1B1C19] dark:text-[#F3F4F6]">
                      ₹{don.amount.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {don.receipt_sent ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#401C0C] dark:text-[#FFD27F] bg-[#401C0C]/10 px-2.5 py-1 rounded-full">
                        <CheckCircle2 size={12} /> Emailed & E-Signed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D9762E] bg-[#D9762E]/10 px-2.5 py-1 rounded-full animate-pulse">
                        <Clock size={12} /> Pending Delivery
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => setPreviewReceipt(don)}
                      className="px-3 py-1.5 rounded-lg bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] font-semibold hover:bg-[#401C0C] hover:text-white transition-all cursor-pointer inline-flex items-center gap-1"
                    >
                      <Eye size={13} /> Seva Patr
                    </button>
                    {!don.receipt_sent && (
                      <button
                        onClick={() => sendDonationReceipt(don.id)}
                        title="Generate PDF & Email"
                        className="px-3 py-1.5 rounded-lg bg-[#401C0C] text-white font-semibold hover:bg-[#5C2913] transition-all cursor-pointer inline-flex items-center gap-1 shadow-sm"
                      >
                        <Send size={12} /> Email Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 80G Seva Patr PDF Receipt Preview Modal */}
      {previewReceipt && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FDFBF8] dark:bg-[#151613] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border-4 border-[#C9A646]/60 shadow-2xl p-8 md:p-12 relative text-[#1B1C19] dark:text-[#E5E7EB]">
            {/* Modal Close Button */}
            <button 
              onClick={() => setPreviewReceipt(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#EAE8E3] dark:bg-[#2E302A] text-[#867463] hover:text-[#1B1C19] transition-colors cursor-pointer z-10"
            >
              <XCircle size={22} />
            </button>

            {/* Receipt Header */}
            <div className="text-center space-y-2 pb-6 border-b-2 border-[#C9A646]/40">
              <div className="flex justify-center items-center gap-3.5 mb-4">
                <img 
                  src="/logo-icon-only.png" 
                  alt="Dhara Foundations" 
                  className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-105" 
                />
                <div className="text-left flex flex-col justify-center">
                  <span className="font-outfit text-2xl font-bold tracking-widest text-[#401C0C] dark:text-[#FFD27F] leading-none">
                    DHARA
                  </span>
                  <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-[#867463] dark:text-[#EAE8E3]/80 uppercase mt-1">
                    FOUNDATIONS
                  </span>
                </div>
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#D9762E]">
                Sacred Seva Patr • 80G Tax Exemption Receipt
              </p>
              <p className="text-[11px] text-[#867463] dark:text-[#9CA3AF] font-mono">
                Regd. Trust Office: Chinmaya Heritage Centre, Chennai 600031 • PAN: AAAGD1234F
              </p>
            </div>

            {/* Receipt Body */}
            <div className="py-8 space-y-6 text-sm leading-relaxed">
              <div className="flex justify-between items-center text-xs font-mono bg-[#F5F3EE] dark:bg-[#242622] p-3 rounded-xl border border-[#E4E2DD] dark:border-[#30312E]">
                <span>Receipt Number: <strong className="text-[#401C0C] dark:text-[#FFD27F]">SP-2026-{previewReceipt.id.slice(-4)}</strong></span>
                <span>Date: <strong>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</strong></span>
              </div>

              <p className="font-serif text-base text-center italic text-[#534436] dark:text-[#D1D5DB]">
                "We gratefully acknowledge the sacred financial offering received with gratitude and blessings towards our Dharmic Seva initiatives."
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-[#1B1C19] p-6 rounded-2xl border border-[#EAE8E3] dark:border-[#30312E] shadow-inner">
                <div>
                  <span className="text-[11px] text-[#867463] uppercase block">Received From (Devotee / Sponsor):</span>
                  <strong className="font-serif text-lg text-[#1B1C19] dark:text-[#F3F4F6] block mt-0.5">{previewReceipt.name}</strong>
                  <span className="text-xs text-[#867463] font-mono block">{previewReceipt.email} • {previewReceipt.phone}</span>
                  {previewReceipt.pan && <span className="text-xs font-mono text-[#401C0C] dark:text-[#FFD27F] block mt-1">PAN: {previewReceipt.pan}</span>}
                </div>

                <div className="md:text-right">
                  <span className="text-[11px] text-[#867463] uppercase block">Offering Amount:</span>
                  <div className="font-serif text-3xl font-bold text-[#401C0C] dark:text-[#FFD27F] mt-1">
                    ₹{previewReceipt.amount.toLocaleString('en-IN')}
                  </div>
                  <span className="text-xs font-semibold text-[#D9762E] block mt-1">
                    Domain: {previewReceipt.seva_domain}
                  </span>
                  {previewReceipt.sponsorship_tier && (
                    <span className="text-xs font-bold text-[#8A5000] dark:text-[#FFD27F] block">
                      Tier: {previewReceipt.sponsorship_tier} Partnership
                    </span>
                  )}
                </div>
              </div>

              <div className="text-xs text-[#867463] dark:text-[#9CA3AF] space-y-2 bg-[#FDFBF8] dark:bg-[#242622]/40 p-4 rounded-xl border border-dashed border-[#C9A646]/40">
                <p><strong>Tax Benefit Note:</strong> Donations to Dhara Foundations are exempt under Section 80G(5)(vi) of the Income Tax Act, 1961 vide Order No. CIT(E)/80G/2026-27/108.</p>
                <p>This is a computer-generated receipt electronically signed by the Chief Managing Trustee. No physical signature is required.</p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-6 border-t border-[#EAE8E3] dark:border-[#30312E] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-[#401C0C] dark:text-[#FFD27F] flex items-center gap-1.5 font-bold">
                <ShieldCheck size={16} /> Verified & Digitally Signed
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => alert("Simulated Printing: Triggering window.print() for high-resolution certificate output.")}
                  className="px-4 py-2 rounded-xl bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] font-semibold text-xs hover:bg-[#EAE8E3] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer size={14} /> Print Receipt
                </button>
                <button
                  onClick={() => {
                    sendDonationReceipt(previewReceipt.id);
                    setPreviewReceipt(prev => prev ? { ...prev, receipt_sent: true } : null);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#401C0C] text-white font-semibold text-xs hover:bg-[#5C2913] transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send size={14} /> {previewReceipt.receipt_sent ? 'Re-send PDF Email' : 'Email PDF Receipt'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

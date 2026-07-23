import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Share2, Sparkles, Home, Printer, Heart, Ticket, Award, MessageSquare, Landmark, Clock, Calendar, ShieldCheck } from 'lucide-react';

export default function ThankYouPage({ siteConfig }) {
  const eventYear = siteConfig?.eventYear || siteConfig?.eventRegConfig?.eventYear || '2026';
  const location = useLocation();
  const navigate = useNavigate();

  // Load state payload passed from nomination/enquiry/registration redirection
  const successData = location.state || {
    title: 'Submission Received',
    message: 'Namaste. Your submission has been successfully received by Dhara Foundations. Thank you for participating in our mission of Seva and culture preservation.',
    details: [
      { label: 'Platform', value: `Dhara Divine Awards ${eventYear}` },
      { label: 'Status', value: 'Completed' }
    ]
  };

  const isDonation = 
    successData.title?.toLowerCase().includes('contribution') || 
    successData.title?.toLowerCase().includes('donor') || 
    successData.title?.toLowerCase().includes('sponsor') ||
    successData.title?.toLowerCase().includes('giving') ||
    successData.details?.some(d => d.label.toLowerCase().includes('amount') || d.label.toLowerCase().includes('contribution'));

  const isTicket = 
    successData.title?.toLowerCase().includes('registration') || 
    successData.title?.toLowerCase().includes('ticket') || 
    successData.title?.toLowerCase().includes('booking') ||
    successData.details?.some(d => d.label.toLowerCase().includes('pass') || d.label.toLowerCase().includes('ticket'));

  const isNomination = 
    successData.title?.toLowerCase().includes('nomination') ||
    successData.details?.some(d => d.label.toLowerCase().includes('nominee'));

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
  const shareText = encodeURIComponent(`I just participated in the Dhara Foundations Divine Awards ${eventYear}! Join this celebration of selfless service.`);
  const shareUrl = encodeURIComponent("https://dharafoundations.in");

  // Get current date formatted
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="py-16 px-6 md:px-12 max-w-3xl mx-auto w-full print:py-4">
      {/* Premium Outer container with warm shadow */}
      <div className="bg-[#FFFEFB] rounded-[36px] border-2 border-[#C9A646]/70 p-6 md:p-10 shadow-2xl relative overflow-hidden animate-scale-in print:border-0 print:shadow-none print:p-0">
        
        {/* Decorative background glows */}
        <div className="absolute -right-10 -top-10 w-44 h-44 bg-amber-100/60 rounded-full filter blur-3xl opacity-60 pointer-events-none print:hidden"></div>
        <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-[#401C0C]/10 rounded-full filter blur-3xl opacity-50 pointer-events-none print:hidden"></div>

        {/* Global Header */}
        <div className="text-center mb-8 print:mb-4">
          <div className="flex justify-center mb-5 print:mb-3">
            <div className="bg-[#401C0C] px-6 py-3 rounded-2xl shadow-sm inline-flex items-center justify-center">
              <img 
                src="/logo/New logo.png" 
                alt="Dhara Foundations" 
                className="h-12 w-auto object-contain" 
              />
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#D9762E] uppercase tracking-[4px] block mb-1">
            Sankalpa Completed
          </span>
          <h2 className="text-3xl font-serif text-[#1F2318] font-bold">
            {isDonation ? 'Devotional Seva Acknowledged' : isTicket ? 'Event Pass Generated' : 'Submission Received'}
          </h2>
          <div className="w-16 h-0.5 bg-[#C9A646]/50 mx-auto mt-2 rounded-full print:hidden"></div>
        </div>

        {/* 1. DYNAMIC RENDER BLOCK: DONATION CERTIFICATE */}
        {isDonation && (
          <div className="relative border-4 border-double border-[#C9A646]/60 bg-[#FDFBF8] rounded-2xl p-6 md:p-8 space-y-6 text-center shadow-inner print:border-2 print:shadow-none">
            {/* Saffron Corner details */}
            <div className="absolute top-2 left-2 text-[#C9A646] font-mono text-[9px] print:hidden">DHARA</div>
            <div className="absolute top-2 right-2 text-[#C9A646] font-mono text-[9px] print:hidden">ESTD 2024</div>
            
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6 text-[#D9762E] fill-current" />
            </div>

            <div className="space-y-2">
              <span className="font-serif italic text-neutral-400 text-sm">Certificate of Devotional offering</span>
              <h3 className="text-xl font-serif text-[#0E3A2F] font-bold">Seva Patr</h3>
              <p className="text-[11px] text-neutral-500 font-sans max-w-md mx-auto leading-relaxed">
                With sincere appreciation, Dhara Foundations acknowledges the contribution towards our cultural and social programs.
              </p>
            </div>

            {/* Receipt Parameters Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto border-y border-neutral-200/60 py-4 font-sans text-xs">
              <div className="text-left space-y-3 pl-2">
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">Donor / Sponsor</span>
                  <span className="font-bold text-[#0E3A2F] font-serif text-sm">
                    {successData.details?.find(d => d.label.toLowerCase().includes('donor') || d.label.toLowerCase().includes('nominator'))?.value || 'Devotee of Seva'}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">Receipt Date</span>
                  <span className="font-bold text-neutral-700">{currentDate}</span>
                </div>
              </div>

              <div className="text-right space-y-3 pr-2 border-l border-neutral-200/60 pl-4">
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">Contribution Amount</span>
                  <span className="font-bold text-[#C9A646] font-serif text-base">
                    {successData.details?.find(d => d.label.toLowerCase().includes('amount'))?.value || 'Generous Support'}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold tracking-wider">Exemption Eligibility</span>
                  <span className="inline-flex items-center gap-1 font-bold text-[#401C0C] bg-[#401C0C]/10 px-2 py-0.5 rounded-full text-[9px] border border-[#401C0C]/20">
                    <ShieldCheck className="w-3 h-3" />
                    80G Approved
                  </span>
                </div>
              </div>
            </div>

            {/* Official seal image details */}
            <div className="flex items-center justify-between max-w-md mx-auto pt-2 font-mono text-[9px] text-neutral-400">
              <div className="text-left">
                <span>NGO REG NO: IV 126/2024</span>
                <span className="block">12A EXEMPT: AAETD8857AE20241</span>
              </div>
              <div className="text-right">
                <span className="block border-t border-neutral-300 pt-1 font-serif italic text-neutral-600 font-bold">Dhara Foundations Seva Desk</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. DYNAMIC RENDER BLOCK: EVENT PASS TICKET */}
        {isTicket && (
          <div className="relative border border-[#D9CBB0] bg-white rounded-3xl p-6 md:p-8 space-y-5 shadow-sm overflow-hidden flex flex-col md:flex-row justify-between items-stretch">
            
            {/* Ticket Left Notch */}
            <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-[#FFFEFB] border border-[#D9CBB0] -translate-y-1/2 pointer-events-none hidden md:block"></div>
            {/* Ticket Right Notch */}
            <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-[#FFFEFB] border border-[#D9CBB0] -translate-y-1/2 pointer-events-none hidden md:block"></div>

            <div className="flex-1 flex flex-col justify-between space-y-6 md:pr-6 md:border-r md:border-dashed md:border-neutral-200">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-[9px] font-mono text-[#D9762E] font-bold uppercase tracking-wider">
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Official Delegate Entry Pass</span>
                </div>
                <h3 className="text-lg font-serif text-[#0E3A2F] font-bold">Dhara Divine Awards {eventYear}</h3>
              </div>

              {/* Delegate details grid */}
              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="text-neutral-400 block text-[9px] uppercase font-bold tracking-wider">Attendee</span>
                  <span className="font-bold text-[#0E3A2F]">
                    {successData.details?.find(d => d.label.toLowerCase().includes('attendee'))?.value || 'Registered Delegate'}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[9px] uppercase font-bold tracking-wider">Seating Tier</span>
                  <span className="font-bold text-[#C9A646] uppercase">
                    {successData.details?.find(d => d.label.toLowerCase().includes('pass'))?.value || 'Standard Delegate'}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[9px] uppercase font-bold tracking-wider">Date &amp; Timing</span>
                  <span className="font-bold text-neutral-700 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    Jan 24, 2025
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[9px] uppercase font-bold tracking-wider">Venue Location</span>
                  <span className="font-bold text-neutral-700 flex items-center gap-1 mt-0.5">
                    <Landmark className="w-3.5 h-3.5 text-neutral-400" />
                    Chetpet, Chennai
                  </span>
                </div>
              </div>
            </div>

            {/* Barcode and gate summary (Right stub) */}
            <div className="md:w-36 flex flex-col justify-between items-center pt-6 md:pt-0 md:pl-6 text-center">
              <div className="space-y-1 font-sans">
                <span className="text-neutral-400 block text-[9px] uppercase font-bold tracking-wider">Gate Open</span>
                <span className="font-mono text-xs font-bold text-neutral-700 flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[var(--color-saffron-glow-dark)]" />
                  04:30 PM
                </span>
              </div>

              {/* Barcode representation */}
              <div className="w-full flex flex-col items-center gap-1.5 mt-4">
                <div className="flex h-10 w-full items-stretch justify-center gap-0.5 bg-white">
                  <div className="w-1.5 bg-black"></div>
                  <div className="w-0.5 bg-black"></div>
                  <div className="w-1 bg-black"></div>
                  <div className="w-0.5 bg-black"></div>
                  <div className="w-1.5 bg-black"></div>
                  <div className="w-0.5 bg-black"></div>
                  <div className="w-2 bg-black"></div>
                  <div className="w-0.5 bg-black"></div>
                  <div className="w-1 bg-black"></div>
                  <div className="w-1.5 bg-black"></div>
                  <div className="w-0.5 bg-black"></div>
                  <div className="w-1 bg-black"></div>
                  <div className="w-2 bg-black"></div>
                </div>
                <span className="font-mono text-[8px] tracking-[3px] text-neutral-400 uppercase">
                  DDA-2025-REG
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3. DYNAMIC RENDER BLOCK: AWARD NOMINATION TICKET */}
        {isNomination && (
          <div className="relative border border-[#D9CBB0]/60 bg-[#FDFBF7] rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-[var(--color-deep-forest-dark)] font-serif border-b border-[#D9CBB0]/30 pb-2 mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--color-saffron-glow)]" />
              Nomination Receipt
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="space-y-3">
                <div>
                  <span className="text-neutral-400 block text-[9px] uppercase font-bold tracking-wider">Candidate / Nominee</span>
                  <span className="font-bold text-[#0E3A2F] text-sm">
                    {successData.details?.find(d => d.label.toLowerCase().includes('nominee'))?.value || 'Selected Seva Practitioner'}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[9px] uppercase font-bold tracking-wider">Nominated Category</span>
                  <span className="font-bold text-neutral-700 bg-amber-50 border border-amber-100 text-[10px] px-2.5 py-0.5 rounded-full inline-block mt-0.5">
                    {successData.details?.find(d => d.label.toLowerCase().includes('category'))?.value || 'General Recognition'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 border-t md:border-t-0 md:border-l border-neutral-200/60 pt-3 md:pt-0 md:pl-4">
                <div>
                  <span className="text-neutral-400 block text-[9px] uppercase font-bold tracking-wider">Nominator</span>
                  <span className="font-bold text-neutral-700">
                    {successData.details?.find(d => d.label.toLowerCase().includes('nominator'))?.value || 'Individual Reference'}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[9px] uppercase font-bold tracking-wider">Felicitation status</span>
                  <span className="font-bold text-[#401C0C] block mt-0.5">Under Committee Review</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. DYNAMIC RENDER BLOCK: GENERAL MESSAGE */}
        {!isDonation && !isTicket && !isNomination && (
          <div className="relative border border-[#D9CBB0]/60 bg-white rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-[var(--color-deep-forest-dark)] font-serif border-b border-[#D9CBB0]/30 pb-2 mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[var(--color-saffron-glow)]" />
              Submission Details
            </h3>

            <div className="space-y-2.5 text-xs font-sans">
              {successData.details?.map((detail, idx) => (
                <div key={idx} className="flex justify-between border-b border-neutral-50 pb-2 last:border-0 last:pb-0">
                  <span className="text-neutral-400 font-bold">{detail.label}</span>
                  <span className="font-bold text-[var(--color-deep-forest-dark)]">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirmation Message */}
        <div className="mt-8 text-center text-xs font-sans text-neutral-500 leading-relaxed max-w-lg mx-auto bg-neutral-50 p-4 rounded-2xl border border-neutral-100 print:hidden">
          {successData.message}
        </div>

        {/* Scripture Quote (Gita) Card */}
        <div className="border-y border-neutral-100 py-6 my-8 text-center print:border-y-0 print:my-4 print:py-2">
          <span className="text-[10px] font-mono text-[#C9A646] font-bold uppercase tracking-[2px] block mb-2">
            Gita Seva Sankalpa
          </span>
          <p className="text-sm text-[#0E3A2F] font-serif italic max-w-xl mx-auto leading-relaxed">
            "{randomQuote.quote}"
          </p>
          <p className="text-[10px] text-neutral-400 font-sans mt-2 max-w-lg mx-auto leading-relaxed">
            {randomQuote.translation}
          </p>
        </div>

        {/* CTAs / Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-neutral-100 print:hidden">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-neutral-400 font-sans flex items-center">
              <Share2 className="w-4 h-4 mr-1" />
              Share on:
            </span>
            
            <a 
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white border border-neutral-200 hover:border-blue-400 text-neutral-600 hover:text-blue-400 transition-all duration-200 shadow-sm flex items-center justify-center"
              aria-label="Share on X"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white border border-neutral-200 hover:border-blue-700 text-neutral-600 hover:text-blue-700 transition-all duration-200 shadow-sm flex items-center justify-center"
              aria-label="Share on Facebook"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-4 py-2.5 border border-[#C9A646]/60 hover:bg-[#C9A646]/5 text-[#C9A646] font-bold rounded-xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Acknowledgment</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-5 py-2.5 bg-[var(--color-deep-forest)] hover:opacity-90 text-white font-bold rounded-xl shadow-md transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

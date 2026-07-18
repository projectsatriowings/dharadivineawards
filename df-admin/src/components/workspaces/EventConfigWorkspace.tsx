"use client";

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, Ticket, Award } from 'lucide-react';

export const EventConfigWorkspace: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useApp();
  
  const [eventYear, setEventYear] = useState('2026');
  const [registrationTickets, setRegistrationTickets] = useState([
    { 
      id: 'delegate', 
      name: 'Delegate Pass', 
      price: '₹1,500', 
      description: 'Access to main awards ceremony and youth plenary sessions.', 
      features: 'Seva Pass Entry, Satvik Dinner, Preferred Seating, Delegate Kit, Networking Access, Event Souvenir' 
    },
    { 
      id: 'premium', 
      name: 'Premium Delegate', 
      price: '₹3,000', 
      description: 'Full delegate access to the awards, exhibitions, and networking lounge.', 
      features: 'Premium Row Seating, Satvik Dinner, Souvenir Kit, Priority Registration, Recorded Sessions, Networking Access, Event Souvenir' 
    },
    { 
      id: 'patron', 
      name: 'Patron Pass', 
      price: '₹5,000', 
      description: 'Exclusive access to VIP networking, front-row seating, and private dinner.', 
      features: 'Reserved VIP Seating, Satvik Dinner, Meet & Greet with Dignitaries, Networking Access, Event Souvenir' 
    }
  ]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (siteConfig) {
      if (siteConfig.eventYear) setEventYear(siteConfig.eventYear);
      if (siteConfig.registrationTickets && siteConfig.registrationTickets.length === 3) {
        setRegistrationTickets(siteConfig.registrationTickets.map((t: any) => ({
          ...t,
          features: Array.isArray(t.features) ? t.features.join(', ') : (t.features || '')
        })));
      }
    }
  }, [siteConfig]);

  const handleTicketChange = (index: number, field: string, value: string) => {
    const newTickets = [...registrationTickets];
    newTickets[index] = { ...newTickets[index], [field]: value };
    setRegistrationTickets(newTickets);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSiteConfig({
      ...siteConfig,
      eventYear,
      registrationTickets: registrationTickets.map(t => ({
        ...t,
        features: t.features.split(',').map((f: string) => f.trim()).filter((f: string) => f)
      }))
    });
    setSaving(false);
    alert('Event Config saved successfully!');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Panel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
          <Ticket className="text-[#D9762E]" /> Passes & Pricing
        </h2>
        <p className="text-xs text-[#867463] dark:text-[#9CA3AF] mt-1">
          Configure the public event registration pricing tiers and event year.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm">
          <label className="block text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mb-1.5">
            Event Year
          </label>
          <input
            type="text"
            value={eventYear}
            onChange={(e) => setEventYear(e.target.value)}
            placeholder="e.g. 2026"
            className="w-full max-w-sm bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#E4E2DD] dark:border-[#30312E] rounded-xl p-3 text-sm focus:outline-none focus:border-[#401C0C]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {registrationTickets.map((ticket, index) => (
            <div key={ticket.id} className={`rounded-3xl p-6 transition-all duration-300 ease-in-out border flex flex-col justify-between shadow-sm ${
              index === 1 
                ? 'bg-[#401C0C] text-white border-[#D9762E]' 
                : 'bg-white dark:bg-[#1B1C19] text-[#1B1C19] dark:text-[#F3F4F6] border-[#EAE8E3] dark:border-[#30312E]'
            }`}>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    index === 1 ? 'bg-[#D9762E] text-[#401C0C]' : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#867463]'
                  }`}>
                    {ticket.id === 'patron' ? 'Exclusive' : 'Access'}
                  </span>
                  <input 
                    type="text" 
                    value={ticket.price}
                    onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                    className={`text-2xl font-serif font-bold text-right w-28 bg-transparent border-b border-transparent focus:outline-none ${
                      index === 1 ? 'text-[#D9762E] focus:border-[#D9762E]' : 'text-[#401C0C] dark:text-[#D9762E] focus:border-[#401C0C]'
                    }`}
                  />
                </div>
                
                <input 
                  type="text"
                  value={ticket.name}
                  onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                  className={`text-xl font-serif font-bold mb-2 w-full bg-transparent border-b border-transparent focus:outline-none ${
                    index === 1 ? 'text-white focus:border-white' : 'text-[#401C0C] dark:text-[#F3F4F6] focus:border-[#401C0C]'
                  }`}
                />
                
                <textarea
                  value={ticket.description}
                  onChange={(e) => handleTicketChange(index, 'description', e.target.value)}
                  rows={2}
                  className={`text-sm mb-6 w-full bg-transparent border-b border-transparent focus:outline-none resize-none ${
                    index === 1 ? 'text-neutral-300 focus:border-white' : 'text-[#867463] dark:text-[#9CA3AF] focus:border-[#401C0C]'
                  }`}
                />
                
                <div className="mb-4">
                  <ul className="space-y-3">
                    {(ticket.features ? ticket.features.split(',') : []).map((f: string, i: number) => (
                      f.trim() ? (
                        <li key={i} className="flex items-start text-sm">
                          <Award className={`w-4 h-4 mr-2 mt-0.5 shrink-0 ${index === 1 ? 'text-[#D9762E]' : 'text-[#401C0C] dark:text-[#D9762E]'}`} />
                          <span className={index === 1 ? 'text-neutral-200' : 'text-[#1B1C19] dark:text-[#9CA3AF]'}>{f.trim()}</span>
                        </li>
                      ) : null
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                  <label className={`block text-[10px] uppercase font-bold mb-2 ${index === 1 ? 'text-neutral-300' : 'text-[#867463]'}`}>
                    Edit Features (Comma Separated)
                  </label>
                  <textarea
                    value={ticket.features}
                    onChange={(e) => handleTicketChange(index, 'features', e.target.value)}
                    rows={4}
                    className={`w-full text-xs rounded-xl p-3 focus:outline-none resize-none shadow-inner ${
                      index === 1 
                        ? 'bg-black/20 text-white border border-transparent focus:border-[#D9762E]' 
                        : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] border border-[#EAE8E3] dark:border-[#30312E] focus:border-[#401C0C]'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#401C0C] hover:bg-[#5C2913] text-white rounded-xl text-sm font-semibold px-8 py-3 flex items-center gap-2 cursor-pointer shadow-sm transition-all"
        >
          <Save size={18} /> {saving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>
    </div>
  );
};

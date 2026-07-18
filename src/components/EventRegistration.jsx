import React, { useState } from 'react';
import { Ticket, User, Mail, Phone, Building, ArrowRight, Award } from 'lucide-react';
import { submitForm } from '../utils/api';

export default function EventRegistration({ onSubmitSuccess, siteConfig }) {
  const [ticketType, setTicketType] = useState('premium');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    interest: 'Temple administration',
    specialNotes: '',
    consentTerms: false,
    consentPhoto: false,
    consentUpdates: false
  });

  const eventYear = siteConfig?.eventYear || '2026';
  const tickets = (siteConfig?.registrationTickets && siteConfig.registrationTickets.length === 3)
    ? siteConfig.registrationTickets
    : [
        {
          id: 'delegate',
          name: 'Delegate Pass',
          price: '₹1,500',
          description: 'Access to main awards ceremony and youth plenary sessions.',
          features: ['Seva Pass Entry', 'Satvik Dinner', 'Preferred Seating', 'Delegate Kit', 'Networking Access', 'Event Souvenir']
        },
        {
          id: 'premium',
          name: 'Premium Delegate',
          price: '₹3,000',
          description: 'Full delegate access to the awards, exhibitions, and networking lounge.',
          features: ['Premium Row Seating', 'Satvik Dinner', 'Souvenir Kit', 'Priority Registration', 'Recorded Sessions', 'Networking Access', 'Event Souvenir']
        },
        {
          id: 'patron',
          name: 'Patron Pass',
          price: '₹5,000',
          description: 'Exclusive access to VIP networking, front-row seating, and private dinner.',
          features: ['Reserved VIP Seating', 'Satvik Dinner', 'Meet & Greet with Dignitaries', 'Networking Access', 'Event Souvenir']
        }
      ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    const submission = {
      ...formData,
      ticketType: tickets.find(t => t.id === ticketType).name,
    };
    
    submitForm('Event Registration', submission);

    onSubmitSuccess({
      title: 'Registration Confirmed',
      message: `Namaste, ${formData.name}. Your presence is gracefully registered for the Divine Awards ${eventYear} under the ${tickets.find(t => t.id === ticketType).name} tier. We look forward to hosting you in this sacred celebration of selfless service.`,
      details: [
        { label: 'Attendee', value: formData.name },
        { label: 'Pass Type', value: tickets.find(t => t.id === ticketType).name },
        { label: 'Area of Interest', value: formData.interest }
      ]
    });
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-sun-gold font-semibold uppercase tracking-wider text-sm font-sans">Divine Awards {eventYear}</span>
        <h2 className="text-4xl font-serif text-forest-teal-dark mt-2 mb-4">Event Registration</h2>
        <p className="text-neutral-600 max-w-2xl mx-auto font-sans">
          Join us in honoring outstanding contributions to society and spiritual evolution. Select your attendance category below to secure your seat.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {tickets.map((t) => (
          <div
            key={t.id}
            onClick={() => setTicketType(t.id)}
            className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 ease-in-out border flex flex-col justify-between ${
              ticketType === t.id
                ? 'bg-forest-teal text-white border-sun-gold shadow-premium-hover scale-102'
                : 'bg-white text-neutral-800 border-neutral-100 shadow-premium hover:border-forest-teal-light'
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                  ticketType === t.id ? 'bg-sun-gold text-forest-teal-dark font-sans' : 'bg-soft-sage text-forest-teal font-sans'
                }`}>
                  {t.id === 'patron' ? 'Exclusive' : 'Access'}
                </span>
                <span className={`text-2xl font-serif font-bold ${ticketType === t.id ? 'text-sun-gold' : 'text-forest-teal'}`}>
                  {t.price}
                </span>
              </div>
              <h3 className={`text-xl font-serif font-bold mb-2 ${ticketType === t.id ? 'text-white' : 'text-forest-teal-dark'}`}>{t.name}</h3>
              <p className={`text-sm mb-6 ${ticketType === t.id ? 'text-neutral-100' : 'text-neutral-500'}`}>
                {t.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {t.features.map((f, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Award className={`w-4 h-4 mr-2 shrink-0 ${ticketType === t.id ? 'text-sun-gold' : 'text-forest-teal'}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={`w-full py-2.5 rounded-xl font-sans text-center text-sm font-semibold transition-colors duration-300 ${
              ticketType === t.id 
                ? 'bg-sun-gold text-forest-teal-dark hover:bg-white hover:text-forest-teal-dark' 
                : 'bg-soft-sage text-forest-teal hover:bg-forest-teal hover:text-white'
            }`}>
              Select Pass
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-neutral-100 shadow-premium p-8 max-w-3xl mx-auto">
        <div className="flex items-center space-x-3 mb-6 border-b border-neutral-100 pb-4">
          <Ticket className="text-sun-gold w-6 h-6" />
          <h3 className="text-xl font-serif text-forest-teal-dark">Attendee Details</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-forest-teal-dark mb-2">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Sri Anand Rao"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-forest-teal focus:border-transparent transition-all duration-300 text-sm font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-forest-teal-dark mb-2">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="anand@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-forest-teal focus:border-transparent transition-all duration-300 text-sm font-sans"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-forest-teal-dark mb-2">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-forest-teal focus:border-transparent transition-all duration-300 text-sm font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-forest-teal-dark mb-2">Organization / Affiliation and Address</label>
              <div className="relative">
                <Building className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  name="organization"
                  placeholder="Dhara Seva Mandir"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-forest-teal focus:border-transparent transition-all duration-300 text-sm font-sans"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-forest-teal-dark mb-2">Areas of Interest</label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-forest-teal focus:border-transparent transition-all duration-300 text-sm font-sans bg-white"
              >
                <option value="Temple administration">Temple administration</option>
                <option value="Culture">Culture</option>
                <option value="Education">Education</option>
                <option value="Social Service">Social Service</option>
                <option value="Spirituality">Spirituality</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-forest-teal-dark mb-2">Special Requirements / Notes</label>
              <input
                type="text"
                name="specialNotes"
                placeholder="Wheelchair access, dietary allergy notes..."
                value={formData.specialNotes}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-forest-teal focus:border-transparent transition-all duration-300 text-sm font-sans"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" name="consentTerms" checked={formData.consentTerms} onChange={handleChange} className="mt-1 w-4 h-4 text-forest-teal rounded border-neutral-300 focus:ring-forest-teal cursor-pointer" />
              <span className="text-sm text-neutral-600 font-sans">Consent : Agree to terms and conditions</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" name="consentPhoto" checked={formData.consentPhoto} onChange={handleChange} className="mt-1 w-4 h-4 text-forest-teal rounded border-neutral-300 focus:ring-forest-teal cursor-pointer" />
              <span className="text-sm text-neutral-600 font-sans">Consent for Photography and Videography</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" name="consentUpdates" checked={formData.consentUpdates} onChange={handleChange} className="mt-1 w-4 h-4 text-forest-teal rounded border-neutral-300 focus:ring-forest-teal cursor-pointer" />
              <span className="text-sm text-neutral-600 font-sans">Consent to receive updates</span>
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!(formData.consentTerms && formData.consentPhoto && formData.consentUpdates)}
              className={`w-full py-4 rounded-xl font-sans font-bold text-base transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 border-2 shadow-lg ${
                (formData.consentTerms && formData.consentPhoto && formData.consentUpdates)
                  ? 'bg-gradient-to-r from-[var(--color-saffron-glow)] to-[var(--color-saffron-glow-dark)] text-[#281006] hover:brightness-105 border-transparent hover:border-[#281006] cursor-pointer group hover:shadow-xl hover:-translate-y-0.5'
                  : 'bg-neutral-200 text-neutral-400 border-transparent cursor-not-allowed opacity-75'
              }`}
            >
              <span>Confirm & Register</span>
              <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                (formData.consentTerms && formData.consentPhoto && formData.consentUpdates) ? 'group-hover:translate-x-1' : ''
              }`} />
            </button>
            <p className="text-center text-xs text-neutral-400 mt-3 font-sans">
              By registering, you agree to abide by the spiritual and social decorum of Dhara Foundations during the awards.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

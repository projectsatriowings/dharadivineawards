import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { submitForm } from '../utils/api';

export default function GeneralEnquiries({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    const submission = {
      senderName: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject === 'general' ? 'General Query' : formData.subject === 'media' ? 'Media Press Pass' : 'CSR Partnership',
      message: formData.message,
      type: formData.subject === 'general' ? 'general' : formData.subject === 'media' ? 'media' : 'sponsorship_enquiry',
    };

    submitForm('General Enquiries', submission);

    onSubmitSuccess({
      title: 'Enquiry Received Successfully',
      message: `Namaste, ${formData.name}. Thank you for contacting Dhara Foundations. We have registered your enquiry regarding "${formData.subject.toUpperCase()}". Our support coordinators will review your query and respond to you at ${formData.email} within 24 business hours.`,
      details: [
        { label: 'Name', value: formData.name },
        { label: 'Subject Category', value: formData.subject.toUpperCase() },
        { label: 'Email Address', value: formData.email }
      ]
    });
  };

  const handleWhatsApp = () => {
    const phone = '919900000000'; // Mock corporate number
    const text = encodeURIComponent("Namaste Dhara Foundations, I would like to enquire about the Divine Awards 2025 event details, seating, or sponsorships.");
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-sun-gold font-semibold uppercase tracking-wider text-sm font-sans">Contact Our Team</span>
        <h2 className="text-4xl font-serif text-forest-teal-dark mt-2 mb-4">General Event Enquiries</h2>
        <p className="text-neutral-600 max-w-2xl mx-auto font-sans">
          Have questions about the venue, seating arrangements, timings, or transport? Reach out to us through the form or chat with us instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-premium">
            <h3 className="text-xl font-serif text-forest-teal-dark mb-6 pb-2 border-b border-neutral-100">
              Contact Directory
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-soft-sage text-forest-teal shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-sans">Office Address</h4>
                  <p className="text-sm font-sans text-neutral-700 mt-1 leading-relaxed">
                    Dhara Foundations HQ,<br />
                    # 44A, 3rd Street, Judge Colony, Tambaram Sanatorium,<br />
                    Chennai, Tamil Nadu - 600047
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-soft-sage text-forest-teal shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-sans mb-1">Email Us</h4>
                  <a href="mailto:info@dharafoundations.in" className="text-sm font-sans text-neutral-700 hover:text-forest-teal font-semibold block mt-1 transition-colors">
                    info@dharafoundations.in
                  </a>
                  <a href="mailto:president@dharafoundations.in" className="text-sm font-sans text-neutral-700 hover:text-forest-teal font-semibold block mt-1.5 transition-colors">
                    president@dharafoundations.in
                  </a>
                  <a href="mailto:trustee@dharafoundations.in" className="text-sm font-sans text-neutral-700 hover:text-forest-teal font-semibold block mt-1.5 transition-colors">
                    trustee@dharafoundations.in
                  </a>
                  <a href="mailto:dharafoundationsindia@gmail.com" className="text-sm font-sans text-neutral-700 hover:text-forest-teal font-semibold block mt-1.5 transition-colors">
                    dharafoundationsindia@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-soft-sage text-forest-teal shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-sans">Call Desk</h4>
                  <a href="tel:04422236641" className="text-sm font-sans text-neutral-700 hover:text-forest-teal mt-1 block font-semibold">
                    044-22236641
                  </a>
                  <p className="text-[10px] text-neutral-500 font-sans mt-0.5">Mon - Sat, 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-3xl border border-neutral-100 shadow-premium p-8">
          <h3 className="text-2xl font-serif text-forest-teal-dark mb-6 pb-2 border-b border-neutral-100 flex items-center">
            <Send className="w-5 h-5 text-sun-gold mr-2" />
            Send a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest-teal mb-2 font-sans">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-forest-teal text-sm font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest-teal mb-2 font-sans">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="E-mail Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-forest-teal text-sm font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest-teal mb-2 font-sans">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-forest-teal text-sm font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest-teal mb-2 font-sans">Subject Area</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-forest-teal text-sm font-sans bg-white"
                >
                  <option value="general">General Event Query</option>
                  <option value="seating">Invitations & Seating</option>
                  <option value="accommodation">Accommodation & Stay</option>
                  <option value="media">Media & Press Kit</option>
                  <option value="other">Other Enquiries</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-forest-teal mb-2 font-sans">Your Message *</label>
              <textarea
                name="message"
                required
                rows="5"
                placeholder="Write your query in detail here. If it is relating to accommodation, please mention your expected travel dates..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-forest-teal text-sm font-sans"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-saffron-glow)] to-[var(--color-saffron-glow-dark)] text-[#281006] hover:brightness-105 font-sans font-bold text-base transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 border-2 border-transparent hover:border-[#281006] cursor-pointer group shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Send Enquiry</span>
                <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

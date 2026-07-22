import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, Mail, Phone, User, Landmark, Sparkles, Gift, CreditCard, Lock, Loader2 } from 'lucide-react';
import { submitForm, createRazorpayOrder, verifyRazorpayPayment } from '../utils/api';
import { openRazorpayCheckout } from '../utils/razorpay';

export default function DonorSupport({ onSubmitSuccess, siteConfig }) {
  const [amountType, setAmountType] = useState('preset');
  const [selectedPreset, setSelectedPreset] = useState('1008');
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
    anonymous: false
  });

  const presets = siteConfig?.donorConfig?.presets && siteConfig.donorConfig.presets.length > 0
    ? siteConfig.donorConfig.presets
    : [
        {
          id: '510',
          amount: '510',
          label: '₹510',
          impact: 'Meal Seva',
          desc: 'Sponsor pure Sattvic meals and sacred prasad for a student delegate during the entire event.'
        },
        {
          id: '1008',
          amount: '1008',
          label: '₹1,008',
          impact: 'Sevak Support',
          desc: 'Sponsor event souvenir kit, green handbook, and transport support for a dedicated volunteer.'
        },
        {
          id: '5001',
          amount: '5001',
          label: '₹5,001',
          impact: 'Kala Seva',
          desc: 'Sponsor travel and honorarium for a traditional musician/folk artist performing at the cultural gala.'
        },
        {
          id: '10008',
          amount: '10008',
          label: '₹10,008',
          impact: 'Nominee Seva',
          desc: 'Sponsor a grassroots social worker nominee’s round-trip travel, stay, and reception costs.'
        }
      ];

  const bankDetails = siteConfig?.donorConfig?.bankDetails || {
    bankName: 'HDFC Bank',
    accountName: 'Dhara Foundations',
    accountNumber: '50200012345678',
    ifsc: 'HDFC0001234',
    branch: 'Chennai Main Branch',
    upiId: 'dharafoundations@hdfcbank'
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setFormData(prev => ({ ...prev, anonymous: !prev.anonymous }));
  };

  const getFinalAmount = () => {
    if (amountType === 'preset') {
      const presetObj = presets.find(p => p.amount === selectedPreset);
      return presetObj ? presetObj.amount : (presets[0]?.amount || '501');
    }
    return customAmount || '0';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donationValue = parseFloat(getFinalAmount());
    if (donationValue <= 0) {
      alert('Please select or input a valid donation amount.');
      return;
    }
    if (!formData.anonymous && (!formData.name || !formData.email || !formData.phone)) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Create Razorpay Order
      const orderRes = await createRazorpayOrder({
        amount: donationValue,
        currency: 'INR',
        receipt: `rcpt_don_${Date.now()}`,
        notes: {
          donor_name: formData.name || 'Anonymous',
          email: formData.email,
          pan: formData.pan
        }
      });

      if (!orderRes.success && !orderRes.order_id) {
        throw new Error(orderRes.error || 'Failed to initialize payment gateway order');
      }

      // Step 2: Open Razorpay Checkout Modal
      const displayName = formData.anonymous ? 'Anonymous Donor' : formData.name;

      const envKey = import.meta.env.VITE_RAZORPAY_KEY_ID || import.meta.env.RAZORPAY_KEY_ID || import.meta.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      const activeKey = (envKey && envKey.trim())
        ? envKey.trim()
        : (siteConfig?.razorpayConfig?.keyId || siteConfig?.donorConfig?.razorpayKeyId || orderRes.key_id);

      openRazorpayCheckout({
        key_id: activeKey,
        order_id: orderRes.order_id,
        amount: orderRes.amount,
        currency: orderRes.currency,
        name: 'Dhara Foundations',
        description: `Seva Contribution — ₹${donationValue.toLocaleString('en-IN')}`,
        prefill: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        onSuccess: async (razorpayResponse) => {
          // Step 3: Verify Payment and Record in Database
          const verification = await verifyRazorpayPayment({
            razorpay_order_id: razorpayResponse.razorpay_order_id,
            razorpay_payment_id: razorpayResponse.razorpay_payment_id,
            razorpay_signature: razorpayResponse.razorpay_signature,
            module: 'Donor Support',
            name: formData.name || 'Anonymous Donor',
            email: formData.email,
            phone: formData.phone,
            amount: donationValue,
            pan: formData.pan,
            isAnonymous: formData.anonymous
          });

          // Backup submission
          submitForm('Donor Support', {
            module: 'Donor Support',
            amount: donationValue,
            isAnonymous: formData.anonymous,
            payment_id: razorpayResponse.razorpay_payment_id,
            order_id: razorpayResponse.razorpay_order_id,
            ...formData,
            timestamp: new Date().toISOString()
          });

          setIsProcessing(false);

          const receiptId = verification?.details?.receiptNo || `REC-80G-${Date.now().toString().slice(-6)}`;

          onSubmitSuccess({
            title: 'Contribution Successful',
            message: `Namaste, ${displayName}. Thank you for your generous offering of ₹${donationValue.toLocaleString('en-IN')}. Your contribution has been safely processed via Razorpay. Your 80G receipt number is ${receiptId}. May the blessings of service follow you always.`,
            details: [
              { label: 'Donor', value: displayName },
              { label: 'Contribution Amount', value: `₹${donationValue.toLocaleString('en-IN')}` },
              { label: 'Payment ID', value: razorpayResponse.razorpay_payment_id || orderRes.order_id },
              { label: '80G Receipt No', value: receiptId },
              { label: 'Tax Benefit Status', value: formData.pan ? '80G Eligible' : 'Standard Contribution' }
            ]
          });
        },
        onDismiss: () => {
          setIsProcessing(false);
        }
      });

    } catch (err) {
      console.error('Payment initiation error:', err);
      setIsProcessing(false);
      alert(`Payment Gateway Error: ${err.message || 'Could not launch payment gateway. Please try again.'}`);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-sun-gold font-semibold uppercase tracking-wider text-sm font-sans">Support the Seva</span>
        <h2 className="text-4xl font-serif text-forest-teal-dark mt-2 mb-4">Donor Support Gateway</h2>
        <p className="text-neutral-600 max-w-2xl mx-auto font-sans">
          "Giving is not just making a donation, it is making a difference." Support the logistics, hospitality, and recognition of silent workers at the Divine Awards 2025.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-neutral-100 shadow-premium p-6 sm:p-8">
            <h3 className="text-lg font-serif text-forest-teal-dark mb-6 flex items-center border-b border-neutral-100 pb-3">
              <Gift className="w-5 h-5 text-sun-gold mr-2" />
              1. Choose Donation Amount
            </h3>

            <div className="flex space-x-4 mb-6">
              <button
                type="button"
                onClick={() => setAmountType('preset')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 font-sans cursor-pointer ${
                  amountType === 'preset'
                    ? 'bg-forest-teal text-white shadow-md'
                    : 'bg-soft-sage text-forest-teal hover:bg-neutral-100'
                }`}
              >
                Pre-set Seva Amounts
              </button>
              <button
                type="button"
                onClick={() => setAmountType('custom')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 font-sans cursor-pointer ${
                  amountType === 'custom'
                    ? 'bg-forest-teal text-white shadow-md'
                    : 'bg-soft-sage text-forest-teal hover:bg-neutral-100'
                }`}
              >
                Custom Contribution
              </button>
            </div>

            {amountType === 'preset' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {presets.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPreset(p.amount)}
                    className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300 ${
                      selectedPreset === p.amount
                        ? 'border-sun-gold bg-[#FDFBF7] shadow-md scale-[1.01]'
                        : 'border-neutral-100 bg-white hover:border-neutral-200'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xl font-bold font-sans text-forest-teal-dark">{p.label}</span>
                      <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-soft-sage text-forest-teal font-sans">
                        {p.impact}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 font-sans leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-8">
                <label className="block text-sm font-medium text-forest-teal-dark mb-2 font-sans">Enter Custom Amount (INR)</label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-neutral-500 sm:text-base font-sans">₹</span>
                  </div>
                  <input
                    type="number"
                    min="100"
                    placeholder="10000"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-9 pr-4 py-4 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-teal text-lg font-bold text-forest-teal-dark font-sans"
                  />
                </div>
                <p className="text-xs text-neutral-400 font-sans mt-2">Minimum contribution is ₹100. Every rupee is deployed carefully for seva.</p>
              </div>
            )}

            <h3 className="text-lg font-serif text-forest-teal-dark mb-6 flex items-center border-b border-neutral-100 pb-3">
              <Landmark className="w-5 h-5 text-sun-gold mr-2" />
              2. Billing & Tax Information
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-forest-teal mb-1 font-sans">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      name="name"
                      required={!formData.anonymous}
                      placeholder="Dharmendra Gupta"
                      value={formData.name}
                      onChange={handleTextChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-forest-teal text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-forest-teal mb-1 font-sans">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-neutral-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="dharmendra@example.com"
                      value={formData.email}
                      onChange={handleTextChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-forest-teal text-sm font-sans"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-forest-teal mb-1 font-sans">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-neutral-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 95555 44444"
                      value={formData.phone}
                      onChange={handleTextChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-forest-teal text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-forest-teal mb-1 font-sans">PAN Card (For 80G Tax Deduction)</label>
                  <input
                    type="text"
                    name="pan"
                    placeholder="ABCDE1234F"
                    value={formData.pan}
                    onChange={handleTextChange}
                    maxLength="10"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-forest-teal text-sm font-sans uppercase placeholder:normal-case"
                  />
                </div>
              </div>

              <div className="py-2">
                <label className="flex items-center space-x-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.anonymous}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-forest-teal border-neutral-300 rounded focus:ring-forest-teal"
                  />
                  <span className="text-xs font-sans text-neutral-600">Make this contribution anonymously (your name will not be shown on sponsor walls)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--color-saffron-glow)] to-[var(--color-saffron-glow-dark)] text-[#281006] hover:brightness-105 font-sans font-bold text-base transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 border-2 border-transparent hover:border-[#281006] cursor-pointer group shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-[#281006]" />
                      <span>Initiating Razorpay Gateway...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 text-[#281006]" />
                      <span>Pay via Razorpay: ₹{parseFloat(getFinalAmount()).toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#FDFBF7] rounded-3xl p-6 border border-sage-accent/40 shadow-premium">
            <h3 className="text-lg font-serif text-forest-teal-dark mb-4 pb-2 border-b border-sage-accent/30 flex items-center">
              <Sparkles className="w-5 h-5 text-sun-gold mr-2" />
              Tax Benefits (80G)
            </h3>
            <p className="text-xs text-neutral-600 font-sans leading-relaxed mb-4">
              Dhara Foundation is a registered charitable trust. Under section 80G of the Income Tax Act, Indian donors can claim a tax deduction for contributions made to our institution.
            </p>
            <div className="p-3 bg-white rounded-xl border border-sage-accent/30 flex items-start space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-forest-teal shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-forest-teal-dark font-sans">Verified Gateway</h4>
                <p className="text-[10px] text-neutral-500 font-sans mt-0.5">Secure 256-bit SSL encrypted donation routing. Official tax certificate will be generated and emailed within 14 days.</p>
              </div>
            </div>
          </div>

          <div className="bg-forest-teal text-white rounded-3xl p-6 shadow-premium relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-6 translate-y-6">
              <HeartHandshake className="w-48 h-48" />
            </div>
            <h3 className="text-lg font-serif text-sun-gold mb-3">Sankalpa Statement</h3>
            <p className="text-xs text-neutral-200 font-sans leading-relaxed italic">
              "We declare that 100% of the funds gathered through this portal are channeled directly to support the volunteers, the boarding of awardees, and organizing technical capabilities of the Divine Awards ceremony. None of these funds are used for commercial profits."
            </p>
            <div className="mt-4 pt-4 border-t border-forest-teal-light flex items-center space-x-2 text-[10px] text-neutral-300 font-sans">
              <span>Dhara Foundations Board of Trustees</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

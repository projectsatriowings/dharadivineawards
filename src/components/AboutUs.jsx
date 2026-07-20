import React from 'react';
import { Award, ShieldCheck, HeartHandshake, History, FileText, CheckCircle2, Globe, BookOpen, Flame, Compass } from 'lucide-react';

export default function AboutUs({ siteConfig }) {
  const milestoneStats = (siteConfig?.aboutStats && siteConfig.aboutStats.length > 0) ? siteConfig.aboutStats : [
    { number: "25+", label: "Completed Projects" },
    { number: "10k+", label: "Lives Touched" },
    { number: "80G", label: "Tax Exemption" }
  ];
  const registrations = (siteConfig?.registrations && siteConfig.registrations.length > 0) ? siteConfig.registrations : [
    {
      title: "Indian Trust Act, 1882",
      detail: "Registered Public Non-profit Organization",
      description: "Formed on 20.11.2024 under the Indian Trust Act 1882 and Indian Income Tax Act 1961 as a public charitable non-profit organization.",
      icon: ShieldCheck
    },
    {
      title: "12A Income Tax Exemption",
      detail: "Reg. No: AAETD8857AE20241",
      description: "Granted permanent tax-exempt status for legacy charitable and spiritual activities.",
      icon: FileText
    },
    {
      title: "80G Tax Deductions",
      detail: "Reg. No: AAETD8857AF20241",
      description: "All individual and corporate donations are eligible for a 50% tax deduction under Section 80G.",
      icon: Award
    },
    {
      title: "MCA CSR Approved",
      detail: "Reg. No: CSR00086947",
      description: "Registered with the Ministry of Corporate Affairs to undertake Section 135 Corporate Social Responsibility programs.",
      icon: HeartHandshake
    },
    {
      title: "NGO DARPAN",
      detail: "ID: TN/2024/0473120",
      description: "Registered under NITI Aayog's NGO Darpan database for centralized accountability.",
      icon: CheckCircle2
    }
  ];

  const coreWork = [
    {
      category: "Spiritual & Cultural Heritage",
      items: [
        "Temple-based spiritual and cultural initiatives",
        "Development and maintenance of GoShalas (cow shelters)",
        "Promotion of research and training on Indian culture and traditional wisdom"
      ],
      icon: Compass
    },
    {
      category: "Environment & Energy",
      items: [
        "Water resource development and conservation efforts",
        "Environmental activities: land development, afforestation, waste management",
        "Non-conventional energy and sustainability projects"
      ],
      icon: Globe
    },
    {
      category: "Education & Socio-Economics",
      items: [
        "Educational support for underprivileged and tribal communities",
        "Health and wellness camps in tribal and deserving areas",
        "Agricultural development, dairies, and regional nurseries"
      ],
      icon: BookOpen
    }
  ];



  const awardPillars = [
    {
      title: "Spiritual Service",
      description: "Honouring individuals who uplift society through devotion, wisdom, and the path of dharma — from temple caretakers to spiritual healers."
    },
    {
      title: "Grassroots Impact",
      description: "Recognizing unsung heroes working selflessly in slums, villages, and disaster zones where real change begins."
    },
    {
      title: "Corporate to Commoner",
      description: "Appreciating the wide spectrum of service — from CEOs driving CSR initiatives to dedicated local volunteers."
    },
    {
      title: "Beyond Awards - A Responsibility",
      description: "Not just a trophy — a platform of encouragement with a ₹25,000 cash reward to fuel more good work."
    },
    {
      title: "A Spiritual Gathering with a Cause",
      description: "Merging culture, spirituality, and celebration in a sacred, soulful evening of purpose, music, and mantras."
    }
  ];

  return (
    <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-20">
      {/* Hero / Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 animate-fade-in">
        <span className="text-xs font-mono font-bold text-[var(--color-primary-accent)] uppercase tracking-[3px]">
          Who We Are
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-[var(--color-deep-forest-dark)] font-serif leading-tight">
          Preserving Our Sacred Heritage, Empowering Our Communities
        </h2>
        <div className="w-24 h-1 bg-[var(--color-saffron-glow)] mx-auto rounded-full"></div>
        <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed pt-2">
          Dhara Foundations stands at the intersection of cultural revival, spiritual elevation, and compassionate service. We believe that a community's future is brightest when it remains anchored in its timeless heritage.
        </p>
      </div>

      {/* Main Philosophy & History Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
        <div className="lg:col-span-6 relative overflow-hidden rounded-3xl border border-[#D9CBB0]/60 shadow-xl group aspect-[4/3] bg-[#F4EFE6] cursor-pointer">
          <img
            src="/images/News/DHARA Divine Awards Ceremony.jpg"
            alt="Dhara Divine Awards Ceremony"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1531058020387-3be344559be6?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-forest)]/90 via-[var(--color-deep-forest)]/40 to-transparent flex items-end p-8 transition-opacity duration-300">
            <div className="text-white space-y-2">
              <span className="text-xs font-mono text-[var(--color-saffron-glow)] uppercase tracking-wider font-bold">Rooted in Tradition</span>
              <h3 className="text-2xl font-bold font-serif text-white">Two Decades of Dedicated Grassroots Seva</h3>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-deep-forest)]/5 text-[var(--color-primary-accent)] flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-deep-forest-dark)] font-serif">Our Journey</h3>
          </div>
          <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
            What started over twenty years ago as a quiet individual conviction — assisting dilapidated village temples, conducting feeding programs, and helping tribal children with books — has officially evolved into a registered public charitable non-profit organization in 2024.
          </p>
          <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
            Our transition to a registered non-profit organization allows us to align corporate institutional strengths (CSR) and community volunteering into structured programs that deliver transparent, measurable, and highly impactful outcomes.
          </p>
          <div className="bg-white rounded-3xl border border-[#D9CBB0]/40 p-6 space-y-4 shadow-sm hover:shadow-md hover:border-[#C9A646]/60 transition-all duration-300 group cursor-pointer">
            <h4 className="text-xs font-mono font-bold text-[var(--color-primary-accent)] uppercase tracking-wider group-hover:text-[var(--color-accent)] transition-colors duration-200">Verifiable Milestones</h4>
            <div className="grid grid-cols-3 gap-4 text-center divide-x divide-[#D9CBB0]/40">
              {milestoneStats.map((stat, idx) => (
                <div key={idx} className={`${idx > 0 ? 'pl-4 ' : ''}hover:scale-105 transition-transform duration-200`}>
                  <span className="text-2xl font-bold text-[var(--color-deep-forest-dark)] block">{stat.number}</span>
                  <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider font-mono">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section: Core Areas of Work */}
      <div className="space-y-8 pt-4">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-[var(--color-primary-accent)] uppercase tracking-wider">
            Our Foundation
          </span>
          <h3 className="text-3xl font-bold text-[var(--color-deep-forest-dark)] font-serif">
            Core Areas of Work
          </h3>
          <div className="w-16 h-0.5 bg-[var(--color-saffron-glow)] mx-auto rounded-full"></div>
          <p className="text-xs text-[var(--ink-soft)] font-sans max-w-xl mx-auto">
            Rooted in Sanatana Dharma, Dhara Foundations serves as a bridge between ancient wisdom and modern needs through targeted social and cultural programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreWork.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#D9CBB0]/60 p-8 shadow-sm hover:shadow-2xl hover:shadow-[var(--color-deep-forest)]/5 hover:border-[var(--color-primary-accent)]/45 transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-deep-forest)]/5 text-[var(--color-primary-accent)] flex items-center justify-center group-hover:bg-[var(--color-primary-accent)] group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="font-bold text-lg text-[var(--color-deep-forest-dark)] font-serif">
                    {group.category}
                  </h4>
                  <ul className="space-y-3">
                    {group.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-2.5 items-start text-xs text-[var(--ink-soft)] leading-relaxed">
                        <span className="text-[var(--color-primary-accent)] mt-0.5 select-none">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section: Dhara Divine Awards */}
      <div className="space-y-8 pt-4">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-[var(--color-primary-accent)] uppercase tracking-wider">
            Celebrating Selfless Service
          </span>
          <h3 className="text-3xl font-bold text-[var(--color-deep-forest-dark)] font-serif">
            Dhara Divine Awards
          </h3>
          <div className="w-16 h-0.5 bg-[var(--color-saffron-glow)] mx-auto rounded-full"></div>
          <p className="text-xs text-[var(--ink-soft)] font-sans max-w-2xl mx-auto">
            An annual celebration honouring selfless individuals in the path of spiritual and social service. We recognize excellence from grassroots volunteers to thought leaders, representing <strong>63 Nayanmars</strong> from various fields.
          </p>
        </div>

        <div className="bg-[#401C0C] rounded-3xl border border-[#D9CBB0]/20 p-8 md:p-12 relative overflow-hidden shadow-xl text-white space-y-12">
          {/* Subtle background graphics */}
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-12 translate-y-12 select-none">
            <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
          </div>

          {/* Top section: Intro, Theme, and Aims */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
            {/* Left side: General Intro */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono text-[var(--color-saffron-glow)] uppercase tracking-widest font-bold block">
                Recognising Extraordinary Service
              </span>
              <h4 className="text-3xl md:text-4xl font-serif font-bold text-[#FFD27F] leading-tight">
                About Dhara Divine Awards
              </h4>
              <div className="space-y-4 text-sm text-[#F3E9D4] leading-relaxed font-sans">
                <p>
                  The <strong>Dhara Divine Awards</strong> were conceived with a simple yet powerful purpose—to recognize individuals and organizations whose contributions have significantly improved the lives of others.
                </p>
                <p>
                  In a world often focused on achievement and recognition, countless heroes continue to work quietly behind the scenes, transforming communities through dedication, compassion, and selfless service. These awards shine a spotlight on such remarkable individuals and institutions.
                </p>
                <p className="italic text-neutral-300 pt-2 border-t border-white/10 font-serif">
                  "The Dhara Divine Awards stand as a tribute to those who make a difference—not for recognition, but because service is their calling."
                </p>
              </div>
            </div>

            {/* Right side: Theme and Aims */}
            <div className="lg:col-span-6 space-y-6">
              {/* Theme Block */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
                <span className="text-[10px] uppercase tracking-wider font-mono text-[var(--color-saffron-glow)] font-bold block">
                  Theme Of Festival
                </span>
                <h5 className="text-xl font-bold text-[#FFD27F] font-serif">
                  "Celebrating the Unspoken Celebrities"
                </h5>
                <p className="text-xs font-semibold text-[#FFD27F] bg-white/10 p-2.5 rounded-xl border border-white/10">
                  Supporting 12 Deserving Individuals with Financial Assistance of ₹25,000 Each.
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  The event celebrates those whose actions are guided by values, purpose, and a deep commitment to humanity every year.
                </p>
              </div>

              {/* Aims Block */}
              <div className="space-y-3">
                <h5 className="font-bold text-sm text-[#FFD27F] uppercase tracking-wider font-sans">
                  The awards aim to:
                </h5>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "Honour excellence in social service.",
                    "Celebrate leadership driven by compassion.",
                    "Inspire future generations of changemakers.",
                    "Promote a culture of service and responsibility.",
                    "Recognize sustainable community impact."
                  ].map((aim, idx) => (
                    <div key={idx} className="flex gap-3 items-start text-xs text-neutral-200">
                      <span className="text-[var(--color-saffron-glow)] mt-0.5 select-none font-sans">✦</span>
                      <span className="font-sans leading-relaxed">{aim}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section: Award Pillars */}
          <div className="relative z-10 pt-8 border-t border-white/10 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <h5 className="font-bold text-lg text-[#FFD27F] font-serif">
                  Core Award Pillars &amp; Categories
                </h5>
                <p className="text-xs text-neutral-300 font-sans">
                  Understanding the structural fields of service recognized under the Dhara Divine Awards.
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <div className="inline-flex items-center gap-3 bg-white/5 border border-[var(--color-saffron-glow)]/35 px-4 py-2.5 rounded-xl">
                  <Award className="w-5 h-5 text-[var(--color-saffron-glow)]" />
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-mono text-neutral-300 block font-bold">Award Value</span>
                    <span className="text-sm font-bold text-[#FFD27F]">₹25,000 Cash Prize &amp; Trophy</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {awardPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--color-saffron-glow)]/30 rounded-2xl p-5 transition-all duration-300 flex gap-4 items-start cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-[var(--color-saffron-glow)]/10 text-[var(--color-saffron-glow)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold font-mono text-[var(--color-saffron-glow)]">0{idx + 1}</span>
                  </div>
                  <div className="space-y-1">
                    <h6 className="font-bold text-sm text-[#FFD27F] font-serif">{pillar.title}</h6>
                    <p className="text-xs text-neutral-300 leading-relaxed font-sans">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Registrations Grid */}
      <div className="space-y-8 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-3xl font-bold text-[var(--color-deep-forest-dark)] font-serif">Non-profit Organization Certifications & Transparency</h3>
          <p className="text-xs text-[var(--ink-soft)] font-sans">
            Our registrations ensure absolute legal compliance and tax benefit structures for both local and institutional supporters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registrations.map((reg, idx) => {
            const Icon = reg.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#D9CBB0]/60 p-6 flex flex-col justify-between hover:shadow-2xl hover:shadow-[var(--color-deep-forest)]/5 hover:border-[var(--color-primary-accent)]/50 transition-all duration-300 group hover:-translate-y-2 cursor-pointer relative overflow-hidden"
              >
                {/* Accent line hover glow */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--color-saffron-glow)] to-[var(--color-primary-accent)] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-deep-forest)]/5 text-[var(--color-primary-accent)] flex items-center justify-center group-hover:bg-[var(--color-primary-accent)] group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6 group-hover:rotate-6 transition-transform duration-300" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg text-[var(--color-deep-forest-dark)] font-serif group-hover:text-[var(--color-primary-accent)] transition-colors duration-200">
                      {reg.title}
                    </h4>
                    <span className="text-[11px] font-mono bg-[#F4EFE6] text-[var(--color-primary-accent)] px-2.5 py-0.5 rounded-full inline-block font-bold group-hover:bg-[var(--color-saffron-glow)]/20 transition-all duration-300">
                      {reg.detail}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed group-hover:text-neutral-700 transition-colors duration-200">
                    {reg.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

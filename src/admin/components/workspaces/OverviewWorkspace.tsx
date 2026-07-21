import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  IndianRupee, 
  Users, 
  Ticket, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Heart,
  Trash2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

export const OverviewWorkspace: React.FC = () => {
  const { nominations, donations, delegates, volunteers, activityLogs, setCurrentTab, deleteActivityLog } = useApp();

  // Calculate totals and statistics
  const totalNominationsCount = nominations.length; 
  const totalDonationsAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);
  const targetDonation = 10000000; // 1 Crore INR goal
  const donationProgress = Math.min(Math.round((totalDonationsAmount / targetDonation) * 100), 100);

  const totalSeatsBooked = delegates.reduce((acc, curr) => acc + curr.ticket_count, 0);
  const hallCapacity = 1000; // Chinmaya Heritage Centre Hall A capacity
  const seatProgress = Math.min(Math.round((totalSeatsBooked / hallCapacity) * 100), 100);

  const totalVolunteersCount = volunteers.length;

  // Chart Data: Daily Submit Trends (Sparkline & Area Chart)
  const dailySubmitData = [
    { day: 'Jun 28', submissions: 65, donations: 320000 },
    { day: 'Jun 29', submissions: 82, donations: 450000 },
    { day: 'Jun 30', submissions: 110, donations: 680000 },
    { day: 'Jul 01', submissions: 145, donations: 920000 },
    { day: 'Jul 02', submissions: 190, donations: 1250000 },
    { day: 'Jul 03', submissions: 240, donations: 1800000 },
    { day: 'Jul 04', submissions: 310, donations: 2450000 },
  ];

  // Category Breakdown Data
  const categoryData = [
    { name: 'Arts & Culture', value: 38, color: '#401C0C' },
    { name: 'Social Welfare', value: 28, color: '#D9762E' },
    { name: 'Temple Restoration', value: 18, color: '#C9A646' },
    { name: 'Vedic Education', value: 10, color: '#5C2913' },
    { name: 'Environmental Seva', value: 6, color: '#867463' },
  ];

  // Volunteer Skill Matrix Breakdown
  const skillMatrix = [
    { skill: 'Logistics & Venue', count: 42, active: 38 },
    { skill: 'VIP Hospitality', count: 36, active: 34 },
    { skill: 'Crowd Management', count: 32, active: 30 },
    { skill: 'Media & PR Desk', count: 18, active: 16 },
    { skill: 'Medical Outreach', count: 17, active: 15 },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Top Banner / Welcome Callout */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#401C0C] via-[#5C2913] to-[#5C2913] p-8 text-white shadow-xl shadow-[#401C0C]/15 border border-[#C9A646]/30">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-[#C9A646]/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD27F]/20 border border-[#FFD27F]/30 text-[#FFD27F] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles size={14} />
              <span>Dhara Divine Awards 2026 Telemetry</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-white">
              Sacred Seva Operations Command
            </h2>
            <p className="mt-2 text-sm text-[#EAE8E3]/90 leading-relaxed font-light">
              Centralized monitoring for the Chinmaya Heritage Centre ceremony on August 15th. Oversee vetting pipelines, donor CSR ledgers, delegate QR gate verification, and volunteer skill matrices in real time.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentTab('nominations')}
              className="px-5 py-3 rounded-xl bg-[#D9762E] hover:bg-[#C26520] text-white font-semibold text-xs transition-all shadow-lg shadow-[#D9762E]/30 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Review Nominations</span>
              <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => setCurrentTab('delegates')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Ticket size={16} className="text-[#FFD27F]" />
              <span>Gate Check-in Scanner</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1: Nominations */}
        <div 
          onClick={() => setCurrentTab('nominations')}
          className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-[0_8px_30px_rgba(64, 28, 12,0.04)] hover:shadow-xl hover:border-[#401C0C]/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-[#401C0C]/10 dark:bg-[#401C0C]/20 text-[#401C0C] dark:text-[#FFD27F] group-hover:scale-110 transition-transform">
              <Award size={24} />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#401C0C] dark:text-[#FFD27F] bg-[#401C0C]/10 px-2.5 py-1 rounded-full font-mono">
              <TrendingUp size={12} /> +18.4%
            </span>
          </div>
          <h3 className="text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] uppercase tracking-wider">Total Nominations</h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#1B1C19] dark:text-[#F3F4F6]">
              {totalNominationsCount.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-[#867463]">submissions</span>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F5F3EE] dark:border-[#2E302A] flex items-center justify-between text-xs text-[#534436] dark:text-[#D1D5DB]">
            <span>Pending Vetting: <strong className="text-[#D9762E]">{nominations.filter(n => n.vetting_status === 'pending').length}</strong></span>
            <span className="text-[#401C0C] font-semibold flex items-center gap-0.5">View Board &rarr;</span>
          </div>
        </div>

        {/* KPI 2: Donations Raised */}
        <div 
          onClick={() => setCurrentTab('donations')}
          className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-[0_8px_30px_rgba(64, 28, 12,0.04)] hover:shadow-xl hover:border-[#D9762E]/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-[#D9762E]/10 dark:bg-[#D9762E]/20 text-[#D9762E] group-hover:scale-110 transition-transform">
              <IndianRupee size={24} />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#D9762E] bg-[#D9762E]/10 px-2.5 py-1 rounded-full font-mono">
              {donationProgress}% Goal
            </span>
          </div>
          <h3 className="text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] uppercase tracking-wider">Donations Raised</h3>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-serif text-3xl font-bold text-[#1B1C19] dark:text-[#F3F4F6]">
              ₹{(totalDonationsAmount / 100000).toFixed(2)}
            </span>
            <span className="text-xs font-semibold text-[#867463]">Lakhs</span>
          </div>
          {/* Progress bar towards 1 Crore */}
          <div className="mt-4 space-y-1.5">
            <div className="w-full h-2 bg-[#F5F3EE] dark:bg-[#2E302A] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#D9762E] to-[#C9A646] rounded-full transition-all duration-1000" 
                style={{ width: `${donationProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-[#867463] dark:text-[#9CA3AF]">
              <span>Target: ₹1.00 Crore</span>
              <span className="text-[#401C0C] dark:text-[#FFD27F] font-semibold">80G Tax Ready</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Registered Seats (Chinmaya Hall capacity monitor) */}
        <div 
          onClick={() => setCurrentTab('delegates')}
          className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-[0_8px_30px_rgba(64, 28, 12,0.04)] hover:shadow-xl hover:border-[#C9A646]/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-[#C9A646]/15 dark:bg-[#C9A646]/20 text-[#8A5000] dark:text-[#FFD27F] group-hover:scale-110 transition-transform">
              <Ticket size={24} />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#8A5000] dark:text-[#FFD27F] bg-[#C9A646]/20 px-2.5 py-1 rounded-full font-mono">
              {hallCapacity - totalSeatsBooked} Left
            </span>
          </div>
          <h3 className="text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] uppercase tracking-wider">Registered Seats</h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#1B1C19] dark:text-[#F3F4F6]">
              {totalSeatsBooked}
            </span>
            <span className="text-xs text-[#867463]">/ {hallCapacity} Hall Capacity</span>
          </div>
          {/* Capacity gauge */}
          <div className="mt-4 space-y-1.5">
            <div className="w-full h-2 bg-[#F5F3EE] dark:bg-[#2E302A] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#401C0C] dark:bg-[#FFD27F] rounded-full transition-all duration-1000" 
                style={{ width: `${seatProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-[#867463] dark:text-[#9CA3AF]">
              <span>Chinmaya Heritage Hall A</span>
              <span className="text-[#D9762E] font-semibold">{seatProgress}% Booked</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Onboarded Volunteers */}
        <div 
          onClick={() => setCurrentTab('volunteers')}
          className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-[0_8px_30px_rgba(64, 28, 12,0.04)] hover:shadow-xl hover:border-[#5C2913]/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-[#5C2913]/10 dark:bg-[#5C2913]/20 text-[#5C2913] dark:text-[#90D3C3] group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#5C2913] dark:text-[#90D3C3] bg-[#5C2913]/10 px-2.5 py-1 rounded-full font-mono">
              6 Zones Active
            </span>
          </div>
          <h3 className="text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] uppercase tracking-wider">Onboarded Volunteers</h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#1B1C19] dark:text-[#F3F4F6]">
              {totalVolunteersCount}
            </span>
            <span className="text-xs text-[#867463]">seva members</span>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F5F3EE] dark:border-[#2E302A] flex items-center justify-between text-xs text-[#534436] dark:text-[#D1D5DB]">
            <span>Active Shifts: <strong className="text-[#401C0C] dark:text-[#FFD27F]">{volunteers.filter(v => v.status === 'active').length} On-duty</strong></span>
            <span className="text-[#5C2913] dark:text-[#90D3C3] font-semibold flex items-center gap-0.5">Roster &rarr;</span>
          </div>
        </div>
      </div>

      {/* Analytics Section & Real-time Websocket Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Charts & Telemetry */}
        <div className="lg:col-span-2 space-y-8">
          {/* Submission Trends Chart */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1B1C19] dark:text-[#F3F4F6]">
                  Submission & Donation Velocity
                </h3>
                <p className="text-xs text-[#867463] dark:text-[#9CA3AF]">
                  Daily volume of Award Nominations and Seva Offerings received over the past 7 days
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-[#401C0C] dark:text-[#FFD27F]">
                  <span className="w-3 h-3 rounded-full bg-[#401C0C] dark:bg-[#FFD27F]"></span>
                  Nominations Count
                </span>
                <span className="flex items-center gap-1.5 text-[#D9762E]">
                  <span className="w-3 h-3 rounded-full bg-[#D9762E]"></span>
                  Donations (₹)
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailySubmitData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#401C0C" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#401C0C" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDon" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D9762E" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D9762E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#867463" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#867463" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#D9762E" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FDFBF8', borderColor: '#EAE8E3', borderRadius: '12px', fontSize: '12px' }}
                    formatter={(value: any, name: any) => [
                      name === 'donations' ? `₹${Number(value).toLocaleString('en-IN')}` : value,
                      name === 'donations' ? 'Donations' : 'Nominations'
                    ]}
                  />
                  <Area yAxisId="left" type="monotone" dataKey="submissions" stroke="#401C0C" strokeWidth={3} fillOpacity={1} fill="url(#colorSub)" />
                  <Area yAxisId="right" type="monotone" dataKey="donations" stroke="#D9762E" strokeWidth={3} fillOpacity={1} fill="url(#colorDon)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Row: Category Pie & Volunteer Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nominations Category Distribution */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-base font-bold text-[#1B1C19] dark:text-[#F3F4F6]">
                  Nominations by Seva Category
                </h3>
                <p className="text-xs text-[#867463] dark:text-[#9CA3AF]">
                  Distribution across the 5 sacred domains
                </p>
              </div>

              <div className="h-48 my-4 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#FDFBF8', borderRadius: '12px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1.5">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-[#534436] dark:text-[#D1D5DB]">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                      {cat.name}
                    </span>
                    <span className="font-bold font-mono text-[#1B1C19] dark:text-[#F3F4F6]">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Volunteer Skill Matrix Cells */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#1B1C19] dark:text-[#F3F4F6]">
                    Volunteer Skill Matrix
                  </h3>
                  <p className="text-xs text-[#867463] dark:text-[#9CA3AF]">
                    Active cells categorized by operational readiness
                  </p>
                </div>
                <span className="p-2 rounded-xl bg-[#401C0C]/10 text-[#401C0C] dark:text-[#FFD27F]">
                  <Users size={18} />
                </span>
              </div>

              <div className="space-y-3.5 mt-2">
                {skillMatrix.map((item) => (
                  <div key={item.skill} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#1B1C19] dark:text-[#E5E7EB]">{item.skill}</span>
                      <span className="text-[#867463] dark:text-[#9CA3AF] font-mono">
                        <strong className="text-[#401C0C] dark:text-[#FFD27F]">{item.active}</strong> / {item.count} active
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#F5F3EE] dark:bg-[#2E302A] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#401C0C] dark:bg-[#FFD27F] rounded-full" 
                        style={{ width: `${(item.active / item.count) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-3 border-t border-[#F5F3EE] dark:border-[#2E302A] text-center">
                <button 
                  onClick={() => setCurrentTab('volunteers')}
                  className="text-xs font-semibold text-[#401C0C] dark:text-[#FFD27F] hover:underline cursor-pointer"
                >
                  Manage Roster Shifts & Venue Zones &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Activity Logs Stream */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F5F3EE] dark:border-[#2E302A]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#401C0C] dark:bg-[#FFD27F] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#401C0C] dark:bg-[#FFD27F]"></span>
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#1B1C19] dark:text-[#F3F4F6]">
                    Real-Time Activity Stream
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-[#F5F3EE] dark:bg-[#2E302A] text-[#867463] dark:text-[#9CA3AF]">
                  Live
                </span>
              </div>

              <p className="text-xs text-[#867463] dark:text-[#9CA3AF] mt-3">
                Live event stream from public form submissions, payment callbacks, and gate check-in scanners.
              </p>

              <div className="mt-5 space-y-4 max-h-[520px] overflow-y-auto pr-1">
                {activityLogs.map((log) => {
                  let icon = <Award size={14} className="text-[#401C0C] dark:text-[#FFD27F]" />;
                  let bg = "bg-[#401C0C]/10 dark:bg-[#FFD27F]/10";
                  if (log.type === 'checkin') {
                    icon = <Ticket size={14} className="text-[#D9762E]" />;
                    bg = "bg-[#D9762E]/10";
                  } else if (log.type === 'donation') {
                    icon = <IndianRupee size={14} className="text-[#C9A646]" />;
                    bg = "bg-[#C9A646]/15";
                  } else if (log.type === 'volunteer') {
                    icon = <Users size={14} className="text-[#5C2913]" />;
                    bg = "bg-[#5C2913]/15";
                  }

                  return (
                    <div key={log.id} className="flex gap-3.5 items-start p-3 rounded-2xl bg-[#FDFBF8] dark:bg-[#242622]/60 border border-[#F5F3EE] dark:border-[#30312E] hover:border-[#401C0C]/30 transition-all group relative">
                      <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${bg}`}>
                        {icon}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-xs font-medium text-[#1B1C19] dark:text-[#E5E7EB] leading-snug">
                          {log.message}
                        </p>
                        <div className="flex items-center justify-between mt-1.5 text-[10px] text-[#867463] dark:text-[#6B7280] font-mono">
                          <span>{log.timestamp}</span>
                          <span className="truncate max-w-[100px] text-right">by {log.user || 'System'}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteActivityLog(log.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all cursor-pointer shrink-0 mt-0.5"
                        title="Delete log entry"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#F5F3EE] dark:border-[#2E302A] mt-6 text-center">
              <span className="text-[11px] text-[#867463] dark:text-[#9CA3AF] flex items-center justify-center gap-1.5 font-mono">
                <ShieldCheck size={14} className="text-[#401C0C] dark:text-[#FFD27F]" />
                All transactions encrypted & timestamped
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

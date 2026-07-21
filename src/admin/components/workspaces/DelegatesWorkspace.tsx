import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Delegate, PassTier } from '../../types';
import { 
  QrCode, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Ticket, 
  UserCheck, 
  ShieldCheck, 
  Sparkles, 
  Printer, 
  Camera, 
  XCircle,
  Filter,
  Check
} from 'lucide-react';

export const DelegatesWorkspace: React.FC = () => {
  const { delegates, checkInDelegate, globalSearchQuery, setGlobalSearchQuery } = useApp();
  const [scanInput, setScanInput] = useState('');
  const [lastScanResult, setLastScanResult] = useState<{ success: boolean; message: string; delegate?: Delegate } | null>(null);
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [isScanning, setIsScanning] = useState(false);

  const tiers: string[] = ['all', 'vip', 'delegate', 'sponsor'];

  const filteredDelegates = delegates.filter(del => {
    const matchesTier = selectedTier === 'all' || del.pass_tier === selectedTier;
    const matchesSearch = !globalSearchQuery || 
      del.pass_code.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      del.delegate_name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      del.phone.includes(globalSearchQuery);
    return matchesTier && matchesSearch;
  });

  const checkedInCount = delegates.filter(d => d.checked_in).length;
  const totalSeats = delegates.reduce((acc, curr) => acc + curr.ticket_count, 0);

  const handleQuickCheckin = async (query: string) => {
    if (!query.trim()) return;
    const result = await checkInDelegate(query);
    setLastScanResult(result);
    if (result.success) {
      setScanInput('');
    }
  };

  const triggerCameraScanSimulation = () => {
    setIsScanning(true);
    setLastScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      const unChecked = delegates.find(d => !d.checked_in) || delegates[0];
      handleQuickCheckin(unChecked.pass_code);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Gate Control Command Banner & Quick Check-in Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1B1C19] via-[#242622] to-[#121310] text-white shadow-xl border border-[#C9A646]/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#401C0C]/30 to-transparent pointer-events-none"></div>

        <div className="max-w-3xl relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#D9762E] text-white shadow-lg shadow-[#D9762E]/30 animate-pulse">
              <QrCode size={26} />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#FFD27F] uppercase tracking-wider">
                Chinmaya Heritage Hall A • Gate Check-in Terminal
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
                Quick Pass Verification & Barcode Scanner
              </h2>
            </div>
          </div>

          {/* Floating Search Input for Quick Check-in */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
              <input
                type="text"
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuickCheckin(scanInput)}
                placeholder="Scan QR barcode or enter pass code (e.g., DDA-2026-8842) / Phone..."
                className="w-full bg-[#30312E] text-white pl-12 pr-4 py-4 rounded-2xl text-sm border-2 border-[#534436] focus:outline-none focus:border-[#FFD27F] focus:ring-4 focus:ring-[#FFD27F]/20 transition-all font-mono placeholder:text-gray-400 shadow-inner"
              />
            </div>
            <button
              onClick={() => handleQuickCheckin(scanInput)}
              className="px-8 py-4 rounded-2xl bg-[#401C0C] hover:bg-[#5C2913] text-[#FFD27F] font-bold text-sm transition-all shadow-lg shadow-[#401C0C]/40 flex items-center justify-center gap-2 cursor-pointer shrink-0 border border-[#C9A646]/40"
            >
              <UserCheck size={18} /> Verify & Gate Entry
            </button>
            <button
              onClick={triggerCameraScanSimulation}
              disabled={isScanning}
              className="px-6 py-4 rounded-2xl bg-[#C9A646]/20 hover:bg-[#C9A646]/30 text-[#FFD27F] font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 border border-[#C9A646]/50"
            >
              <Camera size={18} className={isScanning ? "animate-spin" : ""} /> {isScanning ? "Scanning QR..." : "Simulate QR Scan"}
            </button>
          </div>

          {/* Quick Check-in Flash Notification */}
          {lastScanResult && (
            <div className={`p-4 rounded-2xl border-2 flex items-start gap-3 transition-all duration-300 animate-fade-in ${
              lastScanResult.success 
                ? 'bg-[#401C0C] border-[#FFD27F] text-white shadow-[0_0_30px_rgba(64, 28, 12,0.8)]' 
                : 'bg-red-950/90 border-red-500 text-red-200'
            }`}>
              <div className="mt-0.5 p-1 rounded-full bg-white/20">
                {lastScanResult.success ? <CheckCircle2 size={20} className="text-[#FFD27F]" /> : <AlertCircle size={20} className="text-red-400" />}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm">
                  {lastScanResult.success ? '✓ GATE CHECK-IN SUCCESSFUL!' : '✕ CHECK-IN DENIED / WARNING'}
                </h4>
                <p className="text-xs mt-0.5 opacity-90 font-mono">{lastScanResult.message}</p>
                {lastScanResult.delegate && (
                  <div className="mt-2 pt-2 border-t border-white/20 flex flex-wrap gap-4 text-xs font-semibold">
                    <span>Pass Tier: <strong className="text-[#FFD27F] uppercase">{lastScanResult.delegate.pass_tier}</strong></span>
                    <span>Seats: <strong>{lastScanResult.delegate.ticket_count}</strong></span>
                    <span>Zone: <strong>{lastScanResult.delegate.seat_zone || 'General Enclosure'}</strong></span>
                  </div>
                )}
              </div>
              <button onClick={() => setLastScanResult(null)} className="text-white/60 hover:text-white cursor-pointer">
                <XCircle size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* KPI Stats & Tier Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm">
          <span className="text-[11px] font-bold text-[#867463] uppercase tracking-wider">Gate Check-in Progress</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#401C0C] dark:text-[#FFD27F]">{checkedInCount}</span>
            <span className="text-xs text-[#867463]">/ {delegates.length} passes scanned</span>
          </div>
          <div className="w-full h-1.5 bg-[#F5F3EE] dark:bg-[#2E302A] rounded-full overflow-hidden mt-3">
            <div className="h-full bg-[#401C0C] dark:bg-[#FFD27F] rounded-full" style={{ width: `${(checkedInCount / delegates.length) * 100}%` }}></div>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm">
          <span className="text-[11px] font-bold text-[#867463] uppercase tracking-wider">Total Seats Booked</span>
          <div className="mt-2 font-serif text-3xl font-bold text-[#1B1C19] dark:text-[#F3F4F6]">{totalSeats}</div>
          <span className="text-xs text-[#D9762E] font-semibold mt-1 block">VIP & Sponsor Rows Reserved</span>
        </div>

        {/* Tier Filter Buttons */}
        <div className="md:col-span-2 p-5 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm flex items-center justify-between gap-4">
          <span className="text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] flex items-center gap-1.5">
            <Filter size={14} /> Filter Pass Tier:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {tiers.map(tier => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                  selectedTier === tier
                    ? 'bg-[#401C0C] dark:bg-[#FFD27F] text-white dark:text-[#401C0C] shadow-sm'
                    : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
                }`}
              >
                {tier === 'all' ? 'All Tiers' : `${tier} Pass`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Delegates Registry Table */}
      <div className="rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#F5F3EE] dark:border-[#2E302A] flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1B1C19] dark:text-[#F3F4F6]">
              Chinmaya Heritage Centre • Delegate Registry
            </h3>
            <p className="text-xs text-[#867463] dark:text-[#9CA3AF]">
              Real-time gate synchronization for barcode scanners and badge printing
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#401C0C]/10 text-[#401C0C] dark:text-[#FFD27F] font-bold">
            {filteredDelegates.length} Passes Listed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F3EE] dark:bg-[#242622] border-b border-[#E4E2DD] dark:border-[#30312E] text-[11px] font-bold text-[#867463] dark:text-[#9CA3AF] uppercase tracking-wider">
                <th className="py-4 px-6">Pass Code & Tier</th>
                <th className="py-4 px-4">Delegate Name & Contact</th>
                <th className="py-4 px-4">Seat Allocation Zone</th>
                <th className="py-4 px-4">Seat Count</th>
                <th className="py-4 px-4">Gate Check-in Status</th>
                <th className="py-4 px-6 text-right">Gate Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F3EE] dark:divide-[#2E302A] text-xs">
              {filteredDelegates.map(del => (
                <tr key={del.id} className={`transition-colors ${del.checked_in ? 'bg-[#401C0C]/5 dark:bg-[#401C0C]/10' : 'hover:bg-[#FDFBF8] dark:hover:bg-[#242622]/50'}`}>
                  <td className="py-4 px-6">
                    <div className="font-mono font-bold text-sm text-[#401C0C] dark:text-[#FFD27F] flex items-center gap-1.5">
                      <QrCode size={15} /> {del.pass_code}
                    </div>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      del.pass_tier === 'vip' ? 'bg-[#D9762E] text-white' :
                      del.pass_tier === 'sponsor' ? 'bg-[#C9A646]/30 text-[#8A5000] dark:text-[#FFD27F] border border-[#C9A646]' :
                      'bg-[#F5F3EE] dark:bg-[#2E302A] text-[#534436] dark:text-[#D1D5DB]'
                    }`}>
                      {del.pass_tier} Pass
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-serif font-bold text-sm text-[#1B1C19] dark:text-[#F3F4F6]">{del.delegate_name}</div>
                    <div className="text-[11px] text-[#867463] font-mono">{del.email} • {del.phone}</div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#534436] dark:text-[#D1D5DB]">
                    {del.seat_zone || 'General Hall Enclosure'}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-sm text-[#1B1C19] dark:text-[#F3F4F6]">
                    {del.ticket_count} {del.ticket_count === 1 ? 'Seat' : 'Seats'}
                  </td>
                  <td className="py-4 px-4">
                    {del.checked_in ? (
                      <div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#401C0C] dark:text-[#FFD27F] bg-[#401C0C]/15 dark:bg-[#401C0C]/30 px-2.5 py-1 rounded-full">
                          <CheckCircle2 size={13} /> Checked In
                        </span>
                        <div className="text-[10px] text-[#867463] font-mono mt-1">
                          at {new Date(del.checkin_time || '').toLocaleTimeString()}
                        </div>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#867463] bg-[#867463]/10 px-2.5 py-1 rounded-full">
                        <Clock size={13} /> Awaiting Arrival
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => alert(`Simulated Badge Print: Printing Lanyard Badge for ${del.delegate_name} (${del.pass_code})`)}
                      title="Print Lanyard Badge"
                      className="px-3 py-1.5 rounded-lg bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3] transition-all cursor-pointer inline-flex items-center gap-1"
                    >
                      <Printer size={13} /> Badge
                    </button>
                    {!del.checked_in ? (
                      <button
                        onClick={() => handleQuickCheckin(del.pass_code)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#401C0C] text-white font-semibold hover:bg-[#5C2913] transition-all cursor-pointer inline-flex items-center gap-1 shadow-sm"
                      >
                        <Check size={13} /> Check In Now
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-[#401C0C] dark:text-[#FFD27F] font-bold pr-2">
                        Gate Verified ✓
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

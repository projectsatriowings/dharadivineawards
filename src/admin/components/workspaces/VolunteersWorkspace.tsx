import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Volunteer, VolunteerStatus, VolunteerSkill } from '../../types';
import { 
  Users, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  UserCheck, 
  MapPin, 
  Calendar, 
  ShieldCheck,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';

export const VolunteersWorkspace: React.FC = () => {
  const { volunteers, updateVolunteerStatus, globalSearchQuery } = useApp();
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const skills: string[] = ['all', 'Logistics', 'Hospitality', 'Media', 'Crowd Management', 'Medical', 'Registration'];
  const statuses: string[] = ['all', 'active', 'assigned', 'on_hold'];

  const filteredVolunteers = volunteers.filter(vol => {
    const matchesSkill = selectedSkill === 'all' || vol.skills.includes(selectedSkill as VolunteerSkill);
    const matchesStatus = selectedStatus === 'all' || vol.status === selectedStatus;
    const matchesSearch = !globalSearchQuery || 
      vol.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      vol.email.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      vol.phone.includes(globalSearchQuery);
    return matchesSkill && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: VolunteerStatus) => {
    switch (status) {
      case 'active': return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#401C0C]/15 dark:bg-[#401C0C]/30 text-[#401C0C] dark:text-[#FFD27F]"><CheckCircle2 size={12} /> Active Ready</span>;
      case 'assigned': return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#C9A646]/20 text-[#8A5000] dark:text-[#FFD27F]"><Sparkles size={12} /> Shift Assigned</span>;
      case 'on_hold': return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#867463]/15 text-[#867463]"><Clock size={12} /> On Hold</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header & Filter Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm flex flex-col justify-between gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
              <Users className="text-[#401C0C] dark:text-[#FFD27F]" /> Volunteer Seva Roster & Skill Matrix
            </h2>
            <p className="text-xs text-[#867463] dark:text-[#9CA3AF] mt-1">
              Coordinate venue shifts, hospitality desks, and logistics teams for August 15th
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono bg-[#F5F3EE] dark:bg-[#242622] px-3.5 py-2 rounded-xl border border-[#E4E2DD] dark:border-[#30312E]">
            <span className="text-[#401C0C] dark:text-[#FFD27F] font-bold">Total Enrolled:</span> {volunteers.length} Seva Members
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#F5F3EE] dark:border-[#2E302A]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] mr-2 flex items-center gap-1">
              <Filter size={14} /> Skill Matrix:
            </span>
            {skills.map(sk => (
              <button
                key={sk}
                onClick={() => setSelectedSkill(sk)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedSkill === sk
                    ? 'bg-[#401C0C] dark:bg-[#FFD27F] text-white dark:text-[#401C0C] font-bold shadow-sm'
                    : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3]'
                }`}
              >
                {sk === 'all' ? 'All Skills' : sk}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-[#F5F3EE] dark:bg-[#242622] p-1 rounded-xl border border-[#E4E2DD] dark:border-[#30312E]">
            {statuses.map(st => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 text-xs rounded-lg uppercase font-bold transition-all cursor-pointer ${
                  selectedStatus === st ? 'bg-white dark:bg-[#1B1C19] text-[#401C0C] dark:text-[#FFD27F] shadow-sm' : 'text-[#867463]'
                }`}
              >
                {st === 'all' ? 'All Status' : st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Volunteer Registry Table */}
      <div className="rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F3EE] dark:bg-[#242622] border-b border-[#E4E2DD] dark:border-[#30312E] text-[11px] font-bold text-[#867463] dark:text-[#9CA3AF] uppercase tracking-wider">
                <th className="py-4 px-6">Volunteer Name & Age</th>
                <th className="py-4 px-4">Contact Information</th>
                <th className="py-4 px-4">Skill Matrix & Competencies</th>
                <th className="py-4 px-4">Shift Availability</th>
                <th className="py-4 px-4">Assigned Venue Zone</th>
                <th className="py-4 px-4">Seva Status</th>
                <th className="py-4 px-6 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F3EE] dark:divide-[#2E302A] text-xs">
              {filteredVolunteers.map(vol => (
                <tr key={vol.id} className="hover:bg-[#FDFBF8] dark:hover:bg-[#242622]/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-serif font-bold text-sm text-[#1B1C19] dark:text-[#F3F4F6]">{vol.name}</div>
                    <span className="text-[11px] text-[#867463] font-mono">Age: {vol.age} • ID: {vol.id}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 text-[#534436] dark:text-[#D1D5DB]"><Mail size={12} /> {vol.email}</div>
                    <div className="flex items-center gap-1.5 text-[#867463] font-mono mt-0.5"><Phone size={12} /> {vol.phone}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {vol.skills.map(skill => (
                        <span key={skill} className="px-2 py-0.5 rounded bg-[#401C0C]/10 text-[#401C0C] dark:bg-[#FFD27F]/10 dark:text-[#FFD27F] font-semibold text-[10px]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#1B1C19] dark:text-[#E5E7EB]">
                    {vol.availability}
                  </td>
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-1.5 font-medium text-[#534436] dark:text-[#D1D5DB]">
                      <MapPin size={13} className="text-[#D9762E]" />
                      {vol.assigned_zone || 'Unassigned Buffer'}
                    </span>
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(vol.status)}</td>
                  <td className="py-4 px-6 text-right">
                    <select
                      value={vol.status}
                      onChange={(e) => updateVolunteerStatus(vol.id, e.target.value as VolunteerStatus)}
                      className="bg-[#F5F3EE] dark:bg-[#242622] text-[#1B1C19] dark:text-[#F3F4F6] text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#E4E2DD] dark:border-[#30312E] focus:outline-none focus:border-[#401C0C] cursor-pointer"
                    >
                      <option value="active">Active Ready</option>
                      <option value="assigned">Shift Assigned</option>
                      <option value="on_hold">On Hold</option>
                    </select>
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

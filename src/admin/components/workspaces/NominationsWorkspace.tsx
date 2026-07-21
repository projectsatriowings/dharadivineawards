import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Nomination, VettingStatus, NominationCategory } from '../../types';
import { 
  Award, 
  Filter, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  ExternalLink, 
  User, 
  Phone, 
  Calendar,
  LayoutGrid,
  List,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Eye
} from 'lucide-react';

export const NominationsWorkspace: React.FC = () => {
  const { nominations, updateNominationStatus, deleteNomination, globalSearchQuery, currentUser } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'board' | 'table'>('board');
  const [previewNomination, setPreviewNomination] = useState<Nomination | null>(null);

  const categories: string[] = [
    'all',
    ...Array.from(new Set(nominations.map(nom => nom.category))).filter(Boolean)
  ];

  const columns: { id: VettingStatus; title: string; color: string; bg: string; border: string; desc: string }[] = [
    { id: 'pending', title: 'Pending Vetting', color: '#D9762E', bg: 'bg-[#D9762E]/10', border: 'border-[#D9762E]/30', desc: 'New submissions requiring initial check' },
    { id: 'shortlisted', title: 'Shortlisted by Jury', color: '#C9A646', bg: 'bg-[#C9A646]/15', border: 'border-[#C9A646]/40', desc: 'Under active panel review' },
    { id: 'approved', title: 'Approved Awardee', color: '#401C0C', bg: 'bg-[#401C0C]/15 dark:bg-[#401C0C]/30', border: 'border-[#401C0C]/40', desc: 'Final selection for Dhara Divine Awards' },
    { id: 'rejected', title: 'Archived / Ineligible', color: '#867463', bg: 'bg-[#867463]/10', border: 'border-[#867463]/20', desc: 'Did not meet criteria' }
  ];

  const filteredNominations = nominations.filter(nom => {
    const matchesCategory = selectedCategory === 'all' || nom.category === selectedCategory;
    const matchesSearch = !globalSearchQuery || 
      nom.nominee_name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      nom.bio_summary.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      nom.nominator_name.toLowerCase().includes(globalSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status: VettingStatus) => {
    switch (status) {
      case 'pending': return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#D9762E]/10 text-[#D9762E] border border-[#D9762E]/20"><Clock size={12} /> Pending</span>;
      case 'shortlisted': return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#C9A646]/20 text-[#8A5000] dark:text-[#FFD27F] border border-[#C9A646]/30"><Sparkles size={12} /> Shortlisted</span>;
      case 'approved': return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#401C0C]/15 dark:bg-[#401C0C]/30 text-[#401C0C] dark:text-[#FFD27F] border border-[#401C0C]/30"><CheckCircle2 size={12} /> Approved</span>;
      case 'rejected': return <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#867463]/15 text-[#867463] border border-[#867463]/20"><XCircle size={12} /> Archived</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Filter Bar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-[#867463] dark:text-[#9CA3AF] flex items-center gap-1.5 mr-2">
            <Filter size={14} /> Filter Seva Domain:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#401C0C] dark:bg-[#FFD27F] text-white dark:text-[#401C0C] font-bold shadow-sm'
                  : 'bg-[#F5F3EE] dark:bg-[#242622] text-[#534436] dark:text-[#D1D5DB] hover:bg-[#EAE8E3] dark:hover:bg-[#30312E]'
              }`}
            >
              {cat === 'all' ? `All Domains (${nominations.length})` : `${cat} (${nominations.filter(n => n.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 self-end md:self-auto bg-[#F5F3EE] dark:bg-[#242622] p-1 rounded-xl border border-[#E4E2DD] dark:border-[#30312E]">
          <button
            onClick={() => setViewMode('board')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'board' ? 'bg-white dark:bg-[#1B1C19] text-[#401C0C] dark:text-[#FFD27F] font-bold shadow-sm' : 'text-[#867463]'
            }`}
          >
            <LayoutGrid size={14} /> Vetting Kanban Board
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'table' ? 'bg-white dark:bg-[#1B1C19] text-[#401C0C] dark:text-[#FFD27F] font-bold shadow-sm' : 'text-[#867463]'
            }`}
          >
            <List size={14} /> Table Registry
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {columns.map(col => {
            const colNominations = filteredNominations.filter(n => n.vetting_status === col.id);
            return (
              <div key={col.id} className="flex flex-col h-full rounded-3xl bg-[#F5F3EE]/60 dark:bg-[#1A1B18]/60 border border-[#EAE8E3] dark:border-[#2E302A] p-4">
                {/* Column Header */}
                <div className={`p-3.5 rounded-2xl ${col.bg} border ${col.border} mb-4 flex items-center justify-between`}>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#1B1C19] dark:text-[#F3F4F6] flex items-center gap-2">
                      {col.title}
                    </h3>
                    <p className="text-[11px] text-[#534436] dark:text-[#A1A1AA] mt-0.5">{col.desc}</p>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-white dark:bg-[#1B1C19] font-mono text-xs font-bold flex items-center justify-center shadow-sm">
                    {colNominations.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[680px] pr-1">
                  {colNominations.length === 0 ? (
                    <div className="py-12 text-center text-xs text-[#867463] italic bg-white/40 dark:bg-[#1B1C19]/40 rounded-2xl border border-dashed border-[#E4E2DD] dark:border-[#30312E]">
                      No nominations in this stage
                    </div>
                  ) : (
                    colNominations.map(nom => (
                      <div 
                        key={nom.id}
                        className="p-4 rounded-2xl bg-white dark:bg-[#1B1C19] border border-[#E4E2DD] dark:border-[#30312E] shadow-sm hover:shadow-md hover:border-[#401C0C]/40 dark:hover:border-[#FFD27F]/40 transition-all group flex flex-col justify-between"
                      >
                        <div>
                          {/* Category Tag & Jury */}
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5F3EE] dark:bg-[#242622] text-[#401C0C] dark:text-[#FFD27F]">
                              {nom.category}
                            </span>
                            <span className="text-[10px] text-[#867463] font-mono">
                              {nom.created_at.slice(0, 10)}
                            </span>
                          </div>

                          {/* Nominee Name & Avatar */}
                          <div className="flex items-start gap-3">
                            {nom.avatar_url ? (
                              <img src={nom.avatar_url} alt={nom.nominee_name} className="w-10 h-10 rounded-xl object-cover shrink-0 ring-1 ring-[#C9A646]/30" />
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-[#401C0C] text-white font-serif font-bold text-sm flex items-center justify-center shrink-0">
                                {nom.nominee_name.charAt(0)}
                              </div>
                            )}
                            <div className="min-w-0">
                              <h4 className="font-serif font-bold text-sm text-[#1B1C19] dark:text-[#F3F4F6] leading-snug group-hover:text-[#401C0C] dark:group-hover:text-[#FFD27F] transition-colors line-clamp-1">
                                {nom.nominee_name}
                              </h4>
                              <p className="text-[11px] text-[#867463] dark:text-[#9CA3AF] flex items-center gap-1 mt-0.5">
                                <Phone size={10} /> {nom.nominee_phone}
                              </p>
                            </div>
                          </div>

                          {/* Bio Summary */}
                          <p className="text-xs text-[#534436] dark:text-[#D1D5DB] mt-3 line-clamp-3 leading-relaxed font-light">
                            {nom.bio_summary}
                          </p>
                        </div>

                        {/* Footer & Actions */}
                        <div className="mt-4 pt-3 border-t border-[#F5F3EE] dark:border-[#2E302A] space-y-2.5">
                          <div className="flex items-center justify-between text-[11px] text-[#867463]">
                            <span>Nominator: <strong className="text-[#1B1C19] dark:text-[#E5E7EB]">{nom.nominator_name}</strong></span>
                            {nom.assigned_jury && (
                              <span className="text-[10px] bg-[#401C0C]/10 text-[#401C0C] dark:text-[#FFD27F] px-1.5 py-0.5 rounded font-mono">
                                {nom.assigned_jury.split(' ')[0]}
                              </span>
                            )}
                          </div>

                          {/* Status Move Controls */}
                          <div className="flex items-center justify-between gap-1 pt-1">
                            <button
                              onClick={() => setPreviewNomination(nom)}
                              className="px-2.5 py-1 rounded-lg bg-[#F5F3EE] dark:bg-[#242622] hover:bg-[#401C0C] hover:text-white dark:hover:bg-[#FFD27F] dark:hover:text-[#401C0C] text-[#534436] dark:text-[#D1D5DB] text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <Eye size={13} /> Preview
                            </button>

                            <div className="flex items-center gap-1">
                              {col.id !== 'approved' && (
                                <button
                                  onClick={() => updateNominationStatus(nom.id, 'approved')}
                                  title="Approve Awardee"
                                  className="p-1 rounded-lg bg-[#401C0C]/10 text-[#401C0C] dark:text-[#FFD27F] hover:bg-[#401C0C] hover:text-white transition-all cursor-pointer"
                                >
                                  <CheckCircle2 size={15} />
                                </button>
                              )}
                              {col.id !== 'shortlisted' && col.id !== 'approved' && (
                                <button
                                  onClick={() => updateNominationStatus(nom.id, 'shortlisted')}
                                  title="Shortlist for Jury"
                                  className="p-1 rounded-lg bg-[#C9A646]/20 text-[#8A5000] dark:text-[#FFD27F] hover:bg-[#C9A646] hover:text-white transition-all cursor-pointer"
                                >
                                  <Sparkles size={15} />
                                </button>
                              )}
                              {col.id !== 'rejected' && (
                                <button
                                  onClick={() => updateNominationStatus(nom.id, 'rejected')}
                                  title="Archive / Reject"
                                  className="p-1 rounded-lg bg-[#867463]/10 text-[#867463] hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                                >
                                  <XCircle size={15} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-3xl bg-white dark:bg-[#1B1C19] border border-[#EAE8E3] dark:border-[#30312E] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F3EE] dark:bg-[#242622] border-b border-[#E4E2DD] dark:border-[#30312E] text-[11px] font-bold text-[#867463] dark:text-[#9CA3AF] uppercase tracking-wider">
                  <th className="py-3.5 px-6">Nominee Candidate</th>
                  <th className="py-3.5 px-4">Seva Category</th>
                  <th className="py-3.5 px-4">Nominator Contact</th>
                  <th className="py-3.5 px-4">Assigned Jury</th>
                  <th className="py-3.5 px-4">Vetting Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F3EE] dark:divide-[#2E302A] text-xs">
                {filteredNominations.map(nom => (
                  <tr key={nom.id} className="hover:bg-[#FDFBF8] dark:hover:bg-[#242622]/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {nom.avatar_url ? (
                          <img src={nom.avatar_url} alt={nom.nominee_name} className="w-9 h-9 rounded-xl object-cover" />
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-[#401C0C] text-white font-serif font-bold flex items-center justify-center">
                            {nom.nominee_name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-serif font-bold text-sm text-[#1B1C19] dark:text-[#F3F4F6]">{nom.nominee_name}</div>
                          <div className="text-[11px] text-[#867463] font-mono">{nom.nominee_phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#401C0C] dark:text-[#FFD27F]">{nom.category}</td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-[#1B1C19] dark:text-[#E5E7EB]">{nom.nominator_name}</div>
                      <div className="text-[11px] text-[#867463] font-mono">{nom.nominator_phone}</div>
                    </td>
                    <td className="py-4 px-4 font-mono text-[#534436] dark:text-[#D1D5DB]">{nom.assigned_jury || 'Unassigned'}</td>
                    <td className="py-4 px-4">{getStatusBadge(nom.vetting_status)}</td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button 
                        onClick={() => setPreviewNomination(nom)}
                        className="px-3 py-1.5 rounded-lg bg-[#F5F3EE] dark:bg-[#242622] text-[#401C0C] dark:text-[#FFD27F] font-semibold hover:bg-[#401C0C] hover:text-white transition-all cursor-pointer"
                      >
                        Preview Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick PDF Dossier Preview Modal */}
      {previewNomination && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#1B1C19] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#EAE8E3] dark:border-[#30312E] shadow-2xl p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#F5F3EE] dark:border-[#2E302A]">
              <div className="flex items-center gap-4">
                {previewNomination.avatar_url && (
                  <img src={previewNomination.avatar_url} alt="" className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#C9A646]" />
                )}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#401C0C]/10 text-[#401C0C] dark:text-[#FFD27F]">
                    {previewNomination.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1B1C19] dark:text-[#F3F4F6] mt-1">
                    {previewNomination.nominee_name}
                  </h3>
                  <p className="text-xs text-[#867463] font-mono">ID: {previewNomination.id} • Submitted {previewNomination.created_at.slice(0, 10)}</p>
                </div>
              </div>
              <button 
                onClick={() => setPreviewNomination(null)}
                className="p-2 rounded-full bg-[#F5F3EE] dark:bg-[#242622] text-[#867463] hover:text-[#1B1C19] transition-colors cursor-pointer"
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* Bio & Seva Impact */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#867463] uppercase tracking-wider">Detailed Seva Impact & Bio Summary</h4>
              <p className="text-sm text-[#1B1C19] dark:text-[#E5E7EB] leading-relaxed bg-[#FDFBF8] dark:bg-[#242622]/50 p-4 rounded-2xl border border-[#F5F3EE] dark:border-[#30312E]">
                {previewNomination.bio_summary}
              </p>
            </div>

            {previewNomination.nominee_work_image && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#867463] uppercase tracking-wider">Uploaded Evidence / Nominee Work Image</h4>
                <div className="border border-[#E4E2DD] dark:border-[#30312E] rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-900 flex justify-center p-2">
                  <img 
                    src={previewNomination.nominee_work_image} 
                    alt="Nominee Work Evidence" 
                    className="max-h-[300px] object-contain rounded-xl shadow-sm" 
                  />
                </div>
              </div>
            )}

            {/* Supporting Links & Media */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#867463] uppercase tracking-wider">Supporting Documentation & Video Proofs</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {previewNomination.supporting_links.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-[#F5F3EE] dark:bg-[#242622] border border-[#E4E2DD] dark:border-[#30312E] text-xs font-semibold text-[#401C0C] dark:text-[#FFD27F] flex items-center justify-between hover:border-[#401C0C] transition-all"
                  >
                    <span className="truncate flex items-center gap-2">
                      <FileText size={15} /> Document / Video Link #{idx + 1}
                    </span>
                    <ExternalLink size={14} className="shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Nominator & Reviewer Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#F5F3EE] dark:border-[#2E302A] text-xs">
              <div className="p-3 rounded-xl bg-[#FDFBF8] dark:bg-[#242622]">
                <span className="text-[11px] text-[#867463] block">Nominated By:</span>
                <strong className="text-[#1B1C19] dark:text-[#F3F4F6] block mt-0.5">{previewNomination.nominator_name}</strong>
                <span className="font-mono text-[#867463]">{previewNomination.nominator_phone}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FDFBF8] dark:bg-[#242622]">
                <span className="text-[11px] text-[#867463] block">Assigned Vetting Jury:</span>
                <strong className="text-[#401C0C] dark:text-[#FFD27F] block mt-0.5">{previewNomination.assigned_jury || currentUser.name}</strong>
                <span className="text-[11px] text-[#867463]">Status: {previewNomination.vetting_status.toUpperCase()}</span>
              </div>
            </div>

            {/* Action Buttons inside Modal */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F5F3EE] dark:border-[#2E302A]">
              <button
                onClick={() => {
                  updateNominationStatus(previewNomination.id, 'shortlisted');
                  setPreviewNomination(prev => prev ? { ...prev, vetting_status: 'shortlisted' } : null);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#C9A646]/20 text-[#8A5000] dark:text-[#FFD27F] font-semibold text-xs hover:bg-[#C9A646] hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles size={15} /> Shortlist Candidate
              </button>
              <button
                onClick={() => {
                  updateNominationStatus(previewNomination.id, 'approved');
                  setPreviewNomination(prev => prev ? { ...prev, vetting_status: 'approved' } : null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#401C0C] text-white font-semibold text-xs hover:bg-[#5C2913] transition-all cursor-pointer shadow-lg shadow-[#401C0C]/20 flex items-center gap-1.5"
              >
                <CheckCircle2 size={15} /> Approve Awardee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

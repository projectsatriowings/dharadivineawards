import mongoose, { Schema, Document } from 'mongoose';

export interface INomination extends Document {
  id: string;
  nominee_name: string;
  nominee_phone: string;
  category: string;
  bio_summary: string;
  supporting_links: string[];
  nominator_name: string;
  nominator_phone: string;
  vetting_status: 'pending' | 'approved' | 'rejected' | 'shortlisted';
  created_at: string;
  avatar_url: string;
  assigned_jury?: string;
  nominee_work_image?: string;
}

const NominationSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  nominee_name: { type: String, required: true },
  nominee_phone: { type: String, default: '' },
  category: { type: String, required: true },
  bio_summary: { type: String, default: '' },
  supporting_links: [{ type: String }],
  nominator_name: { type: String, default: 'Anonymous' },
  nominator_phone: { type: String, default: '' },
  vetting_status: { type: String, enum: ['pending', 'approved', 'rejected', 'shortlisted'], default: 'pending' },
  created_at: { type: String, default: () => new Date().toISOString() },
  avatar_url: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
  assigned_jury: { type: String },
  nominee_work_image: { type: String, default: '' }
});

export default mongoose.models.Nomination || mongoose.model<INomination>('Nomination', NominationSchema);

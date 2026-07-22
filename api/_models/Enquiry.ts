import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
  id: string;
  sender_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: 'general' | 'press' | 'sponsorship';
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
  organization?: string;
}

const EnquirySchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  sender_name: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['general', 'press', 'sponsorship'], default: 'general' },
  status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
  created_at: { type: String, default: () => new Date().toISOString() },
  organization: { type: String }
});

export default (mongoose.models as any).Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);

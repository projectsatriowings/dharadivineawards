import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
  id: string;
  type: 'individual' | 'corporate';
  name: string;
  email: string;
  phone: string;
  amount: number;
  seva_domain: string;
  pan?: string;
  is_anonymous: boolean;
  sponsorship_tier?: string;
  receipt_sent: boolean;
  payment_status: 'pending' | 'success' | 'failed';
  created_at: string;
}

const DonationSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, enum: ['individual', 'corporate'], required: true },
  name: { type: String, default: 'Anonymous Donor' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  amount: { type: Number, required: true },
  seva_domain: { type: String, required: true },
  pan: { type: String, default: '' },
  is_anonymous: { type: Boolean, default: false },
  sponsorship_tier: { type: String },
  receipt_sent: { type: Boolean, default: false },
  payment_status: { type: String, enum: ['pending', 'success', 'failed'], default: 'success' },
  created_at: { type: String, default: () => new Date().toISOString() }
});

export default mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);

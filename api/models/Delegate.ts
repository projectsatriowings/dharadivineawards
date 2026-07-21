import mongoose, { Schema, Document } from 'mongoose';

export interface IDelegate extends Document {
  id: string;
  delegate_name: string;
  email: string;
  phone: string;
  pass_tier: string;
  ticket_count: number;
  pass_code: string;
  checked_in: boolean;
  checkin_time?: string;
  seat_zone?: string;
}

const DelegateSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  delegate_name: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  pass_tier: { type: String, default: 'delegate' },
  ticket_count: { type: Number, default: 1 },
  pass_code: { type: String, required: true, unique: true },
  checked_in: { type: Boolean, default: false },
  checkin_time: { type: String },
  seat_zone: { type: String, default: 'Zone B - Seva Row 10' }
});

export default mongoose.models.Delegate || mongoose.model<IDelegate>('Delegate', DelegateSchema);

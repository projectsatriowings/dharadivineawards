import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
  id: string;
  timestamp: string;
  type: 'nomination' | 'donation' | 'checkin' | 'volunteer' | 'system';
  message: string;
  user: string;
}

const ActivityLogSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  timestamp: { type: String, default: () => new Date().toISOString() },
  type: { type: String, enum: ['nomination', 'donation', 'checkin', 'volunteer', 'system'], default: 'system' },
  message: { type: String, required: true },
  user: { type: String, default: 'System' }
});

export default mongoose.models.ActivityLog || mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);

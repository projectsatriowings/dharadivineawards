import mongoose, { Schema, Document } from 'mongoose';

export interface IVolunteer extends Document {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  skills: string[];
  availability: string;
  status: 'active' | 'assigned' | 'on_hold';
  assigned_zone?: string;
}

const VolunteerSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  age: { type: Number, default: 25 },
  skills: [{ type: String }],
  availability: { type: String, default: 'Full Event' },
  status: { type: String, enum: ['active', 'assigned', 'on_hold'], default: 'active' },
  assigned_zone: { type: String, default: 'General Support' }
});

export default mongoose.models.Volunteer || mongoose.model<IVolunteer>('Volunteer', VolunteerSchema);

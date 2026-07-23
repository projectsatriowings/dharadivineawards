import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteConfig extends Document {
  id: string;
  heroVideoUrl?: string;
  heroVideoPoster?: string;
  heroImageUrl?: string;
  heroMediaOrder?: 'video-first' | 'image-first';
  eventYear?: string;
  registrationTickets?: any[];
  eventStats?: any[];
  homeStats?: any[];
  aboutStats?: any[];
  homeCredentials?: any[];
  founders?: any[];
}

const SiteConfigSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
}, { strict: false });

export default mongoose.models.SiteConfig || mongoose.model<ISiteConfig>('SiteConfig', SiteConfigSchema);

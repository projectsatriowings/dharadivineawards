import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  id: string;
  src: string;
  category: string;
  caption: string;
  priority: number;
  featured: boolean;
}

const GallerySchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  src: { type: String, required: true },
  category: { type: String, default: 'Award Ceremony' },
  caption: { type: String, default: 'Dhara Divine Awards' },
  priority: { type: Number, default: 0 },
  featured: { type: Boolean, default: false }
});

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  id: string;
  title: string;
  date: string;
  type: string;
  mediaUrl?: string;
  image: string;
  link?: string;
  summary: string;
  rotate?: number;
}

const NewsSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: String, default: '' },
  type: { type: String, default: 'image' },
  mediaUrl: { type: String, default: '' },
  image: { type: String, required: true },
  link: { type: String, default: '' },
  summary: { type: String, default: '' },
  rotate: { type: Number, default: 0 }
});

export default mongoose.models.News || mongoose.model<INews>('News', NewsSchema);

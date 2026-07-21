import fs from 'fs/promises';
import path from 'path';
import mongoose from 'mongoose';
import Nomination from '../../models/Nomination';
import Donation from '../../models/Donation';
import Delegate from '../../models/Delegate';
import Volunteer from '../../models/Volunteer';
import Enquiry from '../../models/Enquiry';
import Event from '../../models/Event';
import Gallery from '../../models/Gallery';
import SiteConfig from '../../models/SiteConfig';
import ActivityLog from '../../models/ActivityLog';

export interface DatabaseSchema {
  nominations: any[];
  donations: any[];
  delegates: any[];
  volunteers: any[];
  enquiries: any[];
  activityLogs: any[];
  gallery: any[];
  events: any[];
  siteConfig: any[];
  news?: any[];
}

const dbPath = path.join(process.cwd(), 'data', 'db.json');

let isConnected = false;

async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('localhost')) return false;

  if (isConnected && mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log("Connected to MongoDB Atlas successfully");
    return true;
  } catch (error) {
    console.error("MongoDB Atlas connection failed, falling back to local file:", error);
    return false;
  }
}

export async function readDb(): Promise<DatabaseSchema> {
  const mongoAvailable = await connectMongo();

  if (mongoAvailable) {
    try {
      const [
        nominations,
        donations,
        delegates,
        volunteers,
        enquiries,
        activityLogs,
        gallery,
        events,
        siteConfig
      ] = await Promise.all([
        Nomination.find({}).lean(),
        Donation.find({}).lean(),
        Delegate.find({}).lean(),
        Volunteer.find({}).lean(),
        Enquiry.find({}).lean(),
        ActivityLog.find({}).lean(),
        Gallery.find({}).lean(),
        Event.find({}).lean(),
        SiteConfig.find({}).lean()
      ]);

      // If Mongo is completely empty (first time connect), auto-seed from local db.json
      const totalDocs = nominations.length + donations.length + delegates.length + enquiries.length + gallery.length;
      if (totalDocs === 0) {
        console.log("MongoDB Atlas is empty. Auto-seeding initial data from db.json...");
        const fileData = await readLocalDbFile();
        await seedMongoFromLocal(fileData);
        return fileData;
      }

      return {
        nominations,
        donations,
        delegates,
        volunteers,
        enquiries,
        activityLogs,
        gallery,
        events,
        siteConfig,
        news: []
      };
    } catch (err) {
      console.error("Failed to read from MongoDB, trying local file fallback:", err);
    }
  }

  return await readLocalDbFile();
}

async function readLocalDbFile(): Promise<DatabaseSchema> {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    const parsed = JSON.parse(data);
    if (!parsed.news) parsed.news = [];
    return parsed;
  } catch (error) {
    return {
      nominations: [],
      donations: [],
      delegates: [],
      volunteers: [],
      enquiries: [],
      activityLogs: [],
      gallery: [],
      events: [],
      siteConfig: [],
      news: []
    };
  }
}

async function seedMongoFromLocal(data: DatabaseSchema) {
  try {
    if (data.nominations?.length) await Nomination.insertMany(data.nominations, { ordered: false }).catch(() => {});
    if (data.donations?.length) await Donation.insertMany(data.donations, { ordered: false }).catch(() => {});
    if (data.delegates?.length) await Delegate.insertMany(data.delegates, { ordered: false }).catch(() => {});
    if (data.volunteers?.length) await Volunteer.insertMany(data.volunteers, { ordered: false }).catch(() => {});
    if (data.enquiries?.length) await Enquiry.insertMany(data.enquiries, { ordered: false }).catch(() => {});
    if (data.activityLogs?.length) await ActivityLog.insertMany(data.activityLogs, { ordered: false }).catch(() => {});
    if (data.gallery?.length) await Gallery.insertMany(data.gallery, { ordered: false }).catch(() => {});
    if (data.events?.length) await Event.insertMany(data.events, { ordered: false }).catch(() => {});
    if (data.siteConfig?.length) await SiteConfig.insertMany(data.siteConfig, { ordered: false }).catch(() => {});
    console.log("Auto-seeding to MongoDB Atlas completed!");
  } catch (err) {
    console.error("Error auto-seeding MongoDB:", err);
  }
}

export async function writeDb(data: DatabaseSchema): Promise<void> {
  const mongoAvailable = await connectMongo();

  if (mongoAvailable) {
    try {
      // Upsert all items into MongoDB Atlas
      await Promise.all([
        ...data.nominations.map(item => Nomination.findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.donations.map(item => Donation.findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.delegates.map(item => Delegate.findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.volunteers.map(item => Volunteer.findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.enquiries.map(item => Enquiry.findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.activityLogs.map(item => ActivityLog.findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.gallery.map(item => Gallery.findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.events.map(item => Event.findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.siteConfig.map(item => SiteConfig.findOneAndUpdate({ id: item.id }, item, { upsert: true }))
      ]);
      return;
    } catch (err) {
      console.error("Failed to write to MongoDB:", err);
    }
  }

  // Local file fallback
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.warn("Database local write skipped (read-only filesystem or file write error):", error);
  }
}

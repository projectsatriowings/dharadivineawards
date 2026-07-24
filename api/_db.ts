import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Nomination from './_models/Nomination.js';
import Donation from './_models/Donation.js';
import Delegate from './_models/Delegate.js';
import Volunteer from './_models/Volunteer.js';
import Enquiry from './_models/Enquiry.js';
import Event from './_models/Event.js';
import Gallery from './_models/Gallery.js';
import SiteConfig from './_models/SiteConfig.js';
import ActivityLog from './_models/ActivityLog.js';
import News from './_models/News.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  news: any[];
}

const DEFAULT_MONGO_URI = 'mongodb+srv://soundhers38_db_user:MbGcn2fyLnReShxx@cluster0.yripibj.mongodb.net/dhara_db?retryWrites=true&w=majority&appName=Cluster0';

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
let isConnected = false;

async function connectMongo() {
  const uri = process.env.MONGODB_URI || DEFAULT_MONGO_URI;
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
        siteConfig,
        news
      ] = await Promise.all([
        (Nomination as any).find({}).lean(),
        (Donation as any).find({}).lean(),
        (Delegate as any).find({}).lean(),
        (Volunteer as any).find({}).lean(),
        (Enquiry as any).find({}).lean(),
        (ActivityLog as any).find({}).lean(),
        (Gallery as any).find({}).lean(),
        (Event as any).find({}).lean(),
        (SiteConfig as any).find({}).lean(),
        (News as any).find({}).lean()
      ]);

      const totalDocs = nominations.length + donations.length + delegates.length + enquiries.length + gallery.length + news.length;
      if (totalDocs === 0) {
        console.log("MongoDB Atlas is empty. Auto-seeding initial data from db.json...");
        const fileData = await readLocalDbFile();
        await seedMongoFromLocal(fileData);
        return fileData;
      }

      // Migrate initial news if MongoDB news collection is empty
      let finalNews = news;
      if (!news || news.length === 0) {
        console.log("News database is empty. Auto-migrating initial news from db.json...");
        try {
          const fileData = await readLocalDbFile();
          if (fileData.news && fileData.news.length > 0) {
            await Promise.all(
              fileData.news.map((item: any) => (News as any).findOneAndUpdate({ id: item.id }, item, { upsert: true }))
            );
            console.log(`Successfully migrated ${fileData.news.length} news articles from db.json to MongoDB.`);
            finalNews = await (News as any).find({}).lean();
          }
        } catch (e) {
          console.error("Failed to migrate news from db.json:", e);
        }
      }

      let finalEvents = events;
      if (!events || events.length === 0) {
        console.log("Events database is empty. Auto-migrating initial events from db.json...");
        try {
          const fileData = await readLocalDbFile();
          if (fileData.events && fileData.events.length > 0) {
            await Promise.all(
              fileData.events.map((item: any) => (Event as any).findOneAndUpdate({ id: item.id }, item, { upsert: true }))
            );
            console.log(`Successfully migrated ${fileData.events.length} events from db.json to MongoDB.`);
            finalEvents = await (Event as any).find({}).lean();
          }
        } catch (e) {
          console.error("Failed to migrate events from db.json:", e);
        }
      }

      return {
        nominations,
        donations,
        delegates,
        volunteers,
        enquiries,
        activityLogs,
        gallery,
        events: finalEvents,
        siteConfig,
        news: finalNews
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
    if (data.news?.length) await News.insertMany(data.news, { ordered: false }).catch(() => {});
    console.log("Auto-seeding to MongoDB Atlas completed!");
  } catch (err) {
    console.error("Error auto-seeding MongoDB:", err);
  }
}

export async function writeDb(data: DatabaseSchema): Promise<void> {
  const mongoAvailable = await connectMongo();

  if (mongoAvailable) {
    try {
      // Collect IDs of current items to preserve
      const nominationIds = (data.nominations || []).map(item => item.id);
      const donationIds = (data.donations || []).map(item => item.id);
      const delegateIds = (data.delegates || []).map(item => item.id);
      const volunteerIds = (data.volunteers || []).map(item => item.id);
      const enquiryIds = (data.enquiries || []).map(item => item.id);
      const activityLogIds = (data.activityLogs || []).map(item => item.id);
      const galleryIds = (data.gallery || []).map(item => item.id);
      const eventIds = (data.events || []).map(item => item.id);
      const siteConfigIds = (data.siteConfig || []).map(item => item.id);
      const newsIds = (data.news || []).map(item => item.id);

      await Promise.all([
        // Delete items from MongoDB that are no longer in the provided arrays
        Nomination.deleteMany({ id: { $nin: nominationIds } }),
        Donation.deleteMany({ id: { $nin: donationIds } }),
        Delegate.deleteMany({ id: { $nin: delegateIds } }),
        Volunteer.deleteMany({ id: { $nin: volunteerIds } }),
        Enquiry.deleteMany({ id: { $nin: enquiryIds } }),
        ActivityLog.deleteMany({ id: { $nin: activityLogIds } }),
        Gallery.deleteMany({ id: { $nin: galleryIds } }),
        Event.deleteMany({ id: { $nin: eventIds } }),
        SiteConfig.deleteMany({ id: { $nin: siteConfigIds } }),
        News.deleteMany({ id: { $nin: newsIds } }),

        // Upsert existing items
        ...data.nominations.map(item => (Nomination as any).findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.donations.map(item => (Donation as any).findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.delegates.map(item => (Delegate as any).findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.volunteers.map(item => (Volunteer as any).findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.enquiries.map(item => (Enquiry as any).findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.activityLogs.map(item => (ActivityLog as any).findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.gallery.map(item => (Gallery as any).findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.events.map(item => (Event as any).findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.siteConfig.map(item => (SiteConfig as any).findOneAndUpdate({ id: item.id }, item, { upsert: true })),
        ...data.news.map(item => (News as any).findOneAndUpdate({ id: item.id }, item, { upsert: true }))
      ]);
      return;
    } catch (err) {
      console.error("Failed to write to MongoDB:", err);
    }
  }

  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.warn("Database local write skipped (read-only filesystem or file write error):", error);
  }
}

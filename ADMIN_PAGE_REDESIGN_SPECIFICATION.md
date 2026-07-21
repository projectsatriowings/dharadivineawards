# Dhara Foundation Admin Portal (`df-admin`) — Redesign Specification & Technical Guide

This document provides a comprehensive overview of the **Dhara Foundation Admin Portal (`df-admin`)**. It contains the file manifest, page details, feature breakdowns, data structures, and redesign guidelines to help your design and development colleague execute a modern, high-quality redesign.

---

## 1. Executive Summary & Tech Stack

The `df-admin` application is the central administrative management portal for the **Dhara Foundation Divine Awards 2026**. It manages award nominations, donor contributions, event delegates (with QR code gate verification), volunteer rosters, public enquiries, media galleries, event pass pricing, and global website configurations.

### Tech Stack
* **Framework:** Next.js 16 (App Router)
* **Library:** React 19 + TypeScript
* **Styling:** Tailwind CSS v4 (with Dark / Light theme support)
* **Icons:** Lucide React (`lucide-react`)
* **Data Visualization:** Recharts (`recharts`)
* **Database / Backend:** MongoDB with Mongoose (`mongoose`)
* **Email Service:** Nodemailer (`nodemailer`)
* **Payments Integration:** Razorpay API

### Brand Palette & Current Design Tokens
* **Primary Dark Background:** `#121310` (Dark Mode canvas)
* **Primary Light Background:** `#FDFBF8` (Light Mode canvas)
* **Sidebar / Header Dark Brown:** `#401C0C` (Brand Accent)
* **Gold Highlight / Accent:** `#FFD27F`
* **Orange Highlight / Accent:** `#D9762E`
* **Text Colors:** Primary Light (`#1B1C19`), Primary Dark (`#E5E7EB`), Muted (`#867463` / `#9CA3AF`)

---

## 2. Directory & File Structure Map

Below is the complete file and folder map of the `df-admin` directory:

```text
df-admin/
├── package.json                   # Dependencies, scripts, and package specs
├── next.config.ts                 # Next.js configuration settings
├── tsconfig.json                  # TypeScript compiler configurations
├── postcss.config.mjs             # PostCSS / Tailwind plugin configuration
├── .env.local                     # Environment variables (MongoDB URI, Razorpay Keys, Admin credentials)
├── public/                        # Static branding assets & logos
└── src/
    ├── app/                       # Next.js App Router Routes
    │   ├── layout.tsx             # Global layout & HTML head setup
    │   ├── page.tsx               # Root page (redirects to /admin)
    │   ├── login/                 # Dedicated login page route
    │   │   └── page.tsx           
    │   ├── admin/                 # Main Admin Portal Dashboard
    │   │   ├── page.tsx           # Single-page app container (renders Header, Sidebar, & Workspaces)
    │   │   └── login/             # Alternative admin login view
    │   └── api/                   # Backend API Endpoints (Next.js API Handlers)
    │       ├── db.ts              # MongoDB database connection helper
    │       ├── action/            # Dynamic backend action handlers
    │       ├── config/            # Site config fetch & update APIs
    │       ├── events/            # Events management APIs
    │       ├── gallery/           # Gallery upload and media APIs
    │       ├── news/              # News and updates APIs
    │       ├── razorpay/          # Payment verification & order creation APIs
    │       ├── submissions/       # Handlers for forms (nominations, enquiries, delegates)
    │       └── upload/            # File upload handler
    ├── components/                # React UI Components
    │   ├── auth/                  
    │   │   └── LoginView.tsx      # Admin Authentication login card
    │   ├── layout/                
    │   │   ├── Header.tsx         # Top bar with search, theme toggle, & admin profile
    │   │   └── Sidebar.tsx        # Navigation sidebar with badge indicators
    │   └── workspaces/            # Core Functional Tab Views (Detailed below)
    │       ├── OverviewWorkspace.tsx
    │       ├── NominationsWorkspace.tsx
    │       ├── DonationsWorkspace.tsx
    │       ├── DelegatesWorkspace.tsx
    │       ├── VolunteersWorkspace.tsx
    │       ├── EnquiriesWorkspace.tsx
    │       ├── GalleryWorkspace.tsx
    │       ├── EventsWorkspace.tsx
    │       ├── EventConfigWorkspace.tsx
    │       └── SettingsWorkspace.tsx
    ├── context/                   
    │   ├── AppContext.tsx         # Central application state (Active tab, loaded data, modal state)
    │   └── AuthContext.tsx        # Authentication & session token management
    ├── models/                    # Mongoose Database Schemas
    │   ├── Nomination.ts
    │   ├── Donation.ts
    │   ├── Delegate.ts
    │   ├── Volunteer.ts
    │   ├── Enquiry.ts
    │   ├── Event.ts
    │   ├── Gallery.ts
    │   ├── SiteConfig.ts
    │   └── ActivityLog.ts
    ├── types/                     
    │   └── index.ts               # TypeScript type interfaces for all entity objects
    └── index.css                  # Global CSS styles & custom scrollbars
```

---

## 3. Workspaces & Page Details Breakdown

The admin dashboard is structured as a **Single Page Application (SPA)** tab-based portal managed by `AppContext.tsx`. Here are the exact details for each workspace/screen:

### 3.1. Authentication View (`src/components/auth/LoginView.tsx`)
* **Purpose:** Admin login screen to secure the portal.
* **Features:** Email/Username and Password inputs, error notification alert, "Remember Me" option, brand logo banner.

### 3.2. Layout Components (`src/components/layout/`)
* **Header (`Header.tsx`):**
  * Search bar for quick filtering across items.
  * Theme switcher (Dark Mode / Light Mode).
  * Quick refresh data button.
  * Active Admin profile avatar & Logout action button.
  * Mobile hamburger button to toggle the sidebar drawer.
* **Sidebar (`Sidebar.tsx`):**
  * Dhara Divine Awards 2026 branding logo.
  * 10 Workspace navigation links with icons (`lucide-react`).
  * Live badge count overlays for **Pending Nominations** and **New Enquiries**.

---

### 3.3. Workspaces & Screen Details (`src/components/workspaces/`)

#### 1. Overview Panel (`OverviewWorkspace.tsx`)
* **Key Purpose:** Executive dashboard overview of overall operations.
* **Key UI Elements:**
  * **Metric KPI Cards:** Total Nominations, Total Donations (in ₹), Registered Delegates, and Pending Enquiries.
  * **Charts:** Monthly nomination trends line chart & donation source distribution pie/bar charts (`Recharts`).
  * **Recent Activity Stream:** Log of recent admin actions (approvals, new submissions, payment logs).
  * **Quick Actions:** Shortcut buttons to approve pending nominations, view new enquiries, or export reports.

#### 2. Nominations Workspace (`NominationsWorkspace.tsx`)
* **Key Purpose:** Review and vet nominees for the Divine Awards.
* **Key UI Elements:**
  * **Tab Filters:** All, Pending Review, Approved, Rejected.
  * **Search & Category Filter:** Search nominee by name/organization, filter by award category (Youth Icon, Lifetime Achievement, Social Work, etc.).
  * **Data Table / Card Grid:** Displays Nominee Name, Award Category, Nominator Details, Submission Date, and Status Tag.
  * **Detail Modal:** Modal popup to view submitted documents, achievement story, reference links, and video URLs.
  * **Action Controls:** "Approve Nomination", "Reject Nomination", and "Export to CSV" buttons.

#### 3. Donor & Sponsorship Ledger (`DonationsWorkspace.tsx`)
* **Key Purpose:** Financial tracking of donations and corporate sponsorships.
* **Key UI Elements:**
  * **Financial Summary Cards:** Total Collected, Pending Pledges, Average Donation Amount, Sponsor Count.
  * **Transaction Table:** Donor Name, PAN Number (for tax exemption receipt), Email/Phone, Amount, Payment ID (Razorpay), Payment Status (Completed, Failed, Pending), Date.
  * **Receipt Generator Button:** Action to download/email 80G tax exemption receipt for completed transactions.

#### 4. Delegate Registry & Gate (`DelegatesWorkspace.tsx`)
* **Key Purpose:** Manage registered attendees for the award ceremony & check-in gate security.
* **Key UI Elements:**
  * **Delegate Stats:** Total Attendees, VIP Passes, Standard Passes, Checked-In Count.
  * **QR Code Scanner / Gate Check-In UI:** Camera preview / QR input box to instantly mark delegates as "Checked In" at venue doors.
  * **Delegate Directory Table:** Pass ID, Full Name, Ticket Tier, QR Code preview thumbnail, Check-In timestamp, Email Ticket re-send option.

#### 5. Volunteer Roster (`VolunteersWorkspace.tsx`)
* **Key Purpose:** Coordinate volunteers assisting with event organization.
* **Key UI Elements:**
  * **Roster Overview:** Total Volunteers, Assigned Roles, Pending Applications.
  * **Volunteer Table:** Applicant Name, Phone, Area of Expertise (Stage, Crowd Control, Registration, Hospitality), Availability, Status (Active, On Hold).
  * **Assignment Modal:** Quick assign volunteer to specific event dates/duties.

#### 6. Enquiries & Media (`EnquiriesWorkspace.tsx`)
* **Key Purpose:** Inbox for public inquiries, sponsorship queries, and media requests submitted on the promotional site.
* **Key UI Elements:**
  * **Filter Tabs:** All, Unread / New, Responded, Archived.
  * **Enquiry Cards / Inbox List:** Subject line, sender email, date, category tag.
  * **Reply Drawer / Modal:** View full message body, write direct email reply using Nodemailer API.

#### 7. Gallery Management (`GalleryWorkspace.tsx`)
* **Key Purpose:** Curate photos and video highlights shown on the main public website.
* **Key UI Elements:**
  * **Media Grid:** Grid of uploaded photos/video embeds with title tags and section placement flags.
  * **Upload Form:** Image file uploader, title, caption, category tag (Ceremony 2025, Community Drives, Press Coverage).
  * **Management Actions:** Delete image, toggle "Featured on Homepage" switch.

#### 8. Events & Activities (`EventsWorkspace.tsx`)
* **Key Purpose:** Schedule management for award ceremony sessions, workshops, and pre-events.
* **Key UI Elements:**
  * **Event Timeline / List:** Event Name, Date & Time, Venue, Chief Guest / Speakers, Status (Upcoming, Live, Completed).
  * **Event Add/Edit Form:** Input fields for description, banner image upload, session itinerary, and guest list.

#### 9. Passes & Pricing Config (`EventConfigWorkspace.tsx`)
* **Key Purpose:** Configure ticket tiers, pass pricing, and Razorpay payment links for event attendance.
* **Key UI Elements:**
  * **Tier Cards:** Pass Tiers (VVIP, VIP Gold, General Delegate, Student Pass).
  * **Pricing Controls:** Amount (in ₹), Seat Quotas, Included Perks (Gala Dinner, Networking, Goodie Bag), Active/Inactive toggle.

#### 10. Site Settings (`SettingsWorkspace.tsx`)
* **Key Purpose:** Global content management for the public promotional website.
* **Key UI Elements:**
  * **General Branding:** Hero section headline, sub-headline, promotional video link.
  * **Contact & Social Links:** Official phone numbers, office address, WhatsApp link, Instagram/Facebook URLs.
  * **Database & Maintenance:** "Seed Database" utility button, backup export, feature toggle switches.

---

## 4. Redesign Objectives & Recommendations for your Colleague

When redesigning the Admin Portal, please focus on the following key UX/UI improvements:

### 1. Visual Hierarchy & Theme Consistency
* Modernize typography using clean fonts like **Inter**, **Plus Jakarta Sans**, or **Outfit**.
* Ensure dark and light themes maintain high contrast, readable table text, and cohesive borders (`border-neutral-200` light / `border-neutral-800` dark).
* Refine brand accent colors (`#401C0C` brown, `#FFD27F` gold) so they look sleek and modern rather than heavy.

### 2. Enhanced Data Table UX
* Standardize table views across Nominations, Donations, Delegates, Enquiries, and Volunteers.
* Add column sorting, sticky table headers, flexible pagination controls (Items per page), and clear bulk selection checkboxes.
* Implement drawer views (slide-overs) for viewing detail records instead of heavy modal popups.

### 3. Analytics & Overview Dashboard
* Elevate the Overview screen with cleaner, interactive Recharts widgets, progress indicators for ticket sales/donations, and quick filter options (This Week, This Month, All Time).

### 4. Gate Check-In & Mobile Layout
* Optimize the **Delegate Gate Scanner (`DelegatesWorkspace.tsx`)** for mobile/tablet screens so staff at the venue entrance can quickly scan QR codes with phone cameras.
* Ensure mobile navigation drawer works seamlessly with smooth animations.

---

*Document generated for handover & redesign of Dhara Foundation Admin Portal.*

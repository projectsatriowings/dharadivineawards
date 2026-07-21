export type NominationCategory = string;

export type VettingStatus = 'pending' | 'shortlisted' | 'approved' | 'rejected';

export interface Nomination {
  id: string;
  nominee_name: string;
  nominee_phone: string;
  category: NominationCategory;
  bio_summary: string;
  supporting_links: string[];
  nominator_name: string;
  nominator_phone: string;
  vetting_status: VettingStatus;
  assigned_jury?: string;
  created_at: string;
  avatar_url?: string;
  nominee_work_image?: string;
}

export type DonationType = 'individual' | 'corporate';
export type SevaDomain = 'Annadhanam' | 'Awards Support' | 'General Fund' | 'Temple Heritage';
export type SponsorshipTier = 'Title' | 'Lead' | 'Associate' | 'Patron';
export type PaymentStatus = 'pending' | 'success' | 'failed';

export interface Donation {
  id: string;
  type: DonationType;
  name: string;
  email: string;
  phone: string;
  amount: number;
  seva_domain: SevaDomain;
  pan?: string;
  is_anonymous: boolean;
  sponsorship_tier?: SponsorshipTier;
  receipt_sent: boolean;
  payment_status: PaymentStatus;
  created_at: string;
}

export type PassTier = 'vip' | 'delegate' | 'sponsor';

export interface Delegate {
  id: string;
  delegate_name: string;
  email: string;
  phone: string;
  pass_tier: PassTier;
  ticket_count: number;
  pass_code: string;
  checked_in: boolean;
  checkin_time: string | null;
  seat_zone?: string;
}

export type VolunteerSkill = 'Logistics' | 'Hospitality' | 'Media' | 'Crowd Management' | 'Medical' | 'Registration';
export type Availability = 'Full Event' | 'Morning Sessions' | 'Evening Sessions';
export type VolunteerStatus = 'active' | 'on_hold' | 'assigned';

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  skills: VolunteerSkill[];
  availability: Availability;
  status: VolunteerStatus;
  assigned_zone?: string;
}

export type EnquiryType = 'general' | 'media' | 'sponsorship_enquiry';
export type EnquiryStatus = 'new' | 'in_progress' | 'resolved';

export interface Enquiry {
  id: string;
  sender_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type: EnquiryType;
  status: EnquiryStatus;
  created_at: string;
  organization?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: 'nomination' | 'donation' | 'checkin' | 'volunteer' | 'system';
  message: string;
  user?: string;
}

export type AdminRole = 'Super Admin' | 'Moderator' | 'Auditor' | 'Jury Member' | 'Gate Scanner';

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
}

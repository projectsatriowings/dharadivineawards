import { Nomination, Donation, Delegate, Volunteer, Enquiry, ActivityLog, StaffMember } from '../types';

export const mockStaff: StaffMember[] = [
  { id: 's1', name: 'S. Vinoth Ragavendran', email: 'vinoth@dhara.org', role: 'Super Admin', avatar: '/images/S. Vinoth Ragavendran.jpg', status: 'online' },
  { id: 's2', name: 'Dr. Ananya Iyer', email: 'ananya@dhara.org', role: 'Jury Member', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', status: 'online' },
  { id: 's3', name: 'K. Narayanan', email: 'narayanan@dhara.org', role: 'Auditor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', status: 'offline' },
  { id: 's4', name: 'Priya Krishnan', email: 'priya@dhara.org', role: 'Moderator', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', status: 'busy' },
  { id: 's5', name: 'Arun V.', email: 'arun.v@dhara.org', role: 'Gate Scanner', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', status: 'online' },
];

export const mockNominations: Nomination[] = [
  {
    id: 'nom-101',
    nominee_name: 'Vidushi Malini Ranganathan',
    nominee_phone: '+91 98410 12345',
    category: 'Arts & Culture',
    bio_summary: 'Dedicated over 40 years to preserving rare Thanjavur court dances and mentoring 500+ underprivileged girls in classical Bharatanatyam without fees. Established the Abhinaya Seva Trust in rural Tamil Nadu.',
    supporting_links: ['https://youtube.com/watch?v=demo1', 'https://thehindu.com/arts/malini-profile'],
    nominator_name: 'Dr. V. Raghavan',
    nominator_phone: '+91 94440 88776',
    vetting_status: 'approved',
    assigned_jury: 'Dr. Ananya Iyer',
    created_at: '2026-07-02T10:30:00Z',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'nom-102',
    nominee_name: 'Sri Senthil Kumar Seva Sadan',
    nominee_phone: '+91 97890 55432',
    category: 'Social Welfare',
    bio_summary: 'Operating a 24/7 free medical outreach caravan across 40 tribal villages in the Nilgiris and Anamalai hills. Treated over 35,000 elders and children over the last decade with selfless compassion and traditional Siddha-Allopathy integrated healthcare.',
    supporting_links: ['https://drive.google.com/file/d/senthil-report-2025'],
    nominator_name: 'Meenakshi Sundaram',
    nominator_phone: '+91 98844 11223',
    vetting_status: 'shortlisted',
    assigned_jury: 'S. Ramanathan',
    created_at: '2026-07-03T14:15:00Z',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'nom-103',
    nominee_name: 'Sthapati Govinda Deekshitar',
    nominee_phone: '+91 94432 99887',
    category: 'Temple Restoration',
    bio_summary: 'Master Shilpi who has voluntarily led the structural and limestone restoration of 14 ancient Chola and Pandya stone mandapams that were on the verge of collapse. Trains young artisans in ancient Agamic stone carving techniques.',
    supporting_links: ['https://youtube.com/watch?v=temple-carving-documentary'],
    nominator_name: 'Heritage Trust Chennai',
    nominator_phone: '+91 44 2499 0000',
    vetting_status: 'pending',
    assigned_jury: 'Dr. Ananya Iyer',
    created_at: '2026-07-04T08:00:00Z',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'nom-104',
    nominee_name: 'Vedic Gurukulam of Kumbakonam',
    nominee_phone: '+91 98401 33221',
    category: 'Vedic Education',
    bio_summary: 'Providing full boarding, lodging, and rigorous 12-year Krishna Yajur Veda education alongside modern computer science and mathematics to 120 Brahmacharis from economically weaker backgrounds.',
    supporting_links: ['https://gurukulam-kumbakonam.org'],
    nominator_name: 'R. Srinivasan',
    nominator_phone: '+91 91766 54321',
    vetting_status: 'pending',
    created_at: '2026-07-04T09:12:00Z',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'nom-105',
    nominee_name: 'Kaamadenhu Gaushala & Eco Trust',
    nominee_phone: '+91 93600 77889',
    category: 'Environmental Seva',
    bio_summary: 'Sheltering 850 abandoned and indigenous breed cattle (Kangayam, Umblachery). Developed an innovative organic bio-fertilizer distribution network providing free manure to 1,200 small-scale organic farmers in Coimbatore district.',
    supporting_links: ['https://kaamadenhu-eco.in/impact'],
    nominator_name: 'K. Balasubramanian',
    nominator_phone: '+91 98422 11000',
    vetting_status: 'rejected',
    assigned_jury: 'Priya Krishnan',
    created_at: '2026-07-01T16:45:00Z',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'nom-106',
    nominee_name: 'Pandit Hariharan Shastry',
    nominee_phone: '+91 94441 66778',
    category: 'Arts & Culture',
    bio_summary: 'Renowned Harikatha exponent who has performed over 2,000 discourses across India and abroad, donating 100% of his remuneration towards village temple renovations and annadhanam funds.',
    supporting_links: ['https://youtube.com/watch?v=harikatha-live'],
    nominator_name: 'Saraswathi Sabha',
    nominator_phone: '+91 98400 99000',
    vetting_status: 'shortlisted',
    assigned_jury: 'Dr. Ananya Iyer',
    created_at: '2026-07-03T18:20:00Z',
    avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80'
  }
];

export const mockDonations: Donation[] = [
  {
    id: 'don-9010',
    type: 'corporate',
    name: 'TVS Heritage & Community Foundation',
    email: 'csr@tvsheritage.com',
    phone: '+91 44 2855 0000',
    amount: 1500000,
    seva_domain: 'Awards Support',
    pan: 'AAACT1234M',
    is_anonymous: false,
    sponsorship_tier: 'Title',
    receipt_sent: true,
    payment_status: 'success',
    created_at: '2026-07-01T11:00:00Z'
  },
  {
    id: 'don-9011',
    type: 'individual',
    name: 'Srimati Rukmini Varadarajan',
    email: 'rukmini.v@gmail.com',
    phone: '+91 98403 22334',
    amount: 250000,
    seva_domain: 'Annadhanam',
    pan: 'AGKPV5678B',
    is_anonymous: false,
    receipt_sent: true,
    payment_status: 'success',
    created_at: '2026-07-02T15:30:00Z'
  },
  {
    id: 'don-9012',
    type: 'corporate',
    name: 'Murugappa Group CSR Trust',
    email: 'community@murugappa.co.in',
    phone: '+91 44 2530 1111',
    amount: 1000000,
    seva_domain: 'Temple Heritage',
    pan: 'AAECM8901P',
    is_anonymous: false,
    sponsorship_tier: 'Lead',
    receipt_sent: false,
    payment_status: 'success',
    created_at: '2026-07-03T09:45:00Z'
  },
  {
    id: 'don-9013',
    type: 'individual',
    name: 'Anonymous Devotee',
    email: 'hidden@devotee.org',
    phone: '+91 99000 00000',
    amount: 108000,
    seva_domain: 'General Fund',
    is_anonymous: true,
    receipt_sent: true,
    payment_status: 'success',
    created_at: '2026-07-03T20:12:00Z'
  },
  {
    id: 'don-9014',
    type: 'individual',
    name: 'Dr. Ganesh Natarajan',
    email: 'ganesh.natarajan@techworld.com',
    phone: '+91 98100 44556',
    amount: 50000,
    seva_domain: 'Annadhanam',
    pan: 'ABZPN4321Q',
    is_anonymous: false,
    receipt_sent: false,
    payment_status: 'pending',
    created_at: '2026-07-04T07:20:00Z'
  },
  {
    id: 'don-9015',
    type: 'corporate',
    name: 'Lakshmi Machine Works Ltd',
    email: 'csr@lmw.co.in',
    phone: '+91 422 262 2222',
    amount: 500000,
    seva_domain: 'Awards Support',
    pan: 'AAACL5555Z',
    is_anonymous: false,
    sponsorship_tier: 'Associate',
    receipt_sent: true,
    payment_status: 'success',
    created_at: '2026-07-04T10:05:00Z'
  }
];

export const mockDelegates: Delegate[] = [
  {
    id: 'del-001',
    delegate_name: 'Justice K. Chandru (Retd.)',
    email: 'kchandru@madrasbar.org',
    phone: '+91 98400 11111',
    pass_tier: 'vip',
    ticket_count: 2,
    pass_code: 'DDA-2026-8841',
    checked_in: true,
    checkin_time: '2026-07-04T16:05:00Z',
    seat_zone: 'Zone A - Divya Row 1'
  },
  {
    id: 'del-002',
    delegate_name: 'Srimati Latha Rajinikanth',
    email: 'latha@ashram.org',
    phone: '+91 98840 22222',
    pass_tier: 'vip',
    ticket_count: 3,
    pass_code: 'DDA-2026-8842',
    checked_in: false,
    checkin_time: null,
    seat_zone: 'Zone A - Divya Row 2'
  },
  {
    id: 'del-003',
    delegate_name: 'Vaidya V. Sitaraman',
    email: 'sitaraman.v@siddhamw.com',
    phone: '+91 94440 33333',
    pass_tier: 'delegate',
    ticket_count: 1,
    pass_code: 'DDA-2026-8843',
    checked_in: true,
    checkin_time: '2026-07-04T16:18:00Z',
    seat_zone: 'Zone B - Seva Row 5'
  },
  {
    id: 'del-004',
    delegate_name: 'Rakesh Jhunjhunwala Memorial Trust Rep',
    email: 'events@rjmtrust.org',
    phone: '+91 98200 44444',
    pass_tier: 'sponsor',
    ticket_count: 4,
    pass_code: 'DDA-2026-8844',
    checked_in: false,
    checkin_time: null,
    seat_zone: 'Zone A - Sponsor Enclosure'
  },
  {
    id: 'del-005',
    delegate_name: 'Prof. A. R. Venkatachalapathy',
    email: 'arv@mids.ac.in',
    phone: '+91 94441 55555',
    pass_tier: 'delegate',
    ticket_count: 2,
    pass_code: 'DDA-2026-8845',
    checked_in: false,
    checkin_time: null,
    seat_zone: 'Zone B - Seva Row 8'
  },
  {
    id: 'del-006',
    delegate_name: 'Dr. Padma Subrahmanyam',
    email: 'nrithyodaya@gmail.com',
    phone: '+91 98410 66666',
    pass_tier: 'vip',
    ticket_count: 2,
    pass_code: 'DDA-2026-8846',
    checked_in: true,
    checkin_time: '2026-07-04T16:25:00Z',
    seat_zone: 'Zone A - Divya Row 1'
  }
];

export const mockVolunteers: Volunteer[] = [
  {
    id: 'vol-501',
    name: 'Aditya Narayanan',
    email: 'aditya.n@sastra.edu',
    phone: '+91 99401 77889',
    age: 21,
    skills: ['Logistics', 'Crowd Management'],
    availability: 'Full Event',
    status: 'active',
    assigned_zone: 'Main Gate Check-in'
  },
  {
    id: 'vol-502',
    name: 'Sreeja Krishnan',
    email: 'sreeja.k@gmail.com',
    phone: '+91 98405 66778',
    age: 24,
    skills: ['Hospitality', 'Registration'],
    availability: 'Morning Sessions',
    status: 'assigned',
    assigned_zone: 'VIP Hospitality Desk'
  },
  {
    id: 'vol-503',
    name: 'Karthik Subramanian',
    email: 'karthik.sub@zoho.com',
    phone: '+91 97899 11223',
    age: 28,
    skills: ['Media', 'Logistics'],
    availability: 'Full Event',
    status: 'active',
    assigned_zone: 'Media Press Enclosure'
  },
  {
    id: 'vol-504',
    name: 'Dr. Harini S.',
    email: 'harini.md@apollo.com',
    phone: '+91 98841 99000',
    age: 32,
    skills: ['Medical', 'Hospitality'],
    availability: 'Evening Sessions',
    status: 'assigned',
    assigned_zone: 'Emergency Medical Booth'
  },
  {
    id: 'vol-505',
    name: 'Prasanth V.',
    email: 'prasanth.v@iitm.ac.in',
    phone: '+91 94445 33445',
    age: 20,
    skills: ['Crowd Management', 'Logistics'],
    availability: 'Full Event',
    status: 'on_hold',
    assigned_zone: 'Auditory Balcony'
  }
];

export const mockEnquiries: Enquiry[] = [
  {
    id: 'enq-301',
    sender_name: 'Rajeshwari Swaminathan',
    email: 'editor@thehindu.co.in',
    phone: '+91 44 2857 6300',
    subject: 'Press Pass request for Dhara Divine Awards 2026 Ceremony',
    message: 'We would like to depute our senior cultural correspondent and photographer to cover the award ceremony at Chinmaya Heritage Centre on August 15th. Kindly confirm accreditation procedure.',
    type: 'media',
    status: 'in_progress',
    created_at: '2026-07-03T11:20:00Z',
    organization: 'The Hindu Group'
  },
  {
    id: 'enq-302',
    sender_name: 'Suresh Kumar',
    email: 'suresh@indiabank.com',
    phone: '+91 98412 33445',
    subject: 'Corporate CSR Partnership for Vedic Education Support',
    message: 'Our Bank CSR committee is interested in supporting the Vedic Education and Temple Restoration nominees. We would like to discuss Lead Sponsorship opportunities for the upcoming year.',
    type: 'sponsorship_enquiry',
    status: 'new',
    created_at: '2026-07-04T09:00:00Z',
    organization: 'Indian Bank CSR Trust'
  },
  {
    id: 'enq-303',
    sender_name: 'Meena Raman',
    email: 'meena.r@gmail.com',
    phone: '+91 94431 00112',
    subject: 'Wheelchair access at Chinmaya Heritage Centre',
    message: 'We have booked 2 Delegate passes for elderly family members (Pass Codes DDA-2026-8843). Could you please confirm if there is wheelchair assistance available from the parking lot to Hall A?',
    type: 'general',
    status: 'resolved',
    created_at: '2026-07-02T16:40:00Z'
  }
];

export const initialActivityLogs: ActivityLog[] = [
  { id: 'log-1', timestamp: '2 mins ago', type: 'nomination', message: 'Nomination submitted by S. Ramanathan for Vidushi Malini Ranganathan (Arts & Culture)', user: 'S. Ramanathan' },
  { id: 'log-2', timestamp: '14 mins ago', type: 'checkin', message: 'Delegate pass DDA-2026-8841 scanned successfully at Gate 1 (Justice K. Chandru)', user: 'Arun V.' },
  { id: 'log-3', timestamp: '28 mins ago', type: 'donation', message: '₹5,00,000 corporate donation received from Lakshmi Machine Works Ltd (Awards Support)', user: 'System Callback' },
  { id: 'log-4', timestamp: '1 hour ago', type: 'nomination', message: 'Vetting status updated to Shortlisted for Sri Senthil Kumar Seva Sadan', user: 'Dr. Ananya Iyer' },
  { id: 'log-5', timestamp: '2 hours ago', type: 'volunteer', message: 'New volunteer Aditya Narayanan (Logistics) enrolled and assigned to Main Gate Check-in', user: 'Priya Krishnan' },
  { id: 'log-6', timestamp: '3 hours ago', type: 'donation', message: 'Tax 80G Seva Patr Receipt generated & emailed to Srimati Rukmini Varadarajan', user: 'System Callback' },
];

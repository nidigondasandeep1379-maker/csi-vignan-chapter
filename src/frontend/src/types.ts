export type EventStatus = "upcoming" | "ongoing" | "completed";
export type EventCategory =
  | "workshop"
  | "seminar"
  | "hackathon"
  | "competition"
  | "social"
  | "other";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  venue: string;
  category: EventCategory;
  status: EventStatus;
  imageUrl?: string;
  registrationLink?: string;
  speakers?: string[];
  maxAttendees?: number;
}

export type TeamRole =
  | "faculty_advisor"
  | "chairperson"
  | "vice_chairperson"
  | "secretary"
  | "treasurer"
  | "webmaster"
  | "member"
  | "committee";

export interface TeamMember {
  id: string;
  name: string;
  role: TeamRole;
  roleLabel: string;
  department: string;
  year?: string; // e.g. "3rd Year"
  email?: string;
  linkedIn?: string;
  imageUrl?: string;
  bio?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  thumbnailUrl?: string;
  caption: string;
  event?: string;
  uploadedAt: string;
  tags?: string[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: "new" | "read" | "replied";
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Admin types
export interface AdminStats {
  totalEvents: number;
  totalMembers: number;
  totalGalleryImages: number;
  totalContacts: number;
}

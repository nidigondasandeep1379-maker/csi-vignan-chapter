import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export type GalleryId = bigint;
export type EventId = bigint;
export interface ContactSubmission {
    id: ContactId;
    name: string;
    submittedAt: Timestamp;
    email: string;
    message: string;
}
export type MemberId = bigint;
export interface Event {
    id: EventId;
    title: string;
    date: Timestamp;
    description: string;
    imageUrl: string;
    location: string;
}
export interface GalleryImage {
    id: GalleryId;
    title: string;
    description: string;
    image: ExternalBlob;
    uploadedAt: Timestamp;
}
export interface TeamMember {
    id: MemberId;
    branch: string;
    name: string;
    role: string;
    image: ExternalBlob;
    registrationNo: string;
}
export type ContactId = bigint;
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addEvent(title: string, description: string, date: bigint, location: string, imageUrl: string): Promise<Event>;
    addGalleryImage(title: string, description: string, image: ExternalBlob): Promise<GalleryImage>;
    addTeamMember(name: string, registrationNo: string, branch: string, role: string, image: ExternalBlob): Promise<TeamMember>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteEvent(id: EventId): Promise<boolean>;
    deleteGalleryImage(id: GalleryId): Promise<boolean>;
    deleteTeamMember(id: MemberId): Promise<boolean>;
    getCallerUserRole(): Promise<UserRole>;
    getEvent(id: EventId): Promise<Event | null>;
    getTeamMember(id: MemberId): Promise<TeamMember | null>;
    isCallerAdmin(): Promise<boolean>;
    listContactSubmissions(): Promise<Array<ContactSubmission>>;
    listEvents(): Promise<Array<Event>>;
    listGalleryImages(): Promise<Array<GalleryImage>>;
    listTeamMembers(): Promise<Array<TeamMember>>;
    submitContactForm(name: string, email: string, message: string): Promise<ContactSubmission>;
    updateEvent(id: EventId, title: string, description: string, date: bigint, location: string, imageUrl: string): Promise<boolean>;
    updateTeamMember(id: MemberId, name: string, registrationNo: string, branch: string, role: string, image: ExternalBlob): Promise<boolean>;
}
